// graffleCluckModal.js
import { setModalContent, openModal, closeModal } from "./modal.js";
import { getGold } from "./gold.js";

export function showGraffleCluckModal({
    state,
    playerStats,
    onSelectPlayer,
    onPlay,
    onReset
}) {

    const container = document.createElement("div");

    const wizard =
        (playerStats.visitingBrother || "").toLowerCase();

    const colourSuffix =
                playerStats.visitingBrother || "";

    let fleeceId = "0284";

    if (wizard === "green") {
        fleeceId = "0285";
    }

    if (wizard === "yellow") {
        fleeceId = "0286";
    }

    if (wizard === "blue") {
        fleeceId = "0284";
    }    

    container.innerHTML = `
        <div style="text-align:center; margin-bottom:10px;">
            <h2>Graffle Cluck Game</h2>
        </div>

        <div style="display:flex; gap:20px;">

            <!-- COLUMN 1 -->
            <div style="flex:1; text-align:center;">

                <img
                    src="images/${playerStats.wizardColor.toLowerCase()}Wizard.jpg"
                    style="height:100px;mix-blend-mode:multiply;"
                /> 

                <div style="
                    height:30px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:4px;
                ">
                <img src="images/gold.jpg"
                    style="
                        width:25px;
                        mix-blend-mode:multiply;
                    "
                />
                <span id="playerGold">${getGold(playerStats)}</span>
                </div>

                <p>Score: <span id="playerScore">0</span></p>

                <div style="display:flex; justify-content:center; gap:10px;">
                    <img id="pImgPeck" src="images/grafflePeck${colourSuffix}.jpg" style="width:70px;mix-blend-mode:multiply;" />
                    <img id="pImgSquawk" src="images/graffleSquawk${colourSuffix}.jpg" style="width:70px;mix-blend-mode:multiply;" />
                    <img id="pImgHop" src="images/graffleHop${colourSuffix}.jpg" style="width:70px;mix-blend-mode:multiply;" />
                </div>

                <div style="display:flex; justify-content:center; gap:10px; margin-top:15px;">
                    <button id="pPeck" style="width:70px;height:32px;border-radius:8px;box-shadow:0 1px 7px rgba(0,0,0,0.5);">Peck</button>
                    <button id="pSquawk" style="width:70px;height:32px;border-radius:8px;box-shadow:0 1px 7px rgba(0,0,0,0.5);">Squawk</button>
                    <button id="pHop" style="width:70px;height:32px;border-radius:8px;box-shadow:0 1px 7px rgba(0,0,0,0.5);">Hop</button>
                </div>

            </div>

            <!-- COLUMN 2 -->
            <div style="flex:1; text-align:center;">

                <img
                    src="images/puck.jpg"
                    style="height:100px;mix-blend-mode:multiply;"
                />

                <div style="
                    height:30px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:10px;
                ">
                <img
                    id="puckIcon"
                    src="images/${fleeceId}.jpg"
                    style="width:30px;mix-blend-mode:multiply;"
                />
                    Graffle Fleece
                </div>

                <p>Score: <span id="puckScore">0</span></p>

                <div style="display:flex; justify-content:center; gap:10px;">
                    <img id="eImgPeck"
                        src="images/grafflePeck${colourSuffix}.jpg"
                        style="width:70px;mix-blend-mode:multiply;" />

                    <img id="eImgSquawk"
                        src="images/graffleSquawk${colourSuffix}.jpg"
                        style="width:70px;mix-blend-mode:multiply;" />

                    <img id="eImgHop"
                        src="images/graffleHop${colourSuffix}.jpg"
                        style="width:70px;mix-blend-mode:multiply;" />
                </div>
 
                <div style="display:flex; justify-content:center; gap:10px; margin-top:15px;">
                    <button id="ePeck" disabled style="width:70px;height:32px;border-radius:8px;box-shadow:0 1px 7px rgba(0,0,0,0.5);">Peck</button>
                    <button id="eSquawk" disabled style="width:70px;height:32px;border-radius:8px;box-shadow:0 1px 7px rgba(0,0,0,0.5);">Squawk</button>
                    <button id="eHop" disabled style="width:70px;height:32px;border-radius:8px;box-shadow:0 1px 7px rgba(0,0,0,0.5);">Hop</button>
                </div>

            </div>
        </div>

        <div id="status" style="text-align:left; margin-top:10px; margin-left:10px">
            Guess what the Graffle Cut will do next.
        </div>

        <div style="
            text-align:center;
            margin-top:20px;
        ">
            <img
                id="graffleResult"
                src="images/grafflePeck${colourSuffix}.jpg"
                style="
                    width:100px;
                    border-radius:10px;
                    transition:all 0.2s;
                    mix-blend-mode:multiply;
                "
            />
        </div>
       
        <div style="text-align:center; margin-top:15px;">
            <button id="playBtn" style="
                padding:10px 18px;
                border-radius:8px;
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                cursor:pointer;
            ">
                Play
            </button>
        </div>

        <div id="gameResult" style="text-align:center; margin-top:6px; font-weight:bold;"></div>
    `;

    const status = container.querySelector("#status");
    const playerGold = container.querySelector("#playerGold");

    const pPeck = container.querySelector("#pPeck");
    const pSquawk = container.querySelector("#pSquawk");
    const pHop = container.querySelector("#pHop");
    const pImgPeck = container.querySelector("#pImgPeck");
    const pImgSquawk = container.querySelector("#pImgSquawk");
    const pImgHop = container.querySelector("#pImgHop");
    const ePeck = container.querySelector("#ePeck");
    const eSquawk = container.querySelector("#eSquawk");
    const eHop = container.querySelector("#eHop");

    [ePeck, eSquawk, eHop].forEach(button => {
        button.style.width = "70px";
        button.style.height = "32px";
        button.style.border = "none";
        button.style.borderRadius = "8px";
        button.style.background = "#424141";
        button.style.color = "#d7d4d4";
        button.style.opacity = "0.6";
        button.style.cursor = "default";
    });

    const eImgPeck = container.querySelector("#eImgPeck");
    const eImgSquawk = container.querySelector("#eImgSquawk");
    const eImgHop = container.querySelector("#eImgHop");
    const playBtn = container.querySelector("#playBtn");
    const puckIcon = container.querySelector("#puckIcon");
    const graffleResult = container.querySelector("#graffleResult");
    playBtn.style.display = "none";

    function setMoveButtonsEnabled(enabled) {
        [pPeck, pSquawk, pHop].forEach(btn => {
            btn.disabled = !enabled;
            btn.style.opacity = enabled ? "1" : "0.4";
            btn.style.cursor = enabled ? "pointer" : "default";
        });
    }    

    function setSelected(img, active) {

        if (active) {
            img.style.outline = "2px solid #424141";
            img.style.borderRadius = "8px";
            img.style.outlineOffset = "2px";
            img.style.transform = "scale(1.1)";
        } else {
            img.style.outline = "none";
            img.style.transform = "scale(1)";
        }
    }

    function setEnemySelected(img, active) {

        if (active) {
            img.style.outline = "2px solid #424141";
            img.style.borderRadius = "8px";
            img.style.outlineOffset = "2px";
            img.style.transform = "scale(1.1)";
        } else {
            img.style.outline = "none";
            img.style.transform = "scale(1)";
        }
    }

    function highlightPuck(choice) {

        [ePeck, eSquawk, eHop].forEach(button => {
            button.style.background = "#424141";
            button.style.color = "#d7d4d4";
            button.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            button.style.border = "1px solid #555";
        });

        setEnemySelected(eImgPeck, choice === "Peck");
        setEnemySelected(eImgSquawk, choice === "Squawk");
        setEnemySelected(eImgHop, choice === "Hop");

        if (choice === "Peck") {
            ePeck.style.background = "#d7d4d4";
            ePeck.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            ePeck.style.color = "#424141";
        }

        if (choice === "Squawk") {
            eSquawk.style.background = "#d7d4d4";
            eSquawk.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            eSquawk.style.color = "#424141";
        }

        if (choice === "Hop") {
            eHop.style.background = "#d7d4d4";
            eHop.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            eHop.style.color = "#424141";
        }
    }

    function highlight(choice) {

        [pPeck, pSquawk, pHop].forEach(button => {
            button.style.background = "#424141";
            button.style.color = "#d7d4d4";
            button.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            button.style.border = "1px solid #555";
        });

        setSelected(pImgPeck, choice === "Peck");
        setSelected(pImgSquawk, choice === "Squawk");
        setSelected(pImgHop, choice === "Hop");

        if (choice === "Peck") {
            pPeck.style.background = "#d7d4d4";
            pPeck.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            pPeck.style.color = "#424141";
        }

        if (choice === "Squawk") {
            pSquawk.style.background = "#d7d4d4";
            pSquawk.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            pSquawk.style.color = "#424141";
        }

        if (choice === "Hop") {
            pHop.style.background = "#d7d4d4";
            pHop.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            pHop.style.color = "#424141";
        }
    }

    pPeck.onclick = () => {
        onSelectPlayer("Peck", (s) => {
            updateUI(s);

            setMoveButtonsEnabled(false);
            playBtn.style.display = "inline-block";
        });
    };

    pSquawk.onclick = () => {
        onSelectPlayer("Squawk", (s) => {
            updateUI(s);

            setMoveButtonsEnabled(false);
            playBtn.style.display = "inline-block";
        });
    };

    pHop.onclick = () => {
        onSelectPlayer("Hop", (s) => {
            updateUI(s);

            setMoveButtonsEnabled(false);
            playBtn.style.display = "inline-block";
        });
    };

    playBtn.onclick = () => {

        if (playBtn.dataset.gameOver === "true") {
            closeModal();
            return;
        }

        if (!state.resolved) {
            onPlay(updateUI);
        } else {
            onReset((newState) => {

                updateUI(newState);

                setMoveButtonsEnabled(true);
                playBtn.style.display = "none";
            });
        }
    };

    function setWinnerGlow(img, active) {

        if (active) {
            img.style.boxShadow = "0 0 18px black";
        } else {
            img.style.boxShadow = "none";
        }
    }

    function updateUI(state, resolved = false, gameWinner = null, roundWonBy = null, gameLoss = false) {

        const displayed =
            state.displayedChoice ||
            state.graffleChoice;

        if (displayed) {

            graffleResult.src =
                `images/graffle${displayed}${colourSuffix}.jpg`;
        }

        highlight(state.playerChoice);
        highlightPuck(state.puckChoice);

        if (state.resolved) {

            setWinnerGlow(
                pImgPeck,
                state.graffleChoice === "Peck" &&
                state.playerChoice === "Peck"
            );

            setWinnerGlow(
                pImgSquawk,
                state.graffleChoice === "Squawk" &&
                state.playerChoice === "Squawk"
            );

            setWinnerGlow(
                pImgHop,
                state.graffleChoice === "Hop" &&
                state.playerChoice === "Hop"
            );

            setWinnerGlow(
                eImgPeck,
                state.graffleChoice === "Peck" &&
                state.puckChoice === "Peck"
            );

            setWinnerGlow(
                eImgSquawk,
                state.graffleChoice === "Squawk" &&
                state.puckChoice === "Squawk"
            );

            setWinnerGlow(
                eImgHop,
                state.graffleChoice === "Hop" &&
                state.puckChoice === "Hop"
            );

        } else {

            setWinnerGlow(pImgPeck, false);
            setWinnerGlow(pImgSquawk, false);
            setWinnerGlow(pImgHop, false);

            setWinnerGlow(eImgPeck, false);
            setWinnerGlow(eImgSquawk, false);
            setWinnerGlow(eImgHop, false);
        }

        container.querySelector("#playerScore").textContent = state.playerScore ?? 0;
        container.querySelector("#puckScore").textContent = state.puckScore ?? 0;
        playerGold.textContent = getGold(playerStats);

        let roundWinner = null;
        
        if (resolved) {

            if (roundWonBy === playerStats.wizardName) {
                status.style.textAlign = "left";
                roundWinner = "You";
            } else if (roundWonBy === "Puck") {
                status.style.textAlign = "right";
                roundWinner = "Puck";
            } else {
                status.style.textAlign = "center";
                roundWinner = null;
            }

        const graffleAction = {
            Peck: "Pecked",
            Squawk: "Squawked",
            Hop: "Hopped"
        }[state.graffleChoice];

        status.innerHTML =
            `The Graffle ${graffleAction} | ${roundWinner ?? "Nobody"} won the round`;

        } else {

            status.style.textAlign = "left";

            status.innerHTML =
                state.playerChoice
                    ? `You have selected: ${state.playerChoice}`
                    : "Guess what the Graffle Cut will do next?";
        }
        container.style.minHeight = "590px";

        playBtn.textContent = state.resolved ? "Play Another Round" : "Observe the Graffle Cut";

        const gameResult = container.querySelector("#gameResult");

        if (gameWinner) {

            if (gameWinner === playerStats?.wizardName) {

                gameResult.innerHTML =
                    "You have won the Graffle Cluck Fleece";

            } else {

                gameResult.innerHTML =
                    "You pay Puck 1 Gold Piece";
            }

            if (gameWinner !== "Puck" && puckIcon) {
                puckIcon.style.filter = "grayscale(100%)";
                puckIcon.style.opacity = "0.4";
            }

            playBtn.textContent = `${gameWinner} Wins the Game`;
            playBtn.dataset.gameOver = "true";
            playBtn.style.background = "#424141";
            playBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        }

        if (!state.playerChoice && !state.resolved) {
            playBtn.style.display = "none";
        } else {
            playBtn.style.display = "inline-block";
        }

        if (gameWinner && gameWinner !== playerStats?.wizardName) {

            const gameResultEl = container.querySelector("#gameResult");
        }

    }

    setModalContent(container);
    openModal();
    updateUI(state);
    setMoveButtonsEnabled(true);
}