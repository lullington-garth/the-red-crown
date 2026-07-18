// parseEventForced.js

export function parseEventForced(lines, header = "eventForced:") {

    if (!lines || lines.length === 0) {
        return null;
    }

    const result = {};

    for (const line of lines) {

        const trimmed = line.trim();

        if (trimmed === header) {
            continue;
        }

        // function:
        if (trimmed.startsWith("function:")) {

            result.function = trimmed
                .split("function:")[1]
                .trim()
                .replace(/^"+|"+$/g, "")
                .replace(/^'+|'+$/g, "");

            continue;
        }

        // onWin:
        if (trimmed.startsWith("onWin:")) {

            result.onWin = trimmed
                .split("onWin:")[1]
                .trim();

            continue;
        }

        // variant:
        if (trimmed.startsWith("variant:")) {

            result.variant = trimmed
                .split("variant:")[1]
                .trim()
                .replace(/^"+|"+$/g, "")
                .replace(/^'+|'+$/g, "");

            continue;
        }

        // onLose:
        if (trimmed.startsWith("onLose:")) {

            result.onLose = trimmed
                .split("onLose:")[1]
                .trim();

            continue;
        }
    }

    return result;
}