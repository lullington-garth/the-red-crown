// parseSetFlags.js

export function parseSetFlags(lines = []) {

    const flags = {};

    for (const line of lines) {

        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("-")) continue;

        const [key, rawValue] =
            trimmed.split(":").map(s => s.trim());

        if (!key) continue;

        let value = rawValue;

        // convert booleans
        if (rawValue === "true") value = true;
        if (rawValue === "false") value = false;

        flags[key] = value;
    }

    return flags;
}