// variableMapChoicesBathhouse.js

export function resolveBathhouseVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "bathhouseName":
            if (wizard === "green") {
                return `Cedar Hope Bathhouse`;
            }
            if (wizard === "yellow") {
                return `Distant Mists House of Healing`;
            }
            if (wizard === "blue") {
                return `Buns & Beans Wholefood Cafe`;
            }
            if (wizard === "red") {
                return `Power & Shout Workout`;
            }

        case "tryTheMixture":
            if (wizard === "green") {
                return `Would you like to try the foul smelling mixture?`;
            }
            if (wizard === "yellow") {
                return `Would you like to try some of the noxious smelling mixture?`;
            }
            if (wizard === "blue") {
                return `Would you like to try some of the stinging mushrooms?`;
            }
            if (wizard === "red") {
                return `Will you gulp down the Man Juice and throw the bottle in the dirt`;
            }

        case "receptionist":
            if (wizard === "green") {
                return `the grey lady receptionist`;
            }
            if (wizard === "yellow") {
                return `the blue robed fawn`;
            }
            if (wizard === "blue") {
                return `the small bug eyed man`;
            }
            if (wizard === "red") {
                return `Max`;
            }

        case "enemyReadyBathhouse":
            if (wizard === "green") {
                return `The grey lady sighs, puts down her magazine and plucks a cudgel from behind the counter. Looking no less bored, she rounds the desk to prepare to face you.`;
            }
            if (wizard === "yellow") {
                return `The fawn looks saddened, but nods politely and pulls a scimitar from behind the counter. She bows her head once more then rounds the desk to prepare to face you.`;
            }
            if (wizard === "blue") {
                return `‘Of course, sir,’ says the little man. ‘This way if you don’t mind, we try not to kill each other in the eating areas.’ 

                        He leads you into a clearing on the other side of the café where there are some storage boxes.

                        ‘Ready, sir?’`;
            }
            if (wizard === "red") {
                return `Max looks thrilled. He cracks his knuckles and readies to fight as the patrons form a ring around the two oof you chanting 'FIGHT! FIGHT! FIGHT! FIGHT!`;
            }

        case "service1Name":
            if (wizard === "green") {
                return `Total Sensory Renewal`;
            }
            if (wizard === "yellow") {
                return `Thousand Veils Immersion`;
            }
            if (wizard === "blue") {
                return `Wild Badger on a bed of Wild Flowers`;
            }
            if (wizard === "red") {
                return `Super Hold`;
            }

        case "service2Name":
            if (wizard === "green") {
                return `Breathless Clarity Ritual`;
            }
            if (wizard === "yellow") {
                return `Silent Passing Repose`;
            }
            if (wizard === "blue") {
                return `Unicorn Cakes`;
            }
            if (wizard === "red") {
                return `Rage Cage`;
            }

        case "bathhouseSkin":
            if (wizard === "green") {
                return `With the cottage behind you, you continue south down Brookmeadow Lane. Before long you arrive outside a low stone building with a moss-covered roof and narrow stained-glass windows which glow softly from within. A cedarwood plaque hangs beside the crooked doorway, carved with the words The Cedar Hope Bathhouse. Warm steam drifts out beneath the door carrying faint scents of herbs.`;
            }
            if (wizard === "yellow") {
                return `With the cottage fading behind you, you continue south along Brookmeadow Lane until the road bends beside a cluster of pale willow trees. Nestled amongst their trailing branches stands an elegant timber-framed hall with a curved ivory roof and narrow windows of frosted blue glass. Bronze vents along the walls puff out perfumed steam. Soft music drifts from within, accompanied by the murmur of low voices and the gentle splash of water. Hanging above the doorway is a silver engraved sign:

                        The Distant Mists House of Healing`;
            }
            if (wizard === "blue") {
                return `With the cottage behind you, you continue south along Brookmeadow Lane. Before long the scent of roasting nuts, fresh bread and strong coffee drifts lazily upon the breeze. Ahead, beneath a cluster of sprawling oak trees, you spot a curious open-air café built almost entirely into the surrounding woodland. A painted wooden sign swings gently above a flower-lined path:

                        Buns & Beans Wholefood Café`;
            }
            if (wizard === "red") {
                return `With the cottage behind you, you continue south along Brookmeadow Lane. Before long you begin to hear a shouts and roars echoing from behind the trees. Rounding the bend in the road, you discover a large open training yard surrounded by rough timber fencing. Massive stones, wagon wheels and iron chains lie scattered about the muddy ground while thick wooden beams support dangling ropes and punching sacks stuffed with straw. A large sign swings over the entrance:

                        THE POWER SHOUT WORKOUT`;
            }

        case "bathhouseEntrance":
            if (wizard === "green") {
                return `Inside the bathhouse the air is thick with steam and chatter in a dozen unfamiliar tongues. Pools of pale green water bubble softly beneath hanging lanterns filled with fireflies. Patrons of all shapes and sizes lounge upon heated stones or soak in baths sunk into the floor: scaled creatures with pearl-white eyes, hunched Goblins wrapped in towels, elegant horned women with silver skin, and squat hairy beasts grooming one another with hooked combs. The walls are covered in polished cedar panels slick with moisture, while unseen pipes rattle and hiss somewhere overhead.
                        Behind a long counter sits a grey-skinned woman with heavy eyelids and long barbed ears. She takes a drag of a foul smelling roll up she is smoking. She puffs out a cloud of the acrid smoke and in a bored voice rasps, ‘We got two services… or the gift shop’s that way.’ She points lazily with a long claw down the corridor.
                        She pulls a tatty parchment out from behind the counter and drops it in front of you:

                        Total Sensory Renewal 3gp
                        Breathless Clarity Ritual 1gp

                        The creature yawns, licks her eyeballs and says, ‘What will it be then?’
                        `;
            }
            if (wizard === "yellow") {
                return `The interior is warm, dimly lit and strangely peaceful. Thin curtains of mist drift lazily through the air while crystal lanterns glow softly overhead. Circular pools filled with luminous water line the walls, separated by hanging silk screens embroidered with silver thread. Non-human patrons relax throughout the hall: towering insectoid nobles having their shells polished by masked attendants, feathered serpent-creatures coiled in heated sand pits, and tiny winged beings submerged in bowls of fragrant oils no larger than cauldrons.
                        At the centre of the chamber stands a polished marble counter behind which waits a graceful fawn-like woman dressed in pale blue robes. Her antlers are decorated with tiny silver chains and charms which chime softly whenever she moves. She bows deeply as you approach, smiling with exaggerated warmth.

                        ‘Welcome, honoured traveller, to the Distant Mists House of Healing,’ she says sweetly. ‘We offer only the finest restorative experiences to weary souls.’ She gestures with elegant grace towards two painted boards hanging behind her:

                        The Thousand Veils Immersion 3gp
                        The Silent Passing Repose 1gp

                        ‘Or if you prefer,’ she says, ‘you might enjoy our gift shop.’ She indicates another counter with another fawn on the far side of the room just visible through the shimmering steam.

                        The fawn lowers her head politely and waits for your selection.
                        `;
            }
            if (wizard === "blue") {
                return `The place appears peaceful enough. Smoke curls from clay ovens built into grassy mounds while strings of coloured lanterns hang between branches overhead. Soft music drifts through the trees accompanied by laughter and the gentle clinking of cups. 
                        There are very few proper chairs. Some customers sit upon polished tree stumps gathered around wide stone slabs used as tables. Others lounge in hanging rope swings suspended from branches overhead. A family of squat hairy creatures eat noisily from a long wooden trough while high above them tiny winged patrons crawl in and out of what appears to be an enormous hollowed-out beehive fitted with tiny tables inside.
                        Suddenly a tiny creature with floppy ears and enormous eyes hurries towards you wearing a spotless white apron. Its thin hands wring together as it bows so low its forehead almost touches the ground.

                        ‘Sir! Sir! How may I help you today?’ 

                        When it straightens, it is somehow already holding a menu.

                        ‘But no,’ it gasps. ‘You are better than that.’

                        The menu is tossed aside and, with a dramatic flourish, the creature produces a specials board seemingly from thin air.

                        ‘Perhaps sir would prefer… the specials?’

                        It turns the board proudly towards you:

                        Fresh Wild Badger on a Bed of Meadow Flowers — 3 Gold Pieces
                        Unicorn Cakes — 3 Gold Pieces

                        The little waiter beams eagerly.

                        ‘Or if sir prefers, we also offer food for the road in our gift shop.’`;
            }
            if (wizard === "red") {
                return `You look around what you decide must be some sort of gym for huge creatures. A Minotaur strains beneath an enormous boulder while two Ogres repeatedly strike one another across the face to loud applause. Nearby, a heavily muscled Goblin hangs upside down from iron hooks whilst furiously lifting bricks tied to his ankles. Everywhere there is grunting, screaming and the sound of testosterone fuelled exertion.

                        At the centre of the yard stands an enormous bald man whose belly hangs heavily over his iron-studded belt. Sergeant stripes are tattooed across one massive upper arm. Veins bulge from his neck as he leans over what appears to be a large rock.

                        ‘DO IT! DO IT! DO IT!’ he bellows.

                        As you get closer you notice a trembling arm and two kicking legs protruding from beneath the stone. The huge man plants one boot atop the quivering rock. A tiny squeak escapes from underneath.

                        He looks up as you approach. ‘WELCOME ADVENTURER!’ he roars. ‘HERE TO EXERCISE, ARE YOU? ARE YOU?’ He slams a fist against his chest. ‘I’M MAX! YOU LOOK PERFECT FOR OUR SPECIALS!’

                        He points towards a chalkboard hanging from a nearby post:

                        The Super Hold — 3 Gold Pieces
                        The Rage Cage — 1 Gold Piece

                        'OR, WE HAVE A GIFT SHOP.'`;
            }

        case "service2":
            if (wizard === "green") {
                return `You are led down a narrow corridor draped with damp curtains into a tiny circular room lit by floating blue candles. The door closes behind you with a heavy thud. At first there is silence.

                Then the room explodes. Blinding colours burst across the walls. Screaming howls tear at your ears. Your skin burns with heat then freezing cold while your taste buds fall under assault — honey, blood, saltwater, smoke, bitter herbs and so much more all hit you at once. Invisible hands slap your face while uncalled emotions crash over you in violent waves: joy, terror, grief, ecstasy and fury. You pass out.

                When you come too you stumble back into the reception chamber shaking violently, your head spinning and your stomach churning.
                        `;
            }
            if (wizard === "yellow") {
                return `You are led through a silver curtain into a narrow octagonal chamber filled with softly chiming crystals suspended from the ceiling by fine chains. Cushions lie arranged in a perfect circle around a shallow basin of black water. The air smells faintly of flowers and old parchment.
                The moment the door closes, the crystals begin to sing. At first, it is beautiful. The crystals sing, the pool ripples, but then another layer of chiming crystals is added over the top of the first. Now the sound is both uncomfortable and a little disturbing. This continues, layer after layer, the sounds, louder, harsher, less comprehendible until with your head fit to burst and your ears bleeding you finally pass out.
                `;
            }
            if (wizard === "blue") {
                return `You seat yourself upon a broad tree stump beside a flat slab of stone serving as a table. Presently the floppy-eared waiter returns carrying a large silver platter.

                ‘Fresh Wild Badger on a bed of meadow flowers, sir,’ it says bowing.

                With a flourish, it lifts the lid and a furious badger launches itself directly at your face.

                The badger is mad. Its claws rake across your arms and chest. Chairs overturn and drinks spill while you desperately wrestle with the snarling animal. Around you, nobody appears remotely alarmed. Patrons simply continue their meals while a manic badger tries to rip you to shreds. After a frantic struggle, you finally manage to hurl the badger back into the woods.

                You are left panting and bleeding.`;
            }
            if (wizard === "red") {
                return `‘THE SUPER HOLD!’ Max bellows excitedly. ‘GREAT CHOICE! STAN!’

                A massive Troll with crooked tusks lumbers towards.

                ‘STRING HIM UP,’ says Max cheerfully.

                Before you can protest, Stan seizes you effortlessly and flips you upside down. Thick ropes are wrapped tightly around your ankles while you struggle and shout in confusion, but the Troll appears completely deaf to your complaints.
                A moment later the rope is thrown over a high wooden beam and you are hauled violently upwards until you are dangling high above the yard. The blood rushes painfully to your head. Stan then produces another rope, loops it tightly around your neck and offers you the loose end.

                ‘Bite,’ he grunts.

                You hesitate only briefly before he roughly jams the rope into your mouth. Below you, the gym patrons gather excitedly. Then the Goblin begins climbing the rope towards you.
                You scream. The rope tightens savagely around your throat and seconds later you pass out.`;
            }

        case "service1":
            if (wizard === "green") {
                return `A hulking brute of a species you don’t know escorts you silently into a dark tiled chamber. In the centre stands a stone bench slick with moisture. 

                “Lie down,” they grunt.

                The moment you do so, their enormous hands clamp over your mouth and nose. Panic surges through you as the creature presses down with unfightable strength. Your lungs burn. Your vision darkens. Then everything disappears into blackness.

                You awaken sometime later, lying alone on the bench with an aching head and damp clothes. Your coin pouch feels noticeably lighter. Upon checking it, you discover that 2 Gold Pieces are missing.

                The creature that assaulted you and presumably stole your money is nowhere to be seen.`;
            }
            if (wizard === "yellow") {
                return `A silent attendant wearing layered funeral robes escorts you down a steep staircase into a cold underground chamber lit by rows of pale candles. At the centre stands a heavy wooden chair fitted with leather straps darkened by age. The attendant politely asks you to sit.

                As you do so, she straps you tightly to the chair. ‘Precautionary only,’ she says. She then steps back an bows her head as a hooded figure steps from the darkness carrying a bronze funnel attached to a long leather tube. The hooded figure forces the tube into your mouth and down your throat while the attendant chants softly.

                A thick liquid is poured into the funnel. Your lungs begin to burn. The air feels heavy and thin. Panic surges through you as your vision blurs and your heartbeat pounds inside your skull. You pass out.

                When you awaken, the chamber is empty and the candles have almost burned down to nothing. Your throat aches terribly and you discover that 2 Gold Pieces are missing from your pouch.
                `;
            }
            if (wizard === "blue") {
                return `You settle yourself beside a broad oak tree. Nearby, a gleaming white unicorn feeds peacefully from a basket of fruit while a pool filled with laughing nymphs bubbles softly a few yards away. The waiter soon appears carrying a silver plate upon which rest two small cakes dusted with powdered sugar.

                ‘Unicorn Cakes for sir,’ he says brightly. ‘The chef specifically asked me to remain and see what sir thinks of them.’

                ‘OK,’ you say. You pick up one of the cakes. It feels warm and soft. You take a bite.

                It is disgusting — dry, grainy, claggy – foul beyond belief. It clings to your mouth like dust and carries a powerful smell no unlike warm dung. Fighting every instinct to vomit, you desperately gulp some water just to force the mouthful down.

                The waiter looks expectant. 

                ‘Good,’ you nod weakly.

                The waiter seems delighted, ‘He like it,’ he says to the unicorn, the scurries off.

                The unicorn turns to you. ‘You know, I just pooped that, right?’`;
            }
            if (wizard === "red") {
                return `THE RAGE CAGE!’ Max shouts delightedly. ‘LOVE THAT ONE! STAN!’
                        A troll lumbers over carrying an enormous, padded suit which he forces onto you with alarming speed. Before you fully understand what is happening, you are shoved into a gigantic iron-barred sphere roughly the size of a wagon… with a large black bear wearing a spiked collar already in residence.
                        ‘RAGE CAGE!’ roars the entire yard.

                        The sphere suddenly lurches forward as the patrons begin rolling it violently across the mud whilst hammering the bars with lengths of iron pipe. The deafening noise sends the enraged bear into a frenzy.
                        You are thrown from side to side as claws, teeth and bear blur together in dizzying chaos…

                        When you finally regain consciousness, you are lying outside the cage staring up at the cloudy sky while Max grins proudly down at you.

                        ‘RAGE CAGE!’ he bellows triumphantly.

                        Checking your pouch, you discover that 2 Gold Pieces have somehow vanished during the ordeal.`;
            }

        case "complain":
            if (wizard === "green") {
                return `You drag yourself to the reception deck. WHAT WAS THAT! You angrily complain about the Total Sensory Renewal. The grey-skinned receptionist puts her magazine down and fixes you with a bored looking expression. She puffs out a plume of foul-smelling smoke in your face.

                ‘Your species are such whiners,’ she says at last. “Not my fault your fragile little mind cannot handle proper stimulation… No refunds.’ 
                
                She turns back to her magazine.
`;
            }
            if (wizard === "yellow") {
                return `You drag yourself to the reception deck. WHAT WAS THAT you splutter before complaining bitterly about the Thousand Veils Immersion. The fawn tilts her head sympathetically.

                ‘Oh dear,’ she says softly. ‘Poor you. I’m afraid it does sometimes happen that the lesser mortal mind can react poorly to expanded perception.’

                She gives a small apologetic bow. ‘It is clearly stated in the treatment details.’ She indicates the treatment board, where in small writing it reads: ‘Not suitable for the weak minded. NO REFUNDS’`;
            }
            if (wizard === "blue") {
                return `Still bleeding heavily from numerous badger bites, you stagger furiously towards the waiter.

                ‘What in the name of all that’s holy are you doing setting a wild badger on me?’ you shout.

                The little creature blinks in confusion.

                ‘But sir,’ it says, ‘it is precisely what sir ordered.’`;
            }
            if (wizard === "red") {
                return `You painfully drag yourself upright, your neck aching horribly.

                ‘What in the name of all the gods was that?’ you shout furiously. ‘You hanged me upside down while a Goblin climbed a rope around my neck!’

                Max blinks in genuine confusion. ‘YOU DIDN’T ENJOY? DONE IT LOADS OF TIMES MYSELF,’ he says with a shrug. ‘NO REFUNDS.’ 
`;
            }

        case "complain2":
            if (wizard === "green") {
                return `You stagger back to the reception deck, your head still spinning. You slump against the desk, anger the only thing keeping you upright and protest furiously about the Breathless Clarity Ritual and your missing gold. 

                The receptionist glances up at you from here magazine with a look of complete disinterest.

                ‘You were breathless, weren’t you?’ she says flatly. She then rings a small bell. ‘Make way for the next customer.’`;
            }
            if (wizard === "yellow") {
                return `You stagger back to the reception deck, your head still spinning. You slump against the desk, anger the only thing keeping you upright and protest furiously about the Silent Passing Repose. The fawn tilts her head sympathetically.

                ‘Oh dear,’ she says softly. ‘Poor you. I’m afraid it does sometimes happen that lesser mortals can react poorly to certain treatments.’

                She gives a small apologetic bow. ‘It is clearly stated in the treatment details.’ She indicates the treatment board, where in small writing it reads: ‘Not suitable for the weak and puny. NO REFUNDS’`;
            }
            if (wizard === "blue") {
                return `Red-faced and gagging slightly, you march straight up to the waiter clutching the remains of the cake.

                ‘What are you doing serving horse manure to people?’ you splutter angrily.

                The waiter looks mildly offended.

                ‘Unicorn cakes,’ it corrects politely. ‘Super fresh. Rare. Quite the delicacy.’`;
            }
            if (wizard === "red") {
                return `Your entire body aches as you stagger to your feet, still dizzy from the spinning cage.

                ‘That was insanity!’ you yell. ‘You threw me into a rolling iron ball with an angry bear!’

                Max beams proudly. ‘GREAT, AIN’T IT?’ he booms happily. ‘RAGE CAGE!’

                Several nearby patrons scream ‘RAGE CAGE’ back.`;
            }

        case "jarsBathhouse":
            if (wizard === "green") {
                return `Nobody seems too bothered about the fact that you have just slain the receptionist, so you decide to chance your luck and take a look behind the reception counter. The few magazines and stationery are of no interest to you but there are several dusty jars of cream stuffed to the back of the shelf. Their labels are faded but you can still read them:
                
                Pearl of the Dawn – Healing Face Mask.
                
                You cautiously remove the lid. The contents look and smell like wet dung.`;
            }
            if (wizard === "yellow") {
                return `Nobody seems too bothered about the fact that you have just slain the receptionist, so you decide to chance your luck and take a look behind the reception counter. The few pamphlets and stationery are of no interest to you but there are several jars of cream neatly stacked to the back of the shelf. Their labels proclaim them to be:
                
                Dew of the Silver Lotus – Healing Paste. To Be Ingested.
                
                You cautiously remove the lid. The paste inside smells powerfully of vomit. You are reminded that this is not a place used to human clientele.`;
            }
            if (wizard === "blue") {
                return `You look through the storage boxes, it's mostly useless to you, but you do find a bag of acidic smelling mushrooms marked Healing Soother Spores. They sting to touch, but the packet says they are a great healers when eaten.`;
            }
            if (wizard === "red") {
                return `The yard suddenly falls silent.
                Sweating creatures lower their weights and stare at the scene before them in uneasy disbelief. The Minotaur slowly drops the iron chain he was lifting while the Goblin hangs motionless on his rig.

                There is no sound. The patrons seem uncertain whether they should attack you or keep their distance.

                As a show of strength, you stride into the middle of the yard, grab a bottle of something called Man Juice from a stunned looking ogre.
`;
            }

        case "applyJarBathhouse":
            if (wizard === "green") {
                return `You gag as you apply the potent smelling dung mask to your face. Its effects are immediate and surprisingly good. Your face tingles as a warm healing glow passes through you.

                        YOU GAIN 1d6 STAMINA and 1 LUCK`;
            }
            if (wizard === "yellow") {
                return `You gag as you swallow the potent smelling paste. It doesn’t just smell like vomit and its effects are immediate… and surprisingly good. Your insides tingle as a warm healing glow passes through you.

                        YOU GAIN 1d6 STAMINA and 1 LUCK`;
            }
            if (wizard === "blue") {
                return `They sting your fingers, lips and tongue, burning your throat as you try to swallow them. This was a mistake. Your insides tingle and then something warm burns inside of you. Seconds later, you are amazed as the burning passes, and you feel the healing properties taking effect. 

                        YOU GAIN 1d6 STAMINA and 1 LUCK
`;
            }
            if (wizard === "red") {
                return `You try not to gag as you swallow the potent smelling liquid. It smells and tastes like bile and its effects are immediate… and surprisingly good. Your insides tingle as a warm healing glow passes through you.

                        YOU GAIN 1d6 STAMINA and 1 LUCK`;
            }

        case "giftShop":
            if (wizard === "green") {
                return `The gift shop turns out to be a dingy room at the back of the building. Another grey skinned lady, equally disinterested in you, sits behind a table with a few dusty looking jars scattered across it. All the pots are labelled the same: Pearl of the Dawn – Healing Face Mask.

                “Four gold pieces,” grunts the lady without looking up.`;
            }
            if (wizard === "yellow") {
                return `The lady behind the marble giftshop counter is equally as courteous as the receptionist.

                ‘Honoured guest, may I present to you - Dawn of the Silver Lotus,’ she says in a light silvery voice. ‘An edible healing paste of great effectiveness. 4gp.’`;
            }
            if (wizard === "blue") {
                return `The small man hands you over to an equally small female set up in front of a table covered in a gingham cloth.

                        ‘Healing Soother Spores?’ she says. ‘4 gold pieces a bag.’

                        You notice they seem to be leaving scorch marks on the cloth and the lady it wearing think hide gloves to handle them. `;
            }
            if (wizard === "red") {
                return `You ask where the giftshop is. Max pulls a luminous green energy drink from his belt and thrusts it at you.

                ‘MAN JUICE,’ he screams. ‘4 GOLD PIECES!’`;
            }

        case "bathhouseImage":

            if (wizard === "green") {
                return "bathhouse.jpg";
            }

            if (wizard === "yellow") {
                return "healingHouse.jpg";
            }

            if (wizard === "blue") {
                return "cafe.jpg";
            }

            if (wizard === "red") {
                return "gym.jpg";
            }

        default:
            return null;
    }
}