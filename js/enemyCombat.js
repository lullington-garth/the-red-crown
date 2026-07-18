// enemyCombat.js

import { rollMultipleEnemyDice, mapEnemyDice } from "./dice.js";
import { renderEnemyDice } from "./diceUI.js";
import { showCombatMessage, showAbsorbFireMessage, showAbsorbSpecialMessage } from "./combatMessage.js";
import { renderEnemyEffects, renderPlayer } from "./combatRenderer.js";
import { resolveEnemySpecial } from "./enemySpecialAttacks.js";
import { consumeItem } from "./useItem.js";
import { getActiveCompanions, applyCompanionDamage } from "./combatCompanions.js";
import { refreshInventoryUI } from "./inventoryUI.js";

export function refreshEnemyDice(enemyInstances, enemySlots) {
    enemySlots.forEach((cell, i) => {
        const enemy = enemyInstances[i];
        if (!enemy || enemy.stats.stamina <= 0) return;

        const diceDiv = cell.querySelector(".enemy-dice");
        if (!diceDiv) return;

        if (enemy.lastDiceRolls) {
            renderEnemyDice(diceDiv, enemy.lastDiceRolls, false);
        }
    });
}

function shouldUseSpecial(enemy) {
    const specialType = enemy.special?.attack;

    if (!specialType) return false;

    return Math.random() < 0.2;
}

function resolveEnemyTarget(playerStats) {
    const companions = getActiveCompanions(playerStats);

    const roll = Math.random();
    let cumulative = 0;

    for (const companion of companions) {
        const chance = Math.max(0, Math.min(1, companion.targetChance || 0));

        cumulative += chance;

        if (roll < cumulative) {
            return companion.id;
        }
    }

    return "player";
}

function getEnemyDamageStat(enemy) {
    const stats = enemy.combat || {};
    const type = stats.attack_type || "melee";

    switch (type) {
        case "magic":
            return {
                value: stats.magic || 0,
                resolvedType: "magic"
            };

        case "melee":
            return {
                value: stats.attack || 0,
                resolvedType: "melee"
            };

        case "both": {
            const useMagic = Math.random() < 0.5;

            return useMagic
                ? {
                    value: stats.magic || 0,
                    resolvedType: "magic"
                }
                : {
                    value: stats.attack || 0,
                    resolvedType: "melee"
                };
        }

        default:
            return {
                value: stats.attack || 0,
                resolvedType: "melee"
            };
    }
}

function statValue(v) {
    return typeof v === "object" ? v.current : (v ?? 0);
}

function isInvulnerable(playerStats) {
    return playerStats.effects?.some(e => e.type === "invulnerable");
}

function isHalfDamage(playerStats) {
    return playerStats.effects?.some(e => e.type === "halfDamage");
}

function isHazed(playerStats) {
    return playerStats.effects?.some(e => e.type === "hazed");
}

export function performEnemyAttacks({
    enemyInstances,
    enemySlots,
    playerStats,
    cells
}) {
    let physicalDamageTotal = 0;
    let magicDamageTotal = 0;
    let reflectedHits = [];

    enemySlots.forEach((cell, i) => {
        const enemy = enemyInstances[i];
        const targetId = resolveEnemyTarget(playerStats);

        if (!enemy) return;

        let fireBlocked = false;
        let dragonScalePetal = null;
        let specialBlocked = false // TESTING LINE
        let splinterStones = null // TESTING LINE
        if (!enemy) return;

        // Skip dead enemies
        if (enemy.stats.stamina <= 0) return;

        const diceDiv = cell.querySelector(".enemy-dice");
        if (!diceDiv) return;

        // --- Stun Check ---
        if (enemy.effects?.some(e => e.type === "enemyStunned")) {
            showCombatMessage(diceDiv, {
                type: "enemy",
                result: "stun",
                text: "Stunned",
                top: "87%"
            });
            return;
        }

        // --- Roll setup ---
        const diceConfig = mapEnemyDice(enemy.combat?.dice);
        const rolls = rollMultipleEnemyDice(1, diceConfig);

        // Remember these rolls so they can be redrawn later
        enemy.lastDiceRolls = rolls;

        renderEnemyDice(diceDiv, rolls);
                setTimeout(() => {
        const total = rolls[0].total;
        const skill = statValue(enemy.stats.skill);
//console.log("🎲 RAW ROLL:", rolls[0]);

        const diceValues = rolls[0].rolls || [];
        const rolledDouble =
            diceValues.length >= 2 &&
            diceValues.every(v => v === diceValues[0]);

        const hasDoubleAbility =
            enemy.special?.attack === "DOUBLE";

        // --- Determine attack type ---
        let isSpecial = shouldUseSpecial(enemy);
        let baseAttack, resolvedType, specialResult = null;

        if (isSpecial) {
            specialResult = resolveEnemySpecial(enemy, {
                rolls,
                total,
                skill
            });

dragonScalePetal = getDragonScalePetal(playerStats);
const isFireAttack = specialResult?.subtype === "FIRE";

            if (isFireAttack && dragonScalePetal) {
                baseAttack = 0;
                fireBlocked = true;
            } else {
                baseAttack = specialResult.damage;
            }

splinterStones = getSplinterStones(playerStats);
const isSpecialAttack = specialResult?.subtype !== "";

            if (isSpecialAttack && splinterStones) {
                baseAttack = 0;
                specialBlocked = true;
            } else {
                baseAttack = specialResult.damage;
            }

            resolvedType = specialResult.type || "special";
        } else {
            const normal = getEnemyDamageStat(enemy);
            baseAttack = normal.value;
            resolvedType = normal.resolvedType;
        }

    
        // --- Apply modifiers ---
        const hasDoubleDamage = enemy.effects?.some(e => e.type === "doubleDamage");
        const hasReflect = enemy.effects?.some(e => e.type === "reflect");

        // DOUBLE special ability
        const triggeredDouble =
            hasDoubleAbility && rolledDouble;


//console.log({
//    diceValues,
//    rolledDouble,
//    hasDoubleAbility
//});

        let finalAttack = baseAttack;

        if (hasDoubleDamage) {
            finalAttack *= 2;
        }

        if (triggeredDouble) {
            finalAttack *= 2;
        }

        // --- Miss ---
        // DOUBLE attacks always hit on doubles
        if (total > skill && !triggeredDouble) {
            showCombatMessage(diceDiv, {
                type: "enemy",
                result: "miss",
                text: "Enemy Missed",
                top: "87%"
            });
            return;
        }

        // Block Dragon Fire
if (fireBlocked && dragonScalePetal && cells?.dice) {

showAbsorbFireMessage(cells.dice);
consumeItem(playerStats, dragonScalePetal);

if (cells.player) {
    renderPlayer(cells.player, playerStats, cells.playerEffects);
}
}

        // Block Special Attack
if (specialBlocked && splinterStones && cells?.dice) {

showAbsorbSpecialMessage(cells.dice);
consumeItem(playerStats, splinterStones);

if (cells.player) {
    renderPlayer(cells.player, playerStats, cells.playerEffects);
}
}

        // --- Reflect ---
        if (hasReflect) {
            showCombatMessage(diceDiv, {
                type: "enemy",
                result: "stun",
                text: "Reflected Damage",
                top: "87%"
            });

            reflectedHits.push({
                enemy,
                index: i,
                damage: finalAttack
            });

            return;
        }

        // Targetting
        if (!enemy._lastTargetLog) enemy._lastTargetLog = [];

        enemy._lastTargetLog.push({
            target: targetId,
            damage: finalAttack,
            type: resolvedType
        });

        if (targetId === "player") {
    if (resolvedType === "magic") {       
        magicDamageTotal += finalAttack;
    } else {
        physicalDamageTotal += finalAttack;
    }
}        

        // --- Messaging ---
        if (hasDoubleDamage || triggeredDouble) {
            showCombatMessage(diceDiv, {
                type: "enemy",
                result: "double",
                text: "Enemy Hit ×2",
                top: "87%"
            });
        } else {
            showCombatMessage(diceDiv, {
                type: "enemy",
                result: isSpecial ? "special" : resolvedType,
                text: isSpecial
                    ? (specialResult?.label || "Enemy Special!")
                    : resolvedType === "magic"
                        ? "Enemy Magic"
                        : "Enemy Attack",
                top: "87%"
            });
        }

        // --- Reset double damage flag ---
        if (enemy.doubleDamage) {
            delete enemy.doubleDamage;
        }

        // --- Splinter Stones (magic absorption) ---
//        const splinter = getSplinterStones(playerStats);

//        if (splinter && magicDamageTotal > 0) {
//            magicDamageTotal = 0;
//            showAbsorbMagicMessage(cells.dice);
//            consumeItem(playerStats, splinter);
//        }

         }, 1600);
    });
    return {
        totalEnemyDamage: physicalDamageTotal + magicDamageTotal,
        physicalDamageTotal,
        magicDamageTotal,
        reflectedHits
    };

}

export function performEnemyTurn({
    enemyInstances,
    cells,
    enemySlots,
    playerStats,
    combatState,

    applyEnemyEffects,
    onEffectApplied,
    onEnemyDamaged,
    onEnemyDeath,
    cleanupDeadEnemies,
    checkPlayerDeath,
    endEnemyTurn
}) {
    // --- Apply status effects first ---
    enemyInstances.forEach((enemy, index) => {
        const effectDamage = applyEnemyEffects(enemy);

        if (effectDamage > 0) {
            const cell = enemySlots[index];
            onEffectApplied(cell, enemy);
            onEnemyDamaged(cell, enemy);
            onEnemyDeath(enemy, cell, index);
        }
    });

    cleanupDeadEnemies();

    // --- Perform enemy attacks ---
    const {
        physicalDamageTotal,
        magicDamageTotal,
        reflectedHits
    } = performEnemyAttacks({
        enemyInstances,
        enemySlots,
        playerStats,
        cells
    });

    setTimeout(() => {
        // --- Base damage ---

        let finalDamage = physicalDamageTotal + magicDamageTotal;

        // --- Apply damage to player ---
// --- Apply damage based on target log ---
    setTimeout(() => {
        applyCompanionDamage(playerStats, enemyInstances, combatState);
        enemySlots.forEach((cell, i) => {
            const enemy = enemyInstances[i];
            if (!enemy?._lastTargetLog) return;
            enemy._lastTargetLog.forEach(hit => {

                // -----------------------
                // PLAYER DAMAGE
                // -----------------------
        if (hit.target === "player" && hit.damage > 0) {

            let damage = hit.damage;

            if (isInvulnerable(playerStats)) {
                damage = 0;
            }

            if (isHalfDamage(playerStats)) {
                damage = Math.floor(damage / 2);
            }

            if (isHazed(playerStats)) {
                damage = Math.floor(damage * 0.75);
            }

            playerStats.stats.STAMINA.current =
                Math.max(0, playerStats.stats.STAMINA.current - damage);

            const playerCell = cells.player;

            if (playerCell) {
                const staminaP = Array.from(playerCell.querySelectorAll("p"))
                    .find(p => p.textContent.startsWith("STAMINA:"));

                if (staminaP) {
                    const s = playerStats.stats.STAMINA;
                    staminaP.textContent = `STAMINA: ${s.current}/${s.max}`;
                }
            }
        }

        // -----------------------
        // COMPANIONS (placeholder hook)
        // -----------------------
        else if (hit.target !== "player") {
            // future hook for combatCompanions.js
            // applyCompanionDamage(hit.target, hit.damage);
        }
    });

    // clear after processing
    enemy._lastTargetLog = [];
});

// --- death check only after all damage applied ---
checkPlayerDeath();
    }, 1000);
        // --- Apply reflected damage to enemies ---
        reflectedHits.forEach(({ enemy, index, damage }) => {
            if (!enemy || enemy.stats.stamina <= 0) return;

            enemy.stats.stamina = Math.max(0, enemy.stats.stamina - damage);

            const cell = enemySlots[index];
            if (cell) {
                onEnemyDamaged(cell, enemy);
                onEnemyDeath(enemy, cell, index);
            }
        });

        cleanupDeadEnemies();
    setTimeout(() => {
        // --- Reduce effect durations ---
        enemyInstances.forEach((enemy, index) => {
            if (!enemy.effects) return;

            enemy.effects.forEach(effect => {

                // --- defenceDebuff ---
                if (effect.type === "defenceDebuff" && effect.revert) {
                    effect.remaining -= 1;

                    if (effect.remaining <= 0) {
                        const statKey = effect.stat?.toLowerCase();
                        let targetObj = null;

                        if (enemy.combat && statKey in enemy.combat) {
                            targetObj = enemy.combat;
                        } else if (enemy.stats && statKey in enemy.stats) {
                            targetObj = enemy.stats;
                        }

                        if (targetObj && typeof targetObj[statKey] === "number") {
                            targetObj[statKey] -= effect.amount;
                        }
                    }
                }

                // --- Simple duration effects ---
                if (
                    effect.type === "enemyStunned" ||
                    effect.type === "reflect" ||
                    effect.type === "doubleDamage"
                ) {
                    effect.remaining -= 1;
                }
            });

            // Remove expired effects
            enemy.effects = enemy.effects.filter(e => e.remaining > 0);

            const cell = enemySlots[index];
            if (cell) {
                renderEnemyEffects(cell, enemy);
            }
        });
    }, 1000);
        endEnemyTurn();
    }, 600);
}

function getSplinterStones(playerStats) {
    const worn = playerStats.inventory?.wornItems;

    return worn?.carried?.id === "0095"
        ? worn.carried
        : null;
}

function getDragonScalePetal(playerStats) {
    const worn = playerStats.inventory?.wornItems;

    return worn?.carried?.id === "0098"
        ? worn.carried
        : null;
}