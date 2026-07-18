// variableMapChoicesFortressEntrance.js

export function resolveFortressEntranceVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "yourItem":
            if (wizard === "green") {
                return `leaf-shaped amulet`;
            }
            if (wizard === "yellow") {
                return `small alchemical flask`;
            }
            if (wizard === "blue") {
                return `crystalline quill`;
            }
            if (wizard === "red") {
                return `onyx wand`;
            }      

        case "brotherOneItem":
            if (wizard === "Yellow") {
                return `leaf-shaped amulet`;
            }
            if (wizard === "blue") {
                return `small alchemical flask`;
            }
            if (wizard === "red") {
                return `crystalline quill`;
            }
            if (wizard === "green") {
                return `onyx wand`;
            } 

        case "brotherTwoItem":
            if (wizard === "blue") {
                return `leaf-shaped amulet`;
            }
            if (wizard === "red") {
                return `small alchemical flask`;
            }
            if (wizard === "green") {
                return `crystalline quill`;
            }
            if (wizard === "yellow") {
                return `onyx wand`;
            } 

        case "brotherThreeItem":
            if (wizard === "red") {
                return `leaf-shaped amulet`;
            }
            if (wizard === "green") {
                return `small alchemical flask`;
            }
            if (wizard === "yellow") {
                return `crystalline quill`;
            }
            if (wizard === "blue") {
                return `onyx wand`;
            } 

        case "brotherOne":
            if (wizard === "Yellow") {
                return `Carolinus`;
            }
            if (wizard === "blue") {
                return `Lo Tae Zhao`;
            }
            if (wizard === "red") {
                return `Solarius`;
            }
            if (wizard === "green") {
                return `Ommadon`;
            } 

        case "brotherTwo":
            if (wizard === "blue") {
                return `Carolinus`;
            }
            if (wizard === "red") {
                return `Lo Tae Zhao`;
            }
            if (wizard === "green") {
                return `Solarius`;
            }
            if (wizard === "yellow") {
                return `Ommadon`;
            } 

        case "brotherThree":
            if (wizard === "red") {
                return `Carolinus`;
            }
            if (wizard === "green") {
                return `Lo Tae Zhao`;
            }
            if (wizard === "yellow") {
                return `Solarius`;
            }
            if (wizard === "blue") {
                return `Ommadon`;
            } 

        case "yourLossMessage":
            if (wizard === "red") {
                return `LOSE 1 STAMINA and 2 SKILL`;
            }
            if (wizard === "green") {
                return `LOSE 1 STAMINA and 2 MAGIC`;
            }
            if (wizard === "yellow") {
                return `LOSE 3 STAMINA`;
            }
            if (wizard === "blue") {
                return `LOSE 1 STAMINA and 2 LUCK`;
            } 

        case "brotherOneGainMessage":
            if (wizard === "Yellow") {
                return `GAIN 2 MAGIC`;
            }
            if (wizard === "blue") {
                return `GAIN 2 STAMINA`;
            }
            if (wizard === "red") {
                return `GAIN 2 LUCK`;
            }
            if (wizard === "green") {
                return `GAIN 2 SKILL`;
            } 

        case "brotherTwoGainMessage":
            if (wizard === "blue") {
                return `GAIN 2 MAGIC`;
            }
            if (wizard === "red") {
                return `GAIN 2 STAMINA`;
            }
            if (wizard === "green") {
                return `GAIN 2 LUCK`;
            }
            if (wizard === "yellow") {
                return `GAIN 2 SKILL`;
            } 

        case "brotherThreeGainMessage":
            if (wizard === "red") {
                return `GAIN 2 MAGIC`;
            }
            if (wizard === "green") {
                return `GAIN 2 STAMINA`;
            }
            if (wizard === "yellow") {
                return `GAIN 2 LUCK`;
            }
            if (wizard === "blue") {
                return `GAIN 2 SKILL`;
            } 

        default:
            return null;
    }
}