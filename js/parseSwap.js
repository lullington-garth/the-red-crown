// parseSwap.js

export function parseSwap(lines = [], header = "swapItem:") {

    if (!lines || lines.length === 0) {
        return [];
    }

    const swaps = [];

    let current = null;

    for (const rawLine of lines) {

        const line = rawLine.trim();

        // ----------------------------
        // NEW ENTRY
        // ----------------------------
        if (line.startsWith("- ")) {

            if (current) {
                swaps.push(current);
            }

            current = {};

            const inline =
                line.replace("- ", "").trim();

            if (inline) {

                const [key, value] =
                    inline.split(":").map(s => s.trim());

                current[key] =
                    parseValue(value);
            }

            continue;
        }

        // ----------------------------
        // KEY VALUE
        // ----------------------------
        const match =
            line.match(/^([a-zA-Z0-9_]+):\s*(.+)$/);

        if (match && current) {

            const [, key, value] = match;

            current[key] = parseValue(value);
        }
    }

    if (current) {
        swaps.push(current);
    }

    return swaps;
}

function parseValue(value) {

    // ----------------------------
    // BOOLEAN
    // ----------------------------
    if (value === "true") return true;
    if (value === "false") return false;

    // ----------------------------
    // NULL
    // ----------------------------
    if (value === "null") return null;

    // ----------------------------
    // NUMBER
    // ----------------------------
    if (!isNaN(value) && value.trim() !== "") {
        return Number(value);
    }

    // ----------------------------
    // STRING
    // ----------------------------
    return value.replace(/^"(.*)"$/, "$1");
}