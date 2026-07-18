// parseStatChecks.js

export function parseStatCheck(lines) {
    const items = [];
    let current = null;

    for (const rawLine of lines) {
        const line = rawLine.trim();

        // skip header
        if (line === "statCheck:") continue;

        // new item
        if (line.startsWith("-")) {
            if (current) items.push(current);

            current = {
                stat: null,
                dice: null
            };

            // inline "- stat: X"
            const inline = line.slice(1).trim();

            if (inline) {
                const [k, ...rest] = inline.split(":");
                if (k === "stat") current.stat = rest.join(":").trim();
                if (k === "dice") current.dice = Number(rest.join(":").trim());
            }

            continue;
        }

        if (!current) continue;

        const [key, ...rest] = line.split(":");
        if (!key) continue;

        const value = rest.join(":").trim();

        if (key === "stat") current.stat = value;
        if (key === "dice") current.dice = Number(value);
        if (key === "successTo") current.successTo = value;
        if (key === "failTo") current.failTo = value;
    }

    if (current) items.push(current);

    return items;
}