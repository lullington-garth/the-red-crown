// slowBurnSpells.js
import { 
    getEquippedSpell, 
    getWizardColor, 
    checkSpellFailure, 
    failResult 
} from "./spellHelpers.js";

/**
 * Perform a Slow Burn spell
 */
export function handleSlowBurnSpell(playerStats, targetEnemies, { payMagicCost, overrideSpell }) {

    // --- MAGIC COST ---
    if (!payMagicCost(playerStats)) {
        return failResult("Not enough MAGIC to cast the spell.");
    }

    // --- GET SPELL ---
    const spell = overrideSpell || getEquippedSpell(playerStats, "Slow Burn").spell;

    if (!spell) {
        return failResult("No Slow Burn spell available.");
    }

    const wizardColor = getWizardColor(playerStats);

    const baseDamage = spell.attack[wizardColor];
    const normalDuration = spell.duration[wizardColor];

    const failed = checkSpellFailure(spell, wizardColor);

    // --- MISFIRE HANDLING ---
    let appliedDuration = normalDuration;
    let riskDescription = null;
    let riskType = null;
    let SBmisfired = false;

    if (failed) {
        appliedDuration += spell.risk?.amount ?? 0;
        if (appliedDuration < 1) appliedDuration = 1;

        riskDescription = spell.risk?.description ?? "Spell misfired, weaker effect.";
        riskType = spell.risk?.type ?? "misfire";
        SBmisfired = true;
    }

    // --- APPLY EFFECT TO TARGETS ---
    targetEnemies
        .filter(enemy => enemy && enemy.type !== "phantom")
        .forEach(enemy => {

        if (!enemy.effects) enemy.effects = [];

        const existingEffect = enemy.effects.find(
            e => e.type === "slowBurn" && e.name === spell.name
        );

        if (existingEffect) {
            existingEffect.remaining += appliedDuration;
        } else {
            enemy.effects.push({
                type: "slowBurn",
                name: spell.name,
                damage: baseDamage,
                remaining: appliedDuration
            });
        }

    });

    return {
        actionType: "spell-slowburn",
        spellName: spell.name,
        targets: targetEnemies.map(enemy => ({ enemy })),
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult: {
            hit: true,
            attack: 0,
            damage: 0,
            riskType,
            riskDescription,
            SBmisfired
        }
    };
}