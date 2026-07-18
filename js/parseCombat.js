// parseCombat.js

export function parseCombat(lines, header) {
    let horseAllowed = true;
    let canEscape = true;

    let onWin = null;
    let onEscape = null;

    const enemies = [];

    let inEnemiesBlock = false;
    let enemiesIndent = null;

    for (const line of lines) {
        const trimmed = line.trim();
        const indent = line.search(/\S/); // number of leading spaces

        if (!trimmed || trimmed === header) continue;

        // ---- TOP LEVEL FLAGS ----
        if (trimmed.startsWith("horseAllowed:")) {
            horseAllowed = trimmed
                .split("horseAllowed:")[1]
                .trim()
                .toLowerCase() === "true";
            continue;
        }

        if (trimmed.startsWith("canEscape:")) {
            canEscape = trimmed
                .split("canEscape:")[1]
                .trim()
                .toLowerCase() === "true";
            continue;
        }

        if (trimmed.startsWith("onWin:")) {
            onWin = trimmed
                .split("onWin:")[1]
                .trim();

            continue;
        }

        if (trimmed.startsWith("onEscape:")) {
            onEscape = trimmed
                .split("onEscape:")[1]
                .trim();

            continue;
        }

        // ---- ENTER ENEMY BLOCK ----
        if (trimmed.startsWith("enemies:")) {
            inEnemiesBlock = true;
            enemiesIndent = indent;
            continue;
        }

        // ---- EXIT ENEMY BLOCK ----
        if (inEnemiesBlock && indent <= enemiesIndent && !trimmed.startsWith("-")) {
            inEnemiesBlock = false;
        }

        // ---- ENEMY LIST ----
        if (
            inEnemiesBlock &&
            indent > enemiesIndent &&
            trimmed.startsWith("-")
        ) {
            const content = trimmed
                .slice(1)
                .trim();

            // ----------------------------
            // RESOLVER ENEMY PACK
            // ----------------------------

            if (content.startsWith("resolver:")) {

                const resolver = content
                    .split("resolver:")[1]
                    .trim()
                    .replace(/^"+|"+$/g, "")
                    .replace(/^'+|'+$/g, "");

                enemies.push({
                    resolver
                });

                continue;
            }

            // ----------------------------
            // NORMAL ENEMY
            // ----------------------------

            const enemyId = content
                .replace(/^"+|"+$/g, "")
                .replace(/^'+|'+$/g, "");

            enemies.push({
                enemy: enemyId
            });
        }
    }
    
    return {
        enemies,
        horseAllowed,
        canEscape,
        onWin,
        onEscape
    };
}