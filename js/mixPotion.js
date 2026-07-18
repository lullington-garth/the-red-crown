// mixPotion.js
import { openMixPotionModal } from "./potionModals.js";
import { refreshInventoryUI } from "./inventoryUI.js";

// Base → enhancer mapping
export const potionMixMap = {
  "0172": ["0160", "0161", "0162"],
  "0167": ["0168", "0169", "0170"],
  "0163": ["0164", "0165", "0166"],
  "0092": ["0115"]
};

// Get enhancers for a selected base potion
export function getEnhancersForBase(baseId) {
  return potionMixMap[baseId] || [];
}

const recipeMap = {
  "0172_0160": "0194",
  "0172_0161": "0195",
  "0172_0162": "0196",
  "0167_0168": "0191",
  "0167_0169": "0192",
  "0167_0170": "0193",
  "0163_0164": "0188",
  "0163_0165": "0189",
  "0163_0166": "0190",
  "0092_0115": "0303"
};

export function createMixedPotion(baseItem, enhancerItem, allItems) {
  const key = `${baseItem.id}_${enhancerItem.id}`;
  const resultId = recipeMap[key];

  if (!resultId) {
    console.warn("No recipe found for:", key);
    return null;
  }

  // Pull FULL item from your available items
  return allItems.find(i => i.id === resultId);
}

export function getAvailablePotionItems(playerStats, items, mode = "event") {

    const isEventMode = mode === "event";

    // EVENT MODE → full recipe pool
    if (isEventMode) {
        return items;
    }

    // PICKUP MODE → inventory restricted
    const inv = playerStats.inventory;

    const inventoryItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    // Only allow items that exist in recipe pool
    return inventoryItems.filter(invItem =>
        items.some(recipeItem => recipeItem.id === invItem.id)
    );
}

export function getAvailableBases(playerStats, items) {
  const inv = playerStats.inventory;

  const inventoryIds = [
    ...(inv.carriedItems || []),
    ...(Object.values(inv.wornItems || {}).filter(Boolean))
  ].map(i => i.id);

  return Object.keys(potionMixMap).filter(baseId =>
    inventoryIds.includes(baseId)
  );
}

export function handleMixItem(playerStats, item, onResolved) {

    const inv = playerStats.inventory;

    const inventoryItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    const mixItems = inventoryItems.filter(i =>
        i.id === "0092" || i.id === "0115"
    );

    const resultTemplate = playerStats.items.find(i => i.id === "0303");

    if (resultTemplate) {
        mixItems.push(resultTemplate);
    } else {
        console.warn("Missing template for 0303");
    }

    openMixPotionModal(
        playerStats,
        mixItems,
        (result) => {

            if (!result) return;

            // ✅ CREATE REAL ITEM INSTANCE (same pattern as axe)
            const createdItem = structuredClone(result);

            // IMPORTANT: give it unique instance ID
            createdItem.id = Date.now().toString();
//            playerStats.inventory.carriedItems.push(createdItem);

            // optional UI refresh
            if (typeof refreshInventoryUI === "function") {
                refreshInventoryUI();
            }

            if (onResolved) onResolved(createdItem);
        },
        { mode: "custom" }
    );
}