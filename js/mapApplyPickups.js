// mapApplyPickups.js

import { tryAddItems } from "./calculateCapacity.js";
import { openPickupSelectionModal } from "./openPickupSelectionModal.js";
import { openPickupSomeModal } from "./openPickupSomeModal.js";
import { showItemOverlay } from "./itemOverlay.js";

const REALM_STAFF = [
    "0262","0263","0264","0265","0266","0267","0269","0270","0271",
    "0272","0273","0274","0275","0276","0277","0278","0279","0280"
];

export function applyForcedPickups(playerStats, pickups) {
    if (!pickups || pickups.length === 0) return;

    const carried = playerStats.inventory?.carriedItems;

    if (!carried) {
        console.warn("⚠️ No carriedItems inventory found");
        return;
    }

    const itemsToAdd = [];

    for (const p of pickups) {
        if (!p.item) continue;

        let itemId = p.item;

        if (itemId === "lostItemReturned") {

            const lostItem = playerStats.lostItem;

            if (!lostItem) {
                console.warn("⚠️ No lost item stored");
                continue;
            }

            carried.push(structuredClone(lostItem));

            playerStats.lostItem = null;

            continue;
        }

        if (itemId === "potionOther") {
            const ethos = playerStats.absentBrotherEthos;

            if (ethos === "STAMINA") itemId = "0186";
            else if (ethos === "LUCK") itemId = "0185";
            else if (ethos === "MAGIC") itemId = "0187";
            else {
                console.warn("⚠️ Unknown ethos for potionOther:", ethos);
                continue;
            }
        }

        if (itemId === "questItem") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0130";
            else if (colour === "green") itemId = "0208";
            else if (colour === "blue") itemId = "0259";
            else {
                console.warn("⚠️ Unknown colour for questItem:", colour);
                continue;
            }
        }

        if (itemId === "realmItem1") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0276";
            else if (colour === "green") itemId = "0263";
            else if (colour === "blue") itemId = "0270";
            else {
                console.warn("⚠️ Unknown colour for realmItem1:", colour);
                continue;
            }
        }

        if (itemId === "creaturePart") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0107";
            else if (colour === "green") itemId = "0105";
            else if (colour === "blue") itemId = "0106";
            else {
                console.warn("⚠️ Unknown colour for creaturePart:", colour);
                continue;
            }
        }

        if (itemId === "cursedRing") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0204";
            else if (colour === "green") itemId = "0205";
            else if (colour === "blue") itemId = "0203";
            else if (colour === "red") itemId = "0334";
            else {
                console.warn("⚠️ Unknown colour for cursedRing:", colour);
                continue;
            }
        }

        if (itemId === "riftBook") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0008";
            else if (colour === "green") itemId = "0007";
            else if (colour === "blue") itemId = "0006";
            else if (colour === "red") itemId = "0006";
            else {
                console.warn("⚠️ Unknown colour for riftBook:", colour);
                continue;
            }
        }

        if (itemId === "potterItem") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0141";
            else if (colour === "green") itemId = "0200";
            else if (colour === "blue") itemId = "0016";
            else if (colour === "red") itemId = "0358";
            else {
                console.warn("⚠️ Unknown colour for cursedRing:", colour);
                continue;
            }
        }

        if (itemId === "hutGift") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0283";
            else if (colour === "green") itemId = "0029";
            else if (colour === "blue") itemId = "0024";
            else if (colour === "red") itemId = "0335";
            else {
                console.warn("⚠️ Unknown colour for hutGift:", colour);
                continue;
            }
        }

        if (itemId === "yourGift") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0035";
            else if (colour === "green") itemId = "0139";
            else if (colour === "blue") itemId = "0033";
            else if (colour === "red") itemId = "0260";
            else {
                console.warn("⚠️ Unknown colour for yourGift:", colour);
                continue;
            }
        }

        if (itemId === "brotherOneGift") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0140";
            else if (colour === "green") itemId = "0359";
            else if (colour === "blue") itemId = "0036";
            else if (colour === "red") itemId = "0034";
            else {
                console.warn("⚠️ Unknown colour for brotherOneGift:", colour);
                continue;
            }
        }

        if (itemId === "brotherTwoGift") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0359";
            else if (colour === "green") itemId = "0034";
            else if (colour === "blue") itemId = "0140";
            else if (colour === "red") itemId = "0036";
            else {
                console.warn("⚠️ Unknown colour for brotherTwoGift:", colour);
                continue;
            }
        }

        if (itemId === "brotherThreeGift") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            if (colour === "yellow") itemId = "0034";
            else if (colour === "green") itemId = "0036";
            else if (colour === "blue") itemId = "0359";
            else if (colour === "red") itemId = "0140";
            else {
                console.warn("⚠️ Unknown colour for brotherThreeGift:", colour);
                continue;
            }
        }

        if (itemId === "EnviornmentWand") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0275";
            else if (colour === "green") itemId = "0262";
            else if (colour === "blue") itemId = "0269";
            else {
                console.warn("⚠️ Unknown colour for brotherThreeGift:", colour);
                continue;
            }
        }

        if (itemId === "bloodMoss") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0109";
            else if (colour === "green") itemId = "0108";
            else if (colour === "blue") itemId = "0110";
            else {
                console.warn("⚠️ Unknown colour for bloodMoss:", colour);
                continue;
            }
        }

        if (itemId === "enviro2RedItem") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0112";
            else if (colour === "green") itemId = "0113";
            else if (colour === "blue") itemId = "0111";
            else {
                console.warn("⚠️ Unknown colour for bloodMoss:", colour);
                continue;
            }
        }

        if (itemId === "veil") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0099";
            else if (colour === "green") itemId = "0101";
            else if (colour === "blue") itemId = "0100";
            else {
                console.warn("⚠️ Unknown colour for veil:", colour);
                continue;
            }
        }

        if (itemId === "dragonItemRed") {
            const colour = (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") itemId = "0102";
            else if (colour === "green") itemId = "0104";
            else if (colour === "blue") itemId = "0103";
            else {
                console.warn("⚠️ Unknown colour for dragonItemRed:", colour);
                continue;
            }
        }

        if (itemId === "realmStaff") {

            const carried =
                playerStats.inventory?.carriedItems || [];

            const worn =
                Object.values(
                    playerStats.inventory?.wornItems || {}
                ).filter(Boolean);

            const ownedItems = [
                ...carried,
                ...worn
            ];

            const currentStaff = REALM_STAFF.find(staffId =>
                ownedItems.some(item =>
                    item.id === staffId ||
                    item.templateId === staffId
                )
            );

            if (!currentStaff) {
                console.warn(
                    "⚠️ Player does not possess a realm staff."
                );
                continue;
            }

            const currentIndex =
                REALM_STAFF.indexOf(currentStaff);

            const nextStaff =
                REALM_STAFF[currentIndex + 1];

            if (!nextStaff) {
                console.warn(
                    "⚠️ Player already has highest realm staff."
                );
                continue;
            }

            // Remove old staff from carried items
            playerStats.inventory.carriedItems =
                carried.filter(item =>
                    item.id !== currentStaff &&
                    item.templateId !== currentStaff
                );

            // Remove old staff from worn slots
            for (const slot in playerStats.inventory.wornItems) {

                const item =
                    playerStats.inventory.wornItems[slot];

                if (
                    item &&
                    (
                        item.id === currentStaff ||
                        item.templateId === currentStaff
                    )
                ) {
                    playerStats.inventory.wornItems[slot] = null;
                }
            }

            itemId = nextStaff;
        }

        if (itemId === "clockItem") {
            const colour = (playerStats.wizardColor || "").toLowerCase();

            let clockItems = [];

            if (colour === "yellow") {
                clockItems = ["0328", "0329"];
            }
            else if (colour === "green") {
                clockItems = ["0326", "0327"];
            }
            else if (colour === "blue") {
                clockItems = ["0330", "0331"];
            }
            else if (colour === "red") {
                clockItems = ["0332", "0333"];
            }
            else {
                console.warn("⚠️ Unknown colour for clockItem:", colour);
                continue;
            }

            for (const clockId of clockItems) {

                const template = playerStats.items?.find(
                    i => i.id === clockId
                );

                if (!template) {
                    console.warn(
                        `⚠️ Item not found in templates: ${clockId}`
                    );
                    continue;
                }

                const item = structuredClone(template);

                // preserve template id
                item.templateId = item.id;

                // unique inventory instance id
                item.instanceId =
                    Date.now().toString() +
                    "_" +
                    Math.random().toString(16).slice(2);

                itemsToAdd.push(item);
            }

            continue;
        }

        const template = playerStats.items?.find(i => i.id === itemId);

        if (!template) {
            console.warn(`⚠️ Item not found in templates: ${itemId}`);
            continue;
        }

        const item = structuredClone(template);

        // preserve template id
        item.templateId = item.id;

        // unique inventory instance id
        item.instanceId =
            Date.now().toString() +
            "_" +
            Math.random().toString(16).slice(2);

        itemsToAdd.push(item);
    }

    tryAddItems(playerStats, itemsToAdd, () => {
        // optional callback
    });
}

export function applyPayPickups(playerStats, pickups) {

    if (!pickups || pickups.length === 0) return;

    const pickup = pickups[0];

    if (!pickup?.item) return;

    const cost = Number(pickup.cost || 0);

    // ----------------------------
    // Gold check
    // ----------------------------

    const currentGold =
        playerStats.gold ?? 0;

    if (currentGold < cost) {
                showItemOverlay(
                    {
                        item: "Lacking Coin",
                        image: "gold.jpg",
                        "display-size": "medium"
                    },

                    `You do not have enough gold for this item.<br>You will have to walk away from this purchase.`
                );        
        return {
            success: false,
            onFail: pickup.onFail || null
        };
    }

    const template = playerStats.items?.find(
        i => i.id === pickup.item
    );

    if (!template) {
        console.warn(
            `⚠️ Item not found in templates: ${pickup.item}`
        );
        return;
    }

    const item = structuredClone(template);

    // preserve template id
    item.templateId = item.id;

    // unique inventory instance id
    item.instanceId =
        Date.now().toString() +
        "_" +
        Math.random().toString(16).slice(2);

    // remove gold
    playerStats.gold -= cost;

    // add item
    tryAddItems(playerStats, [item], () => {
        // optional callback
    });

    return {
        success: true
    };
}

export function applySelectPickups(playerStats, pickups, onDone) {
    if (!pickups || pickups.length === 0) {
        console.warn("⚠️ No pickupSelect items found");
        return;
    }

    // ----------------------------
    // Expand virtual pickup types
    // ----------------------------
    let expandedPickups = [];

    for (const p of pickups) {
        if (!p.item) continue;

        // virtual group resolver
        if (p.item === "giftChoices") {
            expandedPickups.push(
                ...resolveGiftChoices(playerStats, pickups)
            );
            continue;
        }

        if (p.item === "devilsHoard") {
            expandedPickups.push(
                ...resolveDevilsHoard(playerStats)
            );
            continue;
        }        

        expandedPickups.push(p);
    }

    // ----------------------------
    // Build item list from templates
    // ----------------------------
    const items = expandedPickups
        .map(p => {
            const template = playerStats.items?.find(
                i => i.id === p.item
            );

            if (!template) {
                console.warn(
                    `⚠️ Item not found in templates: ${p.item}`
                );
                return null;
            }

            return structuredClone(template);
        })
        .filter(Boolean);

    if (items.length === 0) {
        console.warn("⚠️ No valid pickupSelect items resolved");
        return;
    }

    // ----------------------------
    // Open modal
    // ----------------------------
    openPickupSelectionModal(playerStats, items, {
        title: "Choose your gift...",

        onSelect: (selectedItem) => {
            const carried = playerStats.inventory?.carriedItems;

            if (!carried) {
                console.warn(
                    "⚠️ No carriedItems inventory found"
                );
                return;
            }

            // Clone selected item
            const item = structuredClone(selectedItem);

            // preserve template id
            item.templateId = item.id;

            // unique inventory instance id
            item.instanceId =
                Date.now().toString() +
                "_" +
                Math.random().toString(16).slice(2);

            // Add to inventory
            tryAddItems(playerStats, [item], () => {
                if (onDone) onDone();
            });
        }
    });

    // ⚠️ Temporary  hook
    playerStats.inventory._tempPickupItems = items;
}

export function resolveGiftChoices(playerStats, pickups) {
    const colour = (playerStats.visitingBrother || "").toLowerCase();

    const ALL_ITEMS = [
        { id: "0129", tags: ["yellow", "blue"] },   // Orb of Dragon Fire
        { id: "0031", tags: ["green", "yellow"] },   // Helm of True Focus
        { id: "0289", tags: ["blue", "green"] },     // Cloak of Camouflage

        { id: "0268" }, // Staff of Magic (always)
        { id: "0005" }, // Codex (always)
        { id: "0132" }  // Death Rattle (always)
    ];

    const filtered = ALL_ITEMS.filter(item => {
        // always include items with no tags (items 3–5)
        if (!item.tags) return true;

        // include if matches colour
        return item.tags.includes(colour);
    });

    return filtered.map(i => ({ item: i.id }));
}

export function resolveDevilsHoard(playerStats) {

    const ALL_ITEMS = [
        "0306",
        "0300",
        "0289",
        "0206",
        "0194",
        "0138",
        "0131",
        "0026",
        "0016",
        "0013",
        "0002"
    ];

    const carried =
        playerStats.inventory?.carriedItems || [];

    const worn =
        Object.values(
            playerStats.inventory?.wornItems || {}
        ).filter(Boolean);

    const ownedItems = [
        ...carried,
        ...worn
    ];

    const filtered = ALL_ITEMS.filter(itemId => {

        return !ownedItems.some(item =>
            item.id === itemId ||
            item.templateId === itemId
        );

    });

    return filtered.map(id => ({
        item: id
    }));
}

export function applySomePickups(playerStats, pickups, onDone) {
    if (!pickups || pickups.length === 0) {
        console.warn("⚠️ No pickupSome items found");
        return;
    }

    // Build items from templates
    const items = pickups
        .map(p => {
            const template = playerStats.items?.find(
                i => i.id === p.item
            );

            if (!template) {
                console.warn(`⚠️ Item not found in templates: ${p.item}`);
                return null;
            }

            return structuredClone(template);
        })
        .filter(Boolean);

    if (items.length === 0) {
        console.warn("⚠️ No valid pickupSome items resolved");
        return;
    }

    openPickupSomeModal(playerStats, items, {
        title: "Select Items to Take",

        onConfirm: (selectedItems) => {
            const carried = playerStats.inventory?.carriedItems;

            if (!carried) {
                console.warn("⚠️ No carriedItems inventory found");
                return;
            }

            const finalItems = selectedItems.map(item => {
                const clone = structuredClone(item);

                clone.templateId = clone.id;

                clone.instanceId =
                    Date.now().toString() +
                    "_" +
                    Math.random().toString(16).slice(2);

                return clone;
            });

            tryAddItems(playerStats, finalItems, () => {
                if (onDone) onDone();
            });
        }
    });
}