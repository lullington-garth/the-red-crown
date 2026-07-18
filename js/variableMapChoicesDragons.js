// variableMapChoicesDragons.js

export function resolveDragonsVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();

    switch (path) {

        case "dragonMisalignedIntro":
            if (wizard === "yellow") { return `A broad platform of pale cloudstone drifts among the upper winds, its surface crowded with charts, scrolls, and dragons so absorbed in their studies that they scarcely notice your arrival.

                As you alight upon the platform, the sky rumbles and the stone beneath your feet trembles. If the platform's occupants notice the disturbance, they give no sign of it. Before you stands a small flock of pink-brown scholarly dragons, surrounded by parchments that float lazily through the air around them. They are engaged in a heated discussion, peering alternately over the edge of the platform at the world many miles below and back at their drifting maps.

                "It's moved again, I tell you," says one.

                "It has not. Look. Reference it against the Omcromidon."

                "That's moved too!"

                The dragons turn from their maps and finally notice you.

                "What do you think?"

                You peer over the edge, but the ground below is little more than a blur of distant colours. You certainly cannot make out any details.

                Will you:`;}
            if (wizard === "green") { return `Beyond a line of reeds and silver grasses, a great lake glimmers beneath the clear blue sky. Sitting beside the lake is an enormous dragon. He appears completely at peace with the world. He has uprooted a young willow, stripped it bare, and fashioned what remains into a fishing rod. Around him lie several enormous fish, each twenty or thirty feet long, lazily slapping their tails against the ground in the afternoon sun.

                As you approach, the sky rumbles and the ground trembles. You stumble, but the dragon seems entirely unfazed by the disturbance. He looks up and, in a slow, deep, lazy voice, says:

                "Hello, little one. Come to do a spot of fishing?"

                Will you:`;}
            if (wizard === "blue") { return `Beyond the coastline, a ring of jagged sea stacks rises from the dark ocean, and you guide your vessel towards them through the restless skies.

                Far from shore, you discover a ring of sea stacks rising from the waves. Perched upon them are dozens of slender, serpentine sea dragons. As you approach, the sky rumbles and a great wave rises from the ocean, yet the serpentine dragons seem far too excited about something to notice. From their animated chatter, you gather that court is about to come into session.

                Suddenly, the sea behind their rocks begins to bubble and churn. You watch in wonder as an island rises from the water, covered in every manner of sea vegetation. Towering coral forests colour the rich and varied landscape. Somehow, the island appears to have risen without bringing any animal life with it.

                You are still standing agape when the island rises again, and this time you realise that it is a dragon: a creature so vast and ancient that an entire ecosystem has evolved upon its back.

                "Court is in session."

                Though the words are not loud, they somehow make the vast sky and endless sea seem insignificant.

                "A human," the voice continues. "I have not had a human in the life of this star."

                You can hardly believe that you register as anything more than a mote before this majestic leviathan. The previously excited sea dragons all turn to look at you.

                "Are you here to be weighed?" asks the island.

                Will you:`;}
         
         case "dragonMisalignedChoice1":
            if (wizard === "yellow") { return `Tell them that human eyes simply cannot see that far?`;}
            if (wizard === "green") { return `Tell the dragon that fishing is not really your thing?`;}
            if (wizard === "blue") { return `Answer no?`;}

         case "dragonMisalignedChoice2":
            if (wizard === "yellow") { return `Tell them that, yes, you are sure the Omcromidon has moved as well?`;}
            if (wizard === "green") { return `Tell the dragon that you would love to join him, pick up one of the smaller stripped willow branches, and take a seat beside him?`;}
            if (wizard === "blue") { return `Stand tall and tell the colossal dragon that, yes, you would like to be weighed?`;}

         case "dragonMisalignedFalseAntiquityHint":
            if (wizard === "yellow") { return `"Of course, of course. I forget that your eyes can barely see a moth on a mountainside. I apologise."

                She turns back to her maps, and you are struck by a sudden idea.

                "Do any of your maps show the location of Antiquity?" you ask.

                "Of course," says the dragon. "They all do. Here," she says, pulling one map closer and pointing with a claw, "and here," she says, dragging over another, "and here, here, and here. It moves around, you see."

                "It does not," says another dragon.

                "Shut up, Duncan," says the first dragon. "You can't even see that the Omcromidon is moving."

                "We're moving, Sybil," says the other dragon. "We're standing on a floating platform."

                "Don't be so silly," says Sybil. "I stood perfectly still when I looked down last time."

                Duncan rolls his eyes — something you never thought you would see a dragon do — and says quietly, "If you're looking for the Silver Tree, lad, follow the path of silver-green."

                The dragons then descend into another bout of argument as they all lean over the platform's edge.`;}
            if (wizard === "green") { return `"Well, it's not for everyone," says the dragon in his slow, lazy voice.

                His line twitches and, with an unconcerned tug, he pulls a twenty-foot silver fish from the lake.

                "Got me a tiddler," he says, unhooking it.

                He gives the fish a quick shake and swallows it whole.

                "Oh, sorry," he says. "Did you want some?"

                You assure him that you did not.

                You sit and chat with the dragon for a while until he eventually asks:

                "If not fishing, then what brings you to these parts?"

                You tell him of your quest and explain that you currently seek a silver oak known as Antiquity.

                "Antiquity," says the dragon, slowly rolling the word around his mouth. "Not heard it called that before, but the Silver Tree sounds like what you seek. The Gatekeeper will guide you. It's the silver-green path you need for the great silver oak."`;}
            if (wizard === "blue") { return `You realise that you have no idea what the proper honorific is for an island.

                "Then why are you in my courtroom?"

                You suspect that "I stumbled into it by accident" is unlikely to produce a favourable outcome, so you take a chance.

                "I seek the Silver Acorn."

                "Ah," says the island dragon. "You search in the wrong place. Seek out the Gatekeeper. Silver-green will grant you the greatest access to a Silver Acorn."

                With that, the island leviathan slowly sinks back beneath the sea.

                "Cool," says one of the slender silver serpentine dragons. "So cool."

                You can scarcely believe that the court had been convened for your benefit.`;}

         case "dragonMisalignedFalseAntiquityChoice":
            if (wizard === "yellow") { return `You call out your thanks, though it goes unheard, and continue on your way.`;}
            if (wizard === "green") { return `You thank the dragon and leave him to his fishing.`;}
            if (wizard === "blue") { return `You decide to slip away before anyone else reaches the same conclusion.`;}

         case "dragonMisalignedEthosTest":
            if (wizard === "yellow") { return `"See, Duncan!" says the first dragon, her voice shrill. She pulls over a faded map and taps it with a claw. "It's moved!"

                "We've moved," says the dragon called Duncan. "We've moved! We are standing on a floating platform. You cannot use it as a fixed point."

                "Oh, don't be so silly," says the first dragon. "I stand perfectly still when I take my bearings. And this earthwalker agrees. The Omcromidon is moving. Here," she says, thrusting a map towards you, "show him."`;}
            if (wizard === "green") { return `You take your makeshift rod, settle yourself beside the dragon, and cast your line — or rather your willow vine — into the still waters of the lake.

                The dragon nods approvingly.

                "Good day for it."`;}
            if (wizard === "blue") { return `With all the confidence you can muster, you stand tall and call out:

                "Yes. I am here to be weighed."

                The dragon appears to consider you. Then the entire island shifts towards you.

                "Step onto my hand, mortal," says the vastness around you.

                The silver serpentine dragons gasp.

                "He's going to brush the Petal Moon," one says breathlessly.

                You do not know what this means, and you are not entirely certain that you wish to step onto a dragon the size of an island, but you can see little alternative.

                As soon as the ancient dragon has placed you safely amongst the coral forests upon his back, he launches himself into the air.`;}

         case "dragonMisalignedEthosPass":
            if (wizard === "yellow") { return `You confidently brush the map aside and pull another at random.

                "It's here now," you declare, pointing to a completely arbitrary spot.

                "Bethnal Green," says Duncan flatly.

                The first dragon gasps.

                "Oh! Let me see!"

                She darts to the edge of the platform and peers down intently.

                "Please," says Duncan, staring at you imploringly. "If I give you this..." He scoops up a handful of rolling cloud. It turns a deep violet beneath his claws, and he passes it to you. "...will you go away before she decides the moon is bathing in the Great Lakes again? That was a reflection, by the way."

                "It's Cloud Veil. You can use it in combat to hide your movements."

                He lowers his voice.

                "Pleeease."

                GAIN ITEM
                Veil of Dusk Clouds`;}
            if (wizard === "green") { return `"Hang on," says the dragon.

                He reaches into the sky and draws a talon through a sun-dappled cloud.

                "You'll have more success if you put this on your line."

                He hands you a ball of golden cloud larger than your head. There is far too much to fit upon the hook.

                "Cloud Veil," says the dragon. "Masks your movements in battle. Works well as bait too."

                There must be more to fishing than you realise, because even with the magical cloud tied to your line, you fail to catch anything.

                Eventually, you reel in your rod, store the remaining cloud inside your pack, and thank the dragon for his pleasant company.

                "Any time, little one," says the dragon.

                GAIN ITEM
                Veil of the Dappled Light`;}
            if (wizard === "blue") { return `The dragon moves with incredible speed for something the size of an island. You would have expected his movements to be ponderous, yet he flies with astonishing grace, and upon his back the journey is smooth and strangely comfortable.

                The dragon streaks into the stars. The distant tips of his wings, too far away for you to see clearly, glow faintly orange as they cut through the heavens. Then, in no more than a handful of heartbeats, you are brushing against a moon.

                A sparkling cloud of what appears to be liquid moonlight twinkles above you. You raise your hands and run your fingers through it. The silver radiance gathers around them, making it appear as though you are wearing glowing gloves.

                Then you are plunging back towards the world below.

                The sea rushes up to meet you faster than your mind can comprehend, yet with equally impossible grace the leviathan settles upon the ocean, scarcely disturbing the black rolling waters.

                The silver serpentine dragons stare at you in awe as the great dragon lifts you once more and, with a gentleness you would never have thought possible from an island-sized creature, places you back upon the rock.

                "You are an interesting one," says the great dragon. "That light upon your hands is Moon Veil. It will hide your movements in battle."

                GAIN ITEM
                Moon Veil

                With that, he submerges once more into the depths.

                "Cool," breathes one of the slender silver dragons. "So cool."

                You can scarcely believe that the court had been convened for your benefit.`;}

         case "dragonMisalignedEthosPassChoice":
            if (wizard === "yellow") { return `With the first dragon still peering over the edge, you thank Duncan and move quickly on, stowing your prize as you depart.`;}
            if (wizard === "green") { return `You leave the dragon to his fishing and continue your journey.`;}
            if (wizard === "blue") { return `You decide to slip away before anyone else reaches the same conclusion.`;}            

         case "dragonMisalignedEthosFail":
            if (wizard === "yellow") { return `You take a wild stab at the map.
    
                The first dragon looks at you rather strangely.

                "That's the wrong map, dear," she says. "Are you quite sure you saw the Omcromidon?"

                You make a non-committal noise, but the dragons have already turned their attention back to the world below, all of them leaning over the platform's edge once more.`;}
            if (wizard === "green") { return `You cast your line as the dragon watches patiently.

                "Very good," he says. "Fishing is mostly waiting."

                Several minutes pass. Then your line suddenly jerks.

                "Oh," says the dragon. "You've got one."

                You pull, and the lake explodes. A silver fish the size of a house erupts from the water, still attached to your line. The willow rod bends alarmingly as the fish continues its arc through the air and crashes into the ground in front of you, bringing with it a wall of icy water.

                You tumble backwards into the reeds. The dragon blinks once as the water soaks your through and the huge fish flops on the shore where you were sitting.

                "Hmm," he says. "Ambitious." He picks up the enormous fish and drops it on his pile. "Perhaps start with something smaller."

                You spend a while longer sitting beside the lake in the pleasant company of the dragon. Although neither of you catches anything further, it is a relaxing way to spend an hour or two. Eventually, the dragon yawns, stretches, and settles back beside the shore.

                "Lovely day for it."`;}
            if (wizard === "blue") { return `The dragon streaks towards the stars. You scream, diving for the coral beneath you and clinging on for dear life. You can scarcely believe that something the size of an island can move so quickly. Burying your head amongst the salty reefs, you desperately hope it will end.

                At one point the sky suddenly brightens. You risk a terrified glance upward and discover that you are skimming across the surface of a moon. A silver mist clings to you as you pass through it, and you cry out, frantically brushing the strange substance from your body.

                Then the dragon dives once more. The world below races up to meet you. You shut your eyes and pray for it to end. And it does. Moments later, the dragon settles upon the ocean with impossible grace and lifts you gently from his back, placing you once more upon the rock.

                You lie panting in the salty sea air.

                "You are an odd one," says the leviathan.

                With that, he slips back beneath the waves.

                "Cool," says one of the slender silver serpentine dragons. "So cool."

                Even in your shocked state, you realise that the court cannot possibly have been convened for your benefit — assuming that what you have just experienced could be called a benefit at all.`;} 

         case "dragonMisalignedEthosFailChoice":
            if (wizard === "yellow") { return `You leave the dragons to their mapping and continue your journey.`;}
            if (wizard === "green") { return `You leave the dragon to his fishing and continue your journey.`;}
            if (wizard === "blue") { return `You decide to slip away before anyone else reaches the same conclusion.`;}            



        case "dragonOpposedRace":
            if (wizard === "yellow") { return `A rumble rolls across the skies and the ground quakes. Once again, you are reminded of the sheer willpower your brother is exerting to hold the realm together.

When the disturbance settles, you notice that the clouds ahead churn and swirl like a great white sea. Through gaps in the vapour, you glimpse towering pillars of stone suspended impossibly in the sky, connected by winding ribbons of cloud-road. A thunderous roar echoes across the heavens.

At first, you think battle has broken out, but then you see the banners. Dozens of dragons wheel overhead, their scales flashing crimson, sapphire, emerald and gold as they circle a vast starting line marked between two floating spires. Spectators perch upon cloudbanks and rocky outcrops, cheering and waving brightly coloured pennants.

A race.

As you watch, one of the competitors lands heavily nearby. The bronze dragon is immense, with curling horns and a chest broad enough to serve as a banquet table. A frantic group of officials rush around him, arguing loudly.

"The jockey's gone! We need a rider! The race starts in moments!"

The dragon's amber eyes settle upon you.

"You there!" he bellows. "You look reasonably lightweight and only slightly terrified. Perfect!"

Before you can protest, strong claws lift you from the ground and deposit you firmly upon the bronze dragon's back.

"Excellent," says the dragon. "Try not to fall off. I am called Brozieg. If we survive, you'll have bragging rights forever."

A horn sounds somewhere above, the crowd cheers, and Brozieg leaps into the air.

"Which route?" he roars.

You peer over his head and see two clear routes. The left route appears longer but free of obstacles. The right route, while more direct, appears to be a maze of building-sized debris darting wildly across the track.

"ROUTE!" screams the dragon.`;}
            if (wizard === "green") { return `A rumble rolls across the skies and the ground quakes. Once again, you are reminded of the sheer willpower your brother is exerting to hold the realm together.

When the disturbance settles, you take in your surroundings. Ancient trees arch overhead, their branches woven together to form a vast emerald canopy. Sunlight filters through leaves of silver and gold, scattering dancing reflections across pools and streams.

Ahead, you hear a chorus of excited voices. Curious, you follow the sound until you reach a broad crystal lake where a group of young dragons are gathered upon its shores.

They cannot be much older than hatchlings by dragon standards, though each is still considerably larger than a horse. Their scales shimmer with bright colours and they jostle one another, boasting and laughing about some reckless endeavour they have planned.

"The tunnel only takes three minutes!" says the largest of them.

"Two if you're fast!"

"One if you're me!"

The others groan.

"You got lost last time," says a silver-backed pup.

"That was one time!" The speaker, a brilliant green dragon, puffs out his chest indignantly.

As the argument continues, you notice another dragon standing apart from the group. Her scales are pale blue, flecked with silver like moonlight upon water. Unlike her companions, she appears uncertain.

"Oh!" she says, noticing your approach. Her face brightens. "A wizard. Would you come with me? They want to run the Drowning. It's an underwater passage," she adds at your look of confusion, gesturing towards the lake. "The others are racing through it and, well, I'd be much happier if I had someone with me. I can use magic to let you breathe underwater, but..."

"Come on, Twinkle!" calls one of the other dragons.

"Please," she says, looking at you with huge, imploring eyes and, against all logic and sanity, you agree.

Twinkle whoops and runs several circles chasing her own tail.

"Hop on," she says. "We'll head over to Certain Death."

"Oh, don't worry," she adds as she picks you up and places you upon her back. "That's just what we call the starting line."

She scampers over towards Certain Death.

You decide to test Twinkle's magic before risking the race and plunge your head into the lake. To your great relief, the enchantment surrounding you works exactly as promised and you can breathe easily beneath the waters.

You shake the water from your hair and climb back onto Twinkle's back.

"The boys will all want to go through the Death, Death, Bang, Bang, but we can take the safer route if you prefer," she says.`;}
            if (wizard === "blue") { return `A rumble rolls across the skies and the ground quakes. Once again, you are reminded of the sheer willpower your brother is exerting to hold the realm together.

When the disturbance settles, you take in your surroundings. As with much of this realm, you find yourself in an area where countless stars blaze across a velvet-black sky. Here, however, rivers of silver radiance flow between the distant constellations and great fragments of celestial stone drift through the void, each glowing faintly with trapped starlight. Ahead, mounted upon an asteroid the size of a castle, a colossal forge shines like a second sun. Its chimneys vent streams of molten starlight into the darkness.

As you watch, a small dragon hurtles past overhead.

"No no no no no no no!"

The silver-scaled dragon loops around in a panic before spotting you. Before you know what is happening, he swoops. A pair of claws close around your waist. The world spins as you are tossed into the night sky before landing roughly upon the young dragon's back beside a hot, glowing orb.

"Spot for me!" he yells as he hurtles into the sky. "See that starlight on my back? We need to get it to the forge before it goes out."

That answers what the glowing sphere secured within a cradle between his shoulders is, but you are still none the wiser as to what a spotter does. You are about to ask when the dragon shouts:

"I'd go on my own, but with a meteor storm between us and the forge, I need you to spot any rocks coming at me from my blind spots!"

There is no time to answer. The dragon is already hurtling full pelt towards a roiling cloud of rock and fire.

You have just enough time to recognise that the edges of the storm contain less debris, while the path through the swirling maelstrom will get you there far more quickly... should you survive the journey.

"HERE WE GO!" cries the dragon.`;} 

        case "dragonOpposedRaceChoice1":
            if (wizard === "yellow") { return `Will you take the clear left track?`;}
            if (wizard === "green") { return `Will you ask to take the safer route?`;}
            if (wizard === "blue") { return `Will you guide the dragon around the outer edges of the storm and risk the starlight perishing?`;} 

        case "dragonOpposedRaceChoice2":
            if (wizard === "yellow") { return `Will you take the suicidally cluttered shorter route?`;}
            if (wizard === "green") { return `Would you rather throw caution to the wind and give the Death, Death, Bang, Bang a try?`;}
            if (wizard === "blue") { return `Would you rather risk being smashed to a pulp in the angry storm of house-sized rocks?`;} 

        case "dragonOpposedRaceHint":
            if (wizard === "yellow") { return `Brozieg banks away from the main pack.

"Playing it safe?" he rumbles. "Not a popular strategy among racing dragons."

You watch as the other competitors twist and weave through the spinning rocks. Occasionally one takes a hit or makes an incredible escape, and the crowd gasps, but with Brozieg taking a broader route, there are no eyes upon you. The pace remains exhilarating, but you no longer feel as though death is waiting behind every turn.

Brozieg, without the distraction of screaming rock death, proves surprisingly talkative. He asks what brought you to the races, which leads you to mention your search for Antiquity.

"Antiquity?" he says. "Never heard of it, but the Silver Tree... I know of that.

"Ancient magic, that one. It sits somewhere beyond a path of silver-green. Hold on!"

The dragon dives, and you realise that you are approaching the finish. Brozieg swoops across the line and lands gracefully upon a broad shelf of cloudstone.

He lowers a wing to allow you to slide from his back. The dragon snorts a puff of warm smoke.

"Thanks for your help. We didn't place, but it was your first time, and without you I couldn't have flown at all."`;}
            if (wizard === "green") { return `Twinkle enters the calmer waters while the other dragons vanish ahead in bursts of bubbles and spray.

As she swims, you see that the lake opens into a network of submerged tunnels illuminated by glowing moss and drifting spheres of pale enchantment.

The journey through the lake is a peaceful one. Schools of brilliantly coloured fish weave between ancient roots. Water plants sway in the currents, and once you glimpse what appears to be a tiny castle populated entirely by river sprites.

Twinkle relaxes considerably.

"Thank you for coming with me," she says as she picks her way through the winding passageways. "We don't get many wizards in these parts."

You tell her that you are searching for an ancient tree called Antiquity.

Twinkle frowns.

"I don't know that name. Is it a silver oak?"

When you tell her it is, she nods.

"Grandma tells stories about that tree. I've never seen it, but Grandma says if I ever do, I must be very respectful to it. I've looked for it," she admits. "I'd just love one of those silver acorns, but I can't find the silver-green path.

"Oh, look. We're there."

The tunnel widens and sunlight appears ahead. You emerge from the lake into a peaceful glade. Twinkle lands gracefully beside the shore.

"Thank you for keeping me company," she says, before scampering off to join the others.`;}
            if (wizard === "blue") { return `You call out quick instructions, guiding the dragon towards the outer edges of the storm.

The young dragon banks, dives and turns obediently, and soon the journey becomes a careful dance through the fringes of the tempest.

Meteor fragments drift all around you, ranging from pebbles to mountains. Some glow with silver fire. Others leave trails of sparkling dust that linger in the darkness like celestial mist.

The dragon seems relieved to avoid the worst of the rolling chaos.

"My master says caution is the mark of a true starsmith and that excitement is usually just another word for disaster."

He chatters on nervously for a while before apparently deciding that he would rather hear another voice.

"What brings you to the forge?" he calls back.

You tell the dragon that you are merely passing through on your search for Antiquity.

"The Silver Oak?" he says after you explain what Antiquity is. "Don't know where it is. Don't think anyone rightly does. But you'll know when you're close. The road will be lined with silver-green."

"We're here!"

You can hear the relief in his voice as the forge looms ahead, streams of molten starlight pouring from its towers while enormous dragons labour around glowing anvils within.

The apprentice lands upon a broad platform and carefully delivers the fading orb to waiting smiths. Its light may not be as bright as it once was, but judging by the reactions of the dragons removing it from the cradle, it is still bright enough for use.

"We made it!" he cries, lowering a wing and allowing you to descend. "Thanks for the spotting."

He looks enormously relieved to have succeeded.

Once the starlight has been dispatched and the cradle secured for the return journey, the dragon says, "Hop on. I'll fly you back to the mainland."

With no fading starlight to race against, the return journey is blissfully uneventful.`;} 

        case "dragonOpposedRaceHintChoice":
            if (wizard === "yellow") { return `You thank the dragon for the ride and, with a final farewell, continue on your quest.`;}
            if (wizard === "green") { return `You bid the young dragons farewell and continue your journey.`;}
            if (wizard === "blue") { return `As the dragon drops you off, you bid him a grateful farewell and continue on your journey.`;} 

        case "dragonOpposedRaceTest":
            if (wizard === "yellow") { return `"Excellent!" roars Brozieg. "I was hoping you'd say that!"

The bronze dragon folds his wings and dives. The world blurs in a roar of cloud and screaming wind. Cloudbanks explode around you. Spinning rocks the size of barns flash past so closely that they brush your clothing. It is terrifying and all too fast for you to take in.

Brozieg twists between jagged stone pillars, rolls through a gap barely wider than his wingspan, then plunges headlong through a spiralling tunnel of cloud.

Other dragons race around you, streaking overhead in flashes of scarlet scales. One explodes from a cloudbank beneath you before peeling away and spinning into a cluster of wildly tumbling rocks above.

Brozieg laughs.

"Now THIS is racing!"

The dragon dives again as a maze of floating arches rushes towards you.`;}
            if (wizard === "green") { return `Twinkle glances towards the distant splashes left by her companions. Then she grins.

"Oh, why not?"

She dives fast and deep. A tunnel entrance rushes towards you.

Then everything becomes about speed.

Twinkle darts through twisting underwater caverns with astonishing agility. She spins between pillars of stone, dives beneath fallen trees and slips through narrow openings that appear far too small for a dragon.

As water roars around you, silver fish scatter in every direction.

Ahead, glimpses of the other racers flash through the darkness.

"We're gaining!" Twinkle cries.

She surges forward, twisting as the tunnel narrows and jagged rocks loom from the darkness. Ancient roots snake across the passage ahead and Twinkle lowers her head and accelerates.`;}
            if (wizard === "blue") { return `You guide the dragon into the centre of the raging storm.

"Great!" he cries between twists and banks. "I picked up a lunatic who enjoys terrible decisions!"

Before you can respond, he folds his wings and plunges deeper into the heart of the meteor storm.

The starlit sky vanishes, obscured by a tide of rolling stone. Rock and fire fill the heavens. Meteors streak past from every direction. Very few tumble lazily through the void. Most hurtle past like celestial boulders caught within a warring avalanche.

The apprentice weaves between them with increasing confidence, responding instantly to your shouted warnings.

You call out as a meteor the size of a cottage sails overhead. The dragon dives, but down here the storm is thicker.

Fragments of glowing crystal spin through the darkness. Exploding meteors scatter clouds of glittering debris. The forge is barely visible in the distance, but you focus upon it, a beacon of golden light amidst the roiling chaos.

You notice that the starlight within the cradle is beginning to fade. You call out, and the apprentice lowers his head and accelerates into the spinning maelstrom.`;} 

        case "dragonOpposedRaceTestFail":
            if (wizard === "yellow") { return `For a few glorious moments, it seems as though Brozieg will thread the impossible course perfectly.

Then disaster strikes.

The dragon twists sharply to avoid another racer. You feel a violent impact. Something clips your side, sending you crashing against a rock above. Your backpack takes the brunt of the blow and you hear a sharp crack, but there is no time to worry about what may have broken.

Brozieg spins wildly and dives for a wide opening.

"Blast!" he growls.

You burst out into a wide, open cloud-stream.

The less cluttered route, you realise.

Brozieg does not slow, but you feel his huge muscles relax beneath you.`;}
            if (wizard === "green") { return `NO. NO. NO!

Twinkle attempts a gap between two massive roots that is far too small for her. She realises it too late, tries to pull back, but ends up spinning and slamming into the rock.

The fact that you are mostly aligned with the opening when Twinkle collides with the stone probably saves your life. Otherwise, you would have been crushed between dragon and rock.

As it is, your backpack strikes the stone with a terrible crack — the unmistakable sound of something breaking among your possessions.

"Oh no! Oh no! Are you alive?" cries Twinkle.

You call out that you are all right. Twinkle visibly relaxes and abandons her reckless pace, gliding into safer waters.

"Sorry," says Twinkle, sounding thoroughly embarrassed.`;}
            if (wizard === "blue") { return `For several heart-pounding moments, it appears that the apprentice might actually pull off his reckless shortcut.

Then a meteor fragment tumbles unexpectedly into your path.

You call out, but too late.

The dragon tries to bank, but the spinning, cow-sized rock has come from nowhere and is travelling at frightening speed.

Even as the dragon twists away, you know it is not enough.

The two of you crash back-first into the spinning missile. It is only through some miracle that you are not crushed to death between dragon and rock, but your backpack does not fare so well. You hear a dull crunch and know that not everything has survived the collision.

You call out again as another projectile spins past only inches away.`;} 

         case "dragonOpposedRaceTestFailChoice":
            if (wizard === "yellow") { return `You glance back at your pack. Something in there has certainly suffered, but now is not the time to investigate.`;}
            if (wizard === "green") { return `You assure her that you are unharmed, although you are not nearly so certain that your possessions have fared as well.`;}
            if (wizard === "blue") { return `Spotting a gap in the storm, you direct the apprentice towards it.`;} 

         case "dragonOpposedRaceTestPass":
            if (wizard === "yellow") { return `Brozieg's laughter booms across the sky. The bronze dragon hurls himself into the twisting course with impossible confidence. You plunge through narrow arches, skim across cloud-tops and dart between floating pillars so quickly that the landscape becomes a blur of colour and motion.

A wall of cloud looms ahead. Head down, Brozieg flies straight through it, sending obscured masonry spinning off in all directions.

As the debris clears, you see that Brozieg is now alongside three rival dragons.

"Hold on."

As if you weren't already.

He folds one wing and goes into a spinning dive. The world turns upside down, then the right way up, then upside down again so quickly that you feel your head might explode. Then Brozieg snaps his wings open and rockets between two jagged stone spires barely wider than he is.

The crowd roars with approval. Even the rival racers seem impressed.

And there it is.

The finish.

Brozieg streaks towards it like lightning, the three other dragons nipping at his tail. He swoops across the line to a roaring cheer from the crowd and lands gracefully upon a broad shelf of cloudstone.

Panting, he lowers a wing to allow you to slide from his back. The dragon snorts a puff of warm smoke.

"Great work!" he shouts over the jubilant crowd. "Your first time, and we take the cup! You want it?"

When you tell him no thank you, explaining that it would only get in the way of your quest, he nods.

"A small gift then."

He places a talon upon your shoulder and a ripple of magic runs through you.`;}
            if (wizard === "green") { return `Twinkle's uncertainty vanishes.

For a few glorious minutes she becomes the fastest creature in the entire lake.

The young dragon twists through the submerged tunnels like living water itself. She darts between roots, spins through curtains of glowing weed and shoots through narrow stone arches with inches to spare.

The world becomes a blur of green, silver and blue.

Other dragons appear ahead and, one by one, Twinkle overtakes them.

The expressions on their faces are priceless.

"No way! How is she doing that?"

"You're cheating!" shouts the largest of them.

"Am not!"

Twinkle races past them all as the final tunnel appears ahead. She folds her wings tightly against her body and shoots through it like an arrow.

Moments later, you burst from the water into dazzling sunlight. The young dragon climbs into the sky, trailing sparkling droplets behind her. The triumphant cry she releases can probably be heard throughout the entire forest.

You cannot help laughing as she lands beside the shore and lowers herself so that you can dismount. The ride has been exhilarating.

"Thank you," says Twinkle. "Here..."

She taps you gently with her wing.

She is positively glowing with pride.

"I won the Death, Death, Bang, Bang!"

She lets out a tremendous laugh before alternating between racing in circles, chasing her tail, hopping into the air and snorting glittering silver dust.`;}
            if (wizard === "blue") { return `The apprentice dragon becomes a streak of silver lightning.

Every warning you shout is answered instantly. Every turn is executed perfectly. Together you carve a path through the storm that seems less like flying and more like dancing.

A blazing meteor hurtles towards you. The dragon rolls beneath it. Another tumbles across your path and he twists through a gap barely wider than his wingspan. A shower of sparkling debris explodes ahead. The apprentice folds his wings and shoots straight through the centre of it.

The fading orb of starlight suddenly brightens.

Ahead, the forge looms ever larger. Its gates are already opening.

"Hold on!" shouts the dragon.

You surge forward in a final burst of speed. The apprentice crosses the threshold, the orb blazing strongly within its cradle.

A tremendous cheer erupts from the gathered starsmiths.

The young dragon drops you off before circling triumphantly overhead.

"We did it!"

The exhilaration of the flight is written clearly across his face.

"Good job, lad," says one of the starsmiths. "Now get down here and let us get that starlight off your back before it fades during your celebration dance."

"Oh. Sorry!" says the young dragon, dropping quickly to the platform.

When he lands, he turns to you.

"Thank you," he says. "Here..."

He reaches awkwardly towards you and touches a talon to your forehead. You feel a warm magic wash through you.

Once the starlight has been dispatched and the cradle secured for the return journey, the dragon says, "Hop on. I'll fly you back to the mainland."

With no fading starlight to race against, the return journey is blissfully uneventful.`;} 

         case "dragonOpposedRaceTestPassChoice":
            if (wizard === "yellow") { return `You thank the dragon for the boon and for the exhilarating ride, and with a final farewell, continue on your quest.`;}
            if (wizard === "green") { return `You call out your thanks to the excitable young dragon for an unforgettable journey and continue on your quest.`;}
            if (wizard === "blue") { return `As the dragon drops you off, you bid him a grateful farewell and continue on your journey.`;} 

         case "dragonRealmPath":
            if (wizard === "yellow") { return `You have been watching a huge cloud bank that has been moving oddly for a while now. It is only as you get closer that you realise they are not clouds at all. At first, you mistake them for a distant mountain range drifting across the heavens, but as you draw nearer you realise you are looking at a city under construction.

Thousands of stone platforms hang suspended in the open sky, some no larger than cottages, others vast enough to support entire villages. Bridges of crystal arch between them. Broad causeways woven from dense white cloud stretch from platform to platform like roads spun from mist.

The place teems with activity. Dragons wheel through the air carrying enormous blocks of stone in their claws. Others haul entire sections of buildings slung beneath their bellies. Far overhead, a pair of colossal drakes glide slowly between the floating foundations, each bearing an entire district of half-finished structures upon its broad back.

As you stand watching, a shadow passes over you.

A pair of stout bronze dragons descend nearby, struggling to manoeuvre a large stone platform carved with rows of unfinished pillars. The structure sways alarmingly between them before they finally lower it onto an empty cloudbank with a collective groan.

"Right," says one dragon, wiping dust from his snout. "Where does this go?"

The second dragon blinks.

"How should I know?"

The first points a claw at you.

"Ask him then."

The second stares around.

"Ask who?"

"The little land walker."

"The human?"

"Yes."

"Why would a human know where the temple goes?"

The first dragon spreads his wings as though the answer is obvious.

"Because it's being built for land walkers."

The second dragon shakes his head but turns to you anyway.

"So, boss, what should we do with this?"`;}
            if (wizard === "green") { return `The path descends through a shallow valley where the grass grows thick between shelves of pale stone. Here and there stand weathered figures no taller than your horse: dragons carved from grey rock. Some crouch upon their haunches, wings folded against their sides, while others curl around smooth stones as though guarding treasures long since lost.

There are dozens of them. At first, you take them for old boundary markers or the work of some forgotten sculptor. They are obviously ancient. Moss gathers upon their backs and flowers grow between their claws. They lie half buried in the earth, with nicks and chips scattered across their carved, scaly bodies.

As you walk among the scattered statues, admiring the craftsmanship, one of them blinks and then snorts. You almost fall over backwards.

You have barely recovered your senses when the little dragon shakes itself like a dog shedding water, and a deep grinding sound rolls through the valley.

The hillside you have just walked down rises.

You scramble back, tripping over another statue, which is now moving too. Earth slides down the ripping hillside, revealing a vast grey flank. Trees sway as an enormous head lifts from the slope itself, and great amber eyes open beneath brows crusted with lichen and moss.

What you had taken for a hill is, in truth, a dragon of such size that the landscape has grown upon her back.

What you thought were statues appear to be her litter. They yap, leap and flutter, gathering around her boulder-sized feet.

The great dragon lowers her head until one eye, larger than a wagon wheel, is level with you.

"Small walker," she says, her voice like distant rockfalls. "This is opportune. Perhaps you can aid us. We are a hatchling short. An egg lost, and we, being large, inflexible creatures, are unsuited to narrow places and have failed to retrieve it. Perhaps small hands may succeed where claws cannot."

With no reason not to, you agree to help the dragon.`;}
            if (wizard === "blue") { return `The path climbs steadily until the ground itself begins to change. The dark stone becomes smoother, and flecks of silver begin to appear within it.

You look up at the countless stars wheeling overhead, so bright and numerous that they cast pale shadows upon the ground. Some drift slowly across the heavens, while others remain fixed in ordered patterns. You watch one cluster rearrange itself while you stand there, as though invisible hands had moved the stars upon a great black map.

A low bell sounds somewhere in the distance.

Following the sound, you come upon several dragons gathered upon a ridge. They are lean creatures with dark scales that gleam like polished iron. They carry long rods of silver metal while dragging chains of faintly glowing stone behind them.

One dragon points upward as it approaches and says in a deep, sonorous voice, "You have picked a good night to be upon this shore. 'Tis the Celebration of the Constellations. Out with the old and in with the new.

"If you wish to watch, come with us. We head now to the viewing station."

A smaller, probably younger dragon carrying neither rod nor chain laughs.

"Or come with me. I'll fly you up there. We'll see the Clearing of the Heavens up close."`;} 

         case "dragonRealmPathChoice1":
            if (wizard === "yellow") { return `Will you see if you can work out where the platform should go?`;}
            if (wizard === "green") { return `Will you organise the dragons into a careful, methodical search of the area?`;}
            if (wizard === "blue") { return `Would you like to accompany the dragons heading to the viewing station?`;} 

         case "dragonRealmPathChoice2":
            if (wizard === "yellow") { return `Would you rather hop onto the platform and cry, "FOLLOW ME!"?`;}
            if (wizard === "green") { return `Would you rather dive in and see what you turn up?`;}
            if (wizard === "blue") { return `Would you rather take the younger dragon up on his offer and fly up there to witness the Clearing of the Heavens?`;} 

         case "dragonRealmPathHint":
            if (wizard === "yellow") { return `You take a careful look around before answering.

The floating city appears to have some sort of plan behind it, although it is a little hard to see, as many of the areas under construction are hanging in the air like scattered toys. Towers hang upside down beneath neighbouring platforms. Entire streets appear to have been laid sideways, and in a few places half-constructed platforms are stacked awaiting insertion.

Still, after a few minutes of observation, you can see that, while the sections are not orientated as sensibly as perhaps they might be, they are at least roughly landing where you would expect them to be.

You point towards a broad avenue of half-completed structures leading towards the heart of the one-day sky city.

"Suppose that makes sense," says the dragon who figured a human would know. "Stick it near the middle. That way, if the boss wants it moved, it's as close to everywhere else as it can be."

Not exactly your logic.

As the dragons lift the platform and lumber away, you wonder if all site decisions are made by random passers-by, and what the city might look like when finished if that is the case.

Curious, you follow along an arcing cloudbank being used as a delivery route to the site.

The temple is eventually lowered into place beside a grand avenue stretching across several linked platforms. Running along both sides of the road are elegant bands of silver-blue stone that gleam softly beneath the sunlight.

You ask one of the nearby workers about them.

"That?" says the dragon. "That's the Antiquity Road. This will be the Temple of the Great Oak when it's done. Part of a pilgrimage, apparently. You know, for tree nuts. They visit some shiny tree and then come here. Runs all the way to the old quarter. Apparently, if you follow the silver-blue far enough, it leads all the way back to the tree. I can tell you that ain't true, 'coz we haven't built the old quarter yet."`;}
            if (wizard === "green") { return `You lead the little dragons through the maze of stones, roots and fallen trunks, searching in a grid pattern. Landscape that scarcely hinders you proves troublesome to these creatures made of living rock, and it soon becomes apparent why they need your help.

The pups watch you with bright, patient eyes while the great mother remains still, her head resting between her forelegs, allowing you to search the hillside.

You search among the hollows and fern beds where a dragon's egg might have rolled. At first, you find nothing save smooth stones and old nests abandoned by birds. Then, beneath a fallen tree, you discover a narrow passage hidden by curtains of moss.

The opening is too small for any of the dragons, and there within the tunnel lies the lost egg, resting safely at the end of the passage.

You squeeze inside and retrieve the egg, the dragon pups yapping and snorting excitedly as you do so. Once recovered, you return it to the mother.

Great relief shows upon her ancient face as she accepts the egg.

"Small walker," she rumbles, "you have done me a great service this day. Tell me, what can I offer in return? I have little by way of possessions, and my kind possess no magic, but anything you find useful within my long memory you are welcome to."

You tell the dragon of your quest and ask if she knows where you might find Antiquity.

One of the smaller dragons scrapes at the earth, revealing the same silver-blue thread running through the bedrock.

"Find the Gatekeeper and follow the silver-blue when bidden," says the mother. "Only then will the silver-blue lead you to that particular ancient magic."

"Now we must sleep once more. Thank you again, small walker."`;}
            if (wizard === "blue") { return `The dragons lead you along narrow ridges of black stone until you reach a great basin sheltered by towering walls of crystal. At its centre burns no fire, but rather a whirlpool of pale starlight contained within rings of silver metal.

It transpires that your guides are workers rather than spectators, for once they have shown you to the viewing platform, they head down into the crater to join several other dragons working around the forge.

You watch as the dragons place fragments of light upon anvils of dark stone. They then strike them with wide silver hammers that ring like distant bells as they split the light shards. Each blow sends sparks rising upward into the sky, where they coalesce into new stars and begin to form a new constellation.

It is a captivating and beautiful sight.

The oldest of the dragons below notices your fascination.

"Once the roads between realms were marked from above," it says. "Travellers looked to the heavens as often as they looked to the ground."

The dragon draws a rod through the pool of light. The tip emerges coated in a pale silver-blue glow.

"This colour, for instance, will guide you to ancient magical knowledge. The old markers still use it below, even if they have forgotten from where it originates. The paths may fade, but the silver-blue remains wherever true ancient magic resides."

You watch as the constellation is completed and eventually released into the heavens.`;} 

         case "dragonRealmPathHintChoice":
            if (wizard === "yellow") { return `You thank the worker and follow the silver-blue road. It might not take you all the way to antiquity, but at least you know you are heading in the right direction.`;}
            if (wizard === "green") { return `You thank the dragon and leave her and her litter to return to their hibernation.`;}
            if (wizard === "blue") { return `You thank the starsmiths for a wonderful spectacle and continue your journey in search of Antiquity.`;} 

         case "dragonRealmPathTest":
            if (wizard === "yellow") { return `You leap onto the platform.

Drawing yourself up to your full height—a pointless action when you are little more than squirrel-sized compared to the dragons—you begin issuing instructions.

With gusto, you demand the relocation of platforms, the installation of pillars, the orientation of districts, the righting of towers, and the construction of bridges.

To your great surprise, the two workers who asked for your assistance set to work frantically following your instructions. Soon they rope nearby workers into the build, and to your astonishment they too set to work without question.

Before long, you have half the site buzzing around under your direction, with more dragons lining up awaiting your guidance. Somewhere along the way, your bravado has been mistaken for expertise, and you are now the acting foreman of a dragon crew building a city in the sky.`;}
            if (wizard === "green") { return `You decide that if an egg has been lost, then perhaps it rolled, was carried away, or lies somewhere the dragons themselves have overlooked.

Ignoring the helpful nudges of the smaller creatures, you climb the great mother's stony flank. Trees and bushes grow from the folds of her back, and from that lofty vantage you can see much of the valley below.

A narrow cleft runs through the rocks nearby.`;}
            if (wizard === "blue") { return `Once you are upon the young dragon's back, it launches itself from the ridge and hurtles towards a patch of darkness above that seems strangely devoid of stars.

"It's being cleared to make way for the new constellation," says the dragon, almost as if he can read your thoughts. "Look!" he cries excitedly. "The Star-Eater!"

At first you do not see it, not because it was not there, but because it was simply too large for you to comprehend. A dragon too vast for your mind to grasp. A dragon large enough to swallow a sun, which is exactly what it is doing.

Now that you understand, albeit barely, what you are looking at, you can make out scales blacker than the sky itself and a mouth glowing with a deep red light. The Star-Eater drifts through the heavens with slow, effortless strokes of its unfathomable wings. Each time it opens its jaws, a star vanishes from the sky.

The younger dragon beside you speaks almost reverently.

"It clears the old, fading stars so the forge dragons may build new ones."`;} 

         case "dragonRealmPathTestPass":
            if (wizard === "yellow") { return `The situation quickly gathers momentum. Dragons fly off carrying instructions to distant platforms. Builders begin shifting foundations. Surveyors consult enormous scrolls covered in diagrams and measurements.

Before long, a sleek silver-scaled dragon descends from above and studies the scene with narrowed eyes.

"Who authorised all these changes?"

The whole crew of dragons turns to look at you.

The dragon circles once overhead before laughing.

"Remarkable. I've never seen this lot so busy."

To your relief, the dragon seems more amused than annoyed.

"You can settle down, lads. We don't need to finish the site today."

Once the sleek silver dragon has returned the rhythm of the site to the right side of sane, she introduces herself as one of the senior planners overseeing the project. She descends to the platform you were orchestrating from, shrinking down to your size as she does so.

"Useful trick," she says. "Means I can see the site as your kind might. You get a different feel for the place when you can walk its bones."

As you walk together through the construction, she points out several landmarks taking shape across the realm.

"There," she says, indicating a distant platform crowned by glittering foliage. "One of the Temples to the Silver Trees."

You follow her gaze to a tall, mostly built marble structure. Even from this distance, its walls shine like polished moonlight.

You ask why one tree needs two temples, and she seems surprised.

"There are two trees," she says. "One offers knowledge; the other is steeped in deep, ancient magic. Both trees are holy, but you may only visit one in any realm."

"Ah, this is me," says the dragon. "Thanks for giving my team a boost. We might even get this one built on time now."`;}
            if (wizard === "green") { return `Trusting your instincts, you descend into the cleft. Beneath the overhanging stone stand a pair of slender trees unlike any others in the valley. Their bark is smooth and pale, while their leaves shine with a faint silver-blue lustre.

Between their roots lies the missing egg.

The young dragons gather excitedly as it is returned, and even the great mother gives a deep rumbling sound that might be laughter.

"You have good eyes, small walker," she says with great relief. "You have done me a great service this day. Tell me, what can I offer in return? I have little by way of possessions, and my kind possess no magic, but anything you find useful within my long memory you are welcome to."

You tell the dragon of your quest and ask if she knows where you might find the great and ancient Silver Oak.

"There are two in this realm, small walker," says the mother. "You will need to find the Gatekeeper. He will show you the paths. Silver-blue if you seek knowledge and transition. Silver-green if you seek great and ancient magic.

"Now, I'm afraid, we must sleep once more. Thank you again, small walker."`;}
            if (wizard === "blue") { return `You remain still and watch in awe of the galactic beast.

As the great dragon consumes another dying star, something catches your eye. Not every star in the old constellation is taken. A pair of stars, one shining with a pale silver-blue radiance and the other with a silver-green glow, remain untouched while the surrounding heavens are cleared.

The younger dragon notices your interest.

"The Twin Trees," it says. "They are never eaten. They are an ancient magic tied to the realms below."

Far above, the two stars continue to shine while the old constellation disappears around them.

"The ancient road-makers used them," says the dragon. "When travellers seek either of the ancient trees below, they need only look to the heavens to light their way. Silver-blue for knowledge and silver-green for old earth magic. Other stars may change, but those two will always shine."

The two of you watch as the Star-Eater devours the last of the dying stars. Then the young dragon turns and carries you back down to the earth below.`;} 

         case "dragonRealmPathTestPassChoice":
            if (wizard === "yellow") { return `With that, she launches into the air, resuming her normal size as she does so and leaving you to continue your journey.`;}
            if (wizard === "green") { return `You thank the dragon and leave her and her litter to return to their hibernation.`;}
            if (wizard === "blue") { return `You thank the dragon for an amazing experience and continue your journey in search of Antiquity.`;} 

         case "dragonRealmPathTestFail":
            if (wizard === "yellow") { return `For several glorious minutes, everything appears to be proceeding perfectly.

Then somebody asks a question.

Unfortunately, that dragon asks another dragon, who asks a third dragon, who asks a fourth dragon, and before long a heated argument is spreading across the site.

Platforms are dragged in all directions. Towers are picked up and scattered like chess pieces across the skyscape as streets are torn up, moved across the site, and dropped in places that you know no human could ever reach.

An amphitheatre is just being dragged onto the bakery district when an enormous foreman dragon swoops out of the sky, takes one look at the mess, and bellows a roar loud enough to flatten a nearby recreation park awaiting installation.

All work stops.

Then the foreman starts barking instructions. He doesn't seem interested in how things reached this state and doesn't appear to have noticed you.

The dragons spend the next hour untangling the mess you inadvertently caused, but they seem quite happy about it.

It seems that whatever this colossal breed of dragon is, it loves to follow orders. A point confirmed when you hear two foremen chuckling.

"You could tell this lot to put the moon in an egg cup, and they'd give it a go as long as you shouted it loud enough."

The work crew seems happy after their beasting.

"Best afternoon we've had in weeks," one remarks cheerfully as he passes. "Foreman hasn't shouted orders that clearly in a long time."`;}
            if (wizard === "green") { return `You stride up the sloping hillside that is the mother's back, convinced that the egg will be there. Drawn by your confidence, the dragon pups follow, scrambling behind you and sending loose stones skittering down the hillside.

There!

You see it: the lost egg nestled within a protruding root knot upon the hillside.

You run towards it. The pups, thinking it a game, run with you, sending showers of pebbles cascading down the slope.

You grab the egg, hold it aloft, and suddenly the hillside gives way around you. Earth, trees and rock dragon pups tumble with you down the loosened earth, no longer clinging to the ancient mother's back.

You crash to the valley floor with the egg still in your arms, alarmed dragon pups yapping all around you.

The great mother watches the confusion with ancient patience, though she seems relieved that you have found her lost egg.

"A little chaotic, small walker," she says. "But still, I am grateful.

"Thank you, small walker. I must now return to my litter. They are somewhat excited, and I must settle them again for hibernation."`;}
            if (wizard === "blue") { return `The sight of the mind-bending creature unsettles you. It is simply too vast to understand. A dragon that can swallow stars.

As if it knows your thoughts are upon it, the galactic monster's head turns towards the earth. The younger dragon cries out and scrambles wildly through the sky.

"It's not supposed to do that!" it cries.

For one dreadful moment, its twin sun-like eyes seem to settle upon you. Heat washes over you as the sky brightens beyond a summer's day and your skin prickles.

But it is over within seconds.

The Star-Eater returns to its task.

The younger dragon gives a nervous laugh.

"You alright? Perhaps we're better off back on the ground."

The dragon flies you back to the earth, then heads off towards the forge.`;} 

         case "dragonRealmPathTestFailChoice":
            if (wizard === "yellow") { return `Baffled by it all, you leave the site and continue your journey, but not before shouting: "PUT ALL THE DUCKS IN A SAUCEPAN IN THE LIBRARY!"`;}
            if (wizard === "green") { return `Glad to have delivered the egg, albeit in a somewhat chaotic fashion, you gather your horse and continue your journey.`;}
            if (wizard === "blue") { return `You watch as the last few stars blink out of existence to make way for the new, then continue on your journey once more.`;} 

         case "dragonRedPath":
            if (wizard === "yellow") { return `A rumble rolls across the skies and the ground quakes. Once again, you are reminded of the sheer willpower that your brother is exerting to hold the realm together.

When the disturbance settles, you notice that the clouds here are pale gold and lavender, drifting in vast, slow rivers beneath a now-still sky of turquoise and white.

Ahead, floating amongst the clouds, hangs a great stone basin nearly a hundred paces across. Its surface is filled with swirling vapours. Images rise and dissolve within it: armies marching, kings being crowned, forgotten villages, lovers embracing, battles fought and lost.

Seated around the rim of the basin are three dragons.

They are enormous creatures, their scales covered entirely in glowing runes. The symbols crawl slowly across their bodies like living script. Their eyes are pale and distant.

Every so often, one reaches into the cloud-filled basin with a talon and lifts out a fragment of history: a forgotten treaty, the name of a dead shepherd, the final words of a vanished king. Each dragon studies its prize before swallowing it whole.

You realise with a chill that these are History Eaters. You knew that they existed, but never thought you would see one. These ancient creatures consume those portions of the past that have grown too old, too obscure, or too unimportant to be remembered.

One dragon lifts an entire battle from the clouds and devours it, while another delicately consumes the memory of a long-collapsed bridge.

Yet beside the nearest dragon rests a small collection of untouched memories, glowing faintly upon the stone.`;}
            if (wizard === "green") { return `A rumble rolls across the skies and the ground quakes. Once again, you are reminded of the sheer willpower that your brother is exerting to hold the realm together.

The forest path bends between silver-barked trees and opens suddenly onto a broad glade carpeted with soft moss and scattered wildflowers. Sunlight pours down through the canopy, turning the clearing into a pool of gold and green.

At the far side of the glade, beneath the shade of several ancient trees, reclines a group of sleek silver dragons. Their scales gleam like polished moonlight, and they lounge together in apparent comfort, talking quietly amongst themselves.

Closer at hand, however, the scene is considerably less dignified.

Two young male dragons circle one another in the centre of the clearing, trading dramatic blows that produce much noise and very little injury. Each strike is followed by a quick glance towards the silver females to see whether they are watching.

Nearby, another dragon leans against a tree, singing in a rich, mournful voice while carefully arranging his wings to their greatest advantage. Overhead, a fourth dragon dives and twists through the air in pursuit of an unfortunate bird, performing spectacular aerial manoeuvres and repeatedly checking whether his audience is watching.

Only one dragon seems entirely removed from these displays. He stands nervously at the edge of the clearing, clutching a small chest against his breast. Every few moments he takes a hesitant step forward before losing his courage.`;}
            if (wizard === "blue") { return `A rumble rolls across the skies and the ground quakes. Once again, you are reminded of the sheer willpower that your brother is exerting to hold the realm together.

You head out towards the shore stretching ahead of you. The black sand crunches beneath your boots as you walk along the obsidian beach. Above, countless stars burn against an endless darkness, their reflections glittering upon a silent sea as black as polished glass.

Ahead of you, half buried in the shore, lies the shattered hull of a vast galley.

Its timbers are blackened by age and polished smooth by centuries of wind and spray. The vessel has lain here for so long that the sand itself seems to have grown around it. Yet although the seaward side of the ship has been smashed open, the half resting upon the beach remains remarkably intact.

The vessel has fallen onto its side, placing what were once the upper and lower decks almost level with the shore. With your mind brimming with tales of pirates' treasure, you decide that the wreck is worth investigating.`;} 

         case "dragonRedPathChoice1":
            if (wizard === "yellow") { return `Will you examine the abandoned memories?`;}
            if (wizard === "green") { return `Will you approach the nervous dragon?`;}
            if (wizard === "blue") { return `Will you climb onto the upper decks`;} 

         case "dragonRedPathChoice2":
            if (wizard === "yellow") { return `Would you rather approach the History Eaters themselves?`;}
            if (wizard === "green") { return `Would you rather visit the silver dragons beneath the trees?`;}
            if (wizard === "blue") { return `Would you rather explore the lower decks?`;} 

         case "dragonRedPathHint":
            if (wizard === "yellow") { return `Several memories lie upon the stone rim beside the nearest dragon.

Most are dim and fading: a merchant arguing over the price of grain; a child losing a toy; the collapse of a forgotten tower.

But one memory burns with a bright silver light. As you touch it, the air around you shimmers. You see a path winding through silver-green mist. Ancient branches spread above it like the vault of a cathedral. A vast figure stands before a gate of living wood, motionless as a mountain.

Words accompany the vision.

"The Silver Tree stands beyond the Silver-Green Path. Before its roots waits the Gatekeeper, whose watch has endured since the oldest memories first took root. The tree's branches hold magics so ancient that even time itself forgets their names."

The vision fades.

One of the History Eaters opens a pale eye.

"Too old," it murmurs. "Too important to consume. We leave certain things behind."

The great dragon closes its eye once more.`;}
            if (wizard === "green") { return `The young dragon starts when you approach and nearly drops the chest he is carrying.

"Oh!" he exclaims. He glances towards the silver dragons. "Do you think they saw that? No. No."

He turns to you and says in a nervous voice, "Do you think this is enough for them to notice a dragon like me?"

He fumbles with the chest, eventually getting the lid open. Inside lies a collection of modest treasures: polished stones, fragments of crystal, old coins, and curious shells. Nestled amongst them is a single silver acorn.

You ask about the acorn.

"Oh, that?" the dragon says, looking slightly embarrassed. "It's only an ordinary acorn painted silver. But I was planning to tell them that I walked the silver-green path, fought the Gatekeeper, reached the Silver Tree itself, and plucked this from its branches."

He gazes once more towards the females.

"Do you think that would impress them?"

You avoid giving a direct answer.`;}
            if (wizard === "blue") { return `The upper reaches of the galley are little more than a grave of driftwood and broken beams. Whatever wealth the ship once carried has long since been claimed by time, tide, or thief. You sift through collapsed cabins and shattered furniture, but discover nothing of value.

Eventually, you enter what was perhaps once the captain's quarters or some kind of chart room.

The chamber is almost bare. Rusted fittings cling to the walls, and mouldering shelves sag beneath the weight of ruined books. You are about to leave when one of the volumes catches your eye.

Its cover is bound in silver-grey leather, and upon it is embossed the image of a single silver acorn.

The Silver Tree.

Your heart quickens as you lift the book. Sadly, the pages within have long since decayed. Most dissolve into powder as you open them. Only the synopsis upon the inside cover remains legible.

Beyond the Silver-Green Path stands the Silver Tree, whose ancient branches shelter the deepest magics of forgotten ages. Those who seek its boughs must first pass the Gatekeeper, whose vigil has endured since the first stars were kindled. The tree's fruits, the silver acorns, each contain mysteries older than kingdoms and powers drawn from the roots of creation itself.

You carefully return the ruined volume to its shelf.

As you turn to leave, the ship suddenly shifts. The entire wreck groans. A crack opens in the deck beside you. Peering through, you glimpse a vast golden eye opening in the darkness below. Beneath the lower decks lies a mountain of treasure, and upon that mountain rests a dragon so enormous that the entire wreck seems little more than a shelter built around its hoard.

The eye slowly closes once more.`;} 

         case "dragonRedPathHintChoice":
            if (wizard === "yellow") { return `Not wishing to disturb the dragons any more than you already have, you quietly leave the basin and continue your search for Antiquity.`;}
            if (wizard === "green") { return `Wishing the young dragon luck, you leave him to gather his courage and continue your search for Antiquity.`;}
            if (wizard === "blue") { return `Deciding that this is an excellent moment to leave, you retreat from the ship as quietly as possible and continue your search for Antiquity.`;} 

         case "dragonRedPathTest":
            if (wizard === "yellow") { return `You approach the History Eaters cautiously and watch silently for a while. They dip into the pool, each carefully sifting through memories before selecting one to consume.

As you watch, a battle is drawn from the basin and quietly devoured. You wonder at the lives lost that will never again be remembered.

You observe them for some time before the nearest dragon opens an eye and says, "Can we help you, little one?"

You are not sure what to say. You had been intrigued by what they were doing, but cannot see how their abilities might benefit your situation. You are just stammering an apology and preparing to leave when a thought occurs to you.

"Yes," says the dragon hesitantly. "We can see the future."

You are astounded that this is exactly what you were about to ask. Before you can speak, however, the dragon sighs.

"I know. That thought you just had is now history, so I can see it as clearly as you can see me. And yes, we can see the future, though we would never consume it. But it is... unsettled, and there is a cost to the subject."

The dragon farthest from you reaches slowly into the basin. The vapours part around its talons and, instead of a memory, it withdraws a strand of pale light unlike anything else within the clouds. The images upon it shift constantly.

You glimpse the same scene as a battlefield, as the site of a ruined tower, as a peaceful garden, as an archaeological dig, and as a straggling wood.

"These are merely possibilities for this land's future. Nothing is fixed, though it becomes calmer the closer we draw to the present. Then the images settle as they become part of the glorious past."

Before you can ask your next question, the dragon sighs again. It is a deep and sorrowful sound.

"Yes, should we look for it, we could see your future too, though it would take great strength on your part to endure the search. It is forbidden for us to show you directly. At best, we could offer only vagaries."

"Oh," says the dragon, his wings slumping very slightly as he observes your next thought becoming history. "I see that you will not be turned from this path. Very well. We shall follow the strands and see whether you ever lift the Red Crown."`;}
            if (wizard === "green") { return `You walk towards the silver dragons beneath the trees. Up close, they appear far less interested in their admirers than the admirers are in them. They converse amongst themselves, occasionally exchanging amused glances as another dramatic performance unfolds in the clearing.

One of them raises her head as you approach.

"Wizard," she says, "would you be a dear and clear this lot away? A moment's peace is all we ask."

You look back at the competing suitors. The fighting dragons have become louder, the singer more mournful, and the aerial acrobat nearly collides with a tree.

You nod and turn to the performing dragons.

Calling out, you attract the immediate attention of every male dragon in the clearing. The effect is remarkable. At the mention that you speak on behalf of the silver dragons, every eye fixes upon you.

You announce that the silver dragons will only consider a suitor who proves himself truly worthy. Such worth, you explain, can only be demonstrated by undertaking a mighty quest: to walk the silver-gold sea, defeat the Ancient Sleeper, and pluck a silver pearl from the legendary Salamander Clam. That pearl must be wrapped in moonlight and must have grown larger than a man's head.`;}
            if (wizard === "blue") { return `You descend into the lower reaches of the wreck.

Unlike the upper decks, these chambers remain surprisingly intact. Ancient lanterns hang from the beams, and vast piles of treasure fill the hold from wall to wall. Gold coins, jewels, silver cups, and strange artefacts spill across the timbers in glittering heaps.

You would be excited to find such a haul were it not for the immense golden dragon watching you from atop it.

His scales shine like beaten metal in the starlight filtering through cracks in the hull. He rests upon his hoard and appears completely unconcerned by your presence. Why would he be? He could flick you aside as easily as you might flick away a ladybird if you bothered him. You suspect he has spent centuries gathering the wealth of every wreck that has washed upon these shores.

One golden eye opens as you enter. The dragon studies you for several moments.

"Bored," he rumbles.

The single word echoes through the hold.

"Tell me a story. If I enjoy it, you may leave with something from my hoard. If I find your tale dull, I shall flick you from this ship as you might flick a ladybird from your arm."

Uncanny!

"Sound fair?" asks the dragon. Before you can answer, he settles more comfortably amongst his treasure. "Good," he says. "Dazzle me."`;} 

         case "dragonRedPathTestPass":
            if (wizard === "yellow") { return `The sensation is unlike anything you have ever experienced. Though the dragons keep the basin well below your sight, you can somehow feel them drawing upon the strands of your future. Possibilities seem to tug gently at your thoughts. Lives that may be yours brush against your mind and vanish again.

The dragons work for a very long time, churning the clouds in the basin, the runes upon their bodies pulsing as they sift.

At last, the three ancient creatures lift their heads in unison. They are silent and appear puzzled. They share a few quiet words in a language that you do not recognise, and then the closest dragon speaks.

"It is unsurprisingly unclear whether you will ever lift the Red Crown. Many paths lead to the crown. Many do not. But..."

They share another glance amongst themselves.

"But in all your futures, we grant you a gift. This is unprecedented. We never alter the present; we only consume the past. But there can be no doubt. The strands cannot lie. Therefore, upon you we shall bestow the Fire of the Twin Suns."

At this, the three History Eaters close their eyes and raise their heads towards the heavens. Far above, two distant suns burn beyond the cloud layer.

The dragons begin to chant, and the runes upon their scales blaze like molten silver. The clouds within the basin whirl upward in great spirals while beams of gold and white light descend from the heavens.

The two lights meet between the dragons. Golden fire and white fire twist together into a single radiant flame.

"The Fires of the Twin Suns," says the dragon as the flames descend gently into your hands. "Use them in battle to draw strength from the suns and blind your foes."

GAIN ITEM

The Fires of the Twin Suns

The light within the basin slowly settles. The dragon looks upon you with quiet curiosity.

"No, do not thank us," says the dragon, seeing your next thought. "We had no choice. There was only one path."`;}
            if (wizard === "green") { return `For several moments, there is complete silence.

Then one dragon cries, "I shall undertake this quest and prove my valour!"

"No, I shall!" shouts another.

A third launches himself into the air. "The pearl shall be mine!"

Almost as one, the male dragons abandon their songs, contests, and displays and soar skyward in search of the impossible quest you have described.

As peace settles upon the glade, the silver dragons exchange impressed glances.

"Clever little wizard," one of them says.

The dragon who spoke to you earlier introduces herself as Wrym. She breathes out a small flame of emerald fire, catching it delicately between her claws. The fire burns without consuming the air around it.

"Take this in thanks," she says. "Should you release it in battle, its flames shall strengthen your arm even as they burn your enemies."

She places the living flame in your hands.

GAIN ITEM
Wrym's Fire`;}
            if (wizard === "blue") { return `You speak of your travels through the magical realms. You tell the dragon of your search for Antiquity and of your intention to consult your brother before entering the hostile red realm of Ommadon. You speak of the crown, of ending the tyrant's rule, and of uniting the four kingdoms into a new realm of magic beyond the reach of fear and hatred.

You describe a world where dragons and magical creatures may flourish, and where mankind may still touch wonder through dreams, stories, and imagination.

When your tale is finished, the hold becomes silent. The dragon studies you for a very long time. At last, he nods.

"You know," he says, "I rather enjoyed that."

His great talon sweeps across his hoard.

"Forget these trinkets."

He points instead towards a crack in the overturned hull where the stars shine overhead.

"Let us give you something that belongs to this realm alone."

The dragon makes a slow circling motion with one claw. As he does so, starlight begins to pour through the opening above. The light twists and gathers around his talons, becoming a shimmering veil of silver radiance.

"Take it," he says. "Wear it in battle and the strength of the stars shall be yours, while your enemies will be left blinded by their light."

He places the shining veil in your hands.

GAIN ITEM

Light of the Stars`;} 

         case "dragonRedPathTestPassChoice":
            if (wizard === "yellow") { return `You leave the History Eaters still watching you with open curiosity and continue your search for Antiquity.`;}
            if (wizard === "green") { return `Thanking the silver dragons, you leave the now peaceful clearing and continue your journey in search of Antiquity.`;}
            if (wizard === "blue") { return `You thank the ancient dragon and leave the wreck behind, continuing your journey through the realm in search of Antiquity.`;} 

         case "dragonRedPathTestFail":
            if (wizard === "yellow") { return `The dragons lower their talons into the basin.

At once, you feel a strange pulling sensation. It is not painful, but it is deeply unpleasant, as though something within you is being stretched thin. Possibilities seem to unravel around your thoughts.

The dragons work in complete silence, the runes lining their bodies pulsing with a dull glow. They churn the clouds, from time to time adjusting strands deep within the basin and out of sight.

The effort of having your future tugged about leaves you weak.

At length, the dragons withdraw their claws and lift their heads.

"It is inconclusive," says the dragon closest to you.

You wait for an explanation, but none comes. When it becomes clear that the dragons have nothing more to say, you step back from the basin. A wave of draining dizziness washes over you.`;}
            if (wizard === "green") { return `No sooner have you finished your proclamation than one dragon leaps to his feet.

"I shall undertake this quest to prove my valour!"

"Nonsense!" roars another. "I shall prove myself worthy!"

"No, I shall!"

Within moments, the argument descends into chaos.

Dragons collide in mid-air. Claws slash. Wings beat furiously. Fire streams through the clearing, and spells crackle between the combatants as each attempts to establish his superior courage.

You have only enough time to realise your mistake before a stray spell strikes you squarely in the chest.

You are hurled backwards into the startled silver dragons.

The silver dragon who first addressed you watches the brawl with mild amusement.

"Well," she remarks, "it isn't exactly quiet, but it is rather entertaining."

Deciding that discretion is the better part of survival, you scramble to your feet and hastily leave the clearing before one of the combatants accidentally turns you into ash.`;}
            if (wizard === "blue") { return `You tell the dragon of your search for Antiquity, of how you are combing this realm in the hope of retrieving a silver acorn of—

One enormous claw reaches towards you and, with a flick, you are flying through the air.

You shoot from the broken hull of the galley and tumble across the black sand beyond. Remarkably, nothing appears to be broken, and you have suffered no physical injury. Yet as you struggle to your feet, you feel strangely diminished. Something was drawn from you by the dragon's immense magic in the briefest moment that he touched you.`;} 

         case "dragonRedPathTestFailChoice":
            if (wizard === "yellow") { return `The ancient History Eaters return to their endless task, consuming forgotten ages while you gather yourself and prepare to continue your search for Antiquity.`;}
            if (wizard === "green") { return `You collect your horse and continue on your way.`;}
            if (wizard === "blue") { return `Counting yourself fortunate that the encounter ended no worse, you leave the black shore behind and continue your search for Antiquity.`;} 

         case "dragonPath":
            if (wizard === "yellow") { return `The path brings you to a wide platform suspended among the clouds. It appears to be some kind of hub, laid out rather like a park in the sky. Four further paths lead onward from here.

The first, The Silver Parade, is a winding, silver tree-lined avenue that disappears through the clouds towards a distant platform, where you can make out a group of large creatures gathered in discussion.

The second path passes the grand Festival Fountain that appears to form the centrepiece of the park. Beyond it, you can both see and hear some sort of event taking place, although it is too far away for you to make out exactly what is happening.

The third route passes through a play area where a group of tiny drakes laugh merrily as they leap into puffing air streams that launch them high into the sky before gently carrying them back down onto the soft folds of the cloud-covered ground. Beyond this area, you can just make out several large platforms moving slowly in the distance.

To the left lies Firefly Gardens. An area filled with flowers in brilliant shades of orange, red and yellow. The growth is so thick that you cannot see what lies beyond it.

The final path, this one unnamed, skirts the edge of the park altogether. Following this route, you realise, would allow you to avoid the park and all of its destinations entirely.

Which path would you like to take?`;}
            if (wizard === "green") { return `You arrive at a natural crossroads where four faint paths part ways through the forest.

The first path follows a small stream which threads through the forest floor, widening in the distance where it appears to join a large lake. Though it is a way off and partially obscured by the trees, you can clearly see there is something huge down by the lakeside.

The second path runs into the trees ahead. A light mist hazes the ground between the trunks, and in the distance you can just make out the sound of playful laughter.

The third trail is more defined, climbing steadily up a low hillside. Roots cross it like veins in the soil, and stones protrude from the ground in natural steps. The rise suggests a clearer view beyond, though the destination is currently hidden by the slope itself.

The fourth route is lined with lanterns placed at intervals on the ground between the trees. You are not sure that this is a path at all, but the lanterns, snaking into the woods, seem to be heading somewhere.

Which path would you like to take?`;}
            if (wizard === "blue") { return `It is difficult to pick out specific routes and paths in a realm such as Solarius’s, where the sea and starlit sky appear to stretch on forever. Instead, you look for destinations, and in this matter a number of places of interest stand out.

To the west, a little way out to sea, a group of silver serpentine creatures are gathering around a rocky outcrop. They appear to be waiting for something as they nestle between the patchy, scrubby vegetation on the rock’s surface.

To the east, a large black cliff formation cuts into the sea and sky alike. A huge waterfall cascades down the side of the cliff, tumbling into the black, star-dappled seas below. Some sort of lit procession appears to be traversing the cliff top.

Further along the same ridge is a large building of some sort, silhouetted against the starry backdrop. A foundry or factory of some kind, you guess, as a misty haze of cloud hangs around the building—something you have not seen occur naturally elsewhere in this realm.

The last area of interest lies further along the shoreline, where something large lies upon the black shore. Its great bulk does not reflect the red and gold stars burning brightly above it.

Which area would you like to explore?`;} 

         case "dragonPathMISALIGNED":
            if (wizard === "yellow") { return `The Silver Parade leading to the creatures in discussion?`;}
            if (wizard === "green") { return `Follow the stream toward the distant lake and enormous creature?`;}
            if (wizard === "blue") { return `The gathering of serpentine creatures, who appear to be waiting for something?`;} 

         case "dragonPathREALM":
            if (wizard === "yellow") { return `The route through the play area towards the shifting platforms?`;}
            if (wizard === "green") { return `Climb the hillside route toward the higher ground?`;}
            if (wizard === "blue") { return `Would you rather investigate the clifftop procession?`;} 

         case "dragonPathOPPOSED":
            if (wizard === "yellow") { return `The path past the Festival Fountain towards the distant event?`;}
            if (wizard === "green") { return `Head into the trees along the mist-lined path towards the distant laughter?`;}
            if (wizard === "blue") { return `Would you like to make your way to the clifftop building?`;} 

         case "dragonPathRED":
            if (wizard === "yellow") { return `The Firefly Gardens path with its hidden destination?`;}
            if (wizard === "green") { return `Follow the lanterns into the trees?`;}
            if (wizard === "blue") { return `Would you like to investigate the dark shape on the shoreline?`;} 

         case "dragonPathIGNORE":
            if (wizard === "yellow") { return `Or would you rather avoid them all and skirt around the edge of the park?`;}
            if (wizard === "green") { return `Or would you prefer to ignore them all and head deeper into the realm?`;}
            if (wizard === "blue") { return `Or would you prefer to ignore them all and head deeper into the realm?`;} 
  
        default:
            return null;
    }
}