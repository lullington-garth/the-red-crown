// games.js
import { showDaggerGameModal, showDaggerResultModal, showTavernDiceGameModal } from "./gameModals.js";
import { diceFlow } from "./diceFlow.js";
import { rollModal } from "./diceModals.js";
import { checkPlayerDeath } from "./playerDeath.js";
import { rollCombatDice, discardPlayerDie } from "./dice.js";
import { closeModal } from "./modal.js";
import { getGold, removeGold, addGold } from "./gold.js";
import { showItemOverlay } from "./itemOverlay.js";

const tavernDiceNPCs = {

    minty: {
        gold: 18,
        luck: 2
    },

    fidget: {
        gold: 14,
        luck: 4
    },

    brian: {
        gold: 10,
        luck: 6
    }
};

export function startDaggerGame({
    playerStats,
    onComplete
}) {

    let currentRound = 1;
    const maxRounds = 5;
    let numberOfMisses = 0;

    function runRound() {

        const targetStat =
            playerStats.stats.SKILL.current - currentRound;

        showDaggerGameModal({
            roundNumber: currentRound,
            targetStat,

            onRoll: () => {

                diceFlow({
                    stat: "SKILL",
                    playerStats,

                    image: `dagger${currentRound}.jpg`,

                    itemName:
                        `Incoming Dagger`,

                    rollMessage:
                        `The dagger spins through the air towards you...`,

                    onComplete: (result) => {

                        const daggerTarget =
                            playerStats.stats.SKILL.current - currentRound;

                        const wasSuccess =
                            result.rollTotal <= daggerTarget;
                        const isLastRound =
                            currentRound >= maxRounds;

                        // -----------------------------
                        // FAIL = LOSE STAMINA
                        // -----------------------------

                        let playerDied = false;

                        if (!wasSuccess) {

                            numberOfMisses++;
                            playerStats.stats.STAMINA.current -= 1;

                            if (
                                playerStats.stats.STAMINA.current <
                                playerStats.stats.STAMINA.min
                            ) {
                                playerStats.stats.STAMINA.current =
                                    playerStats.stats.STAMINA.min;
                            }

                            playerDied = checkPlayerDeath({
                                playerStats,
                                deathMessage: "The last dagger thrown takes your life."
                    
                            });
                        }

                    if (playerDied) {
                        return;
                    }

                    showDaggerResultModal({

                        success: wasSuccess,
                        roundNumber: currentRound,
                        isLastRound,
                        numberOfMisses,

                        remainingStamina:
                            playerStats.stats.STAMINA.current,

                        onContinue: () => {

                                currentRound++;

                                if (currentRound > maxRounds) {

                                    const result =
                                        numberOfMisses === 0
                                            ? "win"
                                            : "lose";

                                    playerStats.gameTotal = numberOfMisses
                                    playerStats.oweThugs = numberOfMisses

                                    if (onComplete) {
                                        onComplete(result);
                                    }

                                    return;
                                }

                                runRound();
                            }
                        });
                    }
                });
            }
        });
    }

    runRound();
}

function rollGameDice({
    useMaiden = false,
    target
}) {

    const roll =
        rollCombatDice({
            role: "player",
            baseDice: 2,
            devilsDice: useMaiden
        });

    if (!useMaiden) {
        return roll;
    }

    let bestTotal = Infinity;
    let bestIndex = 0;

    for (
        let discardIndex = 0;
        discardIndex < roll.allRolls.length;
        discardIndex++
    ) {

        const keptDice =
            roll.allRolls.filter(
                (_, index) =>
                    index !== discardIndex
            );

        const total =
            keptDice[0] + keptDice[1];

        const distance =
            Math.abs(
                target - total
            );

        if (distance < bestTotal) {

            bestTotal = distance;
            bestIndex = discardIndex;
        }
    }

    const keptDice =
        roll.allRolls.filter(
            (_, index) =>
                index !== bestIndex
        );

    return {

        ...roll,

        rolls: keptDice,
        total:
            keptDice[0] +
            keptDice[1],

        discarded:
            roll.allRolls[bestIndex],

        discardedIndex:
            bestIndex
    };
}

function shouldCallMaiden(currentLuck) {

    if (currentLuck <= 0) {
        return false;
    }

    return Math.random() < 0.2;

}

function isDouble(roll) {

    if (!roll || !roll.rolls) {
        return false;
    }

    return (
        roll.rolls.length >= 2 &&
        roll.rolls[0] === roll.rolls[1]
    );

}

function applyTootToot({
    gameState,
    playerStats
}) {
        setTimeout(() => {
    const tooters = [];

    if (
        gameState.playerRoll &&
        isDouble(gameState.playerRoll)
    ) {
        tooters.push("player");
    }

    if (
        gameState.mintyActive &&
        gameState.mintyRoll &&
        isDouble(gameState.mintyRoll)
    ) {
        tooters.push("minty");
    }

    if (
        gameState.fidgetActive &&
        gameState.fidgetRoll &&
        isDouble(gameState.fidgetRoll)
    ) {
        tooters.push("fidget");
    }

    if (
        gameState.brianActive &&
        gameState.brianRoll &&
        isDouble(gameState.brianRoll)
    ) {
        tooters.push("brian");
    }

    gameState.playerToot =
        tooters.includes("player");

    gameState.mintyToot =
        tooters.includes("minty");

    gameState.fidgetToot =
        tooters.includes("fidget");

    gameState.brianToot =
        tooters.includes("brian");

    if (tooters.length === 0) {
        return;
    }

    // Award 1 Luck per Tooter

    if (gameState.playerToot) {
        playerStats.stats.LUCK.current++;
    }

    if (gameState.mintyToot) {
        gameState.mintyLuck++;
    }

    if (gameState.fidgetToot) {
        gameState.fidgetLuck++;
    }

    if (gameState.brianToot) {
        gameState.brianLuck++;
    }

    let potIncrease = 0;

    const feeForPlayer =
        tooters.filter(
            name => name !== "player"
        ).length;

    const feeForMinty =
        tooters.filter(
            name => name !== "minty"
        ).length;

    const feeForFidget =
        tooters.filter(
            name => name !== "fidget"
        ).length;

    const feeForBrian =
        tooters.filter(
            name => name !== "brian"
        ).length;

    // Player

    if (
        feeForPlayer > 0 &&
        getGold(playerStats) >= feeForPlayer
    ) {
        removeGold(
            playerStats,
            feeForPlayer
        );

        potIncrease += feeForPlayer;
    }

    // Minty

    if (
        feeForMinty > 0 &&
        gameState.mintyGold >= feeForMinty
    ) {
        gameState.mintyGold -= feeForMinty;
        potIncrease += feeForMinty;
    }

    // Fidget

    if (
        feeForFidget > 0 &&
        gameState.fidgetGold >= feeForFidget
    ) {
        gameState.fidgetGold -= feeForFidget;
        potIncrease += feeForFidget;
    }

    // Brian

    if (
        feeForBrian > 0 &&
        gameState.brianGold >= feeForBrian
    ) {
        gameState.brianGold -= feeForBrian;
        potIncrease += feeForBrian;
    }

    gameState.pot += potIncrease;
        }, 1200);
}

function awardWinnerLuck({
    gameState,
    playerStats
}) {
        setTimeout(() => {
    if (!gameState.winners?.length) {
        return;
    }

    for (const winner of gameState.winners) {

        if (winner === "player") {
            playerStats.stats.LUCK.current++;
        }

        if (winner === "minty") {
            gameState.mintyLuck++;
        }

        if (winner === "fidget") {
            gameState.fidgetLuck++;
        }

        if (winner === "brian") {
            gameState.brianLuck++;
        }
    }
            }, 1200);
}

function awardPotToWinner({
    gameState,
    playerStats
}) {
    setTimeout(() => {
    if (!gameState.winners?.length) {
        return;
    }

    awardWinnerLuck({
        gameState,
        playerStats
    });

    // Rounds 1-4
    if (gameState.round < gameState.maxRounds) {

        // Single winner takes pot
        if (gameState.winners.length === 1) {

            const winner =
                gameState.winners[0];

            const pot =
                gameState.pot;

            if (winner === "player") {
                addGold(playerStats, pot);
                playerStats.wonTavernDiceGame = true;
  //              console.log("awardPotToWinner = ", playerStats.wonDiceGame);
            }

            if (winner === "minty") {
                gameState.mintyGold += pot;
            }

            if (winner === "fidget") {
                gameState.fidgetGold += pot;
            }

            if (winner === "brian") {
                gameState.brianGold += pot;
            }

            gameState.pot = 0;
        }

        // Tie = rollover
        return;
    }

    // Round 5

    const share =
        Math.floor(
            gameState.pot /
            gameState.winners.length
        );

    for (const winner of gameState.winners) {

        if (winner === "player") {
            addGold(playerStats, share);
            playerStats.wonTavernDiceGame = true;
  //              console.log("awardPotToWinner = ", playerStats.wonDiceGame);
        }

        if (winner === "minty") {
            gameState.mintyGold += share;
        }

        if (winner === "fidget") {
            gameState.fidgetGold += share;
        }

        if (winner === "brian") {
            gameState.brianGold += share;
        }
    }

    gameState.pot = 0;
            }, 1200);
}

function applySalmon(gameState) {
    setTimeout(() => {
    const tiedWinners =
        gameState.winners?.length > 1;

    gameState.playerSalmon =
        tiedWinners &&
        gameState.winners.includes("player");

    gameState.mintySalmon =
        tiedWinners &&
        gameState.winners.includes("minty");

    gameState.fidgetSalmon =
        tiedWinners &&
        gameState.winners.includes("fidget");

    gameState.brianSalmon =
        tiedWinners &&
        gameState.winners.includes("brian");
            }, 1200);
}

function saveTavernNPCState(gameState) {

    tavernDiceNPCs.minty.gold =
        gameState.mintyGold;

    tavernDiceNPCs.minty.luck =
        gameState.mintyLuck;

    tavernDiceNPCs.fidget.gold =
        gameState.fidgetGold;

    tavernDiceNPCs.fidget.luck =
        gameState.fidgetLuck;

    tavernDiceNPCs.brian.gold =
        gameState.brianGold;

    tavernDiceNPCs.brian.luck =
        gameState.brianLuck;
}

export function startTavernDiceGame({
    playerStats,
    onComplete
}) {
    playerStats.playedMinty = true;
    const gameState = {

        phase: "target",

        round: 1,
        maxRounds: 5,

        pot: 0,
        targetRoll: null,
        playerRoll: null,
        animateTargetRoll: true,
        animatePlayerRoll: true,
        animateMintyRoll: true,
        animateFidgetRoll: true,
        animateBrianRoll: true,

        mintyRoll: null,
        fidgetRoll: null,
        brianRoll: null,

        mintyUsedMaiden: false,
        fidgetUsedMaiden: false,
        brianUsedMaiden: false,

        playerToot: false,
        mintyToot: false,
        fidgetToot: false,
        brianToot: false,
        
        playerSalmon: false,
        mintySalmon: false,
        fidgetSalmon: false,
        brianSalmon: false,

        waitingForDiscard: false,

        playerName:
            playerStats.wizardName,

        playerUsedMaiden: false,

        mintyGold: tavernDiceNPCs.minty.gold,
        mintyLuck: tavernDiceNPCs.minty.luck,

        fidgetGold: tavernDiceNPCs.fidget.gold,
        fidgetLuck: tavernDiceNPCs.fidget.luck,

        brianGold: tavernDiceNPCs.brian.gold,
        brianLuck: tavernDiceNPCs.brian.luck,

        mintyActive: true,
        fidgetActive: true,
        brianActive: true,

        winner: null,
        winners: [],
        isTie: false
    };

    function beginRound() {
        showTavernDiceGameModal({
            state: gameState,
            playerStats,

            onRollTarget: () => {

                if (getGold(playerStats) < 2) {

                    closeModal();

                    showItemOverlay(
                        {
                            item: "No Gold",
                            image: "gold.jpg"
                        },
                        "You do not have enough gold to play.<br><br>You thank Minty, Fidget and Brian and retire from the game.",
                        () => {

                            if (onComplete) {
                                onComplete("leave");
                            }
                        }
                    );

                    return;
                }

                // Everyone antes 2 gold into the pot

                let potIncrease = 0;

                // Player
                if (removeGold(playerStats, 2)) {
                    potIncrease += 2;
                }

                // Minty
                if (gameState.mintyActive) {

                    if (gameState.mintyGold >= 2) {

                        gameState.mintyGold -= 2;
                        potIncrease += 2;

                    } else {

                        gameState.mintyActive = false;
                    }
                }

                // Fidget
                if (gameState.fidgetActive) {

                    if (gameState.fidgetGold >= 2) {

                        gameState.fidgetGold -= 2;
                        potIncrease += 2;

                    } else {

                        gameState.fidgetActive = false;
                    }
                }

                // Brian
                if (gameState.brianActive) {

                    if (gameState.brianGold >= 2) {

                        gameState.brianGold -= 2;
                        potIncrease += 2;

                    } else {

                        gameState.brianActive = false;
                    }
                }

                gameState.pot += potIncrease;

                if (
                    !gameState.mintyActive &&
                    !gameState.fidgetActive &&
                    !gameState.brianActive
                ) {
                    saveTavernNPCState(gameState);
                    closeModal();

                    showItemOverlay(
                        {
                            item: "Good Game",
                            image: "0128.jpg"
                        },
                        `In high spirits, Minty, Fidget and Brian, clap you on the back and thank you for a good game. "You've bled us dry, old boy!"`,
                        () => {

                            if (onComplete) {
                                onComplete("leave");
                            }
                        }
                    );

                    return;
                }

                gameState.targetRoll =
                    rollCombatDice({
                        role: "enemy",
                        baseDice: 2,
                        devilsDice: false
                    });

                gameState.phase = "player";

                beginRound();
                gameState.animateTargetRoll = false;
            },

            onRollDice: () => {

                gameState.playerUsedMaiden = false;

                gameState.playerRoll =
                    rollCombatDice({
                        role: "player",
                        baseDice: 2,
                        devilsDice: false
                    });

                const mintyUsesMaiden =
                    gameState.mintyActive &&
                    shouldCallMaiden(
                        gameState.mintyLuck
                    );

                if (mintyUsesMaiden) {
                    gameState.mintyLuck--;
                }

                gameState.mintyUsedMaiden =
                    mintyUsesMaiden;

                gameState.mintyRoll =
                    gameState.mintyActive
                        ? rollGameDice({
                            useMaiden:
                                mintyUsesMaiden,
                            target:
                                gameState.targetRoll.total
                        })
                        : null;
                const fidgetUsesMaiden =
                    gameState.fidgetActive &&
                    shouldCallMaiden(
                        gameState.fidgetLuck
                    );

                if (fidgetUsesMaiden) {
                    gameState.fidgetLuck--;
                }

                gameState.fidgetUsedMaiden =
                    fidgetUsesMaiden;

                gameState.fidgetRoll =
                    gameState.fidgetActive
                        ? rollGameDice({
                        useMaiden:
                            fidgetUsesMaiden,
                        target:
                            gameState.targetRoll.total
                    })
                        : null;

                const brianUsesMaiden =
                    gameState.brianActive &&
                    shouldCallMaiden(
                        gameState.brianLuck
                    );

                if (brianUsesMaiden) {
                    gameState.brianLuck--;
                }

                gameState.brianUsedMaiden =
                    brianUsesMaiden;

                gameState.brianRoll =
                    gameState.brianActive
                        ? rollGameDice({
                        useMaiden:
                            brianUsesMaiden,
                        target:
                            gameState.targetRoll.total
                    })
                        : null;

                applyTootToot({
                    gameState,
                    playerStats
                });

gameState.phase = "rolling";

beginRound();
gameState.animatePlayerRoll = false;
gameState.animateMintyRoll = false;
gameState.animateFidgetRoll = false;
gameState.animateBrianRoll = false;
                const scores = [
                    { id: "player", total: gameState.playerRoll?.total ?? Infinity },
                    { id: "minty", total: gameState.mintyRoll?.total ?? Infinity },
                    { id: "fidget", total: gameState.fidgetRoll?.total ?? Infinity },
                    { id: "brian", total: gameState.brianRoll?.total ?? Infinity }
                ].filter(p => p.total !== null && p.total !== undefined);

                const target = gameState.targetRoll.total;

                // find closest distance
                let bestDistance = Infinity;

                for (const p of scores) {
                    const dist = Math.abs(target - p.total);
                    if (dist < bestDistance) {
                        bestDistance = dist;
                    }
                }

                // all winners (handles ties)
                gameState.winners = scores
                    .filter(
                        p =>
                            Math.abs(
                                target - p.total
                            ) === bestDistance
                    )
                    .map(p => p.id);

                gameState.isTie =
                    gameState.winners.length > 1;

applySalmon(gameState);

awardPotToWinner({
    gameState,
    playerStats
});

setTimeout(() => {

    gameState.phase = "result";

    beginRound();

}, 1600);

            },

            onLuckBeMyMaiden: () => {
             
                if (playerStats.stats.LUCK.current <= 0) {
                    return;
                }
                gameState.playerRoll =
                    rollCombatDice({
                        role: "player",
                        baseDice: 2,
                        devilsDice: true
                    });

                const mintyUsesMaiden =
                    gameState.mintyActive &&
                    shouldCallMaiden(
                        gameState.mintyLuck
                    );

                if (mintyUsesMaiden) {
                    gameState.mintyLuck--;
                }

                gameState.mintyUsedMaiden =
                    mintyUsesMaiden;

                gameState.mintyRoll =
                    gameState.mintyActive
                        ? rollGameDice({
                            useMaiden:
                                mintyUsesMaiden,
                            target:
                                gameState.targetRoll.total
                        })
                        : null;

                const fidgetUsesMaiden =
                    gameState.fidgetActive &&
                    shouldCallMaiden(
                        gameState.fidgetLuck
                    );

                if (fidgetUsesMaiden) {
                    gameState.fidgetLuck--;
                }

                gameState.fidgetUsedMaiden =
                    fidgetUsesMaiden;

                gameState.fidgetRoll =
                    gameState.fidgetActive
                        ? rollGameDice({
                        useMaiden:
                            fidgetUsesMaiden,
                        target:
                            gameState.targetRoll.total
                    })
                        : null;

                const brianUsesMaiden =
                    gameState.brianActive &&
                    shouldCallMaiden(
                        gameState.brianLuck
                    );

                if (brianUsesMaiden) {
                    gameState.brianLuck--;
                }

                gameState.brianUsedMaiden =
                    brianUsesMaiden;

                gameState.brianRoll =
                    gameState.brianActive
                        ? rollGameDice({
                        useMaiden:
                            brianUsesMaiden,
                        target:
                            gameState.targetRoll.total
                    })
                        : null;

                applyTootToot({
                    gameState,
                    playerStats
                });

                playerStats.stats.LUCK.current =
                    Math.max(
                        0,
                        playerStats.stats.LUCK.current - 1
                    );                    

                gameState.playerUsedMaiden = true;
                gameState.waitingForDiscard = true;

                beginRound();

                gameState.animatePlayerRoll = false;
                gameState.animateMintyRoll = false;
                gameState.animateFidgetRoll = false;
                gameState.animateBrianRoll = false;


            },

            onDiscardDie: (index) => {

                discardPlayerDie(
                    gameState.playerRoll,
                    index
                );

                gameState.waitingForDiscard = false;



gameState.phase = "rolling";

beginRound();

                const scores = [
                    { id: "player", total: gameState.playerRoll?.total ?? Infinity },
                    { id: "minty", total: gameState.mintyRoll?.total ?? Infinity },
                    { id: "fidget", total: gameState.fidgetRoll?.total ?? Infinity },
                    { id: "brian", total: gameState.brianRoll?.total ?? Infinity }
                ].filter(p => p.total !== null && p.total !== undefined);

                const target = gameState.targetRoll.total;

                // find closest distance
                let bestDistance = Infinity;

                for (const p of scores) {
                    const dist = Math.abs(target - p.total);
                    if (dist < bestDistance) {
                        bestDistance = dist;
                    }
                }
 
                // all winners (handles ties)
                gameState.winners = scores
                    .filter(
                        p =>
                            Math.abs(
                                target - p.total
                            ) === bestDistance
                    )
                    .map(p => p.id);

                gameState.isTie =
                    gameState.winners.length > 1;

applySalmon(gameState);

awardPotToWinner({
    gameState,
    playerStats
});

setTimeout(() => {

    gameState.phase = "result";

    beginRound();

}, 1600);

            },

            onTakeWinnings: () => {

                saveTavernNPCState(gameState);

                gameState.gameEnded = true;

                if (onComplete) {
                    onComplete("leave");
                }
            },

            onPlayAnotherRound: () => {
                gameState.animateTargetRoll = true;
                gameState.animatePlayerRoll = true;
                gameState.animateMintyRoll = true;
                gameState.animateFidgetRoll = true;
                gameState.animateBrianRoll = true;
                gameState.round++;

                gameState.phase = "target";

                // CLEAR DICE
                gameState.targetRoll = null;
                gameState.playerRoll = null;

                gameState.mintyRoll = null;
                gameState.fidgetRoll = null;
                gameState.brianRoll = null;

                // CLEAR MESSAGE FLAGS (NEW)
                gameState.playerUsedMaiden = false;
                gameState.mintyUsedMaiden = false;
                gameState.fidgetUsedMaiden = false;
                gameState.brianUsedMaiden = false;

                gameState.playerToot = false;
                gameState.mintyToot = false;
                gameState.fidgetToot = false;
                gameState.brianToot = false;

                gameState.playerSalmon = false;
                gameState.mintySalmon = false;
                gameState.fidgetSalmon = false;
                gameState.brianSalmon = false;
                
                gameState.winners = [];
                gameState.isTie = false;

                // CLEAR DISCARD STATE
                gameState.waitingForDiscard = false;

                beginRound();
            },

            onGameOver: () => {

                saveTavernNPCState(gameState);

                if (onComplete) {
                    onComplete("finished");
                }
            }

        });

    }
    beginRound();
}