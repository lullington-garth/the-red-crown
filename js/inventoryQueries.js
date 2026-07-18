// inventoryQueries.js

export function isOwned(playerStats, itemId) {

    const inv = playerStats.inventory;

    const allItems = [
        ...(inv?.carriedItems || []),
        ...Object.values(inv?.wornItems || {}).filter(Boolean)
    ];

    return allItems.some(item =>
        item.id === itemId ||
        item.templateId === itemId
    );
}

export function isWorn(playerStats, itemId) {

    const inv = playerStats.inventory;

    const wornItems =
        Object.values(inv?.wornItems || {})
            .filter(Boolean);

    return wornItems.some(item =>
        item.id === itemId ||
        item.templateId === itemId
    );
}

export function isOwnedType(playerStats, itemType) {

    const inv = playerStats.inventory;

    const allItems = [
        ...(inv?.carriedItems || []),
        ...Object.values(inv?.wornItems || {}).filter(Boolean)
    ];

    return allItems.some(item =>
        item.type?.toLowerCase() ===
        itemType.toLowerCase()
    );
}

export function hasMagicalItem(playerStats) {

    const inv = playerStats.inventory;

    const allItems = [
        ...(inv?.carriedItems || []),
        ...Object.values(inv?.wornItems || {}).filter(Boolean)
    ];

    return allItems.some(item => {

        // must be magical
        if (item.magical !== true) {
            return false;
        }

        const status =
            (item.status || "").toLowerCase();

        // blocked states
        if (status === "broken") return false;
        if (status === "cursed") return false;

        // non-discardable items
        if (
            item.canDiscard === false ||
            item["can-discard"] === false
        ) {
            return false;
        }

        return true;
    });
}

export function hasNonMagicalItem(playerStats) {

    const inventory = playerStats.inventory;

    const items = [
        ...(inventory.carriedItems || []),
        ...(Object.values(inventory.wornItems || {}).filter(Boolean))
    ];

    return items.some(
        item => item.magical !== true
    );
}

export function hasCursedItem(playerStats) {

    const inventory = playerStats.inventory;

    const items = [
        ...(inventory.carriedItems || []),
        ...(Object.values(inventory.wornItems || {}).filter(Boolean))
    ];

    return items.some(
        item => item.status === "cursed"
    );
}

export function hasTradableItem(playerStats) {

    const carried =
        playerStats.inventory?.carriedItems || [];

    return carried.some(item => {

        const status =
            (item.status || "").toLowerCase();

        // blocked states
        if (status === "broken") return false;
        if (status === "cursed") return false;

        // non-discardable items
        if (
            item.canDiscard === false ||
            item["can-discard"] === false
        ) {
            return false;
        }

        return true;
    });
}