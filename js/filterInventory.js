// filterInventory.js

export const FILTERS = {
    all: (item) =>
        item.type !== "coin",

    books: (item) =>
        item.type === "book",

    worn: (item) =>
        ["feet", "glasses", "hands", "head", "torso"].includes(item.type),

    jewellery: (item) =>
        ["ring", "neck"].includes(item.type),

    potions: (item) =>
        item.type === "potion",

    scrolls: (item) =>
        item.type === "scroll",

    misc: (item) =>
        ["misc", "provisions", "key", "other"].includes(item.type),

    weapons: (item) =>
        ["weapon", "staff", "shield"].includes(item.type),

    magicalUnidentified: (item) =>
        item.magical === true && item.identified === false,

    heavyItems: (item) =>
        (item["inventory-slots"] || 0) > 1,
};

export function filterInventory(items, filterKey) {
    const fn = FILTERS[filterKey] || FILTERS.all;
    return items.filter(fn);
}

export function sortInventory(items) {
    return [...items].sort((a, b) => {
        const typeCompare = (a.type || "").localeCompare(b.type || "");
        if (typeCompare !== 0) return typeCompare;

        return (a.item || "").localeCompare(b.item || "");
    });
}