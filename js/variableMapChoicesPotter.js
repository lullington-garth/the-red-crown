// variableMapChoicesPotter.js

export function resolvePotterVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        
        case "potterImage":

            if (wizard === "green") {
                return "antiqueDealer.jpg";
            }

            if (wizard === "yellow") {
                return "potter.jpg";
            }

            if (wizard === "blue") {
                return "toyShopOwner.jpg";
            }

            if (wizard === "red") {
                return "petShopOwner.jpg";
            }

        case "potterOutside":
            if (wizard === "yellow") {
                return `Sitting at a junction is a small potter’s cottage, its whitewashed walls stained with dust from the nearby roads. Thin trails of grey smoke curl from a crooked chimney and rows of clay pots dry upon wooden shelves beneath the windows. A high level of craftmanship has gone into those pots. You can just make out the steady clack of a turning wheel as it drifts out through the open doorway carrying with it the warm smell of clay and kiln-fire.`;
            }
            if (wizard === "green") {
                return `At the crowded junction stands a squat antique shop squeezed tightly between two taller buildings. Its faded green paint peels in long strips from the doorframe and the grimy windows are so cluttered with old relics that little light escapes from within. Tarnished mirrors, cracked portraits and rusting brass instruments stare out at the street like objects from a lost and found bin. Above the doorway hangs a weathered wooden sign: Tackenbarn's Antique Emporium.`;
            }
            if (wizard === "blue") {
                return `At a busy junction stands a narrow toy shop with brightly painted shutters and a tooting sign above the door. Tin birds hang from brackets on the storefront spinning slowly in the wind while carved puppets grin at the world from behind the wide bay window at the front of the shop.`;
            }
            if (wizard === "red") {
                return `At the next junction stands a crooked pet shop with warped black timbers and smudged yellowing windows. Scratches, barks, snorts, howls and chirping come from inside and wicked looking cages hang beneath the awning overhead, empty for now, swaying gently in the wind. Painted above the door in rough red lettering are the words: Mystical Creatures Bought and Sold.`;
            }      
            
        case "potterShopName":
            if (wizard === "yellow") {
                return `potter's cottage`;
            }
            if (wizard === "green") {
                return `antique shop`;
            }
            if (wizard === "blue") {
                return `toy shop`;
            }
            if (wizard === "red") {
                return `magical creature shop`;
            }   
            
        case "potterName":
            if (wizard === "yellow") {
                return `potter`;
            }
            if (wizard === "green") {
                return `antique dealer`;
            }
            if (wizard === "blue") {
                return `toy shop owner`;
            }
            if (wizard === "red") {
                return `shopkeeper`;
            }  
            
        case "potterInside":
            if (wizard === "yellow") {
                return `Inside the cottage the air is heavy with the scent of damp clay and hot ash from the kiln glowing at the back of the room. Shelves line the walls from floor to ceiling, crowded with painted bowls, smooth cups, clay lanterns and tiny figurines. Behind a spinning wheel sits a broad-shouldered potter with rolled sleeves and clay smeared up both arms. He looks up from his work and smiles as you enter.

At the rear of the shop, resting atop a tall wooden stand, is a pale blue jug decorated with silver markings. A small sign hanging from its handle reads: SOLD. The potter notices your interest and says, ‘A Jug of Endless Life. Fill it with water and it will heal any wound. Already sold, I’m afraid.’`;
            }
            if (wizard === "green") {
                return `You push open the heavy door and step into the dusty antique shop. Every inch of the cramped interior is crowded with old and interesting objects; candlesticks, faded maps, locked chests, cracked masks and shelves of yellowing books stacked so high you wonder if the bottom books will ever see the light of day again.

Behind a scarred oak counter stands the shop owner, a short stocky man dressed in a dark velvet coat with silver rings upon his long fingers. He studies you carefully through a single round eyeglass before speaking in a low measured voice.

‘Take care what you touch. Some things here are older than kingdoms.’

At the rear of the shop stands a tall iron cabinet secured with a thick brass lock. Resting upon a cushion inside is a crystal skull no larger than a clenched fist. Pale light swirls like drifting mist with in it.

‘The Whispering Skull,’ says the man following your gaze. ‘While you hold it you can not die. Far too valuable to sell, I'm afraid.’`;
            }
            if (wizard === "blue") {
                return `As you enter the toy shop a bell chimes brightly above the door. The walls are crowded with an explosion of eye-catching curiosities; wooden soldiers stand in ranks upon shelves, clockwork mice scurry in circles beneath tables and painted dolls hang from strings staring silently with glass eyes.

Behind the counter stands a thin old toymaker in a patchwork waistcoat, his silver spectacles perched low on the end of his crooked nose. He looks up from a half-finished marionette as you enter, he smiles pleasantly and says, ‘Welcome, traveler. Mind the soldier by your foot. He bites.’

Around the old man’s neck hangs a delicate golden music box no larger than a pocket watch, engraved with tiny stars and moons. You have seen one of those before. It's a Lullaby Box. When wound the beautiful sound will send all but the wearer to sleep. They are extremely rare and immensely powerful. You could down a dragon with a Lullaby Box if it was in earshot.’

'Not for sale,' says the shopkeeper noticing your gaze. He tucks the little box into his shirt.`;
            }
            if (wizard === "red") {
                return `The stench inside the shop is apalling. The cramped room is hot, damp and filthy filled with a cacophony of animal sounds: growling, chittering, sniffing, chirping but somehow all of it unhappy. Cages line every wall from floor to ceiling holding creatures you can hardly guess the names of. Hairless cats with too many eyes stare at you, as lizards with glowing tongues spit black pitch and black-feathered birds mutter softly amongst their many head.

Behind the counter stands the shopkeeper, a tall sly-looking man in a stained leather coat. His greasy hair hangs loose about his face and as his calloused hands usher a vicious looking rodent into a corked jar. He glances up at you.

‘Did the matron send you?’ he rasps. When you indicate no he loses interest in you.

At the end of the counter, curled up in a cage too small for her, lays what you recognise to be a Moonveil Fox. Those, to whom the fox feels it owes a debt, will be granted moon magic. Very rare and very powerful.`;
            }  
            
        case "potterPrompt":
            if (wizard === "yellow") {
                return `When you are done browsing the potter wipes his hands upon his apron and gestures to a cabinet of finely crafted clay jewellery. 
                
                ‘Now, if it is protection you seek, I can make you something special. A clay pendant marked with warding runes. Twenty Gold Pieces, and a little patience while the kiln works its magic.’`;
            }
            if (wizard === "green") {
                return `When you are done the antique dealer says, 'This may interest you.' He unlocks a drawer beneath the counter and removes a tarnished gold ring set with a pale blue stone.

‘The Goddess Blessing,’ he says in a hushed tone. ‘You will never be without magic with this little ring. It's magic is faint, but for twenty Gold Pieces I can rekindle it.’`;
            }
            if (wizard === "blue") {
                return `When you return to the counter, the toymaker opens a velvet-lined drawer filled with polished silver coins etched with strange symbols. He adjusts his spectacles and says, ‘If you are looking for a little extra luck, I can enchant a coin especially for you. Twenty Gold Pieces, and a little time to work the proper charms into the metal.’`;
            }
            if (wizard === "red") {
                return `When you are done, the shopkeeper calls you over. 
                
                ‘Ever considered a familiar?' he says. 'This ones a clever little devil,' he pulls down a jar with a tiny black imp demon in it. 'Knows spells, this one, let him sleep around your neck and he'll fight for you too. Furiously loyal once bound. Twenty Gold Pieces and he’s yours, and I'll throw in the binding for free.’`;
            }  
            
        case "potterSpecial":
            if (wizard === "yellow") {
                return `Would you like to ask the potter to make a protection charm pendant for you?`;
            }
            if (wizard === "green") {
                return `Would you like to ask the antiques dealer to re-kindle the magical ring for you?`;
            }
            if (wizard === "blue") {
                return `Would you like to ask the toy shop owner to enchant a lucky coin for you?`;
            }
            if (wizard === "red") {
                return `Would you like to ask the shop owner to bind the familiar to you?`;
            }        
            
        case "potterAttack":
            if (wizard === "yellow") {
                return `Attack the potter and make for the jug?`;
            }
            if (wizard === "green") {
                return `Attack the antiques dealer and make for the skull?`;
            }
            if (wizard === "blue") {
                return `Attack the toy shop owner and take the Lullaby Box?`;
            }
            if (wizard === "red") {
                return `Attack the shop owner and free the fox?`;
            }    
            
        case "potterWares":
            if (wizard === "yellow") {
                return `You browse the potter’s wares while the kiln crackles softly nearby. Painted masks, glazed cups and tiny clay charms crowd the shelves. Among them you find several finely crafted pieces that catch your eye.`;
            }
            if (wizard === "green") {
                return `You move slowly about the crowded shop examining the clutter of object on display. There are some real finds dotted around the shop, but for today your needs are small. There are a few items you consider though.`;
            }
            if (wizard === "blue") {
                return `You wander slowly through the crowded toy shop taking in painted masks, clockwork birds and dancing puppets suspended from the rafters. Several items pique your interest.`;
            }
            if (wizard === "red") {
                return `You look around the cramped pet shop trying not to get too close to the cages. While the animals are of no real interest to you, the pet shop owner does have a few other items you feel are worth a look.`;
            }  

        case "potterFight":
            if (wizard === "yellow") {
                return `You draw your weapon and lunge towards the potter, hoping to seize the magical jug by force. The man leaps back, snatches up a heavy iron kiln poker and prepares to defend himself.`;
            }
            if (wizard === "green") {
                return `You draw your weapon and rush towards the locked cabinet, hoping to seize the crystal skull before the dealer can stop you. The old man curses sharply and snatches a sword-cane from beside the counter, its thin steel blade flashing into view.`;
            }
            if (wizard === "blue") {
                return `You draw your weapon and rush the old toymaker, hoping to seize the golden music box by force. His pleasant smile vanishes at once as he snatches a concealed wand from his waistcoat and prepares to defend himself.`;
            }
            if (wizard === "red") {
                return `You draw your weapon and charge shop owner, hoping to free the Moonveil Fox and gain its loyalty, before the shopkeeper knows what's happening, but the man seems ready for you. He snatches up a wicked looking hook clacking it across the cages. The animal around the shop go wild.`;
            }  
            
        case "potterCharm":
            if (wizard === "yellow") {
                return `You hand over the Gold Pieces and wait beside the warm kiln enjoying the potter's company as the he carefully shapes the clay with steady hands. A fair time later the ward is ready and he presents you with a delicate pendant etched with protective symbols.

GAIN ITEM
The Pendant of Protection`;
            }
            if (wizard === "green") {
                return `You hand over the Gold Pieces and wait while the antique dealer stokes the enchantment by candlelight. He murmurs a magic you do not recognise as pale smoke coils around the golden band. As you watch the pale gem flares with light. The  antique dealer nods and slides the ring across the counter towards you.

‘Old magic,’ he says. 'May it serve you well.'

GAIN ITEM
The Goddess Blessing`;
            }
            if (wizard === "blue") {
                return `You hand over the Gold Pieces and wait patiently while the old toymaker works at his cluttered bench beneath the glow of a small oil lamp. The enchantment is obviously complicated, but he completes it successfuly and soon he is pressing a polished silver coin into your palm, warm to the touch and etched with runic symbols.

'Flip it when you need a little extra luck,' he says.

GAIN ITEM
The Jester's Gambit`;
            }
            if (wizard === "red") {
                return `You hand over the gold and wait while the shopkeeper performs the binding ritual. The imp hisses and spits, cursing all the while as silver smoke coils around it forming tight chains. When the creature is bound the chains vanish and the imp scurries up your arm.

‘There,’ says the man with a grin. ‘He belongs to you now. The devil you know....’

GAIN ITEM
Imp Demon`;
            }              
            
        case "potterRegret":
            if (wizard === "yellow") {
                return `The potter lies dead beside the ruined kiln, the Jug of Endless Life smashed beyond repair during the battle. Looking around at the broken wares and bloodstained clay, you realise with growing shame that you have just killed a good man for no other reason than greed.`;
            }
            if (wizard === "green") {
                return `The antique dealer lies dead among a shop of shattered relics. The crystal skull lays smashed around him, the cabinet having been upended in the struggle. A strange pale light leaks from the skull shards fading into nothing as you watch. You look around the ruined shop and you realise, with a stab of shame, that greed has led you to kill a good man and destroy something ancient and irreplaceable.`;
            }
            if (wizard === "blue") {
                return `The old toymaker lies motionless upon the shop floor surrounded by shattered toys and splintered wood. He has fallen on the golden music box crushing it beyond practical repair. You look down at the macabre scene. What have you done? Led by greed you have killed a good man and destroyed an artifact.`;
            }
            if (wizard === "red") {
                return `The shopkeeper lies dead among broken cages. Terrified creatures screech, flutter, and scream while others flee into the streets outside. You look to the fox, but it is dead. It must have been caught by a blow as you fought to free it. You have killed a man and destroyed something rare and of great value.`;
            } 

            default:
            return null;
    }
}