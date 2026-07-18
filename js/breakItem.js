// breakItem.js
import { removeStatMods } from "./itemStatModifiers.js";

export function breakCarriedItem(playerStats) {
   
    const inv = playerStats.inventory;

    const allItems = [
        ...(inv.carriedItems || []),
    ];

    const validItems = allItems.filter(item =>
        item.breakable === true
    );

    if (validItems.length === 0) {
        return;
    }

    const index = Math.floor(Math.random() * validItems.length);
    const selectedItem = validItems[index];

    selectedItem.status = "broken";
    selectedItem.identified = true
}

export function breakWornItem(playerStats) {
   
    const inv = playerStats.inventory;

    const allItems = Object.values(inv.wornItems || {});

    const validItems = allItems.filter(item =>
        item && item.breakable === true
    );

    if (validItems.length === 0) {
        return;
    }

    const index = Math.floor(Math.random() * validItems.length);
    const selectedItem = validItems[index];
    removeStatMods(playerStats, selectedItem)

    selectedItem.status = "broken";
    selectedItem.identified = true
}