// variableMapChoicesPoachers.js

export function resolvePoacherVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

//////////////////////////////////////////////
// POACHERS
//////////////////////////////////////////////

        case "poachers":
            if (wizard === "green") { return `The grey elves watch you as you approach the pool.

Unlike the woodland folk you have encountered elsewhere, these elves possess little warmth. Their cloaks are grey, their bows unstrung but close at hand, and their pale eyes follow your every step.

As you near the water's edge you notice for the first time what they are gathered around. At their feet lies the body of a slain Moonstag, one of the sacred beasts of the deep forests. Its silver antlers still glimmer softly, while pale markings shine beneath its fur even in death.

Such creatures are hunted by the cruel and the greedy for their antlers, which are ground into powders used in the darker strains of divination and enchantment.

The sight fills you with disgust, but the elves appear dangerous and entirely without remorse. You decide that your wisest course is to pretend you have little interest in their kill.

Will you:`;}
            if (wizard === "yellow") { return `The three men watch you closely as you cross the bridge towards them. As you draw nearer, you see their bodies tense. They say nothing, but each makes it painfully obvious that he is armed and has little hesitation about using his weapon.
                
                You had already suspected, from their clothing and demeanour, that these men were poachers, and your suspicions are confirmed as you approach the well.

Draped lifelessly over its stone edge lies a Moonfin Naiad, a rare magical creature that inhabits the hidden streams and silver pools of the realm. Its pale scales shimmer even in death, reflecting colours that seem not quite present in the air around it.

The creature is hunted by the lowest sort of poacher for its silver gill-pearls, small luminous nodules said to possess powerful divinatory properties and highly prized by alchemists and fortune-tellers.

You find the sight abhorrent, but the men look dangerous and capable, and you have little desire to add your own corpse to their tally. You decide that your safest course is to feign disinterest.`;}
            if (wizard === "blue") { return `The cave entrance opens into a broad chamber illuminated by a small fire.

Two women and a man stand beside the flames. Their clothes are mismatched but practical, while their equipment appears to have been collected over many years and from many different places. Crates, bundles and sacks are stacked against the walls, and beside them hangs a length of heavy cloth, although you cannot imagine its purpose.

You suspect they are smugglers, using the tears between realms to move goods where they ought not be. There is good money in such work and, with the borders between the realms weakening, it is unfortunately becoming more common.

Fortunately, their attention is fixed upon something lying beside the fire and they do not appear to have noticed your arrival.

"Could've picked anywhere else to die," mutters the taller of the two women, prodding something on the ground with her foot.

"It just wandered in from the tunnels," says the man. "What was I supposed to do with it?"

The three fall silent for a moment.

"Look at the eyes," says the man quietly.

You edge a little closer.

Lying upon the stone is a dead Starburrower, a pale six-legged creature that dwells within the crystal caverns beneath this realm. Its enormous black eyes stare upward, reflecting the nearby firelight like distant stars.

"We could sell the eyes," says the man. "They say those things can see tomorrow."

"Don't be disgusting," says the shorter woman. "Besides, who's buying bug eyes?"

You happen to know that practitioners of the darker arts would pay handsomely for such things, and perhaps for the rest of the creature besides.

One of the women turns, rubbing her head, and notices you.

"Who are you?" she demands.

You have no desire to add your own body to the cave floor, but neither can you think of a convincing explanation for why you were standing in the shadows listening to their conversation. Confidence, you decide, is your best protection.

Will you:`;}     

        case "poachersChoice1":
            if (wizard === "green") { return `Pretend to mistake them for travelling merchants and ask to see their wares?`;}
            if (wizard === "yellow") { return `Pretend you have mistaken them for merchants and ask to see their wares?`;}
            if (wizard === "blue") { return `Tell them you heard they were moving goods tonight and would like to see their wares before they leave?`;}     

        case "poachersChoice2":
            if (wizard === "green") { return `Give the hunters a nod of acknowledgement as you pass?`;}
            if (wizard === "yellow") { return `Offer the men a cheerful greeting as you pass?`;}
            if (wizard === "blue") { return `Offer the smugglers a cheerful "Hello"?`;}     

        case "poachersChoice3":
            if (wizard === "green") { return `Keep your head down and continue along the stream?`;}
            if (wizard === "yellow") { return `Keep your head down and cross the platform as quickly as possible?`;}
            if (wizard === "blue") { return `Announce loudly that you are merely passing through and stride boldly towards the opening on the far side of the cave?`;}     

        case "poacherShop":
            if (wizard === "green") { return `The grey elves exchange uncertain glances when you ask to see their wares.

For a moment you suspect they may simply loose arrows into you and be done with the matter. Then the eldest among them gives a faint smile and kneels beside several packs resting beneath a tree.

One by one he removes items and recites their prices in a slow, calm voice.

"Hockenbeast Pelt. Five gold pieces. Torgat Teeth. Five gold pieces. Sicklebeat Blood. Five gold pieces. Hodderance Horn. Five gold pieces."

The catalogue continues.

While the hunter clearly knows his trade, his pricing system appears remarkably straightforward.

Everything costs five gold pieces.

His wares consist of:

Hockenbeast Pelt
Torgat Teeth
Sicklebeat Blood
Hodderance Horn
Bollyworm Venom
Tin-Ticker Bones
A Scroll — Reed Stepper
A Scroll — Cloak of the Tempest`;}
            if (wizard === "yellow") { return `The poachers seem somewhat surprised when you ask to see their wares, but they quickly grasp the ruse.

The obvious leader walks over to the horses and begins pulling items from the packs, announcing each one and its price.

"Hockenbeast Pelt, five gold pieces. Torgat Teeth, five gold pieces. Sicklebeat Blood, five gold pieces. Hodderance Horn, five gold pieces..."

The list continues.

While the man clearly knows his products, his pricing system could perhaps use some refinement, or at least be summarised as:

Everything: 5 Gold Pieces.

His wares consist of:

Hockenbeast Pelt
Torgat Teeth
Sicklebeat Blood
Hodderance Horn
Bollyworm Venom
Tin-Ticker Bones
A Scroll — Reed Stepper
A Scroll — Cloak of the Tempest`;}
            if (wizard === "blue") { return `"Who told you we were moving goods tonight?" asks the taller woman.

"Bob," you reply.

The three stare at you for several uncomfortable moments.

Then the man laughs.

"Bob?" he says. "He's a card."

He kneels beside several crates and packs and begins removing items one by one.

"We've got Hockenbeast Pelt. Five gold pieces. Torgat Teeth. Five gold pieces. Sicklebeat Blood. Five gold pieces. Hodderance Horn. Five gold pieces."

"It's all five gold pieces," snaps one of the women.

"Oh. Right."

Their wares consist of:

Hockenbeast Pelt
Torgat Teeth
Sicklebeat Blood
Hodderance Horn
Bollyworm Venom
Tin-Ticker Bones
A Scroll — Reed Stepper
A Scroll — Cloak of the Tempest`;}     

        case "poachersShopChoice":
            if (wizard === "green") { return `When you have purchased anything you desire, continue along the stream path.`;}
            if (wizard === "yellow") { return `When you have purchased any items you wish, thank the poachers and continue across the next series of bridges.`;}
            if (wizard === "blue") { return `When you have purchased anything you desire, continue through the cave and climb towards the higher opening.`;}     

        case "poachersTestEthos":
            if (wizard === "green") { return `The elves return your nod with hostile glares, all three slowly turning to look at you through a silence becomes deeply uncomfortable.`;}
            if (wizard === "yellow") { return `The poachers clearly do not welcome attention, and you see them visibly stiffen at your greeting.`;}
            if (wizard === "blue") { return `"Hello," you say, giving a friendly wave.

The smugglers exchange puzzled glances.`;}     

        case "poachersFight":
            if (wizard === "green") { return `You decide that caution has brought you little reward.

"So," you say, glancing at the dead creature, "you hunt sacred beasts for fun then?"

The nearest elves bows are raised and notched before you can blink.

During the battle one of the grey elves remains at a distance, firing arrows into the combat.`;}
            if (wizard === "yellow") { return `You decide to throw caution to the wind and see whether a change of approach produces better results.

"So, you're poachers?" you ask.

That is as much as you manage to say before they are upon you.

During the battle, one of the poachers remains out of reach, firing arrows at you from a distance.`;}
            if (wizard === "blue") { return `You decide that caution has accomplished little.

"So," you say, nodding towards the dead creature, "smuggling and killing cave beasts? Busy evening."

Their weapons are in their hands before you finish speaking.

During the battle one of the smugglers remains near the rear of the cave, attacking from a distance.`;}     

        case "poachersEthosFail":
            if (wizard === "green") { return `You push out with a little magic in the hope of diffusing the situation, but if it has any effect at all you can't see it.

Frustrated, you blurt out, "Would it truly hurt to say good morning?"

The nearest elf slowly reaches for his weapon.

Apparently, it might.

Will you:`;}
            if (wizard === "yellow") { return `When your greeting receives no response other than three openly hostile stares, something inside you snaps.

You can tolerate many things, but bad manners are not among them.

Before you can stop yourself, you hear your own voice saying:

"Would it hurt to say good morning?"

As the men reach for their weapons, you realise that, actually, it might.

Will you:`;}
            if (wizard === "blue") { return `"Hello," you say again, accompanied by another cheerful wave.

As one of the women draws her weapon, you realise that waving alone may not be the answer.

Will you:`;}     

        case "poachersEthosFailChoice1":
            if (wizard === "green") { return `Try a different approach?`;}
            if (wizard === "yellow") { return `Attempt a different approach?`;}
            if (wizard === "blue") { return `Attempt a different approach?`;}     

        case "poachersEthosFailChoice2":
            if (wizard === "green") { return `Continue along the path without provoking the elves further?`;}
            if (wizard === "yellow") { return `Keep your head down and make your way to the far side of the platform without further provoking the men?`;}
            if (wizard === "blue") { return `Apologise for the intrusion and stride boldly across the cave towards the higher opening?`;}     

        case "poacherFightWon":
            if (wizard === "green") { return `As the second hunter falls, the surviving elf retreats several paces and lowers his bow.

Neither of you moves.

The forest itself seems to hold its breath.

Will you:`;}
            if (wizard === "yellow") { return `As the second poacher falls, the third lowers his bow and slowly backs towards the horses, never taking his eyes from you.

The two of you watch one another warily.

Will you:`;}
            if (wizard === "blue") { return `As the second smuggler falls, the survivor retreats deeper into the cave, edging steadily towards the strip of hanging cloth you noticed earlier.

Will you:`;}     

        case "poacherFightWonChoice1":
            if (wizard === "green") { return `Attempt to drive the remaining hunter away?`;}
            if (wizard === "yellow") { return `Attempt to frighten the remaining poacher away?`;}
            if (wizard === "blue") { return `Attempt to drive the remaining smuggler away?`;}     

        case "poacherFightWonChoice2":
            if (wizard === "green") { return `Leave the clearing as quickly as possible?`;}
            if (wizard === "yellow") { return `Leave the platform as quickly as possible?`;}
            if (wizard === "blue") { return `Scramble across the cave and leave before the smuggler reaches the cloth?`;}     

        case "poachersSearch":
            if (wizard === "green") { return `You raise your staff and call upon the magic of the realm.

Small lights drift from the ground around you. Leaves rise into the air and begin to circle your body while strange whispers move through the trees.

The display is largely illusion, but the surviving elf clearly believes he is witnessing the judgement of the forest itself.

His composure finally breaks and he flees into the trees, disappearing among the shadows.

Searching the abandoned packs, you discover little of practical value, though you do recover 13 Gold Pieces. You also note that one of the finely crafted saddlebags has been fashioned from Phoenix Hide. The material disgusts you, but the workmanship is undeniable, and it would greatly increase your carrying capacity.

GAIN ITEM
Phoenix Hide Saddlebag

Gain 13 Gold Pieces

You feel little remorse for the fate of the hunters. The wild places of this realm may be safer without them, any you feel your magic strengthened because of it.

GAIN 1 MAGIC`;}
            if (wizard === "yellow") { return `You straighten to your full height, raise your staff, and put on a very obvious display of magic.

In truth, it is little more than a harmless light show, but the surviving poacher clearly does not know that.

He scrambles onto his horse and gallops away, leaving the remaining animals tethered beside the well.

You search the horses for anything of value. There is little of use among the packs, but you do discover 13 Gold Pieces and you note that one of the saddlebags is fashioned from Phoenix Hide. Distasteful though the material may be, the bag would greatly increase your carrying capacity.

GAIN ITEM
Phoenix Hide Saddlebag

Gain 13 Gold Pieces

You feel little remorse for the deaths of the poachers. The magical realm will likely be a safer place without them.

GAIN 1 INNER STRENGTH`;}
            if (wizard === "blue") { return `You charge at the remaining smuggler, screaming and waving your arms like a man possessed.

With a curse, she tears aside the hanging cloth, revealing a shimmering tear between realms.

She throws herself through.

Thunder rolls overhead. The ground shakes violently and, with an explosion of splintering rock, the tear collapses.

As the dust settles, you turn your attention to the abandoned packs.

You discover little of value. However, you recover 13 Gold Pieces, and among the scattered crates you find a finely crafted Phoenix Hide Saddlebag.

The material disgusts you, but the workmanship is exceptional and it would greatly increase your carrying capacity.

GAIN ITEM

Phoenix Hide Saddlebag

Gain 13 Gold Pieces

You feel little sympathy for the smugglers. The realms are dangerous enough without people such as these moving their wares between them.

Still, things could have ended much worse, and the saddlebag is an excellent find.

GAIN 1 LUCK`;}     

        case "poachersSearchChoice":
            if (wizard === "green") { return `When you are finished searching you continue along the forest path`;}
            if (wizard === "yellow") { return `When you are finished searching the horses, continue to the far side of the platform.`;}
            if (wizard === "blue") { return `When you are finished searching, you climb from the cave through the higher opening on the far side.`;}     

        case "poachersHint":
            if (wizard === "green") { return `Deciding that conversation may prove safer than silence, you tell the elves that you seek a silver oak and ask whether they have encountered such a tree.

The hunters remain cautious, but their hostility softens.

"Silver bark?" says one quietly. "Sure. We've seen beyond the Warden. The green road that leads there is not kind to travellers, mind."

"Silver-green," says another of the elves and receives a dirty look for his troubles.

The first elf speaks again. "You'd have to tread light on those paths our you not remain on them long."

You wait to see if there is more coming, but the elf does not elaborate further.`;}
            if (wizard === "yellow") { return `Throwing caution aside, you decide that conversation may ease the tension.

You tell the men that you are searching for a silver oak and ask whether they have encountered such a tree during their travels.

Although they remain wary, they no longer seem to view you as a threat.

"Aye," says one of them. "We've seen the tree beyond the Guardian. Treading the Silver-Green was one of the most dangerous jobs we've ever taken."

"Paid well, though," adds another.`;}
            if (wizard === "blue") { return `Deciding that conversation is safer than silence, you ask the smugglers whether they have encountered a silver oak.

The three exchange glances.

The man eventually nods.

"Seen silver trees," he says. "Beyond the Watcher guarding the green passage."

"You mean the Silver-Green," says one of the women.

The man shrugs.

"Silver-Green, green passage, whatever they call it. Nasty place."

He pokes at the fire.

"Walk through there and you'll feel eyes on you the whole time."

He does not appear eager to discuss the matter further.`;}     

        case "poachersHintChoice":
            if (wizard === "green") { return `Deciding not to test their patience, you thank them and continue on your way.`;}
            if (wizard === "yellow") { return `Deciding not to push your luck any further, you thank the men and continue across the platform.`;}
            if (wizard === "blue") { return `Thanking them for the information, you continue through the cave.`;}     

        case "poachersExit":
            if (wizard === "green") { return `Only a single path leaves the clearing.

The earth is heavily trampled and marked with countless hoofprints and droppings. Whatever creatures use this route, they travel it often.

Beyond the trees you can see fenced grazing grounds and movement among the tall grass. A flock of strange animals wanders the meadow ahead.`;}
            if (wizard === "yellow") { return `There is only one bridge leading away from the platform.

Its planks are spaced much closer together than those of the previous bridges and are covered with animal droppings, suggesting that it serves as a herding route.

Your suspicions are confirmed when you glimpse the platform ahead. It too is fenced, and within the enclosure grazes a flock of strange animals.`;}
            if (wizard === "blue") { return `The cave slopes steadily upward before opening onto a high plateau overlooking a narrow inlet.

Below, shallow waters lap gently against silver sands.

Dozens of strange creatures paddle through the shallows, their dark backs rising and falling beneath the reflected stars. From this distance they resemble a flock grazing upon the sea itself rather than upon grass.

There is only one way onward.`;}     

        case "poachersExitChoice":
            if (wizard === "green") { return `With no other route available, you follow the muddy trail.`;}
            if (wizard === "yellow") { return `With no other way forward, you step onto the mucky bridge.`;}
            if (wizard === "blue") { return `Leaving the cave behind, you begin the descent towards the inlet below.`;}     

        case "poacherImage":
            if (wizard === "green") {
                return "hunters.jpg";
            }
            if (wizard === "yellow") {
                return "poachers.jpg";
            }
            if (wizard === "blue") {
                return "smugglers.jpg";
            } 

        default:
            return null;
    }
}