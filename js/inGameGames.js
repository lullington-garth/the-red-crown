// inGameGames.js

import { rollCombatDice, discardPlayerDie } from "./dice.js";
import { showBlacksmithDiceGameModal } from "./gameModals.js";
import { addGold, removeGold, getGold } from "./gold.js";

function optimiseBlacksmithDiscard(rollObj) {

    const rolls = [...rollObj.allRolls];

    let bestIndex = 0;
    let bestScore = -999;

    // Test every discard possibility
    for (let i = 0; i < rolls.length; i++) {

        const kept = rolls.filter((_, idx) => idx !== i);

        const total = kept.reduce((sum, v) => sum + v, 0);

        const isEven = total % 2 === 0;

        // Strongly prefer even totals
        let score = total;

        const isOdd = total % 2 !== 0;

        // Blacksmith now prefers ODD outcomes
        if (isOdd) {
            score += 20;
        }

        if (score > bestScore) {
            bestScore = score;
            bestIndex = i;
        }
    }

    // Apply chosen discard
    const keptRolls = rolls.filter((_, idx) => idx !== bestIndex);

    rollObj.rolls = keptRolls;

    rollObj.total =
        keptRolls.reduce((sum, v) => sum + v, 0);

    rollObj.discarded = rolls[bestIndex];

    rollObj.discardedIndex = bestIndex;

    return rollObj;
}

export function startBlacksmithDiceGame(playerStats) {

    // Initialise Blacksmith gold the first time only
    if (playerStats.blacksmithGold == null) {
        playerStats.blacksmithGold = 15;
    }

    const state = {
        playerRoll: null,
        enemyRoll: null,
        winner: null,

        wager: 3,

        blacksmithGold: playerStats.blacksmithGold
    };

    function evaluateWinner(playerTotal, enemyTotal) {

        const playerOdd = playerTotal % 2 !== 0;
        const enemyOdd = enemyTotal % 2 !== 0;

        // ---------------------------------
        // BOTH ODD → Blacksmith wins
        // ---------------------------------
        if (playerOdd && enemyOdd) {
            return "enemy";
        }

        // ---------------------------------
        // BOTH EVEN → Player wins
        // ---------------------------------
        if (!playerOdd && !enemyOdd) {
            return "player";
        }

        // ---------------------------------
        // PLAYER EVEN vs ENEMY ODD → Highest wins
        // ---------------------------------
        if (!playerOdd && enemyOdd) {

            if (playerTotal > enemyTotal) {
                return "player";
            }

            if (enemyTotal > playerTotal) {
                return "enemy";
            }

            return "draw";
        }

        // ---------------------------------
        // PLAYER ODD vs ENEMY EVEN → Draw
        // ---------------------------------
        return "draw";
    }

    function playRound(updateUI) {

        // Player always rolls 3 + Devil Dice style discard
        state.playerRoll = rollCombatDice({
            role: "player",
            baseDice: 2,
            devilsDice: true
        });

        // Blacksmith also rolls 3 + discard
        state.enemyRoll = rollCombatDice({
            role: "enemy",
            baseDice: 3,
            allowDiscard: true
        });

        state.enemyRoll =
            optimiseBlacksmithDiscard(state.enemyRoll);

        updateUI(state);
    }

    function discardPlayerDieAndResolve(index, updateUI) {

        discardPlayerDie(state.playerRoll, index);

        state.winner = evaluateWinner(
            state.playerRoll.total,
            state.enemyRoll.total
        );

        if (state.winner === "player") {

            addGold(playerStats, state.wager);

            state.blacksmithGold -= state.wager;
            playerStats.blacksmithGold = state.blacksmithGold;
        }

        if (state.winner === "enemy") {

            removeGold(playerStats, state.wager);

            state.blacksmithGold += state.wager;
            playerStats.blacksmithGold = state.blacksmithGold;
        }

        updateUI(state, true);
    }

    showBlacksmithDiceGameModal({
        state,
        playerStats,
        onRoll: playRound,
        onDiscard: discardPlayerDieAndResolve
    });
}