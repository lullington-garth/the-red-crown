// combatRenderer.js
import { showCombatMessage } from "./combatMessage.js";
import { renderPlayerDice } from "./diceUI.js";
import { handleWornItemEffects } from "./wornCombatEffects.js";
import { isCompanionPresent, getActiveCompanions, getCompanion } from "./combatCompanions.js";

const previousChargesMap = new Map();

function icon(name) {
    return `<img
        src="icons/${name}"
        style="
            width:16px;
            height:16px;
            vertical-align:text-bottom;
            margin-right:3px;
            object-fit:contain;
        ">`;
}

function statValue(v) {
    return typeof v === "object" ? v.current : (v ?? 0);
}

function getEnemyAttackLabel(enemy) {
    const type = enemy.combat?.attack_type || "melee";

    switch (type) {

        case "magic":
            return {
                attackLabel: null,
                magicLabel: "MAGIC"
            };

        case "both":
            return {
                attackLabel: "",
                magicLabel: ""
            };

        case "melee":
        default:
            return {
                attackLabel: "ATTACK",
                magicLabel: null
            };
    }
}

export function updateEnemyStaminaUI(cell, enemy) {
    const statsP = Array.from(cell.querySelectorAll("p"))
        .find(p => p.textContent.includes("ST:"));

    if (!statsP) return;

    const st = typeof enemy.stats.stamina === "object"
        ? enemy.stats.stamina.current
        : enemy.stats.stamina;

    const sk = typeof enemy.stats.skill === "object"
        ? enemy.stats.skill.current
        : enemy.stats.skill;

    const attackLabel = getEnemyAttackLabel(enemy);
    const at = enemy.combat?.attack ?? 0;
    const magic = enemy.combat?.magic ?? 0;

statsP.textContent = "";

const line1 = document.createElement("div");
line1.style.display = "flex";
line1.style.gap = "12px";
line1.style.marginBottom = "3px";

line1.innerHTML = `
  <span>${icon("skill.svg")}SKILL: ${sk}</span>
${attackLabel.attackLabel !== null ? `<span>${icon("attack.svg")}${attackLabel.attackLabel}: ${at}</span>` : ""}
${attackLabel.magicLabel !== null ? `<span>${icon("magic.svg")}${attackLabel.magicLabel}: ${magic}</span>` : ""}
`;

const line2 = document.createElement("div");
line2.innerHTML = `${icon("stamina.svg")}STAMINA: ${st}`;

statsP.appendChild(line1);
statsP.appendChild(line2);
}

export function renderEnemyCell(cell, enemy, index, buildButtons) {

    if (!enemy) {
        cell.innerHTML = "";
        cell.style.border = "none";
        cell.style.background = "transparent";
        return;
    }

    cell.classList.add("enemy-cell");

    // --- BUTTON CONTAINER ---
    let buttonContainer = cell.querySelector(".combat-button-bar-container");
    if (!buttonContainer) {
        buttonContainer = document.createElement("div");
        buttonContainer.className = "combat-button-bar-container";
        Object.assign(buttonContainer.style, {
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginBottom: "4px",
            maxWidth: "180px" // optional but helps control wrapping
        });
        cell.appendChild(buttonContainer);
    } else {
        // Clear existing buttons before rebuilding
        buttonContainer.innerHTML = "";
    }

    // --- CONTENT WRAPPER (name, stats, dice) ---
    let contentWrapper = cell.querySelector(".enemy-content");
    if (!contentWrapper) {
        contentWrapper = document.createElement("div");
        contentWrapper.className = "enemy-content";
        Object.assign(contentWrapper.style, {
            display: "flex",
            flexDirection: "column",
            rowGap: "0px",
            lineHeight: "1.1"
        });
        cell.appendChild(contentWrapper);
    } else {
        // Clear existing content for refresh
        contentWrapper.innerHTML = "";
    }

    // --- Enemy Name ---
    const nameHeader = document.createElement("h3");
    nameHeader.style.margin = "0 0 2px 0";
    nameHeader.textContent = enemy.name;
    contentWrapper.appendChild(nameHeader);

    // --- Enemy Stats ---
const statsLine = document.createElement("div");
statsLine.style.margin = "0";
statsLine.style.fontSize = "14px";

const sk = statValue(enemy.stats.skill);
const st = statValue(enemy.stats.stamina);
const attackLabel = getEnemyAttackLabel(enemy);
const at = enemy.combat?.attack ?? 0;
const magic = enemy.combat?.magic ?? 0;

const line1 = document.createElement("div");
line1.style.display = "flex";
line1.style.gap = "12px";
line1.style.marginBottom = "3px";

line1.innerHTML = `
  <span>${icon("skill.svg")}SKILL: ${sk}</span>
${attackLabel.attackLabel !== null ? `<span>${icon("attack.svg")}${attackLabel.attackLabel}: ${at}</span>` : ""}
${attackLabel.magicLabel !== null ? `<span>${icon("magic.svg")}${attackLabel.magicLabel}: ${magic}</span>` : ""}
`;

const line2 = document.createElement("div");
line2.innerHTML = `${icon("stamina.svg")}STAMINA: ${st}`;

statsLine.appendChild(line1);
statsLine.appendChild(line2);

contentWrapper.appendChild(statsLine);

    // --- Dice Area ---
    let diceDiv = contentWrapper.querySelector(".enemy-dice");
    if (!diceDiv) {
        diceDiv = document.createElement("div");
        diceDiv.className = "enemy-dice";
        diceDiv.style.marginTop = "4px";
        contentWrapper.appendChild(diceDiv);
    }

    // FORCE CORRECT ORDER EVERY RENDER
    cell.prepend(buttonContainer);
    
    // --- Staus bar ---
    const effectBar = document.createElement("div");
    effectBar.className = "enemy-effect-bar";

    effectBar.style.position = "absolute";
    effectBar.style.bottom = "4px";
    effectBar.style.left = "4px";
    effectBar.style.right = "4px";
    effectBar.style.display = "flex";
    effectBar.style.justifyContent = "flex-start";
    effectBar.style.gap = "6px";
    effectBar.style.fontSize = "15px";
    effectBar.style.margin = "5px"

    cell.appendChild(effectBar);

    // --- Build Buttons ---
    if (typeof buildButtons === "function") {
        buildButtons(enemy, index, cell, buttonContainer);
    }
}

export function renderQueuedEnemies(enemies, cell) {

    if (!enemies.length) {
        cell.innerHTML = "";
        cell.style.display = "none";
        return;
    }

    cell.innerHTML = "";
    cell.style.display = "flex";
    cell.style.flexDirection = "column";
    cell.style.rowGap = "2px";

    const header = document.createElement("h3");
    header.textContent = "Queued Enemies";
    header.style.margin = "0 0 2px 0";
    cell.appendChild(header);

    enemies.forEach(e => {
        const p = document.createElement("p");
        p.textContent = `${e.name} - SK:${statValue(e.stats.skill)}, ST:${statValue(e.stats.stamina)}, AT:${e.combat?.attack ?? 0}`;
        p.style.margin = "0";
        cell.appendChild(p);
    });
}

export function renderEnemyEffects(cell, enemy) {
    const bar = cell.querySelector(".enemy-effect-bar");
    if (!bar) return;

    bar.innerHTML = "";

        // --- Companion Hit Indicator ---
        if (enemy.companionHits && enemy.companionHits.length > 0) {

            enemy.companionHits.forEach(companionId => {
                const companion = getCompanion(companionId);
                if (!companion) return;

                const icon = document.createElement("img");
                icon.src = companion.image;

                icon.style.width = "30px";
                icon.style.height = "30px";
                icon.style.marginRight = "2px";

                bar.appendChild(icon);
            });

            // clear after render (so it flashes once)
            enemy.companionHits = [];
        }

        // --- Effective Weapon ---
        if (enemy.justHitStrong) {
        const icon = document.createElement("span");
        icon.textContent = `Good Weapon Choice`;
        icon.style.background = "rgba(0, 0, 0, 0.95)";
        icon.style.color = "rgba(255, 255, 255, 0.95)";
        icon.style.borderRadius = "8px";
        icon.style.padding = "2px 6px";
        icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

        bar.appendChild(icon);

        enemy.justHitStrong = false;
    }

    if (!enemy.effects) return;

    enemy.effects.forEach(effect => {

        // --- Slow Burn ---
        if (effect.type === "slowBurn") {

            const icon = document.createElement("span");

            icon.innerHTML = `
                <img
                    src="icons/slowBurn.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

            icon.style.background = "white";
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }

        // --- Defence Debuff ---
        if (effect.type === "defenceDebuff") {
            const icon = document.createElement("span");

            // Show stat + duration (optional but nice)
            const statShort = effect.stat === "ATTACK" ? "ATK↓" : effect.stat;

            icon.innerHTML = `
                <img
                    src="icons/defence.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

            icon.style.background = "white"; // slight blue tint
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }

        // --- Enemy Stunned ---
        if (effect.type === "enemyStunned") {
            const icon = document.createElement("span");

            icon.innerHTML = `
                <img
                    src="icons/sleep.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

            icon.style.background = "rgba(255, 255, 255, 0.95)"; // warm stun color
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }

        // --- Enemy Reflect ---
        if (effect.type === "reflect") {
            const icon = document.createElement("span");

            icon.innerHTML = `
                <img
                    src="icons/reflect.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

            icon.style.background = "white"; // warm stun color
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }

                // --- VEIL (Skill Debuff) ---
        if (effect.type === "veilSkillDebuff") {
            const icon = document.createElement("span");

            icon.innerHTML = `
                <img
                    src="icons/skill.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >SK↓`;

            icon.style.background = "white"; // soft purple
            icon.style.color = "black";
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }

        // --- Enemy Double Damage ---
        if (effect.type === "doubleDamage") {
            const icon = document.createElement("span");

            icon.innerHTML = `
                <img
                    src="icons/imp.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

            icon.style.background = "white"; // warm stun color
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }

        // --- Dragon Fire Orb ---
        if (effect.type === "fireOrbDebuff") {
            const icon = document.createElement("span");

            icon.innerHTML = `
                <img
                    src="icons/fireOrb.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >`;

            icon.style.background = "white"; // warm stun color
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }

        // --- Slap ---
        if (effect.type === "slap") {
            const icon = document.createElement("span");

            icon.innerHTML = `
                <img
                    src="icons/slap.svg"
                    style="
                        width:18px;
                        height:18px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                > SLAP!`;

            icon.style.background = "white";
            icon.style.color = "black";
            icon.style.borderRadius = "8px";
            icon.style.padding = "2px 6px";
            icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";

            bar.appendChild(icon);
        }
    });
}

export function renderPlayerEffects(playerCell, playerStats, onChaosExpired) {
    if (!playerCell) return;

    let bar = playerCell.querySelector(".player-effect-bar");

    if (!bar) {
        bar = document.createElement("div");
        bar.className = "player-effect-bar";
        Object.assign(bar.style, {
            display: "flex",
            justifyContent: "flex-start",
            gap: "6px",
            fontSize: "15px",
            marginTop: "6px"
        });
        playerCell.appendChild(bar);
    }

    bar.innerHTML = "";

    const effects = playerStats.effects || [];

    // ✅ NO EFFECTS → show header only
    if (effects.length === 0) {
        playerCell.innerHTML = "<h4 style='margin:0 0 2px 0'>Player Effects</h4>";
        return;
    }

    // ✅ EFFECTS EXIST → remove header if it exists
    const header = playerCell.querySelector("h4");
    if (header) header.remove();

    // Render effects
    effects.forEach(effect => {
        let icon = document.createElement("span");
        let valid = true;
        
        switch(effect.type) {
case "strengthBuff":
case "skillBuff":
    icon.innerHTML = effect.type === "strengthBuff"
        ? `
            <img
                src="icons/strength.svg"
                style="
                    width:16px;
                    height:16px;
                    vertical-align:middle;
                    margin-right:3px;
                    object-fit:contain;
                "
            >${effect.remaining}`
        : `
            <img
                src="icons/skill.svg"
                style="
                    width:16px;
                    height:16px;
                    vertical-align:middle;
                    margin-right:3px;
                    object-fit:contain;
                "
            >${effect.remaining}`;

    icon.style.background = "white";
    icon.style.boxShadow = "0 1px 3px rgba(0,0,0,0.5)";
    icon.style.maxHeight = "16px";
    break;

        case "skillBuffP":
            icon.innerHTML = `
                <img
                    src="icons/potion.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >
                <img
                    src="icons/skill.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

            icon.style.background = "white";
            icon.style.boxShadow = "0 1px 3px black";
            icon.style.maxHeight = "16px";
            break;

            case "skillDeBuff":
            icon.innerHTML = `
                <img
                    src="icons/potion.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >
                <img
                    src="icons/skill.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break;

            case "strengthBuffP": 
            case "strengthBuffO":
            icon.innerHTML = `
                <img
                    src="icons/potion.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >
                <img
                    src="icons/strength.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;
                
                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break; 

            case "invulnerable":
            icon.innerHTML = `
                <img
                    src="icons/potion.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >
                <img
                    src="icons/stamina.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;                
                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break;
                
            case "hazed":
            icon.innerHTML = `
                <img
                    src="icons/potion.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >
                <img
                    src="icons/haze.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;
                
                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break;
                
            case "halfDamage":
            icon.innerHTML = `
                <img
                    src="icons/potion.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >
                <img
                    src="icons/heartProtect.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:3px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;
                
                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break; 

            case "chaosSpell":
            icon.innerHTML = `
                <img
                    src="icons/orb.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break;

            case "healingBuff":
            icon.innerHTML = `
                <img
                    src="icons/stamina.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >${effect.remaining}`;

                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break;

            case "doubleAttack":
            icon.innerHTML = `
                <img
                    src="icons/strength.svg"
                    style="
                        width:16px;
                        height:16px;
                        vertical-align:middle;
                        margin-right:2px;
                        object-fit:contain;
                    "
                >`;

                icon.style.borderRadius = "50%";
                icon.style.background = "white";
                icon.style.boxShadow = "0 1px 3px black";
                icon.style.maxHeight = "16px";
                break;

            case "veilBuff":
            case "doubleSpeed":
            case "doubleSweepDamage":
            case "deathRattle":
            case "deathOrb":
            case "fireOrb":
            case "dazzler":
            case "whimsy":
            case "resurrect":
            case "worm":
            case "other":
{
    if (effect.image) {

        const wrapper = document.createElement("div");

const effectKey = effect.id || effect.name;

// Get previous charges
const prev = previousChargesMap.get(effectKey);

// Trigger flare if charge dropped
const charges = effect.item?.charges;
if (
    prev != null &&
    charges != null &&
    charges < prev
) {
    wrapper.classList.add("charge-flare");

    setTimeout(() => {
        wrapper.classList.remove("charge-flare");
    }, 350);
}

// Store latest value
if (charges != null) {
    previousChargesMap.set(effectKey, charges);
}

        Object.assign(wrapper.style, {
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transform: "translateY(-9px)",
            margin: "0"
        });

        const img = document.createElement("img");
        img.src = `images/${effect.image}`;
        img.alt = effect.name || "Effect";

        Object.assign(img.style, {
            width: "40px",
            height: "40px",
            display: "block",
            borderRadius: "6px",
            boxShadow: "0 1px 3px black",
            padding: "0px",
            marginTop: "0px"


        });

        wrapper.appendChild(img);

        // Add charges badge
if (charges && charges > 0) {
            const badge = document.createElement("div");
            badge.textContent = charges;

            Object.assign(badge.style, {
                position: "absolute",
                bottom: "-4px",
                right: "-4px",
                minWidth: "14px",
                height: "14px",
                padding: "0 2px",
                borderRadius: "8px",
                background: "#222",
                color: "#fff",
                fontSize: "10px",
                lineHeight: "14px",
                textAlign: "center",
                fontWeight: "bold",
                boxShadow: "0 0 4px rgba(0,0,0,0.6)"
            });

            wrapper.appendChild(badge);
        }

        icon.appendChild(wrapper);
    }

    break;
}

            default:
                valid = false;
        }

        if (!valid) return;

        icon.style.borderRadius = "8px";
        icon.style.display = "inline-flex";
        icon.style.alignItems = "center";
        icon.style.padding = "2px 6px";

        bar.appendChild(icon);
    });
}

/**
 * Render all active and queued enemies
 * @param {Array} enemyInstances - all enemy objects
 * @param {Array} enemySlots - array of enemy UI cells
 * @param {Function} buildEnemyButtons - function to create buttons for each enemy
 * @param {HTMLElement} queuedCell - optional container for queued enemies
 */
export function renderEnemies(enemyInstances, enemySlots, buildEnemyButtons, queuedCell) {

    // Render active enemies
    enemySlots.forEach((cell, i) => {
        const enemy = enemyInstances[i];

        renderEnemyCell(cell, enemy, i, buildEnemyButtons);

        if (enemy) {
            renderEnemyEffects(cell, enemy);
        }
    });

    // Render queued enemies
    if (queuedCell) {
        renderQueuedEnemies(
            enemyInstances.slice(enemySlots.length),
            queuedCell
        );
    }
}

/**
 * Show hit/resist messages on an enemy cell
 * @param {HTMLElement} enemyCell - the DOM cell for this enemy
 * @param {Object} enemy - the enemy object
 * @param {Object} result - result object from attack
 * @param {boolean} ignoreResistance - skip resist messages (for sweeping blow)
 */
export function renderEnemyHitResult(enemyCell, enemy, result, ignoreResistance = false) {
    if (!result.hit) return;

    // Skip resistance messages for sweeping blows
    if (ignoreResistance) return;

    // Default to no message if full hit
    if (result.damage === result.attack) return;

    let text = "";
    let resultType = "miss";

    if (result.damage > 0) {
        text = `Resists Attack`;
        resultType = "resist";
    } else {
        text = `No Effect`;
        resultType = "noeffect";
    }

    showCombatMessage(enemyCell, {
        type: "player",
        result: resultType,
        text,
        top: "35%"
    });
}

/**
 * Render the result of a player attack on an enemy cell (melee only)
 * @param {HTMLElement} enemyCell - the DOM cell for the enemy
 * @param {Object} result - the attack result object
 */
export function renderPlayerHitResult(enemyCell, result, playerStats) {
    const text = result.hit ? "You Hit" : "You Missed";

    const weapon = playerStats?.inventory?.wornItems?.weapon;

    const weaponImage = weapon?.image
        ? `images/${weapon.image}`
        : null;

    showCombatMessage(enemyCell, {
        type: "player",
        result: result.hit ? "hit" : "miss",
        text,
        top: "35%",
        icon: weaponImage
    });
}

/**
 * Render the player stats in the given cell
 * @param {HTMLElement} playerCell - DOM cell for player stats
 * @param {Object} playerStats - player stats object
 */
export function renderPlayer(playerCell, playerStats, playerEffectsCell) {
    playerCell.innerHTML = "<h4 style='margin:0 0 5px 0'>Player Stats</h4>";

    ["SKILL", "STAMINA", "MAGIC", "LUCK", "ATTACK"].forEach(stat => {
        const s = playerStats.stats[stat];
        const p = document.createElement("p");
        p.style.margin = "2px 0";
        p.style.fontSize = "14px";
        p.textContent = typeof s === "object"
            ? `${stat}: ${s.current}/${s.max}`
            : `${stat ?? 0}`;
        playerCell.appendChild(p);
    });

    // ✅ Move effects to their own cell
    handleWornItemEffects(playerStats, null);
    renderPlayerEffects(playerEffectsCell, playerStats);

    // -------------------------
    // Companion rendering (multi)
    // -------------------------
    const activeCompanions = getActiveCompanions(playerStats);

    if (activeCompanions.length > 0) {
        const container = document.createElement("div");
        container.style.marginTop = "8px";
        container.style.paddingTop = "6px";
        container.style.display = "flex";
        container.style.gap = "10px";
        container.style.alignItems = "center";

        activeCompanions.forEach(companion => {
            const state = playerStats._companionState?.[companion.id];

            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";
            wrapper.style.alignItems = "center";
            wrapper.style.fontSize = "12px";

            // -------------------------
            // HIT FLARE (ONLY ON NEW HIT)
            // -------------------------
            if (!state) {} else if (state.hitThisRound) {
                wrapper.classList.add("companion-flare");

                setTimeout(() => {
                    wrapper.classList.remove("companion-flare");
                }, 350);

                // IMPORTANT: consume event so it doesn't repeat
                state.hitThisRound = false;
            }

            // -------------------------
            // IMAGE WRAPPER (for badge positioning)
            // -------------------------
            const imgWrapper = document.createElement("div");
            imgWrapper.style.position = "relative";
            imgWrapper.style.display = "inline-block";

            const img = document.createElement("img");
            img.src = companion.image;
            img.style.width = "40px";
            img.style.display = "block";
            img.style.margin = "2px 0";

            imgWrapper.appendChild(img);

            // -------------------------
            // HIT BADGE
            // -------------------------
            const hits = playerStats._companionState?.[companion.id]?.hitsTaken || 0;

            if (hits > 0) {
                const badge = document.createElement("div");
                badge.textContent = companion.maxHits - hits;

                Object.assign(badge.style, {
                    position: "absolute",
                    bottom: "-4px",
                    right: "-4px",
                    minWidth: "18px",
                    height: "18px",
                    padding: "2px 0px",
                    borderRadius: "8px",
                    background: "#7c7c7c",
                    color: "#f1f1f1",
                    fontSize: "14px",
                    lineHeight: "14px",
                    textAlign: "center",
                    fontWeight: "bold",
                    boxShadow: "0 0 10px rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                });

                // Optional danger colouring
                if (hits >= companion.maxHits) {
                    badge.style.background = "#000000";
                    badge.style.boxShadow = "0 0 30px rgb(255, 255, 255)";
                } else if (hits >= companion.maxHits - 1) {
                    badge.style.background = "#303030";
                    badge.style.boxShadow = "0 0 30px rgb(224, 223, 223)";
                } else if (hits >= companion.maxHits - 2) {
                    badge.style.background = "#585858";
                    badge.style.boxShadow = "0 0 30px rgb(212, 212, 212)";
                }

                imgWrapper.appendChild(badge);
            }

            // -------------------------
            // LABEL
            // -------------------------
            const label = document.createElement("p");
            label.style.margin = "0";
            label.style.fontSize = "12px";
            label.style.fontWeight = "bold";
            label.textContent = companion.name;

            // -------------------------
            // BUILD
            // -------------------------
            wrapper.appendChild(imgWrapper);
            wrapper.appendChild(label);

            container.appendChild(wrapper);
        });

        playerCell.appendChild(container);
    }
}

/**
 * Render a dice output area for an attack roll.
 * @param {HTMLElement} diceCell - the container to render dice in
 * @param {Object} attackRoll - the attack roll object { allRolls, total }
 * @returns {HTMLElement} - the created or updated dice div
 */
export function renderDiceOutput(diceCell, attackRoll) {
    let diceDiv = diceCell.querySelector(".dice-output");

    if (!diceDiv) {
        diceDiv = document.createElement("div");
        diceDiv.className = "dice-output";
        diceCell.appendChild(diceDiv);
    }

    // Always enforce styling
    Object.assign(diceDiv.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: "2px",
        backgroundColor: "transparent",
        borderRadius: "12px",
        padding: "10px 15px",
        height: "63px",       // fixed height
        overflow: "hidden"     // optional: prevent content from overflowing
    });

    // Clear previous output
    diceDiv.innerHTML = "";

    // Render dice only if attackRoll has rolls
    if (attackRoll?.allRolls?.length) {
        renderPlayerDice(diceDiv, attackRoll, null, true);
    }

    return diceDiv;
}