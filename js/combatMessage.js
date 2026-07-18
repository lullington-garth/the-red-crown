// combatMessage.js

let stylesInjected = false;

export function injectCombatMessageStyles() {
    if (stylesInjected) return;

    const style = document.createElement("style");
    style.textContent = `
/* Base combat message container */
.combat-message {
    position: absolute;
    top: var(--combat-msg-top, 50%);
    left: 50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    padding: 4px 10px;
    border-radius: 6px;

    font-size: 24px;
    text-align: center;

    pointer-events: none;

    animation: combatFade 1.8s ease forwards;
    white-space: nowrap;
    
}

/* Player / Enemy base coloring */
.combat-message--player.combat-message--hit {
    background: white;
    color: black;
}

.combat-message--player.combat-message--miss {
    background: grey;
    color: white;
}

.combat-message--enemy.combat-message--melee {
    background: white;
    color: black;
}

.combat-message--enemy.combat-message--miss {
    background: grey;
    color: white;
}

.combat-message--enemy.combat-message--stun {
    background: grey;
    color: white;
}

.combat-message--enemy.combat-message--double {
    background: white;
    color: black;
}

.combat-message--player.combat-message--resist {
    background: grey;
    color: white;
}

.combat-message--player.combat-message--noeffect {
    background: grey;
    color: white;
}

.combat-message--player.combat-message--sweep {
    background: white;
    color: black;
}

.combat-message--enemy.combat-message--death {
    background: black;
    color: white;
}

.combat-message--player.combat-message--critical {
    background: white;
    color: black;
}

.combat-message--player.combat-message--spell {
    background: white;
    color: black;
}

.combat-message--player.combat-message--misfire {
    background: grey;
    color: white;
}

.combat-message--enemy.combat-message--magic {
    background: white;
    color: black;
}

.combat-message--enemy.combat-message--special {
    background: white;
    color: black;
}

/* Icon styling */
.combat-message img {
    width: 25px;
    height: 25px;
    object-fit: contain;
}

/* Animation */
@keyframes combatFade {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0.9);
    }
    70% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -20%) scale(0.95);
    }
}

/* Splinter / charge flare animation */
@keyframes chargeFlare {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0px rgba(255,255,255,0);
    }
    40% {
        transform: scale(1.4);
        box-shadow: 0 0 12px 4px rgba(255, 255, 255, 0.9);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0px rgba(255,255,255,0);
    }
}

.charge-flare {
    animation: chargeFlare 0.35s ease-out;
}

/* Companion flare animation */
@keyframes companionFlare {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0px rgba(255,255,255,0);
    }
    40% {
        transform: scale(0.8);
        box-shadow: 0 0 12px 4px rgba(255, 255, 255, 0.9);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0px rgba(255,255,255,0);
    }
}

.companion-flare {
    animation: companionFlare 0.35s ease-out;
}
`;

    document.head.appendChild(style);
    stylesInjected = true;
}

export function showCombatMessage(targetDiv, config) {
    if (!targetDiv || !(targetDiv instanceof HTMLElement)) {
        console.error("❌ Invalid targetDiv:", targetDiv);
        return;
    }

    const old = targetDiv.querySelector(".combat-message");
    if (old) old.remove();

    const msg = document.createElement("div");

    msg.className = `combat-message combat-message--${config.type} combat-message--${config.result}`;

    msg.style.setProperty("--combat-msg-top", config.top || "50%");

    // Create content wrapper
    const content = document.createElement("div");
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.gap = "6px";

    // Icon (if exists)
// Icon (if exists)
if (config.icon) {
    const iconWrapper = document.createElement("div");

    iconWrapper.style.display = "flex";
    iconWrapper.style.alignItems = "center";
    iconWrapper.style.justifyContent = "center";

    //  Dark background ONLY for icon
    iconWrapper.style.background = "rgba(255, 255, 255, 0.95)";
    iconWrapper.style.borderRadius = "8px";
    iconWrapper.style.padding = "5px";

    const img = document.createElement("img");
    img.src = config.icon;
    img.alt = "weapon";
    img.style.width = "25px";
    img.style.height = "25px";
    img.style.objectFit = "contain";

    iconWrapper.appendChild(img);
    content.appendChild(iconWrapper);
}

    // Text
    const text = document.createElement("span");
    text.textContent = config.text;

    content.appendChild(text);
    msg.appendChild(content);

    targetDiv.appendChild(msg);

    setTimeout(() => msg.remove(), 1800);
}

export function clearCombatMessages() {
    document.querySelectorAll(".combat-message").forEach(e => e.remove());
}

// Show risk description (used for spell misfires/backfires)
export function showRiskDescription(targetDiv, description) {
    targetDiv.querySelectorAll(".risk-description").forEach(e => e.remove());

    const p = document.createElement("p");
    p.className = "risk-description";

    p.innerHTML = description.replace(/\n/g, "<br>");
    p.style.cssText = `
        background-color: transparent);
        border-radius: 12px;
        padding: 10px 15px;
        display: inline-block;
        border: 1px solid #555;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        font-size: 14px;
        text-align: center;
    `;

    targetDiv.appendChild(p);
}

// Show spell cast messages
export function showSpellCastMessage(targetDiv, spellName) {
    showCombatMessage(targetDiv, {
        type: "player",
        result: "blank",
        text: `Casting Spell`,
    });
}

export function showPotionUsedMessage(targetDiv) {
    showCombatMessage(targetDiv, {
        type: "player",
        result: "blank",
        text: `Potion Used`
    });
}

export function showItemUsedMessage(targetDiv) {
    showCombatMessage(targetDiv, {
        type: "player",
        result: "blank",
        text: "Item Used"
    });
}

// Show misfire messages
export function showMisfireMessage(targetDiv) {
    showCombatMessage(targetDiv, {
        type: "player",
        result: "misfire",
        text: "Misfire",
    });
}

// Show sweeping blow overlay
export function showSweepMessage(targetDiv) {
    showCombatMessage(targetDiv, {
        type: "player",
        result: "sweep",
        text: "Sweeping Blow",
    });
}

// combatMessage.js
export function showRiskOverlay(targetDiv, riskType) {
    let failText = "Misfire"; // default

    switch(riskType) {
        case "backfire":
            failText = "Backfire";
            break;
        case "stunned":
            failText = "Misfire";
            break;
        case "misfire":
        default:
            failText = "Misfire";
    }

    showCombatMessage(targetDiv, {
        type: "player",
        result: "misfire",
        text: failText,
        top: "50%"
    });
}

// Show spell name on single or multiple targets
export function showSpellTargets(spellName, targetCells) {
    targetCells.forEach(cell => {
        if (!cell) return;
        showCombatMessage(cell, {
            type: "player",
            result: "spell",
            text: spellName,
            top: "35%"
        });
    });
}

// Show a "player stunned" overlay and dice message
export function showPlayerStunnedMessage(cell, diceCell) {
    // Short overlay
    showCombatMessage(cell, {
        type: "player",
        result: "misfire",
        text: "Miss Turn",
        top: "35%"
    });
    
    // Dice log message
    const diceDiv = diceCell.querySelector(".dice-output") || document.createElement("div");
    diceCell.querySelectorAll(".risk-description").forEach(e => e.remove());

    diceDiv.className = "dice-output";
    diceDiv.innerHTML = "<p>You are stunned and cannot act this turn!</p>";
    diceDiv.style.cssText = `
        background-color: transparent;
        border-radius: 12px;
        padding: 10px 15px;
        display: inline-block;
        border: 1px solid #555;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        font-size: 14px;
        text-align: center;
    `;
    diceCell.appendChild(diceDiv);
}

export function showDoubleAttackMessage(cell, diceCell) {
    // Dice log message
    const diceDiv = diceCell.querySelector(".dice-output") || document.createElement("div");
//    diceCell.querySelectorAll(".risk-description").forEach(e => e.remove());

    diceDiv.className = "dice-output";
    const p = document.createElement("p");
    p.textContent = "You have a free attack. Take another turn.";

    diceDiv.appendChild(p);
    diceDiv.style.cssText = `
        background-color: transparent;
        border-radius: 12px;
        padding: 10px 15px;
        display: inline-block;
        border: 1px solid #555;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        font-size: 14px;
        text-align: center;
    `;
    diceCell.appendChild(diceDiv);
}

export function showAbsorbFireMessage(diceCell) {
  
    // Dice log message
    const diceDiv = diceCell.querySelector(".dice-output") || document.createElement("div");
    diceCell.querySelectorAll(".risk-description").forEach(e => e.remove());

    diceDiv.className = "dice-output";
    diceDiv.innerHTML = "<p>Dragon fire absorbed by Dragon Scale Petal</p>";
    diceDiv.style.cssText = `
        background-color: transparent);
        border-radius: 12px;
        padding: 10px 15px;
        display: inline-block;
        border: 1px solid #555;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        font-size: 14px;
        text-align: center;
    `;
    diceCell.appendChild(diceDiv);
}

export function showAbsorbSpecialMessage(diceCell) {
  
    // Dice log message
    const diceDiv = diceCell.querySelector(".dice-output") || document.createElement("div");
    diceCell.querySelectorAll(".risk-description").forEach(e => e.remove());

    diceDiv.className = "dice-output";
    diceDiv.innerHTML = "<p>Special attack damage absorbed by Splinter Stones</p>";
    diceDiv.style.cssText = `
        background-color: transparent);
        border-radius: 12px;
        padding: 10px 15px;
        display: inline-block;
        border: 1px solid #555;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        font-size: 14px;
        text-align: center;
    `;
    diceCell.appendChild(diceDiv);
}