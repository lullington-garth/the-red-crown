// variableMapChoicesRift.js

export function resolveRiftVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {
          
        case "riftEnter":
            if (wizard === "green") { return `Descending the hillside, you eventually reach a narrow stream flowing through a shallow gully. The water is clear and cold, its surface sparkling beneath the pale light of the realm. A line of ancient stepping stones crosses the stream, while a strange silver haze hangs motionless above them.

As you draw closer, you realise that the haze is not mist at all. Thin ripples drift through the air like disturbed water. They are tears between the realms.

You move carefully out onto the centre of the crossing to study them.

With a wrenching roar, the world tears apart beneath your feet as a rift between realms opens. Water tumbles in to howling maw, as the rift rips a gash in reality.

The stepping stones now hang between world. Suspended above a vast black abyss. The far bank still remains ahead of you, while the hillside behind has become little more than a distant ledge. Below there is only darkness without end.

Your heart races.

Should one of the stones shift, or should something emerge from one of the tears above or below you, there will be nowhere to escape. One false step would send you plunging into the endless void below.

You begin making your way carefully towards the opposite bank. Your route to the bank is hindered further by the rifts above and to the side. You have to manoeuvre around them where they obstruct the path while trying to keep to the stones.

You are edging around one such rift when you see your own realm. Not merely your world, but your home. You are peering through a hole in the sky at your library, where resting upon a nearby table, tantalisingly close to the rift edge, is one of the most powerful spellbooks in your possession.`;}
            if (wizard === "yellow") { return `The island is little more than a rock suspended in the sky, and it takes a considerable amount of courage to step onto the tiny platform. Nothing surrounds you but endless blue heavens, while only a low, unguarded ring of stone prevents you from plunging into the abyss below. Your unease is worsened by the thin mist hanging in the air and the smooth, unadorned stone beneath your feet, which is dangerously slippery.

Trying to ignore the fact that a single false step could mean certain death, you move closer to investigate the rippling lines that first caught your attention from the safety of the bridge. At close range it becomes all too clear what they are, and the knowledge does nothing to calm your nerves.

You are in terrible danger here.

The ripples are thin tears between the realms. They are the source of the distant thunder and the violent tremors that have plagued this place. Should another quake strike now, or should something emerge from one of these rifts, you would have nowhere to run.

As you carefully turn to leave the island, something catches your eye. Through one of the tears you can see your own world. More than that, you can see your own home.

Beyond the shimmering opening lies your library. Resting upon a nearby table is one of the most powerful spellbooks in your possession.`;}
            if (wizard === "blue") { return `The cave climbs through the crooked finger of stone like a wound carved into the rock itself. Rough-hewn steps have been cut into the interior, spiralling upwards through the darkness. The sound of the sea echoes constantly below, while cold starlight spills down from somewhere high above.

The climb is long and treacherous. The steps are worn smooth by age and damp with salt, and more than once you are forced to steady yourself against the rough walls as the distant crash of waves reverberates through the stone.

At last you emerge onto the pinnacle of the rocky finger.

The summit is little more than a narrow shelf of stone exposed to the night air. Far below, black rocks rise from the star spotted sea while white foam breaks endlessly against them. Above you the heavens blaze.

It is there that you see the rippling distortions. Thin lines shimmer in the air overhead, bending the starlight around them. As you draw closer, your heart sinks. They are tears between the realms. Their presence explains the strange tremors and distant rumblings that have troubled this place.

You realise that you are in grave danger here. Should the stone beneath your feet shift, or should something emerge from one of these wounds in the sky, there would be nowhere to flee. One misstep would send you tumbling down the jagged cliffs to the rocks and crashing sea below.

As you turn carefully to descend, you glimpse your own world through one of the tears. Not just your world, but your home, your library. Through the rift, upon a tantalisingly close table, is one of the most powerful spellbooks in your possession.`;}   
            
        case "riftEnterChoice1":
            if (wizard === "green") { return `Will you try to reach through the rift and try and take the book?`;}
            if (wizard === "yellow") { return `Will you try to reach through the rift and try and take the book?`;}
            if (wizard === "blue") { return `Will you try to reach through the rift and try and take the book?`;}   
            
        case "riftEnterChoice2":
            if (wizard === "green") { return `Would you rather leave it alone and continue your treacherous path to the far bank?`;}
            if (wizard === "yellow") { return `Would you rather leave it well alone and cross to the bridge on the far side?`;}
            if (wizard === "blue") { return `Would you rather leave it well alone and descend the steps?`;}   
            
        case "riftBook":
            if (wizard === "green") { return `Taking a deep breath, you steady yourself upon the narrow stone and reach through the rift into your library back home. The sensation is profoundly disturbing, with part of your body existing in one realm while the rest remains in another.

The tear is barely wide enough to admit your arm, and you dare not widen it for fear of disturbing the fragile boundary between the worlds. Stretching to the limit of your reach, you manage to brush the edge of the precious volume with your fingertips.

Straining every muscle, you slowly draw the book towards you until at last your fingers close around it. With great care, you pull the spellbook through the rift.

The instant it passes into this realm, the stepping stones shudder violently.

Cracks spread across the surrounding tears and the abyss below stirs. For one horrifying moment you lose your balance, your arms windmilling as the darkness yawns beneath your feet. You are certain that you are about to tumble from the stones and disappear forever into the void.

But the trembling subsides. You recover your balance.`;}
            if (wizard === "yellow") { return `Taking a deep breath, you plant your feet firmly and reach through the rift into your library back home. The sensation is deeply unsettling, with part of your body existing in one realm while the rest remains in another.

The tear is barely wide enough to admit your arm, and you dare not widen it for fear of triggering another quake. Stretching to the very limit of your reach, you manage to touch the edge of the precious volume with your fingertips.

Straining every muscle, you slowly pull the book towards you. At last your fingers close around it. With great care, you draw the spellbook through the rift.

The moment it passes fully into this realm, the sky roars.

The tiny platform shudders violently beneath your feet. For one terrifying moment you are certain that you will be hurled into the endless sky, but the tremor quickly passes.`;}
            if (wizard === "blue") { return `Taking a deep breath, you brace yourself against the stone and reach through the rift into your library back home. The sensation is deeply unsettling, with part of your body existing within one realm while the rest remains in another.

The tear is barely wide enough to admit your arm, and you dare not widen it for fear of disturbing the fragile wound between the worlds. Stretching to the very limit of your reach, you manage to brush the edge of the precious volume with your fingertips.

Straining every muscle, you slowly draw the book closer until at last your fingers close around it. With great care, you pull the spellbook through the rift.

The instant it passes into this realm, the sea roars below.

The pinnacle trembles violently beneath your feet. Loose stones break away from the cliff and plunge into the darkness below. For one terrifying moment you are certain that you will lose your footing and fall to the black rocks and crashing waves beneath.

But the tremor passes.`;}   
            
        case "riftBookChoice":
            if (wizard === "green") { return `Heart pounding, you regain your balance and secure your prize.`;}
            if (wizard === "yellow") { return `Heart pounding, you regain your balance and secure your prize.`;}
            if (wizard === "blue") { return `Heart pounding, you regain your footing and secure your prize.`;}                          
            
        case "riftLeave":
            if (wizard === "green") { return `With immense relief, you leap from the final stone onto solid ground. You quickly put as much ground between you and the gaping maw as possible, scrambling up the long bank on the far side of where the stream used to be. The slope is steep and overgrown, but you hardly notice.

You slow down as your nerves settle, continuing the climb at a gentler rate and eventually reaching its summit and pausing to look out across the land beyond.

Below lies a deep valley filled with dense forest. Ancient trees crowd together beneath a canopy of green, their branches concealing much of the woodland floor. Towards the centre of the forest you can see a faint silvery glow shining among the trees.`;}
            if (wizard === "yellow") { return `The moment you step onto the bridge beyond the island, with its reassuring handrails and solid footing, some of your fear begins to fade. The bridge stretches for a great distance, spanning the gulf between the tiny platform behind you and the vast landmass ahead. Calling it a mainland hardly seems appropriate, for the enormous island resembles an entire city suspended among the clouds.

Looking to your left, you can see several other long bridges extending from distant settlements and joining the great floating landmass ahead.`;}
            if (wizard === "blue") { return `The moment you begin your descent, your fears slowly begin to ease. The narrow summit is left behind and the enclosing walls of the cave offer a welcome sense of shelter. Although the distant roar of the sea still echoes through the stone, the danger no longer feels quite so immediate.

Eventually the rough steps lead you back down to the silver sands.

Taking in your surroundings there is only one sensible path forward.

Far away beneath the vast canopy of stars, you can make out the dark outline of an enormous arch standing against the night sky. Distance is difficult to judge within this vast realm, and the structure may lie many miles away, yet you feel certain that it is important. Its size alone marks it as significant, but something deeper draws your attention towards it, as though it forms an essential part of your journey.`;}   
            
        case "riftLeaveChoice":
            if (wizard === "green") { return `With only one route open to you, you make your way down the hillside towards the forest below.`;}
            if (wizard === "yellow") { return `You cross the remaining distance and step onto the firmer ground beyond.`;}
            if (wizard === "blue") { return `You set out across the silver sands towards the distant arch.`;}     

        case "replenishment":
            if (wizardYou === "green") { return `MAGIC`;}
            if (wizardYou === "yellow") { return `STAMINA`;}
            if (wizardYou === "blue") { return `LUCK`;}  
            if (wizardYou === "red") { return `SKILL`;}  

        case "yourRiftBook":
            if (wizardYou === "green") { return `Spellbook - Gold and Green`;}
            if (wizardYou === "yellow") { return `Spellbook - Light of the Open Sky`;}
            if (wizardYou === "blue") { return `Spellbook - The Deepness Dark`;}  
            if (wizardYou === "red") { return `Spellbook - The Deepness Dark`;}  

        default:
            return null;
    }
}