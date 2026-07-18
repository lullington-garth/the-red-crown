// parseEffects.js

export function parseEffects(lines) {
    const effects = [];
    let current = null;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith("-")) {
            if (current) effects.push(current);
                current = {
                    stat: null,
                    value: 0,
                    total: null,
                    equals: null
                };

            // ✅ handle inline "- stat: MAGIC"
            const inline = trimmed.slice(1).trim();
            if (inline.includes(":")) {
                const [key, val] = inline.split(":").map(s => s.trim());
                if (key === "stat") current.stat = val;
                if (key === "value") {
                    const num = Number(val);
                    current.value = isNaN(num) ? val : num;
                }
                if (key === "total") {
                    const num = Number(val);
                    current.total = isNaN(num) ? val : num;
                }
            }

            continue;
        }

        if (!current) continue;

        // ✅ generic key:value parsing (robust)
        if (trimmed.includes(":")) {
            const [key, val] = trimmed.split(":").map(s => s.trim());

            if (key === "stat") {
                current.stat = val;
            }

            if (key === "value") {
                const num = Number(val);
                current.value = isNaN(num) ? val : num;
            }
            if (key === "total") {
                const num = Number(val);
                current.total = isNaN(num) ? val : num;
            }

            if (key === "equals") {
                const num = Number(val);
                current.equals = isNaN(num) ? val : num;
            }
        }
    }

    if (current) effects.push(current);

    return effects;
}