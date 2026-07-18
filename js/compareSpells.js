// compareSpells.js

// --------------------------------------------------
// Build a comparison-ready book object
// --------------------------------------------------
export function buildCompareBook(bookItem, spells) {
    if (!bookItem || !spells) return null;

    return {
        item: bookItem,
        spells: spells
    };
}

// --------------------------------------------------
// Compare Defence Duration
// --------------------------------------------------
export function isHigherDefenceDuration(
    equippedSpell,
    inventorySpell,
    wizardColor
) {
    if (!equippedSpell || !inventorySpell) return false;

    // Only compare Defence spells
    if (
        equippedSpell.type !== "Defence" ||
        inventorySpell.type !== "Defence"
    ) {
        return false;
    }

    const colorKey = wizardColor.toLowerCase();

    const equippedValue = equippedSpell.duration?.[colorKey] ?? 0;
    const inventoryValue = inventorySpell.duration?.[colorKey] ?? 0;

    return inventoryValue > equippedValue;
}