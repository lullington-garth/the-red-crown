// variableMapChoicesPeck.js

export function resolveSoldiersVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {
            
        case "soldierEntrance":
            if (wizard === "green") { return `You make your way through a small copse of ancient trees where a group of hard-faced men sit around a campfire cleaning and sharpening their weapons.

Their conversation seems to concern where they should travel next. Some of the group seems keen to remain while the rifts are still active, but a more vocal few wish to move on to more profitable hunting grounds. From what you can gather, it seems that their decision will be based not upon where the most good can be done, but upon where the most coin can be earned.

The men fall silent as you approach, their hands drifting towards their weapons, but when it becomes clear that you pose no threat to them, they return to their discussion and pay you little further attention.

Leaving them to their arguments, you continue deeper into the trees.

A little deeper into the trees, suspended high amongst the branches, you discover a man trapped inside a large rope net. His possessions have been scattered across the forest floor beneath him. The captive spits angrily through the mesh when he sees you.

"Cut me down!" he snarls. "Or by the gods, when I free myself I'll dice you into cubes!"

Will you:`;}
            if (wizard === "yellow") { return `None of the soldiers pay you much attention as you cross the bridge and step onto the broad, cloud-strewn island. Most of them are gathered around a fire that fizzes and crackles within the rolling banks of mist that cover the ground.

As you walk further onto the island, you pass a sturdy wooden wagon with a barred window set into its door.

A man's face appears behind the bars. His eyes are wild and his beard unkempt.

"Friend! Friend!" he calls in a harsh whisper.`;}
            if (wizard === "blue") { return `You cross a deep purple causeway to the small island beyond with its scattered weather-beaten houses. Towards the far side of the island, where the waves crash violently against the rocks below, the broken mast of a ship, which you saw from afar, appears to have been driven deep into the stone of the island.

As you walk between the cottages, fearful faces peer at you from behind shuttered windows. Every door is barred. No lamps burn within the houses, and no voices carry upon the wind. It is as though the entire community has gone into hiding.

As you approach the mast through the sea spray, you notice with horror that a figure has been tied to it, the sea sending icy spray crashing over them as the waves batter the stone.

Will you:`;}   
            
        case "soldierEntranceChoice1":
            if (wizard === "green") { return `Stop to talk to the trapped man?`;}
            if (wizard === "yellow") { return `Head over to the prisoner and see what he wants?`;}
            if (wizard === "blue") { return `Head over to the person tied to the mast?`;}   
            
        case "soldierEntranceChoice2":
            if (wizard === "green") { return `Ignore the man and continue through the trees?`;}
            if (wizard === "yellow") { return `Continue across the island towards the bridge on the far side?`;}
            if (wizard === "blue") { return `Decide you want no part of this and leave the island to continue your journey?`;}   
            
        case "soldierPrisoner":
            if (wizard === "green") { return `The man struggles violently against the ropes.

"Well?" he snaps. "Are you going to cut me down or stand there gawping? Whoever set this trap will pay dearly when I get my hands on them."

Will you:`;}
            if (wizard === "yellow") { return `"Friend, you must let me out," the man pleads. "I am being held here under false pretences. The crime they accuse me of is a lie. I am an innocent man. It is all a terrible misunderstanding."

Will you:`;}
            if (wizard === "blue") { return `A young woman has been lashed to the mast with thick ropes. Her sodden clothes cling to her, and terror fills her eyes. She cries out as she sees you.

"Get away! Get away!" she screams. "The Kraken need not take both of us!"

Will you:`;}   
            
        case "soldierPrisonerChoice1":
            if (wizard === "green") { return `Refuse to release the trapped man?`;}
            if (wizard === "yellow") { return `Refuse to release the prisoner?`;}
            if (wizard === "blue") { return `Try talking to the woman?`;}                           
            
        case "soldierPrisonerChoice2":
            if (wizard === "green") { return `Cut the man down from the net?`;}
            if (wizard === "yellow") { return `Make sure no one is watching and set the prisoner free`;}
            if (wizard === "blue") { return `Release her free from the mast?`;}   
            
        case "soldierPrisonerChoice3":
            if (wizard === "green") { return `Leave him where he hangs and continue through the trees?`;}
            if (wizard === "yellow") { return `Ignore the prisoner and continue across the island towards the bridge on the far side.`;}
            if (wizard === "blue") { return `Decide you want nothing to do with this and continue on your journey.`;}   
            
        case "soldierPrisonerBargain":
            if (wizard === "green") { return `The man slumps in the net, the anger slowly draining from the man's face. He ceases struggling and lets out a long sigh.

"Perhaps you're wiser than you look," he mutters. His eyes settle upon your equipment and he studies you carefully. "A mage, are you? Well, if you're not going to free me, perhaps I can at least earn a little coin."

He shifts awkwardly within the net.

"I've a Potion of Ogre Strength among my belongings below. You may find such a thing useful upon your travels."

He nods towards his scattered possessions.

"Four Gold Pieces and the potion is yours."

Will you:`;}
            if (wizard === "yellow") { return `The man's eager expression falls.

"I understand, friend. You do not know me, and you do not know the crime they claim I committed. No hard feelings."

He glances around before lowering his voice.

"But do not leave just yet. I have with me a Potion of Ogre Strength. I know what you are thinking: if I possess such a potion, why am I still trapped inside this wooden cage? I am terribly alergic, friend. I try an drink it, my skinn falls off," he says with a chuckle, "but perhaps you may find it useful on your travels. For you, such a thing may be a great boon."

He grins through the bars.

"And what do I ask for such a treasure? Merely ten gold pieces."

Will you:`;}
            if (wizard === "blue") { return `The woman lets out a sob. "Please go. Please." She lowers her voice. "But before you do…"

Her expression becomes pleading.

"There are offerings around my feet. My uncle placed a Potion of Ogre Strength amongst the hoard in the hope of poisoning the Kraken. It will not kill the beast. It will only anger it." She glances fearfully towards the dark sea. "The offering is already too small. If you could take the potion and leave four Gold Pieces in its place, perhaps the Kraken will be satisfied and spare my family."

Tears stream down her face.

"The potion is good. Please," she whispers. "Help me in this small way."

Will you:`;}   
            
        case "soldierPrisonerBargainChoice1":
            if (wizard === "green") { return `Pay the man 4 Gold Pieces for the potion?`;}
            if (wizard === "yellow") { return `Offer him 4 Gold Pieces?`;}
            if (wizard === "blue") { return `Leave 4 Gold Pieces and take the half-brewed potion?`;}   
            
        case "soldierPrisonerBargainChoice2":
            if (wizard === "green") { return `Refuse his offer and continue through the copse?`;}
            if (wizard === "yellow") { return `Refuse his offer and continue across the island towards the bridge on the far side?`;}
            if (wizard === "blue") { return `Would you rather not get involved and leave the island to its fate?`;}   
            
        case "soldierPrisonerFree":
            if (wizard === "green") { return `After making certain that none of the armed men nearby are watching, you draw your sword and cut through the ropes securing the net.

The captive crashes heavily to the forest floor.

For a moment he simply lies there. Then his eyes suddenly widen with fury.

"You!" he roars. "You set the trap!"

Before you can protest, he snatches up a sword from among his scattered possessions and charges towards you.

You have no choice but to fight.`;}
            if (wizard === "yellow") { return `You quickly glance around. None of the guards appear to be paying you any attention.

"All right," you say.

Raising your sword, you bring the pommel crashing down onto the lock. It breaks apart easily.

The instant the door swings open, the man flies into a frenzy. He tumbles from the wagon, seizes a nearby pike from a stack of weapons and charges towards you, screaming wildly.

You have no choice but to fight.`;}
            if (wizard === "blue") { return `You cannot bring yourself to leave the poor woman tied to the mast. Working quickly, you struggle with the sea-soaked knots as waves crash against the rocks beneath you. Throughout it all, the woman screams and struggles against your efforts.

At last the final rope falls away and the woman stares at you in horror.

"What have you done?" she shrieks.

Snatching up an oar from the pile of offerings at her feet, she advances towards you, screaming wildly.

You have no choice but to fight.`;}   
            
        case "soldierPrisonerPotion":
            if (wizard === "green") { return `"Wise choice," says the man, directing you towards a battered bottle lying amongst his belongings.

Inside swirls a thick crimson liquid.

"Just one drop of ogre blood," he says, "and you'll possess the strength of a giant."

Taking the potion, you drop 4 gold piece into his pack.`;}
            if (wizard === "yellow") { return `"The prisoner laughs. I suppose I am in no position to haggle. 4 gold pieces it is. He dissapears for a moment.
                
                Here, friend," he says a moment later appearing at the bars once more and passing a dirty bottle through the bars. "May it serve you well."`;}
            if (wizard === "blue") { return `It feels wrong to leave the terrified woman tied to the mast as an offering to some monstrous creature of the deep, yet it is clearly what she wishes.

You search amongst the scattered treasure at her feet until you discover the stoppered bottle containing the unfinished potion. Placing it carefully within your pack, you remove four Gold Pieces from your pouch and add them to the offering.

"Thank you," whispers the woman. "Thank you. Now go. Quickly."`;}   
            
        case "soldierPrisonerPotionChoice":
            if (wizard === "green") { return `You nod to the trapped man hanging amongst the branches and continue through the trees.`;}
            if (wizard === "yellow") { return `You thank the man and continue across the island towards the bridge on the far side.`;}
            if (wizard === "blue") { return `Unsure whether you have done the right thing, you leave the lonely island behind.`;}   
            
        case "soldierPrisonerDead":
            if (wizard === "green") { return `As the woodsman falls, his cries bring the armed men running from their campfire.

They surround you, weapons drawn, shouting accusations and questions all at once. After much explanation and frantic gesturing, you eventually manage to convince them that the man attacked you after he freed himself from the trap.

Although they appear unconvinced, none of them seem eager to challenge you further.`;}
            if (wizard === "yellow") { return `As you dispatch the wild prisoner, you find yourself surrounded by angry soldiers shouting at you in a language you do not understand.

After much shouting and frantic gesturing, you think you manage to convince them that the prisoner escaped of his own accord. They remain highly suspicious, but accept your story.

You decide it is best not to linger.`;}
            if (wizard === "blue") { return `You feel terrible for what has happened. Your intention had been to save the young woman, not to kill her. But there is nothing that can now be done now.

The doors of the scattered cottages begin to open and frightened islanders emerge, shouting at you from a safe distance. Their anger seems directed less at the woman's death and more at what the Kraken might think of it.

None of them dare approach you.`;}   
            
        case "soldierPrisonerDeadChoice":
            if (wizard === "green") { return `Deciding it is best not to remain, you quickly leave the copse behind.`;}
            if (wizard === "yellow") { return `You leave the soldiers behind and hurry towards the bridge on the far side of the island.`;}
            if (wizard === "blue") { return `Swallowing your anger and sorrow at the needless death, you make your way back towards the causeway beneath a hail of curses and abuse.`;}   
            
        case "soldiersLeave":
            if (wizard === "green") { return `The trees gradually thin until you emerge upon the brow of a vast valley.

Far below stretches a dense forest whose canopy forms an unbroken sea of green. Below lies a deep valley filled with dense forest. Ancient trees crowd together beneath a canopy of green, their branches concealing much of the woodland floor. Towards the centre of the forest you can see a faint silvery glow shining among the trees.`;}
            if (wizard === "yellow") { return `The bridge on this side of the island is a long one, stretching out across the open sky towards a vast landmass beyond, large enough to contain an entire city.

Looking to either side, you can see other great bridges extending from the distant settlement and joining neighbouring islands suspended in the clouds.`;}
            if (wizard === "blue") { return `As you reach the end of the causeway, the dark waters erupt with an explosive roar.

A monstrous shape rises from the star-speckled sea. Great tentacles thrash amongst the waves as an enormous beak lunges towards the island. The Kraken seizes the maiden, shaking her like a rag doll before disappearing once more beneath the black waters.`;}   
            
        case "soldiersLeaveChoice":
            if (wizard === "green") { return `You start your descent towards the forest below.`;}
            if (wizard === "yellow") { return `You cross the bridge and step onto the larger island beyond.`;}
            if (wizard === "blue") { return `Horrified, you leave the island behind and return to the silver shore.`;}   

        default:
            return null;
    }
}