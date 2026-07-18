// parseSpecials.js
export function parseSpecial(lines) {

    if (!lines || !lines.length) return null;

    const result = {
        function: []
    };

    let inFunction = false;

    for (const raw of lines) {

        const line = raw.trim();

        // =====================================
        // FUNCTION:
        // =====================================
        if (line === "function:") {
            inFunction = true;
            continue;
        }

        // =====================================
        // FUNCTION ITEMS
        // =====================================
        if (inFunction && line.startsWith("-")) {

            result.function.push(
                line.replace(/^-\s*/, "")
            );

            continue;
        }

        // =====================================
        // EXIT FUNCTION BLOCK
        // =====================================
        if (!line.startsWith("-")) {
            inFunction = false;
        }

        // =====================================
        // KEY: VALUE
        // =====================================
        const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/);

        if (match) {

            const key = match[1];
            let value = match[2];

            // remove quotes
            value = value.replace(/^["']|["']$/g, "");

            // booleans
            if (value === "true") value = true;
            if (value === "false") value = false;

            result[key] = value;
        }
    }

    return result.function.length
        ? result
        : null;
}