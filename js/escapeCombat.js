// escapeCombat.js
import { consumeItem } from "./useItem.js";

export function attemptEscape({
    combatState,
    enemyInstances,
    playerStats,
    endPlayerTurn,
    triggerEnemyTurn,
    refreshUI
}) {
    if (combatState.escapeAttempted) return;

    combatState.escapeAttempted = true;

    // ⚡ Thunder Chip check
combatState.usedThunderChip = hasThunderChip(playerStats, enemyInstances);

if (!combatState.usedThunderChip) {
    enemyInstances.forEach(enemy => {
        enemy.stats.skill += 2;
    });
}

    if (refreshUI) refreshUI();
    endPlayerTurn();
    triggerEnemyTurn();
}


// -------------------------
// Escape success overlay
// -------------------------
export function showEscapeScreen(returnToGame, playerStats, enemyInstances, combatState) {

    if (document.querySelector(".escape-overlay")) return;

    removeAttemptEscapeScreen();
    const overlay = document.createElement("div");
    overlay.className = "escape-overlay";

    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        background: "rgba(88, 88, 88, 0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000"
    });

    const icon = document.createElement("img");
    icon.src = "images/escape.png";
    icon.alt = "Escape";

    icon.style.width = "200px";
    icon.style.height = "200px";
    icon.style.marginBottom = "20px";

    const existing = document.querySelector(".escape-overlay");
    if (existing) existing.remove();

    const msg = document.createElement("div");

    if (combatState.usedThunderChip) {

        const chipIcon = document.createElement("img");
        chipIcon.src = "images/0050.jpg";
        chipIcon.alt = "Thunder Chip";

        chipIcon.style.width = "80px";
        chipIcon.style.height = "80px";
        chipIcon.style.marginBottom = "20px";

        overlay.appendChild(chipIcon);
        
        const title = document.createElement("h1");
        title.textContent = "The Thunder Chip explodes.";
        title.style.color = "white";
        title.style.marginBottom = "10px";
        title.style.textAlign = "center";

        const body = document.createElement("div");
        body.textContent =
            "Thunder roars around you stunning your enemies\nallowing you to escape without taking damage.";

        body.style.color = "white";
        body.style.whiteSpace = "pre-line";
        body.style.textAlign = "center";
        body.style.fontSize = "18px";
        body.style.opacity = "0.9";
        body.style.marginBottom = "10px"

        msg.append(title, body);

    } else {
        const body = document.createElement("h1");
        body.textContent = "Enemies get a free attack\nas you flee the battle.";

        body.style.color = "white";
        body.style.whiteSpace = "pre-line";
        body.style.textAlign = "center";

        msg.appendChild(body);
    }

    const btn = document.createElement("button");
    btn.textContent = "Return to Game";

    btn.style.padding = "10px 20px";
    btn.style.fontSize = "1.2rem";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px"
    btn.style.backgroundColor = "#d7d4d4";
    btn.style.color = "#424141";
    btn.style.border = "1px solid #555";
    btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

    btn.onclick = () => {
        playerStats.fairyShower = false
        playerStats.companions = playerStats.companions.filter(c => c !== "fairy");  
        overlay.remove();
        returnToGame();
    };

    overlay.append(icon, msg, btn);
    document.body.appendChild(overlay);
}
    
export function showAttemptEscapeScreen(diceCell) {

    if (!diceCell) return;

    // prevent duplicates inside the cell
    if (diceCell.querySelector(".escape-attempt-overlay")) return;

// check for Thunder Chip

    const overlay = document.createElement("div");
    overlay.className = "escape-attempt-overlay";

    Object.assign(overlay.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        background: "rgba(0,0,0,0.55)",

        zIndex: "10"
    });

    const icon = document.createElement("img");
    icon.src = "images/escape.png";
    icon.alt = "Escape";

    icon.style.width = "100px";
    icon.style.height = "100px";
    icon.style.marginBottom = "10px";

    overlay.appendChild(icon);

    // IMPORTANT: ensure parent can contain absolute overlay
    diceCell.style.position = "relative";
    diceCell.appendChild(overlay);
}

export function removeEscapeButton() {
    const btn = document.querySelector(".escape-btn");
    if (btn) btn.remove();
}

export function removeAttemptEscapeScreen() {
    const overlay = document.querySelector(".escape-attempt-overlay");
    if (overlay) overlay.remove();
}

function hasThunderChip(playerStats, targetEnemies) {
    const worn = playerStats.inventory?.wornItems;

    const chip =
        worn?.carried?.id === "0050" ? worn.carried :
        null;

    if (!chip) return false;

    const activeEnemies = targetEnemies.slice(0, 6);

    activeEnemies.forEach(enemy => {
        if (!enemy.effects) enemy.effects = [];

        const existing = enemy.effects.find(e => e.type === "enemyStunned");

        if (existing) {
            existing.remaining += 1;
        } else {
            enemy.effects.push({
                type: "enemyStunned",
                remaining: 1
            });
        }
    });
    consumeItem(playerStats, chip);
    return true;
}

export function renderEscapeButton({
    diceCell,
    combatState,
    enemyInstances,
    playerStats,
    triggerEnemyTurn,
    refreshUI,
    endPlayerTurn,
    showAttemptEscapeScreen
}) {
    const existing = diceCell.querySelector(".escape-btn");
    if (existing) return;

    const escapeBtn = document.createElement("button");
    escapeBtn.className = "escape-btn";
    escapeBtn.textContent = "Escape";

    Object.assign(escapeBtn.style, {
        position: "absolute",
        bottom: "8px",
        right: "8px",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #555",
        cursor: "pointer",
        backgroundColor:"#424141",
        color: "#d7d4d4",
        boxShadow: "0 1px 7px rgba(0,0,0,0.5)"
    });

    escapeBtn.onclick = () => {
        attemptEscape({
            combatState,
            enemyInstances,
            playerStats,
            endPlayerTurn,
            triggerEnemyTurn,
            refreshUI
        });

        if (combatState.escapeAttempted) {
            showAttemptEscapeScreen(diceCell);
        }
    };

    diceCell.appendChild(escapeBtn);
}  