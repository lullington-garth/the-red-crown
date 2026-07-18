// variableMapChoicesShop.js

export function resolveSettlemetShopVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {
            
        case "settlementShop":
            if (wizard === "green") { return `You follow the tree-lined valley towards a cave mouth that you first spotted high upon the hillside. When you finally reach it, you discover a young but wild-looking woman sitting upon a boulder outside the entrance, grinding grubs with a mortar and pestle.

Her hair looks like a storm has recently discharged through it. Twigs, leaves and several small creatures have made their homes among the tangled strands, and every so often she pulls something from the mass and drops it into the bowl she is grinding.

When she notices you, she offers the bowl.

"Want some?"

When you politely decline, she merely shrugs.

"Come to buy then?"

Will you...`;}
            if (wizard === "yellow") { return `The next platform is home to a cheery village shop. A small cottage, thatched with silvery reeds, sits among the soft, rolling clouds. Stalls surround the building, selling all manner of wares, from unfamiliar vegetables to exotic fletching feathers and salves contained in clear corked bottles.

The shop is busy, with locals constantly coming and going, though it also appears to attract visitors from further afield, judging by the varied clothing and strange languages spoken by its patrons.

The business appears to be family-run. An older man and woman, whom everyone refers to as Mr and Mrs Rivers, oversee the shop, assisted by a young woman in her twenties whom the locals call Chug. Her resemblance to the Rivers is so striking that she can only be their daughter.

Will you...`;}
            if (wizard === "blue") { return `The silver beach stretches endlessly beneath a star crammed sky. The dark sea rolls quietly against the shore, each wave leaving trails of pale foam that glimmer like moonlight.

Ahead, you spot the solitary figure that you saw from afar, dragging a wooden sled across the sand. The man pauses occasionally to stoop and examine whatever the tide has carried ashore before tossing his finds onto the sled behind him.

A short distance farther on stands what you assume to be his home: a crude hut constructed from driftwood, broken spars and weathered sailcloth. Nets, shells and odd pieces of wreckage hang from ropes outside, while crates and baskets lie scattered around the entrance.

The man glances at you only briefly.

"Buying or wandering?" he asks.

Will you...`;}   
            
        case "settlementShopChoice1":
            if (wizard === "green") { return `Ask to see what she is selling?`;}
            if (wizard === "yellow") { return `Look around the stalls?`;}
            if (wizard === "blue") { return `Ask to see what he is selling?`;}   
            
        case "settlementShopChoice2":
            if (wizard === "green") { return `Keep following the path through the valley?`;}
            if (wizard === "yellow") { return `Keep following the path through the banked clouds to the bridge on the far side?`;}
            if (wizard === "blue") { return `Continue along the silver beach?`;}   
            
        case "settlementShopBuy":
            if (wizard === "green") { return `The woman rises and beckons you towards the cave.

"I'm Root," she says. "See anything you like, let me know."

The cave is surprisingly bright. A wide opening in the roof allows shafts of sunlight to spill inside, warming the stone floor. It must be a miserable place during rain or winter, but on a fine day it is almost comfortable.

Scattered throughout the cave is an eclectic assortment of objects, each neatly marked in chalk with its price.

Marsh Stalker Boots — 3 GP
Gil Ring — 2 GP
Moth Shadow Cloak — 2 GP
Paddle — 1 GP
Fishing Net — 1 GP
Iron Spike — 1 GP
Ink — 1 GP
Face Paint — 1 GP
Pewter Tankard — 1 GP

As you examine the wares, Root reaches beneath a pile of leaves and produces an earthenware jug.

"I've got some hot badger blood," she says, pouring a steaming cup. "One Gold Piece. Want some?"`;}
            if (wizard === "yellow") { return `The shop offers a wide variety of goods, exactly as you would expect from a store serving a small community. However, the stall that interests you most bears a sign marked CLEARANCE and appears to contain a collection of items that have accumulated over many years—objects of little use to the townsfolk, yet perhaps valuable to a traveller.

Among the cluttered table you discover the following items, each neatly labelled with its price.

Marsh Stalker Boots — 3 GP
Gil Ring — 2 GP
Moth Shadow Cloak — 2 GP
Paddle — 1 GP
Fishing Net — 1 GP
Iron Spike — 1 GP
Ink — 1 GP
Face Paint — 1 GP
Pewter Tankard — 1 GP

As you browse the table, Mrs Rivers approaches.

"We're serving hot cider today," she says warmly. "Just 1 Gold Piece. May I pour you some?"`;}
            if (wizard === "blue") { return `The man unhooks the rope from his shoulders and lets the sled fall onto the sand.

"Name's Trunk," he says. "If it's here, it's for sale. If it isn't, it washed somewhere else."

He leads you into the driftwood hut. The interior smells of salt, tar and old rope. Gaps in the sailcloth walls allow starlight to spill inside, illuminating shelves built from wrecked timbers and cargo crates.

The shelves are lines with an odd mix of items Trunk must have gathered over many years combing. Each item has its price scratched onto a small shell next to it.

Marsh Stalker Boots — 3 GP
Gil Ring — 2 GP
Moth Shadow Cloak — 2 GP
Paddle — 1 GP
Fishing Net — 1 GP
Iron Spike — 1 GP
Ink — 1 GP
Face Paint — 1 GP
Pewter Tankard — 1 GP

As you examine the goods, Trunk retrieves a battered kettle from a small stove of black stones.

"Tea," he grunts, pouring a steaming cup. "One Gold Piece."`;}   
            
        case "settlementShopBuyChoice1":
            if (wizard === "green") { return `Do you possess the Tanglewood Staff?`;}
            if (wizard === "yellow") { return `Do you possess the Sky Shard?`;}
            if (wizard === "blue") { return `Do you possess the Crystal Shard?`;}   
            
        case "settlementShopBuyChoice2":
            if (wizard === "green") { return `Would you like to try the hot badger blood for 1 GP?`;}
            if (wizard === "yellow") { return `Would you like to try the hot cider for 1 GP?`;}
            if (wizard === "blue") { return `Would you like to try the tea for 1 GP?`;}   
            
        case "settlementShopBuyChoice3":
            if (wizard === "green") { return `Would you rather decline the beverage and return to the valley path?`;}
            if (wizard === "yellow") { return `Would you rather decline the beverage and make your way to the bridge on the far side of the platform?`;}
            if (wizard === "blue") { return `Would you rather decline the drink and return to the beach?`;}   
            
        case "settlementShopHint":
            if (wizard === "green") { return `"So why you in valley?" asks Root. "Don't get many folk passing through."

You tell her of your journey and your hopes of reuniting the realms. To your surprise, she listens intently. She becomes particularly interested when you mention your search for Antiquity.

"Many years ago now," she says, "a man came through here sparkling like a summer stream. Great silver-blue aura all around him. I'll never forget him. He carried a silver acorn, but said it had come from Antiquity, not the silver tree. I asked him what Antiquity was, and he said it was a great silver oak. So I said, 'A silver tree then.' He said yes, but not the silver tree. I think he'd eaten one too many acorns, but he certainly was pretty."

As Root tells her story, you absent-mindedly sip the badger's blood and discover that it is surprisingly pleasant. It is not blood at all, but a rich and fruity tea with a warming taste.`;}
            if (wizard === "yellow") { return `The woman chatters pleasantly as she pours your drink. She tells you that she was born and raised in Tea Town and grew up in this very house.

"I do love it here," she says with a fond smile, accepting your coin and handing over the steaming mug. "People often ask whether I want to see the world, but I always tell them no. Let the world come to me."

You speak with her as you sip the hot cider. She is fascinated by travellers and delights in collecting their stories. When you tell her of your own adventures, she listens with rapt attention. She becomes especially excited when you mention your search for Antiquity.

"Many years ago now," she says, "a man passed through here who positively glowed. He had a great silver-blue aura surrounding him. I'll never forget it. He told me he had visited the great oak. He called the tree Antiquity, though he insisted it was not the silver tree. Then he produced a silver acorn from his pack. It seemed to me that a silver acorn must surely come from a silver tree, but I wasn't about to argue with him."

You keep sipping the cider as you listen, and find it to be good.`;}
            if (wizard === "blue") { return `Trunk sits upon an overturned crate, staring out through the doorway towards the sea.

"Don't see many travellers," he says. "Sea takes most folk before they get this far."

You tell him of your journey and your hopes of reuniting the realms. He says little, though he listens while mending an old fishing net. When you mention your search for Antiquity, he finally looks up.

"Had a fellow pass through years ago. Glowing all over. Silver-blue light around him."

He pulls thoughtfully at his beard.

"Carried a silver acorn. Said he'd seen Antiquity. Called it a great silver oak, though he was particular about it not being the silver tree. Didn't make much sense to me." He shrugs. "Most people out here are either lost or looking for something."

As the old beachcomber speaks, you sip the tea. Despite its unusual tang, it is pleasantly sweet, with a warming taste of fruit and spices.`;}                          
            
        case "settlementShopHintChoice":
            if (wizard === "green") { return `Once you finish your drink, you thank Root and make your way back to the valley path.`;}
            if (wizard === "yellow") { return `Once you finish your drink, you thank the woman and make your way to the bridge on the far side of the platform.`;}
            if (wizard === "blue") { return `Once you finish your drink, you thank Trunk and return to the silver beach.`;}   
            
        case "settlementShopLeave":
            if (wizard === "green") { return `Leaving Root's cave behind, you continue along the tree-lined valley. The slopes on either side eventually narrow and finally pinch closed. The path from this point on winds steeply upwards.

While steep, and seldom trodden, the path is well cut so your progress is good.

Within the hour you reach the crest of the rise and look down into another valley beyond. This one is carpeted in dense forest, and at its centre a soft silver light glows among the trees.`;}
            if (wizard === "yellow") { return `Leaving the shop behind, you make your way towards the only other exit from the platform: a long bridge suspended above the open skies and stretching towards an enormous plateau; a landmass the size of a city floating among the clouds. Looking to your right, you can see several other bridges extending from the settlement, all connecting to the vast floating land beyond.`;}
            if (wizard === "blue") { return `Leaving Trunk's hut behind, you continue along the silver sands. The shore curves gradually beneath the endless heavens while dark waves lap quietly beside you.

As the hours pass, the beach widens and the stars above seem to grow brighter. Far ahead, silhouetted against the glittering sky, stands an immense arch of black obsidian.

The colossal structure rises from the shoreline like the remains of some forgotten gate. Its polished surface reflects the starlight, causing it to gleam with faint silver edges.`;}   
            
        case "settlementShopLeaveChoice":
            if (wizard === "green") { return `With only one path open to you, you begin your descent towards the forest below.`;}
            if (wizard === "yellow") { return `You step onto the long sky spanning bridge and begin towards the enormous plateau ahead.`;}
            if (wizard === "blue") { return `It appears to be the only destination open to you so you begin walking towards the enormous obsidian arch.`;}   
            
        case "settlementShopRealmStaff":
            if (wizard === "green") { return `As Root approaches carrying the drinks, she suddenly lets out a startled cry, drops the jug and dives back towards her pile of leaves.

For a moment you think that the hot liquid has burnt her, but when she turns around she is grinning broadly and holding a glowing golden vine.

"That's Tanglewood," she says, pointing excitedly at your staff. "Stuff of nature, that. Wild magic. Loves its own. But rare. Very rare."

She raises the glowing vine and its warm light fills the cave.

"Know what this is? Sun-Soaked Suckle Vine. Natural magic too. Put them together—the staff and the vine—and they become one. Stronger together."

She smiles, revealing mossy teeth.

"You give me two Gold Pieces and I'll share some of this vine with you."`;}
            if (wizard === "yellow") { return `As Mrs Rivers approaches with the drinks, she suddenly lets out an excited squeak. For a moment you think she has spotted some local celebrity, but it quickly becomes apparent that she is staring directly at you.

"That's a Sky Shard," she says almost reverently. "Bernie! Quick, come here!"

An older man finishes serving a customer and hurries over.

"How can I help?" he asks, clearly expecting to assist with a sale.

"Look, B," says his wife. "He's got a Sky Shard."

The man's jaw drops.

"I never thought I'd see one with my own eyes," he says. "You know what that is, don't you? Sorry, of course you do. You don't simply stumble across a Sky Shard."

He stares at the crystal for several moments, completely overcome with awe. Then his expression suddenly brightens.

"Wait here."

He disappears into the house and returns carrying a large glass jar filled with swirling golden mist.

"Lilly Fly Flame," he says excitedly. "I traded for it years ago from a mage who was travelling to see Lo Tae Zhao himself. This is rare—impossibly rare. There are very few Lilly Flies, and they only produce flame under the right conditions. To have gathered this much is a miracle."

He points towards your shard.

"That crystal can absorb it. Let the flame mingle with the shard's own power. I cannot sell you the jar itself—it would be impractical for a traveller such as yourself anyway—but for 2 Gold Pieces you may place the shard within and allow it to absorb the Lilly Fly Flame."`;}
            if (wizard === "blue") { return `As Trunk pours the tea, his eyes briefly settle upon the Crystal Shard you carry.

He grunts. "You got yourself a Crystal Shard."

He sets down the kettle, rummages through his crates and eventually produces a small waxed pouch. Inside lies a fine silver powder that sparkles like crushed stars.

"Moonsalt," he says. "Came ashore years back. Magical enough, I suppose."

He pours some of the glittering dust into his palm.

"Rub it into the crystal and it'll take to it. Makes the thing stronger. Two Gold Pieces."He shrugs. "Take it or leave it. It can sit in the box another ten years if you don't want it."`;}   
            
        case "settlementShopRealmStaffChoice1":
            if (wizard === "green") { return `Would you like to accept Root's offer?`;}
            if (wizard === "yellow") { return `Would you like to accept the man's offer?`;}
            if (wizard === "blue") { return `Would you like to buy the Moonsalt?`;}   
            
        case "settlementShopRealmStaffChoice2":
            if (wizard === "green") { return `Would you rather decline and continue your journey?`;}
            if (wizard === "yellow") { return `Would you rather decline and continue your journey?`;}
            if (wizard === "blue") { return `Would you rather decline and continue your journey?`;}   
            
        case "settlementShopRealmStaffUpgrade":
            if (wizard === "green") { return `Root accepts the staff almost reverently. She places it across her lap and begins carefully weaving the glowing vine around the wood.

It is a beautiful sight. The vine sparkles and crackles softly as it binds itself to the staff, while Root works with patient, practised movements.

For a long while she continues the weaving, winding the golden vine along the entire length of the staff. As she reaches the tip, the staff suddenly flares with brilliant light.

Root sighs with satisfaction.

She places the staff back into your hands. You feel the increase in power immediately and also a little of the residue magic seeping into you.

GAIN ITEM
Infused Tanglewood Staff`;}
            if (wizard === "yellow") { return `The man reverently accepts the shard and carefully lowers it into the jar. The moment the crystal touches the golden mist, it begins to glow. The swirling flame rushes towards it, drawn into the shard as though inhaled by some invisible force.

It is a beautiful sight.

The process is brief. When the shard reaches its brightest point, the man carefully removes it and places it back into your hand.

You feel the increase in power immediately while a little of the residue magic seeps into you.

GAIN ITEM
Infused Sky Shard`;}
            if (wizard === "blue") { return `Trunk measures a portion of the moonsalt into a small leather packet and hands it to you.

"Work it into the crystal," he says. "Doesn't take long."

You sprinkle the glittering powder across the surface of the Crystal Shard. The grains immediately dissolve, flowing through the crystal like liquid starlight.

The shard begins to glow softly. Threads of silver light spread through its interior until the entire crystal shines with a cold, steady radiance.

The process lasts only a few moments, yet when it is complete you can immediately feel the increase in power. As an add bonus where the moonsalt has touched your skin you can feel a little of its magic as rubbed of into you as well.

GAIN ITEM
Infused Crystal Shard`;}   
            
        case "settlementShopRealmStaffUpgradeChoice":
            if (wizard === "green") { return `Stowing away the staff, you thank Root and make your way back to the valley path.`;}
            if (wizard === "yellow") { return `Stowing away the shard, you thank the couple and make your way to the bridge on the far side of the platform.`;}
            if (wizard === "blue") { return `Stowing away the shard, you thank Trunk and make your way back to the silver beach.`;}   

        case "environmentShop":

            if (wizard === "green") {
                return "root.jpg";
            }

            if (wizard === "yellow") {
                return "theRivers.jpg";
            }

            if (wizard === "blue") {
                return "trunk.jpg";
            }

            if (wizard === "red") {
                return "gym.jpg";
            }
            
        default:
            return null;
    }
}