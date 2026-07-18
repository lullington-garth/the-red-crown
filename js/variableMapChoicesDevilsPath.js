// variableMapChoicesDevilsPath.js

export function resolveDevilsPathVariable(path, playerStats) {

    switch (path) {

        case "scribbledMap": {

            const carried =
                playerStats.inventory?.carriedItems || [];

            const worn =
                Object.values(
                    playerStats.inventory?.wornItems || {}
                ).filter(Boolean);

            const ownsMap =
                [...carried, ...worn].some(item =>
                    item.id === "0042" ||
                    item.templateId === "0042"
                );

            if (ownsMap) {
                return `"Ahh, excellent. I see you've held on to my little map. Well, good luck."`;
            }

            return "";
        }
            
        default:
            return null;
    }
}