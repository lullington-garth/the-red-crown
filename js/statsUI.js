// statsUI.js
import { rollSingleStat } from './statRoller.js';
import { confirmModal } from './itemModals.js';
import { createDiceImage, animateDice } from './diceUI.js';
import { createWizardCard } from "./wizardCard.js";

export function showPreGameStats(container, playerStats, onComplete) {
    container.innerHTML = "";

    // Track which stats have been rerolled
    if (!playerStats.rerolledStats) playerStats.rerolledStats = {};

    const wrapper = document.createElement('div');
    wrapper.style.marginTop = "0px";

    // ---------- Header ----------
    const header = document.createElement('h2');
    header.textContent = `Roll Your Starting Stats`;
    header.style.textAlign = "center";
    header.style.marginBottom = "5px";
    header.style.marginTop = "5px";
    wrapper.appendChild(header);
  
// ---------- Character Grid ----------

const grid = document.createElement("div");

grid.style.display = "grid";
grid.style.gridTemplateColumns = "1fr 1fr";
grid.style.gridTemplateRows = "auto auto auto";
grid.style.gap = "10px";
grid.style.marginTop = "10px";
grid.style.marginBottom = "10px";

wrapper.appendChild(grid);

function createCell() {

    const cell = document.createElement("div");

    cell.style.border = "1px solid #777";
    cell.style.borderRadius = "8px";
    cell.style.padding = "15px";
    cell.style.boxSizing = "border-box";

    // Keep buttons anchored at the bottom
    cell.style.display = "flex";
    cell.style.flexDirection = "column";

    return cell;
}

const cell11 = createCell();
const cell12 = createCell();
const cell21 = createCell();
const cell22 = createCell();
const cell31 = createCell();
const cell32 = createCell();

grid.append(
    cell11,
    cell12,
    cell21,
    cell22,
    cell31,
    cell32
);

// Wizard
// Wizard Image
const img = document.createElement("img");
img.src = `images/${playerStats.name.toLowerCase()}Wizard.jpg`;
img.alt = playerStats.wizardName;
img.style.width = "100%";
img.style.maxWidth = "265px";
img.style.display = "block";
img.style.margin = "0 auto 10px";
img.style.mixBlendMode = "multiply";

cell11.appendChild(img);

// Colour
const bonusStat = Object.keys(playerStats.bonus)[0];
const bonusValue = playerStats.bonus[bonusStat];
const colour = document.createElement("p");
colour.textContent = `${playerStats.wizardName} - ${bonusStat} +${bonusValue}`;
colour.style.fontSize = "16px";
colour.style.marginBottom = "5px";
colour.style.marginTop = "10px";
colour.style.textAlign = "center";

cell11.appendChild(colour);

function buildStatCell(parent, stat, description) {

    const statObj = playerStats.stats[stat];

    const title = document.createElement("h3");
    title.textContent = stat;
    title.style.marginTop = "0px";
    title.style.marginBottom = "0px";    

    const desc = document.createElement("p");
    desc.textContent = description;
    desc.style.fontSize = "14px";
    desc.style.marginTop = "4px";
    desc.style.marginBottom = "4px";

    parent.appendChild(title);
    parent.appendChild(desc);

    const current = document.createElement("div");
    const max = document.createElement("div");
    const min = document.createElement("div");

    current.textContent = `Current : ${statObj.current}`;
    max.textContent = `Maximum : ${statObj.max}`;
    min.textContent = `Minimum : ${statObj.min ?? 0}`;
    current.style.marginTop = "10px"

    parent.appendChild(current);
    parent.appendChild(max);
    parent.appendChild(min);

const actionCell = document.createElement("div");

actionCell.style.marginTop = "auto";
actionCell.style.paddingTop = "12px";
actionCell.style.display = "flex";
actionCell.style.justifyContent = "space-between";
actionCell.style.alignItems = "center";
actionCell.style.width = "100%";

parent.appendChild(actionCell);


// Left side - dice and modifiers
const diceArea = document.createElement("div");

diceArea.style.display = "flex";
diceArea.style.alignItems = "center";
diceArea.style.gap = "10px";

actionCell.appendChild(diceArea);


// Right side - buttons
const buttonArea = document.createElement("div");

buttonArea.style.display = "flex";
buttonArea.style.alignItems = "center";

actionCell.appendChild(buttonArea);

const btn = document.createElement("button");

btn.textContent =
    (stat === "STAMINA") ? "Roll 2d6" : "Roll 1d6";

btn.style.backgroundColor = "#424141";
btn.style.color = "#d7d4d4";
btn.style.border = "1px solid #555";
btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
btn.style.padding = "10px 16px";
btn.style.fontSize = "16px";
btn.style.cursor = "pointer";
btn.style.borderRadius = "6px";
btn.style.marginTop = "5px";
btn.style.alignSelf = "center";
btn.style.width = "100px";

buttonArea.appendChild(btn);

return {
    current,
    max,
    min,
    actionCell,
    diceArea,
    buttonArea,
    btn
};
}

const skillUI = buildStatCell(
    cell12,
    "SKILL",
    "Determines your prowess in combat and physical challenges. Roll 1d6 + 6"
);

const staminaUI = buildStatCell(
    cell21,
    "STAMINA",
    "Measures your health, endurance and inner strength. Roll 2d6 + 12"
);

const magicUI = buildStatCell(
    cell22,
    "MAGIC",
    "Represents how much magic you can cast. Reduces with each spell. Roll 1d6 + 12"
);

const luckUI = buildStatCell(
    cell31,
    "LUCK",
    "Used to test your fortune. Reduces by 1 on each use. Roll 1d6 + 6"
);

skillUI.btn.addEventListener("click", () => {
    rollAndDisplay("SKILL", skillUI);
});

staminaUI.btn.addEventListener("click", () => {
    rollAndDisplay("STAMINA", staminaUI);
});

magicUI.btn.addEventListener("click", () => {
    rollAndDisplay("MAGIC", magicUI);
});

luckUI.btn.addEventListener("click", () => {
    rollAndDisplay("LUCK", luckUI);
});

const attackTitle = document.createElement("h3");
attackTitle.textContent = "ATTACK";
attackTitle.style.marginTop = "0";
attackTitle.style.marginBottom = "0";

const attackText = document.createElement("p");
attackText.style.marginTop = "5px";
attackText.style.fontSize = "14px";
attackText.textContent =
    "Represents your physical hitting power. Does not effect spell power.";

const attackCurrent = document.createElement("div");
const attackMax = document.createElement("div");
const attackMin = document.createElement("div");

// Assuming Attack has already been calculated in playerStats
const attackValue = playerStats.stats.attack ?? 0;

const attackStat = playerStats.stats.ATTACK;

attackCurrent.textContent = `Current : ${attackStat.current}`;
attackMax.textContent = `Maximum : ${attackStat.max}`;
attackMin.textContent = `Minimum : ${attackStat.min}`;

cell32.appendChild(attackTitle);
cell32.appendChild(attackText);
cell32.appendChild(attackCurrent);
cell32.appendChild(attackMax);
cell32.appendChild(attackMin);

    container.appendChild(wrapper);

// ---------- Completion Check ----------
function checkAllRolled() {
    const allRolled = Object.values(playerStats.stats).every(v => v.max > 0);
    if (!allRolled) return;

    // Avoid creating multiple buttons
    if (wrapper.querySelector('button.select-spellbook')) return;

    const nextBtn = document.createElement('button');
        nextBtn.textContent = "Select a Spell Book"; // updated text
        nextBtn.classList.add('select-spellbook'); // mark button
        nextBtn.style.display = "block";
        nextBtn.style.marginTop = "auto";
        nextBtn.style.backgroundColor = "#424141";
        nextBtn.style.color = "#d7d4d4";
        nextBtn.style.border = "1px solid #555";
        nextBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        nextBtn.style.padding = "10px 16px";
        nextBtn.style.fontSize = "16px";
        nextBtn.style.cursor = "pointer";
        nextBtn.style.borderRadius = "6px";  
        nextBtn.style.display = "block";
        nextBtn.style.marginLeft = "auto";  

    nextBtn.addEventListener('click', () => {
        if (onComplete) onComplete(playerStats); // just call the callback
    });
    setTimeout(() => {
    wrapper.appendChild(nextBtn);
    }, 1200);    
}

    // ---------- Roll & Display Helper ----------
function rollAndDisplay(stat, ui) {
        const result = rollSingleStat(playerStats, stat);

    setTimeout(() => {
        ui.current.textContent = `Current : ${result.total}`;
        ui.max.textContent = `Maximum : ${result.total}`;
        ui.min.textContent = `Minimum : ${playerStats.stats[stat].min ?? 0}`;
    }, 1200);

ui.diceArea.innerHTML = "";
ui.buttonArea.innerHTML = "";

        // 🎲 Dice Display
const diceContainer = document.createElement('div');

diceContainer.style.height = "45px";
diceContainer.style.display = "flex";
diceContainer.style.alignItems = "center";
diceContainer.style.justifyContent = "center";

        // 1. Create dice initially showing "1"
        const images = [];

        result.diceValues.forEach(() => {

            const die = createDiceImage("white", 1);

            images.push(die);
            diceContainer.appendChild(die);

        });

ui.diceArea.appendChild(diceContainer);

        // 2. Run animation, then settle on final values
        animateDice(
            images,
            result.diceValues.map(() => "white"),
            result.diceValues
        );

        // Modifier breakdown
        const modifierText = document.createElement('span');
        modifierText.style.marginLeft = "0px";

        let modifierString = `+ ${result.baseModifier}`;
        if (result.wizardBonus) modifierString += ` + ${result.wizardBonus}`;
        modifierText.textContent = `(${modifierString})`;
ui.diceArea.appendChild(modifierText);

        // ---------- Reroll Button ----------
        if (!playerStats.rerolledStats[stat]) {
            const rerollBtn = document.createElement('button');
            rerollBtn.textContent = "Reroll?";
            rerollBtn.style.marginTop = "5px";
            rerollBtn.style.alignSelf = "center";
            rerollBtn.style.backgroundColor = "#424141";
            rerollBtn.style.color = "#d7d4d4";
            rerollBtn.style.border = "1px solid #555";
            rerollBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            rerollBtn.style.padding = "10px 16px";
            rerollBtn.style.fontSize = "16px";
            rerollBtn.style.cursor = "pointer";
            rerollBtn.style.borderRadius = "6px";
            rerollBtn.style.width = "100px";

            rerollBtn.addEventListener('click', () => {
                confirmModal(
                    {
                        item: `You rolled a ${result.diceValues.join(" + ")}, giving you a ${stat} of ${result.total}`,
                        image: "dice.jpg"
                    },
                    `Are you sure you want to reroll ${stat}? You can only do this once, and the new roll will be final.`,
                    () => {
                        playerStats.rerolledStats[stat] = true;
                        rollAndDisplay(stat, ui);
                    }
                );
            });

ui.buttonArea.appendChild(rerollBtn);
        }

        checkAllRolled();
    }
}

export function showStats(container, playerStats) {
    container.innerHTML = "";

    const wrapper = document.createElement('div');
    wrapper.style.marginTop = "0px";

    // ---------- Header ----------
    const header = document.createElement('h2');
    header.textContent = `${playerStats.wizardName}`;
    header.style.marginTop = "5px"
    wrapper.appendChild(header);
  
// ---------- Stats Table ----------

const table = document.createElement("table");
table.style.width = "100%";
table.style.borderCollapse = "collapse";
table.style.marginTop = "5px";

// Header
const headerRow = document.createElement("tr");

["Stat", "Current", "Max", "Min", ""].forEach((text, index) => {

    const th = document.createElement("th");

    th.textContent = text;
    th.style.borderBottom = "2px solid #888";
    th.style.padding = "6px";

    // Centre the numeric headings
    th.style.textAlign = (index >= 1 && index <= 3) ? "center" : "left";

    headerRow.appendChild(th);

});

table.appendChild(headerRow);

// Stat rows
Object.keys(playerStats.stats).forEach(stat => {

    const statObj = playerStats.stats[stat];

    const row = document.createElement("tr");

    row.style.height = "40px";

    // Stat name
    const statCell = document.createElement("td");
    statCell.textContent = stat;
    statCell.style.padding = "6px";

    // Current
    const currentCell = document.createElement("td");
    currentCell.textContent = statObj.current;
    currentCell.style.padding = "6px";
    currentCell.style.textAlign = "center";

    // Max
    const maxCell = document.createElement("td");
    maxCell.textContent = statObj.max;
    maxCell.style.padding = "6px";
    maxCell.style.textAlign = "center";

    // Min
    const minCell = document.createElement("td");
    minCell.textContent = statObj.min ?? 0;
    minCell.style.padding = "6px";
    minCell.style.textAlign = "center";

    // Buttons
    const actionCell = document.createElement("td");
    actionCell.style.padding = "6px";

    row.appendChild(statCell);
    row.appendChild(currentCell);
    row.appendChild(maxCell);
    row.appendChild(minCell);
    row.appendChild(actionCell);

    if (statObj.max === 0) {

        const btn = document.createElement("button");

        btn.textContent =
            (stat === "STAMINA") ? "Roll 2d6" : "Roll 1d6";
        btn.style.marginTop = "auto";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.padding = "10px 16px";
        btn.style.fontSize = "16px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";            

        btn.addEventListener("click", () => {

            rollAndDisplay(
                stat,
                row,
                currentCell,
                maxCell,
                minCell,
                actionCell
            );

        });

        actionCell.appendChild(btn);
    }

    table.appendChild(row);

});

wrapper.appendChild(table);

  
    // ---------- Gold ----------
    const goldRow = document.createElement('p');
    goldRow.style.fontWeight = "bold";
    goldRow.style.marginTop = "10px";
    goldRow.textContent = `Gold: ${playerStats.gold ?? 0} GP`;
    wrapper.appendChild(goldRow);

    container.appendChild(wrapper);

}