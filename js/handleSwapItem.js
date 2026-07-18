// handleSwapItem.js

import { openTradeItemsModal } from "./tradeItemsModal.js";

export function handleSwapItem({
    node,
    state,
    playerStats,
    items,
    refreshNode
}) {

    const rule = node.swapItem?.[0];

    if (!rule) {
        return;
    }

    // ---------------------------------
    // FIND TARGET ITEM
    // ---------------------------------

    let stallItem = null;

    if (rule.tradeItem) {

        stallItem =
            items.find(
                item => item.id === rule.tradeItem
            );

        if (!stallItem) {

            console.warn(
                "swapItem trade item not found:",
                rule.tradeItem
            );

            return;
        }
    }

    openTradeItemsModal(
        playerStats,
        {
            stallItem,
            sellerDisplayImage: rule.sellerDisplayImage,

            filterFn: (item) => {

                const status =
                    (item.status || "").toLowerCase();

                // always blocked
                if (status === "broken") return false;
                if (status === "cursed") return false;

                // non-discardable items
                if (
                    item.canDiscard === false ||
                    item["can-discard"] === false
                ) {
                    return false;
                }

                // magical-only mode
                if (rule.magicalOnly === true) {
                    return item.magical === true;
                }

                return true;
            },

            onTrade: () => {

                state.flags[
                    `swapItem_${node.id}`
                ] = true;

                refreshNode();
            }
        }
    );
}