// scrolls.js
import { openItemSelectionModal} from "./itemModals.js";
import { showItemModal } from './useItem.js';
import { FILTERS } from './filterInventory.js';
import { refreshInventoryUI } from "./inventoryUI.js";
import { equipItem } from "./equipItem.js";
import { handleCurseRemoval } from "./curseRemoval.js";
import { tryAddItems } from "./calculateCapacity.js";

export function useScroll(playerStats, item, context) {

    if (context === "combat") {
        item.extraMessage = "Scrolls cannot be used during combat.";
        return false;
    }

    const cost = item["magic-cost"] || 0;

    if (!playerStats.stats.MAGIC) {
        playerStats.stats.MAGIC = { current: 0, max: 0, min: 0 };
    }

    if (playerStats.stats.MAGIC.current < cost) {
        item.extraMessage = "Not enough magic to use this scroll.";
        return false;
    }

    playerStats.stats.MAGIC.current -= cost;

    return true;
}

export function handleSpecialScroll(playerStats, item) {

    const ability = item["special-ability"];

    switch (ability) {

        case "COPY_ITEM":
            return handleCopyItem(playerStats, item);

        case "RESTORE_HALF":
            applyRestoreHalf(playerStats, item);
            return false;

        case "RESTORE_FULL":
            applyRestoreFull(playerStats, item);
            return false;
        
        case "DEATH":
            applyInstantDeath(playerStats, item);
            return false;

        case "IDENTIFY":
            return handleIdentifyItem(playerStats, item);

        case "REDUCE_WEIGHT":
            return handleReduceWeight(playerStats, item);

        case "CHECK_CURSE":
            return handleCurseCheck(playerStats, item);

        case "STYLE":
            return handleStylishHat(playerStats, item);

        case "HAIR":
           return handleHairScroll(playerStats, item);

        case "REMOVE_CURSE":
            return handleRemoveCurse(playerStats, item);

        case "CAKE":
            return handleCake(playerStats, item);

        case "KEY":
            return handleCopyKey(playerStats, item);

        case "WHALE":
            return handleWhale(playerStats, item);

        case "REPAIR":
            return handleRepair(playerStats, item);

        case "DOUBLE_GP":
            return handleDoubleGold(playerStats, item);

        case "HOWL":
            return handleHowl(playerStats, item);

        case "MIDAS":
            return handleMidas(playerStats, item);

        case "SCALE_SKIN":
            return handleScaleSkin(playerStats, item);

        case "SAM":
            return handleSam(playerStats, item);

        case "BREAD":
            return handleBread(playerStats, item);

        default:
            return false;
    }
}

function applyRestoreHalf(playerStats, item) {

    const statName = extractHalfStat(item["stat-mod"]);

    if (!statName) {
        console.warn("RESTORE_HALF: No valid stat found", item);
        return;
    }

    // Ensure stat exists
    if (!playerStats.stats[statName]) {
        playerStats.stats[statName] = {
            current: 0,
            max: 10,
            min: 0
        };
    }

    const stat = playerStats.stats[statName];

    const missing = (stat.max ?? 0) - (stat.current ?? 0);

    if (missing <= 0) {
        item.extraMessage = `${statName} is already at maximum.`;
        return;
    }

    const restoreAmount = Math.ceil(missing / 2);

    stat.current += restoreAmount;

    // Clamp to max
    if (stat.max != null) {
        stat.current = Math.min(stat.current, stat.max);
    }

    // Optional: dynamic message
    item.extraMessage = `${restoreAmount} ${statName} restored.`;
}

function extractHalfStat(statModString) {

    if (!statModString) return null;

    // Remove "(H)" and trim
    return statModString.replace("(H)", "").trim();
}

function applyRestoreFull(playerStats, item) {

    const statsToRestore = ["SKILL", "STAMINA", "LUCK", "MAGIC"];

    let restoredAny = false;

    statsToRestore.forEach(statName => {

        if (!playerStats.stats[statName]) {
            playerStats.stats[statName] = {
                current: 0,
                max: 10,
                min: 0
            };
        }

        const stat = playerStats.stats[statName];

        if (stat.max != null && stat.current < stat.max) {
            stat.current = stat.max;
            restoredAny = true;
        }
    });

    if (!restoredAny) {
        item.extraMessage = "All stats are already at maximum.";
        return;
    }

    item.extraMessage = "All stats fully restored.";
}

function applyInstantDeath(playerStats, item) {

    if (!playerStats.stats.STAMINA) {
        playerStats.stats.STAMINA = {
            current: 0,
            max: 10,
            min: 0
        };
    }

    const stamina = playerStats.stats.STAMINA;

    stamina.current = 0;

    if (stamina.min != null) {
        stamina.current = Math.max(stamina.current, stamina.min);
    }
}

function handleCopyItem(playerStats, scrollItem) {

    openItemSelectionModal(playerStats, {
        title: "Choose an item to copy",

        onSelect: (selectedItem) => {

            const copy = {
                ...structuredClone(selectedItem),

                // ✅ Identity
                id: Date.now().toString(),
                item: `${selectedItem.item} - Copy`,

                // ✅ Force clean state
                identified: true,
                "id-description": `A convincing copy of ${selectedItem.item}.`,

                wizard: "all",
                magical: false,
                breakable: true,
                "can-discard": true,

                "stat-mod": "None",
                "stat-mod-type": "None",
                "stat-mod-object": {},

                "lose-on-use": false,

                swap: "Yes",

                "special-ability": "None",
                "inventory-slots": 0,
                status: "None",
                "use-in-combat": false,

                charges: 0,
                "magic-cost": 0,
                "use-message": "None",

                "bonus-against": "None",
                "bonus-mod": "None",

                effectiveness: null
            };

            tryAddItems(playerStats, [copy], () => {

                showItemModal(
                    scrollItem,
                    `Created a copy of ${selectedItem.item}.`,
                    () => {
                        refreshInventoryUI();
                    }
                );

            });
        }
    });

    return true;
}

function handleIdentifyItem(playerStats, scrollItem) {

    openItemSelectionModal(playerStats, {
        title: "Reveal a magical item",

        // ✅ Filter ONLY magical + unidentified
        filterFn: (item) =>
            item.magical === true &&
            item.identified === false,

        onSelect: (selectedItem) => {

            selectedItem.identified = true;

            scrollItem.extraMessage = `${selectedItem.item} has been identified.`;

            showItemModal(
                scrollItem,
                `${selectedItem.item} is now fully revealed.`, playerStats
            );
        }
    });

    return true;
}

function handleReduceWeight(playerStats, scrollItem) {

    const inv = playerStats.inventory;

    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    const validItems = allItems.filter(item =>
        (item["inventory-slots"] || 0) > 1
    );

    // 🚫 No valid targets
    if (validItems.length === 0) {
        scrollItem.extraMessage = "... but there are no overweight items in your inventory. This spell has been wasted.";
        return false;
    }

    openItemSelectionModal(playerStats, {
        title: "Select an item to lighten",

        filterFn: FILTERS.heavyItems,

onSelect: (selectedItem) => {

    // Apply effect
    selectedItem["inventory-slots"] = 1;

    // Message
    scrollItem.extraMessage = `${selectedItem.item} has been reduced to 1 slot.`;

    // ✅ Show confirmation + refresh AFTER closing
    showItemModal(
        scrollItem,
        `${selectedItem.item} has been lightened.`,
        () => {
            refreshInventoryUI();
        }, playerStats
    );
}
    });

    return true;
}

function handleCurseCheck(playerStats, scrollItem) {

    openItemSelectionModal(playerStats, {
        title: "Check an item for curses",

        onSelect: (selectedItem) => {

            // ✅ Mark as identified
            selectedItem.identified = true;

            const isCursed = selectedItem.status?.toLowerCase() === "cursed";

            // Optional: grab stat-mod if it exists and isn't "None"
            const statMod = selectedItem["stat-mod"] && selectedItem["stat-mod"] !== "None"
                ? ` ${selectedItem["stat-mod"]}`
                : "";

            let message;

            if (isCursed) {
                message = `Beware. ${selectedItem.item} is cursed.<br><br>${statMod}`;

                    if (!selectedItem.item.endsWith(" - Cursed")) {
                            selectedItem.item = `${selectedItem.item} - Cursed ☠️`;
                            selectedItem.description = `${selectedItem.description} <hr>${statMod}`;
                        }
            } else {
                message = `${selectedItem.item} is not cursed.`;
            }

            // Store message on scroll (optional, for consistency)
            scrollItem.extraMessage = message;

            // ✅ Show modal like COPY_ITEM
            showItemModal(
                scrollItem,
                message,
                () => {
                    refreshInventoryUI();
                }, playerStats
            );
        }
    });

    return true;
}

function handleStylishHat(playerStats, scrollItem) {

    const hat = {
        id: Date.now().toString(),
        item: "Quality Stylish Head Gear",

        description: "A remarkably stylish piece of headwear.",
        "id-description": "Wow. What a hat. WHAT A HAT!",

        identified: true,

        type: "head",
        image: "hat.jpg",

        wizard: "all",
        magical: false,
        breakable: true,
        "can-discard": true,

        "stat-mod": "None",
        "stat-mod-type": "None",
        "stat-mod-object": {},

        "special-ability": "None",

        "use-in-combat": false,
        "lose-on-use": false,

        "inventory-slots": 0,

        charges: 0,
        "magic-cost": 0,

        cost: 0,
        sell: 0,

        "bonus-against": "None",
        "bonus-mod": "None",

        effectiveness: null,

        status: "None"
    };

    tryAddItems(playerStats, [hat], () => {

        // ✅ Immediately equip it
        equipItem(playerStats, hat);

        showItemModal(
            scrollItem,
            "You conjure and are now wearing a piece of Quality Stylish Head Gear.",
            () => {
                refreshInventoryUI();
            },
            playerStats
        );

    });

    return true;
}

function handleHairScroll(playerStats, scrollItem) {

    const hairItemTemplate = playerStats.items.find(i => i.id === "0298");

    if (!hairItemTemplate) {
        console.warn("HAIR scroll: Item 0298 not found");
        scrollItem.extraMessage = "The spell fizzles... something went wrong.";
        return false;
    }

    const hairItem = structuredClone(hairItemTemplate);

    // ensure unique instance
    tryAddItems(playerStats, [hairItem], () => {

        equipItem(playerStats, hairItem);

        showItemModal(
            scrollItem,
            "Glorious.",
            () => {
                refreshInventoryUI();
            },
            playerStats
        );

    });

    return true;
}

function handleRemoveCurse(playerStats, scrollItem) {

    return handleCurseRemoval(playerStats, {

        sourceItem: scrollItem,

        noCurseMessage:
            "... but there are no cursed items in your inventory. This spell has been wasted."
    });
}

function handleCake(playerStats, scrollItem) {

    openItemSelectionModal(playerStats, {
        title: "Select Item to Convert",


    filterFn: (item) =>
            item.magical === false,

onSelect: (selectedItem) => {

    const inv = playerStats.inventory;

    // 🧹 Remove from carried items
    const carriedIdx = inv.carriedItems.findIndex(i => i.id === selectedItem.id);
    if (carriedIdx !== -1) {
        inv.carriedItems.splice(carriedIdx, 1);
    }

    // 🧹 Remove from worn items
    for (const key in inv.wornItems) {
        if (inv.wornItems[key] && inv.wornItems[key].id === selectedItem.id) {
            inv.wornItems[key] = null;
        }
    }

    const cake = {
        id: Date.now().toString(),
        item: "A delicious doughnut",

        description: "A light, fluffy doughnut.",
        "id-description": "Icing to the top and covered in sprinkles.",

        identified: true,

        type: "provisions",
        image: "cake.jpg",

        wizard: "all",
        magical: false,
        breakable: true,
        "can-discard": true,

        "stat-mod": "STAMINA +2",
        "stat-mod-type": "use",
        "stat-mod-object": {
            "STAMINA": 2
        },

        "special-ability": "None",

        "use-in-combat": false,
        "lose-on-use": false,

        "inventory-slots": 1,

        charges: 0,
        "magic-cost": 0,

        cost: 0,
        sell: 1,

        "bonus-against": "None",
        "bonus-mod": "None",

        effectiveness: null,

        status: "None"
    };

        playerStats.inventory.carriedItems.push(cake);

            showItemModal(
                scrollItem,
                `${selectedItem.item} is now cake. Enjoy.`,
                () => {
                    refreshInventoryUI();
                },playerStats
            );
        }
    });

    return true;
}

function handleCopyKey(playerStats, scrollItem) {

    const inv = playerStats.inventory;

    // ✅ Combine carried + worn (same as modal)
    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    // ✅ Filter keys
    const validItems = allItems.filter(item =>
        item.type === "key"
    );

    // 🚫 No keys found
    if (validItems.length === 0) {
        scrollItem.extraMessage = "... but there are no keys in your inventory. This spell has been wasted.";
        return false;
    }

    // ✅ Open modal ONLY if valid items exist
    openItemSelectionModal(playerStats, {
        title: "Select key to copy",

        filterFn: (item) => item.type === "key",

        onSelect: (selectedItem) => {

            const copy = {
                ...structuredClone(selectedItem),

                // ✅ Identity
                id: Date.now().toString(),
                item: `${selectedItem.item} - Copy`,
                "inventory-slots": 0,
            };

            tryAddItems(playerStats, [copy], () => {

                showItemModal(
                    scrollItem,
                    `Created a working copy of ${selectedItem.item}.`,
                    () => {
                        refreshInventoryUI();
                    }
                );

            });
        }
    });

    return true;
}

function handleWhale(playerStats, scrollItem) {

    // ✅ Ensure STAMINA exists
    if (!playerStats.stats.STAMINA) {
        playerStats.stats.STAMINA = {
            current: 0,
            max: 10,
            min: 0
        };
    }

    const stamina = playerStats.stats.STAMINA;

    // 🐋 Apply damage
    stamina.current -= 2;

    if (stamina.min != null) {
        stamina.current = Math.max(stamina.current, stamina.min);
    }

    // 🐋 Set message for the standard modal
    scrollItem.extraMessage =
        "Havoc ensues as a 100 ton, 30 metre long whale appears gasping for air and thrashing around...<br><br><strong>RUN! You lose 2 STAMINA in the chaos.</strong>";

    // 🐋 Swap image to whale
    scrollItem.image = "whale.jpg";
    scrollItem["display-size"] = "large";

    return false; // ✅ IMPORTANT
}

function handleRepair(playerStats, scrollItem) {

    const inv = playerStats.inventory;

    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    // ✅ Find broken items
    const validItems = allItems.filter(item =>
        item.status === "broken"
    );

    // 🚫 No valid targets
    if (validItems.length === 0) {
        scrollItem.extraMessage = "... but there are no broken items in your inventory. This spell has been wasted.";
        return false;
    }

    openItemSelectionModal(playerStats, {
        title: "Select Broken Item",

        filterFn: (item) => item.status === "broken",

        onSelect: (selectedItem) => {

            // 🔧 Repair the item
            selectedItem.status = "none";

            // Optional: restore usability flags if needed
            selectedItem.breakable = true;
            selectedItem["can-discard"] = true;

            // Optional: clean up description if you ever append "broken"
            if (selectedItem.description) {
                selectedItem.description = selectedItem.description
                    .replace(/<hr>.*$/, "")
                    .trim();
            }

            showItemModal(
                scrollItem,
                `${selectedItem.item} has been repaired and is usable once more.`,
                () => {
                    refreshInventoryUI();
                },
                playerStats
            );
        }
    });

    return true;
}

function handleDoubleGold(playerStats, scrollItem) {
    const currentGold = playerStats.gold ?? 0;

    const newGold = currentGold * 2;

    playerStats.gold = newGold;
    scrollItem.image = "gold.jpg";
    scrollItem.extraMessage = `Your gold has been doubled! You now have ${newGold} gold.`;

    return false;
}

function handleHowl(playerStats, scrollItem) {

    // 🐺 Play sound
    const audio = new Audio("sounds/howl.mp3");
    audio.play().catch(err => {
        console.warn("HOWL sound failed to play:", err);
    });

    // 🐺 Message
    scrollItem.image = "wolf.jpg";
    scrollItem["display-size"] = "large";
    scrollItem.extraMessage = "...a chilling howl bursts from within you.";

    return false; // ✅ use standard modal
}

function handleMidas(playerStats, scrollItem) {

    openItemSelectionModal(playerStats, {
        title: "Select Item to Convert",

    filterFn: (item) =>
            item.magical === false,

    formatItem: (item) => `💰 Sell: ${item.sell ?? 0}`,
    
onSelect: (selectedItem) => {

    const inv = playerStats.inventory;

    // 🧹 Remove from carried items
    const carriedIdx = inv.carriedItems.findIndex(i => i.id === selectedItem.id);
    if (carriedIdx !== -1) {
        inv.carriedItems.splice(carriedIdx, 1);
    }

    // 🧹 Remove from worn items
    for (const key in inv.wornItems) {
        if (inv.wornItems[key] && inv.wornItems[key].id === selectedItem.id) {
            inv.wornItems[key] = null;
        }
    }

    const itemValue = selectedItem.sell;
    const currentGold = playerStats.gold ?? 0;
    const newGold = currentGold + itemValue;

    playerStats.gold = newGold;

            showItemModal(
                scrollItem,
                `${selectedItem.item} has been converted to ${itemValue} gold.`,
                () => {
                    refreshInventoryUI();
                },
                playerStats,
                { image: "gold.jpg" }
            );
        }
    });

    return true;
}

function handleScaleSkin(playerStats, scrollItem) {
 
    const inv = playerStats.inventory;

    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    const validItems = allItems.filter(item =>
        item.magical === false &&
        ["head", "torso", "shield"].includes(item.type)
    );

    // 🚫 No keys found
    if (validItems.length === 0) {
        scrollItem.extraMessage = "... but there are no non magical armour, helmet or shield items in you inventory. This spell has been wasted.";
        return false;
    }
 
    openItemSelectionModal(playerStats, {
    title: "Select an Item",

    filterFn: (item) =>
        item.magical === false &&
        ["head", "torso", "shield"].includes(item.type),

    onSelect: (selectedItem) => {
      selectedItem.identified = true;
      selectedItem.magical = true;
      selectedItem["stat-mod"] = "STAMINA (B) +3";
      selectedItem["stat-mod-type"] = "equipped";
      selectedItem["stat-mod-object"] = {"STAMINA (B)": 3};

      showItemModal(
        scrollItem,
        `${selectedItem.item} has been upgraded with Scale Skin.<br>It is now a STAMINA (B) +3 item.`,
        () => {
          refreshInventoryUI();
        },
        playerStats
      );
    }
  });

  return true;
}

function handleSam(playerStats, scrollItem) {
playerStats.comeOnSam = true;
playerStats.stats.LUCK.current +=2;
playerStats.stats.LUCK.max +=2;

        showItemModal(
            scrollItem,
            `Sam has joined your party.<br>
            He will fight alongside you and<br>
            bring luck to all your endeavours.`,
            null,               
            playerStats,         
            { image: "sam.svg" } 
        );
    return true;
}

function handleBread(playerStats, scrollItem) {

    const breadItemTemplate = playerStats.items.find(i => i.id === "0306");

    if (!breadItemTemplate) {
        console.warn("BREAD scroll: Item 0306 not found");
        scrollItem.extraMessage = "The spell fizzles... something went wrong.";
        return false;
    }

    const breadItem = structuredClone(breadItemTemplate);

    // ensure unique instance
    breadItem.id = Date.now().toString();

    tryAddItems(playerStats, [breadItem], () => {

        showItemModal(
            scrollItem,
            "It looks delicious.",
            () => {
                refreshInventoryUI();
            },
            playerStats
        );

    });

    return true;
}
