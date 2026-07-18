// variableMapChoicesBathhouse.js

export function resolveCreaturesVariable(path, playerStats) {

    const wizard =
        (playerStats.visitingBrother || "").toLowerCase();

    switch (path) {

        case "creaturePart":
            if (wizard === "green") { return `horn`;}
            if (wizard === "yellow") { return `feather`;}
            if (wizard === "blue") { return `claw`;}

        case "creatureHarvestedPart":
            if (wizard === "green") { return `The great ivory horn of a fallen beast`;}
            if (wizard === "yellow") { return `A single gleaming feather of a fallen beast`;}
            if (wizard === "blue") { return `A single crystal claw of a fallen beast`;}

        case "realmItem":
            if (wizard === "green") { return `tanglewood rod`;}
            if (wizard === "yellow") { return `sky shard`;}
            if (wizard === "blue") { return `crystal shard`;}

        case "creatureRealmPath":
            if (wizard === "green") { return `Let the creatures feel your magic as you approach?`;}
            if (wizard === "yellow") { return `Approach the creatures slowly and calmly?`;}
            if (wizard === "blue") { return `Take a chance that the creatures won't bolt and stride up to them?`;}

        case "creatureTension1Path":
            if (wizard === "yellow") { return `Let the creatures feel your magic as you approach?`;}
            if (wizard === "blue") { return `Approach the creatures slowly and calmly?`;}
            if (wizard === "green") { return `Take a chance that the creatures won't bolt and stride up to them?`;}

        case "creatureTension2Path":
            if (wizard === "blue") { return `Let the creatures feel your magic as you approach?`;}
            if (wizard === "green") { return `Approach the creatures slowly and calmly?`;}
            if (wizard === "yellow") { return `Take a chance that the creatures won't bolt and stride up to them?`;}

        case "creatureImage":

            if (wizard === "green") {return "creatureGreen.jpg";}
            if (wizard === "yellow") {return "creatureYellow.jpg";}
            if (wizard === "blue") {return "creatureBlue.jpg";}

        case "creatureIntro":
            if (wizard === "green") {
                return `The dragons vanish behind the trees as you travel farther into Carolinus’s woodland realm. Ferns carpet the forest floor and ancient branches arch high overhead like the roof of some vast green hall. Every so often the trees part just enough for you to glimpse distant hills rolling beneath the sunlight before the forest closes once more around you.

Ahead stand several strange creatures watching you silently. They are broad-bodied animals with bark-like hides and heavy antlers shaped like twisting roots. Flowers bloom along their shoulders and tiny insects of living light drift around them in slow spirals. Each movement they make is calm and deliberate.

You recall hearing tales of these deeply magical creatures. It is said that in combat they can draw power from deep within and when they do, they will strike with incredible strength. Their horns are believed to hold that ancient strength and will bestow that power upon the bearer.
`;
            }
            if (wizard === "yellow") {
                return `You leave the dragons behind and walk deeper into Lo Tae Zhao’s realm. Here the world is made of sky alone. Vast plains of white cloud roll in every direction like drifting hills, broken now and then by deep blue chasms where the heavens fall away endlessly beneath your feet. Thin rainbows hang in the air like bridges woven from light, and the wind smells cold and clean.

You soon come upon a herd of curious creatures grazing among the clouds. They resemble great white stags, though their bodies are covered in sleek down rather than fur. Long tails trail behind them like streamers in the wind, and delicate feathers spread from their shoulders in layered crescents of pale gold and silver, while sparks leap softly from their antlers.

These creatures are creatures of old sky-magic, and highly prized by hunters. Their enchanted feathers are said to carry the fury of storms within them. It is said that in combat they can draw power from these feathers and when they do, they will strike with incredible strength. Many believe that the keeper of those feathers, if won through combat, will grant the holder the strength of the beast in battle.
`;
            }
            if (wizard === "blue") {
                return `Far behind you the dragons vanish into the darkness as you travel deeper into Solarius’s realm. Water stretches endlessly in every direction, dark and mirror-smooth, reflecting the stars so perfectly that the sky and sea seem to merge into one infinite cosmos.

Something stirs beneath the surface of your little boat. Great creatures emerge slowly beside your path — long-bodied beings with silver-scaled backs and luminous eyes. Streams of starlight ripple beneath their skin, and each movement leaves glowing trails floating across the water. Heavy claws curve from their forelegs like polished obsidian.

You remember hearing sailors speak longingly of such creatures. They are ancient and steeped in magic, hunted for their enchanted claws, which are said to grant the creatures the ability to draw power from deep within during battle, allowing them to strike with incredible strength. A single claw won in combat is believed to bestow that power upon the bearer.
`;
            }

        case "creatureRealm":
            if (wizard === "green") {
                return `The creatures gather beneath the trees around you. One nudges softly at your sleeve while another paws at the earth before settling beside a moss-covered stone. Their glowing eyes never leave you for long.

They behave less like beasts and more like wary forest guardians. Though silent, they communicate constantly through gestures, glances and low rumbling calls. You begin to suspect they may understand far more than they first appear to.
`;
            }
            if (wizard === "yellow") {
                return `At first the creatures merely observe you from the drifting cloudbanks, but curiosity soon overcomes caution. Several bound closer, pacing around you in slow circles while their feather-crests rise and fall with excitement. One taps lightly against your shoulder before springing back playfully through the mist.

There is nothing animal-like in their gaze. Their eyes are thoughtful, alert and oddly knowing. Although they cannot speak, you sense emotion clearly in their movements and sounds. The longer you remain among them, the more certain you become that they are trying to communicate in their own mysterious fashion.
`;
            }
            if (wizard === "blue") {
                return `The creatures gather together in the water beside you. Some circle slowly while others rise half from the sea to stare openly at you beneath the starlight. Their low humming calls echo across the dark water like distant music.

They seem fascinated by your presence. Every movement feels purposeful, and there is clear understanding in their luminous eyes. You cannot speak their language, if indeed they have one, but you sense that communication with them may still be possible.
`;
            }

        case "creatureItem":
            if (wizard === "green") {
                return `At the sight of the staff, the creatures gather around it in a tight circle. They stamp their hooves softly against the earth until roots begin pushing up through the soil. The roots coil themselves around the staff briefly before sinking away once more into the forest floor.

The wood now carries a deeper warmth beneath your fingers, and you sense that powerful enchantments have settled within it.
`;
            }
            if (wizard === "yellow") {
                return `The moment the creatures notice the shard, excitement spreads among them. They gather tightly around it and begin stamping gently upon the clouds. Each impact sends ripples of silver light through the mist beneath your feet. The clouds rise in twisting streams around the shard until it vanishes inside a cocoon of glowing vapour.

A few moments later the vapour dissolves. The shard drops back into your hand, changed in ways you cannot fully understand, though its magic is clearly far greater than before.
`;
            }
            if (wizard === "blue") {
                return `At the sight of the shard, the creatures dive beneath the surface. Moments later they return carrying spheres of pale blue light trapped between their claws. They press these lights against the shard one after another until the crystal begins glowing with the same cosmic radiance.

Eventually the creatures drift back into the darkness. The shard remains altered, filled now with strange and powerful enchantments.
`;
            }

        case "creatureAntiquityTrue":
            if (wizard === "green") {
                return `The creatures react quietly at the mention of Antiquity. Several bow their antlered heads while another taps its horn against a stone. Soft blue flowers bloom around the impact while silver leaves drift lazily down from the trees above.

You cannot fully grasp their meaning, but the repeated colours linger clearly in your mind: silver and blue.

You thank them politely.
`;
            }
            if (wizard === "yellow") {
                return `At the mention of Antiquity, the creatures begin calling softly to one another. They leap between the clouds in graceful arcs, their glowing feathers leaving streaks of colour behind them. Soon the sky around you is marked with ribbons of silver and blue woven together high above your head.

Though their meaning escapes you, the colours repeat again and again until you can hardly mistake the answer.

Silver and blue.

You bow your head in thanks.
`;
            }
            if (wizard === "blue") {
                return `At the mention of Antiquity, the creatures call softly to one another. They dive beneath the water and reappear moments later, surrounding you in a wide circle. Silver light blooms across the sea while blue stars flicker beneath the surface below.

You cannot fully understand what they mean, but the colours repeat too often to ignore.

Silver and blue.

You thank them quietly.
`;
            }

        case "cretureAntiquityConfusedTrue":
            if (wizard === "green") {
                return `At once the creatures begin a noisy debate of snorts, hoof-stamps and sweeping antlers. One scratches deep furrows into the ground while another immediately covers them with moss and blue flowers. Some point their horns towards the distant hills glimpsed through the trees while others paw insistently at the roots below.

The meanings blur together in confusion: high, low, green, blue, somewhere between.

Though uncertain, you thank the creatures for their help.
`;
            }
            if (wizard === "yellow") {
                return `The creatures react with great excitement to your question. Several race upward across towering cloud-pillars while others flatten themselves low against the drifting mist. Colours swirl everywhere — green one moment, blue the next — until the very sky seems alive with argument.

The beasts continually interrupt one another with cries and gestures, each seeming convinced the others are wrong. From the confusion you gather only scattered meanings: high, low, green, blue, somewhere between.

Though bewildered, you offer your thanks before departing.
`;
            }
            if (wizard === "blue") {
                return `At once the creatures begin arguing in their strange clicking cries. One traces green spirals across the water with its claws while another tears through them with streaks of blue light. Some vanish beneath the sea while others remain floating high upon the waves.

The confusion leaves you with only fragments of meaning: low, high, blue, green, somewhere between.

You thank the creatures despite your uncertainty.
`;
            }

        case "creatureHunted":
            if (wizard === "green") {
                return `You charge at the creatures with weapon drawn. Instantly the peaceful forest changes around you. Birds fall silent among the branches and a cold wind rushes through the trees, scattering leaves across the darkening woodland floor.

The creatures leap back with startled snorts, lowering their great horns defensively. Their glowing eyes narrow as they paw at the earth and prepare to fight.
`;
            }
            if (wizard === "yellow") {
                return `You rush forward and attack the creatures. At once the bright cloud-plains darken overhead as great shadows pass across the sun. The gentle winds become sharp and cold, tearing ragged holes through the clouds beneath your feet.

The creatures spring back in alarm, feather-crests flaring wide. Their bright eyes harden and they lower themselves into guarded stances, thin sparks crackling across their silver feathers as they prepare to fight.
`;
            }
            if (wizard === "blue") {
                return `You rush at the creatures without warning. At once the calm black waters begin to churn violently beneath you, scattering the perfect reflections of the stars into broken fragments. The distant galaxies overhead dim behind slow-moving clouds of darkness.

The creatures recoil with sharp clicking cries before turning back towards you. Their glowing claws scrape across the water, leaving bright trails of light as they prepare for battle.
`;
            }

        case "creatureDeath":
            if (wizard === "green") {
                return `The final creature collapses among the ferns. Its body slowly crumbles into moss, leaves and pale roots that sink quietly back into the forest floor. Only one of its great ivory horns remains behind. You gather it carefully.

All around you the forest seems diminished. The trees creak heavily overhead and distant glimpses of the rolling countryside beyond now appear grey beneath the gathering clouds.
`;
            }
            if (wizard === "yellow") {
                return `The last creature falls heavily upon the clouds. Its body dissolves slowly into drifting white vapour, leaving behind only a single gleaming feather. You pick it up carefully and place it among your belongings.

All around you the sky groans with distant thunder. The clouds lose their soft white glow and churn restlessly beneath your feet while cold winds howl through the empty heavens.
`;
            }
            if (wizard === "blue") {
                return `The final creature sinks beneath the dark water, its body breaking apart into drifting sparks like dying stars. When the light fades, a single crystal claw remains floating upon the surface. You take it quickly.

The sea grows rougher around you. Waves roll heavily through the darkness while far above, entire constellations seem to flicker and dim.
`;
            }

        case "creaturesAggitated":
            if (wizard === "green") {
                return `You approach the creatures as gently as possible, but something about your movements unsettles them. They begin stamping nervously among the roots while low warning calls echo through the trees.`;
            }
            if (wizard === "yellow") {
                return `You stride boldly up to the creatures, but your movements only unsettle them. They retreat several paces across the cloudbanks, feather-crests twitching nervously as anxious cries pass between them.`;
            }
            if (wizard === "blue") {
                return `You attempt to approach the creatures peacefully, your magic open to them, but your efforts only disturb them. They begin circling faster through the glowing water, their low humming calls growing sharp and uneasy.`;
            }

        case "creaturesBolt":
            if (wizard === "green") {
                return `Without warning the creatures flee. They bound between the ancient trees with astonishing speed, vanishing quickly into the deep woodland. Ferns sway in their wake before the forest grows still once more.
`;
            }
            if (wizard === "yellow") {
                return `Without warning the creatures bolt. They bound away across the drifting clouds with astonishing speed, vanishing one after another into banks of white mist. Loose feathers whirl behind them, carried away upon the rising wind.
`;
            }
            if (wizard === "blue") {
                return `The creatures suddenly dive together beneath the water. Trails of silver light streak briefly through the depths before vanishing entirely into the darkness below.

The sea becomes still once more, though the stars reflected upon its surface now seem strangely distant.
`;
            }

        case "creatureAttack":
            if (wizard === "green") {
                return `You lower your weapon and speak gently, but the creatures remain agitated. One stamps sharply against the earth and the others immediately rally behind it, lowering their glowing horns as they charge through the forest towards you.

Branches groan overhead while loose leaves whirl wildly through the air.
`;
            }
            if (wizard === "yellow") {
                return `You speak softly and lower your weapon, but the creatures remain fearful. Their nervous cries grow louder until suddenly the entire herd rallies together. Feathers flare bright as lightning and the beasts charge across the clouds towards you.

High above, dark clouds gather in rolling spirals around the open sky.
`;
            }
            if (wizard === "blue") {
                return `Despite your efforts to calm them, fear spreads quickly among the creatures. Their humming cries rise louder and louder until several rear half from the water, glowing claws raised high.

The dark sea surges violently around you as the creatures launch themselves forward to attack.
`;
            }

        case "creatureLoss":
            if (wizard === "green") {
                return `As the battle ends, the slain creatures begin to break apart into drifting leaves, moss and curling roots. The remains sink slowly into the earth until no trace of them is left behind.

A deep sorrow settles upon you as the forest falls silent. Even the air feels thinner now, robbed of some old and gentle magic. Searching your belongings, you discover with dismay that one of your magical items has vanished.
`;
            }
            if (wizard === "yellow") {
                return `As the battle ends, the fallen creatures begin to dissolve into pale mist. Their feathered forms scatter upon the wind until nothing remains but drifting traces of silver light fading into the heavens.

A deep sadness settles over you as the last of them vanishes. The endless sky feels colder now, emptier somehow. Worse still, you sense immediately that something is missing. Searching your belongings, you discover that one of your magical items has vanished along with the creatures.
`;
            }
            if (wizard === "blue") {
                return `As the battle ends, the creatures slowly dissolve into streams of silver light that drift upward from the water like fading constellations. Soon even those final sparks vanish into the endless darkness above.

A terrible sense of loss settles upon you. The cosmic sea feels emptier now, stripped of some ancient beauty. Then you notice another loss: one of your magical items has disappeared from your pack without trace.
`;
            }

        case "creatureYouFlee":
            if (wizard === "green") {
                return `You flee through the forest, roots and branches tearing at your clothes as you retreat. The creatures do not pursue you, though their distant calls echo mournfully through the trees behind.

When at last you stop to rest, your limbs feel weak and heavy, as though the forest itself has quietly taken something from you.
`;
            }
            if (wizard === "yellow") {
                return `You turn and flee across the clouds. The creatures do not pursue you, though their mournful cries follow for some distance through the sky.

By the time you finally slow, the air around you feels thin and bitterly cold. Your limbs ache with unusual heaviness, as though the realm itself has stolen some small measure of your strength.
`;
            }
            if (wizard === "blue") {
                return `You retreat quickly across the dark waters. The creatures remain where they are, watching silently with glowing eyes before finally slipping beneath the surface once more.

Long after you escape them, your body feels strangely drained, as though the cold stars themselves have leeched strength from your bones.
`;
            }

        case "creatureDistrust":
            if (wizard === "green") {
                return `The creatures remain wary beneath the trees, watching you carefully through the ferns and roots. Low rumbling calls pass softly between them while their great horns remain lowered in caution rather than threat.
`;
            }
            if (wizard === "yellow") {
                return `The creatures remain several paces away, watching you closely from the drifting cloudbanks. Their feather-crests twitch uneasily and soft chiming calls pass quietly between them.
`;
            }
            if (wizard === "blue") {
                return `The creatures keep their distance, drifting silently through the dark water while watching you with cautious, luminous eyes. Their low humming calls are quieter now, uncertain.
`;
            }

        case "creatureAntiquityFalse":
            if (wizard === "green") {
                return `The creatures hesitate before answering. One brushes its horn against a tree trunk, causing silver sap to shimmer briefly across the bark. Another lowers its head to the moss below, where pale green light spreads slowly across the forest floor like growing ivy.

The creatures continue watching you uncertainly as the colours fade, but the message itself appears clear: silver and green.
`;
            }
            if (wizard === "yellow") {
                return `They hesitate before responding. Several leap lightly between the clouds, leaving long streaks of colour trailing behind them. Silver light appears first, curling across the sky like mist upon the wind. Then pale green joins it, weaving slowly through the silver ribbons high above your head.

The creatures watch you warily as the colours fade, but the meaning seems clear enough: silver and green.
`;
            }
            if (wizard === "blue") {
                return `The creatures respond carefully. Several glide across the water, their glowing claws tracing long silver lines over the dark sea. Moments later deep green light begins flowing beneath the surface, winding slowly through the silver patterns like hidden currents.

The creatures fall silent once the lights fade away, though the message itself seems plain enough: silver and green.
`;
            }

        case "creatureFightOrFlight":
            if (wizard === "green") {
                return `You push the creatures for further answers. Immediately they grow nervous. Several back deeper into the undergrowth while others stamp uneasily among the roots. One creature swings its great horns towards the trees before suddenly turning its head aside as though listening for danger deeper within the forest.

Branches creak softly overhead and loose leaves continue falling around you as the creatures shift restlessly beneath the canopy.`;
            }
            if (wizard === "yellow") {
                return `You press the creatures for more information. At once they grow restless. Some retreat farther across the cloudbanks while others pace nervously through the mist, their feathers crackling faintly with static light. One creature lets out a sharp cry before springing high into the open sky and circling overhead.

The winds rise steadily around you, scattering loose vapour through the heavens as the creatures exchange uneasy glances among themselves.`;
            }
            if (wizard === "blue") {
                return `You continue pressing the creatures for answers. At once they become uneasy. Some dive briefly beneath the surface while others circle farther away, their humming calls rising sharply before fading again into silence. One strikes its glowing claws nervously against the water, scattering rings of pale light outward into the darkness.`;
            }

        case "creatureAntiquityConfusedFalse":
            if (wizard === "green") {
                return `The creatures gather together one final time among the trees. Several raise their glowing horns high while another scrapes deep marks into the moss-covered earth. Silver light spreads upward along the trunks while pale green vines coil slowly around the shining bark.

Then the creatures retreat silently back into the deep woodland, disappearing one by one between the ancient trees. Left alone beneath the quiet canopy, you turn over their final message in your thoughts:

Climb the silver green.
`;
            }
            if (wizard === "yellow") {
                return `The creatures gather together one final time. Several stamp softly upon the clouds while another sweeps its glowing feathers upward through the air. Trails of silver rise high into the sky before twisting together with lines of pale green that spiral ever upward.

Then, as quickly as it began, the display ends. The creatures retreat cautiously into the drifting mist, leaving you with only a fragment of meaning lingering in your thoughts:

Climb the silver green.
`;
            }
            if (wizard === "blue") {
                return `At last the creatures gather together once more. They rise half from the dark water and begin tracing slow patterns with their glowing claws. Silver light spirals upward across the sea while deep green currents twist beneath it, both streams rising together towards the distant heavens.

Then the creatures slip silently back into the depths, leaving only fading ripples behind. The meaning they leave with you lingers uncertainly in your mind:

Climb the silver green.
`;
            }


        default:
            return null;
    }
}