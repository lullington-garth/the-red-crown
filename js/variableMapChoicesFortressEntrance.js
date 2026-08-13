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

        case "brotherOne":
            if (wizard === "yellow") {
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

        case "brotherOneItem":
            if (wizard === "yellow") {
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

        case "yourGiftImage":
            if (wizard === "green") { return "0139.jpg"; }
            if (wizard === "yellow") { return "0035.jpg"; }
            if (wizard === "blue") { return "0033.jpg"; }
            if (wizard === "red") { return "0260.jpg"; }   

        case "brotherOneGiftImage":
            if (wizard === "green") { return "0260.jpg"; }
            if (wizard === "yellow") { return "0139.jpg"; }
            if (wizard === "blue") { return "0035.jpg"; }
            if (wizard === "red") { return "0033.jpg"; }   

        case "brotherTwoGiftImage":
            if (wizard === "green") { return "0033.jpg"; }
            if (wizard === "yellow") { return "0260.jpg"; }
            if (wizard === "blue") { return "0139.jpg"; }
            if (wizard === "red") { return "0035.jpg"; }   

        case "brotherThreeGiftImage":
            if (wizard === "green") { return "0035.jpg"; }
            if (wizard === "yellow") { return "0033.jpg"; }
            if (wizard === "blue") { return "0260.jpg"; }
            if (wizard === "red") { return "0139.jpg"; }   

        default:
            return null;
    }
}