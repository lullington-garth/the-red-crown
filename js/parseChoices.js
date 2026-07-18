// parseChoices.js

export function parseChoices(lines) {
    const choices = [];
    let current = null;

    for (const line of lines) {
        const trimmed = line.trim();

        // ----------------------------
        // ARRAY ENTRIES
        // ----------------------------

        if (
            current &&
            Array.isArray(current.requiresItemOwned) &&
            trimmed.startsWith("-") &&
            !trimmed.startsWith("- text:") &&
            !trimmed.startsWith("- to:")
        ) {

            current.requiresItemOwned.push(
                trimmed
                    .slice(1)
                    .trim()
                    .replace(/['"]/g, "")
            );

            continue;
        }

        // NEW CHOICE
        if (trimmed.startsWith("-")) {
            if (current) choices.push(current);

            current = { text: "Continue", to: null };

            // ✅ HANDLE INLINE: "- text: Something"
            const inline = trimmed.slice(1).trim(); // remove "-"

            if (inline.startsWith("text:")) {
                const value = inline.split("text:")[1].trim();

                if (value) {
                    current.text = value; // inline string
                } else {
                    current.text = {}; // start of object block
                }
            }

            if (inline.startsWith("to:")) {
                current.to = inline.split("to:")[1].trim();
            }

            continue;
        }

        if (!current) continue;

        // MULTILINE SUPPORT
        if (trimmed.startsWith("text:")) {
            const value = trimmed.split("text:")[1].trim();

            if (value) {
                current.text = value;
            } else {
                current.text = {};
            }
            continue;
        }

        // Handle nested text values
        if (current && typeof current.text === "object") {
            const [key, val] = trimmed.split(":").map(s => s.trim());
            if (key && val) {
                current.text[key] = val;
            }
        }

        if (trimmed.startsWith("to:")) {
            current.to = trimmed.split("to:")[1].trim();
        }
        if (trimmed.startsWith("check:")) {
            current.check =
                trimmed.split("check:")[1].trim();
        }

        if (trimmed.startsWith("condition:")) {
            if (!current.toIf) current.toIf = {};

            current.toIf.condition =
                trimmed.split("condition:")[1].trim();
        }

        if (trimmed.startsWith("true:")) {
            if (!current.toIf) current.toIf = {};

            current.toIf.true =
                trimmed.split("true:")[1].trim();
        }

        if (trimmed.startsWith("false:")) {
            if (!current.toIf) current.toIf = {};

            current.toIf.false =
                trimmed.split("false:")[1].trim();
        }
        if (trimmed.startsWith("requiresItem:")) {
            current.requiresItem = trimmed.split("requiresItem:")[1].trim().replace(/['"]/g, "");
        }
        if (trimmed.startsWith("requiresItemOwned:")) {

            const value = trimmed
                .split("requiresItemOwned:")[1]
                .trim();

            // Array mode
            if (!value) {
                current.requiresItemOwned = [];
            }
            else {
                current.requiresItemOwned =
                    value.replace(/['"]/g, "");
            }

            continue;
        }

        if (trimmed.startsWith("requiresItemWorn:")) {
            current.requiresItemWorn =
                trimmed.split("requiresItemWorn:")[1].trim().replace(/['"]/g, "");
        }

        if (trimmed.startsWith("requiresItemType:")) {
            current.requiresItemType =
                trimmed
                    .split("requiresItemType:")[1]
                    .trim()
                    .replace(/['"]/g, "");
        }

        if (trimmed.startsWith("requiresMagicalItem:")) {

            current.requiresMagicalItem =
                trimmed
                    .split("requiresMagicalItem:")[1]
                    .trim()
                    .toLowerCase() === "true";
        }

        if (trimmed.startsWith("requiresNonMagicalItem:")) {

            current.requiresNonMagicalItem =
                trimmed
                    .split("requiresNonMagicalItem:")[1]
                    .trim()
                    .toLowerCase() === "true";
        }

        if (trimmed.startsWith("requiresCursedItem:")) {

            current.requiresCursedItem =
                trimmed
                    .split("requiresCursedItem:")[1]
                    .trim()
                    .toLowerCase() === "true";
        }

        if (trimmed.startsWith("requiresGold:")) {

            const value =
                trimmed.split("requiresGold:")[1].trim();

            const num = Number(value);

            current.requiresGold =
                Number.isNaN(num)
                    ? value
                    : num;
        }

        if (trimmed.startsWith("requiresTradableItem:")) {

            current.requiresTradableItem =
                trimmed
                    .split("requiresTradableItem:")[1]
                    .trim()
                    .toLowerCase() === "true";
        }

        if (trimmed.startsWith("requiresNull:")) {

            current.requiresNull =
                trimmed
                    .split("requiresNull:")[1]
                    .trim()
                    .replace(/['"]/g, "");
        }

        if (trimmed.startsWith("requiresTrue:")) {

            current.requiresTrue =
                trimmed
                    .split("requiresTrue:")[1]
                    .trim()
                    .replace(/['"]/g, "");
        }

        if (trimmed.startsWith("state:")) {
            current.state = trimmed.split("state:")[1].trim().replace(/['"]/g, "");
        }
        if (trimmed.startsWith("onFail:")) {
            current.onFail = trimmed
                .split("onFail:")[1]
                .trim()
                .replace(/['"]/g, "");
        }
        if (trimmed.startsWith("visitedAlready:")) {
            current.visitedAlready = trimmed
                .split("visitedAlready:")[1]
                .trim()
                .replace(/['"]/g, "");
        }

        if (trimmed.startsWith("onVisited:")) {
            current.onVisited = trimmed
                .split("onVisited:")[1]
                .trim()
                .replace(/['"]/g, "");
        }

        if (trimmed.startsWith("onPass:")) {
            current.onPass = trimmed
                .split("onPass:")[1]
                .trim()
                .replace(/['"]/g, "");
        }
        if (trimmed.startsWith("onWin:")) {
            current.onWin = trimmed
                .split("onWin:")[1]
                .trim()
                .replace(/['"]/g, "");
        }

        if (trimmed.startsWith("onEscape:")) {
            current.onEscape = trimmed
                .split("onEscape:")[1]
                .trim()
                .replace(/['"]/g, "");
        }

        if (trimmed.startsWith("tension:")) {

            current.tension = Number(
                trimmed.split("tension:")[1].trim()
            );

            // fallback safety
            if (Number.isNaN(current.tension)) {
                current.tension = 0;
            }
        }

        if (trimmed.startsWith("tensionBetween:")) {

            current.tensionBetween =
                trimmed
                    .split("tensionBetween:")[1]
                    .trim()
                    .replace(/['"]/g, "");

            continue;
        }

    }
    if (current) choices.push(current);

    return choices;
}