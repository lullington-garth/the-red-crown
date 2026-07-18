// parsePickups.js

export function parsePickups(lines, header) {
    const items = [];
    let current = null;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === header) continue;

        if (trimmed.startsWith("-")) {
            if (current) items.push(current);

            current = { item: null };

            const inline = trimmed.slice(1).trim();

            if (inline.startsWith("item:")) {
                current.item = inline
                    .split("item:")[1]
                    .trim()
                    .replace(/^"+|"+$/g, "")
                    .replace(/^'+|'+$/g, "");
            }

            continue;
        }

        if (!current) continue;

        if (trimmed.startsWith("item:")) {
            current.item = trimmed
                .split("item:")[1]
                .trim()
                .replace(/^"+|"+$/g, "")
                .replace(/^'+|'+$/g, "");
        }

        if (trimmed.startsWith("cost:")) {
            current.cost = Number(
                trimmed.split("cost:")[1].trim()
            );
        }

        if (trimmed.startsWith("onFail:")) {
            current.onFail = trimmed
                .split("onFail:")[1]
                .trim()
                .replace(/^"+|"+$/g, "")
                .replace(/^'+|'+$/g, "");
        }
    }

    if (current) items.push(current);

    return items;
}