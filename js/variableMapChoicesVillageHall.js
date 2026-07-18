// variableMapChoicesVillageHall.js

export function resolveVillageHallVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "villageHallScene":
            if (wizard === "green") {
                return `She turns the talk to the virtues of the realms, and you are thrilled when she brings to focus the realm of nature enchantment, of roots, rivers and living forests. Your realm. She raises her hands and the hall itself begins to transform.

The wooden floor softens beneath your feet into thick moss and roots. Towering trees rise impossibly around the audience while silver shafts of moonlight filter through emerald leaves far overhead. You hear birdsong in the distance and somewhere nearby a stream trickles softly across smooth stones. The scent of pine, rain and rich earth fills the air completely.

The illusion is so convincing that for several moments you almost believe yourself truly home once again.`;
            }
            if (wizard === "yellow") {
                return `She turns the talk to the virtues of the realms, and you are thrilled when she brings her attention to the dominion of the open sky, endless clouds and the high heavens above the world. Your realm. She raises her hands and the hall itself begins to transform.

                The wooden floor beneath your feet fades into a vast sea of white cloud, soft and luminous beneath your feet. Immense towers of cloud drift slowly around the hall, their edges glowing gold and silver beneath the light of the sun, while far below, the land stretches endlessly across the horizon. Sunlight fills the hall completely, bathing the audience in a stream of golden light as they sit in the radiance of the endless sky.
                
                The illusion is so convincing that for several moments you almost believe yourself truly home once again.`;
            }
            if (wizard === "blue") {
                return `She turns the talk to the virtues of the realms, and you are thrilled when she brings her attention to the dominion of the cosmos and the endless sea below. Your realm. She raises her hands and the hall begins to transform.

                The wooden floor beneath your feet darkens into the shifting surface of a deep midnight ocean, its waters lapping gently around your feet. Far below, faint shapes move through the blue abyss while above the audience the ceiling dissolves entirely into an infinite night sky alive with stars, spiralling constellations and drifting clouds of silver light. Vast galaxies turn slowly overhead as the hush of rolling tides and the scent ocean air fills the hall completely.
                
                The illusion is so convincing that for several moments you almost believe yourself truly home once again.`;
            }
            if (wizard === "red") {
                return `She turns the talk to the virtues of the realms, and you are interested when she brings her attention to the dominion of the power, dominance and conflict. Your realm. She raises her hands and the hall itself begins to transform.

                The wooden floor beneath your feet fractures and dissolves into deep crimson sand, hot beneath your feet. Slow winds sweep across the chamber as vast dunes rise around the audience like frozen waves. Far in the distance jagged black mountains spear upward against the horizon, their towering silhouettes sharp as broken blades.

                Above, the ceiling darkens into a churning sky thick with immense rolling clouds. Great storms coil across the heavens, lit from within by distant flashes of red and gold lightning. Dust swirls through the air in twisting currents while the wind howls across the wasteland with a low, endless roar.

                Not bad, you think, but it lacks somewhat in the sheer harsh adversity of your home realm.`;
            }      
            
        case "villageHallWhisper":
            if (wizard === "green") {
                return `Caught in the moment, will you lean over to the person beside you and whisper how truly amazing this all is?`;
            }
            if (wizard === "yellow") {
                return `Caught in the moment, will you lean over to the person beside you and whisper how truly amazing this all is?`;
            }
            if (wizard === "blue") {
                return `Caught in the moment, will you yell out I WILL BRING WHALES!?`;
            }
            if (wizard === "red") {
                return `Will you boo the princess, prickled by the weak imitation of your homeland?`;
            }   

        case "villageHallImage":

            if (wizard === "green") {
                return "villageHallGreen.jpg";
            }

            if (wizard === "yellow") {
                return "villageHallYellow.jpg";
            }

            if (wizard === "blue") {
                return "villageHallBlue.jpg";
            }

            if (wizard === "red") {
                return "villageHallRed.jpg";
            }            

        default:
            return null;
    }
}