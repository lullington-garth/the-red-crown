// gameModals.js

import { setModalContent, openModal, closeModal } from "./modal.js";
import { renderPlayerDice, renderEnemyDice, renderGameDice } from "./diceUI.js";
import { getGold } from "./gold.js";
import { diceFlow } from "./diceFlow.js";
import { checkPlayerDeath } from "./playerDeath.js";
import { startDaggerGame, startTavernDiceGame } from "./games.js"

export function showBlacksmithDiceGameModal({
    state,
    playerStats,
    onRoll,
    onDiscard
}) {

    const container = document.createElement("div");

    container.innerHTML = `
        <div style="text-align:center; margin-bottom:10px;">
            <img src="images/dice.jpg"
                style="width:100px; mix-blend-mode:multiply;" />

            <div style="
                margin-top:6px;
                font-size:22px;
                font-weight:bold;
                margin-bottom:15px;
            ">
                Roll an even number higher than the blacksmith's odd number
            </div>
        </div>

        <div style="
            display:flex;
            gap:20px;
            justify-content:space-between;
        ">

            <!-- PLAYER -->
            <div style="flex:1; text-align:center;">
                <img
                    src="images/${playerStats.wizardColor.toLowerCase()}Wizard.jpg"
                    style="height:150px;mix-blend-mode:multiply;border-radius:8px;border:2px solid #555;"
                />
                <div id="playerGold"></div>
            <div
                id="playerDice"
                style="
                    height:50px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                "
            ></div>

            <div
                id="playerTotal"
                style="
                    height:28px;
                "
            >&nbsp;</div>
            </div>

            <!-- BLACKSMITH -->
            <div style="flex:1; text-align:center;">
                <img
                    src="images/blacksmith.jpg"
                    style="height:150px;mix-blend-mode:multiply;border-radius:8px;border:2px solid #555;"
                />            
                <div id="enemyGold"></div>

            <div
                id="enemyDice"
                style="
                    height:50px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                "
            ></div>

            <div
                id="enemyTotal"
                style="
                    height:28px;
                "
            >&nbsp;</div>
            </div>
        </div>

        <hr>

        <div id="resultText" style="
            text-align:center;
            margin:15px 0;
            font-size:20px;
            font-weight:bold;
        ">
            Roll to begin.
        </div>

        <div style="
            display:flex;
            justify-content:center;
            gap:10px;
        ">
            <button id="rollBtn" style="
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                padding:10px 16px;
                border-radius:8px;
                cursor:pointer;
                width:140px;
                font-size:20px;
            ">
                Roll Dice
            </button>

            <button id="endBtn" style="
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                padding:10px 16px;
                border-radius:8px;
                cursor:pointer;
                width:140px;
                font-size:20px;
            ">
                End Game
            </button>
        </div>
    `;

    const playerDice = container.querySelector("#playerDice");
    const enemyDice = container.querySelector("#enemyDice");

    const playerTotal = container.querySelector("#playerTotal");
    const enemyTotal = container.querySelector("#enemyTotal");

    const resultText = container.querySelector("#resultText");
    const playerGoldText =
        container.querySelector("#playerGold");

    const enemyGoldText =
        container.querySelector("#enemyGold");

    const rollBtn = container.querySelector("#rollBtn");
    const endBtn = container.querySelector("#endBtn");
    let animateEnemyDice = true;
    let animatePlayerDice = true;

    function updateUI(state, resolving = false) {

        // ---------------- PLAYER ----------------

        if (state.playerRoll) {

        renderPlayerDice(
            playerDice,
            state.playerRoll,
            (index) => {

                // only allow discard before resolved
                if (!resolving) {

                    onDiscard(index, updateUI);

                // -------------------------
                // ONLY UNLOCK IF GAME CAN CONTINUE
                // -------------------------

                const playerCanAfford =
                    getGold(playerStats) >= state.wager;

                const blacksmithCanAfford =
                    state.blacksmithGold >= state.wager;

                if (playerCanAfford && blacksmithCanAfford) {

                    rollBtn.disabled = false;
                    rollBtn.style.opacity = "1";
                    rollBtn.style.cursor = "pointer";

                } else {

                    rollBtn.disabled = true;
                    rollBtn.style.opacity = "0.5";
                    rollBtn.style.cursor = "not-allowed";
                }

                endBtn.disabled = false;
                endBtn.style.opacity = "1";
                endBtn.style.cursor = "pointer";
                }
            },
            animatePlayerDice
        );

        animatePlayerDice = false;

        playerTotal.innerHTML =
            `<div style="margin:0;">Total: ${state.playerRoll.total}</div>`;
        }

        // ---------------- ENEMY ----------------

        if (state.enemyRoll) {

        renderEnemyDice(
            enemyDice,
            [state.enemyRoll],
            animateEnemyDice
        );

        animateEnemyDice = false;

        enemyTotal.innerHTML =
            `<div style="margin:0;">Total: ${state.enemyRoll.total}</div>`;
        }

        // ---------------- GOLD ----------------

        playerGoldText.innerHTML =
            `<p>
                <img src="images/gold.jpg"
                    style="width:40px; vertical-align:middle; margin-right:6px; mix-blend-mode:multiply;" />
                ${getGold(playerStats)}gp
            </p>`;

        enemyGoldText.innerHTML =
            `<p>
                <img src="images/gold.jpg"
                    style="width:40px; vertical-align:middle; margin-right:6px; mix-blend-mode:multiply;" />
                ${state.blacksmithGold}gp
            </p>`;

        // ---------------- RESULT ----------------

        const playerCanAfford =
            getGold(playerStats) >= state.wager;

        const blacksmithCanAfford =
            state.blacksmithGold >= state.wager;

        if (!playerCanAfford || !blacksmithCanAfford) {

            rollBtn.disabled = true;
            rollBtn.style.opacity = "0.5";
            rollBtn.style.cursor = "not-allowed";

            if (!playerCanAfford) {

                resultText.innerHTML =
                    "You do not have enough gold to continue.";

            } else {

                resultText.innerHTML =
                    "The Blacksmith cannot cover the wager.";
            }

            return;
        }

        if (resolving) {

            if (state.winner === "player") {

                resultText.innerHTML =
                    "You win the round!";

            } else if (state.winner === "enemy") {

                resultText.innerHTML =
                    "The Blacksmith wins the round.";

            } else {

                resultText.innerHTML =
                    "Draw.";
            }
        } else {

            if (state.playerRoll && state.enemyRoll) {

                if (resolving) {

                    if (state.winner === "player") {
                        resultText.innerHTML = "You win the round!";
                    } else if (state.winner === "enemy") {
                        resultText.innerHTML = "The Blacksmith wins the round.";
                    } else {
                        resultText.innerHTML = "Draw.";
                    }

                } else {

                    resultText.innerHTML = "Choose one die to discard.";
                }

            } else {

                // BEFORE ANY ROLL
                resultText.innerHTML = "Roll to begin.";
            }
        }
    }

    rollBtn.addEventListener("click", () => {

        // -------------------------
        // LOCK BUTTONS
        // -------------------------

        rollBtn.disabled = true;
        rollBtn.style.opacity = "0.5";
        rollBtn.style.cursor = "not-allowed";

        endBtn.disabled = true;
        endBtn.style.opacity = "0.5";
        endBtn.style.cursor = "not-allowed";

        animatePlayerDice = true;
        animateEnemyDice = true;
        onRoll(updateUI);
    });

    endBtn.addEventListener("click", () => {

        closeModal();
    });

    // ---------------------------------
    // INITIAL GOLD CHECK
    // ---------------------------------

    const playerCanAfford =
        getGold(playerStats) >= state.wager;

    const blacksmithCanAfford =
        state.blacksmithGold >= state.wager;

    if (!playerCanAfford || !blacksmithCanAfford) {

        rollBtn.disabled = true;
        rollBtn.style.opacity = "0.5";
        rollBtn.style.cursor = "not-allowed";

        if (!playerCanAfford) {

            resultText.innerHTML =
                "You do not have enough gold to play.";

        } else {

            resultText.innerHTML =
                "The Blacksmith has no gold left.";
        }
    }

    updateUI(state);
    setModalContent(container);
    openModal();
}

export function showDaggerGameModal({
    roundNumber,
    targetStat,
    onRoll
}) {

    const container = document.createElement("div");

    container.innerHTML = `
        <div style="text-align:center;">

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:20px;
                margin-bottom:20px;
            ">
                <img
                    src="images/thug${roundNumber}.jpg"
                    style="width:90px; mix-blend-mode: multiply;"
                />

                <img
                    src="images/dagger${roundNumber}.jpg"
                    style="width:90px; mix-blend-mode: multiply;"
                />
            </div>

            <p style="
                margin-bottom:20px;
                line-height:1.5;
            ">
                Thug number ${roundNumber} lines up to take his throw.
                <br><br>
                You must roll against your SKILL -${roundNumber}<br>
                You need a <strong>${targetStat}</strong>
                or less to catch the dagger.
            </p>

            <button id="daggerRollBtn" style="
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                padding:10px 16px;
                border-radius:8px;
                cursor:pointer;
            ">
                Prepare to catch the dagger
            </button>

        </div>
    `;

    const rollBtn = container.querySelector("#daggerRollBtn");

    rollBtn.addEventListener("click", () => {
        closeModal();
        onRoll();
    });

    setModalContent(container);
    openModal();
}

export function showDaggerResultModal({
    success,
    roundNumber,
    isLastRound,
    numberOfMisses = 0,
    remainingStamina,
    onContinue
}) {

    const container = document.createElement("div");

const image = success
    ? `thugSad${roundNumber}.jpg`
    : `thugHappy${roundNumber}.jpg`;

const debtMessage =
    numberOfMisses > 0
        ? `You now owe the thugs
            ${numberOfMisses}

            <img
                src="images/gold.jpg"
                style="
                    width:25px;
                    vertical-align:middle;
                    margin-left:4px;
                    mix-blend-mode: multiply;
                "
            />
          `
        : "";

const message = success
    ? `<strong>SUCCESS!</strong><br>You caught the dagger!`
    : `<h3>You missed the dagger.</h3>
        ${debtMessage}
        <br><br>
        LOSE 1 STAMINA
        <br>
        REMAINING STAMINA: ${remainingStamina}
      `;

    const buttonText = isLastRound
        ? "Game Ends"
        : "Next Round";

    container.innerHTML = `
        <div style="text-align:center;">

            <img
                src="images/${image}"
                style="
                    width:120px;
                    margin-bottom:20px;
                    mix-blend-mode:multiply;
                "
            />

            <p style="
                line-height:1.6;
                margin-bottom:25px;
            ">
                ${message}
            </p>

            <button id="daggerResultBtn" style="
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                padding:10px 18px;
                border-radius:8px;
                cursor:pointer;
            ">
                ${buttonText}
            </button>

        </div>
    `;

    const btn =
        container.querySelector("#daggerResultBtn");

    btn.addEventListener("click", () => {

        closeModal();

        if (onContinue) {
            onContinue();
        }
    });

    setModalContent(container);
    openModal();
}

export function showTavernDiceGameModal({

    state,
    playerStats,
    onRollTarget,
    onRollDice,
    onLuckBeMyMaiden,
    onTakeWinnings,
    onPlayAnotherRound,
    onGameOver,
    onDiscardDie

}) {

    const container = document.createElement("div");

    const buttonSection = (() => {

    const buttonStyle = `
        flex:1;
        width:100%;
        padding:12px;
        border-radius:10px;
        background:#424141;
        color:#d7d4d4;
        border:1px solid #555;
        box-shadow:0 1px 7px rgba(0,0,0,0.5);
        cursor:pointer;
    `;

switch (state.phase) {

    case "target":

        return `
            <button
                id="rollTargetBtn"
                style="${buttonStyle}"
            >
                Roll Target Dice
            </button>
        `;

    case "player":

        if (state.waitingForDiscard) {

            return `
                <div>
                    Choose a die to discard.
                </div>
            `;
        }

        return `
            <div style="
                display:flex;
                gap:10px;
                width:100%;
            ">
                <button
                    id="luckBtn"
                    style="${buttonStyle}"
                    ${playerStats.stats?.LUCK?.current <= 0
                        ? "disabled"
                        : ""}
                >
                    RINGO BINGO!
                </button>

                <button
                    id="rollDiceBtn"
                    style="${buttonStyle}"
                >
                    Roll Dice
                </button>
            </div>
        `;
    case "rolling":

        return `
            <div style="
                margin-bottom: 100px;
            ">
            ... and the winner is...
            </div>
        `;
    case "result":

        if (
            state.round >= state.maxRounds
        ) {

            return `
                <button
                    id="gameOverBtn"
                    style="${buttonStyle}"
                >
                    Game Over
                </button>
            `;
        }

        return `
            <div style="
                display:flex;
                gap:10px;
                width:100%;
            ">
                <button
                    id="leaveBtn"
                    style="${buttonStyle}"
                >
                    Leave the Game
                </button>

                <button
                    id="nextRoundBtn"
                    style="${buttonStyle}"
                >
                    Play Another Round
                </button>
            </div>
        `;

    default:

        return "";
}
    })();

    const winnerGlow = `
        box-shadow: 0 0 18px #1e1e1e,
                    0 0 30px rgba(0, 0, 0, 0.7);
        border:1px solid #555;
    `;

    container.innerHTML = `

        <div style="text-align:center;">

            <img
                src="images/dice.jpg"
                style="
                    width:120px;
                    margin-bottom:0px;
                    padding-bottom:0px;
                    mix-blend-mode:multiply;
                "
            />
                <div style="
                font-size:24px;
                ">
                <strong>Dice Table</strong>
                </div>

            <div>
                Round ${state.round}
                / ${state.maxRounds}
            </div>

            <hr>

            <!-- TOP ROW -->

            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:10px;
                margin-bottom:15px;
            ">

                <div style="
                    border:1px solid #4e4e4e;
                    border-radius:10px;
                    padding:10px;
                ">
                    <strong>Pot</strong>

                    <div style="margin-top:10px;">

                        <img
                            src="images/gold.jpg"
                            style="
                                width:50px;
                                vertical-align:middle;
                                margin-right:10px;
                                mix-blend-mode: multiply;
                            "
                        />
                        <span style="font-size:40px;">
                            <strong>: ${state.pot}</strong>
                        </span>
                    </div>
                </div>

                <div style="
                    border:1px solid #555;
                    border-radius:10px;
                    padding:10px;
                ">

                    <strong>Target Dice</strong>

                    <div id="targetDiceArea"
                        style="
                            min-height:60px;
                            margin-top:10px;
                        ">
                    </div>

                </div>

            </div>

            <!-- MESSAGE ROW -->
            <div style="
                display:grid;
                grid-template-columns:repeat(4, 1fr);
                gap:10px;
                margin-bottom:15px;
                text-align:center;
                font-weight:bold;
                font-size: 13px;
                color:#4e4e4e;
            ">
                
            <div style="
                position:relative;
                display:flex;
                justify-content:center;
                align-items:center;
            ">

                <img
                    src="images/${playerStats.wizardColor.toLowerCase()}Wizard.jpg"
                    style="height:100px;mix-blend-mode:multiply;border-radius:8px;border:2px solid #555;"
                />

                ${
                    state.playerUsedMaiden ||
                    state.playerToot ||
                    state.playerSalmon
                    ? `
                                <div style="
                                    position:absolute;
                                    left:50%;
                                    top:50%;
                                    transform:translate(-50%,-50%);
                                    background:rgba(255,255,255,0.9);
                                    padding:4px 10px;
                                    border-radius:8px;
                                    font-weight:bold;
                                    color:#333;
                                    box-shadow:0 0 8px rgba(0,0,0,0.4);
                                    white-space:nowrap;
                                    z-index:10;
                                    display:flex;
                                    flex-direction:column;
                                    align-items:center;
                                ">
                        ${state.playerUsedMaiden ? `<div>RINGO BINGO</div>` : ""}
                        ${state.playerToot ? `<div>TOOT TOOT!</div>` : ""}
                        ${state.playerSalmon ? `<div>SALMON!</div>` : ""}
                    </div>
                    `
                    : ""
                }

            </div>

            <div style="
                position:relative;
                display:flex;
                justify-content:center;
                align-items:center;
            ">

                <img
                    src="images/${state.mintyActive ? "minty.jpg" : "0128.jpg"}"
                    style="
                        height:100px;
                        mix-blend-mode:multiply;
                        border-radius:8px;
                        border:2px solid #555;
                    "
                />

                ${
                    state.mintyUsedMaiden ||
                    state.mintyToot ||
                    state.mintySalmon
                        ? `
                                <div style="
                                    position:absolute;
                                    left:50%;
                                    top:50%;
                                    transform:translate(-50%,-50%);
                                    background:rgba(255,255,255,0.9);
                                    padding:4px 10px;
                                    border-radius:8px;
                                    font-weight:bold;
                                    color:#333;
                                    box-shadow:0 0 8px rgba(0,0,0,0.4);
                                    white-space:nowrap;
                                    z-index:10;
                                    display:flex;
                                    flex-direction:column;
                                    align-items:center;
                                ">
                                ${state.mintyUsedMaiden ? `<div>RINGO BINGO</div>` : ""}
                                ${state.mintyToot ? `<div>TOOT TOOT!</div>` : ""}
                                ${state.mintySalmon ? `<div>SALMON!</div>` : ""}
                            </div>
                        `
                        : ""
                }

            </div>

            <div style="
                position:relative;
                display:flex;
                justify-content:center;
                align-items:center;
            ">

                <img
                    src="images/${state.fidgetActive ? "fidget.jpg" : "0128.jpg"}"
                    style="
                        height:100px;
                        mix-blend-mode:multiply;
                        border-radius:8px;
                        border:2px solid #555;
                    "
                />

                ${
                    state.fidgetUsedMaiden ||
                    state.fidgetToot ||
                    state.fidgetSalmon
                        ? `
                                <div style="
                                    position:absolute;
                                    left:50%;
                                    top:50%;
                                    transform:translate(-50%,-50%);
                                    background:rgba(255,255,255,0.9);
                                    padding:4px 10px;
                                    border-radius:8px;
                                    font-weight:bold;
                                    color:#333;
                                    box-shadow:0 0 8px rgba(0,0,0,0.4);
                                    white-space:nowrap;
                                    z-index:10;
                                    display:flex;
                                    flex-direction:column;
                                    align-items:center;
                                ">
                                ${state.fidgetUsedMaiden ? `<div>RINGO BINGO</div>` : ""}
                                ${state.fidgetToot ? `<div>TOOT TOOT!</div>` : ""}
                                ${state.fidgetSalmon ? `<div>SALMON!</div>` : ""}
                            </div>
                        `
                        : ""
                }

            </div>

            <div style="
                position:relative;
                display:flex;
                justify-content:center;
                align-items:center;
            ">

                <img
                    src="images/${state.brianActive ? "brian.jpg" : "0128.jpg"}"
                    style="
                        height:100px;
                        mix-blend-mode:multiply;
                        border-radius:8px;
                        border:2px solid #555;
                    "
                />

                ${
                    state.brianUsedMaiden ||
                    state.brianToot ||
                    state.brianSalmon
                        ? `
                                <div style="
                                    position:absolute;
                                    left:50%;
                                    top:50%;
                                    transform:translate(-50%,-50%);
                                    background:rgba(255,255,255,0.9);
                                    padding:4px 10px;
                                    border-radius:8px;
                                    font-weight:bold;
                                    color:#333;
                                    box-shadow:0 0 8px rgba(0,0,0,0.4);
                                    white-space:nowrap;
                                    z-index:10;
                                    display:flex;
                                    flex-direction:column;
                                    align-items:center;
                                ">
                                ${state.brianUsedMaiden ? `<div>RINGO BINGO</div>` : ""}
                                ${state.brianToot ? `<div>TOOT TOOT!</div>` : ""}
                                ${state.brianSalmon ? `<div>SALMON!</div>` : ""}
                            </div>
                        `
                        : ""
                }

            </div>
            </div>

            <hr>

            <!-- PLAYER ROW -->

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(4, 1fr);
                gap:10px;
                margin-bottom:15px;
            ">
            <div style="
                border:1px solid #555;
                border-radius:10px;
                padding:10px;
                ${state.winners?.includes("player") ? winnerGlow : ""}
            ">

                    <strong>
                        ${state.playerName}
                    </strong><hr>

                <div style="display:flex; align-items:center; gap:6px;">
                    <img src="images/gold.jpg" style="width:18px;mix-blend-mode:multiply;" />
                    <span>${getGold(playerStats)}</span>

                    ${state.winners?.includes("player") ? `
                        <img src="images/crown.svg"
                            style="width:18px;height:18px;" />

                        ${state.isTie ? `
                            <img src="images/salmon.svg"
                                style="width:18px;mix-blend-mode:multiply;" />
                        ` : ""}
                    ` : ""}
                </div>

                <div style="display:flex; align-items:center; gap:6px;">
                    Luck:
                    ${playerStats.stats?.LUCK?.current ?? 0}
                </div><hr>

                    <div
                        id="playerDiceArea"
                        style="
                            min-height:60px;
                            margin-top:10px;
                        ">
                    </div>

                </div>

                <div style="
                    border:1px solid #555;
                    border-radius:10px;
                    padding:10px;
                    ${state.winners?.includes("minty") ? winnerGlow : ""}
                ">

                    <strong>Minty</strong><hr>

                    <div style="display:flex; align-items:center; gap:6px;">
                        <img src="images/gold.jpg" style="width:18px;mix-blend-mode:multiply;" />
                        ${state.mintyGold}

                        ${state.winners?.includes("minty") ? `
                            <img src="images/crown.svg"
                                style="width:18px;mix-blend-mode:multiply;" />

                            ${state.isTie ? `
                                <img src="images/salmon.svg"
                                    style="width:18px;mix-blend-mode:multiply;" />
                            ` : ""}
                        ` : ""}
                    </div>

                    <div style="display:flex; align-items:center; gap:6px;">
                        Luck:
                        ${state.mintyLuck}
                    </div><hr>

                    <div
                        id="mintyDiceArea"
                        style="
                            min-height:60px;
                            margin-top:10px;
                        ">
                    </div>

                </div>

                <div style="
                    border:1px solid #555;
                    padding:10px;
                    border-radius:10px;
                    ${state.winners?.includes("fidget") ? winnerGlow : ""}
                ">

                    <strong>Fidget</strong><hr>

                    <div style="display:flex; align-items:center; gap:6px;">
                        <img src="images/gold.jpg" style="width:18px;mix-blend-mode:multiply;" />
                        ${state.fidgetGold}

                        ${state.winners?.includes("fidget") ? `
                            <img src="images/crown.svg"
                                style="width:18px;mix-blend-mode:multiply;" />

                            ${state.isTie ? `
                                <img src="images/salmon.svg"
                                    style="width:18px;mix-blend-mode:multiply;" />
                            ` : ""}
                        ` : ""}
                    </div>

                    <div style="display:flex; align-items:center; gap:6px;">
                        Luck:
                        ${state.fidgetLuck}
                    </div><hr>

                    <div
                        id="fidgetDiceArea"
                        style="
                            min-height:60px;
                            margin-top:10px;
                        ">
                    </div>

                </div>

                <div style="
                    border:1px solid #555;
                    padding:10px;
                    border-radius:10px;
                    ${state.winners?.includes("brian") ? winnerGlow : ""}
                ">

                    <strong>Brian</strong><hr>

                    <div style="display:flex; align-items:center; gap:6px;">
                        <img src="images/gold.jpg" style="width:18px;mix-blend-mode:multiply;" />
                        ${state.brianGold}

                        ${state.winners?.includes("brian") ? `
                            <img src="images/crown.svg"
                                style="width:18px;mix-blend-mode:multiply;" />

                            ${state.isTie ? `
                                <img src="images/salmon.svg"
                                    style="width:18px;mix-blend-mode:multiply;" />
                            ` : ""}
                        ` : ""}
                    </div>

                    <div style="display:flex; align-items:center; gap:6px;">
                        Luck:
                        ${state.brianLuck}
                    </div><hr>

                    <div
                        id="brianDiceArea"
                        style="
                            min-height:60px;
                            margin-top:10px;
                        ">
                    </div>

                </div>

            </div>

            <hr>

            <div style="
                margin-top:15px;
            ">
                ${buttonSection}
            </div>

        </div>
    `;

    const rollTargetBtn =
        container.querySelector("#rollTargetBtn");

    const rollDiceBtn =
        container.querySelector("#rollDiceBtn");

    const luckBtn =
        container.querySelector("#luckBtn");

    const leaveBtn =
        container.querySelector("#leaveBtn");

    const nextRoundBtn =
        container.querySelector("#nextRoundBtn");

    const gameOverBtn =
        container.querySelector("#gameOverBtn");        

    if (rollTargetBtn) {
        rollTargetBtn.addEventListener(
            "click",
            onRollTarget
        );
    }

    if (rollDiceBtn) {
        rollDiceBtn.addEventListener(
            "click",
            onRollDice
        );
    }

    if (luckBtn) {
        luckBtn.addEventListener(
            "click",
            onLuckBeMyMaiden
        );
    }

    if (leaveBtn) {
        leaveBtn.addEventListener(
            "click",
            () => {
                closeModal();
                onTakeWinnings();
            }
        );
    }

    if (nextRoundBtn) {
        nextRoundBtn.addEventListener(
            "click",
            onPlayAnotherRound
        );
    }

    if (gameOverBtn) {
        gameOverBtn.addEventListener(
            "click",
            () => {
                closeModal();
                onGameOver();
            }
        );
    }  

    const targetDiceArea =
        container.querySelector("#targetDiceArea");

    const playerDiceArea =
        container.querySelector("#playerDiceArea");

    const mintyDiceArea =
        container.querySelector("#mintyDiceArea");

    const fidgetDiceArea =
        container.querySelector("#fidgetDiceArea");

    const brianDiceArea =
        container.querySelector("#brianDiceArea");


    if (
        targetDiceArea &&
        state.targetRoll
    ) {
        renderGameDice(
            targetDiceArea,
            state.targetRoll,
            "green",
            state.animateTargetRoll
        );
    }

    if (
        playerDiceArea &&
        state.playerRoll
    ) {
        renderPlayerDice(
            playerDiceArea,
            state.playerRoll,
            state.waitingForDiscard
                ? onDiscardDie
                : null,
                state.animatePlayerRoll
        );
    }

    if (mintyDiceArea) {

        if (state.mintyActive && state.mintyRoll) {

            renderGameDice(
                mintyDiceArea,
                state.mintyRoll,
                "brown",
                state.animateMintyRoll
            );

        } else if (!state.mintyActive) {

            mintyDiceArea.innerHTML = `
                <div style="
                    margin-top:15px;
                ">
                    Gone to the bar
                </div>
            `;
        }
    }

if (fidgetDiceArea) {

    if (state.fidgetActive && state.fidgetRoll) {

        renderGameDice(
            fidgetDiceArea,
            state.fidgetRoll,
            "purple",
            state.animateFidgetRoll
        );

    } else if (!state.fidgetActive) {

        fidgetDiceArea.innerHTML = `
            <div style="
                margin-top:15px;
            ">
                Gone to the bar
            </div>
        `;
    }
}

if (brianDiceArea) {

    if (state.brianActive && state.brianRoll) {

        renderGameDice(
            brianDiceArea,
            state.brianRoll,
            "orange",
            state.animateBrianRoll
        );

    } else if (!state.brianActive) {

        brianDiceArea.innerHTML = `
            <div style="
                margin-top:15px;
            ">
                Gone to the bar
            </div>
        `;
    }
}

    setModalContent(container);
    openModal();
}