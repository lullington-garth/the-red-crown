// variableMapChoicesStones.js

export function resolveStonesVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "environmentBleedStones":
            if (wizard === "green") { return `As the path winds through rolling countryside, you begin to notice wildflower blooms appearing along the roadside. Their colours and flora are alien both to the Realm of Man and to the season you are currently in. Trees bear blossoms and mismatched fruit upon the same branch, while butterflies with jewel-like wings drift lazily through the air, leaving faint trails of sparkling light behind them.`;}
            if (wizard === "yellow") { return `As the path winds through rolling countryside, you begin to notice subtle changes in the world around you. Wisps of cloud drift low across the landscape, their shapes lingering amongst the hills before dissolving into the air. You spot a flock of white cloud gulls, not native to the realms of man, in elegant formations in the skies above, and somehow the sunlight feels different, softer and warmer, bathing the land in a tranquil glow that fills you with an unexpected sense of calm.`;}
            if (wizard === "blue") { return `As the path winds through rolling countryside, you begin to notice subtle changes in the world around you. The air carries the faint scent of salt despite the sea being many miles away. Puddles gather in roadside hollows, their surfaces reflecting  constellations glittering in a midnight firmament. You spot shelled creatures and fragments of coral scattered amongst the undergrowth, looking both exotic and alien in their woodland surroundings.`;}
         
        case "passingStones":
            if (wizardYou === "green") { return `Of the other three arches, you recognise your own, carved to resemble two interwoven trees, their trunks rich with forest life. To the left of your arch stands that of Solarius, the realm of stars and seas. His black, glittering arch appears almost fluid in design. Creatures of the deep are carved into the stone, glittering like stars as the afternoon sun reflects from the rock's glass-like surface. The last archway, that of Lo Tae Zhao, is the most delicate of the three. White marble twists into the air, sculpted into cloud-like forms through which carved birds and dragons swoop.`;}
            if (wizardYou === "yellow") { return `Of the other three arches, you recognise your own, the most delicate of the three. White marble twisting into the air, sculpted into cloud-like forms through which carved birds and dragons swoop. To its left stands Carolinus’s gateway carved to resemble two interwoven trees, their trunks rich with forest life. The last archway, that of Solarius, the realm of stars and seas is a black, glittering arch, almost fluid in design. Creatures of the deep are carved into the stone, glittering like stars as the afternoon sun reflects from the rock's glass-like surface.`;}
            if (wizardYou === "blue") { return `Of the other three arches, you recognise your own, a black, glittering arch almost fluid in design. Creatures of the deep are carved into the stone, glittering like stars as the afternoon sun reflects from the rock's glass-like surface. To its right stands Carolinus’s gateway carved to resemble two interwoven trees, their trunks rich with forest life. The last archway, that of Lo Tae Zhao, is the most delicate of the three. White marble twists into the air, sculpted into cloud-like forms through which carved birds and dragons swoop.`;}
        
        case "archImage":

            if (wizardYou === "green") {
                return "greenArch.jpg";
            }
            if (wizardYou === "yellow") {
                return "yellowArch.jpg";
            }
            if (wizardYou === "blue") {
                return "blueArch.jpg";
            }    
            if (wizardYou === "red") {
                return "standingStones.jpg";
            }    

        default:
            return null;
    }
}