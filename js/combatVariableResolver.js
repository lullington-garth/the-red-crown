// combatVariableResolver.js

export function resolveCombatVariable(
    path,
    playerStats,
    visitedNodes
) {

    const wizard = (playerStats.wizardColor || "").toLowerCase();
    const brother = (playerStats.visitingBrother || "").toLowerCase();

    switch (path) {
        case "bathhouseEnemies":
            if (wizard === "green") {
                return ["0016"];
            }
            if (wizard === "blue") {
                return ["0017"];
            }
            if (wizard === "yellow") {
                return ["0018"];
            }
            if (wizard === "red") {
                return ["0019"];
            }

        case "potterEnemies":
            if (wizard === "green") {
                return ["0047"];
            }
            if (wizard === "blue") {
                return ["0048"];
            }
            if (wizard === "yellow") {
                return ["0049"];
            }
            if (wizard === "red") {
                return ["0049"];
            }

        case "realmCreatureEnemies":
            if (brother === "green") {
                return ["0025","0026","0027","0028","0029"];
            }
            if (brother === "blue") {
                return ["0035","0036","0037","0038","0039"];
            }
            if (brother === "yellow") {
                return ["0030","0031","0032","0033","0034"];
            }

        case "enviro2RedEnemies":
            if (brother === "green") {
                return ["0134","0135","0136","0137","0138","0139","0140","0141"];
            }
            if (brother === "blue") {
                return ["0142","0143","0144","0145","0146","0147","0148","0149"];
            }
            if (brother === "yellow") {
                return ["0126","0127","0128","0129","0130","0131","0132","0133"];
            }

        case "prisoner":
            if (brother === "green") {
                return ["0125"];
            }
            if (brother === "blue") {
                return ["0124"];
            }
            if (brother === "yellow") {
                return ["0123"];
            }

        case "poachers":
            if (brother === "green") {
                return ["0117","0118","0119"];
            }
            if (brother === "blue") {
                return ["0120","0121","0122"];
            }
            if (brother === "yellow") {
                return ["0114","0115","0116"];
            }

        case "bryagh": {

            const visited852 = !!visitedNodes?.["852"];
            const visited864 = !!visitedNodes?.["864"];
            const visited861 = !!visitedNodes?.["861"];
            const visited1000 = !!visitedNodes?.["1000"];

            const anyVisited =
                visited852 ||
                visited864 ||
                visited861 ||
                visited1000;

            const anyOtherVisited =
                visited864 ||
                visited861 ||
                visited1000;

            // 852 + any other visited
            if (visited852 && anyOtherVisited) {
                return ["0022"];
            }

            // any single visited
            if (anyVisited) {
                return ["0021"];
            }

            // none visited
            return ["0020"];
        }

        case "treeSentinel": {

            const visited928 = !!visitedNodes?.["928"];

            if (visited928) {
                return ["0057"];
            }else{
                return ["0058"];
            }
        }

        case "ogreOfGormleyKeep": {

            const visited719 = !!visitedNodes?.["719"];

            if (visited719) {
                return ["0083"];
            }else{
                return ["0082"];
            }
        }

        case "wormHorde": {

            switch (playerStats.wormHordeRoll) {

                case 1:
                    return ["0089","0090","0091"];

                case 2:
                    return ["0089","0090","0091","0092"];

                case 3:
                    return ["0089","0090","0091","0092","0093"];

                case 4:
                    return ["0089","0090","0091","0092","0093","0094"];

                case 5:
                    return ["0089","0090","0091","0092","0093","0094","0095"];

                case 6:
                    return ["0089","0090","0091","0092","0093","0094","0095","0096"];

                default:
                    return ["0089","0090","0091"];
            }
        }

        }

    return [];
}