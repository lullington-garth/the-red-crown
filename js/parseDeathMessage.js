// parseDeathMessage.js

export function parseDeathMessage(lines) {
    const startIndex = lines.findIndex(l =>
        l.trim().startsWith("deathMessage:")
    );

    if (startIndex === -1) return null;

    const firstLine = lines[startIndex];

    // ----------------------------
    // Case 1: inline value
    // deathMessage: "something"
    // ----------------------------
    const inlineMatch = firstLine.match(/deathMessage:\s*(.*)/);
    const inlineValue = inlineMatch?.[1]?.trim();

    // If it's a real inline string, return it
    if (inlineValue && inlineValue !== "|") {
        return inlineValue;
    }

    // ----------------------------
    // Case 2: YAML block scalar "|"
    // ----------------------------
    const block = [];

    for (let i = startIndex + 1; i < lines.length; i++) {
        const line = lines[i];

        // stop when next YAML key starts
        if (/^\w+:\s*/.test(line.trim())) break;

        block.push(line);
    }

    return block.join("\n").trim();
}

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
    }

    if (current) items.push(current);

    return items;
}