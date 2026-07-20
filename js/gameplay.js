// gameplay.js
import { createGameplayButtons } from "./gameplayButtons.js";
import { MapEngine } from './mapEngine.js';
import { MapUI } from './mapUI.js';
import { handleShrine } from "./shrine.js";
import { handleCurio } from "./curio.js";
import { openShop } from "./shop.js";
import { showStats } from "./statsUI.js";
import { showInventoryUI } from "./inventoryUI.js";
import { showModalCloseButton } from "./modal.js";
import { openMixPotionModal } from "./potionModals.js";
import { startGroupCombat } from "./groupCombat.js";
import { createWizardCard } from "./wizardCard.js";
import { createHorseCard } from "./horseCard.js";
import { showBookPreview } from "./spellsUI.js";
import { openSpellModal } from "./spellsModal.js";
import { getEquippedBook } from "./spells.js";

export function startGameplay(
    gameDiv,
    playerStats,
    enemies,
    items,
    enchantments,
    startNewGame,
    nodeIndex
) {

    playerStats.comeOnSam = false
    playerStats.fairyShower = false
    playerStats.visitingBrother = "Blue"
    playerStats.visitingBrotherName = "Lo Tae Zhao"
    playerStats.visitingBrotherEthos = "STAMINA"
    playerStats.absentBrotherEthos = "LUCK"
    playerStats.absentBrotherName = "Carolinus"
    playerStats.absentBrotherColor = "Green"
    playerStats.foundUndergroundArea = false
    playerStats.paidForBed = false
    playerStats.ogreComing = false
    playerStats.foundOverseerTruth = false
    playerStats.sirOrrin = false
    playerStats.numberOfMisses = 0
    playerStats.foundTreeSentinelHalfTruth = false
    playerStats.foundTreeSentinelTruth = false
    playerStats.foundATruth = false
    playerStats.acornAttribute = null
    playerStats.acornStrong = false
    playerStats.acornMagic = false
    playerStats.acornLogic = false
    playerStats.acornUntouched = true
    playerStats.wonTavernDiceGame = false
    playerStats.playedMinty = false
    playerStats.hasCorrectBrotherToken = false
    playerStats.hasIncorrectBrotherToken = false
    playerStats.hasNoBrotherToken = true
    playerStats.sacrifiedItemName = null
    playerStats.connectionModifier = 0
    playerStats.horseName = null
    playerStats.trueFocus = false
    playerStats.passingStones = "that by some stroke of luck, you have stumbled upon the Passing Stones."

    // ---- Map state ----
    // ---- Engine (must exist before callbacks use it) ----
    const engine = new MapEngine({
        nodeIndex,
        nodesBasePath: "./nodes",
        ui: null,
        playerStats,
        startNewGame,
        startGroupCombat,
        enemies,
        items,
        enchantments
    });

    // ---- UI ----
    const ui = new MapUI(gameDiv, {
        renderButtons: () =>
            createGameplayButtons({
                playerStats,
                items,
                enemies,
                returnToMap,
                openInventory,
                openStats,
                handleShrine,
                handleCurio,
                openMixPotionModal,
                startGroupCombat,
                openShop
            }),
        playerStats,
        enemies,
        enchantments,
        startNewGame
    });

    // inject UI into engine AFTER creation
    engine.ui = ui;

    // track current node

    engine.start(940);

function returnToMap() {
    engine.goToNode(engine.state.currentNode);
}
    // ======================================================
    // INVENTORY
    // ======================================================
    function openInventory() {
        gameDiv.innerHTML = "";

        const topBar = document.createElement('div');
        const inventoryContainer = document.createElement('div');

        gameDiv.appendChild(topBar);
        gameDiv.appendChild(inventoryContainer);

        function renderInventoryTopBar() {
            topBar.innerHTML = "";

            topBar.style.display = "flex";
            topBar.style.alignItems = "center";
            topBar.style.justifyContent = "space-between";
            topBar.style.marginBottom = "10px";

            const returnBtn = document.createElement('button');
            returnBtn.style.fontSize = "22px";
            returnBtn.style.backgroundColor = "#424141";
            returnBtn.style.color = "#d7d4d4";
            returnBtn.style.border = "1px solid #555";
            returnBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            returnBtn.style.paddingLeft = "5px";
            returnBtn.style.paddingRight = "5px";
            returnBtn.style.border = "none";
            returnBtn.style.borderRadius = "8px";
            returnBtn.style.marginLeft = "10px";
            returnBtn.style.width = "30px";
            returnBtn.textContent = "⇦";

            // return to map (NOT renderGame anymore)
            returnBtn.addEventListener('click', returnToMap);

            const statsLine = document.createElement('div');
            statsLine.style.display = "flex";
            statsLine.style.gap = "18px";
            statsLine.style.fontSize = "16px";
            statsLine.style.marginRight = "15px";
            statsLine.style.whiteSpace = "nowrap";

            ["SKILL", "STAMINA", "MAGIC", "LUCK", "ATTACK"].forEach(stat => {
                const s = playerStats.stats[stat];

                const el = document.createElement("span");

                const label = document.createElement("strong");
                label.style.fontSize = "15px";
                label.textContent = `${stat}: `;

                const value = document.createElement("span");
                value.style.fontSize = "16px";
                value.textContent = `${s.current}/${s.max}`;

                el.appendChild(label);
                el.appendChild(value);

                statsLine.appendChild(el);
            });

            topBar.appendChild(returnBtn);
            topBar.appendChild(statsLine);
        }

        renderInventoryTopBar();

        showInventoryUI(inventoryContainer, playerStats, () => {
            renderInventoryTopBar();
        });
    }

    // ======================================================
    // STATS
    // ======================================================
function openStats() {
    gameDiv.innerHTML = "";

    // ==========================
    // Top bar
    // ==========================
    const topBar = document.createElement("div");

    topBar.style.display = "flex";
    topBar.style.alignItems = "center";
    topBar.style.marginBottom = "12px";
    topBar.style.position = "relative";


    // Return button
    const returnBtn = document.createElement("button");

    returnBtn.style.fontSize = "22px";
    returnBtn.style.backgroundColor = "#424141";
    returnBtn.style.color = "#d7d4d4";
    returnBtn.style.border = "1px solid #555";
    returnBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    returnBtn.style.paddingLeft = "5px";
    returnBtn.style.paddingRight = "5px";
    returnBtn.style.border = "none";
    returnBtn.style.borderRadius = "8px";
    returnBtn.style.marginLeft = "10px";
    returnBtn.style.width = "50px";
    returnBtn.textContent = "⇦";

    returnBtn.addEventListener("click", returnToMap);


    // Title
    const title = document.createElement("h2");

    title.textContent = "Stat Sheet";
    title.style.margin = "0";
    title.style.position = "absolute";
    title.style.left = "50%";
    title.style.transform = "translateX(-50%)";
//    title.style.fontFamily = '"Book Antiqua", Palatino, serif';


    // Add to top bar
    topBar.appendChild(returnBtn);
    topBar.appendChild(title);

    gameDiv.appendChild(topBar);

    // ==========================
    // 2 x 2 Grid
    // ==========================
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "1fr 1fr";
    grid.style.gridTemplateRows = "auto auto";
    grid.style.gap = "20px";
    grid.style.alignItems = "stretch";

    gameDiv.appendChild(grid);

    function styleCell(cell) {
        cell.style.border = "1px solid #878787";
        cell.style.borderRadius = "8px";
//        cell.style.backgroundColor = "#f9f9f9";
        cell.style.padding = "12px";
        cell.style.boxSizing = "border-box";
        cell.style.display = "flex";
        cell.style.flexDirection = "column";
    }    

    // Cell 1:1
    const cell11 = document.createElement("div");
    styleCell(cell11);
    cell11.appendChild(createWizardCard(playerStats));
    // Cell 1:2 (current stats)
    const cell12 = document.createElement("div");
    styleCell(cell12);
    cell12.id = "playerStatsContainer";

    // Cell 2:1
    const cell21 = document.createElement("div");
    styleCell(cell21);
        if (playerStats.horse) {
            cell21.appendChild(
                createHorseCard(playerStats.horse)
            );
        }

// Cell 2:2
const cell22 = document.createElement("div");
styleCell(cell22);

const equippedBook = getEquippedBook();

if (equippedBook) {

    // ----- Book header -----
    const bookHeader = document.createElement("div");
    bookHeader.style.display = "flex";
    bookHeader.style.alignItems = "center";
    bookHeader.style.gap = "10px";
    bookHeader.style.marginBottom = "12px";

    const img = document.createElement("img");
    img.src = `images/${equippedBook.item.image}`;
    img.alt = equippedBook.item.item;
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.objectFit = "contain";
    img.style.mixBlendMode = "multiply";

    const title = document.createElement("h3");
    title.textContent = equippedBook.item.item;
    title.style.margin = "0";
    title.style.fontFamily = '"Book Antiqua", Palatino, serif';

    bookHeader.appendChild(img);
    bookHeader.appendChild(title);

    cell22.appendChild(bookHeader);

    // ----- Spell preview -----
    const spellsContainer = document.createElement("div");

    showBookPreview(
        spellsContainer,
        equippedBook,
        playerStats.wizardColor,
        (spell) => openSpellModal(spell, playerStats.wizardColor)
    );

    cell22.appendChild(spellsContainer);
}



    grid.appendChild(cell11);
    grid.appendChild(cell12);
    grid.appendChild(cell21);
    grid.appendChild(cell22);
  
    showStats(cell12, playerStats);
}
}