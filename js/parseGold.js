//parseGold.js

export function parseGold(lines) {

    if (!lines || !Array.isArray(lines)) {
        return 0;
    }

    for (const rawLine of lines) {

        if (!rawLine) continue;

        const trimmed =
            rawLine.replace(/\r/g, "").trim();

        const lower =
            trimmed.toLowerCase();

        // -----------------------------
        // PICKUP GOLD
        // -----------------------------

        if (lower.startsWith("pickupgold:")) {

            const value =
                trimmed.split(":")[1]?.trim();

            const numeric =
                Number(value);

            return Number.isNaN(numeric)
                ? value
                : numeric;
        }

        // -----------------------------
        // LOSE GOLD
        // -----------------------------

        if (lower.startsWith("losegold:")) {

            const value =
                trimmed.split(":")[1]?.trim();

            const numeric =
                Number(value);

            return Number.isNaN(numeric)
                ? `-${value}`
                : -numeric;
        }
    }

    return 0;
}