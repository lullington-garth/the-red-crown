// dice.js
function rollStandardDice(numDice) {
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    return rolls;
}

/**
 * Roll dice for player or enemy, with optional Devil's Dice (extra die)
 */
export function rollCombatDice({ role, baseDice = 1, devilsDice = false }) {
    const numDice = baseDice + (devilsDice ? 1 : 0);
//    if (numDice < 1 || numDice > 4) throw new Error("Dice total must be 1-4");

    const rolls = rollStandardDice(numDice);

    let discarded = null;
    let discardedIndex = null;
    let keptRolls = [...rolls];

    // Only discard automatically for enemies when Devil's Dice is rolled
    if (role === 'enemy' && devilsDice) {
        const max = Math.max(...rolls);
        const maxIndex = rolls.findIndex(v => v === max);
        discarded = rolls[maxIndex];
        discardedIndex = maxIndex;
        keptRolls.splice(maxIndex, 1);
    }

    return {
        rolls: keptRolls,
        total: keptRolls.reduce((sum, v) => sum + v, 0),
        discarded,
        discardedIndex,
        allRolls: rolls,
        role,
        devilsDice
    };
}

/**
 * Multiple enemy dice rolls
 */
export function rollMultipleEnemyDice(count, { baseDice = 1, devilsDice = false } = {}) {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(rollCombatDice({ role: 'enemy', baseDice, devilsDice }));
    }
    return results;
}

/**
 * Discard a die from a player's roll (only for player with Devil's Dice)
 */
export function discardPlayerDie(rollObj, index) {
    if (rollObj.role !== 'player' || !rollObj.devilsDice) {
        throw new Error("Can only discard a die for player Devil's Dice rolls");
    }
    const discarded = rollObj.discardedIndex = index;
    rollObj.discarded = rollObj.rolls[index];

// DO NOT remove from array
rollObj.total = rollObj.rolls.reduce((sum, v, i) => {
    return i === rollObj.discardedIndex ? sum : sum + v;
}, 0);
    rollObj.discarded = discarded;
    return rollObj;
}

// ---- Helper: map enemy dice ----
export function mapEnemyDice(diceVal) {
    switch (diceVal) {
        case 1:   return { baseDice: 1, devilsDice: false };
        case "1d": return { baseDice: 1, devilsDice: true };
        case 2:   return { baseDice: 2, devilsDice: false };
        case 3:   return { baseDice: 3, devilsDice: false };
        case "2d": return { baseDice: 2, devilsDice: true };
        case "3d": return { baseDice: 3, devilsDice: true };
        default:   return { baseDice: 2, devilsDice: false };
    }
}