// handleShop.js

import { openShop } from "./shop.js";
import { resolveShopVariable } from "./shopVariableResolver.js";

export function handleShop({
    node,
    state,
    playerStats,
    items
}) {

    const nodeId = node.id;

    // ---------------------------------
    // REUSE EXISTING SHOP STATE
    // ---------------------------------

    if (!state.shopState[nodeId]) {

        const resolvedShopEntries = [];

        for (const entry of node.shop) {

            // ----------------------------
            // STATIC ITEM
            // ----------------------------

            if (entry.id) {
                resolvedShopEntries.push(entry.id);
            }

            // ----------------------------
            // RESOLVER SHOP
            // ----------------------------

            if (entry.resolver) {

                const resolved =
                    resolveShopVariable(
                        entry.resolver,
                        playerStats
                    );

                if (Array.isArray(resolved)) {
                    resolvedShopEntries.push(...resolved);
                }
            }
        }

        const resolvedItems = resolvedShopEntries
            .map(id => {

                const item =
                    items.find(i => i.id === id);

                return item
                    ? structuredClone(item)
                    : null;
            })
            .filter(Boolean);

        state.shopState[nodeId] = resolvedItems;
    }

    openShop(
        playerStats,
        state.shopState[nodeId]
    );
}