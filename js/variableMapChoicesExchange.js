// variableMapChoicesBathhouse.js

export function resolveExchangeVariable(path, playerStats) {

const wizard = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "cursedRingName":
            if (wizard === "green") { return `The Grave of The Goddess`;}
            if (wizard === "yellow") { return `The Touch of Eternal Peace`;}
            if (wizard === "blue") { return `The Reaper's Luck`;}
            if (wizard === "red") { return `The Finger of Death`;}

        case "cursedRingAttribute":
            if (wizard === "green") { return `with a feeling of nature and magic`;}
            if (wizard === "yellow") { return `with a feeling of peace and tranquility`;}
            if (wizard === "blue") { return `with a feeling of chance and luck`;}
            if (wizard === "red") { return `with a feeling of strength and skill`;}

        case "cursedRingEthos":
            if (wizard === "green") { return `magic`;}
            if (wizard === "yellow") { return `peace`;}
            if (wizard === "blue") { return `luck`;}
            if (wizard === "red") { return `strength`;}
     
        default:
            return null;
    }
}