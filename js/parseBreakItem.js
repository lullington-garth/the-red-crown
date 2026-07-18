// parseBreakItem.js

export function parseBreakItem(lines, header) {
    const items = [];
    let current = null;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === header) continue;

        if (trimmed.startsWith("-")) {
            if (current) items.push(current);

            current = { type: null };

            const inline = trimmed.slice(1).trim();

            if (inline.startsWith("type:")) {
                current.type = inline
                    .split("type:")[1]
                    .trim()
                    .replace(/^"+|"+$/g, "")
                    .replace(/^'+|'+$/g, "");
            }

            continue;
        }

        if (!current) continue;

        if (trimmed.startsWith("type:")) {
            current.type = trimmed
                .split("type:")[1]
                .trim()
                .replace(/^"+|"+$/g, "")
                .replace(/^'+|'+$/g, "");
        }
    }

    if (current) items.push(current);

    return items;
}