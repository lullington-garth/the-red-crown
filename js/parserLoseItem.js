// parserLoseItem.js

export function parseLoseItem(lines = [], header = "loseItemForced:") {

    if (!lines || lines.length === 0) return [];

    const rules = [];

    let current = null;

    for (const raw of lines) {

        const line = raw.trim();

        if (line.startsWith("-")) {
            if (current) rules.push(current);
            current = {};
        }

        const typeMatch = line.match(/type:\s*(\w+)/i);
        if (typeMatch) {
            current.type = typeMatch[1].toLowerCase();
        }

        const itemMatch = line.match(/item:\s*"?([\w]+)"?/i);
        if (itemMatch) {
            current.item = itemMatch[1];
        }
    }

    if (current) rules.push(current);

    return rules;
}