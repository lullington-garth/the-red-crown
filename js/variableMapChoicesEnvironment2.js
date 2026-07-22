// variableMapChoicesEnvironment2.js

export function resolveEnvironment2Variable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {
             
        case "Environment2Enter":
            if (wizard === "green") { return `You continue deeper into Corolinus's domain until without warning a rift tears across the realm, spewing alien magic into the woodland ahead.

The wound in reality closes almost as quickly as it appeared, but the opposing magic continues to wreak havoc upon the landscape around you.

Trees swell to impossible sizes. Their roots burst from the earth, hurling soil and stone high into the air. The ground shudders violently beneath your feet.

Then the forest begins to sink. The colossal trees do not appear to rise into the sky. Instead, their impossible growth seems to drive them downward, forcing the woodland deep into the earth causing the ground before you to break apart and fall away.

Far below, water erupts from the shattered cliff face. Great torrents burst from the exposed rock and cascade into the valley beneath, rapidly flooding the forest floor hundreds of feet below.

At last the violence subsides. The transformed landscape stretches before you, vast and unfamiliar. Behind you, a deep chasm has torn through the earth, cutting off any retreat. Your only way onward lies through the devastated forest.

Four routes appear possible.

The enormous growth of the trees has lifted the canopy until it lies almost level with the edge of the cliff upon which you stand. The branches are so vast that it would be possible to leap directly into the treetops and travel through the swollen canopy itself.

To the west, a narrow and crumbling path descends towards the upper roots of the gigantic trees. The roots arch from the earth like bridges, forming immense wooden tunnels and twisting walkways. Reaching them, however, would prove dangerous for both you and your horse.

The easiest route appears to be a gentle slope leading down towards the valley floor. However, the newly released waters have already begun to flood the woodland below, leaving much of the forest submerged.

The final route follows the path taken by the fleeing wildlife. Birds, deer and smaller creatures stream away through a section of forest that has somehow caught fire. Flames creep slowly through the undergrowth and climb the bark of the gigantic trees. Even so, the ground appears comparatively easy to traverse at the moment.

Which route will you take?`;}
            if (wizard === "yellow") { return `You continue for some time before you arrive upon a platform that appears almost swamp-like, with twisted trees rising from banks of swirling mist, though the ground beneath your feet remains firm enough to bear your weight.

As you traverse the island, the earth trembles beneath your feet. The sky roars overhead and a rift between realms tears open. A great wound in reality rips across the island itself. From it rolls a storm: vast banks of grey cloud crackling with blue lightning.

The rift vanishes as quickly as it appeared, yet the storm remains, thundering across the platform as it collides with the gentle, sunlit clouds native to this realm. The opposing weather fronts churn together in a confused, swirling mass.

You turn to flee, only to discover that the earthquake has destroyed the bridge by which you arrived. Your only way forward lies through the storm.

Four distinct routes present themselves.

At one edge of the island, the raging weather has yet to consume the original landscape completely. You can still make out the swamp-like trees and greenery that once covered the platform. This appears to be the route least affected by the rift.

On the opposite side of the island, shafts of brilliant sunlight pierce the clouds. Here the storm appears weakest, and the realm's animal life seems to be fleeing in that direction.

Between these extremes, the opposing weather fronts have formed a swirling vortex. Dark rain clouds mingle with white summer clouds like ink stirred into milk. The winds howl most fiercely here, though it offers the most direct route across the island.

The final path is by far the widest, covering almost two-thirds of the platform's breadth, but it leads directly through the heart of the storm itself.

None of the choices looks inviting, but with the weather advancing towards you and only open sky behind, you must decide quickly.

Which route will you take?`;}
            if (wizard === "blue") { return `You pickup a path that leads you to a silver shoreline which you follow until you to arrive at a cave mouth. You venture into the cave until the silver sands of the distant shore lie only as a thin dusting across the stone floor and the sound of the sea has long since faded behind you.

A crack high above allows pale starlight to spill into the cavern. Wherever the light touches, patches of moon moss glow softly upon the walls and floor, bathing the tunnels in a silver radiance.

You are examining the moss when the ground quakes, the sky roars above and a rift tears across the cave.

The magic of another realm, alien to this one, pours into the darkness. The wound in reality closes almost immediately, but its influence remains. The cave thunders and stone screams on stone. The entire passage splits apart and the ceiling groans overhead.

You dive to the dust floor as stones hail from above. The crack through which the starlight once shone seals itself beneath the falling rock, plunging much of the cavern into darkness.

Crystal erupts from the stone walls in great jagged spears ripping new tunnels into the rock. Somewhere deep below you hear the roar of shifting rock while above rings with the sounds a howling distant wind.

When at last the trembling ceases, you discover that the tunnel behind you has collapsed completely. Great slabs of stone block any retreat. Your only path lies ahead.

Four routes remain open.

The passage lined with glowing moon moss remains. With the starlight above blocked by the falling rock, the only light on that route now comes from the pale glow of the moss. It is dim, but is enough for you to make out that the moss and tunnel snake deeper into the rock.

The crystal has torn its own passage through the rock. Vast shards protrude from floor, walls and ceiling at impossible angles. The route appears difficult but still passable.

High above a third tunnel starts at the top of a steep climb. Cold air whistles through its heights and the sound of distant wind suggests it may eventually lead to the surface.

The final passage is more of a fissure ripped into the cave floor. Warm air rises from below and a soft orange glow illuminates its depths. Though the heat is unsettling, the fissure wall has easy hand holds and the route down appears simple enough.

With the cave sealed behind you, these are the only paths open to you.

Which route will you take?`;}   
            
        case "Environment2EnterChoice1":
            if (wizard === "green") { return `Will you hop across the gap into the enormous tree canopy?`;}
            if (wizard === "yellow") { return `The path directly through the storm cloud?`;}
            if (wizard === "blue") { return `Will you follow the glowing moon moss into the darkness?`;}   
            
        case "Environment2EnterChoice2":
            if (wizard === "green") { return `Traverse the crumbling path to the knotted tree roots?`;}
            if (wizard === "yellow") { return `The route through the swirling clouds where the winds are strongest?`;}
            if (wizard === "blue") { return `Pick your way through the crystal cavern?`;}   
            
        case "Environment2EnterChoice3":
            if (wizard === "green") { return `Would you rather scramble down the slope and wade through the flooded forest?`;}
            if (wizard === "yellow") { return `Would you rather keep to the edges where the original island still survives?`;}
            if (wizard === "blue") { return `Climb the rise up to the tunnel where the sound of the wind can be heard?`;}   
             
        case "Environment2EnterChoice4":
            if (wizard === "green") { return `Or would you like to follow the fleeing wildlife into the slowly spreading fire?`;}
            if (wizard === "yellow") { return `Or would you follow the fleeing wildlife into the sun-soaked clouds?`;}
            if (wizard === "blue") { return `Or descend into the orange glow and rising heat?`;}   
            
        case "Environment2TestEthos":
            if (wizard === "green") { return `You leap across the gap into the swollen canopy, hoping the gigantic branches will provide an aerial road through the shattered forest.

The branches are broader than most tree trunks and what were once slender twigs now form walkways wide enough to support both you and your horse. Leaves the size of sails rustle overhead while the distant floodwaters roar somewhere far below.

You are just congratulating yourself on picking a safe route when you find there is another danger stalking these heights.

Pockets of lingering magic drift through the canopy like invisible tides. Wherever they pass, the impossible growth wrought by the rift is undone. Entire branches suddenly shrink back to their natural size, splitting, twisting and collapsing as decades of growth vanish in an instant.

Suddenly your safe route has become a death trap.`;}
            if (wizard === "yellow") { return `You plunge into the storm cloud, hoping that the widest route will offer the safest passage. The notion is dispelled almost immediately as you are enveloped by freezing darkness and howling wind. Within seconds you are soaked to the skin.

Were it not for the lightning tearing through the cloud, you would be unable to see at all. Worse still, the brief flashes reveal that wherever the lightning strikes the platform, it tears great holes through the stone, exposing the endless sky below.

Your only hope is to cross the island before the storm destroys it entirely. This will require speed, agility and quick thinking.`;}
            if (wizard === "blue") { return `You follow the glowing moon moss deeper into the darkness.

The pale growth clings to the walls and floor, illuminating the tunnel with a ghostly silver light. At first you are grateful for the guidance, but not far down the tunnel you start you notice a smell. A sharp, acrid tang hanging in the air.

It isn't long before your breathing becomes laboured, your throat burns and your eyes begin to sting.

Looking around for the source you notice that the moss seems to be sweating a thin vapour that is gathering within the enclosed passages.

Thinking back to your potion brewing days, you recall that there are some light loving mosses that release powerful toxins when starved of their light source, which in this case would be starlight.`;}   
            
        case "Environment2ItemCheck":
            if (wizard === "green") { return `You race through the canopy as pockets of distorted air drift between the branches.

Ahead of you, a great limb suddenly contracts, shrinking from the width of a wagon to little more than a sapling. You leap desperately as it collapses beneath your feet.

A second wave of magic rolls towards you. Leaves wither and branches twist as their impossible growth is stripped away. You dive aside, narrowly escaping the edge of the phenomenon.

Breathing hard you find yourself pressed against the silver-white trunk of an enormous birch tree. Around you the drifting magic wanders silently through the canopy, altering the woodland with every passing moment.

Do you possess the Map of the Forest Deep?`;}
            if (wizard === "yellow") { return `You sprint into the storm, your horse following behind. It would be far too dangerous to ride through this.

Lightning explodes beside you, ripping apart the ground and sending chunks of stone tumbling into the void below. You stumble and dive away, narrowly avoiding the crumbling edge.

Another flash. Another explosion. Again you throw yourself aside.

This time you land badly. The breath is knocked from your lungs and, when you struggle to your feet, you find yourself winded, exhausted and surrounded by darkness.

You failed to take note of the ground during the last flash of lightning. Now you have no idea whether your next step will land upon solid stone or carry you into the endless sky below.

Do you possess the Chalking Door?`;}
            if (wizard === "blue") { return `You stumble onward through the glowing tunnels.

The acrid vapours burn your lungs. Every breath becomes painful. Your eyes water and your vision begins to blur.

Several times you lose sight of the moss entirely and find yourself wandering through darkness before the pale glow appears once more.

With your head swimming, you lean heavily against the cave wall, gasping for breath that you don't take.

Do you possess Portable Moonlight?`;}   
            
        case "Environment2TestEthosPass":
            if (wizard === "green") { return `You hurl yourself into the canopy, trusting your instincts and moving quickly before the wandering magic can trap you.

You almost collide with a drifting energy ball. It passes close enough that branch you are on creaks and contracts beneath your feet. You dive, the once massive limb shrinking, and snapping under your weight. You land on safer branches as the severed limb, tumbles hundreds of feet into the flooded forest below.

You have barely time to gather yourself before the air shimmers around you. Leaves shrink, bark cracks and entire sections of the canopy your are in begins to collapse. You sprint along a narrowing branch before throwing yourself into the next tree.

Here at last the magical disturbance begins to thin and the the vast branches slope steadily downward until the canopy rises to meet a high ridge overlooking the devastated forest.

You climb onto firm ground, your horse emerging from the branches moments later.

You sit for several moments, catching your breath while the strange magic continues to wander among the trees behind you.`;}
            if (wizard === "yellow") { return `You hurl yourself into the storm, leaving your horse to find its own way. Attempting to ride through this maelstrom would be madness.

Within moments you are soaked through as you race through the darkness. Each burst of lightning becomes a blessing, illuminating your path and revealing the next patch of ground to avoid.

As long as the lightning does not strike you, you may yet survive.

No sooner has the thought crossed your mind than a fork of blue lightning explodes into the stone less than a foot before you.

The ground erupts. Stone fragments whistle through the air and a gaping chasm twelve feet wide tears open, revealing the endless sky below.

You throw yourself forward. Momentum leaves you no other choice.

For one terrible moment you wonder whether you will tumble into the void, but then you strike the ground, roll, and scramble back to your feet and sprint.

Moments later you burst from the storm into dazzling sunlight on the far side of the swamp-like platform. Your horse emerges only seconds afterwards.

You collapse to the ground, panting, as the storm slowly rolls away behind you.`;}
            if (wizard === "blue") { return `You pull your cloak across your mouth and force yourself onward.

The fumes sting your eyes and set your lungs aflame, but you have to keep moving. The glowing moss twists through narrow passages and low tunnels while the air grows steadily thicker.

Your vision darkens and you stumble, nearly falling into a hidden fissure concealed beneath the silver glow. You leap back, your head swims, you see figures moving in the darkness beyond the moss, but the are gone in the blink of an eye just vision brought on by the poisonous vapours that you are breathing.

You stumble on and at last the tunnels begin to widen and the the air slowly clears. Ahead you see pale light. Not moss, something wider. Sands.

You emerge from the caves and flop onto the silver sands beneath a star soaked sky, sucking in great gulps of clean salty air.`;}                           
             
        case "Environment2TestEthosPassChoice":
            if (wizard === "green") { return `When you have recovered, gather your horse and head down the slope.`;}
            if (wizard === "yellow") { return `When you have recovered, gather your horse and continue to the bridge leading from the island.`;}
            if (wizard === "blue") { return `When you have recovered, you gather your horse and continue along the shore.`;}   
            
        case "Environment2HaveItem":
            if (wizard === "green") { return `You shrug off your backpack and remove the Map of the Forest Deep.

The magical chart is said to reveal the safest route through any woodland. You can only hope that its enchantments remain stronger than the forces that now twist this forest apart.

As the map unfolds itself in your hands, lines shift and redraw themselves at the drifting magic alters the surrounding trees. Safe paths appear and disappear while glowing trails weave across the parchment.

While it does not fully ensure safety, the map helps. Its altering pathways give you an idea of which way the pockets of magic are rolling.

Paying careful attention to the map you set off again. For a while your route is clear, but it is not long before the map shows no safe routes and looking up you see two shimmers in the air converging on your spot in the trees.

You run. The branch you are on screams out as it struggles to support you as the passing disturbance shrinks it. You dive onto the next branch feeling that withering too. There is a snapping sound the branch snaps and you tumble. You thump heavily onto a lower branch and sprint. You can see the edge of the canopy now. You hurl yourself towards it. Behind you you can hear the groaning and whipping of branches as they fold under the effects of the passing magic.

You burst from the canopy landing on the solid ground of the valley peak beyond and lay gasping, your heart racing.`;}
            if (wizard === "yellow") { return `You fumble off your backpack and grope through its contents until your fingers close around the Chalking Door.

It is a desperate gamble, but desperation leaves little room for caution.

The chalk emits a faint glow in the darkness. Taking a deep breath, you pour some of your will into it and concentrate upon a point beyond the storm.

You draw a doorway in the air before you.

The chalk leaves a silver line hanging in space and, as the shape is completed, it bursts into light.

You are almost blinded by the brilliance pouring through the doorway, which opens onto the far side of the storm.

There is no time to hesitate. You dive through. You land upon solid ground beneath clear skies and warm daylight. The storm lies behind you. The doorway fades away and you remain where you have fallen, gasping for breath.

Your horse appears shortly afterwards, having somehow found its own way through the tempest.`;}
            if (wizard === "blue") { return `You shrug off your backpack and remove the Portable Moonlight.

The strange patch of magical cloth glows softly within your hands.

You wrap it around your mouth and nose filtering out the acidic air, but at the same time feeding the the moss around you and slowing the poisonous spore production.

The acrid fumes begin to lessen around you and the glowing moon moss begins to brighten illuminating the path on.

Keeping the cloth tied firmly in place you lead both yourself and your horse through the poisoned caverns.

Eventually the air starts to become clearer and ahead you see the silver shore beneath the endless stars.

You emerge from the caves, remove the glowing mask and breathe deeply of the cool night air.`;}   
            
        case "Environment2HaveItemChoice":
            if (wizard === "green") { return `When you are ready, you gather your horse and head down the slope.`;}
            if (wizard === "yellow") { return `When you are ready, you continue to the bridge leading from the island.`;}
            if (wizard === "blue") { return `When you are ready, continue along the shoreline.`;}   
            
        case "Environment2LoseItem":
            if (wizard === "green") { return `As you shelter against the vast trunk, you hear your horse snorting nervously somewhere nearby. You lean around the trunk and see the beast one branch over. You coax the frightened animal towards you and stroke its neck, attempting to calm it.

Traversing the canopy on horseback had seemed madness when you first entered it, yet now it appears to be your only chance of escape.

You mount carefully and turn the animal towards what appears to be the safest route, the you spur it into action. The horse surges forward.

The great branches shake beneath its hooves as you gallop through the canopy. The beast clearly wishes to escape these haunted trees as much as you do.

For a time it seems you may actually succeed. Then a wave of distorted air drifts across the branch ahead.

Wood shrinks and twists. The broad limb contracts violently, splitting apart and opening a great gap above the flooded forest below.

Your horse leaps. For a terrible heartbeat you do not know whether it will clear the gap, and then you land heavily upon the far side. The branch beneath you cracks and begins to collapse as it shrinks.

You and your horse tumble hard against the bark, falling through the canopy to the branch below.

You are dimly aware of one of the saddlebags tearing open. Something falls from the damaged pack, vanishing into the distant waters far below. There is no time to worry about what has been lost.

LOSE ONE ITEM.

You force the horse back to its feet and urge it onward.

Moments later You burst through the thinning canopy, the giant branches slope downwards and carry you to the relative safely of the valley rim.

Heart still racing you slow you horse and dismount, securing the damaged saddlebag trying to ignore the forest groaning and shifting behind you.`;}
            if (wizard === "yellow") { return `As you kneel in the darkness, you hear the frightened panting of your horse nearby. You coax it towards you, attempting to calm it.

You had thought it suicidal to ride through the storm, but now it seems your only chance of escape.

You mount in darkness, point the animal towards what you hope is safe ground and spur it into a gallop.

The horse responds immediately. You feel its muscles straining beneath you as you race through the storm. The beast wishes to escape this place as much as you do.

You are beginning to think the cloud may be thinning when a bolt of blue lightning tears across the ground directly before you.

The stone explodes, opening a great chasm that reveals the endless sky below. The horse leaps. For a heartbeat you do not know whether it will reach the other side.

Then you land heavily. The stone cracks beneath the impact and begins to crumble into the abyss. The horse loses its footing and crashes to the ground.

You are dimly aware of one of the saddlebags splitting open as horse and rider strike the hard stone. Something tumbles from the torn bag and vanishes into the void below.

There is no time to worry about what has been lost.

LOSE ONE ITEM.

You force the horse back to its feet and urge it onward and seconds later you burst from the edge of the storm and return to the relative safety of the swamp-like platform.

You bring the horse to a halt and secure the damaged saddlebags.`;}
            if (wizard === "blue") { return `You hear your horse shifting nervously beside you.

The animal coughs and stamps at the stone floor, equally affected by the poisonous air.

You had thought it impossible to ride through these narrow tunnels, but if you lose consciousness in here you may never awaken.

You mount the horse and loosen the reins. The beast lowers its head hurtles down the tunnels of glowing moss.

You cling to the saddle while the fumes cloud your thoughts. The world swims around you. The silver light seems to stretch and twist through the darkness.

Then your horse stumbles. It collides heavily with the cave wall, throwing you against the stone. You hear the sound of tearing leather and feel one of the saddlebags split open.

Something tumbles onto the cave floor but you have no intention of stopping to collect it.

LOSE ONE ITEM.

The horse staggers upright and continues its sprint. Soon cool air touches your face. The silver glow fades behind you and you burst from the caves onto the moonlit shore. The stars overhead shine brilliantly and the fresh sea air fills your lungs.

You slide from the saddle and flop on the sand gasping for breath. 

When you head has cleared enough for you to stand, you secure the damaged saddle bag and tend to your horse as it stands still shaking beneath the star filled sky.`;}   
             
        case "Environment2LoseItemChoice":
            if (wizard === "green") { return `When you are calm and ready, you lead your horse down the slope into the valley below.`;}
            if (wizard === "yellow") { return `When you are calm and ready, you lead your horse to the bridge on the far side of the platform.`;}
            if (wizard === "blue") { return `When you are calm and ready, you lead your horse along the shore.`;}   
        
            


        case "Environment2RealmPath":
            if (wizard === "green") { return `You cautiously descend towards the gigantic roots. From above they appeared twisted and treacherous, great wooden arches thrown violently from the earth. Yet as you approach them, you discover that the roots have grown together into broad natural roads.

Smooth bark forms gentle pathways between the trunks while smaller roots weave together to create railings and bridges.

The great trees above sway gently while cool breezes drift through the vast wooden halls created by their roots. Water trickles between the roots and tiny flowers have already begun to grow in the newly exposed soil.

The impossible growth caused by the rift has not damaged this place. Instead, the trees and the strange magic seem to have worked together, creating something entirely new.

Do you possess the Tanglewood Staff?`;}
            if (wizard === "yellow") { return `You make your way towards the place where the two weather fronts collide.

From a distance the mingling clouds appeared violent, dark storm cloud and white summer cloud twisting together in a great whirlpool of sky. Yet as you step into the rolling vapours, you discover that the winds here are strangely calm.

The black clouds and white clouds no longer struggle against one another. Instead they drift together in slow currents. Lightning flickers harmlessly through banks of warm mist while gentle rain falls from bright sunlit skies.

The clouds beneath your feet become firm and springy. The storm winds that rage elsewhere seem unable to penetrate this place.

Above you, shafts of golden sunlight pierce the dark cloud while stars of blue lightning dance silently between them and the air smells of rain and summer blossoms.

Do you possess the Sky Shard?`;}
            if (wizard === "blue") { return `From a distance the jagged shards appeared impassable, yet upon entering the tunnel you discover that the crystals have split the rock apart to create a broad winding walkway.

The great shards rise from floor and ceiling like frozen waves in a beautiful array of colours. They glow faintly capturing and reflecting the distant starlight filtering through cracks in the cave roof high above. 

As you pass them, the crystals ring softly, until thousands of delicate notes drift through the air filling the cavern with a mesmerising kind of music.

The cavern, you realise, is a meeting of two magics. A place where they combine and strengthen each other rather and working to destroy or dominate.

Do you possess the Crystal Shard?`;}   
            
        case "Environment2RealmPathStaff":
            if (wizard === "green") { return `The Tanglewood Staff suddenly grows warm in your hand. Fine roots emerge from the wood and curl around your fingers as the staff begins to glow with a soft green light. You should feel alarmed, but there is something natural about what is happening and you know it does not intend to harm you.

Around you, the gigantic roots slowly creak and move. Small tendrils emerge from the earth, winding themselves around the staff as a cool breeze passes through the knotted roots carrying seeds, blossoms and the scent of fresh earth.

For several moments the living roots and the strange opposing magic flow together through the staff. The wood darkens and new shoots appear along its length. When the light finally fades, the Tanglewood Staff feels heavier and more alive than before.

You sense that it has drawn strength from both the forest and the strange forces that reshaped it.`;}
            if (wizard === "yellow") { return `The Sky Shard begins to vibrate at your side.

When you draw it forth, the crystal staff rises gently from your hand and hangs within the mingled clouds.

Dark vapours spiral upwards while warm white cloud gathers beneath it. Threads of blue lightning dance through the crystal while shafts of sunlight shine from within.

For several moments the Sky Shard turns slowly in the air as the two magics flow together. Then the crystal flashes brilliantly.

A circle of warm rain falls around you, each droplet sparkling like liquid stars before vanishing into the clouds.

The Sky Shard descends once more into your hand.

It feels warmer than before and faint currents of air continue to dance around it. You sense that it has absorbed something of both the storm and the summer sky, becoming stronger through their union.`;}
            if (wizard === "blue") { return `The Crystal Shard begins to pulse at your side.

When you remove it, the surrounding crystals answer.

Soft blue light spreads through the cavern as thousands of crystal faces begin to glow. Notes ring through the air, rising steadily into a strange and beautiful song.

The Crystal Shard lifts from your hands.

Beams of silver starlight and warm amber light from the deeper caves meet within the floating crystal. For a moment the entire cavern shines like a field of stars.

The surrounding crystals resonate with the shard, their song growing louder until it seems to echo through the entire mountain.

At last the light slowly fades.

The Crystal Shard settles gently back into your hand.

Its facets now shine with colours that were not present before and you feel that it has absorbed some small portion of the harmony between the cave, the stars and the crystal growth.`;}   
            
        case "Environment2RealmPathLeave":
            if (wizard === "green") { return `You walk through the vast root halls in quiet wonder.

The cool air, living wood and scent of growing things fill you with renewed energy. The harmony between the opposing forces seems to strengthen your own magical connection to the realm.

GAIN 1 MAGIC.

Eventually the roots begin to descend and you emerge safely upon the valley rim.`;}
            if (wizard === "yellow") { return `You walk walk through the mingled clouds is revitalising.

The warm rain washes away your weariness while the cool winds clear your mind. The strange harmony between the two weather systems leaves you feeling renewed.

GAIN 1 STAMINA.

Eventually the clouds begin to thin and you emerge safely upon the far side of the swamp-like island.`;}
            if (wizard === "blue") { return `You continue through the singing crystal cavern, allowing the strange music to wash over you.

The beauty of the place clears your thoughts and steadies your mind. The starlight reflected through countless crystal faces leaves you feeling unusually fortunate.

GAIN 1 LUCK.

Eventually the crystal tunnel opens onto the silver beach beneath the stars.`;}   
             
        case "Environment2RealmPathLeaveChoice":
            if (wizard === "green") { return `Feeling recharged you head down the valley slope.`;}
            if (wizard === "yellow") { return `You head over to the bridge that exits the platform, leaving the storm behind you.`;}
            if (wizard === "blue") { return `Feeling recharged you continue your journey across the silver sands.`;}   
            
 
 
 
        case "Environment2CliffTestEthos":
            if (wizard === "green") { return `The slope down to the flooded woodland appears easy enough.

Water flows gently between the trees and the newly formed lake seems shallow in places. You lead your horse carefully through the rising water.

Then the ground gives way.

The earth tears apart beneath your feet and you plunge into darkness.

Your hand catches a thick root hanging from the cliff face. The sudden jerk leaves your shoulders screaming with pain.

Below you lies the flooded valley.

One of the gigantic trees has fallen into the abyss. Its enormous trunk now spans the chasm like a bridge, stretching from your cliff face towards the far side of the valley.

If you can descend to the fallen tree, it may provide a route to safety.

You look upwards.

Small pockets of drifting magic still move through the air.

If they reach the great tree while you are crossing it, there will be no way on for you.`;}
            if (wizard === "yellow") { return `The surviving edge of the island appears safe enough at first.

Ancient trees still cling to the earth and patches of green remain untouched by the storm. Yet the further you travel, the more damage becomes apparent. Great cracks split the ground and sections of the island have begun to sag beneath their own weight.

Then the earth groans.

The section of island upon which you stand tears free.

Stone shatters around you. Trees topple into the sky and great slabs of earth drift apart. The fragments remain suspended in the air, held aloft by the magic of the realm, but they no longer rest upon the same level. Some rise, others sink, while smaller fragments slowly revolve around one another.

Far ahead you can still see the bridge leading from the island.

Unfortunately it stands upon a fragment now nearly forty feet below your own.

The only way forward is to cross the drifting ruins.

This will require strength, balance and perfect timing.`;}
            if (wizard === "blue") { return `The climb to the upper tunnel proves harder than expected.

The air grows steadily colder and the sound of the wind becomes louder with every step. But you continue convinced that the tunnel must lead to the surface. 

When you finally reach it, you discover your mistake. This is no wind. The tunnel contains the remnants of the rift itself. Invisible currents of magic tear through the stone passage with enormous force.

Before you can retreat, the rushing power catches you, dragging you into the air and hurling you into the tunnel like a leaf caught in rapids.

Stone walls blur around you as the magic carries you through the mountain. The passage suddenly opens. You burst from the cliff face into the open air.

Far below lies the silver shore.

Your momentum carries you across a hidden cove and, by some miracle, you crash into the enormous abandoned nest of some colossal winged creature perched upon the opposite cliff.

You lie stunned amongst broken shells and weathered bones.

The nest rests halfway up the cliff.

The only route to the shore is down the near-vertical rock face.

Before you have time to gather your wits, a vast shadow passes silently across the stars above.`;}   
            
        case "Environment2CliffPotionCheck":
            if (wizard === "green") { return `Your arms ache as you cling to the root.

Below, the fallen tree stretches across the abyss. It is broad enough to walk upon, yet the distance to the valley floor remains terrifying.

You study the cliff face carefully.

There are roots to climb, ledges to reach and hollows within the bark of the fallen tree that may provide shelter should the drifting magic return.

The route appears almost impossible.

Yet it may also be your only chance.

Do you possess the Cliff Strider Potion?`;}
            if (wizard === "yellow") { return `The floating islands drift silently around you.

Some slowly rise while others sink into the clouds below. Small fragments tumble between them while loose stones occasionally fall away into the endless sky.

You take a few moments to study their movement.

A possible route presents itself, but it will require leaps that border upon the impossible. One mistake will send you falling into the empty sky between the islands.

Do you possess the Cliff Strider Potion?`;}
            if (wizard === "blue") { return `The creature, whatever it is, remains high above circling the bay. You use the brief respite to study your surroundings.

The nest has been built amongst narrow ledges and jagged shelves of rock. Far below, waves break gently upon the silver sands.

The descent appears almost impossible.

The cliff offers only the smallest handholds and the darkness hides many of the cracks and crevices.

Above you, the stars shine brilliantly and somewhere overhead, wings beat slowly through the night.

You suspect your time is limited.

Do you possess the Cliff Strider Potion?`;}   
            
        case "Environment2CliffPotionCat":
            if (wizard === "green") { return `You uncork the bottle and gulp it down. The potion transforms the impossible into the merely difficult.

Every root becomes a handhold. Every ledge becomes a foothold.

As you spring from ledge to root to outcrop, the Cat's Eye enhancement allows you to see deep within cracks in the bark and hollows hidden amongst the roots. Within them you discover a rare medicinal growth nourished by both water and wood.

GAIN BLOOD SEAL MOSS.

You are almost disappointed at how easily you descend the sheer cliff face. All too soon you are safely on the fallen tree, crossing the abyss and climbing through the enormous trunk itself to emerge upon the valley rim.`;}
            if (wizard === "yellow") { return `You uncork the bottle and gulp it down. The potion floods your limbs with impossible confidence.

The floating fragments no longer appear dangerous. Their movements become predictable, their distances achievable and every landing place seems obvious.

You casually leap, of your platform to the next run across it and  jump to the next. With the potion coursing through you nothing could be easier. You spring from one drifting island to another as though crossing stepping stones in a stream.

The enhanced vision granted by the Cat's Eye mixture allows you to see into cracks within the floating stone. There, amongst pockets of mist and sheltered earth, you discover a rare medicinal growth.

GAIN BLOOD SEAL MIST.

A few more, hops, leaps and jumps later you leap onto the bridge platform itself.

The drifting ruins continue their slow dance behind you while you regain your breath beside the bridge.`;}
            if (wizard === "blue") { return `You uncork the bottle and gulp it down. The potion spreads through your body heightening your senses.

The darkness becomes as clear as daylight. Tiny cracks, narrow ledges and hidden handholds stand out with perfect clarity. Suddenly what seemed an impossible climb before no looks like child's play.

You hop over the edge and start swinging from hand hold to ledge to outcrop. The route down is not only easy it is highly enjoyable, and with your enhanced vision you are able to identify small silver growths hidden deep within the rock, which you scoop up as you climb.

GAIN BLOOD SEAL DUST.

The descent becomes almost effortless and in no time at all you are stepping safely onto the silver shore beneath the stars.`;}   
             
        case "Environment2CliffPotionCatChoice":
            if (wizard === "green") { return `Feeling please with potion choice you head down the valley slope.`;}
            if (wizard === "yellow") { return `You head over to the bridge that exits the platform, leaving the shattered platform behind you.`;}
            if (wizard === "blue") { return `Feeling please with potion choice you continue your journey across the silver sands.`;}   
            
        case "Environment2CliffPotionWay":
            if (wizard === "green") { return `You uncork the bottle and gulp it down. With the Wayfinder enhancement coursing through your veins, the safest route appears obvious.

You descend the cliff face in less than a minute, then traverse the fallen tree as if strolling through a park. Even with the drifting magic roaming through the air around you the potion makes sure you foot always falls true. You don't even notice the climb through the branches to the opposite bank.

In no time at all you emerge safely on the other side of the yawning chasm and step on to the valley lip.

GAIN 2 LUCK.`;}
            if (wizard === "yellow") { return `You uncork the bottle and gulp it down. The Cliff Strider Potion courses through your body.

Every movement of the drifting islands seems obvious. The Wayfinder enhancement constantly reveals the safest route ahead.

You leap effortlessly between the floating fragments, your feet landing exactly where they must.

Even the shifting heights and changing distances fail to trouble you.

In no time at all your are stepping safely onto the bridge platform.

GAIN 2 LUCK.`;}
            if (wizard === "blue") { return `You uncork the bottle and gulp it down. The Wayfinder enhancement reveals the route immediately.

Every ledge, crack and handhold becomes obvious. You hop over the edge and swing from handhold to handhold knowing that you cannot fail. The route is so clear, laid out in front of you, and almost step by step guide.

You descend swiftly and safely despite the height and darkness.

By the time the great shadow circles overhead once more, you are already standing upon the silver beach.

GAIN 2 LUCK.`;}   
            
        case "Environment2CliffPotionWayChoice":
            if (wizard === "green") { return `Feeling please with potion choice you head down the valley slope.`;}
            if (wizard === "yellow") { return `You head over to the bridge that exits the platform, leaving the shattered platform behind you.`;}
            if (wizard === "blue") { return `Feeling please with potion choice you continue your journey across the silver sands.`;}   
            
        case "Environment2CliffPotionCherry":
            if (wizard === "green") { return `You uncork the bottle and gulp it down. YUM! That is one tasty potion.

Strength and confidence surge through your body.

You descend the cliff face in less than a minute, then traverse the fallen tree as if strolling through a park. Even with the drifting magic roaming through the air around you the potion makes sure you foot always falls true. You don't even notice the climb through the branches to the opposite bank.

In no time at all you emerge safely on the other side of the yawning chasm and step on to the valley lip.`;}
            if (wizard === "yellow") { return `You uncork the bottle and gulp it down. YUM! That is one tasty potion.

The warm energy flowing through your limbs makes the impossible seem perfectly reasonable.

The floating islands no longer intimidate you. You leap from fragment to fragment with astonishing ease, crossing the shattered landscape as though it were a simple country stream, and before you know it you are landing safely beside the bridge.`;}
            if (wizard === "blue") { return `You uncork the bottle and gulp it down. YUM! That is one tasty potion.

The impossible cliff no longer troubles you.

Every ledge, crack and handhold becomes obvious. You hop over the edge and swing from handhold to handhold knowing that you cannot fail. The route is so clear, laid out in front of you, an almost step by step guide.

You move from ledge to ledge with astonishing confidence, descending the rock face as though it were a gentle hillside.

In no time at all your boots touch the silver sands below.`;}   
             
        case "Environment2CliffPotionCherryChoice":
            if (wizard === "green") { return `Feeling please with potion choice you head down the valley slope.`;}
            if (wizard === "yellow") { return `You head over to the bridge that exits the platform, leaving the shattered platform behind you.`;}
            if (wizard === "blue") { return `Feeling please with potion choice you continue your journey across the silver sands.`;}   
            
        case "Environment2CliffNoPotion":
            if (wizard === "green") { return `You feel the root slipping through your fingers as your arms weaken.

You fall.

Forty feet below, you crash heavily onto the fallen tree, which shudders as you hit it.

Roll two dice and lose that many STAMINA points.`;}
            if (wizard === "yellow") { return `The drifting islands are simply too far apart.

Several of the fragments move constantly while others sink lower with every passing moment. Only your own fragment and the bridge platform remain relatively stable, and the latter hangs nearly forty feet below you.

There is no safe route. The only the jump available to you is the forty foot drop to the bridge platform below.

With a deep breath, you hurl yourself into the open air.

Roll two dice and lose that many STAMINA points.`;}
            if (wizard === "blue") { return `The great shadow returns.

The abandoned nest is abandoned no longer. A huge winged creature descends from the darkness, its eyes gleaming in the starlight.

Before you can react, its talons seize you. The beast hurls you from the nest.

Roll two dice and lose that many STAMINA points.`;}   
            
        case "Environment2CliffSurviveFallChoice":
            if (wizard === "green") { return `After what feels like an age you arrive at the lip of the valley beyond and start your painful decent.`;}
            if (wizard === "yellow") { return `Eventually you rise painfully to your feet and make your way towards the bridge, eager to leave the accursed island behind.`;}
            if (wizard === "blue") { return `Eventually you rise, tend to your injuries and continue along the shoreline beneath the stars.`;}   
            
        case "Environment2CliffSurviveFall":
            if (wizard === "green") { return `You lie battered across the enormous trunk while the flooded valley echoes around you. It is a miracle that you are not dead and more so that nothing is broken, but it is still some time before you are able to move again.

Eventually you stagger to your feet and carefully cross the fallen tree.

Climbing through the hollow trunk and up the far side of the valley leaves every muscle aching.

The pain throughout your body serves as a reminder of the weakening realms and the need to reunite the four magics.`;}
            if (wizard === "yellow") { return `You strike the lower platform heavily and lie battered amongst the shattered stone. It is a miracle that you are not dead and more so that nothing is broken, but it is still some time before you are able to move again.`;}
            if (wizard === "blue") { return `If you survive, you strike the lower rocks and eventually tumble onto the silver shore below. It is a miracle that you are not dead and more so that nothing is broken, but it is still some time before you are able to move again.

You lie upon the sand for a long time, battered and bruised.`;}   




        case "Environment2RedEnter":
            if (wizard === "green") { return `You head into the forest deciding to follow the fleeing wildlife.

At first the route appears to be the safest of the four. Only a handful of trees burn, their flames little more than isolated pockets amongst the towering trunks. Then one of the drifting remnants of the rift glides silently through the woodland. The instant it passes over a burning tree, the fire erupts.

Flames race through the branches with impossible speed, spreading from tree to tree in great roaring waves. Another drifting pocket floats across the undergrowth and fresh fires explode into life around it. Within moments the woodland has become an inferno.

Shapes dart through the smoke ahead. They resemble enormous hares, though each is the size of a large hunting dog. Their sleek black fur is streaked with glowing orange strands that pulse like molten embers beneath the surface. Their ears trail sparks as they run, while their blazing tails leave brief ribbons of fire in the smoke.

These creatures clearly do not belong here. They are Cinder Hares. Highly magical creatures that belong to the Realm of Fire, much sort after for their speed enhancing fur. 

They weave effortlessly between burning trees, never once slowing or faltering.`;}
            if (wizard === "yellow") { return `The moment you enter the glowing cloud, a wall of blistering heat washes over you. The fresh air of the realm is gone, replaced by scorching winds that sting your skin and parch your throat.

Shapes dart through the white mist ahead.

At first you think they are birds, but as they draw closer you realise they are creatures unlike any you have seen elsewhere in this realm. Standing almost waist high, they are covered in brilliant crimson and orange feathers that shimmer like burning embers. Powerful legs carry them across the cloud at astonishing speed, yet their tiny wings are far too small to lift them into the air. Their hooked beaks snap constantly while long tails trail sparks through the heated mist behind them.

At last you recognise them. Ember Runners. Not creatures of the Air Realm at all. Highly magical creatures that belong to the Realm of Fire, much sort after for their speed enhancing feathers.

They race confidently through the blazing cloud, weaving effortlessly between burning trees that loom from the mist like ghostly silhouettes.`;}
            if (wizard === "blue") { return `As you descend into the fissure, the warm air soon becomes hot enough to make you sweat, and an orange glow flickers against the tunnel walls ahead.

The passage eventually opens into an immense cavern that splits the heart of the mountain.

The floor is fractured into hundreds of black stone slabs separated by glowing cracks. Rivers of molten fire burn somewhere far below, their light illuminating the cavern with an angry crimson glow.

As you begin picking your way across the broken ground, shapes bound between the fissures. You recognise them immediately. Magma Toads.

Each is the size of a large hound, with squat muscular bodies, powerful hind legs and broad, flattened heads. Their black, warty hides are threaded with glowing orange veins that pulse like molten lava beneath the skin. Every leap sends showers of sparks skittering across the stone.

These are creatures of the Realm of Fire, highly magical beasts much sought after for their speed-enhancing blood.

They bound confidently across the shattered ground, weaving between the glowing cracks.`;}   
            
        case "Environment2RedCombat":
            if (wizard === "green") { return `You have barely begun following the strange beasts before one skids to a halt.

Its ears twitch and it lets out a throaty cry. The other hares stop instantly and the pack turns, a dozen burning eyes fix upon you.

The creatures give shrill, barking cries before charging through the smoke with astonishing speed. They dart around burning trees and fallen logs as though the forest itself were guiding them closing the ground between you in seconds.

YOU MUST FIGHT

These creatures can sometimes attack TWICE in one combat round.`;}
            if (wizard === "yellow") { return `You have barely begun following the strange creatures before one screeches a warning to the others.

The pack slows, turns and a dozen burning eyes fix upon you.

The flock bursts towards you, darting through the smoke with terrifying speed. Though flightless, they move faster than any horse could hope to gallop.

Their razor-sharp beaks glint in the fire light as the they close the ground between you in seconds.

YOU MUST FIGHT

These creatures can sometimes attack TWICE in one combat round.`;}
            if (wizard === "blue") { return `You have barely begun following the strange creatures before one lets out a deep throaty croak. The others stop and turn quizzically and start a deep growl when they see you.

With astonishing speed the Magma Toads launch themselves across the broken cavern floor. Their powerful hind legs propel them through the air while their broad jaws snap eagerly as they close the distance between you in seconds.

YOU MUST FIGHT

These creatures can sometimes attack TWICE in one combat round.`;}   
             
        case "Environment2RedLeave":
            if (wizard === "green") { return `You decide not to trust the strange creatures. Instead, you strike out alone through the burning woodland. For a short while the route seems manageable. Then another drifting pocket of residual magic glides silently overhead.

Flames roar to life around you. Trees erupt into towering columns of fire. Branches crack apart and crash into the undergrowth while showers of burning leaves whirl through the choking smoke.

Within moments the forest has become a blazing maze.

With no other choice open to you, you throw yourself onto your horse and urge it into a desperate gallop.

The animal crashes through curtains of smoke and beneath burning branches. Great trees loom from the haze only moments before you reach them, forcing you to wrench the reins from side to side.

A blazing limb crashes across your path. Your horse leaps it, but the branch tears across one of your saddlebags.

The leather catches fire. You beat frantically at the flames while clinging to the saddle. Something falls from the bag but there is no time to wonder what.

LOSE ONE ITEM.

Moments later you burst clear of the inferno onto the cooler valley beyond.

With horror you notice that your cloak is on fire. You throw yourself to the ground, rolling through the damp grass until the last flames die away.

LOSE 3 STAMINA.`;}
            if (wizard === "yellow") { return `Ignoring the creatures, you strike out alone into the blazing cloud.

Within moments the mist becomes so thick that you can barely see your own hands.

Something about the opposing magic has superheated the entire cloud bank. Trees ignite without warning, their branches erupting into sheets of flame that vanish again into the blinding white vapour.

Breathing becomes difficult. The smoke burns your lungs while sweat pours into your eyes. There is only one chance of escape.

You swing yourself onto your horse and urge it into a gallop. The world becomes a blur of white cloud and orange fire as you dart through the cloying smoke, burning trees only visible when you are but a few feet from the.

You weave through the burning obstacles until a burning trunk appears directly ahead too close to avoid. You wrench hard on the reins. Your horse leaps sideways. A blazing branch tears across your saddlebags, setting the leather ablaze.

You beat desperately at the flames while clinging to the saddle. Something falls from the bag but there is no time to wonder what.

LOSE ONE ITEM.

Still riding flat out, you burst from the edge of the blazing cloud onto the cooler mists beyond.

Only then do you realise that your cloak is on fire.

You throw yourself from the saddle and roll frantically through the damp cloud until the flames are extinguished.

LOSE 3 STAMINA.`;}
            if (wizard === "blue") { return `You decide not to trust the creatures. Instead, you strike out alone across the fractured cavern floor. 

Heat pours from the glowing fissures beneath your feet. Smoke stings your eyes while every breath tastes of sulphur and scorched stone.

The ground begins to tremble and without further warning a section of the cavern floor erupts skywards. A towering pillar of rock smashes into the ceiling with a deafening crash shattering the roof above where it hits. Stone rains down around you.

Another pillar bursts upwards. Then another. The cavern becomes a deadly gauntlet.

With no other choice open to you, you throw yourself onto your horse and urge it into a desperate gallop. 

The animal leaps glowing fissures while towering columns explode from the ground all around you. Great slabs of rock crash from above, forcing you to weave frantically through the chaos.

A falling boulder smashes against one of your saddlebags. The leather tears open and something disappears into a glowing fissure before you can stop it.

LOSE ONE ITEM.

You urge the horse on. Columns of rock explode around you as the collapsing cavern groans above. You are almost to the other side when a great gout of fire erupts from the floor. There is no way to avoid it. Your horse shrieks but you ae through it in a heartbeat and racing up the tunnel beyond.

Cool sea air brushes your face and moments later you burst from the cave onto the silver sands beneath the stars.

With horror you notice that your cloak is on fire. You throw yourself to the ground, rolling through the silver sands until the last flames die away.

LOSE 3 STAMINA.`;}   
            
        case "Environment2RedLeaveChoice":
            if (wizard === "green") { return `Once you have recovered and calmed your horse, you continue down the valley.`;}
            if (wizard === "yellow") { return `Once you have recovered and settled your horse, you make your way to the bridge leading from the island.`;}
            if (wizard === "blue") { return `Once you have recovered and settled your horse, you continue along the moonlit shoreline.`;}   
            
        case "Environment2RedEthosCheck":
            if (wizard === "green") { return `Trusting the strange creatures, you race after them through the burning woodland.

The Cinder Hares weave effortlessly between blazing trunks, changing direction only moments before fresh walls of fire erupt around them.

More drifting pockets of magic float silently through the trees. Wherever they pass, the flames swell into roaring firestorms before slowly subsiding once more.

The heat becomes almost unbearable. Smoke burns your lungs and tears stream from your eyes. Yet the creatures never hesitate.

If you can keep pace with them, you may just survive.`;}
            if (wizard === "yellow") { return `Trusting the strange creatures, you follow close behind them.

They dart effortlessly through the burning cloud, changing direction without warning and never once slowing their pace.

Towering trees burn all around you.

The heat becomes almost unbearable. Smoke fills your lungs and glowing embers drift through the cloud like swarms of fireflies.

Yet the feathered creatures seem to know every safe path through the inferno.

If you can keep up with them, you may yet escape.`;}
            if (wizard === "blue") { return `Trusting the strange creatures, you race after them.

The Magma Toads bound effortlessly across the shattered cavern floor, changing direction without warning.

Only after following them for several moments do you realise why.

Each time the ground begins to vibrate beneath your feet, the toads have already leapt elsewhere.

Heartbeats later, a great pillar of stone erupts from the place they had just abandoned, crashing into the cavern roof before showering the floor with shattered rock.

The creatures somehow sense every eruption before it begins.

If you can keep pace with them, you may just survive.`;}   
            
        case "Environment2RedItm":
            if (wizard === "green") { return `Your lungs burn as you notice another fleeing pack in the distance and race after the creatures. You force yourself to keep pace with the Cinder Hares.

Again and again they change direction just before fresh explosions of flame consume the woodland behind them.

As they race through the undergrowth one of the hares brushes a thorn bush. A small tuft of its glowing fur tears free and remains snagged upon the bush.

You can not believe your luck. Actually you are running through choking smoke with the world burning around you, so maybe fortune isn't your companion at the moment, but the fur is a real boon. Prized by warriors throughout the realms, it is said to grant the bearer incredible speed in battle.

Ignoring the heat, you snatch the tuft from the bush before pressing onward.

GAIN ITEM

Cinder Hare Fur

Moments later the smoke begins to thin. You burst from the burning forest onto the valley beyond, coughing violently as cool air finally reaches your lungs.`;}
            if (wizard === "yellow") { return `Your lungs burn as you notice another fleeing pack in the distance and race after the creatures.

The heat is almost unbearable, yet the weird fowl continue weaving effortlessly through the burning woodland.

As one of them bounds over a fallen tree, a single blazing feather breaks loose and spirals gently towards the cloud beneath your feet.

You can not believe your luck. Actually you are running through choking smoke with the world burning around you, so maybe fortune isn't your companion at the moment, but the feather is a real boon. Prized by warriors throughout the realms, they are said to grant the bearer incredible speed in battle.

Ignoring the heat, you snatch the feather from the cloud and press onward.

GAIN ITEM

Ember Runner Feather

Moments later you burst clear of the blazing weather front, collapsing onto the cooler mists beyond while coughing violently.

The storm of smoke and fire lies behind you.`;}
            if (wizard === "blue") { return `Your lungs burn as you notice another colony of Magma Toads bounding through the cavern ahead and race after them.

Again and again they alter course only moments before fresh pillars of rock explode from the floor.

As one of the creatures lands upon a jagged slab of stone, its hind leg catches against a razor-sharp edge.

The toad gives an irritated croak before disappearing into the smoke with the rest of the colony.

A few thick drops of glowing crimson blood remain upon the black rock.

You cannot believe your luck. Actually, you are running through choking smoke while the cavern collapses around you, so perhaps fortune has not entirely smiled upon you today, but the blood is a remarkable boon. Prized by warriors throughout the realms, it is said to grant extraordinary speed to those who paint it upon themselves in battle.

Ignoring the chaos around you, you quickly collect the blood before pressing onward.

GAIN ITEM

Magma Toad Blood

As you reach the far side of the cavern, the eruptions become less frequent, and as you enter the tunnel on the other side, fresh sea air reaches your lungs.

Moments later you are out of the cave and beneath the star-filled sky again, coughing as the cool night breeze clears the smoke from your lungs.`;}   
             
        case "Environment2RedItmChoice":
            if (wizard === "green") { return `You carefully store the tuft of enchanted fur amongst your belongings before continuing your journey.`;}
            if (wizard === "yellow") { return `You carefully stow the feather amongst your belongings before making your way to the bridge that leads from the island.`;}
            if (wizard === "blue") { return `You carefully stow the vial of blood before continuing along the shoreline.`;}   

        case "environment2Image":

            if (wizard === "green") {
                return "environment2Green.jpg";
            }

            if (wizard === "yellow") {
                return "environment2Yellow.jpg";
            }

            if (wizard === "blue") {
                return "environment2Blue.jpg";
            }

        default:
            return null;
    }
}