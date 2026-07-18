// variableMapChoicesFortressEntrance.js

export function resolveMarketHallVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "marketHallImage":

            if (wizard === "green") {
                return "marketHall.jpg";
            }

            if (wizard === "yellow") {
                return "churchYard.jpg";
            }

            if (wizard === "blue") {
                return "trainingHall.jpg";
            }

            if (wizard === "red") {
                return "forge.jpg";
            }        

        case "marketHallName":
            if (wizard === "green") {
                return `market hall`;
            }
            if (wizard === "yellow") {
                return `church yard`;
            }
            if (wizard === "blue") {
                return `training hall`;
            }
            if (wizard === "red") {
                return `forge`;
            }      
            
        case "marketHallGetInvolved":
            if (wizard === "green") {
                return `If you wish to help the struggling man.`;
            }
            if (wizard === "yellow") {
                return `If you wish to help the devil woman hauling the unconcious man.`;
            }
            if (wizard === "blue") {
                return `If you wish to help the soldiers.`;
            }
            if (wizard === "red") {
                return `If you wish to help the lady with the brazier.`;
            }   

        case "marketHallTakeDare":
            if (wizard === "green") {
                return `If you wish place your head in the Screaming Death.`;
            }
            if (wizard === "yellow") {
                return `If you wish to drink from the bubbling blood fountain.`;
            }
            if (wizard === "blue") {
                return `If you wish to try on the helm of Screaming Death.`;
            }
            if (wizard === "red") {
                return `If you wish to plunge your face into burning coals.`;
            }  

        case "marketHallAvoidDare":
            if (wizard === "green") {
                return `If you would rather leave the statue well alone and leave the hall.`;
            }
            if (wizard === "yellow") {
                return `If you would rather not drink blood and leave the church yard.`;
            }
            if (wizard === "blue") {
                return `If you would rather set the helm back in place and leave the hall.`;
            }
            if (wizard === "red") {
                return `If you would rather not set fire to your face and leave the hall.`;
            }  
            
        case "marketHallDoIt":
            if (wizard === "green") {
                return `Do you still wish to place your head in the statue's mouth?`;
            }
            if (wizard === "yellow") {
                return `Do you still wish to drink the Sister’s Bubbling Blood?`;
            }
            if (wizard === "blue") {
                return `Do you still wish to place the helm upon your head?`;
            }
            if (wizard === "red") {
                return `Do you still wish to plunge your face into the burning coals of the Widow's Furnace?`;
            }

        case "marketHallDontDoIt":
            if (wizard === "green") {
                return `Would you rather give the whole head in the statue thing a miss?`;
            }
            if (wizard === "yellow") {
                return `Would you rather give the whole drinking of the Sister’s Bubbling Blood a miss?`;
            }
            if (wizard === "blue") {
                return `Would you rather put the helm back in place on the armour?`;
            }
            if (wizard === "red") {
                return `Would you rather give the whole plunging your face into burning coals a miss?`;
            }            

        case "marketHallSurvived":
            if (wizard === "green") {
                return `You give the delivery man a dazed smile and head back out to the street.`;
            }
            if (wizard === "yellow") {
                return `You laugh weakly, unsure if she was teasing or not, and head back out to the street.`;
            }
            if (wizard === "blue") {
                return `You give the soldiers a nod and head back out to the street.`;
            }
            if (wizard === "red") {
                return `You give the forge worker a sooty grin and head out into the street.`;
            }

        case "marketHallHelp":
            if (wizard === "green") {
                return `Help the man still struggling with the statue.`;
            }
            if (wizard === "yellow") {
                return `Help the devil woman still struggling with the unconcious man.`;
            }
            if (wizard === "blue") {
                return `Help the soldiers still struggling with the armour.`;
            }
            if (wizard === "red") {
                return `Help the woman still struggling with the brazier.`;
            }  

        case "marketHallRoadside":
            if (wizard === "green") {
                return `Heading south down Market Street, leaving the inn behind you, you soon come to a vast timber-framed market hall draped with faded festival banners. Roughly painted above the entrance on a makeshift board are the words: ‘Market Day Today’. You can hear the low murmur of a busy fair from inside the building.`;
            }
            if (wizard === "yellow") {
                return `Heading south down Market Street, leaving the inn behind you, you soon come upon the grounds of a small stone church surrounded by crumbling cloisters and twisted fig trees. Faded crimson banners hang limply from the archways and somewhere beyond the walls you can hear low chanting and perhaps the sound of splashing water.`;
            }
            if (wizard === "blue") {
                return `Heading south down Market Street, leaving the inn behind you, you soon come to a large timber building flying the star flag and colours of the town militia. Painted above the entrance are the words: ‘Soldier Training Hall’. From inside comes the clatter of weapons, shouted orders and bursts of rough laughter.`;
            }
            if (wizard === "red") {
                return `You soon notice a heat haze drifting above the rooftops, and before long you find its source; a soot-blackened foundry built around a towering stone furnace. Thick iron pipes run along the outer walls while smoke and glowing embers billow endlessly from high chimneys overhead. The air here is stifling, carrying the smells of burning coal and molten metal.`;
            }      
            
        case "marketHallEntrance":
            if (wizard === "green") {
                return `The market hall is crowded as merchants, labourers and travellers barter beneath the smoke-darkened rafters. Stalls packed with breads, salted meats and trinkets line the walls while hawkers shout over one another to draw customers in. Near the centre of the hall, a gaunt man is struggling to lift a grotesque carved head onto a wooden stand. The thing is enormous — its mouth stretched open in a frozen scream.

‘Someone give us a hand with this thing, will you?’ the man calls, 'it weights a ton.'`;
            }
            if (wizard === "yellow") {
                return `The church courtyard is quiet, you can just about make out what you presume to be a few scattered worshippers frequenting the shade beneath the old stone arches. A small unmanned, wooden stand displays bread, figs and cups of dark mead while black incense smoke cloys the warm air. Near the centre of the courtyard, beside a marble fountain filled with thick dark-red liquid, a horned red-skinned woman with small black wings is struggling to drag an unconscious man away from the fountain’s edge.

She looks up sharply as you approach.

'Oh...er...it’s not what it looks like. I’m a Sister of the Ember Choir. This poor chap collapsed from...' she looks around, '...sunstroke. Help me get him into the shade, would you?'`;
            }
            if (wizard === "blue") {
                return `The training hall is crowded with recruits and soldiers preparing for an upcoming recruitment fair. Weapon racks line the walls while merchants sell food and supplies to hungry trainees. Near the centre of the hall, two sweating soldiers are struggling to manoeuvre a wicked-looking suit of armour covered in dark iron spikes.

‘Someone give us a hand with this thing, will you?’ one of the soldiers shouts.`;
            }
            if (wizard === "red") {
                return `Inside, the forge roars like a living beast. Labourers stripped to the waist shovel coal into blazing furnaces while chains rattle overhead and crucibles of molten iron swing dangerously through the smoke-filled gloom. There is a lady at the foundry entrance selling snacks for the workers at 2gp a piece.

Near the centre of the foundry, an enormous iron brazier has toppled sideways, spilling burning black coals across the stone floor. A broad-shouldered woman with scarred arms is fighting to drag the thing upright before the fire spreads further.

‘Help me with this cursed thing!’ she snarls to the room at large.`;
            }
            
        case "marketHallAssist":
            if (wizard === "green") {
                return `You step forward to help the man with the carved head. It is astonishingly heavy and awkward to hold, its rough wood slick with some greasy residue that smells faintly of earth. At last, with a grunt and a heavy thud, you manage to set it upright upon its stand.

The man exhales shakily and wipes sweat from his brow.

‘The Screaming Death,’ he says quietly, nodding at the carving. ‘The artist says it offers the peace of eternal sleep. I don't know. I'm just delivering it.’

The carved mouth is unnaturally dark and, should you feel the urge to put it there, appears deep enough to swallow your entire head. As you stare into the darkness within, you feel an overwhelming compulsion to do just that.`;
            }
            if (wizard === "yellow") {
                return `You help the winged woman move the unconscious man. His body is limp and unpleasantly clammy to the touch. Together you drag him beneath the shade of the cloister arches where the woman gently lowers him onto the cool stone floor.

The horned woman exhales softly and brushes dust from her dark robes.

‘Thank you,’ she says with a faint smile. ‘You’ve a kinder heart than most.’

She gestures toward the marble fountain nearby.

‘That is the Fountain of the Sister’s Bubbling Blood. The sisters say its waters offer peace, vitality and restful sleep to weary souls. Drink from it if you please.’

The liquid within the basin is thick, dark red and smells unmistakably of blood, but as you stare into the fountain you feel an odd compulsion to drink from it.`;
            }
            if (wizard === "blue") {
                return `You step forward to help the struggling soldiers. The armour is extremely heavy and awkward, its spikes digging into your hands. Finally, with a grunt and a jolt, you get the armour upright and in place, but in doing so you shake the helm loose. It clatters to the floor and a chilling scream fills the hall. The soldiers leap back. 

‘The Armour of Screaming Death,’ cries the bigger of the soldier stepping back.

Not so wary of magic, you pick up the helm and as you do you feel an overwhelming compunction to put it on your head.`;
            }
            if (wizard === "red") {
                return `You rush forward and help the woman. The iron burns hot enough to sting even through the heavy gloves she threw you. Crimson sparks burst around your feet as the two of you fight to right the brazier. Finally, with one last heave, the enormous bowl crashes back onto its stand.

The woman exhales heavily, flexing soot-covered fingers.

‘Good,’ she mutters darkly. ‘Would’ve been difficult explaining another fire.’

Only now do you properly notice the brazier itself. Strange figures are hammered into the iron surface — twisted bodies writhing amidst stylised flames. The woman notices your stare.

‘The Widow Furnace,’ she says quietly. ‘Used for forging blood magic into weapons. Said to bring great peace to any who plunge there face into it. Not felt the need to try it myself.’

You stare into the foul smelling smoke at the crimson coals within and find that you now have an overwhelming urge to plunge your face into it.`;
            } 
            
        case "marketHallShop":
            if (wizard === "green") {
                return `Other than the man struggling with the carved head, the remaining stalls mostly sell food, drink and travelling supplies. This would be a good place to stock up on provisions should you wish to.`;
            }
            if (wizard === "yellow") {
                return `Other than the red bubbling fountain and the winged woman dragging the unconscious man, the only remaining thing of interest is the food covered table. On examination you find an honesty tin and a sign saying: "Help yourself. All items 2gp"`;
            }
            if (wizard === "blue") {
                return `Other than the soldiers struggling with the armour, all the other stalls are offering food and rations or the recruits. You can stock up on provisions at a cost of 2GP per pack.`;
            }
            if (wizard === "red") {
                return `You talk to the snack girl at the forge entrance. She seems quite concerned about the woman with the fallen brazier, but you insist that you need snacks.`;
            } 

        case "marketHallPrepDare":
            if (wizard === "green") {
                return `You slowly move your face closer to the open mouth of the carving. The delivery man watches you with widening eyes. Up close, the wood is stained dark with what appears to be blood around the lips, and the smell of decay is almost overpowering. There is a sound too... distant but undeniably horrified screaming.`;
            }
            if (wizard === "yellow") {
                return `You kneel beside the fountain and lean closer to the dark liquid. Up close, the metallic scent of blood rising from the fountain is impossible to ignore.

You glance toward the unconscious man and notice his lips are stained crimson and then to over to winged woman who is watching you carefully from beneath the cloister’s shade.`;
            }
            if (wizard === "blue") {
                return `As you begin lowering the screaming helm towards your head, the soldiers exchange deeply worried looks. Now that you are holding it close, the dreadful howl coming from the helm is almost ear ringingly painful.`;
            }
            if (wizard === "red") {
                return `You lean into the brazier. The heat is unbearable this close. Deep within the glowing coals you see shapes shifting and writhing beneath the embers. The smoke itself feels unnaturally heavy, clinging to your throat and lungs like oil.

Somewhere deep inside the brazier... is that the sound of crackling screams?

The woman watches you carefully but says nothing.`;
            }

        case "marketHallDareResult":
            if (wizard === "green") {
                return `You place your head inside the mouth of the carving — you are engulfed in oppressive darkness and unnerving silence.

A cold sharp pressure tightens around your neck. Darkness swallows you whole as the silence tears with a distant ringing scream. You try to pull out but your head is trapped... then, a deep and overwhelming peace washes over you.

GAIN 4 STAMINA points.

You pull your head free from the carving feeling dizzy, yet strangely refreshed. The man stares at you in stunned silence.`;
            }
            if (wizard === "yellow") {
                return `You cup the dark liquid into your hands and drink.

It is unpleasantly warm and tastes unmistakably of blood. You recoil in disgust and almost chock it up again — but then your body relaxes, a warmth washes over you and all your aches and pains seem to melt away.

GAIN 4 STAMINA points.

When you rise from the fountain the horned woman smiles and winks at you. 'You're one of us now,' she says.`;
            }
            if (wizard === "blue") {
                return `You slide the helm over your head — and instantly the screaming ceases.

A surge of unnatural strength rushes through your body. Your senses sharpen, your muscles tighten and for a moment you feel almost invincible. The power of the Armour of Screaming Death courses through you. 

GAIN 4 STAMINA points.

You remove the helm and breathe deeply, feeling remarkably revitalized. You replace the helm on the armour. 

The soldiers look at you in awe.`;
            }
            if (wizard === "red") {
                return `You plunge you face into the coals. It is agony as the flame rip at your face. You would scream, but your face is on fire and smoke has flooded your lungs like molten metal. You are burning alive then darkens. Silence. But you are not dead, and your body feels... You lift your face from the coals and touch your skin. You are unharmed, in fact you feel stronger, revitalised, better than you did before plunging your face into burning coals.

GAIN 4 STAMINA points.

                'Well who'd a thought,' says the lady.`;
            }

        case "marketHallDarePullOut":
            if (wizard === "green") {
                return `You hesitate. Perhaps something called The Screaming Death is best left untouched. Stepping back from the grotesque carving, you decide to keep your head well away from its mouth.`;
            }
            if (wizard === "yellow") {
                return `You hesitate. Whatever the Sister’s Bubbling Blood truly is, you decide you want no part in it. Stepping back from the fountain, you shake your head to clear the metallic scent from your nose and keep a cautious distance from the red liquid.`;
            }
            if (wizard === "blue") {
                return `You think about it. Perhaps something called the Armour of Screaming Death is best left untouched. Stepping back, you place the helm back on the armour and decide not to tempt fate further.`;
            }
            if (wizard === "red") {
                return `You stop yourself before plunging your face into the burning coals. BURNING COALS! What were you thinking? You Step back from the Widow's Furnace, leaving the forge with your face intact.`;
            } 

        default:
            return null;
    }
}