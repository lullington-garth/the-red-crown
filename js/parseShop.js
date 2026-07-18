// parseShop.js

export function parseShop(lines, header = "shop:") {
    if (!lines || !Array.isArray(lines)) return [];

    const items = [];

    for (const rawLine of lines) {

        if (!rawLine) continue;

        const line = rawLine.replace(/\r/g, "").trim();

        // ----------------------------
        // STATIC ITEM
        // ----------------------------

        const itemMatch =
            line.match(/-+\s*item:\s*"?([^"]+)"?/i);

        if (itemMatch) {

            items.push({
                id: itemMatch[1]
            });

            continue;
        }

        // ----------------------------
        // SHOP RESOLVER
        // ----------------------------

        const resolverMatch =
            line.match(/-+\s*resolver:\s*"?([^"]+)"?/i);

        if (resolverMatch) {

            items.push({
                resolver: resolverMatch[1]
            });

            continue;
        }
    }

    return items;
}