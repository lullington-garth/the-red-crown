// enemyDeath.js
import { showCombatMessage } from "./combatMessage.js";
import { clearEndOfCombatEffects } from "./combatMagic.js";
import { deathSlipSpent } from "./playerDeath.js";
import { removeEscapeButton } from "./escapeCombat.js";
import { showItemOverlay } from "./itemOverlay.js";
/**
 * Handle a single enemy's death.
 * Marks as dead and shows a combat message.
 * @param {Object} enemy - The enemy object
 * @param {HTMLElement} cell - The UI cell for this enemy
 * @returns {boolean} - true if enemy was killed
 */
export function handleEnemyDeath(enemy, cell) {
    if (enemy.stats.stamina <= 0 && !enemy.isDead) {
        enemy.isDead = true;

        showCombatMessage(cell, {
            type: "enemy",
            result: "death",
            text: `☠️ Defeated`,
        });

        return true;
    }
    return false;
}

/**
 * Remove dead enemies from the instance array after a delay,
 * and rerender status + enemies.
 * @param {Array} enemyInstances - all enemies in combat
 * @param {Function} renderEnemies - callback to rerender enemies
 * @param {Function} checkAllEnemiesDefeated - callback to handle victory
 * @param {number} delay - milliseconds before cleanup
 */
export function cleanupDeadEnemies(
    enemyInstances,
    renderEnemies,
    checkAllEnemiesDefeated,
    cells,
    delay = 5500
) {
    const hasDeadEnemies = enemyInstances.some(e => e.isDead);
    if (!hasDeadEnemies) return;

    // Will any enemies still be alive after cleanup?
    const remainingEnemies = enemyInstances.some(e => !e.isDead);

    // If enemies remain, allow the death animation to play.
    // If combat has ended, clean up almost immediately.
    delay = remainingEnemies ? 4000 : 2000;

    setTimeout(() => {
        const aliveEnemies = enemyInstances.filter(e => !e.isDead);
        enemyInstances.length = 0;
        enemyInstances.push(...aliveEnemies);

        renderEnemies();

        // ✅ Pass cells to the victory check
        checkAllEnemiesDefeated(enemyInstances, cells);
    }, delay);
}

export function checkAllEnemiesDefeated(
    enemyInstances,
    cells,
    returnToMap,
    playerStats
) {
    if (!cells) {
        console.warn("checkAllEnemiesDefeated called without cells!");
        return false;
    }

    if (enemyInstances.length === 0) {

        // Prevent the victory sequence running twice
        playerStats.flags ??= {};

        if (playerStats.flags.victorySequenceRunning) {
            return true;
        }

        playerStats.flags.victorySequenceRunning = true;
        removeEscapeButton()
        const victoryCell = cells["enemy1"];
        if (!victoryCell) return false;

        victoryCell.innerHTML = "";

        const rewardItem = {
            item: "All Enemies Defeated",
            image: "victory.jpg",
            "display-size": "large"
        };

        showItemOverlay(
            rewardItem,
            "Return to Game.",
            () => {
                clearEndOfCombatEffects(playerStats);
                playerStats.fairyShower = false;
                playerStats.companions = playerStats.companions.filter(c => c !== "fairy");

                // 🟣 Consume pendant AFTER combat ends
                if (playerStats.flags?.deathSlipActive) {
                    deathSlipSpent(playerStats);
                    playerStats.flags.deathSlipActive = false;
                    playerStats.flags.deathSlipMessageShown = false;
                }

                playerStats.flags.victorySequenceRunning = false;
                returnToMap();
            }
        );

        return true;
    }
    return false;
}