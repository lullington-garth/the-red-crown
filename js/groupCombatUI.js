// groupCombatUI.js
import { showPlayerDeathScreen, checkPlayerDeath } from "./playerDeath.js";
import { createEnemyButtonBar } from "./combatButtons.js";
import * as MagicCombat from './combatMagic.js';
import { applyPlayerEffects } from './combatMagic.js';
import { createCombatGrid } from './combatGrid.js';
import { performEnemyTurn, refreshEnemyDice } from "./enemyCombat.js";
import { handleEnemyDeath, cleanupDeadEnemies, checkAllEnemiesDefeated } from "./enemyDeath.js";
import { renderPlayer, renderPlayerHitResult, renderEnemyHitResult, renderEnemies, renderEnemyEffects, updateEnemyStaminaUI, 
    renderDiceOutput} from "./combatRenderer.js";
import { injectCombatMessageStyles, showCombatMessage, clearCombatMessages, showRiskDescription, showSpellCastMessage, showMisfireMessage, 
    showSpellTargets, showRiskOverlay, showPotionUsedMessage, showItemUsedMessage, showPlayerStunnedMessage, showDoubleAttackMessage } from "./combatMessage.js";
import { performAttack as playerTurn } from './playerAction.js';
import { getRandomSpell, castSpellByType } from "./randomSpell.js";
import { showCombatSpells } from "./spellsUI.js";
import { getEquippedBook } from "./spells.js";
import { openModal, setModalContent, setModalWidth, showModalCloseButton } from "./modal.js";
import { openItemModal } from "./itemModals.js";
import { openPotionModal } from "./potionModals.js";
import { useItem } from "./useItem.js";
import { renderSpellsCell } from "./spellsUI.js";
import { attemptEscape, showEscapeScreen, showAttemptEscapeScreen, renderEscapeButton } from "./escapeCombat.js";
import { playChaosPhase } from "./combatChaos.js";
import { openSpellModal } from "./spellsModal.js";
import { resolveCompanionAttacks, resetCompanionState, inviteShadowSlip, inviteWarHorse, inviteSam, inviteAngel, inviteImp, inviteSirOrrin, inviteBeholder } from "./combatCompanions.js";

//import { hasAngelCompanion } from "./inventoryUI.js";
//import { hasImplCompanion } from "./inventoryUI.js";

function isPhantom(enemy) {
    return enemy?.type === "phantom";
}

function clearPhantomVisuals(enemySlots) {
    enemySlots.forEach(cell => {
        if (!cell) return;

        cell.style.opacity = "";
        cell.style.filter = "";
    });
}

let isPlayerTurn = true;
let playerStunned = false;
let hasExtraAttackPending = false;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// -------------------------
// Top-level buildEnemyButtons
// -------------------------
export function buildEnemyButtons({
    enemy,
    index,
    cell,
    playerStats,
    enemyInstances,
    handlePlayerTurn,
    cells,
    triggerEnemyTurn,
    refreshCombatUI
}) {
    if (!cell) return;

    const hasChaosEffect = playerStats.effects?.some(e => e.type === "chaosSpell");

    // Remove old bar
    const existing = cell.querySelector(".enemy-button-bar");
    if (existing) existing.remove();

    const bar = createEnemyButtonBar({
        enemy,
        enemyIndex: index,
        cell,
        playerStats,
        handlers: {
            canCastSpells: () => MagicCombat.canStartSpellcasting(playerStats),

            onAttack: (enemy, idx, cell) => {
                if (isPhantom(enemy)) return;

                handlePlayerTurn({
                    actionType: "melee",
                    enemy,
                    enemyIndex: idx,
                    cell,
                    enemyInstances
                });
            },

            onSpell: (type, enemy, idx, cell) => {
                if (isPhantom(enemy)) return;

                handlePlayerTurn({
                    actionType: type,
                    enemy,
                    enemyIndex: idx,
                    cell,
                    enemyInstances
                });
            },

            onPotion: () => {
                if (enemy && isPhantom(enemy)) return;
                openPotionModal(playerStats, (item) => {

                    useItem(
                        playerStats,
                        item,
                        "combat",
                        () => {
                            refreshCombatUI();
                            cells.dice.querySelectorAll(".dice-output").forEach(e => e.remove());
                            const diceDiv =
                                cells.dice.querySelector(".dice-output") || document.createElement("div");

                            if (!diceDiv.parentNode) {
                                diceDiv.className = "dice-output";
                                cells.dice.appendChild(diceDiv);
                            }

                            showPotionUsedMessage(diceDiv);

                            isPlayerTurn = false;

                                triggerEnemyTurn();

                        },
                        enemyInstances
                    );
                });
            },

            onItem: (enemy, index) => {
                if (enemy && isPhantom(enemy)) return;
                openItemModal(playerStats, (item) => {
                    useItem(
                        playerStats,
                        item,
                        "combat",
                        () => {

                            // 1. Mark deaths
                            enemyInstances.forEach((enemy, idx) => {
                                const cell = cells[`enemy${idx + 1}`];
                                handleEnemyDeath(enemy, cell);
                            });
                            // 2. Re-render
                            refreshCombatUI();

                            renderSpellsCell({
                                spellsDiv: cells.spellsDiv,
                                playerStats,
                                openSpellModal
                            });
                            cells.dice.querySelectorAll(".dice-output").forEach(e => e.remove());
                            // Show compact message
                            const diceDiv =
                                cells.dice.querySelector(".dice-output") || document.createElement("div");

                            if (!diceDiv.parentNode) {
                                diceDiv.className = "dice-output";
                                cells.dice.appendChild(diceDiv);
                            }

                            showItemUsedMessage(diceDiv);

                            // 4. Continue turn
                            isPlayerTurn = false;

                                triggerEnemyTurn();
                        },
                        enemyInstances,
                        [{ enemy, index }]
                    );
                });
            }
        }
    });

    cell.style.position = "relative";

    if (isPhantom(enemy)) {
        cell.style.opacity = "0.5";
        cell.style.filter = "grayscale(1)";
    }    

    const buttonContainer = cell.querySelector(".combat-button-bar-container");
    if (buttonContainer) {
        buttonContainer.appendChild(bar);
    } else {
        cell.prepend(bar);
    }
}

// --------------------------
// Helper: Refresh all enemy buttons
// --------------------------
export function refreshAllEnemyButtons(
    enemyInstances,
    enemySlots,
    playerStats,
    handlePlayerTurn,
    cells,
    triggerEnemyTurn,
    refreshCombatUI
) {
    enemyInstances.forEach((enemy, idx) => {
        const cell = enemySlots[idx];

        buildEnemyButtons({
            enemy,
            index: idx,
            cell,
            playerStats,
            enemyInstances,
            handlePlayerTurn,
            cells,
            triggerEnemyTurn,
            refreshCombatUI
        });
    });
}

// -------------------------
// Open Group Combat UI
// -------------------------
export function openGroupCombatUI(
    gameDiv,
    playerStats,
    enemies,
    returnToGame,
    startNewGame,
    combatState
) {
    MagicCombat.resetMagicForNewCombat();

    function refreshCombatUI() {
        renderPlayer(cells.player, playerStats, cells.playerEffects);
        renderEnemies(
            enemyInstances,
            enemySlots,
            (enemy, idx, cell) =>
                buildEnemyButtons({
                    enemy,
                    index: idx,
                    cell,
                    playerStats,
                    enemyInstances,
                    handlePlayerTurn,
                    cells,
                    triggerEnemyTurn,
                    refreshCombatUI
                }),
            cells.queued
        );
    }

    gameDiv.innerHTML = "";
    injectCombatMessageStyles();

    const { grid, cells, flashCell } = createCombatGrid(gameDiv);

    // Clone enemies
    const enemyInstances = enemies.map(e => ({
        ...e,
        stats: { ...e.stats },
        combat: { ...e.combat },
        special: { ...e.special },
        encounter: { ...e.encounter },
        effects: []
    }));

    inviteSam(playerStats);
    inviteWarHorse(playerStats, combatState);
    inviteShadowSlip(playerStats);
    inviteAngel(playerStats);
    inviteImp(playerStats);
    inviteSirOrrin(playerStats);
    inviteBeholder(playerStats);
    resetCompanionState(playerStats);

window.__injectEnemyIntoCombat = function(newEnemy) {
    const injected = {
        ...newEnemy,
        stats: { ...newEnemy.stats },
        combat: { ...newEnemy.combat },
        special: { ...newEnemy.special },
        encounter: { ...newEnemy.encounter },
        effects: []
    };

    enemyInstances.push(injected);

    // CRITICAL: use full re-render (this is what you're missing)
        renderEnemies(enemyInstances, enemySlots, (enemy, idx, cell) => {
            if (!cell) return;

            cell.style.background = "transparent";
            cell.style.opacity = "1";
            cell.style.visibility = "visible";
            cell.style.border = "1px solid #888";

            buildEnemyButtons({
                enemy,
                index: idx,
                cell,
                playerStats,
                enemyInstances,
                handlePlayerTurn,
                cells,
                triggerEnemyTurn,
                refreshCombatUI
            });
        }, cells.queued);
};

    const effectsCell = cells.playerEffects;
    effectsCell.innerHTML = "<h4 style='margin:0 0 2px 0'>Player Effects</h4>";

    // Dice and status areas
    const diceCell = cells.dice;
    diceCell.innerHTML = "<h4 style='margin:0 0 2px 0'>Player Actions</h4>";

    const enemySlots = [ cells.enemy1, cells.enemy2, cells.enemy3, cells.enemy4, cells.enemy5, cells.enemy6 ];

    const spellsCell = cells.spells;
    spellsCell.style.background = "transparent";
    spellsCell.style.border = "1px solid #888";
    spellsCell.style.borderRadius = "8px";
    spellsCell.style.padding = "8px";
    spellsCell.innerHTML = "<h4 style='margin:0 0 5px 0'>Loaded Spells</h4>";

    const spellsDiv = document.createElement("div");
    spellsCell.appendChild(spellsDiv);
    cells.spellsDiv = spellsDiv;

const wornBook = playerStats.inventory?.wornItems?.book;

if (!wornBook) {
    spellsDiv.innerHTML = "<p style='margin:0'>No spell book equipped</p>";
} else {
renderSpellsCell({
    spellsDiv: cells.spellsDiv,
    playerStats,
    openSpellModal
});
}

   // -------------------------
    // Player turn handler
    // -------------------------
async function handlePlayerTurn({
    actionType,
    enemy,
    enemyIndex,
    cell,
    enemyInstances
}) {
    if (!isPlayerTurn) return;

    renderPlayer(cells.player, playerStats, cells.playerEffects);

    if (playerStunned) {
        playerStunned = false;
        showPlayerStunnedMessage(cell, diceCell);
        isPlayerTurn = false;
        setTimeout(triggerEnemyTurn, 1200);
        return;
    }

    document.querySelectorAll(".attack-btn").forEach(btn => btn.disabled = true);
    clearCombatMessages();
    diceCell.querySelectorAll(".risk-description").forEach(e => e.remove());

    await wait(250);

    // 1. Chaos phase
    const chaosResult = await playChaosPhase({
        playerStats,
        enemy,
        enemyIndex,
        enemyInstances,
        MagicCombat,
        getRandomSpell,
        castSpellByType
    });

    // 2. Normal attack
    const attackResults = playerTurn({
        actionType,
        playerStats,
        enemyInstances,
        enemyIndex
    });

// 3. Merge
const finalResults = { ...attackResults };

if (chaosResult) {
    // Treat chaos like a normal spell so renderer picks it up
    finalResults.spellName = chaosResult.spellName || finalResults.spellName;

    finalResults.targets = [
        ...(attackResults.targets || []),
        ...(chaosResult.targets || [])
    ];

    finalResults.sweepResults = [
        ...(attackResults.sweepResults || []),
        ...(chaosResult.sweepResults || [])
    ];

    // Prefer chaos damage if it exists (important for spell messaging)
    if (chaosResult.damageResult) {
        finalResults.damageResult = chaosResult.damageResult;
    }

    // Optional but useful if your renderer checks this
    finalResults.usesDice = chaosResult.usesDice || finalResults.usesDice;
}

resolveCompanionAttacks({
    playerStats,
    enemyInstances,
    enemySlots
});

    // 4. Render ONE result
    renderAttackResults(finalResults, cell, enemySlots, diceCell);

    // 5. Death check
    if (checkPlayerDeath({
        playerStats,
        diceCell,
        cells,
        startNewGame
    })) {
        return;
    }

    // 6. Extra attack logic
    const hasDoubleSpeed = playerStats.effects?.some(
        e => e.type === "doubleSpeed"
    );

    if (hasDoubleSpeed && !hasExtraAttackPending) {
        hasExtraAttackPending = true;

        isPlayerTurn = true;

        document.querySelectorAll(".attack-btn").forEach(btn => {
            btn.disabled = false;
        });
    setTimeout(() => {
        showDoubleAttackMessage(cell, diceCell);
    }, 4000);
        return;
    }
    hasExtraAttackPending = false;
    isPlayerTurn = false;
    triggerEnemyTurn();
}
    
    // -------------------------
    // Render attack results
    // -------------------------
    function renderAttackResults(results, cell, enemySlots, diceCell) {
//        console.log("🎯 RENDER INPUT:", results);
        const {
            actionType,
            attackRoll,
            damageResult,
            spellName,
            sweepResults = [],
            targets = []
        } = results;

        // Clear dice
        diceCell.querySelectorAll(".dice-output").forEach(e => e.remove());

        if (spellName && results.usesDice && attackRoll?.allRolls?.length) {
            const diceDiv = renderDiceOutput(diceCell, attackRoll);
            showSpellCastMessage(diceDiv, spellName);

        } else if (spellName) {
            const diceDiv = document.createElement("div");
            diceDiv.className = "dice-output";
            diceCell.appendChild(diceDiv);
            showSpellCastMessage(diceDiv, spellName);

        } else if (attackRoll?.allRolls?.length) {
            renderDiceOutput(diceCell, attackRoll);
        }
                setTimeout(() => {
        // Sweep attacks
        sweepResults.forEach(({ enemy, idx, result }) => {
            const targetCell = enemySlots[idx];
            if (!targetCell) return;
            flashCell(targetCell);
            if (!actionType.startsWith("spell")) renderPlayerHitResult(targetCell, result, playerStats);
            renderEnemyHitResult(targetCell, enemy, result, true);
            updateEnemyStaminaUI(targetCell, enemy);
            handleEnemyDeath(enemy, targetCell, idx);
        });

        // Normal / AoE
        targets.forEach(({ enemy, index }) => {
    if (isPhantom(enemy)) return; // ❗ cannot be damaged
            const targetCell = enemySlots[index] || cell;
            flashCell(targetCell);
//console.log("🎯 TARGETS:", targets);
if (actionType?.startsWith("spell")) {
    if (damageResult?.SBmisfired || damageResult?.otherMisfire) {
        showMisfireMessage(targetCell);
        showRiskDescription(diceCell, damageResult.riskDescription || damageResult.customRiskDescription);
    } else {
        if (damageResult?.riskType) showRiskOverlay(targetCell, damageResult.riskType);

        // Prefer customRiskDescription if present
        const riskDesc = damageResult.customRiskDescription || damageResult.riskDescription;
        if (riskDesc) {
            showRiskDescription(diceCell, riskDesc);
            if (damageResult.riskType === "stunned") playerStunned = true;
        }

        if (damageResult?.hit) showSpellTargets(spellName, [targetCell]);
    }
} else {
                renderPlayerHitResult(targetCell, damageResult, playerStats);
            }

            renderEnemyHitResult(targetCell, enemy, damageResult);
            updateEnemyStaminaUI(targetCell, enemy);
            if (!isPhantom(enemy)) {
                handleEnemyDeath(enemy, targetCell, index);
            }
        });

        renderPlayer(cells.player, playerStats, cells.playerEffects );
        renderEnemies(enemyInstances, enemySlots, (enemy, idx, cell) =>
            buildEnemyButtons({ enemy, index: idx, cell, playerStats, enemyInstances, handlePlayerTurn, cells, triggerEnemyTurn,
    refreshCombatUI }), 
            cells.queued
        );

        const realEnemiesAlive = enemyInstances.some(e => !isPhantom(e));

        if (!realEnemiesAlive) {
            returnToGame("win");
            clearPhantomVisuals(enemySlots);
            return;
        }

        cleanupDeadEnemies(
            enemyInstances,
            () => renderEnemies(enemyInstances, enemySlots, (enemy, idx, cell) =>
                buildEnemyButtons({ enemy, index: idx, cell, playerStats, enemyInstances, handlePlayerTurn, cells, triggerEnemyTurn,
    refreshCombatUI }), 
                cells.queued
            ),
            (enemies, cells) =>
                checkAllEnemiesDefeated(
                    enemies,
                    cells,
                    () => returnToGame("win"),
                    playerStats
                ),
            cells
        );
                        }, 1800);
    }

    // -------------------------
    // Enemy turn
    // -------------------------
    function triggerEnemyTurn() {
        setTimeout(() => {
            performEnemyTurn({
                enemyInstances,
                cells,
                enemySlots,
                playerStats,
                combatState,
                applyEnemyEffects: MagicCombat.applyEnemyEffects,
                onEffectApplied: (cell, enemy) => {
//                    showCombatMessage(cell, { type:"player", result:"spell", text:`Slow Burn`, top:"12%" });
                },
                onEnemyDamaged: (cell, enemy) => {
                    updateEnemyStaminaUI(cell, enemy);
                    renderEnemyEffects(cell, enemy);
                },
                onEnemyDeath: handleEnemyDeath,
                cleanupDeadEnemies: () =>
                    cleanupDeadEnemies(
                        enemyInstances,
                        () => renderEnemies(enemyInstances, enemySlots, (enemy, idx, cell) =>
                            buildEnemyButtons({ enemy, index: idx, cell, playerStats, enemyInstances, handlePlayerTurn, cells, triggerEnemyTurn,
                            refreshCombatUI }),
                            cells.queued
                        ),
                    (enemies, cells) =>
                        checkAllEnemiesDefeated(
                            enemies.filter(e => !isPhantom(e)), // ❗ ignore phantoms
                            cells,
                            () => returnToGame("win"),
                            playerStats
                        ),
                    cells
                    ),
                checkPlayerDeath: () => checkPlayerDeath({
                    playerStats,
                    diceCell: cells.dice,
                    cells,
                    startNewGame
                }),
                endEnemyTurn
            });
setTimeout(() => {
    refreshCombatUI();
    refreshEnemyDice(enemyInstances, enemySlots);
}, 3000);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        }, 2600);
    }

    // -------------------------
    // End enemy turn
    // -------------------------
function endEnemyTurn() {
    combatState.roundCounter++;
    if (
        combatState.canEscape &&
        combatState.roundCounter >= 3
    ) {
        renderEscapeButton({
            diceCell,
            combatState,
            enemyInstances,
            playerStats,
            triggerEnemyTurn,
            refreshUI: refreshCombatUI,
            endPlayerTurn: () => {
                isPlayerTurn = false;
            },
            showAttemptEscapeScreen
        });
    }
    applyPlayerEffects(playerStats, () => {
        refreshAllEnemyButtons(
            enemyInstances,
            enemySlots,
            playerStats,
            handlePlayerTurn,
            cells,
            triggerEnemyTurn,
            refreshCombatUI
        );
    });

enemyInstances.forEach((enemy, idx) => {
    const cell = enemySlots[idx];
    if (!cell) return;

    // Update stamina (you already do this elsewhere)
    updateEnemyStaminaUI(cell, enemy);

    // Update effects (icons etc.)
    renderEnemyEffects(cell, enemy);

    // NEW: update stat text (skill / attack etc.)
    const statLines = cell.querySelectorAll("p");

    statLines.forEach(p => {
        if (p.textContent.startsWith("SKILL:")) {
            p.textContent = `SKILL: ${enemy.stats.skill}`;
        }
        if (p.textContent.startsWith("ATTACK:")) {
            p.textContent = `ATTACK: ${enemy.combat.attack}`;
        }
    });
});

    renderPlayer(cells.player, playerStats, cells.playerEffects );

    isPlayerTurn = true;

    document.querySelectorAll(".attack-btn").forEach(btn => {
        btn.disabled = false;
        btn.style.background = "#459c56";
    });
  
                // 🏃 Escape resolution
                if (
                    combatState.escapeAttempted &&
                    playerStats.stats.STAMINA.current > 0
                ) {
                    showEscapeScreen(
                        () => returnToGame("escape"),
                        playerStats,
                        enemyInstances,
                        combatState
                    );
                    return;
                }    

}

    // -------------------------
    // Initial render
    // -------------------------
    renderPlayer(cells.player, playerStats, cells.playerEffects );
    renderEnemies(enemyInstances, enemySlots, (enemy, idx, cell) =>
        buildEnemyButtons({ enemy, index: idx, cell, playerStats, enemyInstances, handlePlayerTurn, cells, triggerEnemyTurn,
    refreshCombatUI }),
        cells.queued
    );
    diceCell.innerHTML = "<h4 style='margin:0 0 2px 0'>Player Actions</h4>";
}
