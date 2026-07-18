// sacrificeItem.js

import { openItemSelectionModal } from "./itemModals.js";
import { refreshInventoryUI } from "./inventoryUI.js";

export function handleSacrificeItem(
    playerStats,
    {
        variant = "magical",
        noItemMessage = null,
        onComplete
    } = {}
) {

    let title;
    let filterFn;

    switch (variant) {

        case "cursed":

            title = "Select Cursed Item to Sacrifice";

            filterFn = item =>
                item.status === "cursed";
                
            break;

        case "nonMagical":

            title = "Select Non-Magical Item to Sacrifice";

            filterFn = item =>
                item.magical === false &&
                item.status !== "cursed";

            break;

        default:

            title = "Select Magical Item to Sacrifice";

            filterFn = item =>
                item.magical === true &&
                item.status !== "cursed";
            break;
    }

    openItemSelectionModal(playerStats, {

        title,

        filterFn,

        buttonText: "Sacrifice Item",

        onSelect: (selectedItem) => {

            const inv = playerStats.inventory;
            playerStats.sacrifiedItemName = selectedItem.item;
            console.log(playerStats.sacrifiedItemName)

            // carried items
            const carriedIndex =
                inv.carriedItems.indexOf(selectedItem);

            if (carriedIndex !== -1) {
                inv.carriedItems.splice(
                    carriedIndex,
                    1
                );
            }

            // worn items
            for (const slot in inv.wornItems) {

                if (
                    inv.wornItems[slot] === selectedItem
                ) {
                    inv.wornItems[slot] = null;
                }
            }

            refreshInventoryUI();

            if (onComplete) {
                onComplete("win");
            }
        }
    });
}