// potionModals.js

import { getEnhancersForBase, createMixedPotion, getAvailablePotionItems, getAvailableBases } from "./mixPotion.js";
import { getGold, removeGold } from './gold.js';
import { showItemOverlay } from "./itemOverlay.js";
import { setModalContent, openModal, closeModal, setModalWidth } from "./modal.js";
import { openCombatSelectionModal } from "./combatSelectionModal.js";
import { tryAddItems } from "./calculateCapacity.js";

export function openPotionModal(playerStats, onUse) {
    openCombatSelectionModal({
        playerStats,
        title: "Select a Potion",
        emptyMessage: "No potions available.",
        filterFn: item => item && item.type === "potion" && item.status !== "broken",
        buttonClass: "use-potion-btn",
        onUse
    });
}

export function openMixPotionModal(playerStats, items, onComplete, { mode = "event" } = {}) {

  let selectedBase = null;
  let selectedEnhancer = null;
  const isEventMode = mode === "event";
  
  let availableBaseIds = isEventMode
  ? ["0172", "0167", "0163"]
  : getAvailableBases(playerStats, items);

  const recipeItems = items;
  const usableItems = getAvailablePotionItems(playerStats, items, mode);

//if (!isEventMode && availableBaseIds.length === 1) {
 // selectedBase = recipeItems.find(i => i.id === availableBaseIds[0]);
//}

  const BREW_COST = 3;

  // -----------------------------
  // ROOT CONTAINER
  // -----------------------------
  const container = document.createElement("div");

  // -----------------------------
  // GOLD DISPLAY (TOP LEFT)
  // -----------------------------
  const goldDisplay = document.createElement("div");
  goldDisplay.style.textAlign = "left";
  goldDisplay.style.marginBottom = "8px";
  goldDisplay.style.fontWeight = "bold";
  goldDisplay.style.fontSize = "18px";
  goldDisplay.innerHTML = `
      You have ${getGold(playerStats)}
      <img
          src="images/gold.jpg"
          style="
              width:25px;
              vertical-align:middle;
              margin-left:4px;
              mix-blend-mode:multiply;
          "
      />
  `;

  function refreshGoldDisplay() {
      goldDisplay.innerHTML = `
          You have ${getGold(playerStats)}
          <img
              src="images/gold.jpg"
              style="
                  width:25px;
                  vertical-align:middle;
                  margin-left:4px;
                  mix-blend-mode:multiply;
              "
          />
      `;
  }

  // -----------------------------
  // HEADER (CENTER)
  // -----------------------------
  const header = document.createElement("div");
  header.style.textAlign = "center";
  header.style.marginBottom = "10px";

  header.innerHTML = `
    <img src="images/basePotion.jpg" style="width:100px; mix-blend-mode:multiply;" />
    <div style="
        font-size:1.5em;
        font-weight:bold;
        margin:0;
    ">
        Brew Potion
    </div>
  `;

  // -----------------------------
  // MAIN LAYOUT (2 COLUMNS)
  // -----------------------------
  const layout = document.createElement("div");
  layout.style.display = "flex";
  layout.style.gap = "20px";
  layout.style.minHeight = "220px";

  const col1 = document.createElement("div");
  const col2 = document.createElement("div");

  col1.style.flex = "1";
  col2.style.flex = "1";

  layout.appendChild(col1);
  layout.appendChild(col2);

  // -----------------------------
  // FOOTER (EXIT BUTTON)
  // -----------------------------
  const footer = document.createElement("div");
  footer.style.marginTop = "15px";
  footer.style.textAlign = "center";

const exitBtn = document.createElement("button");
exitBtn.textContent = "Finished Brewing";

exitBtn.style.backgroundColor = "#424141";
exitBtn.style.color = "#d7d4d4";
exitBtn.style.border = "1px solid #555";
exitBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
exitBtn.style.padding = "10px 16px";
exitBtn.style.borderRadius = "8px";
exitBtn.style.cursor = "pointer";

exitBtn.addEventListener("click", () => {
  showItemOverlay(
    {
      item: "Brewing Complete",
      image: "basePotion.jpg"
    },
    `You step away from the brewing table.`,
    () => closeModal()
  );
});

footer.appendChild(exitBtn);


// -----------------------------
// BREW BUTTON (NON-EVENT MODE ONLY)
// -----------------------------
if (!isEventMode) {
  const brewBtn = document.createElement("button");
  brewBtn.textContent = "Brew";

  brewBtn.style.backgroundColor = "#424141";
  brewBtn.style.color = "#d7d4d4";
  brewBtn.style.border = "1px solid #555";
  brewBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
  brewBtn.style.padding = "10px 16px";
  brewBtn.style.borderRadius = "8px";
  brewBtn.style.cursor = "pointer";
  brewBtn.style.marginLeft = "10px";

  brewBtn.addEventListener("click", () => {
    const result = createMixedPotion(selectedBase, selectedEnhancer, items);
    if (!result) return;

    const inv = playerStats.inventory;

    // remove base
    let idx = inv.carriedItems.findIndex(i => i.id === selectedBase.id);
    if (idx !== -1) inv.carriedItems.splice(idx, 1);

    // remove enhancer
    idx = inv.carriedItems.findIndex(i => i.id === selectedEnhancer.id);
    if (idx !== -1) inv.carriedItems.splice(idx, 1);

  tryAddItems(playerStats, [result], () => {

    showItemOverlay(
      {
        ...result,
        image: result.image
      },
      `
      <strong>Brewed Potion</strong><br><br>
      You have created <strong>${result.item}</strong><br><br>
      ${result["id-description"] || ""}
      `,
      () => {
        if (onComplete) onComplete(result);
      }
    );

    selectedBase = null;
    selectedEnhancer = null;

    closeModal();

  });
//    renderEnhancers();
  });

  footer.appendChild(brewBtn);
}

  // -----------------------------
  // ASSEMBLE IN CORRECT ORDER
  // -----------------------------
  if (isEventMode) {
  container.appendChild(goldDisplay);
}
  container.appendChild(header);
  container.appendChild(layout);
  container.appendChild(footer);

    if (!isEventMode && availableBaseIds.length === 1) {
  selectedBase = recipeItems.find(i => i.id === availableBaseIds[0]);

  const enhancerIds = getEnhancersForBase(selectedBase.id);

  if (enhancerIds.length === 1) {
    selectedEnhancer = recipeItems.find(i => i.id === enhancerIds[0]);
  }

  renderEnhancers();
  }

    // ----------------------------------------
    // COLUMN 1 - BASE POTIONS
    // ----------------------------------------
  function renderBasePotions() {

      col1.innerHTML = `
      <div style="
          font-size:1.17em;
          font-weight:bold;
          margin-bottom:8px;
      ">
          Select Base Potion
      </div>`;

      availableBaseIds.forEach(id => {

          const item = recipeItems.find(i => i.id === id);
          if (!item) return;

          const row = createPotionRow(
              item,
              () => {
                  selectedBase = item;
                  selectedEnhancer = null;

                  renderBasePotions();
                  renderEnhancers();
              },
              selectedBase?.id === item.id
          );

          col1.appendChild(row);
      });
  }

  renderBasePotions();

  // ----------------------------------------
  // COLUMN 2 - ENHANCERS
  // ----------------------------------------
  function renderEnhancers() {
  col2.innerHTML = `
  <div style="
      font-size:1.17em;
      font-weight:bold;
      margin-bottom:8px;
  ">
      Select a potion enhancer
  </div>`;

    if (!selectedBase) return;

let enhancerIds = getEnhancersForBase(selectedBase.id);

if (!isEventMode) {
  const inv = playerStats.inventory;

  const inventoryIds = [
    ...(inv.carriedItems || []),
    ...(Object.values(inv.wornItems || {}).filter(Boolean))
  ].map(i => i.id);

  enhancerIds = enhancerIds.filter(id => inventoryIds.includes(id));
}

    enhancerIds.forEach(id => {
      const item = recipeItems.find(i => i.id === id);
      if (!item) return;

      const row = createPotionRow(item, () => {
        selectedEnhancer = item;

if (isEventMode) {

    const paid = removeGold(playerStats, BREW_COST);

    if (!paid) {

        showItemOverlay(
            {
                item: "Insufficient Gold",
                image: "gold.jpg"
            },
            `
            You cannot afford to brew this potion.<br><br>
            Cost: ${BREW_COST} GP
            `,
            () => {}
        );

        return;
    }
    refreshGoldDisplay();
}

        const result = createMixedPotion(selectedBase, selectedEnhancer, items);

        if (!result) return;

        // 🧹 Remove ingredients from inventory
        const inv = playerStats.inventory;

        // Remove ingredients
        let idx = inv.carriedItems.findIndex(i => i.id === selectedBase.id);
        if (idx !== -1) inv.carriedItems.splice(idx, 1);

        idx = inv.carriedItems.findIndex(i => i.id === selectedEnhancer.id);
        if (idx !== -1) inv.carriedItems.splice(idx, 1);

        tryAddItems(playerStats, [result], () => {

            availableBaseIds = availableBaseIds.filter(id => id !== selectedBase.id);

            selectedBase = null;
            selectedEnhancer = null;

            // re-render UI
            col1.innerHTML = `
            <div style="
                font-size:1.17em;
                font-weight:bold;
                margin-bottom:8px;
            ">
                Select Base Potion
            </div>`;

            col2.innerHTML = `
            <div style="
                font-size:1.17em;
                font-weight:bold;
                margin-bottom:8px;
            ">
                Select a potion enhancer
            </div>`;

            renderBasePotions();

            // 🎉 Show overlay
            showItemOverlay(
                {
                    ...result,
                    image: result.image
                },
                `
                <h3>Brewed Potion</h3>
                You have created <strong>${result.item}</strong><br><br>
                ${result["id-description"] || ""}
                <br><br>
                ${isEventMode ? `<br><img src="images/gold.jpg" style="width:25px; vertical-align:middle; mix-blend-mode:multiply;" /> 3GP` : ""}
                `,
                () => {
                    if (onComplete) onComplete(result);
                }
            );

            if (availableBaseIds.length === 0) {
                closeModal();
                return;
            }

        });

        // re-render UI
          col1.innerHTML = `
          <div style="
              font-size:1.17em;
              font-weight:bold;
              margin-bottom:8px;
          ">
              Select Base Potion
          </div>`;

          col2.innerHTML = `
          <div style="
              font-size:1.17em;
              font-weight:bold;
              margin-bottom:8px;
          ">
              Select a potion enhancer
          </div>`;

          renderBasePotions();

        // 🎉 Show overlay
        showItemOverlay(
            {
                ...result,
                image: result.image
            },
            `
            <h3>Brewed Potion</h3>
            You have created <strong>${result.item}</strong><br><br>
            ${result["id-description"] || ""}
            <br><br>
            ${isEventMode ? `<br><img src="images/gold.jpg" style="width:25px; vertical-align:middle; mix-blend-mode:multiply;" /> 3GP` : ""}
            `,
            () => {
                if (onComplete) onComplete(result);
            }
        );

        if (availableBaseIds.length === 0) { 
            closeModal();
            return;
        }        
      });

      col2.appendChild(row);
    });
  }

  // ----------------------------------------
  // Shared row builder
  // ----------------------------------------
function createPotionRow(item, onClick, selected = false) {
    const row = document.createElement("div");

    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "10px";
    row.style.padding = "6px";
    row.style.borderBottom = "1px solid #414242";
    row.style.cursor = "pointer";
    if (selected) {
        row.style.background = "#ffffff6f";
        row.style.boxShadow = "0 1px 15px rgba(0,0,0,0.85)";
        row.style.borderRadius = "6px";
    }
    row.innerHTML = `
      <img src="images/${item.image}" style="width:40px; mix-blend-mode:multiply;" />
      <div>
        <strong>${item.item}</strong>
        <div style="font-size:12px; opacity:0.7;">
            ${item["id-description"] || ""}
        </div>
      </div>
    `;

    row.addEventListener("click", onClick);

    return row;
  }

  // ----------------------------------------
  // FINAL MODAL SETUP
  // ----------------------------------------
  setModalContent(container);
  setModalWidth("550px");
  openModal();
}