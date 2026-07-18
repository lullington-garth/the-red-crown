// calculateCapacity.js

import { openOverCapacityModal } from "./overCapacityModal.js";

export function calculateUsedSlots(playerStats) {
    return playerStats.inventory.carriedItems.reduce((sum, item) => {
        return sum + (item["inventory-slots"] || 0);
    }, 0);
}

export function calculateMaxSlots(playerStats) {
    let base = 8;

    if (playerStats.horse) {
        base += playerStats.horse.capacity;
    }

    const worn = playerStats.inventory.wornItems;

    Object.values(worn).forEach(item => {
        if (!item) return;

        if (item["special-ability"] === "INC_INVENTORY_3") {
            base += 3;
        }
    });

    const carried = playerStats.inventory.carriedItems;

    Object.values(carried).forEach(item => {
        if (!item) return;

        if (item["special-ability"] === "INC_INVENTORY_10") {
            base += 10;
        }
    });

    return base;
}

export function tryAddItems(playerStats, newItems, onComplete) {

    const used = calculateUsedSlots(playerStats);
    const max = calculateMaxSlots(playerStats);

    const incomingSlots = newItems.reduce((sum, item) => {
        return sum + (item["inventory-slots"] || 0);
    }, 0);

    const total = used + incomingSlots;

    // ✅ If no overflow → just add
    if (total <= max) {
        playerStats.inventory.carriedItems.push(...newItems);
        onComplete?.();
        return;
    }

    // ❗ Overflow → let player decide
    openOverCapacityModal({
        playerStats,
        newItems,
        maxSlots: max,
        filterFn: item => item?.["can-discard"] === true,
        onConfirm: (finalItems) => {
            playerStats.inventory.carriedItems = finalItems;


            onComplete?.();
        }
    });
}