// pickupEffects.js
import { getGold, removeGold, addGold } from "./gold.js";
import { setModalHeight } from "./modal.js";
import { showItemModal } from "./useItem.js";
import { showItemOverlay } from "./itemOverlay.js";

/**
 * Main entry point for all pickup effects
 */
export function handlePickupEffects(item, playerStats) {

    if (!item || !playerStats) return;

    switch (item["special-ability"]) {

        case "HALF_GOLD":
            handleSuperSpendCoin(item, playerStats);
            break;

        default:
            break;
    }
}

function handleSuperSpendCoin(item, playerStats) {

    const currentGold = getGold(playerStats);
    const newGold = Math.floor(currentGold / 2);

    const lostGold = currentGold - newGold;

    removeGold(playerStats, lostGold);

    const message = "Your gold has been halved and all future purchases will cost double until the coin is removed.";

    showItemOverlay(item, message);
}