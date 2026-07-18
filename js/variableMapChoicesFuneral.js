// variableMapChoicesFuneral.js

export function resolveFuneralVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {
        
        case "FuneralEntrance":
            if (wizard === "green") { return `The woodland path emerges into a broad rolling meadow. Around its edges stand brightly painted wagons, canvas shelters and makeshift pens for animals. Smoke drifts lazily upwards from numerous campfires, while voices and hymns carry upon the breeze.

At the centre of the field a great roaring fire blazes before a large wooden structure hastily assembled from rough-cut timber. Though temporary in appearance, it rises high above the surrounding camp and is draped with white banners bearing the symbol of a golden sun.

Gathered around the fire are dozens of men and women dressed in plain robes. Some sway gently as they chant while others kneel with bowed heads.

Standing before them is a broad-shouldered priest clad in white and gold. In one hand he carries a long sceptre crowned with a crystal which catches the firelight. His voice booms across the meadow as he preaches the word of the One True God.

Will you...`;}
            if (wizard === "yellow") { return `You cross the bridge and step onto a lush green island, its edges dotted with trees uncommon to this realm. At the centre of the platform a large gathering has assembled. The people are dressed not in finery, but in what are clearly their best clothes, though not a single bright colour is to be seen among them.

The crowd is gathered around a great bonfire which has yet to be lit. The atmosphere is sombre, and you quickly realise that you have arrived at a funeral. The bonfire is to serve as a funeral pyre.

Will you...`;}
            if (wizard === "blue") { return `The shoreline gives way to a vast coral bed exposed by the retreating tide. Pools of dark water lie between forests of crimson and blue coral while countless tiny shells glitter beneath the star filled sky.

Across the coral bed sea nymphs with flowing hair of blues and silver dance among star nymphs whose pale skin glimmers like moonlight. Their movements spread across the exposed reef in widening circles, passing from dancer to dancer until the dance seems to flow from the sea itself into the heavens above. Silver lights spiral upwards while reflections dance upon the water below.

Will you...`;}   
            
        case "FuneralMeetChoice1":
            if (wizard === "green") { return `Ask to join them in prayer?`;}
            if (wizard === "yellow") { return `Offer your respects?`;}
            if (wizard === "blue") { return `Attempt to join the dance?`;}   
            
        case "FuneralMeetChoice2":
            if (wizard === "green") { return `Say that you would like to make an offering to the One True God?`;}
            if (wizard === "yellow") { return `Say that you would like to offer a gift to the departed?`;}
            if (wizard === "blue") { return `Examine the ring of treasure?`;}   
            
        case "FuneralMeetChoice3":
            if (wizard === "green") { return `Make a polite retreat and continue towards the far side of the field?`;}
            if (wizard === "yellow") { return `Mutter an apology and make your way quickly towards the far side of the platform?`;}
            if (wizard === "blue") { return `Leave the dancers and continue your journey?`;}   
             
        case "FuneralEntranceChoice1":
            if (wizard === "green") { return `Investigate the church?`;}
            if (wizard === "yellow") { return `Offer your condolences and mingle with the mourners?`;}
            if (wizard === "blue") { return `Investigate the dance?`;}   
                        
        case "FuneralEntranceChoice2":
            if (wizard === "green") { return `Follow the path around the edge of the field and avoid the church?`;}
            if (wizard === "yellow") { return `Skirt the edge of the platform, keeping well away from the mourners, and make for the bridges on the far side?`;}
            if (wizard === "blue") { return `Look for another destination?`;}   
                        
        case "FuneralMeet":
            if (wizard === "green") { return `As soon as the priest sees you he raises his sceptre high above his head and in a deep carrying voice cries, "Praise the Lord! A lost lamb has wandered into our flock!"

The congregation turns as one to stare at you.

"Join us in prayer and be blessed!" he booms, "Join us in prayer and come under the protection of angels! Join us in sacrifice and feel the benevolence of the One True God!"

He gestures towards a stone altar standing beside the great fire. Around it lies a small mountain of offerings: coins, jewellery, weapons and other treasures donated by the faithful.

"Give generously to the One True God and the One True God shall give generously to you!"

Will you...`;}
            if (wizard === "yellow") { return `As you approach the mourners, you become painfully aware of your bright clothing and the fact that you do not belong here. A ripple of angry muttering spreads through the otherwise respectful gathering.

Will you…`;}
            if (wizard === "blue") { return `The nymphs pay you little attention as you walk among them. Their dance simply flows around you, never breaking, never faltering. Wherever you step, the dancers bend and turn as though water moving around a stone.

Towards the centre of the gathering dance the two queens. One shines with the colours of the sea while the other glimmers with the pale light of distant stars. Their movements are perfectly matched, each step answering the other.

Around them lies a great circle of treasure. Gems sparkle among shells and coral. Crowns lie beside pearls. Ancient coins, lamps of silver, jewelled goblets, golden masks and ornaments of rare beauty rest together upon the coral as though offered to the dance itself.

Neither queen nor dancer pays you any heed.

Will you...`;}   
                        
        case "FuneralOffer":
            if (wizard === "green") { return `The priest descends from his platform and grips your shoulders.

"Our saviour smiles upon the generous!" he cries. "The angels watch! The blessed host bears witness! Let all gathered here rejoice, for another soul has come bearing tribute before the throne of heaven!"

The congregation begins chanting.

"Blessed be the One! Blessed be the One!"

The priest thrusts his sceptre towards the altar.

"LORD. ACCEPT OUR OFFERING!"

What will you offer to the One True God...`;}
            if (wizard === "yellow") { return `"Tongo would have liked the idea of a stranger bringing a gift," says a tearful woman around whom much of the congregation has gathered.

"What offering are you prepared to make?"

Will you give up…`;}
            if (wizard === "blue") { return `The treasure circle stretches farther than you first imagined.

Jewels glitter amongst white shells and strange sea flowers. Coins from a hundred kingdoms lie scattered between silver goblets, broken crowns, polished shields and necklaces set with pearls. Lanterns fashioned from coloured glass rest beside coral carvings and ornaments of gold.

Some treasures appear ancient beyond reckoning, while others seem newly placed.

The dancers continue their endless movement around the circle.

Will you sacrifice an item to the treasure ring...`;}   
                        
        case "FuneralOfferMagic":
            if (wizard === "green") { return `The priest begins to weep as you reveal your offering. His hands tremble and he falls to his knees beside the altar, raising both arms towards the heavens.

"Praise the Lord! Praise the eternal light! Feel the blessed power fall upon you!"

The priest rises and places his hands firmly upon your shoulders, forcing you to your knees.

"Feel the blessing!" he cries. "The angels walk among us! I feel His power! It flows through me and now it flows into you! Rejoice! Rejoice!"

The crowd begins chanting as the priest raises his sceptre above your head.

"Praise be to the One True God! Praise be to His endless mercy!"

Eventually his fervour begins to subside.`;}
            if (wizard === "yellow") { return `A woman begins to weep as you produce your offering.

"He would have liked that," she says. "He loved magic. Well, curses really. It's what killed him in the end." She shudders and wipes her eyes. "But he'd have loved to take a little magic with him to the other side. And now... now he can."

She breaks down again and several mourners move forward to comfort her.

With a solemn nod, a tall man dressed in black lights a brand. After bowing his head and speaking a few quiet words, he touches the flame to the pyre.

The fire quickly catches.`;}
            if (wizard === "blue") { return `As your offering settles among the treasures, the dance turns towards you. Soft hands take yours and the dance embraces you.

Sea nymphs spin around you like waves while the star nymphs move above the coral with inhuman grace. Their movements guide your own, and for a brief time your clumsy human limbs seem to remember steps they have never learned.

AS the stars wheel overhead and the sea glows beneath your feet, you dance among silver reflections and drifting lights as the music of waves and distant stars carries you onwards.

The two queens pass close by, their movements weaving through your own before disappearing once more into the endless rhythm of the dance.

Eventually the music begins to fade.`;}   
                        
        case "FuneralOfferMagicChoice":
            if (wizard === "green") { return `You remain until the priest settles, and with mumbled thanks, make your way towards the path leading from the far side of the field.`;}
            if (wizard === "yellow") { return `You remain as long as seems respectful before making your way towards the bridges on the far side of the platform.`;}
            if (wizard === "blue") { return `Tired but strangely uplifted, you leave the dancers and make your way back towards the shore.`;}   
                        
        case "FuneralOfferItem":
            if (wizard === "green") { return `As you place your offering at the foot of the altar, you immediately realise that you have chosen poorly.

A terrible silence falls across the congregation.

The priest stares down at the object.

"What is this?" he whispers. He slowly raises his sceptre. "WHAT IS THIS?"

His face twists with fury.

"You insult the One True God! I feel His anger! I feel His displeasure!"

Before you can answer, the priest swings his sceptre and strikes you heavily across the face, knocking you to the ground.

LOSE 2 STAMINA.

"Begone, demon-spawn!" he cries. "Begone, heathen! Take your trinkets and your filthy corruption elsewhere!"

You stagger backwards as he raises the sceptre once more and the congregation begins shouting and peppering you with stones.`;}
            if (wizard === "yellow") { return `As you place your offering at the foot of the pyre, you immediately realise that you have chosen poorly. The tension among the mourners becomes almost unbearable.

"What is that? WHAT IS THAT?"

A large man, obviously drunk and overcome with grief, pushes his way through the crowd.

"Dad would have hated that!"

He lashes out with a kick at your offering, misses completely, and tumbles heavily to the ground, striking his head. As he struggles back to his feet, he grabs hold of a heavy branch and swings it at you.

The branch strikes you painfully across the chest.

LOSE 2 STAMINA.

You stagger backwards as other mourners seize the dead man's son and pull him away.

You have outstayed a welcome that was never truly offered.`;}
            if (wizard === "blue") { return `As you place your offering within the treasure ring, you immediately realise that you have chosen poorly.

The dance stops.

A soft hissing rises from the coral bed. It spreads from nymph to nymph until the sound carries out across the sea itself, taken up by figures dancing upon the dark waters.

The beautiful faces around you change. Their light fades as their eyes darken, teeth sharpen and once graceful fingers lengthen into claws which slash and rip at you.

LOSE 2 STAMINA.

The queens' faces become grey and terrible. Together they raise their heads and release a pair of ethereal cries that echo across both sea and sky.`;}   
                        
        case "FuneralOfferItemChoice":
            if (wizard === "green") { return `You turn and run, the priest hurling the wrath of his god after you as you flee.`;}
            if (wizard === "yellow") { return `You make your way towards the bridges on the far side of the platform as quickly as possible.`;}
            if (wizard === "blue") { return `You turn and flee from the spirits and the coral bed as quickly as you can.`;}   
                        
        case "FuneralPayRespects":
            if (wizard === "green") { return `"Join us in prayer?" the priest repeats. His smile slowly disappears. "JOIN US IN PRAYER WITHOUT FIRST MAKING AN OFFERING?"

The congregation falls silent.

The priest's face reddens and his knuckles turn white where he grips the trembling sceptre. His voice when he speaks next is deadly.

"He who would receive must first giveth! He who would take blessing without sacrifice insults the One True God!"

Without warning he swings his sceptre catching you across the face and knocking you heavily to the ground.

LOSE 2 STAMINA.

"Begone, worm!" he cries. "Begone, vulture! He who takes without giving shall never know the mercy of heaven!"

You stumble backwards as he advances upon you, raising the sceptre again, the congregation watching on in silence.`;}
            if (wizard === "yellow") { return `"Pay your respects? PAY YOUR RESPECTS?"

A large man, obviously drunk and highly emotional, pushes through the crowd.

"Dad would have hated that! Some stranger barging in on something private and offering meaningless platitudes!"

He swings wildly at you, misses, and falls heavily to the ground. As he scrabbles in the dirt, you suddenly feel a sharp blow across your back.

LOSE 2 STAMINA.

You turn to see a tiny old woman clutching a branch longer than she is tall.

"GO AWAY!" she screams. "GO AWAY! Leave us alone!"

She drops the branch and collapses to her knees, sobbing.

"Come here, son," she says, cradling the man who had attacked you.

Every eye in the gathering is now fixed upon you. Mumbling apologies, you slowly back away.`;}
            if (wizard === "blue") { return `Caught up in the moment, you attempt to join the dance but you cannot come close to matching the easy grace of the nymphs.

The flowing patterns break around you. Where once the dance moved like the tide, now you are a rock breaking the waters. You feel less like a dancer and more like a fish caught in rapids.

The nearest nymphs hiss with displeasure. The movement of the dance changes. You are struck from one side and then another as the dancers continue their steps, eventually knocking you to the coral floor.

The dance continues over you. Feet strike your body as though you are simply another stone or shell beneath the dancers' tread.

LOSE 2 STAMINA.

It is all you can do to crawl free of the moving crowd and drag yourself clear of the dance.`;}   
                        
        case "FuneralPayRespectsChoice":
            if (wizard === "green") { return `You turn and run, the priest shouting the displeasure of his god after you as you flee.`;}
            if (wizard === "yellow") { return `You make your way towards the bridges on the far side of the platform as quickly as possible.`;}
            if (wizard === "blue") { return `Dusting yourself off, you make your way back towards the shoreline.`;}   
                        
        case "FuneralOfferCursed":
            if (wizard === "green") { return `The priest begins to weep as you reveal your offering.

His knees buckle and he collapses beside the altar, clutching his sceptre tightly.

"Praise the Lord," he whispers. "Praise the eternal light."

His tears become sobs as he raises his arms to the heavens.

"Feel the blessing! Feel His mercy! Feel His hand upon us!"

The congregation begins chanting around him.

"He gets like that."

The quiet voice comes from a woman dressed in the plain robes of the faithful. She gently leads you away from the wailing priest.

"He's been this way ever since he saw the One True God beside the Silver Tree."

You ask her what she means.

"Our blessed saviour," she says quietly. "The Guardian of the Silver Tree. The priest saw Him standing upon the silver-green and was forever changed."

She looks towards the forest beyond the camp.

"One day I hope to tread the silver-green myself and stand before the Silver Tree. To see the gods. To feel their power."

Her eyes fill with tears.

Suddenly she falls to her knees beside the fire.

"Blessed be the One True God!" she cries. "Our saviour and our benefactor!"

Others join her in prayer.`;}
            if (wizard === "yellow") { return `A woman lets out a loud wail as you reveal your offering.

"He would have loved that," she says. "He loved curses. It's what killed him in the end. But he'd have loved to take one with him if he could. And now... now he can."

She breaks down once more and other mourners gather around to comfort her.

With a solemn nod, a tall man dressed in black lights a brand and, after speaking a few quiet words, sets the pyre ablaze.

"He was killed by the Gatekeeper," says a woman standing beside you. "Not by a curse. But I do not wish to confuse Mother with that now."

You ask what the dead man was doing near the Gatekeeper.

"He became obsessed with the Silver Tree," she says sadly. "He was not simply a fool who loved curses, although I suppose he did." She smiles faintly. "He was a curse-breaker. He became convinced that the Silver Tree possessed a magic he could use in his craft. But the Gatekeeper does not allow just anyone to walk the silver-green."

She shakes her head and disappears back into the crowd.`;}
            if (wizard === "blue") { return `As your offering joins the treasures, the dance of the queens quickens.

Green ribbons appear within the air around them, swirling and twisting about their bodies. The queens seem entirely untroubled, continuing their dance as the ribbons bind them together.

Silver ribbons follow. The two dancers become one.

For a single heartbeat their joined form sprouts branches. Their limbs become a trunk of silver-green wood and there, standing upon the coral bed, is a beautiful oak unlike any tree of the mortal world.

The vision lasts only an instant the branches become antlers. The take the form of a great horned sentinel clothed in silver-green ribbons that drift like seaweed upon a tide.

Again the vision changes. The giant dissolves and the ribbons fall away revealing the queens, locked together in the dance.

The fallen ribbons form a shining silver-green road upon the coral, and upon this strange path the queens continue to dance beneath the stars.

You do not know how long you stand watching.`;}   
                        
        case "FuneralOfferCursedChoice":
            if (wizard === "green") { return `You remain as long as seems respectful before making your way towards the path on the far side of the field.`;}
            if (wizard === "yellow") { return `You remain as long as seems respectful before making your way towards the bridges on the far side of the platform.`;}
            if (wizard === "blue") { return `Eventually you turn away from the captivating dance and make your way back towards the shoreline.`;}   
                        
        case "funeralLeave":
            if (wizard === "green") { return `With the church far behind you, you cross the rolling meadow towards its far side. Here the path divides.

One track leads towards a dense copse of trees where several men clad in woodland colours sit around a small fire, cleaning their weapons and speaking quietly amongst themselves.

The second path descends into a narrow, tree-lined valley. Far in the distance you can just make out the dark mouth of a cave opening in the hillside.`;}
            if (wizard === "yellow") { return `Leaving the burning pyre behind you, you make your way across the lush platform towards its far edge. Two more bridges sway gently beneath the open sky.

The first bridge leads to a busy platform where soldiers stand in groups beside several wagons. The cloud is thick there, but the soldiers have nevertheless managed to light a fire which hisses and spits as the mist rolls over it.

The second bridge leads to a neat little cottage standing alone upon its own platform. Judging by the tables and stalls arranged outside and the steady stream of visitors, it appears to be the local shop.

Will you...`;}
            if (wizard === "blue") { return `Leaving the dance behind, you return to the silver sands that border the star speckled sea.

The vast shoreline stretches away beneath the stars, and two distant landmarks draw your attention.

To the east lies a small island separated from the shore by a deep purple stone causeway. The tide has retreated sufficiently for the crossing to be possible, though the sea would almost certainly claim it once the waters rise again. A smattering of buildings stand upon the island, but the island's most striking feature is the tall mast planted near the shore closest to the black star-filled sea.

Farther along the beach stands a driftwood shack. Nearby, a solitary man walks the dunes, stooping occasionally, plucking items from the sand and dropping them onto a sled which he drags behind him.`;}   
                        
        case "funeralLeaveChoice1":
            if (wizard === "green") { return `Follow the path through the valley to the cave?`;}
            if (wizard === "yellow") { return `Visit the shop?`;}
            if (wizard === "blue") { return `Investigate the island?`;}   
                    
        case "funeralLeaveChoice2":
            if (wizard === "green") { return `Head towards the woods wher the men sit around a fire?`;}
            if (wizard === "yellow") { return `Head to the soldiers' encampment?`;}
            if (wizard === "blue") { return `See what the man upon the beach is doing?`;}   
            
        default:
            return null;
    }
}