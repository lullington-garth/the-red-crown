// variableMapChoicesAudience.js
import { resolveGiftChoices } from "./mapApplyPickups.js";

export function resolveAudienceVariable(path, playerStats) {
    const wizard = (playerStats.wizardColor || "").toLowerCase();
    const visiting = (playerStats.visitingBrother || "").toLowerCase();
    const potion = (playerStats.absentBrotherEthos || "").toLowerCase();
    const absentBrother = (playerStats.absentBrotherColor || "").toLowerCase();

    // ----------------------------
    // custom computed variables
    // ----------------------------
    switch (path) {

        case "audienceDoor":
            if (wizard === "yellow" && visiting === "blue") {
                return "Heavy Oak Door";
            }
            if (wizard === "yellow" && visiting === "green") {
                 return "Dark Rippling Door";
            }
            if (wizard === "green" && visiting === "blue") {
                return "Cloudy Glass Door";
            }
            if (wizard === "green" && visiting === "yellow") {
                return "Dark Rippling Door";
            }
            if (wizard === "blue" && visiting === "green") {
                return "Cloudy Glass Door";
            }
            if (wizard === "blue" && visiting === "yellow") {
                return "Heavy Oak Door";
            }
            if (wizard === "red" && visiting === "yellow") {
                return "Dark Rippling Door";
            }
            if (wizard === "red" && visiting === "green") {
                 return "Cloudy Glass Door";
            }
            if (wizard === "red" && visiting === "blue") {
               return "Heavy Oak Door";
            }
            return "Heavy Oak Door";

        case "redWizardDoor":
            if (visiting === "blue") {
                return "Cloudy Glass Door";
            }
            if (visiting === "yellow") {
                return "Heavy Oak Door";
            }
            if (visiting === "green") {
                return "Dark Rippling Door";
            }

        case "brotherDoor":
            if (visiting === "blue") {
                return "Dark Rippling Door";
            }
            if (visiting === "yellow") {
                return "Cloudy Glass Door";
            }
            if (visiting === "green") {
                return "Heavy Oak Door";
            }
            break;

        case "otherPotion":
            if (potion === "stamina") {
                return "The Healing Light Potion - A radiant vial glowing with soft golden light";
            }
            if (potion === "luck") {
                return "The Gambit Potion - A dark glass vial swirling with shifting colours";
            }
            if (potion === "magic") {
                return "The Nature's Kiss Potion - A pale green bottle sealed with leaf-shaped wax";
            }
            break;

        case "keyQuestItem":
            if (visiting === "blue") {
                return "The Shield of Saturn";
            }
            if (visiting === "yellow") {
                return "The Flute of Healing Sleep";
            }
            if (visiting === "green") {
                return "The Larva Ring";
            }
            break;

        case "giftList": {
            const gifts = resolveGiftChoices(playerStats, [{ item: "giftChoices" }]);

            const labelMap = {
                "0129": "The Orb of Dragon Fire",
                "0031": "The Helm of True Focus",
                "0289": "The Cloak of Camouflage",
                "0268": "The Staff of Magic",
                "0005": "The Fauldermilk Codex",
                "0132": "A Death Rattle"
            };

            return gifts
                .map(g => {
                    const id = g.item;
                    const name = labelMap[id] || id;
                    return `${name}`;
                })
                .join("\n");
        }

        case "audienceKeepLobby": {
            const visiting = (playerStats.visitingBrother || "").toLowerCase();

            const map = {
                green: "audienceKeepLobby.green",
                yellow: "audienceKeepLobby.yellow",
                blue: "audienceKeepLobby.blue"
            };

            return resolveAudienceVariable(map[visiting] || map.green, playerStats);
        }

        case "audienceKeepLobby.green":
            return `
            You are led deep into {playerStats.visitingBrotherName}’s keep.

            The stone corridors soften as you pass through them, as though the building has forgotten it is made of rock. Golden light filters in from you know not where casting rippling leaf-shadows across the walls, though there are no windows to be seen. Somewhere, water moves through unseen channels, and you catch the faint scent of rain-soaked earth.

            Your guide walks without sound, a calm figure in layered robes that seem to shift between bark, fabric and mist. Their presence feels rooted in the place itself, as if they might have been grown rather than born.

            “Make yourself comfortable,” they say in a deep earthy voice. “{playerStats.visitingBrotherName} will be with you shortly.”

            A bench of living wood curves up beside you, rough to the touch. You take a seat. It is surprisingly comfortable and you rest easy as you breath in the cool but alien magic.
        `.trim();

        case "audienceKeepLobby.yellow":
            return `
            You are led deep into the heart of {playerStats.visitingBrotherName}’s keep. The world below fades away into a drifting white silence.

            The corridors shift as you walk—solid one moment, then faintly translucent the next, as though the keep cannot decide whether it is stone or sky. Soft light pours through everything, directionless and without focus like a dawn remembered. Beneath your feet, the floor feels firm but there is nothing to see but sky and rolling clouds.

            Your guide moves ahead without a sound. They are tall and calm, wrapped in layered robes that billow gently in the chill breeze. Their form shifts like changing weather—edges dissolving into mist, then returning again when you look directly at them.

            “Make yourself comfortable,” they say, voice low and steady, like wind through high stone. “{playerStats.visitingBrotherName} will be with you shortly.”

            A bench of cloud-wood forms beside you as you watch, solidifying from drifting vapour into pale, gnarled comfort. You sit, supported by the sky itself breathing in the cool but alien magic.
        `.trim();

        case "audienceKeepLobby.blue":
            return `
            You are led deep into {playerStats.visitingBrotherName}’s submerged keep. The architecture flows, never moving, but somehow shifting like currents around you.

            The walls are not truly walls, but thick panes of pressurised water held in place by unseen magic. Inside them, entire rivers drift past you, carrying strands of glowing kelp and slow-turning schools of pale, impossible fish. Light fractures through everything in wavering blues and greens, painting the passage in rippling motion even where nothing moves.

            Your guide glides ahead without a sound. They are wrapped in layered robes that cling and billow in equal measure, stitched from seaweed, silk and some kind of liquid maybe. Each step they take leaves a brief swirl in the water which layers the floor without wetting your feet.

            “Make yourself comfortable,” the servant's voice is smooth and distant. “{playerStats.visitingBrotherName} will be with you shortly.”

            A seat forms beside you from compacted currents—fluid until you touch it, then firm as carved coral. You lower yourself onto it. It holds you gently, as you breath in the cool but alien magic.
        `.trim();        

        case "audienceOwnRoom": {
            const visitor = (playerStats.wizardColor || "").toLowerCase();

            const map = {
                green: "audienceOwnRoom.green",
                yellow: "audienceOwnRoom.yellow",
                blue: "audienceOwnRoom.blue"
            };

            return resolveAudienceVariable(map[visitor] || map.green, playerStats);
        }

        case "audienceOwnRoom.green":
            return `
            As you step inside, the room unfolds into a vast, living canopy. Great trees rise impossibly high, their trunks spiralling upward into a ceiling of interwoven branches and drifting leaves. Sunlight filters through in soft, shifting beams, carrying with it the scent of earth, moss, and rain. The ground beneath your feet is rich and uneven, threaded with roots that pulse faintly, as though the whole place shares a single, quiet heartbeat.
        `.trim();

        case "audienceOwnRoom.yellow":
            return `
            As you step inside, you find yourself high above the world. Clouds stretch endlessly in every direction—towering, rolling, luminous—yet somehow contained within the bounds of the room.
        `.trim();

        case "audienceOwnRoom.blue":
            return `
            As you enter the room it is like entering the cosmos or possibly diving into the deepest ocean, infinite, but somehow bound. Stars and planets dart and swirl around you while unimaginable creatures of the deep swim amongst them.
            `.trim();      
 
        case "audienceAbsentRoom": {
            const absent = (playerStats.absentBrotherColor || "").toLowerCase();

            const map = {
                green: "audienceAbsentRoom.green",
                yellow: "audienceAbsentRoom.yellow",
                blue: "audienceAbsentRoom.blue"
            };

            return resolveAudienceVariable(map[absent] || map.green, playerStats);
        }

        case "audienceAbsentRoom.green":
            return `
            You step through into a vast, breathing wilderness, stretching farther than it should be able to. Trees rise in layered canopies, their branches weaving a ceiling that shifts with slow, natural purpose. Light filters down in soft shafts, broken by leaves, vines and branches.
        `.trim();

        case "audienceAbsentRoom.yellow":
            return `
            You step through into endless sky, vast beyond measure yet somehow held in quiet balance. You are suspended within it, neither falling nor standing, as layers of cloud drift past in slow, graceful currents. Light pours around you in shifting bands—gold, pale blue, and silver—folding over one another like coloured inks in water.
        `.trim();

        case "audienceAbsentRoom.blue":
            return `
            The room stretches outward in impossible depth—like sinking through endless water or drifting between distant stars. Light and darkness weave together as glowing orbs sweep past in slow arcs, while vast, unnameable shapes glide silently through the space between them, neither wholly creature nor current.
            `.trim();  
            
        case "advice":
            if (absentBrother === "blue") {
                return "with Ommadon's hand of despair focus you mind against it. It is your best protection";
            }
            if (absentBrother === "yellow") {
                return "an overwhelming number of dragons, become the earth you walk on. Their sight is not so good from great heights";
            }
            if (absentBrother === "green") {
                return "the Worn of Sligoff fire is your friend";
            }
            break;

        case "audienceChamber": {
            const chamber = (playerStats.visitingBrother || "").toLowerCase();

            const map = {
                green: "audienceChamber.green",
                yellow: "audienceChamber.yellow",
                blue: "audienceChamber.blue"
            };
            return resolveAudienceVariable(map[chamber] || map.green, playerStats);
        }

        case "audienceChamber.green":
            return `
            Branches weave and part in slow, natural motion, forming patterns that shift on the breeze. Light filters through in soft, dappled streams—gold, green, and warm amber—drifting across the space as leaves stir high overhead. It feels endless, yet enclosed, as though the forest was grown deliberately around this place. Beneath your feet, the ground is smooth but living—packed earth threaded with roots that pulse faintly underfoot. Moss softens each step, broken now and then by twisted strands of ivy.

            {playerStats.visitingBrotherName} turns, his form echoed faintly in the shifting patterns of root and leaf beneath them.
        `.trim();

        case "audienceChamber.yellow":
            return `
            Layers of cloud drift in vast, slow currents, lit from within by soft, wandering light. Pale gold, silver, and distant blue bleed into one another, forming shifting constellations of weather rather than stars. Beneath your feet, the floor is formed from compressed cloud—smooth, pale, and faintly luminous. It gives just enough to remind you it is not stone, yet holds firm. Far below, through breaks in the drifting layers, deeper clouds churn—vast, slow-moving shapes turning in silence, never fully revealed.

            {playerStats.visitingBrotherName} turns, his form mirrored faintly in the glowing cloud beneath them.
        `.trim();

        case "audienceChamber.blue":
            return `
            Above you, a sky of slow-turning stars stretches into impossible distance, constellations drifting like thoughts on a gentle stream. Below, the floor is a dark, glass-smooth ocean, its surface rippling gently beneath your feet but somehow solid. Shapes move far beneath—vast, silent, unseen in full. Light from the stars fractures across the water, so that you stand suspended between sky and sea, caught in the quiet meeting of both.

            {playerStats.visitingBrotherName} turns, his form reflected endlessly beneath them.
            `.trim();  
        
        default:
            return null;
    }
}