// defenceSpells.js
import { 
    getEquippedSpell, 
    getWizardColor, 
    checkSpellFailure 
} from "./spellHelpers.js";

/**
 * Perform a Defence spell
 */
export function handleDefenceSpell(playerStats, targetEnemy, context = {}) {

    // --- VALIDATE TARGET ---
    if (!targetEnemy) {
        console.log("🛡️ No enemy selected for Defence Spell!");
        return {
            actionType: "spell-defence",
            attackRoll: { allRolls: [0], total: 0 },
            hitResult: { hit: false },
            damageResult: { hit: false, attack: 0, damage: 0 }
        };
    }

    const enemies = Array.isArray(targetEnemy) ? targetEnemy : [targetEnemy];

    if (!enemies.length) {
        console.log("🛡️ Invalid enemy target!");
        return {
            actionType: "spell-defence",
            attackRoll: { allRolls: [0], total: 0 },
            hitResult: { hit: false },
            damageResult: { hit: false, attack: 0, damage: 0 }
        };
    }

    // --- GET SPELL (support chaos override) ---
    let spell;

    if (context.overrideSpell) {
        spell = context.overrideSpell;
    } else {
        const result = getEquippedSpell(playerStats, "Defence");
        if (result.error) return result.error;
        spell = result.spell;
    }

    const wizardColor = getWizardColor(playerStats);

    // --- MISFIRE CHECK ---
    const failed = checkSpellFailure(spell, wizardColor);

    if (failed) {
        return {
            actionType: "spell-defence",
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

    // --- APPLY EFFECT ---
    const enemyMod = spell.enemyMod;
    const durationToAdd = spell.duration?.[wizardColor] ?? 1;

    enemies
        .filter(enemy => enemy && enemy.type !== "phantom")
        .forEach(enemy => {

        if (!enemy || !enemyMod?.stat) return;

        const statKey = enemyMod.stat.toLowerCase();

        let targetObj = null;

        if (enemy.combat && statKey in enemy.combat) {
            targetObj = enemy.combat;
        } else if (enemy.stats && statKey in enemy.stats) {
            targetObj = enemy.stats;
        }

        if (!targetObj) return;

        if (!enemy.effects) enemy.effects = [];

        const existingEffect = enemy.effects.find(
            e =>
                e.type === "defenceDebuff" &&
                e.name === spell.name &&
                e.stat === enemyMod.stat
        );

        if (existingEffect) {
            existingEffect.remaining += durationToAdd;
        } else {
            if (typeof targetObj[statKey] === "number") {
                targetObj[statKey] = Math.max(
                    0,
                    targetObj[statKey] + enemyMod.amount
                );
            }

            enemy.effects.push({
                type: "defenceDebuff",
                name: spell.name,
                stat: enemyMod.stat,
                amount: enemyMod.amount,
                remaining: durationToAdd,
                revert: true
            });
        }

    });

    return {
        actionType: "spell-defence",
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult: {
            hit: true,
            attack: 0,
            damage: 0
        }
    };
}