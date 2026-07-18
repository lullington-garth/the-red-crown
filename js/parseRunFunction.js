// parseRunFunction.js

export function parseRunFunction(lines = [], header = "runFunction:") {

    const functions = [];

    let current = null;

    for (const line of lines) {

        const trimmed = line.trim();

        // ----------------------------
        // NEW ENTRY
        // ----------------------------

        if (trimmed.startsWith("- ")) {

            if (current) {
                functions.push(current);
            }

            current = {};

            const match = trimmed.match(/- (\w+):\s*"?(.*?)"?$/);

            if (match) {

                current[match[1]] = match[2];
            }

            continue;
        }

        // ----------------------------
        // PROPERTY
        // ----------------------------

        if (current) {

            const match = trimmed.match(/^(\w+):\s*"?(.*?)"?$/);

            if (match) {

                current[match[1]] = match[2];
            }
        }
    }

    if (current) {
        functions.push(current);
    }

    return functions;
}