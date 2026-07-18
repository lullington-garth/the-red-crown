// otherSpells.js
import { rollCombatDice } from './dice.js';
/**
 * Registry of all "Other" spell handlers
 */
function isPhantom(enemy) {
    return enemy?.type === "phantom";
}

const OTHER_SPELL_HANDLERS = {
    "spell-005": handleRootedWill,
    "spell-010": handleBattleFury,
    "spell-045": handleGroundedFocus,
    "spell-055": handleOvercharge,
    "spell-060": handleElementalSurge,
    "spell-025": handleBurningBlood,
    "spell-030": handleSkySkimmer,
    "spell-015": handleDeepDarkBlue,
    "spell-035": handleRoarOfTheWild,
    "spell-050": handleMirrorSurge,
    "spell-040": handleFromDeepWithin,
    "spell-020": handleHealingSkies
};

/**
 * Main dispatcher for Other spells
 */
export function handleOtherSpell(playerStats, targetEnemies, spell, context) {
    const handler = OTHER_SPELL_HANDLERS[spell.id];

    if (!handler) {
        console.warn(`No handler found for Other spell: ${spell.id}`);
        return failResult(spell.name ?? "Unknown magical effect");
    }

    // Call the specific spell handler
    const result = handler(playerStats, targetEnemies, spell, context);

    // Ensure spellName is included
    if (result.damageResult && !result.damageResult.spellName) {
        result.damageResult.spellName = spell.name;
    }

    return result;
}

// --- From Deep Within ---
export function handleFromDeepWithin(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const durationRounds = spell.duration?.[wizardColor] ?? 2;
    const riskMod = spell.riskMod[wizardColor] ?? 0;
    const failed = Math.random() < (riskMod / 100);
    const damageResult ={}

const currentLuck = playerStats.stats?.LUCK?.current ?? 0;

if (currentLuck <= 0) {
    const damageResult = {
        hit: false,
        damage: 0,
        attack: 0,
        spellName: spell.name,
        riskType: "misfire",
        riskDescription: "",
        riskStat: "LUCK",
        riskAmount: 0, // 🚫 no deduction
        customRiskDescription: "This spell requires LUCK to cast.\nCurrent LUCK = 0"
    };

    // Still pass through resolver so UI behaves consistently
    if (context?.resolveSpellRisk) {
        context.resolveSpellRisk(playerStats, damageResult);
    }

    return {
        spellName: spell.name,
        actionType: "spell", // ✅ important for your renderer
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: false },
        damageResult
    };
}


    if (!playerStats.effects) playerStats.effects = [];

    // --- APPLY RISK (LUCK -1) ---
    const riskStat = "LUCK";
    const riskAmount = -1;
    if (failed) {
        damageResult.hit = false;
        damageResult.damage = 0;
        damageResult.attack = 0;
        damageResult.spellName = spell.name;
        damageResult.riskType = "misfire";
        damageResult.riskDescription = "Weak spell casting. Magic drained for 2 rounds.\nLuck still charged.\nLUCK -1";
        damageResult.riskStat = riskStat;
        damageResult.riskAmount = riskAmount;
        damageResult.customRiskDescription = "";
    } else {
        damageResult.hit = true;
        damageResult.damage = 0;
        damageResult.attack = 0;
        damageResult.spellName = spell.name;
        damageResult.riskType = "misfire";
        damageResult.riskDescription = "";
        damageResult.riskStat = riskStat;
        damageResult.riskAmount = riskAmount;
        damageResult.customRiskDescription = "From Deep Within requires luck to cast\nLUCK -1";
    }

    // Apply LUCK change with clamp
    if (playerStats.stats[riskStat]) {
        playerStats.stats[riskStat].current += riskAmount;
        if (playerStats.stats[riskStat].min !== undefined) {
            playerStats.stats[riskStat].current = Math.max(
                playerStats.stats[riskStat].current,
                playerStats.stats[riskStat].min
            );
        }
        if (playerStats.stats[riskStat].max !== undefined) {
            playerStats.stats[riskStat].current = Math.min(
                playerStats.stats[riskStat].current,
                playerStats.stats[riskStat].max
            );
        }
    }

    // Pass through resolver for UI / consistency
    if (context?.resolveSpellRisk) {
        context.resolveSpellRisk(playerStats, damageResult);
    }

// --- APPLY CHAOS SPELL EFFECT (ALWAYS) ---
const existingChaos = playerStats.effects.find(e => e.type === "chaosSpell");

if (existingChaos) {
    existingChaos.remaining += durationRounds;
} else {
    playerStats.effects.push({
        type: "chaosSpell",
        name: spell.name,
        remaining: durationRounds,
        revert: false,
        justApplied: true
    });
}

// --- APPLY CHAOS TRIGGER (SUCCESS ONLY) ---
if (!failed) {
    const existingTrigger = playerStats.effects.find(e => e.type === "chaosTrigger");

    if (existingTrigger) {
        existingTrigger.remaining += durationRounds;
    } else {
        playerStats.effects.push({
            type: "chaosTrigger",
            remaining: durationRounds,
            justApplied: true
        });
    }
}

    // --- DISABLE THE SPELL BUTTON ---
    if (context?.button instanceof HTMLElement) {
        context.button.disabled = true;
        context.button.style.opacity = 0.5; // optional visual feedback
        context.button.style.cursor = "not-allowed";
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: damageResult.hit },
        damageResult
    };
}

// --- Mirror Surge ---
export function handleMirrorSurge(playerStats, targetEnemies, spell, context, playerTarget) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    // --- Determine if spell fails ---
    const failed = Math.random() < (riskMod / 100);

    // --- Limit to only active enemies (max 6) ---
    const activeEnemies = targetEnemies.slice(0, 6);

    // --- Roll 1d6 using dice.js ---
    const rollObj = rollCombatDice({ role: 'player', baseDice: 1 });
    const totalTargets = Math.min(rollObj.total, activeEnemies.length);

    // --- Pick the guaranteed player target first ---
    const guaranteedTarget = activeEnemies.find(e => playerTarget && e.id === playerTarget.id);

    // --- Remaining pool excludes the guaranteed target ---
    const remainingEnemies = activeEnemies.filter(e => !guaranteedTarget || e.id !== guaranteedTarget.id);

    // --- Shuffle remaining enemies and pick enough to fill the totalTargets ---
    const shuffled = remainingEnemies.sort(() => 0.5 - Math.random());
    const additionalTargets = shuffled.slice(0, totalTargets - (guaranteedTarget ? 1 : 0));

    // --- Combine guaranteed + random targets ---
    const targets = guaranteedTarget ? [guaranteedTarget, ...additionalTargets] : additionalTargets;

    // --- Apply spell effects ---
    targets
        .filter(enemy => enemy && !isPhantom(enemy))
        .forEach(enemy => {
        if (!enemy.effects) enemy.effects = [];

        if (!failed) {
            // Spell success → apply reflect
            const existing = enemy.effects.find(e => e.type === "reflect");
            if (existing) {
                existing.remaining += 2; // stack duration
            } else {
                enemy.effects.push({ type: "reflect", remaining: 1 });
            }
        } else {
            // Spell failure → apply double damage
            const existing = enemy.effects.find(e => e.type === "doubleDamage");
            if (existing) {
                existing.remaining += 2; // stack duration
            } else {
                enemy.effects.push({ type: "doubleDamage", remaining: 1 });
            }
        }
    });

    const damageResult = {
        hit: !failed,
        targets,
        spellName: spell.name,
        riskType: failed ? "misfire" : null,
        riskDescription: failed ? "Weak spell casting. Targeted enemies hit for double damage." : null
    };

    return {
        spellName: spell.name,
        usesDice: true,
        attackRoll: { allRolls: rollObj.allRolls, total: rollObj.total },
        hitResult: { hit: !failed },
        damageResult
    };
}

// --- Roar Of The Wild handler ---
export function handleRoarOfTheWild(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    // --- Determine if spell fails ---
    const failed = Math.random() < (riskMod / 100);

    // --- Roll 1d6 using dice.js ---
    const rollObj = rollCombatDice({ role: 'player', baseDice: 1 });
    const diceRoll = rollObj.total;

    // --- Determine number of targets ---
    let numTargets = failed ? Math.max(0, diceRoll - 2) : diceRoll;

    // Limit to first 6 active combat slots
    const activeEnemies = targetEnemies.slice(0, 6);
    numTargets = Math.min(numTargets, activeEnemies.length);

    // Randomly select targets
    const shuffled = [...activeEnemies].sort(() => 0.5 - Math.random());
    const targets = shuffled.slice(0, numTargets);

    targets
        .filter(enemy => enemy && !isPhantom(enemy))
        .forEach(enemy => {
        if (!enemy.effects) enemy.effects = [];

        const existing = enemy.effects.find(e => e.type === "enemyStunned");

        if (existing) {
            existing.remaining += 2; // stack duration
        } else {
            enemy.effects.push({
                type: "enemyStunned",
                remaining: 2
            });
        }
    });

    // --- Build result object ---
    const damageResult = {
        hit: !failed,
        targets,
        spellName: spell.name,
        riskType: failed ? "misfire" : null,
        riskDescription: failed ? "Weak spell casting. Enemy targets reduced." : null
    };

    return {
        spellName: spell.name,
        usesDice: true,
        attackRoll: { allRolls: rollObj.allRolls, total: rollObj.total },
        hitResult: { hit: !failed },
        damageResult
    };
}

// --- Deep Dark Blue handler ---
export function handleDeepDarkBlue(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    // --- Determine if spell fails ---
    const failed = Math.random() < (riskMod / 100);

    // --- Roll 1d6 using dice.js ---
    const rollObj = rollCombatDice({ role: 'player', baseDice: 1 });
    const diceRoll = rollObj.total;

    // --- Determine number of targets ---
    let numTargets = failed ? Math.max(0, diceRoll - 1) : diceRoll;

    // Limit to first 6 active combat slots
    const activeEnemies = targetEnemies.slice(0, 6);
    numTargets = Math.min(numTargets, activeEnemies.length);

    // Randomly select targets
    const shuffled = [...activeEnemies].sort(() => 0.5 - Math.random());
    const targets = shuffled.slice(0, numTargets);

    // If failed, player also gets hit
    const playerHit = failed;

    // --- Calculate damage ---
    // 🎲 Damage now scales with the dice roll
    const damagePerHit = diceRoll;

    const enemyDamage = targets.map(e => ({
        enemy: e,
        damage: damagePerHit
    }));

    const playerDamage = playerHit ? damagePerHit : 0;

    // Apply damage
    enemyDamage
        .filter(({ enemy }) => enemy && !isPhantom(enemy))
        .forEach(({ enemy, damage }) => {
            if (!enemy?.stats?.stamina) return;

            enemy.stats.stamina -= damage;
            enemy.stats.stamina = Math.max(0, enemy.stats.stamina);
        });
    if (playerHit && playerStats.stats.STAMINA) {
        playerStats.stats.STAMINA.current -= playerDamage;
        playerStats.stats.STAMINA.current = Math.max(0, playerStats.stats.STAMINA.current);
    }

    // --- Build result object ---
    const damageResult = {
        hit: !failed,
        targets,
        playerHit,
        enemyDamage,
        playerDamage,
        spellName: spell.name,
        riskType: failed ? "misfire" : null,
        riskDescription: failed ? "Weak spell casting. You target yourself as wel as your foe." : null
    };

    return {
        spellName: spell.name,
        usesDice: true,
        attackRoll: { allRolls: rollObj.allRolls, total: rollObj.total },
        hitResult: { hit: !failed },
        damageResult
    };
}

// Sky Skimmer
function handleSkySkimmer(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const durationRounds = spell.duration?.[wizardColor] ?? 1;
    const staminaBoost = spell.statMod?.STAMINA ?? 0;

    const failed = Math.random() < (riskMod / 100);

    if (!playerStats.effects) playerStats.effects = [];

    let damageResult = {
        hit: !failed,
        damage: 0,
        attack: 0,
        spellName: spell.name
    };

// --- MISFIRE: STAMINA adjustment (clamped to min/max) ---
if (failed) {
    const riskStat = spell.risk?.stat ?? "STAMINA";
    const riskAmount = spell.risk?.amount ?? -1;

    damageResult.otherMisfire = true;
    damageResult.hit = false;
    damageResult.riskType = spell.risk?.type ?? "backfire";
    damageResult.riskDescription =
        spell.risk?.description ?? "Spell failed. STAMINA adjusted.";
    damageResult.riskStat = riskStat;
    damageResult.riskAmount = riskAmount;
    damageResult.customRiskDescription =
        `${riskStat} ${riskAmount < 0 ? riskAmount : "+" + riskAmount}`;

    // Apply STAMINA change with clamp
    if (playerStats.stats[riskStat]) {
        playerStats.stats[riskStat].current += riskAmount;

        // Clamp to min
        if (playerStats.stats[riskStat].min !== undefined) {
            playerStats.stats[riskStat].current = Math.max(
                playerStats.stats[riskStat].current,
                playerStats.stats[riskStat].min
            );
        }

        // Clamp to max
        if (playerStats.stats[riskStat].max !== undefined) {
            playerStats.stats[riskStat].current = Math.min(
                playerStats.stats[riskStat].current,
                playerStats.stats[riskStat].max
            );
        }
    }

    if (context?.resolveSpellRisk) {
        context.resolveSpellRisk(playerStats, damageResult);
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: false },
        damageResult
    };
}

// --- SUCCESS: Apply STAMINA boost ---
if (!failed && staminaBoost !== 0) {
    if (!playerStats.stats.STAMINA) {
        playerStats.stats.STAMINA = { current: 0, max: 0, min: 0 };
    }

    const existingEffect = playerStats.effects.find(
        e => e.type === "staminaBuff"
    );

    // Calculate actual applied boost (clamped to max)
    let appliedBoost = staminaBoost;
    if (playerStats.stats.STAMINA.max !== undefined) {
        appliedBoost = Math.min(
            appliedBoost,
            playerStats.stats.STAMINA.max - playerStats.stats.STAMINA.current
        );
    }

    if (existingEffect) {
        // Stack duration and applied boost
        existingEffect.remaining += durationRounds;
        existingEffect.amount += appliedBoost;
        playerStats.stats.STAMINA.current += appliedBoost;

    } else {
        // Apply boost
        playerStats.stats.STAMINA.current += appliedBoost;

        playerStats.effects.push({
            type: "staminaBuff",
            name: spell.name,
            stat: "STAMINA",
            amount: appliedBoost,
            remaining: durationRounds,
            revert: true,
            justApplied: true
        });
    }
}

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult
    };
}

// Burning Blood
function handleBurningBlood(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const durationRounds = spell.duration?.[wizardColor] ?? 1;

    const failed = Math.random() < (riskMod / 100);

    if (!playerStats.effects) playerStats.effects = [];

    let appliedDuration = durationRounds;

    let damageResult = {
        hit: !failed,
        damage: 0,
        attack: 0,
        spellName: spell.name
    };

    // --- MISFIRE: STAMINA penalty, spell does not fire ---
    if (failed) {
        damageResult.otherMisfire = true;
        damageResult.hit = false;
        damageResult.riskType = spell.risk?.type ?? "backfire";
        damageResult.riskDescription =
            spell.risk?.description ?? "Spell failed. STAMINA penalty applied.";
        damageResult.riskStat = "STAMINA";
        damageResult.riskAmount = spell.statMod?.STAMINA ?? -1;
        damageResult.customRiskDescription =
            `STAMINA ${damageResult.riskAmount < 0 ? damageResult.riskAmount : "+" + damageResult.riskAmount}`;

        if (context?.resolveSpellRisk) {
            context.resolveSpellRisk(playerStats, damageResult);
        }

        // Spell does not apply, exit early
        return {
            spellName: spell.name,
            attackRoll: { allRolls: [0], total: 0 },
            hitResult: { hit: false },
            damageResult
        };
    }

    // --- APPLY MULTIPLICATIVE BUFF (spell succeeded) ---
    if (!failed && appliedDuration > 0) {
        if (!playerStats.stats.ATTACK) {
            playerStats.stats.ATTACK = { current: 0, max: 0, min: 0 };
        }

        const existingEffect = playerStats.effects.find(
            e => e.type === "strengthBuff"
        );

        if (existingEffect) {
            // Only extend duration (do NOT double again)
            existingEffect.remaining += appliedDuration;

        } else {
            const currentAttack = playerStats.stats.ATTACK.current;

            const bonusAmount = currentAttack; // doubling = +current value
            playerStats.stats.ATTACK.current += bonusAmount;

            playerStats.effects.push({
                type: "strengthBuff",
                name: spell.name,
                stat: "ATTACK",
                amount: bonusAmount,
                isMultiplier: true,
                remaining: appliedDuration,
                revert: true,
                justApplied: true
            });
        }
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult
    };
}

// Elemental Surge
function handleElementalSurge(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const durationRounds = spell.duration?.[wizardColor] ?? 1;
    const skillBonus = spell.statMod.SKILL ?? 0;

    const failed = Math.random() < (riskMod / 100);

    if (!playerStats.effects) playerStats.effects = [];

    let appliedDuration = durationRounds;

    let damageResult = {
        hit: !failed,
        damage: 0,
        attack: 0,
        spellName: spell.name
    };

    // --- MISFIRE (MAGIC penalty instead of duration loss) ---
    if (failed) {
        const riskStat = spell.risk?.stat ?? "MAGIC";
        const riskAmount = spell.risk?.amount ?? -1;

        damageResult.otherMisfire = true;
        damageResult.hit = false;
        damageResult.riskType = spell.risk?.type ?? "stat";
        damageResult.riskDescription =
            spell.risk?.description ?? "Magical backlash drains power.";
        damageResult.riskStat = riskStat;
        damageResult.riskAmount = riskAmount;
        damageResult.customRiskDescription =
            `${riskStat} ${riskAmount < 0 ? riskAmount : "+" + riskAmount}`;

        // ✅ Apply stat penalty directly
        if (playerStats.stats[riskStat]) {
            playerStats.stats[riskStat].current += riskAmount;

            // Optional: clamp to min
            if (playerStats.stats[riskStat].min !== undefined) {
                playerStats.stats[riskStat].current = Math.max(
                    playerStats.stats[riskStat].current,
                    playerStats.stats[riskStat].min
                );
            }
        }

        if (context?.resolveSpellRisk) {
            context.resolveSpellRisk(playerStats, damageResult);
        }
    }

    // --- APPLY BUFF (same as Grounded Focus) ---
    if (!failed && appliedDuration > 0) {
        if (!playerStats.stats.SKILL) {
            playerStats.stats.SKILL = { current: 0, max: 0, min: 0 };
        }

        const existingEffect = playerStats.effects.find(
            e => e.type === "skillBuff"
        );

        if (existingEffect) {
            existingEffect.remaining += appliedDuration;

        } else {
            playerStats.stats.SKILL.current += skillBonus;

            playerStats.effects.push({
                type: "skillBuff",
                name: spell.name,
                stat: "SKILL",
                amount: skillBonus,
                remaining: appliedDuration,
                revert: true,
                justApplied: true
            });
        }
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: !failed },
        damageResult
    };
}

// Overcharge
function handleOvercharge(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const durationRounds = spell.duration?.[wizardColor] ?? 1;

    const failed = Math.random() < (riskMod / 100);

    if (!playerStats.effects) playerStats.effects = [];

    let appliedDuration = durationRounds;

    let damageResult = {
        hit: !failed,
        damage: 0,
        attack: 0,
        spellName: spell.name
    };

    // --- MISFIRE ---
    if (failed) {
        const riskStat = spell.risk?.stat ?? "DURATION";
        const riskAmount = spell.risk?.amount ?? -1;

        if (riskStat === "DURATION") {
            appliedDuration = Math.max(durationRounds + riskAmount, 0);
        }

        damageResult.otherMisfire = true;
        damageResult.hit = false;
        damageResult.riskType = spell.risk?.type ?? "backfire";
        damageResult.riskDescription =
            spell.risk?.description ?? "Overcharge unstable. Duration reduced.";
        damageResult.riskStat = riskStat;
        damageResult.riskAmount = riskAmount;
        damageResult.customRiskDescription =
            `${riskStat} ${riskAmount < 0 ? riskAmount : "+" + riskAmount}`;

        if (context?.resolveSpellRisk) {
            context.resolveSpellRisk(playerStats, damageResult);
        }
    }

    // --- APPLY MULTIPLICATIVE BUFF ---
    if (appliedDuration > 0) {
        if (!playerStats.stats.ATTACK) {
            playerStats.stats.ATTACK = { current: 0, max: 0, min: 0 };
        }

        const existingEffect = playerStats.effects.find(
            e => e.type === "strengthBuff"
        );

        if (existingEffect) {
            // Only extend duration (do NOT double again)
            existingEffect.remaining += appliedDuration;

        } else {
            const currentAttack = playerStats.stats.ATTACK.current;

            // Calculate how much we're adding
            const bonusAmount = currentAttack; // doubling = +current value

            playerStats.stats.ATTACK.current += bonusAmount;

            playerStats.effects.push({
                type: "strengthBuff",
                name: spell.name,
                stat: "ATTACK",
                amount: bonusAmount, // ✅ this makes revert work
                isMultiplier: true,  // (optional flag for clarity)
                remaining: appliedDuration,
                revert: true,
                justApplied: true
            });
        }
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: !failed },
        damageResult
    };
}

// Grounded Focus
function handleGroundedFocus(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const durationRounds = spell.duration?.[wizardColor] ?? 1;
    const skillBonus = spell.statMod.SKILL ?? 0;

    const failed = Math.random() < (riskMod / 100);

    if (!playerStats.effects) playerStats.effects = [];

    let appliedDuration = durationRounds;

    // ✅ Shared damageResult object
    let damageResult = {
        hit: !failed,
        damage: 0,
        attack: 0,
        spellName: spell.name
    };

    // --- MISFIRE (now driven by JSON risk) ---
    if (failed) {
        const riskStat = spell.risk?.stat ?? "DURATION";
        const riskAmount = spell.risk?.amount ?? -1;

        // ✅ Apply duration modification dynamically
        if (riskStat === "DURATION") {
            appliedDuration = Math.max(durationRounds + riskAmount, 0);
        }

        damageResult.otherMisfire = true;
        damageResult.hit = false;
        damageResult.riskType = spell.risk?.type ?? "backfire";
        damageResult.riskDescription =
            spell.risk?.description ?? "Focus falters. Duration reduced.";
        damageResult.riskStat = riskStat;
        damageResult.riskAmount = riskAmount;
        damageResult.customRiskDescription =
            `${riskStat} ${riskAmount < 0 ? riskAmount : "+" + riskAmount}`;

        if (context?.resolveSpellRisk) {
            context.resolveSpellRisk(playerStats, damageResult);
        }
    }

    // --- APPLY BUFF (Battle Fury style, but SKILL) ---
    if (appliedDuration > 0) {
        // Ensure SKILL stat exists
        if (!playerStats.stats.SKILL) {
            playerStats.stats.SKILL = { current: 0, max: 0, min: 0 };
        }

        const existingEffect = playerStats.effects.find(
            e => e.type === "skillBuff"
        );

        if (existingEffect) {
            // ✅ Stack duration only
            existingEffect.remaining += appliedDuration;

        } else {
            // ✅ Apply stat once
            playerStats.stats.SKILL.current += skillBonus;

            playerStats.effects.push({
                type: "skillBuff",
                name: spell.name,
                stat: "SKILL",
                amount: skillBonus,
                remaining: appliedDuration,
                revert: true,
                justApplied: true
            });
        }
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: !failed },
        damageResult
    };
}

// Healing Skies
function handleHealingSkies(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const durationRounds = spell.duration?.[wizardColor] ?? 1;
    const staminaBonus = spell.statMod.STAMINA ?? 0;

    const failed = Math.random() < (riskMod / 100);

    if (!playerStats.effects) playerStats.effects = [];

    let appliedDuration = durationRounds;

    // ✅ ONE shared object
    let damageResult = {
        hit: !failed,
        damage: 0,
        attack: 0,
        spellName: spell.name
    };

    // --- MISFIRE ---
    if (failed) {
        appliedDuration = Math.max(durationRounds - 1, 0);

        damageResult.otherMisfire = true; // ✅ THIS is the key
        damageResult.hit = false;
        damageResult.riskType = spell.risk?.type ?? "backfire";
        damageResult.riskDescription = spell.risk?.description ?? "Weak spell casting. Spell duration shortened.";
        damageResult.riskStat = spell.risk?.stat ?? "DURATION";
        damageResult.riskAmount = spell.risk?.amount ?? -1;
        damageResult.customRiskDescription = `Duration reduced by 1`;

        if (context?.resolveSpellRisk) {
            context.resolveSpellRisk(playerStats, damageResult);
        }
    }

    // --- APPLY BUFF ---
    if (appliedDuration > 0) {
        const existingEffect = playerStats.effects.find(e => e.type === "healingBuff");

        if (existingEffect) {
            existingEffect.remaining += appliedDuration;
        } else {
            playerStats.effects.push({
                type: "healingBuff",
                name: spell.name,
                stat: "STAMINA",
                amount: staminaBonus,
                remaining: appliedDuration,
                revert: false,
                justApplied: true
            });
        }
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: !failed },
        damageResult
    };
}

// Battle Fury
function handleBattleFury(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const failed = Math.random() < (riskMod / 100);

    // --- HELPER: get risk data ---
    function getRisk(spell) {
        let riskStat, riskAmount;

        if (spell.statMod) {
            const keys = Object.keys(spell.statMod);
            if (keys.length > 0) {
                riskStat = keys[0];
                riskAmount = spell.statMod[riskStat];
            }
        }

        return { riskStat, riskAmount };
    }

    // --- MISFIRE ---
    if (failed) {
        const { riskStat, riskAmount } = getRisk(spell);
        const damageResult = {
            hit: false,
            damage: 0,
            spellName: spell.name,
            riskType: spell.risk?.type ?? "misfire",
            riskDescription: spell.risk?.description ?? "The spell misfires.",
            riskStat,
            riskAmount
        };

        if (context?.resolveSpellRisk) {
            context.resolveSpellRisk(playerStats, damageResult);
        }

        return {
            spellName: spell.name,
            attackRoll: { allRolls: [] },
            hitResult: { hit: false },
            damageResult
        };
    }

    // --- SUCCESS: apply strengthBuff ---
    if (!playerStats.effects) playerStats.effects = [];
    
    const attackBonus = spell.attack[wizardColor] ?? 0;
    const durationToAdd = spell.duration?.[wizardColor] ?? 1;

    // Ensure ATTACK stat exists
    if (!playerStats.stats.ATTACK) {
        playerStats.stats.ATTACK = { current: 0, max: 0, min: 0 };
    }

    // 🔍 Check for existing strength buff
    const existingEffect = playerStats.effects.find(
        e => e.type === "strengthBuff"
    );

    if (existingEffect) {
        // ✅ Stack duration ONLY
        existingEffect.remaining += durationToAdd;

    } else {
        // ✅ Apply attack bonus ONCE
        playerStats.stats.ATTACK.current += attackBonus;

        // ✅ Create new effect
        playerStats.effects.push({
            type: "strengthBuff",
            name: spell.name,
            stat: "ATTACK",
            amount: attackBonus,
            remaining: durationToAdd,
            revert: true,
            justApplied: true
        });
    }

    // --- APPLY RISK ON SUCCESS TOO ---
    const { riskStat, riskAmount } = getRisk(spell);

    const damageResult = {
        hit: true,
        damage: 0,
        spellName: spell.name,
        riskType: spell.risk?.type ?? "cost",
        riskDescription: spell.risk?.description ?? "",
        customRiskDescription: "",
        riskStat,
        riskAmount
    };

    if (context?.resolveSpellRisk) {
        context.resolveSpellRisk(playerStats, damageResult);
    }

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult: {
            hit: true,
            customRiskDescription: "Payment Due\nSTAMINA -3",
            attack: 0,
            damage: 0
        }
    };
}

// Rooted Will

function handleRootedWill(playerStats, targetEnemies, spell, context) {
    const wizardColor = playerStats.wizardColor.toLowerCase();
    const riskMod = spell.riskMod[wizardColor] ?? 0;

    const failed = Math.random() < (riskMod / 100);

    // --- FAILURE: apply MAGIC-1 using the risk system ---
    if (failed) {
        const damageResult = {
            hit: false,
            damage: 0,
            spellName: spell.name,
            riskType: "backfire", // could also be "cost" if preferred
            riskDescription: "The spell drains your magic\nMAGIC-1",
            riskStat: "MAGIC",
            riskAmount: -1,
            customRiskDescription: "MAGIC -1"
        };

        // Apply the effect through the centralized resolver
        if (context?.resolveSpellRisk) {
            context.resolveSpellRisk(playerStats, damageResult);
        }

        return {
            spellName: spell.name,
            attackRoll: { allRolls: [] },
            hitResult: { hit: false },
            damageResult
        };
    }

    // --- SUCCESS: apply stat modification ---
    if (!playerStats.effects) playerStats.effects = [];

    Object.entries(spell.statMod || {}).forEach(([stat, amount]) => {
        if (playerStats.stats[stat]) {
            playerStats.stats[stat].current += amount;

            // Track effect for UI or potential reversal
            playerStats.effects.push({
                type: "statBoost",
                name: spell.name,
                stat,
                amount,
                remaining: spell.duration?.[wizardColor] ?? 1
            });
        }
    });

    return {
        spellName: spell.name,
        attackRoll: { allRolls: [0], total: 0 },
        hitResult: { hit: true },
        damageResult: {
            hit: true,
            attack: 0,
            damage: 0,
            spellName: spell.name // ensures enemy cells show the spell
        }
    };
}

/**
 * Shared fail result
 */
function failResult(message) {
    return {
        attackRoll: { allRolls: [] },
        hitResult: { hit: false },
        damageResult: {
            hit: false,
            damage: 0,
            spellName: message, // ensures UI has a name even on fail
            riskType: "misfire",
            riskDescription: message
        }
    };
}