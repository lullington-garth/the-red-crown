// variableMapChoicesEnvironment1.js

export function resolveEnvironment1Variable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();

    switch (path) {

        case "Environment1Arrival":
            if (wizard === "green") { return `As you cross the Realm Border the change in environment is staggering. Ancient forests stretch in every direction, their colossal trunks rising like pillars beneath a canopy of emerald leaves. Sunlight filters through the branches in shafts of gold, illuminating carpets of moss, wildflowers, and winding roots. The air is rich with the scent of earth and quiet enchantment. There is a fragility to it though. You can feel the  immense effort Carolinus is spending to hold it all together and the need to claim Ommadon's crown has never felt more urgent.

A young fawn emerges from the undergrowth and cautiously approaches. It gazes up at you with calm, intelligent eyes before speaking with Carolinus's voice.

"My brother, this fawn has lent me its spirit so that I may speak with you, but I cannot remain for long. My realm is in flux and my magic is waning. I ask that you respect the nature of this place. Should you stray too far from the realm's natural paths, I fear I may no longer be able to keep you here."

The fawn lowers its head for a moment before continuing.

"Within this realm resides Antiquity, eldest of the great trees. You must seek it out. It alone can grant you a silver acorn, and without it our quest will fail. Remember, brother, follow the paths of the realm and respect the balance that dwells here."

The fawn takes a step back.

"Good luck. We shall meet again soon."

With that, the creature turns and bounds gracefully into the forest, vanishing among the trees.`;}
            if (wizard === "yellow") { return `As you cross the Realm Border into Lo Tae Zhao's realm the change in environment  is staggering. The world opens into vast skies and drifting cloudscapes. Marble pathways float upon gentle currents of air, connecting islands of stone suspended high above an endless sea of white. Waterfalls spill from distant clouds only to dissolve into mist before reaching the depths below. Soft winds carry the scent of rain and flowering blossoms, while far-off chimes ring with no visible source. Everything feels serene, weightless, and perfectly at peace.

Yet even here you sense weakness beneath the tranquillity. The realm trembles at its edges and you can feel the tremendous effort Lo Tae Zhao is exerting to maintain this place. Your need to claim Ommadon's crown has never been more apparent.

The wind circles gently around you, carrying with it the familiar voice of Lo Tae Zhao.

"My brother, the wind has lent me its voice so that I may speak with you, but I cannot linger. My realm is in flux and my magic is waning. I ask that you respect the nature of this place. Should you wander too far from the realm's natural paths, I fear I may no longer be able to keep you here."

The wind pauses for a moment before continuing.

"Within this realm resides Antiquity, eldest of the great trees. You must seek it out. It alone can grant you a silver acorn, and without it our quest will fail. Remember, brother, follow the paths of the realm and respect the balance that dwells here."

The breeze softens.

"Good luck. We shall meet again soon."

The wind slowly disperses into the vast skies above, leaving only the distant sound of singing air currents.`;}
            if (wizard === "blue") { return `As you cross the Realm Border into Solarius's realm the change in environment is staggering. The world unfolds into impossible vastness. Above stretches a sky alive with countless stars, constellations burning bright even in the midst of daylight. Great rivers of silver starlight drift between distant celestial bodies, while luminous moons hang like jewels upon the horizon. Below lies an endless ocean of midnight blue, so still and dark that it reflects the heavens perfectly, making it impossible to tell where the sky ends and the sea begins.

Islands of black stone drift upon the waters, their surfaces scattered with strange crystalline formations that glow softly with their own inner light. Far beneath the glass-like surface, vast shadows move through the depths, impossibly large, vanishing into the darkness with a swish of their tails. The air carries the scent of salt and  storm, along with the eerie songs of the creatures that dwell within this realm.

Beneath the beauty though you sense fragility and you can feel the immense strain Solarius is enduring to maintain the balance between the heavens above and the depths below with the barrier between the realms thinning. His power is fading, and your need to claim Ommadon's crown has never felt more urgent.

A single star falls from the heavens. It descends slowly, trailing silver light before coming to rest upon the surface of the sea. As it touches the water, the light unfolds into the form of a great silver fish, its scales shining like constellations. It rises from the dark waters and regards you with ancient eyes. When it speaks, the voice is unmistakably Solarius's.

"My brother, this creature has lent me its form so that I may speak with you, but I cannot remain for long. My realm is in flux and my magic is waning. I ask that you respect the nature of this place. Should you stray too far from the realm's natural paths, I fear I may no longer be able to keep you here."

The silver fish drifts silently for a moment, stars glimmering beneath its scales.

"Within this realm resides Antiquity, eldest of the great trees. You must seek it out. It alone can grant you a silver acorn, and without it our quest will fail. Remember, brother, follow the paths of the realm and respect the balance that dwells here."

The creature slowly lowers itself back toward the water.

"Good luck. We shall meet again soon."

As the fish slips beneath the surface, its form dissolves into  starlight drifting downward into the unfathomable depths below.`;}

        case "Environment1Paths":
            if (wizard === "green") { return `There is only one obvious path through the forest. You follow it until the trees begin to thin, eventually emerging onto the side of a broad hillside overlooking a shallow dell below.

A narrow stream winds its way through the valley floor, forming a natural barrier between you and the slope rising back into the forest on the far side. The ground beneath your boots is soft and damp with the scent of rich earth.

At your feet, a small trickle of water flows down the hillside toward the stream below. Over the years it must have worn the narrow channel into the slope, exposing smooth, flat stones that glitter in the sunlight. The stones, you decide, would provide a relatively easy descent.

To your right, the roots of several ancient trees have pierced through the hillside. Twisted and thick, they form an almost natural staircase descending toward the stream, leading to where a huge tree has fallen at some point cutting across the narrow stream.

Further along, part of the hillside has collapsed, exposing a seam of jagged red stone beneath the soil. Clusters of red and orange alpine flowers cling stubbornly to the rock face, bright splashes of colour against the blood red stone.

Looking in the opposite direction, the banks on either side of the stream rise sharply. Passage would be difficult were it not for a rope bridge spanning the gap. It sways gently in the breeze as leaves rustle softly in the canopy overhead.

Will you...`;}
            if (wizard === "yellow") { return `There is only one obvious path across the cloud-crested plateau. You follow it until the stone beneath your feet gives way to open sky.

Beyond the edge stretches an endless expanse of blue and white. Great floating islands drift lazily amongst the clouds, each connected by means that seem impossible to traverse to your eyes. Even so, they are the only ways on and four clear routes lie before you.

The first leads toward a nearby platform almost entirely concealed by shifting grey mist. The vapour glimmers faintly in the sunlight, resembling a distant raincloud. Tendrils of mist drift across the gap and curl cold around your feet.

To its side and slightly higher, lies a second island covered in tall clumps of orange-gold grass. The strands sway constantly in unseen currents, dancing like tongues of silent flame. A winding trail of sunlit cloud stretches toward it, glowing warmly beneath the great radiant sun overhead.

A third platform lies far below the others. It is close enough horizontally that you could almost leap across if both stood level. As it is though, the drop would a suicidal fall in your realm. You can make little out of the platform itself. It hangs beneath the cloud layer, partially hidden by rolling banks of white vapour.

The final route appears the most straightforward. A simple yet sturdy bridge spans the gap to another floating meadow. The grass, while silver on your side is more natural on the other side of the bridge. You catch glimpses of verdant greens, scrubs of yellow and patches of mossy earth through the drifting clouds.

Will you...`;}
            if (wizard === "blue") { return `There is only one obvious path across the silent waters. You follow it until the black stone beneath your feet narrows into a long natural causeway extending across the mirror-like sea.

Here the waters are perfectly still. The stars above and their reflections below merge into a single endless expanse of light and darkness, making it difficult to judge distance or direction. Ahead, the causeway ends at a circular platform of smooth obsidian stone.

Beyond it lie four possible routes.

The first leads toward a jagged island of crimson rock rising from the sea. Thin streams of glowing lava run between blackened boulders, casting red reflections across the surrounding waters. Above the island hangs a brilliant scarlet star that burns brighter than any other in the heavens, shedding a warm ruby glow across the waves.

To its left lies a great reef of pale stone rising just above the waterline. The island is crowned by a cluster of twisted silver trees. Their roots descend directly into the sea while luminous vines drape between their branches. Strange flowers bloom amongst the foliage, their petals opening and closing in time with the rhythm of the waves.

The third route descends rather than rises. A spiral staircase carved from black crystal winds downward through the surface of the ocean itself. The water parts around the steps without spilling across them, revealing an impossible passage into the depths below. Far beneath, faint lights drift through the darkness like distant stars, while vast shadows move slowly beyond sight.

The final path climbs upward.

A bridge of pale starlight arches gracefully into the sky, leading toward a cluster of floating stone platforms suspended amongst silver clouds. Gentle mists of stardust swirl around the bridge and tiny motes of light dance upon the air. High above, constellations shimmer brightly against the endless blue heavens.

Will you...`;}

        case "Environment1Path1":
            if (wizard === "green") { return `Scramble down the exposed red rock face covered in orange flowers?`;}
            if (wizard === "yellow") { return `Follow the sunlit cloud trail toward the orange-gold grasses?`;}
            if (wizard === "blue") { return `Investigate the volcanic island?`;}

        case "Environment1Path2":
            if (wizard === "green") { return `Head for the rope bridge and cross that way?`;}
            if (wizard === "yellow") { return `Choose the path leading into the shimmering grey mist?`;}
            if (wizard === "blue") { return `Choose the path leading to the silver treed reef?`;}

        case "Environment1Path3":
            if (wizard === "green") { return `Use the ancient tree roots as steps and climb down the bank?`;}
            if (wizard === "yellow") { return `Trust the strange laws of this realm and leap toward the platform below the clouds?`;}
            if (wizard === "blue") { return `Descend the spiralling stair into the deps below?`;}

        case "Environment1Path4":
            if (wizard === "green") { return `Follow the trickling water and descend using the exposed stones as footholds?`;}
            if (wizard === "yellow") { return `Cross the bridge to the distant meadow?`;}
            if (wizard === "blue") { return `Climb the bridge up to the platforms above?`;}

        case "Environment1Red":
            if (wizard === "green") { return `You scramble down the jagged red rock. It is warm, almost hot, its face aligned perfectly to catch the sun at its zenith, probably why the bright red, ember-scented flowers flourish there.

The descent is easy, and it is only as your foot touches the rocky shore of the stream that the first signs of the realm's fragility show themselves. A low rumble fills the air, sending a tremor through the ground and wildlife scampering in all directions. When the tremor subsides, you take in your surroundings.

It is warm down in the dell, warm enough that steam rises from the exposed pebbles at the sides of the stream. To your left is a small opening in the rock face, large enough to get your arm into. A red glow emanates from within, accompanied by a gush of heat.

Peering into the crack, you can see a family of salamanders curled up asleep. The creatures are hoarders and you can see several objects they have collected over the years of considerable value, not least among them what you are sure is a Sky Binders Chain. A highly magical chain that, when snapped, will bring any flying creature to the ground.

Will you...`;}
            if (wizard === "yellow") { return `You step out onto the sunlit cloud path. It is soft and warm beneath your feet. The sun shimmers through the clouds as you traverse the open skies below. While you never actually feel as though you are in danger, you are still happy when you once again feel the hard rock of the floating platform beneath your feet.

It is not a large surface and it is surprisingly warm when you reach it. On closer examination, you notice that the platform is actually a ring, the centre of which is occupied by a hole probably thirty feet across. You are heading through the tall orange grass to examine the opening when you get your first example of the weakening of the realms.

A deep, rumbling tremor resonates through the platform, throwing you to the hard rock below. When it passes, you pick yourself up and cautiously make your way to the large central opening.

The sky below the opening seems to spin on forever and hot air rushes up to meet you as you peer over the lipped edge. What you see, though, is quite unexpected.

In the centre of the opening, apparently asleep and suspended by the air itself, is a large red statuette of a many-armed god with a monkey's head, its beautiful red and gold stone glimmering in the sun, which is now rising over the furthest peak of the small platform.

You are about to edge away when you notice pockets in the rim of the inner circle glinting in the rising sunlight. Gold, silver and other precious metals appear to be sitting in the natural gaps in the rock. You strain to peer through the drifting clouds and realise that the objects appear to be offerings to the monkey god.

You ease your body closer and peer straight down over the edge. Sure enough, below you, in a depression in the rock, is a little pile of treasure, part of which, you notice with a start, is what you are sure is a Sky Binders Chain. A highly magical chain that, when snapped, will bring any flying creature to the ground.

Will you...`;}
            if (wizard === "blue") { return `You make your way across the crimson island. The black volcanic stone radiates warmth beneath your feet while thin streams of lava glow between cracks in the rock. Overhead, the great scarlet star burns brightly, bathing the island in ruby light. As you climb higher, the terrain becomes increasingly jagged until you eventually reach a broad crater near the island's summit.

It is there that you witness the first clear sign of the realms weakening. A deep tremor rolls through the island. The ground shudders violently beneath your feet and molten light pulses through the cracks in the stone. Far above, the red star flickers for a brief moment before returning to its former brilliance.

When the shaking subsides, you cautiously approach the crater's edge.

At its centre lies an enormous fragment of crimson crystal, half buried within the volcanic rock. It glows with a steady inner light, as little geezers of lava pop and spit around it.

Scattered around the crystal between the lava fountains is a wealth of glittering objects, twinkling brightly in the red glow. Coins, gemstones and precious trinkets lie piled amongst the rocks. You appear to have discovered the hoard of some fire-dwelling creature.

You scan around, but there is no sign of it for the moment. Turning back to the treasure below you notice what you are sure is a Sky Binders Chain. A highly rare and magical chain that, when snapped, will bring any flying creature to the ground.

The treasure lies several feet below the crater rim. Reaching it will require you to lean dangerously far over the edge.

Will you...`;}

        case "Environment1RedChoose":
            if (wizard === "green") { return `Reach into the cave and see if you can retrieve the chain?`;}
            if (wizard === "yellow") { return `Reach down to the depression and see if you can retrieve the chain?`;}
            if (wizard === "blue") { return `Reach down into the crater and see if you can retrieve the chain?`;}

        case "Environment1RedIgnore":
            if (wizard === "green") { return `Leave the sleeping salamanders and carry on your journey?`;}
            if (wizard === "yellow") { return `Leave the statue and its treasure and carry on your journey?`;}
            if (wizard === "blue") { return `Leave the fallen star and its treasure and carry on your journey?`;}

        case "Environment1RedRoll":
            if (wizard === "green") { return `You reach into the narrow crack. The heat is immense and, with your arm in the gap, you can no longer see what you are grabbing for.

Roll 1 die to see what you retrieve.`;}
            if (wizard === "yellow") { return `Lying flat, you reach over the lip of the platform, groping for the chain below. Stone digs hard into your chest as you strain to reach the treasure.

Roll 1 die to see what you retrieve.`;}
            if (wizard === "blue") { return `Lying flat upon the warm stone, you carefully reach over the crater's edge. Heat rises from below as you grope blindly amongst the treasures surrounding the fallen star.

Roll 1 die to see what you retrieve.`;}

        case "Environment1LostCreature":
            if (wizard === "green") { return `Bells and wind chimes are suspended from the underside of the bridge, giving the structure a reedy, ethereal voice. They sing out with every step you take as the bridge sways in rhythm with your movements. By the time you reach the other side, the chimes and bells are all working in harmony, heralding your arrival with a deep, rolling chorus that resonates through the forest.

On the far side of the bridge is a grassy landing area peppered with large puffball flowers that fill the air with silvery, winged seeds. The landing area falls away on one side, the earth outcrop overlooking a deep ravine. You feel high up here, the wide skies above the ravine a rich golden-yellow.

The only path onward is a steep climb of rough-cut steps hewn into the forest floor. They run close to the cliff edge and are bordered by trees whose roots must bite deep to resist the call of the drop below.

As you step off the bridge, the first signs of the realm's fragility become apparent. A low rumble fills the air, sending a tremor through the ground and throwing the puffball seeds into the air. For a moment, you can see nothing but the swirling seeds, but as the wind catches them and casts them away, you see a woman.

She is standing in the air a few metres beyond the cliff edge. Her hair and dress are both golden-yellow, dazzling in the sunlight as the wind whips and billows them sideways. She carries what looks like a little ball of sunlight and appears to be in great distress.

Will you...`;}
            if (wizard === "yellow") { return `You step out onto the stretching mist. It wraps around your feet, and you have the strange sensation of being carried and released with each step. It is an odd feeling and, coupled with the nearby drifting clouds and endless sky in all directions, you find yourself disoriented by this strange realm.

You make the trip across the dizzying gap as quickly as possible. It is as you step onto the platform beyond that the first signs of the realm's fragility become apparent. A low rumble fills the air, sending a tremor through the ground and eddies spiralling through the mist around you. For a moment, you can see nothing but the swirling, glistening vapour, but then the wind catches it and clears the cloud.

The platform comprises a ring of rocky shore surrounding a night-blue pool. Beneath the surface of the water, what look like stars streak from side to side, occasionally colliding in beautiful sprays of light.

You are watching the display when, with a shriek, a large silver water snake breaks the surface. It slithers onto the shore, gasping, its wide eyes turned towards you.

Will you...`;}
            if (wizard === "blue") { return `You follow the pale stone causeway toward the silver reef.

As you draw nearer, the twisted silver trees become increasingly magnificent. Their trunks shimmer like polished moonlight while their roots descend through clear water into the reef below. Strange luminous flowers bloom amongst the branches, opening and closing slowly as though breathing.

The air is cool here and carries the scent of salt and blossoms.

It is as you step onto the island itself that the first signs of the realm's fragility become apparent. A low rumble rolls across the sea. The reef shudders beneath your feet and ripples spread across the otherwise still waters.

For a moment, silvery petals fill the air around you, torn from the trees by an unseen gust. As they settle, you notice a creature lying amongst the roots of the largest tree.

It resembles a stag fashioned from silver coral and starlight. Delicate antlers branch from its head like miniature constellations, while tiny points of light drift beneath its translucent skin. Despite its beauty, the creature appears weak. It struggles to rise and every breath seems to require considerable effort.

The stag lifts its head and looks directly at you.

Will you...`;}     

        case "Environment1LostCreatureInvestigate":
            if (wizard === "green") { return `Talk to the woman?`;}
            if (wizard === "yellow") { return `Go over to the silver snake?`;}
            if (wizard === "blue") { return `Go over to the silver stag?`;}             

        case "Environment1LostCreatureIgnore":
            if (wizard === "green") { return `Ignore the woman?`;}
            if (wizard === "yellow") { return `Ignore the snake and continue your journey?`;}
            if (wizard === "blue") { return `Ignore the creature and continue your journey?`;}             

        case "Environment1LostCreatureInteract":
            if (wizard === "green") { return `You call out to the woman. She sees you and hope fills her eyes.

"Help me," she says. Her voice is melodic and, as she speaks, the bridge resonates in harmony with it.

"I do not belong here," she continues. "The barriers between the realms are weak. I fell through a rift. I must return. I cannot survive here."

She sweeps left and right through the air, agitated.

"You are of the realms. Use a little magic. Send me back. I will gift you this."

She holds up the glowing yellow ball, which you now see is some sort of flower.

She looks at you with wide, round eyes.

"Please help me," she says again.`;}
            if (wizard === "yellow") { return `You approach the huge silver snake cautiously. It makes no move as you near, other than its unblinking eyes, which follow your every step.

Although it looks young, healthy and shows no obvious signs of injury, it appears weak. Every movement is laboured and you notice that it is struggling to breathe as it lies half in and half out of the inky, star-streaked pool.

Will you...`;}
            if (wizard === "blue") { return `You cautiously approach the silver stag. The creature makes no attempt to flee. Its luminous eyes follow your movements while faint stars drift from its nostrils with each laboured breath.

Although it bears no obvious wound, something is clearly wrong. The lights moving beneath its skin flicker erratically and several sections of its coral-like body appear to be slowly darkening.

As you watch, the creature stumbles and nearly collapses.

Will you...`;} 

        case "Environment1LostCreatureInteractChoose":
            if (wizard === "green") { return `Help the lady?`;}
            if (wizard === "yellow") { return `Try and help the snake?`;}
            if (wizard === "blue") { return `Try and help the stag?`;} 

        case "Environment1LostCreatureInteractIgnore":
            if (wizard === "green") { return `Ignore the floating woman and continue your journey?`;}
            if (wizard === "yellow") { return `Leave the snake to recover and continue your journey?`;}
            if (wizard === "blue") { return `Leave the creature to recover and continue your journey?`;} 

        case "Environment1LostCreatureFail":
            if (wizard === "green") { return `You call upon your magic to open a portal to Lo Tae Zhao's realm, that of air, peace and tranquillity, but the magic here is as alien to you as you are to it. You are another outsider in this place.

As you call upon your powers, the sky roars and splits apart as a black gash tears open, sucking the air around it inward like a vortex. Puffball seeds caught in the pull streak towards it in a torrent, forming a swirling stream through the air.

The woman cries out, her eyes wide as she too is caught up in the spiralling madness you have accidentally summoned. Whatever lies beyond that ravenous maw, it is not Lo Tae Zhao's gentle realm.

Desperate, the woman reaches towards you, crying out for help, but she is too far away and the pull too strong for you to do anything. All you can do is watch in horror as she fights and loses to the draw of the rift.

Within seconds she is sucked through, screaming, into whatever lies beyond. The rift shudders and snaps shut behind her, leaving only the wide, open golden sky once more.

LOSE 2 MAGIC AND 2 LUCK`;}
            if (wizard === "yellow") { return `You call upon your magic and push against the natural order of this realm, but you push too hard.

Your magic is alien to this peaceful, tranquil place and you have misjudged the damage it can do. The sky roars as a black gash rips open beneath the water's surface, sucking the contents of the pool into it like a vortex. Water and stone streak towards it in a torrent, forming a swirling, angry, bubbling maw.

The snake cries out, its eyes wide as it too is caught up in the howling madness you have accidentally summoned. The creature beats against the rapidly receding water's edge, trying to resist the pull of the rift.

Desperate, it cries out again, its huge eyes imploring you, but it is too far away and the pull too strong for you to offer any help. All you can do is watch in horror as the creature fights and loses to the draw of the rift.

Within seconds it is sucked through the screaming maw to whatever lies beyond. The rift shudders and snaps shut behind it, leaving only the pebble-strewn crater of the now-drained pool.

LOSE 2 MAGIC AND 2 LUCK`;}
            if (wizard === "blue") { return `You call upon your magic and attempt to restore the creature, but the powers of this realm are unlike your own.

As your spell takes hold, the air suddenly grows cold.

The sky above fractures with a deafening crack and a black tear opens between the stars. At the same moment, the waters surrounding the reef begin spiralling upward toward the wound in reality. Silver petals, seawater and fragments of coral are ripped into the air, caught within the growing vortex.

The stag cries out.

Its luminous body begins sliding across the reef toward the howling rift. It struggles desperately, silver hooves scraping furrows into the stone as it fights against the pull.

Its great eyes find yours. For a moment, it seems to plead for help. But it is too far away and the force is too strong.

All you can do is watch as the creature is torn from the reef and dragged screaming into the darkness beyond. The rift shudders violently before snapping shut, leaving only silence behind.

LOSE 2 MAGIC AND 2 LUCK`;} 

        case "Environment1LostCreatureHelp":
            if (wizard === "green") { return `The woman is some kind of air spirit and is clearly far from her own realm. She is right. Without your help, she cannot survive here. Her magic is not of this realm.

You decide to help her.`;}
            if (wizard === "yellow") { return `The creature is not of this world. It does not belong here, and something about this environment is killing it. It must have slipped through the weakening barriers between the realms.

It will die if it remains here, and you vow not to let that happen. You call upon your magic, alien once again to this realm, in the hope of exposing the rift the silver snake came through and giving it a way home.`;}
            if (wizard === "blue") { return `The creature does not belong in this realm. It is too thin at the edges, too real in the wrong way—its form flickering between solidity and light, as though it is only half anchored to existence. Whatever brought it here has been torn open by the weakening barriers between realms.

It will not survive long if it remains.

You make your decision without hesitation. You will not let it fade here.

You reach out with your magic, unfamiliar here, feeling for the hidden fracture in reality—the wound through which the creature fell. If you can find it, you may be able to guide the being back to its own world.`;} 

        case "Environment1LostCreaturePass":
            if (wizard === "green") { return `You call upon the magic of this realm to release the trapped spirit.

There is a shimmer in the air, a thinning of the barriers between the realms, and through it you catch a glimpse of Lo Tae Zhao's peaceful domain, as though seen through a heat haze.

The woman's eyes fill with tears.

"Oh, thank you. Thank you," she says.

She swoops down, kisses you on the cheek and presents you with the flower.

"Dragon Petal," she says. "It will protect you three times from the effects of dragon fire."

With that, she swoops back into the air and passes through the opening to her homeland.

GAIN 2 MAGIC AND 1 LUCK

GAIN ITEM

DRAGON PETALS`;}
            if (wizard === "yellow") { return `You call upon your magic and push gently against the natural order of the realm.

The stars in the water dart to the pool’s edge, then, as one, streak back to the centre. They collide in a spectacular shower of light, and a shimmering white tear appears beneath the water’s surface.

The appearance of the rift seems to give the water snake strength. It coils into the air, then dives into the water, streaking through the shimmering rift back to its homeland. The white light explodes around the snake as it plunges into the opening.

Water sprays into the air. Where it settles, a single silver flower floats. You pluck it from the pool to find it is made up of three delicate snake scales.

A voice fills your mind:

These will protect you from dragon fire, once per petal.

You feel a surge of magic fill you.

GAIN 2 MAGIC AND 1 LUCK

GAIN ITEM

DRAGON PETALS`;}
            if (wizard === "blue") { return `You press gently against the fabric of the realm.

At first, nothing happens. The silver reef remains still, the trees unmoving, the water calm. Then the stars beneath the surface begin to shift. They drift in slow spirals through the water, gathering beneath the reef before rising in unison.  A thin, luminous seam opens in the air just above the waterline—a tear of pale starlight suspended between reflection and sky.

The stag’s body shudders as a little of its strength returns. It steps forward, its hooves leaving brief constellations in the air as it moves. With a glance toward you, it lowers its head and walks into the rift.

Light spills outward as it passes through. For a moment, you glimpse something vast and tranquil beyond—an echo of another realm—before the opening seals itself behind the creature.

Silence returns.

On the surface of the reef, a single silver bloom remains where the stag had been. The flower's petals shift slowly between flower and starlight. When you touch it, it resolves into three delicate, scale-like fragments of luminous matter.

A voice forms in your mind, distant but clear:

*These will shield you from dragon fire, once for each bloom. *

Warmth flows through you as the magic settles.

GAIN 2 MAGIC AND 1 LUCK

GAIN ITEM – DRAGON PETALS`;} 

        case "Environment1Opposed":
            if (wizard === "green") { return `You pick your way down the slope with relative ease. While the stones are wet, they are also wide and not slippery underfoot. You are soon at the floor of the dell with water trickling all around you.

As you step into the stream, you get your first taste of the fragility of the realm. There is a powerful, deep rumbling from the ground below and the sky darkens...

But no. That is not right.

The sky above you is now a different sky altogether, one from another realm, one that does not belong here. Bright stars twinkle overhead, clear against an inky-blue backdrop.

When you lower your gaze from the heavens, you find the ground around you altered. You stand on the edge of a dark, still lake. It could be the sky itself, it is so perfectly calm that it reflects the vista above. The magic here is natural, but not of this realm, and the ground shakes and rumbles with the arrival of the alien power. Yet through it all, the lake remains utterly undisturbed.

There are stepping stones crossing the lake, each shining like a miniature moon. They appear to lead to a small green island crowned by a single arching tree.

The tree looks wildly out of place, an oasis of Carolinus's realm floating through a cosmos of stars and moonlight. It is obvious that you must reach the tree if you wish to remain within his realm.`;}
            if (wizard === "yellow") { return `The bridge feels solid and reassuring beneath your feet. The crossing over the dizzying sky below is short and, thankfully, easy.

As you step off the bridge and onto the soft green grass of the platform beyond, you get your first taste of the fragility of the realm. A powerful, deep rumbling rises from the ground below. The platform shudders and rips apart. Trees explode through the shattered sections, sending earth and rock tumbling into the endless sky beneath.

As the trees form, their roots stretch out, reaching for the others around them. As the searching roots find one another, they knit together, twisting and binding deeply. Then the canopies above follow suit, fanning out and searching for neighbours with which to entwine.

Soon the platform has been replaced by a forest without land, standing impossibly in the sky. It looks and feels completely out of place. A woodland in the heavens; natural, yet against nature.

Looking behind you, you see that the bridge you travelled across has been ripped away during the violent transformation.

You turn back to the trees. They are too thick to allow the sun to fully penetrate, but a golden light shimmering in their depths feels natural to this realm and alien to the intruding forest. A forest, you realise, that has passed through a weak point between the realms.

Your only hope of remaining in Lo Tae Zhao's realm is to reach the light of his domain deep within the invading trees.`;}
            if (wizard === "blue") { return `You step out onto the bridge of starlight. The glowing path curves gracefully upward through the heavens. Beneath your feet, tiny points of light swirl and shimmer as though you are walking upon a fragments of night sky. The sea below gradually falls away until it is little more than a dark mirror reflecting the stars above.

The climb is long but surprisingly easy. As you near the floating platforms ahead, you experience your first true taste of the realm's fragility. A deep rumble echoes through the heavens. The bridge trembles beneath your feet, and clouds form in the constellations around you. 

Great banks of white vapour. They roll out from nowhere, swallowing the bridge and surrounding platforms alike. Soft winds carry distant chimes through the mist while shafts of golden sunlight pierce the cloud banks. They look and feel utterly alien to this realm and it take you no time at all to realise that you are witnessing a tear between realms.

The cloud bank is now vast, billowing all around you. Through the shifting cloudscape you can just makes out a single guiding bright star. Something tangible, light which belongs to the realm you are in.

You know that you must reach it if you are to remain within Solarius's realm.`;} 

        case "Environment1OpposedFail":
            if (wizard === "green") { return `You cautiously step out onto the first stepping stone. It starts to drift and sink almost immediately.

You hear the low rumble again and feel it too, but the water all around you remains perfectly still.

You have a brief moment of panic as you leap to the next stone, wondering what might happen if you missed it. That strange water around you looks more like sky than a lake. Would you simply keep falling and falling to who knows where if you missed a step?

You land heavily on the next stone. It too shifts and starts to sink as soon as you touch down.

You begin leaping from stone to stone with little thought. Your landings are jarring and the stepping stones shift and sink faster as your leaps become wilder and more erratic.

With just a few stones left to cross, you slip, twisting your ankle, and with a hammering heart you fall into the night-sky water...

Or rather, you smack into it.

The lake's surface is cold, hard and solid. It is like falling onto polished stone and your body is wholly unprepared for the impact.

LOSE 2 STAMINA.

You gingerly pick yourself up. Feeling bruised and somewhat foolish, you make your way to the island, ignoring the stepping stones entirely.

As soon as you step off the lake, the natural sky returns. The tree, so wrong before, now feels right and sits as just one of many lining the bank.`;}
            if (wizard === "yellow") { return `You dive into the trees without caution or thought.

The light is dim and there is precious little sound beneath the eerie canopy. As you hurtle through the thick forest, there is a huge groaning creak followed by the sound of splitting wood and, to your horror, a nearby tree falls into the sky below, leaving a yawning gap in the knotted root floor.

Another groaning creak sounds to your side and another tree slides through the forest floor, plummeting into the clouds below. You leap to the next root knot, but that too groans and shifts, sliding into the sky, the branches that follow whipping you as they descend.

LOSE 2 STAMINA.

You are moving without thought now, simply trying to stay alive as the forest drops into the sky around you. You dive from root to root, leap wildly across open sky, land heavily and roll as another tree slips into the clouds...

Then you see it.

A ball of light. Light natural to this world.

The trees around it have all fallen away into the sky, leaving the light exposed and a long way from anything solid.

There is no time to think about it. You run and dive into the open sky.

The second you leave the forest floor, you know you are not going to make it. You reach out, your fingers at full stretch as you fall. They just brush the light and you plummet, end over end, tumbling through the clouds until you are caught by something and gently lowered back to solid ground.

Taking a deep breath, you steady yourself. No falling trees. No collapsing roots.

You are standing on clouds, yet they somehow support your weight.`;}
            if (wizard === "blue") { return `You plunge into the cloud banks, visibility is almost non-existent. The mist swirls constantly around you and every direction looks exactly the same as the last. Chimes ring softly somewhere beyond sight carried to you on warm gusts of air, but you have little time to take it in.

A deep rumble passes through the cloud bank. The clouds beneath your feet begin to dissolve. You stumble as part of the pathway evaporates into nothingness. A moment later another section follows. Panic rises and you run. 

Cloud bridges appear and vanish around you without warning. Platforms drift through the mist before disappearing again. More than once you leap for solid ground only to discover that it is already fading away.

At last your foot lands too late. You scrabble only to find empty air, and you drop.

You tumble though the open sky of another realm, miles above the ground below and with no way to slow your descent. You are sure you are going to die, lost in the tangle of magic where the barriers between realms is weakest, when a rift tears beneath you, the sky snaps black, the clouds are gone, and you are now hurtling towards the black stone platforms beyond the star bridge in Solarius's realm.

As you brace for impact, a cluster of pale blue lights sweeps around your body. They catch you, slowing your descent, but you still land with heavily, the wind knocked from your body.

LOSE 2 STAMINA.

You lie there for several moments, breathing heavily, looking up at the now cloud free heavens.`;} 

        case "Environment1OpposedPass":
            if (wizard === "green") { return `The deep, rolling rumble that resonates around you without somehow causing even a ripple on the water tells you that you are far from the right path.

You remember Carolinus's warning. There is little time. If you do not return to his realm—the tree on the far side of the lake—and do so quickly, he may be unable to keep you there.

You take a deep breath and then jump lightly to the first stone, then the next and the next. Always moving, you touch down upon the stones lightly and confidently as you travel across the glass-smooth lake, the stars burning above and shining back at you from below.

You skip from stone to stone and soon arrive on the far shore.

The moment your foot touches the island, the natural sky returns. The tree, so wrong before, now feels right and sits as just one of many lining the bank.`;}
            if (wizard === "yellow") { return `A deep, rolling rumble resonates through the forest without disturbing the canopy above. It is eerie and unsettling, a reminder that you are far from the right path.

You remember Lo Tae Zhao's warning. There is little time. If you do not return to his realm quickly, he may be unable to keep you there.

You take a deep breath and head into the forest.

You tread lightly, trying to disturb as little as possible in the earthless woodland. You try not to pay attention to the open sky below as you move deeper into the trees, searching for the light of the realm.

It does not take long to find it.

A shining beacon in the heart of the unnatural forest.

The moment you step towards it, the woodland fades around you and you find yourself standing on the far side of the grassy platform that, only moments ago, you had watched explode.

A low rumble rolls across the sky. The last remnants of the overlapping realms.`;}
            if (wizard === "blue") { return `The deep rolling rumble echoes through the clouds without disturbing the stars beyond. You remember Solarius's warning.

There is little time. If you do not return to the natural order of his realm quickly, he may no longer be able to keep you here.

You take a steadying breath and enter the mist.

Rather than following the drifting clouds, you never take your eyes off the single burning star. It appears only faintly at first, little more than distant glimmer amongst the vapour, but each sighting confirms your direction.

You move carefully through the cloudscape. The further you travel, the more unstable the intrusion becomes. Floating pathways dissolve into mist behind you while entire cloud islands drift apart and vanish into the surrounding heavens, but always you keep your focus on the one true star.

Soon it is bright enough to hurt to look at. It burns through the clouds around it and as you step towards it, the billowing clouds of the realm that does not belong, fade.

A heartbeat later you find yourself standing upon the far side of the platform you had glimpsed before entering the cloud banks. Above, the constellations burn brightly and below, the endless sea reflects them perfectly. Everything is as it should be.`;} 

        case "Environment1RealmPath":
            if (wizard === "green") { return `The bank is not overly steep and the roots make for an easy descent down the slope.

The fallen tree, when you reach it, is huge, at least eight feet across at the trunk, which now lies on its side before you like a wall of moss and bark.

While the tree has blocked the stream, and in turn your path, it has not formed a dam. The water trickles happily beneath the fallen giant and on towards whatever lies beyond.

The tree must have fallen many years ago, for nature has embraced it and woven it back into the surrounding ecology. Wide, sturdy trees grow on either side of the bank, pinning the fallen trunk in place, which now lies like an ivy- and moss-strewn bridge open to the myriad creatures that traverse it.

The forest that has grown up around the once-great tree is too thick for you to see either its canopy or its roots.`;}
            if (wizard === "yellow") { return `You put your trust in the realm, step off the edge and plummet to your death.

At least, that is what you expect as you hurtle through the sky. But as the platform below comes rushing up to claim you, the drifting clouds catch you and gently lower you to the ground.

Well, cloud actually, for the platform upon which you are placed appears to be a shifting, rolling cloud bank. It swallows your legs up to the knees. You are standing on something solid, but as the cloud around you shifts, it reveals nothing but open sky below, leaving you uneasy about taking another step.

Around you, a herd of gold-backed, deer-like creatures gambols across the platform, the younger members barely tall enough to break the cloud cover as they leap from point to point. How they know where the solid ground lies beneath the thick cloud, you do not know, but one thing is certain: you cannot stand where you are forever.`;}
            if (wizard === "blue") { return `You begin the descent. The spiral staircase winds ever downward through the parted sea. Above, the surface grows steadily more distant until it resembles a pale star suspended high overhead. Around you, walls of dark water stretch endlessly upward, illuminated only by faint blue lights drifting through the strangely peaceful depths.

Soon the staircase reaches its end and you step onto a broad shelf of black stone. You find yourself standing at the edge of a vast abyss, the sea still parted around you, yet beyond the stone ledge lies only darkness.

Far below, countless blue lights drift through the depths like stars scattered across a night sky. You watch them for a time. They move with purpose, gathering and dispersing in slow currents.

The stone shelf upon which you stand disappears into the darkness, leaving only the drifting lights below. The path onward is not obvious, but you cannot remain here forever.`;} 

        case "Environment1RealmPathPass":
            if (wizard === "green") { return `You take a moment to reach out with your senses.

You can hear the industry of nature all around you, smell the damp earth and the stream, and feel the lingering traces of the deep magic that once lived within the magnificent tree.

While the tree blocks your path, you feel it would be wrong, disrespectful even, to clamber over it. So much life has built up around the trunk, nourished by the stream and the magic within.

Instead, you choose to follow the fallen giant into the forest, allowing it to guide and dictate your path onwards.

It soon becomes apparent that your choice is in keeping with the larger wildlife of the area, for you find yourself walking along animal trails worn into the earth that follow the fallen tree.

It is not long before you come to the roots.

With the tree on its side, they spill into the air above you like the crest of a frozen wave, captured in a tangle of twisted wood and climbing vegetation.

Careful to follow the path, you pick your way through the towering root forms. You brush aside a curtain of hanging vines and find yourself in a clearing amongst the roots.

You catch your breath.

Quite apart from the beauty of the hollow, you can feel the magic at its strongest here, and for the first time you realise that the tree is a Tanglewood, and that you have discovered a Tanglewood Hollow.

Any loose root or branch found within this hollow will serve as the core of a powerful wand.

You search around and soon find a piece of wood that feels just right in your hand.

You make sure to thank both the woodland and the ancient tree for their generous gift before continuing your journey through the realm.

GAIN 2 MAGIC, 1 LUCK AND GAIN ITEM

Tanglewood Rod`;}
            if (wizard === "yellow") { return `You take a breath to steady your nerves, watching the playful deer as you do. They are quite unconcerned by your presence and appear equally unconcerned about where they jump. They seem to trust that wherever they land, there will be solid ground to support them.

Well, you put your faith in the realm to get here, so with a great deal of trepidation you do so again and take a step forwards.

Your leg sinks deep into the cloud but again finds soft, solid support.

Another step and then another meet with the same result and soon you are moving more confidently. As your confidence grows, the gold-backed deer gather around you. There is no threat in their movements and you get the impression that these magical creatures are acting as guides of a sort.

Careful not to alarm them, you follow the deer-like animals across the rolling cloud mass. They lead you for what you estimate to be half an hour across fields and hills of soft white cloud.

Soon, some kind of reedy silver grass starts to break through the cloud cover ahead and great crystal shards emerge from the mist, clawing at the sky.

The deer bow to you and disappear over a nearby hillock of cloud.

You turn back to the crystals and catch your breath. Quite apart from their beauty, you can feel the magic emanating from them, and for the first time you realise that the deer have led you to a Sky Shard.

If you have been led to these crystals by beings of such great magic, then even a single splinter will provide the core for a wand of incredible power.

You search around and soon find a splinter of just the right size. It feels warm and alive in your hand.

You offer silent thanks to the crystals and the magical creatures that brought you here before stowing away your prize and continuing your journey through the realm.

GAIN 2 MAGIC, 1 LUCK AND GAIN ITEM

Sky Shard`;}
            if (wizard === "blue") { return `You take a moment to calm your thoughts. The lights below continue their graceful, unhurried movements. They drift through the abyss with purpose, never hesitating, never questioning where they are going.

You remember Solarius's words. Respect the nature of the realm and you step from the ledge.

The darkness swallows you. For a moment your stomach lurches. Then the lights drift beneath your feet, supporting you. They swirl around you, still with their rolling purpose, but somehow leading you, forming a path for you to follow.

It is a little disorientating walk across the abyss below, but with every step to take so the lights gather beneath you. More join them as you travel, forming a winding pathway through the darkness.

You travel in the star lit path for what feels like miles through the hidden depths of the realm. Eventually they lead you to a solitary formation rising from the abyssal floor. At first you mistake it for crystal. Then you realise what it truly is. A star, or rather, the fossilised heart of one.

The object glows faintly from within, embedded in the black stone like a jewel left behind by creation itself. You can feel ancient magic radiating from it.

If even a tiny fragment of such a thing were shaped into a wand core, the result would possess extraordinary power.

You search carefully around the formation and soon discover a loose shard no larger than your thumb. It pulses softly in your hand like a distant heartbeat.

You offer silent thanks to the lights that guided you before securing your prize and continuing your journey.

GAIN 2 MAGIC, 1 LUCK AND GAIN ITEM

Star Shard`;} 

        case "Environment1RealmPathFail":
            if (wizard === "green") { return `You make a small jump, grab hold of some ivy and haul yourself onto the trunk.

Ivy snaps and shards of bark splinter away as you scrabble up the trunk's face, sending little clumps of moss showering down beneath you, but the handholds and footholds are plentiful enough that the climb is relatively easy.

There are insects and bugs everywhere. You brush them aside as you search for places to grip until, with a grunt of effort, you drag yourself over the top of the trunk and slide down the other side to the path beyond.`;}
            if (wizard === "yellow") { return `You make a small jump, grab hold of some ivy and haul yourself onto the trunk.

Ivy snaps and shards of bark splinter away as you scrabble up the trunk's face, sending little clumps of moss showering down beneath you, but the handholds and footholds are plentiful enough that the climb is relatively easy.

There are insects and bugs everywhere. You brush them aside as you search for places to grip until, with a grunt of effort, you drag yourself over the top of the trunk and slide down the other side to the path beyond.`;}
            if (wizard === "blue") { return `You stare into the darkness below. The drifting lights clearly know where they are going. You do not, but there appears to be no way across the darkness without them.

You wait until one of the larger lights drifts close to the ledge and leap. The light appears startled by your sudden movement and darts away. For one horrifying moment, there is nothing beneath you and then you you plunge into the darkness.

The blue lights scatter in every direction as you fall through their midst. The rushing water beyond the magical barrier blurs around you and panic surges through your body.

Then something catches you. Dozens of lights sweep beneath your falling form. They gather together, slowing your descent, their presence is strangely soothing. Soon your fall is a gentle descent, the lights spiralling down before depositing you carefully upon a distant black stone platform.`;} 


        case "environment1Image":

            if (wizard === "green") {
                return "fawn.jpg";
            }

            if (wizard === "yellow") {
                return "skyTemple.jpg";
            }

            if (wizard === "blue") {
                return "starFish.jpg";
            }
 
        default:
            return null;
    }
}