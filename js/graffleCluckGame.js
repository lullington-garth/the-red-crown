// graffleCluckGame.js
import { showGraffleCluckModal } from "./graffleCluckModal.js";
import { removeGold, getGold } from "./gold.js";
import { showItemOverlay } from "./itemOverlay.js";
import { refreshInventoryUI } from "./inventoryUI.js";
import { tryAddItems } from "./calculateCapacity.js";

export function startGraffleCluckGame(playerStats) {

    const entryFee = 1;

    if (getGold(playerStats) < entryFee) {

        showItemOverlay(
            {
                item: "Graffle Cluck",
                image: "gold.jpg",
                "display-size": "medium"
            },
            `You do not have enough gold to play. <br><br> You need at least ${entryFee} Gold Piece.`
        );

        return;
    }

    const ownedFleece =
        playerStats.inventory.carriedItems.find(
            item =>
                item.id === "0284" ||
                item.id === "0285" ||
                item.id === "0286"
        );

    if (ownedFleece) {

        showItemOverlay(
            {
                item: ownedFleece.item,
                image: `${ownedFleece.id}.jpg`,
                "display-size": "medium"
            },
            "You have already won the fleece.<br><br>Puck has no more to play with."
        );

        return;
    }

    const state = {
        playerChoice: null,
        puckChoice: null,
        graffleChoice: null,
        displayedChoice: null,
        playerScore: 0,
        puckScore: 0,
        resolved: false
    };

    const moves = ["Peck", "Squawk", "Hop"];

    function randomPuckChoice(playerChoice) {

        const availableMoves =
            moves.filter(move => move !== playerChoice);

        return availableMoves[
            Math.floor(Math.random() * availableMoves.length)
        ];
    }

    function randomGraffleChoice() {
        return moves[Math.floor(Math.random() * moves.length)];
    }

    function setPlayerChoice(choice, updateUI) {

        state.playerChoice = choice;
        state.puckChoice = null;

        updateUI(state);

        setTimeout(() => {

        state.puckChoice =
            randomPuckChoice(state.playerChoice);

            updateUI(state);

        }, 400);
    }

    function resetRound(updateUI) {

        state.playerChoice = null;
        state.puckChoice = null;
        state.graffleChoice = null;
        state.displayedChoice = null;
        state.resolved = false;
        state.displayedChoice = null;
        updateUI(state);
    }

    function weightedGraffleChoice(playerChoice, puckChoice) {

        const moves = ["Peck", "Squawk", "Hop"];

        const remaining = moves.filter(
            move => move !== playerChoice && move !== puckChoice
        );

        const roll = Math.random();

        // Puck
        if (roll < 0.5) {
            return puckChoice;
        }

        // Player
        if (roll < 0.75) {
            return playerChoice;
        }

        // Third option
        return remaining[0];
    }

    async function play(updateUI) {

        if (!state.playerChoice || !state.puckChoice) {
            return;
        }

        let winner = null;
        let roundWonBy = null;
        state.graffleChoice =
            weightedGraffleChoice(state.playerChoice, state.puckChoice);

        const cycle = ["Peck", "Squawk", "Hop"];

        const delays = [
            260, 260, 160,
            285, 185, 285,
            170, 370, 270,            
            380, 480, 580
        ];

        let lastIndex = -1;

        state.resolved = false;

        for (let i = 0; i < delays.length; i++) {

            let index = Math.floor(Math.random() * (cycle.length - 1));

            if (index >= lastIndex) {
                index++;
            }

            lastIndex = index;
            state.displayedChoice = cycle[index];

            updateUI(state);

            await new Promise(resolve =>
                setTimeout(resolve, delays[i])
            );
        }

        state.displayedChoice =
            state.graffleChoice;

        updateUI(state);

        await new Promise(resolve =>
            setTimeout(resolve, 250)
        );

        updateUI(state);            

        state.resolved = true;

        // scoring
        if (state.playerChoice === state.graffleChoice) {
            state.playerScore += 1;
            roundWonBy = playerStats.wizardName;
        }

        if (state.puckChoice === state.graffleChoice) {
            state.puckScore += 1;
            roundWonBy = "Puck";
        }

        let gameResult = null;

        if (state.playerScore >= 3) {

            gameResult = playerStats.wizardName;

            const wizard =
                (playerStats.visitingBrother || "").toLowerCase();

            let fleeceId = null;

            if (wizard === "green") {
                fleeceId = "0285";
            }

            if (wizard === "yellow") {
                fleeceId = "0286";
            }

            if (wizard === "blue") {
                fleeceId = "0284";
            }

            if (fleeceId) {

                const fleeceTemplate =
                    playerStats.items.find(
                        item => item.id === fleeceId
                    );

                if (fleeceTemplate) {

                    const fleece =
                        structuredClone(fleeceTemplate);

                    fleece.itemId = Date.now().toString();
                    fleece.id = fleeceId;

                    tryAddItems(playerStats, [fleece], () => {

                        refreshInventoryUI();

                    });
                }
            }
        }

        if (state.puckScore >= 3) {
            gameResult = "Puck";
        }

        // charge only if player loses the GAME
        if (gameResult === "Puck") {

            const paid = removeGold(playerStats, 1);

            if (!paid) {
                showItemOverlay(
                    {
                        item: "Graffle Cluck",
                        image: "gold.jpg",
                        "display-size": "medium"
                    },
                    "You do not have enough gold to continue playing."
                );

                return;
            }
        }

        const gameLoss = (gameResult === "Puck");

        updateUI(state, true, gameResult, roundWonBy, gameLoss);
    }

    showGraffleCluckModal({
        state,
        playerStats,
        onSelectPlayer: setPlayerChoice,
        onPlay: play,
        onReset: resetRound
    });
}