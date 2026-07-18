// attackSpells.js
import { getEquippedSpell, getWizardColor, checkSpellFailure, failResult } from "./spellHelpers.js";

/**
 * Perform an Attack spell
 */
export function handleAttackSpell(playerStats, targetEnemy, { payMagicCost, overrideSpell }) {

    if (!payMagicCost(playerStats)) {
        return failResult("Not enough MAGIC to cast the spell.");
    }

    let spell;

    if (overrideSpell) {
        spell = overrideSpell;
    } else {
        const result = getEquippedSpell(playerStats, "Attack");
        if (result.error) return result.error;
        spell = result.spell;
    }

    const wizardColor = getWizardColor(playerStats);

    const baseDamage = spell.attack[wizardColor];
    const failed = checkSpellFailure(spell, wizardColor);

    if (failed) {
        return {
            spellName: spell.name,
            attackRoll: { allRolls: [] },
            hitResult: { hit: false },
            damageResult: {
                hit: false,
                damage: 0,
                riskType: spell.risk?.type ?? "misfire",
                riskDescription:
                    spell.risk?.description ?? "The spell misfires with no effect."
            }
        };
    }

    // Apply resistance
    const magicRes = targetEnemy.combat?.magic_res ?? 0;
    const adjustedDamage = Math.max(0, baseDamage - magicRes);

    targetEnemy.stats.stamina -= adjustedDamage;
    targetEnemy.stats.stamina = Math.max(0, targetEnemy.stats.stamina);

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult: {
            hit: true,
            attack: baseDamage,
            damage: adjustedDamage
        }
    };
}