// combatMagic.js
import { getBookSpells } from "./spells.js";
import { handleAttackSpell } from "./attackSpells.js";
import { handleExplosiveSpell } from "./explosiveSpells.js";
import { handleSlowBurnSpell } from "./slowBurnSpells.js";
import { handleDefenceSpell } from "./defenceSpells.js";
import { handleOtherSpell as dispatchOtherSpell } from "./otherSpells.js";

// --- Helper: Generic AoE target selection ---
/**
 * Get the targets for an AoE spell
 * @param {number} targetIndex - index of the selected enemy
 * @param {number} aoeLimit - max number of targets the spell can hit
 * @param {Array} enemyInstances - all live enemies
 * @returns {Object} { targetEnemies, targetIndices }
 */
function getAoETargets(targetIndex, aoeLimit, enemyInstances) {

    let targets = [];

    // --- FORWARD ---
    for (let i = targetIndex; i < enemyInstances.length && targets.length < aoeLimit; i++) {

        if (enemyInstances[i]) {
            targets.push({ enemy: enemyInstances[i], idx: i });
        } else {
        }
    }

    // --- BACKWARD ---
    if (targets.length < aoeLimit) {
        for (let i = targetIndex - 1; i >= 0 && targets.length < aoeLimit; i--) {

            if (enemyInstances[i]) {
                targets.unshift({ enemy: enemyInstances[i], idx: i });
            } else {
            }
        }
    }
    return {
        targetEnemies: targets.map(t => t.enemy),
        targetIndices: targets.map(t => t.idx)
    };
}

let magicChargedThisCombat = false;

/**
 * Dispatcher for all spell types
 */
export function performSpellAction(actionType, playerStats, targetEnemy) {
    switch (actionType) {
        case "spell1":
            return handleAttackSpell(playerStats, targetEnemy, { payMagicCost });

        case "spell2":
            return handleExplosiveSpell(playerStats, targetEnemy, { payMagicCost });

        case "spell3":
            return handleSlowBurnSpell(playerStats, targetEnemy, { payMagicCost });

        case "spell4":
            return handleDefenceSpell(playerStats, targetEnemy, { payMagicCost });

        case "spell5":
            return performOtherSpell(playerStats, targetEnemy);

        default:
            throw new Error(`Unknown spell type: ${actionType}`);
    }
}

/**
 * Special dispatcher for "Other" spells
 */
export function performOtherSpell(playerStats, targetEnemies) {
    
    if (!payMagicCost(playerStats)) {
        return failResult("Not enough MAGIC to cast the spell.");
    }

    const bookItem = playerStats.inventory?.wornItems?.book;

    if (!bookItem) {
        return failResult("You have no spellbook equipped.");
    }

    const bookSpells = getBookSpells(bookItem.id);
    const spell = bookSpells.find(s => s.type === "Other");

    if (!spell) {
        return failResult("No 'Other' spell found in spellbook.");
    }

    // Delegate to the shared helper registry
    return dispatchOtherSpell(playerStats, targetEnemies, spell, { payMagicCost, resolveSpellRisk });
}

/**
 * Deducts the flat MAGIC cost at the start of combat
 */
export function payMagicCost(playerStats) {
    if (!magicChargedThisCombat) {
        const magicCost = 2;
        const magicStat = playerStats.stats.MAGIC;

        if (magicStat.current < magicCost) {
            console.warn("Not enough MAGIC to start using spells this combat.");
            return false;
        }

        magicStat.current -= magicCost;

        // ✅ Enforce minimum cap
        const minValue = magicStat.min ?? 0;
        if (magicStat.current < minValue) {
            magicStat.current = minValue;
        }

        magicChargedThisCombat = true;
    }
    return true;
}

export function clearEndOfCombatEffects(playerStats) {

    if (!playerStats.effects || playerStats.effects.length === 0) return;

    playerStats.effects.forEach(effect => {
        revertEffect(playerStats, effect);
    });

    playerStats.effects = [];
}

function revertEffect(playerStats, effect) {
    if (!effect.revert) return;

    const stat = effect.stat;

    if (playerStats.stats?.[stat]?.current !== undefined) {
        playerStats.stats[stat].current -= effect.amount;

        // Clamp to min
        const min = playerStats.stats[stat].min ?? 0;
        if (playerStats.stats[stat].current < min) {
            playerStats.stats[stat].current = min;
        }

    } else if (playerStats.combat?.[stat?.toLowerCase()] !== undefined) {
        playerStats.combat[stat.toLowerCase()] -= effect.amount;
    }
}

export function resetMagicForNewCombat() {
    magicChargedThisCombat = false;
}

export function canStartSpellcasting(playerStats) {
    return magicChargedThisCombat || playerStats.stats.MAGIC.current >= 2;
}

/**
 * Apply any lingering effects on a target enemy
 */
export function applyEnemyEffects(enemy) {
    if (!enemy.effects || enemy.effects.length === 0) return 0;

    let totalDamage = 0;

    enemy.effects.forEach(effect => {
        // --- Slow Burn ---
        if (effect.type === "slowBurn") {
            const magicRes = enemy.combat?.magic_res ?? 0;
            const damage = Math.max(0, effect.damage - magicRes);

            enemy.stats.stamina -= damage;
            enemy.stats.stamina = Math.max(0, enemy.stats.stamina);

            totalDamage += damage;
            effect.remaining -= 1;
        }

    });

    // remove expired effects
    enemy.effects = enemy.effects.filter(e => e.remaining > 0);

    return totalDamage;
}

/**
 * Apply any lingering effects on the player
 */
export function applyPlayerEffects(playerStats, refreshButtons) {
    if (!playerStats.effects || playerStats.effects.length === 0) return false;

    let chaosJustExpired = false;

    playerStats.effects = playerStats.effects.filter(effect => {

        // --- Revertable Buffs (Strength + Skill) ---
        if ((effect.type === "strengthBuff"|| effect.type === "doubleAttack" || effect.type === "skillBuff" || effect.type === "skillBuffP" || effect.type === "strengthBuffP" || effect.type === "strengthBuffO" || effect.type === "skillDeBuff") && effect.revert) {
            if (effect.justApplied) effect.justApplied = false;
            else effect.remaining -= 1;

            if (effect.remaining <= 0) {
                const stat = effect.stat;

                if (playerStats.stats?.[stat]?.current !== undefined) {
                    playerStats.stats[stat].current = Math.max(
                        0,
                        playerStats.stats[stat].current -= effect.amount
                    );
                } else if (playerStats.combat?.[stat.toLowerCase()] !== undefined) {
                    playerStats.combat[stat.toLowerCase()] -= effect.amount;
                }
            }
        }

        // --- Healing Buff ---
        if (effect.type === "healingBuff") {
            const stat = effect.stat || "STAMINA";

            if (!playerStats.stats?.[stat]) {
                playerStats.stats[stat] = { current: 0, max: 10, min: 0 };
            }

            playerStats.stats[stat].current += effect.amount;

            if (playerStats.stats[stat].current > playerStats.stats[stat].max) {
                playerStats.stats[stat].current = playerStats.stats[stat].max;
            }

            effect.remaining -= 1;
        }

        // --- Invulnerability ---
        if (effect.type === "invulnerable") {
            if (effect.justApplied) effect.justApplied = false;
            else effect.remaining -= 1;
        }

        // --- Half Damage ---
        if (effect.type === "halfDamage") {
            if (effect.justApplied) effect.justApplied = false;
            else effect.remaining -= 1;
        }

        // --- Hazed ---
        if (effect.type === "hazed") {
            if (effect.justApplied) effect.justApplied = false;
            else effect.remaining -= 1;
        }

        // --- Chaos Spell ---
        if (effect.type === "chaosSpell") {
            if (effect.justApplied) effect.justApplied = false;
            else effect.remaining -= 1;

            if (effect.remaining <= 0) {
                chaosJustExpired = true;
            }
        }

        // --- Chaos Trigger ---
        if (effect.type === "chaosTrigger") {
            if (effect.justApplied) effect.justApplied = false;
            else effect.remaining -= 1;
        }

        // --- Veil Buff ---
        if (effect.type === "veilBuff") {
            effect.remaining -= 1;
        }

        // Keep effect only if still active
        return effect.remaining > 0;
    });

    // ✅ Refresh AFTER state is updated
    if (chaosJustExpired && typeof refreshButtons === "function") {
        refreshButtons();
    }

    return chaosJustExpired;
}

/**
 * Standard failure response
 */
function failResult(message) {
    return {
        attackRoll: { allRolls: [] },
        hitResult: { hit: false },
        damageResult: {
            hit: false,
            damage: 0,
            riskType: "misfire",
            riskDescription: message
        }
    };
}

export function resolveSpellRisk(playerStats, damageResult) {
    const outcome = {
        stunned: false,
        statChanges: [],
        log: []
    };

    if (!damageResult.riskType) return outcome;

    switch (damageResult.riskType) {
        case "backfire":
            if (damageResult.riskStat && damageResult.riskAmount) {
                const stat = damageResult.riskStat.toUpperCase();

                if (playerStats.stats[stat]) {
                    playerStats.stats[stat].current += damageResult.riskAmount;
                    if (playerStats.stats[stat].current < 0) {
                        playerStats.stats[stat].current = 0;
                    }

                    outcome.statChanges.push({
                        stat,
                        value: playerStats.stats[stat]
                    });
                }
            }
            break;

        case "stunned":
            outcome.stunned = true;
            break;

        case "misfire":
        default:
            // no state change, just informational
            break;
    }

    outcome.log.push({
        type: damageResult.riskType,
        description: damageResult.riskDescription
    });

    return outcome;
}

export function resolveSpellTargets({
    actionType,
    playerStats,
    enemyInstances,
    enemySlots,
    enemyIndex
}) {
    const spellTypeMapping = {
        spell3: "Slow Burn",
        spell4: "Defence",
        spell5: "Other"
    };

    // Only spells with AoE
    if (!["spell3", "spell4", "spell5"].includes(actionType)) {
        return {
            targetEnemies: enemyInstances[enemyIndex],
            targetIndices: []
        };
    }

    const bookItem = playerStats.inventory?.wornItems?.book;
    if (!bookItem) {
        return { targetEnemies: [], targetIndices: [] };
    }

    const bookSpells = getBookSpells(bookItem.id);
    const spellType = spellTypeMapping[actionType];
    const spell = bookSpells.find(s => s.type === spellType);

    if (!spell) {
        return { targetEnemies: [], targetIndices: [] };
    }

    const wizardColor = playerStats.wizardColor.toLowerCase();
const aoeLimit = spell.areaOfEffect?.[wizardColor];

//  If no AoE defined → pass ALL enemies
if (!aoeLimit) {
    return {
        targetEnemies: enemyInstances,
        targetIndices: enemyInstances.map((_, i) => i)
    };
}
const ACTIVE_ENEMY_LIMIT = 6;
const activeEnemies = enemyInstances.slice(0, ACTIVE_ENEMY_LIMIT);

    return getAoETargets(enemyIndex, aoeLimit, activeEnemies);
}