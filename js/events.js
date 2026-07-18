// events.js

import { rollModal } from "./diceModals.js";
import { showItemModal } from "./useItem.js";
import { checkPlayerDeath } from "./playerDeath.js";
import { showWrongChamberChoiceModal, showHandOfDespairResultModal, showHandOfDespairVictoryModal, showChooseContractTimedModal, showLoseHorseModal } from "./eventModals.js";
import { diceFlow } from "./diceFlow.js";
import { closeModal } from "./modal.js";
import { handleSacrificeItem } from "./sacrificeItem.js";

export function wrongChamberChoice({
    variant,
    playerStats,
    onComplete
}) {

    showWrongChamberChoiceModal({

        variant,

        onRoll: () => {

            let image;
            let deathMessage;

            switch (variant) {

                case "lava":
                    image = "lava.jpg";
                    deathMessage = `The lava blast is too strong.<br>
                    You are consumed by fire.<br><br>
                    Your quest is over.`;
                    break;

                case "fall":
                    image = "fall.jpg";
                    deathMessage = `Your body takes too much damage,<br>
                    from the fall.<br><br>
                    Your quest is over.`;
                    break;

                default:
                    image = "ice.jpg";
                    deathMessage = `You push through the ice wall<br>
                    but you take too much damage from<br>
                    the lethal shards.<br><br>
                    Your quest is over.`;
                    break;
            }

            rollModal({

                item: {
                    item: "Damage",
                    image: image
                },

                dice: 2,

                rollMessage:
                    "Roll for damage.",

                onRollComplete: (rollTotal) => {

                    playerStats.stats.STAMINA.current -= rollTotal;

                    if (
                        playerStats.stats.STAMINA.current <
                        playerStats.stats.STAMINA.min
                    ) {
                        playerStats.stats.STAMINA.current =
                            playerStats.stats.STAMINA.min;
                    }

                    const playerDied =
                        checkPlayerDeath({

                            playerStats,

                            deathMessage

                        });

                    if (playerDied) {
                        return;
                    }

                    if (onComplete) {
                        onComplete("win");
                    }
                }
            });
        }
    });
}

export function handOfDespair({
    variant,
    playerStats,
    onComplete
}) {

    startHandOfDespairGame({
        variant,
        playerStats,

        onComplete: () => {

            if (onComplete) {
                onComplete("win");
            }
        }
    });
}


export function startHandOfDespairGame({
    variant,
    playerStats,
    onComplete
}) {

        const config = {

            glyph: {
                image: "0131.jpg",
                protectionItem: "Stoneheart Glyph",
                victoryImage: "0131.jpg"
            },

            helm: {
                image: "0031.jpg",
                protectionItem: "Helm of True Focus",
                victoryImage: "0031.jpg"
            }
        };

        const data =
            config[variant] ?? config.glyph;

            rollModal({

                item: {
                    item: "The Hand of Despair",
                    image: "handOfDespair.jpg"
                },

                dice: 1,

                rollMessage:
                    "Roll to determine how many rounds you must endure.",

                onRollComplete: (roundCount) => {

                    let currentRound = 1;

                    function runRound() {

                        const targetStat =
                            playerStats.stats.SKILL.current -
                            (currentRound - 1);

                        const modifier =
                            currentRound - 1;

                        const skillText =
                            modifier === 0
                                ? "SKILL"
                                : `SKILL -${modifier}`;

                        diceFlow({

                            stat: "SKILL",
                            playerStats,

                            image: "handOfDespair.jpg",

                            itemName:
                                "Hand of Despair",

                            rollMessage:
                                `<strong>Round ${currentRound} of ${roundCount}</strong><br><br>
                                Roll against your ${skillText}.<br><br>
                                You need ${targetStat} or less to resist the darkness.`,

                            onComplete: (result) => {

                                const wasSuccess =
                                    result.rollTotal <= targetStat;

                                        let playerDied = false;

                                        if (!wasSuccess) {

                                            playerStats.stats.STAMINA.current -= 2;

                                            if (
                                                playerStats.stats.STAMINA.current <
                                                playerStats.stats.STAMINA.min
                                            ) {
                                                playerStats.stats.STAMINA.current =
                                                    playerStats.stats.STAMINA.min;
                                            }

                                            playerDied =
                                                checkPlayerDeath({

                                                    playerStats,

                                                    deathMessage:
                                                        `The Hand of Despair overwhelms you.<br><br>Your quest is over.`
                                                });
                                        }

                                        if (playerDied) {
                                            return;
                                        }

                                        const isLastRound =
                                            currentRound >= roundCount;

                                        showHandOfDespairResultModal({
                                            variant,
                                            success: wasSuccess,
                                            currentRound,
                                            roundCount,
                                            isLastRound,

                                            remainingStamina:
                                                playerStats.stats.STAMINA.current,

                                            onContinue: () => {

                                                currentRound++;

                                                if (currentRound > roundCount) {

                                                    showHandOfDespairVictoryModal({
                                                        variant,
                                                        remainingStamina:
                                                            playerStats.stats.STAMINA.current,

                                                        onContinue: () => {

                                                            if (onComplete) {
                                                                onComplete("win");
                                                            }
                                                        }
                                                    });

                                                    return;
                                                }

                                                runRound();
                                            }
                                        });
                                    }
                                });
                            }
                    runRound();
                }
            });
        }

export function chooseContractRandom({
    playerStats,
    onComplete
}) {

    rollModal({

        item: {
            item: "Devil's Contract",
            image: "scrollOpen.jpg"
        },

        dice: 1,

        rollMessage:
            "<hr><br>Roll to decide which contract has been chosen for you...",

        onRollComplete: (rollTotal) => {

            if (rollTotal <= 2) {
                playerStats.contract = "contract1";
            }
            else if (rollTotal <= 4) {
                playerStats.contract = "contract2";
            }
            else {
                playerStats.contract = "contract3";
            }

            console.log(
                "Contract selected:",
                playerStats.contract
            );

            if (onComplete) {
                onComplete("win");
            }
        }
    });
}

export function chooseContractTimed({
    playerStats,
    onComplete
}) {

    let timeLeft = 60;
    let intervalId = null;
    let resolved = false;

    showChooseContractTimedModal({
        playerStats,
        onChoose: (contractId, stopTimer) => {

            if (resolved) return;
            resolved = true;

            stopTimer();

            playerStats.contract = contractId;

            if (onComplete) {
                onComplete("win");
            }
        },

        onTimeout: () => {

            if (resolved) return;
            resolved = true;

            playerStats.contract = null;

            if (onComplete) {
                onComplete("lose");
            }
        },

        attachTimer: (updateUI, triggerWarning) => {

            intervalId = setInterval(() => {

                if (resolved) {
                    clearInterval(intervalId);
                    return;
                }

                timeLeft--;

                updateUI(timeLeft);

                if (timeLeft === 40) {
                    triggerWarning("Surely you have read enough by now.");
                }

                if (timeLeft === 38) {
                    triggerWarning("");
                }

                if (timeLeft === 30) {
                    triggerWarning("Time is ticking on.");
                }

                if (timeLeft === 28) {
                    triggerWarning("");
                }

                if (timeLeft === 20) {
                    triggerWarning("Time grows short, my friend.");
                }

                if (timeLeft === 18) {
                    triggerWarning("");
                }

                if (timeLeft === 10) {
                    triggerWarning("Is this going to take much longer? I have a dinner date.");
                }

                if (timeLeft === 8) {
                    triggerWarning("");
                }            

                if (timeLeft === 5) {
                    triggerWarning("Five");
                }

                if (timeLeft === 4) {
                    triggerWarning("Four");
                }

                if (timeLeft === 3) {
                    triggerWarning("Three");
                }

                if (timeLeft === 2) {
                    triggerWarning("Two");
                }

                if (timeLeft === 1) {
                    triggerWarning("One");
                }

                if (timeLeft <= 0) {

                    clearInterval(intervalId);
                    triggerWarning("Time's up!");
                    setTimeout(() => {

                        if (resolved) return;
                        resolved = true;

                        closeModal();

                        playerStats.contract = null;

                        if (onComplete) {
                            onComplete("lose");
                        }

                    }, 1000);
                }
            }, 1000);
        }
    });
}

export function loseHorse({
    playerStats,
    onComplete
}) {
    const inv = playerStats.inventory;

    playerStats.horseName = playerStats.horse.id
    playerStats.horseLost = true;

    // ----------------------------
    // REVERSE HORSE MODIFIERS
    // ----------------------------
    const effects = playerStats.horseEffects;

    if (effects) {

        // revert stat modifiers
        for (const stat in effects.statModifiers) {

            const amount = effects.statModifiers[stat];

            const statObj = playerStats.stats[stat];
            if (!statObj) continue;

            if (stat === "SKILL") {
                statObj.max -= amount;
                statObj.current -= amount;
                continue;
            }

            statObj.max -= amount;
            statObj.current -= amount;

            if (statObj.current > statObj.max) {
                statObj.current = statObj.max;
            }

            if (statObj.current < 1) {
                statObj.current = 1;
            }
        }

        // remove capacity bonus
        delete playerStats.inventory.horseCapacity;

        // clear tracking
        playerStats.horseEffects = null;
    }

    playerStats.horse = null;

    showLoseHorseModal({
        playerStats,

        onComplete: () => {

            // enforce hard cap after modal resolves
            let capacityLimit = 8;

            const wornItems =
                Object.values(
                    inv.wornItems || {}
                ).filter(Boolean);

            const hasBackPack =
                wornItems.some(item =>
                    item["special-ability"] === "INC_INVENTORY_3"
                );

            if (hasBackPack) {
                capacityLimit += 3;
            }

            while (
                inv.carriedItems.reduce(
                    (total, item) =>
                        total + (item["inventory-slots"] ?? 1),
                    0
                ) > capacityLimit
            ) {
                inv.carriedItems.pop();
            }

            if (onComplete) {
                onComplete("win");
            }
        }
    });
}

export function wormNumber({
    playerStats,
    onComplete
}) {

    rollModal({

        item: {
            item: "Worm Horde",
            image: "worm.jpg"
        },

        dice: 1,

        rollMessage:
            "Roll to see how many worm sections you face.",

        onRollComplete: (rollTotal) => {

            playerStats.wormHordeRoll = rollTotal;

            const wormCount = rollTotal + 2;

            showItemModal(
                {
                    item: "Worm Horde",
                    image: "worm.jpg",
                    "use-message": "The slime begins to writhe..."
                },

                `Of the pieces you cut, a total of <strong>${wormCount}</strong> worm-spawn
                emerge from the slime and surge towards you.`,

                () => {

                    if (onComplete) {
                        onComplete("win");
                    }
                },

                playerStats
            );
        }
    });
}

export function sacrificeItem({
    variant,
    playerStats,
    onComplete
}) {

    handleSacrificeItem(
        playerStats,
        {
            variant,

            onComplete: () => {

                if (onComplete) {
                    onComplete("win");
                }
            }
        }
    );
}