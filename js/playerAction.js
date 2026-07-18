// playerAction.js
import * as MeleeCombat from './meleeCombat.js';
import * as MagicCombat from './combatMagic.js';
// import * as ItemCombat from './itemCombat.js';

function isPhantom(enemy) {
    return enemy?.type === "phantom";
}
/**
 * Perform a player action (melee, spell, or item)
 */
export function performPlayerAction({ actionType, playerStats, targetEnemy, weapon }) {
    switch (actionType) {
        case "melee":
            const attackRoll = MeleeCombat.rollMeleeAttack(playerStats);
            const hitResult = MeleeCombat.resolveMeleeHit(attackRoll, targetEnemy, playerStats, weapon);
            const damageResult = MeleeCombat.applyMeleeDamage(targetEnemy, hitResult, weapon, playerStats);
            return { attackRoll, hitResult, damageResult };

        case "spell1":
        case "spell2":
        case "spell3":
        case "spell4":
        case "spell5":
            return MagicCombat.performSpellAction(actionType, playerStats, targetEnemy);

        case "item1":
        case "item2":
            return ItemCombat.useCombatItem(actionType, playerStats, targetEnemy);

        default:
            throw new Error(`Unknown player action type: ${actionType}`);
    }
}

/**
 * Perform a full player turn (melee, spell, item)
 * Returns a structured object with all results for UI rendering.
 */
export function performAttack({
    actionType = "melee",
    playerStats,
    enemyInstances,
    enemyIndex
}) {
    let targetEnemies = enemyInstances[enemyIndex];
    let aoeTargetIndices = [];

    // --- Determine spell targets ---
    if (actionType.startsWith("spell")) {
        const result = MagicCombat.resolveSpellTargets({
            actionType,
            playerStats,
            enemyInstances,
            enemySlots: enemyInstances.map((_, i) => i),
            enemyIndex
        });

        targetEnemies = result.targetEnemies;
        aoeTargetIndices = result.targetIndices;
    }

    // --- Perform action ---
    const result = performPlayerAction({
        actionType,
        playerStats,
        targetEnemy: targetEnemies,
        weapon: playerStats.inventory.wornItems.weapon
    });

    const { attackRoll, hitResult, damageResult, spellName, usesDice } = result;
    const riskDescription = damageResult?.riskDescription;
    const customRiskDescription = damageResult?.customRiskDescription;

    // --- Sweep attack ---
    let sweepResults = [];
    if (hitResult?.isDouble) {
        sweepResults = MeleeCombat.performSweepingAttack({
            attackRoll,
            hitResult,
            damageResult,
            enemyInstances,
            enemyIndex,
            playerStats
        });
    }

    // ✅ --- NORMALIZED TARGET LOGIC (FIXED) ---
// ✅ --- NORMALIZED TARGET LOGIC (INSTANCE SAFE + SPELL SAFE) ---
let targets = [];

// 1️⃣ BEST SOURCE: actual resolved targets from the spell
if (damageResult?.targets && Array.isArray(damageResult.targets)) {
    targets = damageResult.targets
        .map(enemy => {
            const index = enemyInstances.findIndex(e => e === enemy);
            return index !== -1 ? { enemy, index } : null;
        })
        .filter(Boolean);
}

// 2️⃣ Fallback to AoE indices (true AoE spells only)
else if (aoeTargetIndices && aoeTargetIndices.length > 0) {
    targets = aoeTargetIndices
        .map(index => ({
            enemy: enemyInstances[index],
            index
        }))
        .filter(t => t.enemy && !isPhantom(t.enemy)); // ❗ BLOCK PHANTOMS
}

// 3️⃣ Fallback to provided targetEnemies
else if (targetEnemies) {
    if (Array.isArray(targetEnemies)) {
        targets = targetEnemies
            .map(enemy => {
                const index = enemyInstances.findIndex(e => e === enemy);
                return index !== -1 ? { enemy, index } : null;
            })
            .filter(Boolean);
    } else {
        const index = enemyInstances.findIndex(e => e === targetEnemies);
        targets = index !== -1 ? [{ enemy: targetEnemies, index }] : [];
    }
}

// 4️⃣ Final fallback
if (!targets || targets.length === 0) {
    const enemy = enemyInstances[enemyIndex];

    if (!isPhantom(enemy)) {
        targets = [{ enemy, index: enemyIndex }];
    } else {
        targets = []; // ❗ phantom cannot be targeted even as fallback
    }
}

    // --- Return clean result object ---
    return {
        actionType,
        attackRoll,
        hitResult,
        damageResult,
        spellName,
        riskDescription,
        customRiskDescription,
        usesDice,
        sweepResults,
        aoeTargetIndices,
        targets
    };
}