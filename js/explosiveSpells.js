// explosiveSpells.js
import { getEquippedSpell, getWizardColor, checkSpellFailure, failResult } from "./spellHelpers.js";
import { resolveSpellRisk } from "./combatMagic.js";

/**
 * Perform an Explosive spell
 */
export function handleExplosiveSpell(playerStats, targetEnemy, { payMagicCost, overrideSpell, enemyIndex }) {

    // --- GET SPELL (supports chaos + manual casting) ---
    const { spell, error } = overrideSpell
        ? { spell: overrideSpell }
        : getEquippedSpell(playerStats, "Explosive");

    if (error) return error;

    // --- MAGIC COST ---
    if (!payMagicCost(playerStats)) {
        return failResult("Not enough MAGIC to cast the spell.");
    }

    const wizardColor = getWizardColor(playerStats);
    const baseDamage = spell.attack[wizardColor];
    const failed = checkSpellFailure(spell, wizardColor);

    // -------------------------
    // --- MISFIRE / BACKFIRE ---
    // -------------------------
    if (failed) {

        let riskStat, riskAmount;

        // --- Extract first stat for UI (backwards compatible) ---
        if (spell.statMod) {
            const entries = Object.entries(spell.statMod);
            if (entries.length > 0) {
                [riskStat, riskAmount] = entries[0];
            }
        }

        const damageResult = {
            hit: false,
            damage: 0,
            riskType: spell.risk?.type ?? "misfire",
            riskDescription: spell.risk?.description ?? "The spell misfires.",
            riskStat,
            riskAmount
        };

        // ✅ Still call resolver for UI / messaging consistency
        resolveSpellRisk(playerStats, damageResult);

        return {
            spellName: spell.name,
            actionType: "spell-explosive",
            attackRoll: { allRolls: [] },
            hitResult: { hit: false },
            damageResult,
            targets: targetEnemy
                ? [{ enemy: targetEnemy, index: enemyIndex ?? 0 }]
                : []
        };
    }

    // -------------------------
    // --- APPLY DAMAGE ---
    // -------------------------
    const magicRes = targetEnemy.combat?.magic_res ?? 0;
    const adjustedDamage = Math.max(0, baseDamage - magicRes);

    targetEnemy.stats.stamina -= adjustedDamage;
    targetEnemy.stats.stamina = Math.max(0, targetEnemy.stats.stamina);

    return {
        spellName: spell.name,
        actionType: "spell-explosive",
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult: {
            hit: true,
            attack: baseDamage,
            damage: adjustedDamage
        },
        targets: [
            { enemy: targetEnemy, index: enemyIndex ?? 0 }
        ]
    };
}