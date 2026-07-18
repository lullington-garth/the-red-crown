// parseUseItem.js

export function parseUseItem(lines = [], header = "useItem:") {

    const results = [];

    let current = null;

    for (const raw of lines) {

        const line = raw.trim();

        if (!line) continue;

        // ----------------------------
        // NEW ENTRY
        // ----------------------------
        if (line.startsWith("- ")) {

            if (current) {
                results.push(current);
            }

            current = {};

            const inline = line.replace("- ", "");

            if (inline.includes(":")) {

                const [k, ...rest] = inline.split(":");

                current[k.trim()] =
                    rest.join(":").trim();
            }

            continue;
        }

        // ----------------------------
        // KEY VALUE
        // ----------------------------
        if (current && line.includes(":")) {

            const [k, ...rest] = line.split(":");

            current[k.trim()] =
                rest.join(":").trim();
        }
    }

    if (current) {
        results.push(current);
    }

    return results;
}