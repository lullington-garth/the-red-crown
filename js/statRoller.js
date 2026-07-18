// statRoller.js
import { rollCombatDice } from './dice.js';

/**
 * Roll initial stats for a player based on wizard
 * @param {object} wizard - selected wizard JSON object
 * @returns {object} rolled stats
 */
export function createInitialStats(wizard) {

    // Default ATTACK
    let attackValue = 1;

    if (wizard.name === "Red") {
        attackValue = 2;
    }

    return {
        name: wizard.name,
        theme: wizard.theme,
        stats: {
            SKILL:   { current: 0, max: 0, min: 0 },
            STAMINA: { current: 0, max: 0, min: 0 },
            LUCK:    { current: 0, max: 0, min: 0 },
            MAGIC:   { current: 0, max: 0, min: 0 },
            ATTACK:  { current: attackValue, max: attackValue, min: attackValue }
        },
        bonus: wizard.bonus || {},
        replenishStat: wizard.replenishStat,
        replenishUses: wizard.replenishUses
    };
}

export function rollSingleStat(playerStats, stat) {
    let diceValues = [];
    let baseModifier = 0;

    if (stat === "STAMINA") {
        diceValues = rollDiceArray(2, 6);
        baseModifier = 12;

    } else if (stat === "MAGIC") {
        diceValues = rollDiceArray(1, 6);
        baseModifier = 12;

    } else {
        diceValues = rollDiceArray(1, 6);
        baseModifier = 6;
    }

    const diceTotal = diceValues.reduce((a, b) => a + b, 0);
    const wizardBonus = playerStats.bonus[stat] || 0;

    const total = diceTotal + baseModifier + wizardBonus;

    playerStats.stats[stat].max = total;
    playerStats.stats[stat].current = total;

    return {
        diceValues,
        diceTotal,
        baseModifier,
        wizardBonus,
        total
    };
}

function rollDiceArray(numDice, sides) {
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
}

/**
 * Helper: maximum values for stats (adjustable)
 */
function getMaxStatValue(stat) {
    switch (stat) {
        case 'STAMINA': return 14;
        case 'MAGIC': return 8;
        case 'LUCK': return 8;
        case 'SKILL': return 10; // example
        default: return 10;
    }
}