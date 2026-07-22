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
            You emerge into the entrance hall of {playerStats.visitingBrotherName}’s keep.

            The chamber feels more grown than built. Great living pillars rise from the floor, their bark polished smooth by countless passing hands, while branches weave together overhead into a vaulted canopy of emerald leaves. Warm golden light filters through the foliage from no obvious source, and somewhere nearby you hear the gentle trickle of unseen water. The air carries the rich scent of rain-soaked earth and fresh moss.

            Waiting to greet you is a calm figure dressed in layered robes that seem to shift between bark, woven cloth and drifting mist. Their presence feels rooted in the keep itself, as though they have grown here alongside the ancient trees.

            Inclining their head in welcome, they silently gesture for you to follow.

            You are led deep into {playerStats.visitingBrotherName}’s keep.

            The stone corridors soften as you pass through them, as though the building has forgotten it is made of rock. Golden light ripples across the walls beneath dancing leaf-shadows, though there are no windows to be seen.

            At last your guide stops beside a waiting alcove.

            “Make yourself comfortable,” they say in a deep earthy voice. “{playerStats.visitingBrotherName} will be with you shortly.”

            A bench of living wood curves up beside you, rough to the touch. You take a seat. It is surprisingly comfortable and you rest easy as you breathe in the cool but alien magic.
        `.trim();

        case "audienceKeepLobby.yellow":
            return `
            You emerge into the entrance hall of {playerStats.visitingBrotherName}’s keep.

            The vast chamber appears suspended within an endless sky. Pillars of pale stone rise through drifting clouds before disappearing into brilliant white above. Sunlight pours through the open space without any visible sun, bathing everything in a soft radiance that seems to come from every direction at once.

            Waiting for you is a tall, serene figure wrapped in layered robes that billow gently in a breeze you can barely feel. Their outline shifts like passing weather, dissolving into mist before becoming solid once more.

            They offer a quiet nod and beckon for you to follow.

            You are led deep into the heart of {playerStats.visitingBrotherName}’s keep.

            The corridors shift as you walk—solid one moment, then faintly translucent the next, as though the keep cannot decide whether it is stone or sky. Beneath your feet, the floor feels firm despite the endless sea of rolling clouds below.

            Finally your guide pauses beside a quiet waiting place.

            “Make yourself comfortable,” they say, their voice low and steady like wind through high stone. “{playerStats.visitingBrotherName} will be with you shortly.”

            A bench of cloud-wood forms beside you, solidifying from drifting vapour into pale, gnarled comfort. You sit, supported by the sky itself, breathing in the cool but alien magic.
        `.trim();

        case "audienceKeepLobby.blue":
            return `
            You emerge into the entrance hall of {playerStats.visitingBrotherName}’s submerged keep.

            The circular chamber is enclosed by towering walls of perfectly still water held in place by ancient magic. Beyond them, shimmering shoals of silver fish drift lazily through vast underwater gardens where forests of glowing kelp sway in unseen currents. Blue-green light dances across every surface in slow, hypnotic waves.

            Waiting to receive you is a graceful figure dressed in layered robes woven from seaweed, silk and something almost liquid. Their movements are fluid and effortless, as though they belong more to the sea than to the land.

            Without speaking, they turn and beckon for you to follow.

            You are led deep into {playerStats.visitingBrotherName}’s submerged keep.

            The architecture flows around you, never moving, yet somehow always shifting like distant currents. The walls become great panes of enchanted water filled with drifting rivers, glowing plants and strange pale fish. Every step echoes softly beneath the endless rhythm of the sea.

            Eventually your guide leads you into a quiet waiting chamber.

            “Make yourself comfortable,” the servant says, their voice smooth and distant. “{playerStats.visitingBrotherName} will be with you shortly.”

            A seat forms beside you from compacted currents—fluid until you touch it, then firm as carved coral. You lower yourself onto it. It holds you gently as you breathe in the cool but alien magic.
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