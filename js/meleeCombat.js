// meleeCombat.js
import { rollCombatDice } from './dice.js';

/**
 * Rolls a melee attack for the player.
 */
export function rollMeleeAttack(playerStats) {
    return rollCombatDice({
        role: "player",
        baseDice: 2 // can adjust if variable
    });
}

/**
 * Resolves hit for a single melee attack.
 */
export function resolveMeleeHit(attackRoll, enemy, playerStats, weapon) {
    const skill = playerStats.stats.SKILL.current;
    let attack = playerStats.stats.ATTACK.current;

    // Weapon bonus vs enemy type
    const hasEffectiveness =
        weapon?.effectiveness?.bonus_vs?.includes(enemy.type);

    if (hasEffectiveness) {
        const bonus = weapon.effectiveness.attack_bonus || 0;

        attack += bonus;
    }

    const defence = enemy.combat?.defence ?? 0;

    const isDouble =
        attackRoll.allRolls.length === 2 &&
        attackRoll.allRolls[0] === attackRoll.allRolls[1];

    const hit = isDouble || (attackRoll.total <= skill);

    let damage = 0;
    if (hit) {
        damage = isDouble ? attack : Math.max(0, attack - defence);
    }

    return {
        hit,
        damage,
        attack,
        defence,
        isDouble
    };
}

    /**
     * Applies melee damage to a single enemy.
     */
export function applyMeleeDamage(enemy, hitResult, weapon, playerStats) {
    let finalDamage = hitResult.damage;

    const hasDoubleSweep = playerStats?.effects?.some(
        e => e.type === "doubleSweepDamage"
    );

    if (hasDoubleSweep && hitResult.isDouble && finalDamage > 0) {
        finalDamage *= 4;
    }

    // Break condition into parts for visibility
    const condition_hit = hitResult.hit;
    const condition_damage = finalDamage > 0;
    const condition_typeMatch =
        weapon?.effectiveness?.bonus_vs?.includes(enemy.type);

    const isStrongHit =
        condition_hit &&
        condition_damage &&
        condition_typeMatch;

    if (isStrongHit) {
        enemy.justHitStrong = true;
    } 

    if (hitResult.hit && finalDamage > 0) {
        const before = enemy.stats.stamina;

        enemy.stats.stamina = Math.max(0, enemy.stats.stamina - finalDamage);
    }

    return {
        ...hitResult,
        damage: finalDamage,
        enemyDead: enemy.stats.stamina <= 0
    };
}

/**
 * Determines and applies sweeping attack (double-roll) to multiple enemies.
 * Returns an array of results for rendering.
 */
export function performSweepingAttack({
    attackRoll,
    hitResult,
    damageResult,
    enemyInstances,
    enemyIndex,
    playerStats,
    maxSweep = 3
}) {
    if (!attackRoll || !hitResult || !hitResult.isDouble) return [];

    // Build list of active enemies
    const activeEnemies = enemyInstances
        .map((e, i) => e ? { enemy: e, idx: i } : null)
        .filter(e => e && e.enemy && e.enemy.type !== "phantom");

    let targetIndices = [];

    if (activeEnemies.length <= maxSweep) {
        targetIndices = activeEnemies.map(e => e.idx);
    } else {
        const firstIdx = activeEnemies[0].idx;
        const lastIdx = activeEnemies[activeEnemies.length - 1].idx;
        const curr = activeEnemies.find(e => e.idx === enemyIndex)?.idx;
        const currPos = activeEnemies.findIndex(e => e.idx === curr);

        if (curr === firstIdx) {
            targetIndices = activeEnemies.slice(0, maxSweep).map(e => e.idx);
        } else if (curr === lastIdx) {
            targetIndices = activeEnemies.slice(-maxSweep).map(e => e.idx);
        } else {
            targetIndices = activeEnemies
                .slice(currPos - 1, currPos + 2)
                .map(e => e.idx);
        }
    }

    // Apply damage to targets
    const results = targetIndices.map(idx => {
        const enemy = enemyInstances[idx];
        let result;
        if (idx === enemyIndex) {
            result = damageResult; // original target
        } else {
            result = applyMeleeDamage(
                enemy,
                hitResult,
                playerStats.inventory.wornItems.weapon,
                playerStats
            );
        }
        return { enemy, idx, result };
    });

    return results;
}