// groupCombat.js

import { openGroupCombatUI } from "./groupCombatUI.js";

/**
 * Start group combat
 * @param {HTMLElement} gameDiv
 * @param {object} playerStats
 * @param {Array} enemies
 * @param {function} returnToGame
 * @param {function} startNewGame
 */
export function startGroupCombat(
    gameDiv,
    playerStats,
    enemies,
    returnToGame,
    startNewGame,
    horseAllowedFromNode,
    canEscapeFromNode
) {
    const combatState = {
        canEscape: canEscapeFromNode ?? true,
        horseAllowed: horseAllowedFromNode ?? true,
        samAllowed: true,
        roundCounter: 0,
        escapeAttempted: false
    };

    openGroupCombatUI(
        gameDiv,
        playerStats,
        enemies,
        returnToGame,
        startNewGame,
        combatState
    );
}