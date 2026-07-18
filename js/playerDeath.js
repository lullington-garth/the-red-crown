// playerDeath.js
import { showItemOverlay } from "./itemOverlay.js";
import { removeAttemptEscapeScreen } from "./escapeCombat.js";

/**
 * Show the player death overlay
 * @param {Function} startNewGame - optional restart handler
 * @param {string} deathMessage - optional custom message
 */
export function showPlayerDeathScreen(startNewGame, deathMessage) {
    // Prevent duplicate overlays
    if (document.querySelector(".death-overlay")) return;

    removeAttemptEscapeScreen();
    const overlay = document.createElement("div");
    overlay.className = "death-overlay";

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

    const skull = document.createElement("img");

    skull.src = `images/skull.jpg`;
    skull.style.width = "200px";
//    image.style.height = "300px";
    skull.style.objectFit = "block";
    skull.style.borderRadius = "6px";
    skull.style.marginBottom = "0px";
    skull.style.border = "1px solid #555";
//    image.style.opacity = "0.9";
//    skull.style.mixBlendMode = "multiply";

    const msg = document.createElement("h1");

    // ✅ Use custom message if provided
    msg.innerHTML = deathMessage || "You died in battle.";

    msg.style.color = "white";
    msg.style.textAlign = "center";
    msg.style.lineHeight = "1.4";   
    msg.style.marginBottom = "20px";

    const btn = document.createElement("button");
    btn.textContent = "Start New Game";

    btn.style.padding = "10px 20px";
    btn.style.fontSize = "1.2rem";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px"
    btn.style.backgroundColor = "#d7d4d4";
    btn.style.color = "#424141";
    btn.style.border = "1px solid #555";
    btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

    btn.onclick = () => {

        overlay.remove();

        if (startNewGame) {
            startNewGame();
        } else {
            window.location.reload();
        }

    };

    overlay.append(skull, msg, btn);

    document.body.appendChild(overlay);
}

    // -------------------------
    // Player death check
    // -------------------------
export function checkPlayerDeath({
    playerStats,
    diceCell,
    cells,
    startNewGame,
    deathMessage
}) {
    if (playerStats.stats.STAMINA.current > 0) return false;

    // 🟣 NEW: Resurrection check
    const resurrected = hasResurrectionRing(playerStats);
    

    if (resurrected) {
    showItemOverlay(
    {
      item: "Ring Sacrificed",
      image: "0198.jpg"
    },
        "The Ring of Resurrection glows brightly and saves you from death.\n\nYou are restored to half your stamina.\n\nThe ring's magic is now spent.",
        () => {
            // Optional: re-render UI after closing
            if (cells?.player) {
                cells.player.style.background = "";
            }
        }
    );
        return false;
    }

    // 🟣 NEW: Death Slip Pendant check
    const deathSlip = hasDeathSlipPendant(playerStats);

    if (deathSlip) {

        // 🟣 Only show message ONCE per combat
        if (!playerStats.flags?.deathSlipMessageShown) {

            playerStats.flags.deathSlipMessageShown = true;

            showItemOverlay(
                {
                    item: "Pendant Activated",
                    image: "0143.jpg"
                },
                "The Reaper's Blessing burns against your chest.\n\nYou cannot die this combat.\n\nYou are held at 1 stamina until the battle ends.",
                () => {
                    if (cells?.player) {
                        cells.player.style.background = "";
                    }
                }
            );
        }

        return false;
    }

    // Actual death
    if (diceCell) diceCell.style.background = "#424141";
    if (cells?.player) cells.player.style.background = "#424141";

    showPlayerDeathScreen(startNewGame, deathMessage);

    return true;
}
    
export function playerDeathByItem(playerStats, item) {
    
        const stamina = playerStats.stats.STAMINA;
    
        if (stamina && stamina.current <= 0) {
    
            showPlayerDeathScreen(
                null,
                `You are dead.\nKilled by ${item.item}.`
            );
        }
    }

function hasResurrectionRing(playerStats) {
    const worn = playerStats.inventory?.wornItems;

    const ring =
        worn?.ring1?.id === "0198" ? worn.ring1 :
        worn?.ring2?.id === "0198" ? worn.ring2 :
        null;

    if (!ring) return false;

    // Optional: prevent reuse if something weird happens
    if (ring["special-ability"] !== "RESURRECT") return false;

    // Restore HALF of max stamina
    const stamina = playerStats.stats.STAMINA;

    if (stamina) {
        stamina.current = Math.ceil(stamina.max / 2);
    }

    // Burn the ring (make it useless)
    ring.magical = false;
    ring["special-ability"] = "None";
    ring.sell = 1;

    // Append "- spent" only once
    if (!ring["id-description"].includes(" Spent")) {
        ring["id-description"] += " Spent";
    }

    // Optional but useful for UI feedback
    ring.used = 1;

    return true;
}

function hasDeathSlipPendant(playerStats) {
    const worn = playerStats.inventory?.wornItems;

    const pendant =
        worn?.neck?.id === "0143" ? worn.neck :
        null;

    if (!pendant) return false;

    // Only trigger once
    if (pendant["special-ability"] !== "DEATH_SLIP") return false;
//    if (pendant.used === 1) return false;

    const stamina = playerStats.stats.STAMINA;

    if (playerStats.stats.STAMINA.current < 1) {
        playerStats.stats.STAMINA.current = 1;
    }

    // 🟣 FLAG EFFECT ACTIVE (THIS IS KEY)
    playerStats.flags = playerStats.flags || {};
    playerStats.flags.deathSlipActive = true;

    pendant.used = 1;

    return true;
}

export function deathSlipSpent(playerStats) {
    const worn = playerStats.inventory?.wornItems;

    const pendant =
        worn?.neck?.id === "0143" ? worn.neck :
        null;

    if (!pendant) return;

    // Burn the pendant
    pendant.magical = false;
    pendant["special-ability"] = "None";
    pendant.sell = 1;

    if (!pendant["id-description"].includes(" Spent")) {
        pendant["id-description"] += " Spent";
    }
}

export function checkPlayerMapDeath(playerStats, node) {
    if (!playerStats?.stats) return node;

    const stamina = playerStats.stats.STAMINA;

    const isDead = stamina && stamina.current <= 0;

    if (!isDead) return node;
console.log ("node.deathMessage = ", node.deathMessage)
    return {
        ...node,
        text: `${node.text}\n\n${node.deathMessage || "You have died."}`,
        choices: []
    };
}