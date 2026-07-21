// diceModals.js
import { setModalContent, openModal, closeModal } from "./modal.js";
import { showItemDescription } from "./inventoryUI.js";
import { renderPlayerDice } from './diceUI.js';
import { rollCombatDice, discardPlayerDie } from './dice.js';

export function showPreRollModal({
    itemName,
    image,
    stat,
    options,
    playerStats,
    onSelect,
    rollMessage
}) {

    const container = document.createElement("div");

    container.innerHTML = `
        <div style="text-align:center;">
            <img src="images/${image}" style="width:100px; mix-blend-mode: multiply;" />
            <h3>${itemName}</h3>
            <p>${rollMessage || `Choose how to roll...`}</p><hr>
        </div>
    `;

    const optionsWrapper = document.createElement("div");

    // 🟣 ITEM OPTIONS (with full description UI)
options.forEach(opt => {

    const row = document.createElement("div");

    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.gap = "12px";
    row.style.padding = "10px 0";
    row.style.borderBottom = "1px solid #ccc";

    // 🟡 LEFT SIDE
    const left = document.createElement("div");
    left.style.flex = "1";

    if (opt.item) {
        left.appendChild(showItemDescription(opt.item, playerStats));
    } else {
        left.appendChild(showItemDescription(normalRollItem, playerStats));
    }

    // 🔵 RIGHT SIDE BUTTON
    const btn = document.createElement("button");
    btn.textContent = "Select";

    btn.style.backgroundColor = "#424141";
    btn.style.color = "#d7d4d4";
    btn.style.border = "1px solid #555";
    btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    btn.style.fontSize = "20px";
    btn.style.padding = "10px 16px";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    btn.style.flexShrink = "0";

    btn.addEventListener("click", () => {
        closeModal();
        onSelect(opt);
    });

    row.appendChild(left);
    row.appendChild(btn);

    container.appendChild(row);
});

    container.appendChild(optionsWrapper);

    setModalContent(container);
    openModal();
}

export function showPostRollModal({
    itemName,
    image,
    stat,
    lastRoll,
    options,
    playerStats,
    onSelect,
    rollMessage
}) {

    const container = document.createElement("div");

    // 🧠 Detect if player must discard first
    const mustDiscard = lastRoll?.devilsDice && lastRoll?.discarded == null;

    container.innerHTML = `
        <div style="text-align:center;">
            <img src="images/${image}" style="width:100px; mix-blend-mode: multiply;" />
            <h3>${itemName}</h3>
            <div id="postRollDice" style="margin:10px 0;"></div><hr>
        </div>
    `;

    const diceContainer = container.querySelector("#postRollDice");

    if (lastRoll) {
        renderPlayerDice(
            diceContainer,
            lastRoll,
            (index) => {

                // 🎯 Only allow discard if Devil's Dice is active and not yet discarded
                if (!mustDiscard) return;

                discardPlayerDie(lastRoll, index);

                showPostRollModal({
                    itemName,
                    image,
                    stat,
                    lastRoll,
                    options,
                    playerStats,
                    onSelect,
                    rollMessage
                });
            },
            true      // <-- animate the dice
        );
    }

    const optionsWrapper = document.createElement("div");

    // 🟣 ITEM OPTIONS
    options.forEach(opt => {

        const row = document.createElement("div");

        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.gap = "12px";
        row.style.padding = "10px 0";
        row.style.borderBottom = "1px solid #ccc";

        // 🟡 LEFT SIDE
        const left = document.createElement("div");
        left.style.flex = "1";

        if (opt.item) {
            left.appendChild(showItemDescription(opt.item, playerStats));
        } else {
            left.appendChild(showItemDescription(normalRollItem, playerStats));
        }

        // 🔵 RIGHT SIDE BUTTON
        const btn = document.createElement("button");
        const isKeep = opt.id === "keep";

        btn.textContent = isKeep && mustDiscard
            ? "Discard a die"
            : "Select";

        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.fontSize = "20px";
        btn.style.padding = "10px 16px";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.flexShrink = "0";

        // 🚫 Disable KEEP if discard is required
        if (isKeep && mustDiscard) {
            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
            btn.title = "You must discard a die first";
        }

        btn.addEventListener("click", () => {
            closeModal();
            onSelect(opt);
        });

        row.appendChild(left);
        row.appendChild(btn);

        optionsWrapper.appendChild(row);
    });

    container.appendChild(optionsWrapper);

    setModalContent(container);
    openModal();
}

export function rollModal({
    item,
    dice = 1,
    rollMessage,
    session,
    onRollComplete,
    onPostRollOptions
}) {

    const container = document.createElement("div");

    container.innerHTML = `
        <div style="text-align:center;">
            <img src="images/${item.image}" 
                 style="width:100px; margin-bottom:10px; mix-blend-mode: multiply;" />

            <h3>${item.item}</h3>

            <p
                id="rollText"
                style="
                    margin:0;
                    min-height:28px;
                    padding:0;
                "
            ></p>

            <div
                id="diceContainer"
                style="
                    margin:15px 0;
                    height:50px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    overflow:hidden;
                "
            ></div>

            <button id="rollBtn" style="
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                padding:10px 16px;
                border:none;
                border-radius:8px;
                cursor:pointer;
                font-size:20px;
            ">
                Roll
            </button>
        </div>
    `;

    setModalContent(container);
    openModal();

    const diceContainer = container.querySelector("#diceContainer");
    const rollBtn = container.querySelector("#rollBtn");
    const rollText = container.querySelector("#rollText");

    let rolled = false;
    let lastRoll = null;

    // -----------------------------
    // SINGLE SOURCE OF MESSAGE TEXT
    // -----------------------------
    function setRollMessage(text) {
        if (!rollText) return;
        rollText.innerHTML = text;
    }

    // initial message (pre-roll)
    setRollMessage(
        session?.preRollMessage || rollMessage || "Roll for effect..."
    );

    // -----------------------------
    // ROLL FUNCTION
    // -----------------------------
    function doRoll(currentSession) {

        const roll = rollCombatDice({
            role: 'player',
            baseDice: currentSession?.dice ?? dice,
            devilsDice: currentSession?.devilsDice || false
        });

        lastRoll = roll;

        function handleDieClick(index) {

            if (!roll.devilsDice || roll.discarded != null) return;

            discardPlayerDie(roll, index);

            // re-render WITHOUT duplicate click handlers fighting each other
            renderPlayerDice(diceContainer, roll, handleDieClick, false);

            rollBtn.disabled = false;
            rollBtn.textContent = "OK";
            rollBtn.style.opacity = "1";
            rollBtn.style.cursor = "pointer";

            setRollMessage("Die discarded. Confirm your roll.");
        }

        renderPlayerDice(diceContainer, roll, handleDieClick,true);

        return roll;
    }

    // -----------------------------
    // REROLL SUPPORT
    // -----------------------------
    const rerollFn = (newSession) => {
        doRoll(newSession);

        if (onPostRollOptions) {
            onPostRollOptions({
                lastRoll,
                reroll: rerollFn,
                session: newSession
            });
        }
    };

    // -----------------------------
    // MAIN BUTTON FLOW
    // -----------------------------
    rollBtn.addEventListener("click", () => {

        // FIRST CLICK → ROLL
        if (!rolled) {

            doRoll(session);

            // reset message AFTER roll (not duplicated)
            setRollMessage( "You rolled a ..." );

                rollBtn.style.backgroundColor = "#424141";
                rollBtn.style.color = "#d7d4d4";
                rollBtn.style.border = "1px solid #555";
                rollBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

            // Devil's Dice lock state
            if (lastRoll?.devilsDice && lastRoll?.discarded == null) {
                rollBtn.disabled = true;
                rollBtn.textContent = "Discard a die";
                rollBtn.style.opacity = "0.5";
                rollBtn.style.cursor = "not-allowed";
                rollBtn.title = "You must discard a die first";
                rollBtn.style.fontSize = "20px";
                
            } else {
                rollBtn.textContent = "OK";
            }

            rolled = true;

            if (onPostRollOptions) {
                onPostRollOptions({
                    lastRoll,
                    reroll: rerollFn,
                    session
                });
            }

            return;
        }

        // SECOND CLICK → CONFIRM
        if (rolled && lastRoll) {
            closeModal();
            onRollComplete(lastRoll.total);
        }
    });
}