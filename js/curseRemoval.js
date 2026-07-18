// curseRemoval.js

import { openItemSelectionModal} from "./itemModals.js";
import { showItemModal } from './useItem.js';
import { refreshInventoryUI } from "./inventoryUI.js";
import { removeGold } from "./gold.js";
import { showItemOverlay } from "./itemOverlay.js";

export function handleCurseRemoval(
    playerStats,
    {
        sourceItem = null,
        noCurseMessage = "There are no cursed items.",
        successMessage = (itemName) =>
            `${itemName} is now free of its curse, but any damage done by the curse, can not be undone.`,
        chargeGold = 0
    } = {}
) {

    // ---------------------------------
    // CHARGE GOLD FIRST
    // ---------------------------------
    if (chargeGold > 0) {

        const paid = removeGold(playerStats, chargeGold);

        if (!paid) {

            showItemOverlay(
                {
                    item: "Curse Removal",
                    image: "gold.jpg",
                    "display-size": "medium"
                },

                `You do not have enough gold.<br><br>
                ${chargeGold} Gold Pieces are required for curse removal`
            );

            return false;
        }
    }

    const inv = playerStats.inventory;

    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    const validItems = allItems.filter(
        item => item.status === "cursed"
    );

    // ---------------------------------
    // NO CURSED ITEMS
    // ---------------------------------
    if (validItems.length === 0) {

        if (sourceItem) {
            sourceItem.extraMessage = noCurseMessage;
        } else {

            showItemModal(
                {
                    item: "Curse Removal",
                    image: "skull.jpg",
                    "display-size": "medium",
                    "use-message": "The man takes a pair of heavy, but pliable black gloves embroidered in silver. He places the cursed item on a large velvet cushion and falls into a deep trance. He looks up almost immediately. 'This item is not cursed sir.'"
                },
                noCurseMessage,
                null,
                playerStats
            );
        }

        return false;
    }

    // ---------------------------------
    // SELECT ITEM
    // ---------------------------------
    openItemSelectionModal(playerStats, {

        title: "Select Cursed Item",

        filterFn: (item) => item.status === "cursed",

        onSelect: (selectedItem) => {

            selectedItem.identified = true;
            selectedItem.status = "None";
            selectedItem["can-discard"] = true;
            selectedItem["stat-mod"] = "None";
            selectedItem["stat-mod-type"] = "None";
            selectedItem["stat-mod-object"] = {};
            selectedItem["special-ability"] = "None";
            selectedItem["id-description"] = "Was once cursed. Harmless now.";
            selectedItem["inventory-slots"] = 1;

            // Remove cursed label
            selectedItem.item =
                selectedItem.item.replace(" - Cursed ☠️", "");

            // Remove curse info from description
            if (selectedItem.description) {

                selectedItem.description =
                    selectedItem.description
                        .replace(/<hr>.*$/, "")
                        .trim();
            }

            showItemModal(
                sourceItem || {
                    item: "Curse Removal",
                    image: "skull.jpg",
                    "display-size": "medium",
                    "use-message": "The man takes a pair of heavy, but pliable black gloves embroidered in silver. He places the cursed item on a large velvet cushion and falls into a deep trance."
                },
                successMessage(selectedItem.item),
                () => {
                    refreshInventoryUI();
                },
                playerStats
            );
        }
    });

    return true;
}