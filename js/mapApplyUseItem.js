// mapApplyUseItem.js

import { useItem } from "./useItem.js";
import { resolveShopVariable } from "./shopVariableResolver.js";

export function applyUseItems(playerStats, rules = [], items = []) {

    if (!rules?.length) return;

    for (const rule of rules) {

        const resolvedIds = [];

        // ----------------------------
        // STATIC ITEM
        // ----------------------------
        if (rule.id) {
            resolvedIds.push(rule.id);
        }

        // ----------------------------
        // RESOLVER
        // ----------------------------
        if (rule.resolver) {

            const result =
                resolveShopVariable(
                    rule.resolver,
                    playerStats
                );

            if (Array.isArray(result)) {
                resolvedIds.push(...result);
            }
        }

        // ----------------------------
        // USE ITEMS
        // ----------------------------
        for (const id of resolvedIds) {

            const item =
                items.find(i => i.id === id);

            if (!item) continue;

            useItem(
                playerStats,
                structuredClone(item),
                "map"
            );
        }
    }
}