// variableMapChoicesSandMurks.js

export function resolveSandmurkVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();

    switch (path) {

        case "guardianReveal":
            if (wizard === "green") { return `Ancient trees become taller and more vibrant. Birdsong grows more exotic, almost sliding towards language. You catch fleeting glimpses of fairies, fire blossoms, pixies, willowshank snakes and other magical creatures moving amongst the verdant undergrowth.

It is not long before the path ends, breaking into a vast woodland glade.

Waiting there is an enormous figure.

He resembles an ancient man carved from living wood. His body is draped in moss and ivy, while a magnificent rack of antlers rises from his brow. In one hand he carries a great staff fashioned from an oak sapling. His ancient eyes gleam in the forest light, following you as you approach.`;}
            if (wizard === "yellow") { return `The trees grow thinner and more graceful, their branches reaching upwards as though yearning to touch the sky. Shafts of sunlight pierce the canopy, turning the woodland floor into a sea of gold and silver. The air feels lighter here, almost buoyant, while drifting wisps of cloud wrap themselves lazily around the highest branches.

The cries of woodland birds gradually become softer and more exotic. You start to spot tiny breeze sprites darting through the trees like living gusts of wind, laughing as they vanish from sight. High above, you glimpse majestic stormhawks circling amongst banks of silver cloud, their feathers crackling faintly with distant lightning.

It is not long before the path comes to an end, emerging onto a broad hilltop meadow. The forest falls away behind you, revealing an endless expanse of sky.

Waiting there is an enormous figure. He resembles a giant sculpted from wind and cloud. Billowing vapours coil constantly around his powerful frame, while robes of white mist trail from his shoulders like banners caught in an eternal gale. Vast wings of gleaming feathers stretch from his back, their tips disappearing into the clouds overhead.

In one hand he carries a great spear fashioned from a bolt of lightning. A crown of golden feathers encircles his brow, while his eyes shine with the brilliance of the midday sun.

The wind gathers around him as you approach, bending the grass and stirring your cloak. Though he stands motionless, there is a sense of immense power contained within his towering form, like a storm waiting for the moment to break.`;}
            if (wizard === "blue") { return `The spaces between the trees seem wider, allowing glimpses of inky skies and drifting lights. Leaves shimmer with colours less natural; deep blues and silvers. Golden motes float through the air as the birdsong fades, replaced by lilting musical tones echoing through the canopy above.

You catch fleeting glimpses of creatures moving amongst the shadows. Tiny silver and gold stardrakes coil between the branches. Pale voidmoths drift silently through the air on sparkling wings, sending the golden motes swirling.

It is not long before the path comes to an end, breaking into a vast clearing.

Waiting there is an enormous figure. He resembles a giant fashioned from the night sky itself. His body is formed of darkness deeper than shadow, threaded through with countless stars that pulse and glitter beneath his skin. Great rings of pale light orbit his broad shoulders, while a crown of crystalline horns rises from his brow, glowing with the colours of distant nebulae.

In one hand he carries a towering crystal staff. His ancient eyes burn with the cold radiance of twin stars, fixed upon you as you approach.`;}

        case "guardianImage":

            if (wizard === "green") {
                return "greenGuardian.jpg";
            }

            if (wizard === "yellow") {
                return "yellowGuardian.jpg";
            }

            if (wizard === "blue") {
                return "blueGuardian.jpg";
            }            

        case "realmEntrance":
            if (wizard === "green") { return `Behind him, what you had taken to be a curtain of hanging willow branches shimmers with emerald light. The guardian steps aside and gestures towards it.`;}
            if (wizard === "yellow") { return `Behind him, what you had taken to be a wall of cloud parts momentarily, revealing a curtain of radiant sunlight hanging in the air. The glowing veil shimmers with gold and silver light. The guardian steps aside and gestures towards it.`;}
            if (wizard === "blue") { return `Behind him, what you had taken to be a patch of empty darkness suddenly stirs with motion. Countless stars ignite across its surface, forming a shimmering curtain of silver and violet light. The guardian steps aside and gestures towards it.`;}

        case "guardianCry":
            if (wizard === "green") { return `animal-like cry`;}
            if (wizard === "yellow") { return `thunderous bellow`;}
            if (wizard === "blue") { return `ethereal cry`;}
            
        default:
            return null;
    }
}