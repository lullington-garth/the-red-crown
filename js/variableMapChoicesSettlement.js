// variableMapChoicesSettlement.js

export function resolveSettlementVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "settlementEnter":
            if (wizard === "green") { return `It is not long before you find yourself approaching a small settlement nestled among rolling banks and ancient trees. Narrow paths wind between grassy rises, while a clear stream cats through the land ahead forming natural boundaries.

Everything you have encountered thus far within this realm has felt vast and untamed. Here, for the first time, you glimpse how those who dwell within these wild places make their homes.

Two paths present themselves.

The first leads between clusters of low huts built from woven reeds, timber and living vines. Small gardens surround each dwelling and smoke rises lazily from turf-covered roofs. A carved wooden sign beside the path reads: **The Carols**

The second path follows the bank of a stream towards a shaded pool where three grey elves stand among the roots of several ancient trees.

Will you:`;}
            if (wizard === "yellow") { return `It is not long before you find yourself on the outskirts of a cluster of interconnected platforms. Rope bridges link the busy walkways, forming the first true settlement you have seen in this realm.

Everything you have encountered thus far has been grand and majestic in scale. Here, for the first time, you glimpse how those who dwell on the fringes of the realm live.

Two bridges lead into the settlement.

The first crosses to what appears to be the residential quarter. Crude houses have been built in uneven clusters across several adjoining platforms. A sign hammered into the earth at the end of the bridge reads:

**Welcome To Tae Town**

Calling this small collection of platforms a town may be somewhat generous, but the name does possess a certain charm.

The second bridge leads to a fenced enclosure where three men and several horses are gathered around a well.

Will you:`;}
            if (wizard === "blue") { return `For some time you have travelled towards a distant cluster of dark rocks rising from the silver sands like islands upon a frozen sea.

As you draw nearer, you begin to notice signs of habitation. Small stone dwellings have been built in the shelter of the rocks, their low walls stacked from black stone and their roofs covered with sailcloth and driftwood. Dim blue lanterns hang outside several doorways, and thin streams of smoke drift lazily into the star-filled sky.

To the west of the dwelling at the foot of the tallest rocks in the region, a low cave mouth glows with the flicker of orange firelight. Shadows move across the walls within, and every now and then a figure briefly passes before the flames.

Beyond the rocks, the land rises towards a broad ridge overlooking the distant waters.

Will you:`;}
 
        case "settlementEnterChoice1":
            if (wizard === "green") { return `Follow the stream towards the three grey elves?`;}
            if (wizard === "yellow") { return `Head across the bridge towards the three men by the well?`;}
            if (wizard === "blue") { return `Approach the cave and investigate the firelight?`;}

        case "settlementEnterChoice2":
            if (wizard === "green") { return `Walk into the huts of The Carols?`;}
            if (wizard === "yellow") { return `Cross into Tae Town's residential district?`;}
            if (wizard === "blue") { return `Head towards the small dwellings among the rocks?`;}

        case "settlementEnterChoice3":
            if (wizard === "green") { return `Ignore the settlement and continue your journey?`;}
            if (wizard === "yellow") { return `Ignore the settlement and continue your journey?`;}
            if (wizard === "blue") { return `Ignore both and continue your journey across the starlit plain?`;}        

        case "settlement":
            if (wizard === "green") { return `You follow the winding path into the settlement known as The Carols.

The huts are scattered among grassy banks and ancient trees, each dwelling built from woven reeds, bent timber and living vines carefully coaxed into shape. Their roofs are thick with moss and turf, while small gardens flourish beside every home. Herbs hang drying beneath eaves and smoke curls lazily upward from hidden hearths.

The settlement feels at peace. The sounds of running water, birdsong and distant laughter drift between the trees, while narrow paths wind between the huts before disappearing over the rolling ground.

The Carols is not large. From where you stand you can already make out the paths leading away from the village and hear the nearby stream that divides the surrounding lands.`;}
            if (wizard === "yellow") { return `You wander into the tiny settlement of Tae Town.

The houses are little more than wooden cottages built from weathered planks and rough-cut beams, their roofs thatched with silver grass gathered from the nearby platforms. Small gardens and neatly stacked firewood lend the place a cared-for appearance, and despite its humble nature the settlement feels warm and welcoming.

The town itself is small enough that you can see both rope bridges that connect the neighbouring platforms. They hang at the far end of the settlement, less than a minute's walk away, swaying gently above the endless sea of clouds below.

Will you:`;}
            if (wizard === "blue") { return `You make your way among the dark rocks and low stone dwellings that cling to them.

The black stone houses sport small gardens of coral and crystal where shards grow in sheltered hollows between the buildings, glowing faintly beneath the stars. Blue lanterns hang outside several doors, while narrow paths wind between the rocks towards the distant shore.

The settlement is not large and beyond the final buildings you can see that the land rises towards a broad ridge overlooking the silver waters.`;}     

        case "settlementChoice1":
            if (wizard === "green") { return `Explore The Carols?`;}
            if (wizard === "yellow") { return `Explore the town?`;}
            if (wizard === "blue") { return `Explore the settlement?`;}     

        case "settlementChoice2":
            if (wizard === "green") { return `Head directly towards the paths beyond the settlement?`;}
            if (wizard === "yellow") { return `Head directly for the bridges?`;}
            if (wizard === "blue") { return `Continue directly towards the ridge?`;}     

        case "settlemetLantern":
            if (wizard === "green") { return `The people of The Carols greet you warmly as you wander among the huts. Several offer friendly nods, while others pause in their work to wish you good fortune.

Children chase one another along the grassy banks and gardeners tend beds of herbs and vegetables that grow in the shelter of the trees. The entire settlement feels old, settled and deeply rooted within the realm.

Following a narrow footpath between two moss-covered huts, you discover a small public house built against the roots of an enormous oak.

A wooden sign hangs above the door.

THE LONG SHADOW

The windows glow warmly and the scent of roasting vegetables and fresh bread drifts from within.

Do you possess the Lantern of the Long Shadow?`;}
            if (wizard === "yellow") { return `The town is a friendly place. The people seem genuinely pleased to see a traveller passing through their little settlement, offering nods, smiles and cheerful salutations as you walk by.

Curious about the cottages built near the edge of the platform, you leave the main road and slip between two buildings. The houses here are just as simple and homely as those facing the square. Small vegetable gardens flourish beside the walls, while beyond them stretches a breathtaking view of sun-dappled clouds drifting far below the floating island.

Nearby, a young girl plays alone in a small yard. She leaps and pounces at patches of shadow, chasing them across the ground as though hunting invisible prey. With so many buildings surrounding the yard and the sun standing high overhead, there are very few shadows to be found, yet she pursues each one with determined enthusiasm, laughing whenever the darkness slips away from her grasp.

Do you possess the Lantern of the Long Shadow?`;}
            if (wizard === "blue") { return `You wander quietly between the stone dwellings.

The people here acknowledge your presence with brief nods before returning to their work. Some mend nets woven from silver cord while others tend strange gardens where coral branches and crystal fragments protrude from beds of dark sand. The sound of waves drifts constantly across the settlement.

Near the western edge of the rocks stands a tall black tower built against the cliffs. Its upper platform is fitted with heavy shutters surrounding a brilliant white glow.

A weathered sign beside the entrance reads:

SHADOW HOUSE

As you approach, a young soldier rushes from the doorway looking thoroughly distressed.

"The starlight's dying," he cries. "By the tides, not tonight."

Behind him the tower is in chaos. Soldiers run in all directions while barked orders ring around the Shadow House.

Do you possess the Lantern of the Long Shadow?`;}     

        case "settlemetLanternYes":
            if (wizard === "green") { return `You remove the Lantern of the Long Shadow and study the sign above the door. The carved image upon it is identical to the lantern in your hands. Curious, you step inside.

"By the roots."

An elderly woman behind the counter stares at the lantern in your hand as you enter. She comes out from behind the bar and crosses the busy pub.

"May I?" she says reverently touching the lantern's frame. "My grandfather carried one such lantern," she says quietly. "The Long Shadow was named for it."

She waves over her husband, who like her seems to be stunned to see the lantern. When, having no use for it yourself, you offer it to them, you think they might faint.

"Really?" says the woman her eyes filling with tears, "Really?"

You hand the lantern over and once they have had time to compose themselves, they introduce themselves as Elowen and Bram.

Bram holds up the lantern and calls out, "The Long Shadow is home! A round on the house." There is a hearty cheer from the patrons.

"We thought this lost generations ago," says Elowen. "You have done us a great service bringing our history home. Please let us prepare you a meal on the house."

Will you:`;}
            if (wizard === "yellow") { return `You remove the Lantern of the Long Shadow from your pack and light it.

At once the effect is remarkable. Every shadow in the yard stretches and lengthens across the ground. The shadows of fences, barrels and washing lines suddenly grow long and dark, twisting over the grass.

The girl gasps with delight.

She darts from one shadow to the next, laughing as she chases them around the yard.

"That was an act of kindness," says a voice behind you.

You turn to see a woman standing in the doorway of a nearby cottage.

"Thank you. We are about to eat. Please, come in and join our meal."

Will you:`;}
            if (wizard === "blue") { return `As the young soldier rushes from the Shadow House, you step aside and catch his arm asking what the problem is.

"Meteor storm coming," he says breathlessly. "The starlight's running low. Without it we won't be able to warn the sailors."  He points towards the sea. "No shadow without light."

You look up at the tower asking why not simply shine the light as a beacon?

The soldier stares at you as though you have gone completely mad.

"Everything shines out there," he says. "The sea, the sky, even the rocks glitter. Add another light to all that and nobody notices. Cast a shadow across the water though..." He points towards the distant shore. "Everyone sees that."

This gives you an idea. You pull the Lantern of the Long Shadow from your pack asking it it might be of use.

The private looks from the lantern to you and back again, clearly uncertain what he is seeing. Before he can answer though, a voice calls from the doorway of the Shadow House.

"You there! Bring that here. Quickly!" An officer stands beneath the entrance arch, his eyes fixed upon the lantern. 

You hurry towards him.

"This way. Quickly."

He turns and races up a narrow spiral staircase that winds through the tower. You follow as fast as you can. The climb seems endless. Your chest burns and your legs ache as you finally emerge into a small circular chamber high above the silver shore.

Worried looking soldiers snap to attention as the officer enters.

He points towards the lantern. "Light this and place it behind the shutters."

The nearest soldier obeys at once. As soon as the lantern is lit, darkness spills outward from the tower. Long black shadows stretch across the silver waters, rolling over the sea like great wings.

The soldiers cheer.

The officer turns and clasps your hand firmly.

"Captain Marek," he says. "You have saved many lives this night."

He looks around at the men. "Keep that lantern burning," he says, then turning back to you, "Come and join us in the officers' mess. The least we can do is feed you."

Will you:`;}     

        case "settlemetLanternYesChoice1":
            if (wizard === "green") { return `Thank Elowen but continue your journey?`;}
            if (wizard === "yellow") { return `Thank the lady but decline her kind offer?`;}
            if (wizard === "blue") { return `Thank Captain Marek and continue your journey?`;}     

        case "settlemetLanternYesChoice2":
            if (wizard === "green") { return `Accept her hospitality?`;}
            if (wizard === "yellow") { return `Accept the invitation?`;}
            if (wizard === "blue") { return `Accept the invitation?`;}     

        case "settlementSkyShard":
            if (wizard === "green") { return `Not wishing to visit the inn and seeing little else to explore, you begin making your way back towards the village paths.

As you pass beneath the spreading branches of an old oak, a young woman carrying an armful of firewood stumbles and collides with you, scattering sticks across the grass.

"Oh goodness!" she exclaims. "I'm terribly sorry."

She kneels to gather the wood.

Do you possess the Tanglewood Staff?`;}
            if (wizard === "yellow") { return `Having reached the farthest edge of Tae Town and realising there is probably little else to see, you turn to make your way back towards the bridge.

The girl chasing shadows suddenly leaps sideways, probably attempting to catch a particularly elusive shadow, and collides heavily with you.

"Sorry!" she squeaks. "Sorry, sorry, sorry!"

Do you possess the Sky Shard?`;}
            if (wizard === "blue") { return `Not wishing to add to the panic at the Shadow House, you make your way back towards the settlement. You are just passing between what you expect to be a group of barrack building when a you soldier comes haring around the corner his arms full of bundles of spears and swords.  

He lets out a startle yelp, but there in no way for him to stop in time and he bundles right into you.

"Sorry!" he calls out as the two of you collide sending spears and swords clattering across the stones.

"Stars above!" says the man. "I am so sorry."

Do you possess the Crystal Shard?`;}     

        case "settlementSkyShardNo":
            if (wizard === "green") { return `You help gather the scattered firewood and assure the young woman that no harm has been done.

"Thank you," she says with an embarrassed smile. "I really should watch where I'm going."

The distant sound of laughter and conversation drifts from the nearby inn.`;}
            if (wizard === "yellow") { return `You assure the girl that no harm has been done.

At that moment her mother appears in the doorway of the nearby cottage.

"You been jumping into strangers again, girl?" the woman asks.

The child lowers her head sheepishly.

You smile, wave goodbye and make your way back towards the main road.`;}
            if (wizard === "blue") { return `You help gather the fallen weapons.

"Thank you," says the armourer, clearly embarrassed. "The quartermaster is already in a foul mood without me dropping half the armoury."

With a final apology, the armourer continues towards the barracks.`;}     

        case "settlementSkyShardNoChoice":
            if (wizard === "green") { return `Wishing her well, you return to the main paths that head out of The Carols.`;}
            if (wizard === "yellow") { return `You return to the main road and head for the bridges.`;}
            if (wizard === "blue") { return `You return to the paths leading beyond the settlement.`;}     

        case "settlementSkyShardYes":
            if (wizard === "green") { return `You assure the young woman that no harm has been done, but before you can continue she yelps.

"Master Caelan!" she calls. "Master Caelan, quickly!"

An elderly man seated beneath a nearby oak rises from his chair. His robes are woven from leaves and bark cloth. He places the staff that was across his lap with collection of other  carved staffs lean against a broad tree.

As he shuffles over to you, the young woman points excitedly.

The old man's eyes widen. 

"A Tanglewood Staff," he says.

He approaches carefully, studying the living wood with open admiration.

"Good work Poppy," he says to the young woman. Turning to you he says, "I am Caelan, a staff mage of the western groves. In all my years I have never seen a Tanglewood staff. May I examine it?"

"They are living things, you know," he explains as you pass over the staff. "They drink the strength of the realm itself. With your permission, I would gladly tune it."

When you ask what payment he requires, he seems offended.

"Payment? No true staff mage would charge for such work. We serve the staffs, not the wizard."

He assures you that no harm will come to your staff and when he returns it it will increase you magic reserves. When you agree to his offer he says, "Good, leave it with me. Why don't you wait in the Long Shadow while I work, If you say I sent you I expect Elowen will rustle up some food for you.

You head over to The Long Shadow where indeed Elowen does prepare a meal for you. You are just finishing simple but hearty fare, when the old mage returns carrying your improved staff. He looks thoroughly delighted.

"It accepted the tuning beautifully," he says. "Though I suspected it would."

When you accept the staff back from him you can feel the heightened power within.`;}
            if (wizard === "yellow") { return `You assure the girl that no harm has been done and are preparing to leave when she suddenly gasps.

"Come with me! Come with me!"

She sounds incredibly excited.

The girl jumps up, grabs your hand and begins pulling you towards her home. Curious, you allow yourself to be led along.

"Mum! Mum!" she shouts before you even reach the door.

A stout woman wearing a flour-stained apron appears in the doorway.

"What are you doing, Bless?" she asks, looking distressed. Turning to you she says, "I'm sorry, mister. She gets wrapped up in her games sometimes."

She then addresses the child.

"Come on, Bless. The man can't play right now."

"Not playing, Mum. Look!"

She points excitedly towards your side.

"He's got some Sky Shard."

The woman's eyes widen as she notices the staff.

"Krint! Krint! Come and see this!"

A broad-shouldered man emerges from within moments later.

"What? What—"

His voice trails away as he sees the Sky Shard.

"Sky Shard," he says in awe. "You'd better come inside."

It soon becomes clear that Krint is a staffsmith, and a skilled one. Your Sky Shard is only the second he has ever seen.

"They can be imbued with incredible power," he explains. "With your permission, I would be honoured to tune it."

When you ask what the work will cost, he laughs.

"You don't charge to work on a Sky Shard in my trade. You do it because it is the right thing to do. Those staffs hunger for power, and any staffsmith fortunate enough to encounter one works for the love of the craft."

He refuses all discussion of payment and is delighted when you agree.

While he works, you share a meal with his wife Mary and young Bless. The food is simple but hearty, and by the time you have finished eating Krint returns carrying your upgraded staff.

He looks positively delighted.

"It took to the tuning beautifully," he says. "Though of course it did."

Once again he refuses any payment and instead thanks you for allowing him to work on the staff.`;}
            if (wizard === "blue") { return `You assure the armourer that no harm has been done. Between the two of you, you collect up the fallen weapons, he'd been ambitious trying to move them all in one load, and you offer to help him carry them to wherever they are going.

"Thanks," says the man. "Need to get them to the armoury. My name is Serin, by the way. Please, its this way."

You follow Serin into a stone workshop built beneath the rocks. Racks of swords, spears and crossbows line the walls, while magical crystals glow softly within iron cages.

You are carefully laying your load onto a nearby bench when Serin says, "Is that... is that a Chrystal Shard?"

He dumps is weapons and Serin examines your staff with obvious fascination.

"I've been studying enchanted weapons for years, military and otherwise, but I've never seen anything as potentially powerful as a Crystal Shard. Can I tune it for you?" He looks at you hopefully. "I'd receive a lashing if anyone caught me working on civilian equipment, but a Chrystal Shard..." He shakes his head. "It's a once-in-a-lifetime opportunity."

You say you don't want to get him into any trouble, but he just smiles, "This," he says taking the staff and playing it on the bench. "This is worth a beasting."

While he works, the two of you share a simple lunch of smoked fish and hard bread beside the forge. Serin works meticulously, almost reverently as he rolls the staff over and over muttering incantations.

After some time Serin passes the staff back to you. The crystal glows more brightly than before and you can feel its increase in focus immediately.

"It accepted the tuning beautifully," he says. "I only wish I had another hundred years to study it."

When you ask what you owe he just laughs. "It's on t he silver shore military that one.`;}     

        case "settlementSkyShardYesChoice":
            if (wizard === "green") { return `You thank Caelan for his work, and Elowen for the meal and continue on your journey.`;}
            if (wizard === "yellow") { return `You thank Krint, Mary and Bless for their kindness before returning to the road through Tae Town and heading for the bridges.`;}
            if (wizard === "blue") { return `You thank Serin for both the meal and his work and head into town towards the plateaux.`;}     

        case "settlementHint":
            if (wizard === "green") { return `Elowen and Bram insist on giving you meal. When you pull out you coin pouch, Bram waves it away. "You don't pay here," he say. 

The food, when it comes, is simple but filling: fresh bread, vegetable stew, roasted roots and sweet berry preserves.

GAIN 2 STAMINA.

As you eat, they ask what brings you to The Carols. You speak of your journey and your search for Antiquity, the Silver Oak.

"You can sometimes see its silver-blue glow from the high banks on a clear evening," says Bram. "Never gone there myself. Folk like us have little reason to seek an all-knowing tree. A lot of people do though, especially with the weakening boundaries." He sighs. "That's a right nasty business," he says. "Has everyone worried and seems to be attracting... strange folk."

Elowen nods.

"There's a preacher set up beyond the eastern fields. Arrived only a few weeks ago with a travelling chapel and a crowd of followers. Claims he can explain the changes to the realm."

"And then there's the vigilants," Bram mutters. "Armed folk wandering the paths, questioning travellers and deciding who belongs here and who doesn't."

"Tabitha says she saw one of the boundaries open near the lower stream," says Elowen. "Claims she could see another realm entirely through the mist. Frightened her half to death."

Bram shakes his head. "If I were you, I'd sat well clear of that lot."`;}
            if (wizard === "yellow") { return `The family offer you a place at their table. Though the meal is humble, it is nourishing and satisfying.

GAIN 2 STAMINA.

As you eat, they ask what brings you to Tae Town. You tell them of your quest and your search for Antiquity, the Silver Oak.

"You can sometimes see its silver-blue glow from here on a clear night," says Krint. "Never been there myself, mind. What business have folk like us with an all-knowing tree?"

The conversation soon turns to the troubles affecting the settlement.

The weakening boundaries between the realms have caused frequent sky quakes, and the townsfolk are worried.

"Seems to attract all sorts too," says Krint, wiping the last of his stew from his bowl. "Old Teddy Cliftweedle has given one of his fields over for a funeral pyre. None of them are from around here neither. Strange folk. Who wants to lay their dead to rest on land they never knew?"

"It's not right," agrees Mary. "I've seen prison carts crossing the bridges. Tabby, who lives further up the lane, says the barriers are so thin now that you can see clear into another realm from some of the lower platforms. Gave her quite a fright."

Krint nods grimly.

"If I were you, I'd stay clear of such places until things settle down."`;}
            if (wizard === "blue") { return `Captain Marek and the other officers welcome you into the mess hall.

The room is plain but comfortable. Maps cover the walls while navigational charts and brass instruments clutter the tables.

You are served hot fish stew, fresh bread and roasted shellfish.

GAIN 2 STAMINA.

During the meal you ask if any of their maps show the location of Antiquity, the Silver Oak.

"I've heard sailors speak of it. It's silver bule path and the warden that guards it," says Marek. "Not on any map I've ever seen tough. Not something the military seem to have much interest in. We have bigger things to worry about at the moment."

He studies his bowl.

"The weakening boundaries have caused no end of trouble."

Another officer snorts. "All sorts coming through now."

Marek nods. "We have an open rift down in Finger Cave," says Marek. "Nobody knows where it leads."

"Something has infested the coral beds as well," says a lieutenant. "Blue spirits or sea ghosts. Nobody really knows."

A third officer shakes his head. "And people have started leaving offerings for the Kraken again. Madness. Why invite a monster to your shores?"

Marek sighs. "We spend more time chasing rumours than defending the coast these days."`;}     

        case "settlementHintChoice":
            if (wizard === "green") { return `You spend some time longer beside the fire chatting with Elowen and Bram before eventually rising to continue your journey.`;}
            if (wizard === "yellow") { return `You thank the family for their hospitality and head back into town.`;}
            if (wizard === "blue") { return `You finish your meal, thank the officers and take your leave heading back into town.`;}  

        case "settlementLeave":
            if (wizard === "green") { return `Two paths leave The Carols and disappear into the surrounding countryside. One follows a stream through open fields where distant livestock graze among rolling hills. The animals are too far away to make out clearly, though you occasionally hear their calls carried on the breeze.

The second path winds between ancient trees towards a gathering of wagons and canvas shelters. A large wooden structure rises above them, surrounded by numerous figures. Smoke curls from braziers and banners flutter among the branches.

Will you:`;}
            if (wizard === "yellow") { return `At the far end of Tae Town, two rope bridges stretch between the floating platforms.

The first is a long, weather-beaten crossing made from rough planks and fraying ropes. It sways gently above the clouds and appears to lead to a grazing platform where a small flock of animals wanders among patches of grass.

The second bridge is broader and sturdier. Beyond it lies what was might usually be a beautiful meadow lined with trees, but today the platform is crowded with figures in sombre clothing gathered around a massive unlit bonfire.

Will you:`;}
            if (wizard === "blue") { return `Beyond the final buildings the land climbs towards a broad rocky plateau overlooking the distant shore.

One route descends towards a silver-sanded inlet where dozens of strange creatures paddle through the shallow waters. Their dark backs rise and fall beneath the reflected stars. From this distance they resemble some kind of herd seeming grazing upon the sea itself.

Further east, a coral bed glimmers with an unsettling blue radiance. Pulses of light ripple through the growths, illuminating the shoreline with an eerie blue glow.

Will you:`;}   

        case "settlementLeaveChoice1":
            if (wizard === "green") { return `Follow the path towards the grazing fields?`;}
            if (wizard === "yellow") { return `Take the bridge to the grazing platform?`;}
            if (wizard === "blue") { return `Travel towards the silver inlet?`;}   

        case "settlementLeaveChoice2":
            if (wizard === "green") { return `Travel towards the preacher's encampment?`;}
            if (wizard === "yellow") { return `Head over to the lush looking platform where the bonfire awaits lighting?`;}
            if (wizard === "blue") { return `Investigate the glowing coral beds?`;}   

        default:
            return null;
    }
}