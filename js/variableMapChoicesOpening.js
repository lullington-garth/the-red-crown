// variableMapChoicesOpenings.js

export function resolveOpeningsVariable(path, playerStats) {

const wizard = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {
            
        case "openingText":
            if (wizard === "green") { return `The old magic is fading.

                Once it flowed unseen through every forest, mountain and stream, woven into the roots of the world itself. Every blossom that opened with the dawn, every ancient oak that whispered in the wind. But mankind has turned away from such things. With each passing generation they place greater faith in reason than wonder, in invention over enchantment. The ancient songs grow quieter, and the four great realms of magic slowly wither.

                You know this better than any. As the master of the real of Nature and Keeper of Enchantment, you have watched the balance unravel for centuries. You have seen sacred groves fall before the axe, rivers bend to the will of industry, and places once alive with magic become silent beneath the march of progress. Yet all is not darkness. Though magic is in decline, if you act fast, you can see a future.

                A vision of a world that could be. A hidden Realm of Magic, born from the strength of all four kingdoms, existing beyond the reach of mankind's endless hunger for knowledge and conquest. A sanctuary where magic, enchanted folk and the oldest of creatures might endure forever. A place forever beyond the grasp of science, yet still close enough to be touched upon through dream, inspiration and the imagination of man.

                When you took your vision to your brothers, the other three pillars of the magical realms, they listened.

                Solarius saw the boldness of your plan. Lo Tae Zhao recognised its wisdom and the peace it would bring to all magical kind. Together, the three of you pledged yourselves to its creation. Only Ommadon refused.

                Brother though he is, the Lord of Fire and Strength has never believed that mankind deserves saving from itself. He welcomes the age that approaches, convinced that humanity's ambition will consume the world in war. War on which he will thrive, and while your realm weakens with every forgotten legend and every felled forest, Ommadon will quietly nurture dark seeds within mankind—greed, ambition, secrecy and the endless pursuit of power. With his intervention he believes that when the other realms have finally faded into memory, his alone will remain strong enough to rule both the magical kingdoms and the world of men.

                After his refusal, you discussed your options with Lo Tae Zhao and Solarius, and while it saddens you to go against your brother, he leaves you no choice. Neither Ommadon’s consent nor support are necessary to the unit the four kingdoms. Only his crown is required.

                His Red Crown is the living heart of Ommadon's realm, the ancient focus through which its power flows. With it, the four kingdoms can be united, with or without, Ommadon’s blessing.

                Yet ancient law forbids the Brothers from making war upon one another. No immortal hand may be raised against a brother.

                After long counsel beneath the boughs of the World Tree, a single path remained. One of the Brothers must surrender immortality and undertake the quest alone, becoming mortal until the task is complete.

                You chose yourself. The decision surprised none of your brothers. After all, the dream was yours before it became theirs.

                You surrendered your immortality willingly and entrusted the Tree of Life—the very soul of your realm—to Solarius and Lo Tae Zhao. While they guard it, they will prepare the foundations of the new Realm of Magic. Should you return with Ommadon's Red Crown, your dream can finally become reality.

                But there is a connection between you and your brothers, even Ommadon. The instant your immortality left you, he felt the balance shift and would have deduced your plans. Now every creature loyal to him, every servant lurking within the shadows of his realm, and every dark enchantment at his command will stand between you and your goal.

                Even your own magic has grown uncertain.

                The weakening of the realms has left every spell less reliable than it once was. Ancient enchantments falter. Familiar incantations slip from memory. Powers that once answered your call without hesitation may now refuse you entirely. You must rely not only upon your mastery of magic, but upon patience, wisdom and courage.

                It has been decided that your journey will begin in the quiet settlement of Brookdown Crossing.

                Somewhere beyond its winding lanes lies the hidden glade of the Passing Stones. Once they stood forever in a single sacred place, but since Ommadon shattered that certainty the glade now wanders the land, appearing only briefly before vanishing again. It is your hope that perhaps the good folk of Brookdown Crossing may be able to point you towards them.

                When you do find the Stones, they will carry you to one of the remaining kingdoms of magic. Whether you arrive within the radiant realm of Solarius or beneath the endless heavens of Lo Tae Zhao matters little. In either realm, you must seek the ancient tree Antiquity which will offer the guidance only ages can provide. With its knowledge in hand you brother will than open a fleeting passage into Ommadon's Red Realm.

                Beyond that portal will lie the Red Dunes, Ommadon's fortress, and the greatest trial of your long existence.

                You draw one final breath beneath familiar leaves.

                The wind stirs the branches above you as though the forest itself offers a silent farewell. Birds greet the morning. Sunlight filters through emerald canopies. For the first time in countless ages, you leave your realm not as its immortal guardian, but as a traveller with only one lifetime to fulfil a dream.

                With your spellbook secured, your scrolls packed carefully away, and your faithful horse waiting upon the forest path, you turn towards Brookdown Crossing.

                The future of magic now walks beside you.`;}
            if (wizard === "yellow") { return `The magic within three of the four kingdoms is dwindling. There is a disquieting peace in its stillness.

                Those who seek power seldom notice such things. They fill silence with noise and mistake motion for purpose. Yet all things, however turbulent, eventually return to stillness and it appears that the realm magics are beginning to still.

                As the guardian of the Sky Realm, a domain of deep peace and tranquillity, and keeper of the high places you have been watching the calming of the ancient magics with unease. For millennia, you have watched the ages pass beneath you like shadows crossing distant valleys. Kingdoms have risen, fallen and been forgotten, yet the sky has remained unchanged, welcoming each new dawn without judgement. Now, however, even the heavens carry an unfamiliar weight. The balance is failing.

                As humanity embraces reason and science, it leaves behind the wonder that once nurtured the magical realms. Forests lose their enchantment. Ancient seas fall silent. Sacred places are forgotten. Across every kingdom, the flow of magic weakens with each passing generation.

                It was your brother, Carolinus, who first imagined a hidden Realm of Magic, a sanctuary beyond the reach of mankind's relentless pursuit of progress, where magic, enchanted folk and the oldest creatures of legend might endure. He had brought it to the four brothers, each a pillar of the old magics. Solarius had recognised the wisdom of the vision immediately, seeing how it might preserve the natural rhythm of the worlds.

                You had recognised the hope withing the vision. A place where magic need not struggle against humanity, but simply exist beyond its reach, touching mortal hearts only through dreams, imagination and quiet moments of wonder. But while the three of you believed in Carolinus’s vision and resolved to bring that it into being, the fourth brother, Ommadon, would not stand beside you.

                Surrendered as he is to conflict, he sees no threat to his branch of dark magic; a magic that thrives on power, strength, dominion and conflict. He foresees mankind's endless hunger for knowledge and power inevitably ending in war, and with his touch he will shape that future until every act of ambition, greed and conquest strengthens his own realm.

                After his refusal, you discussed your options with Carolinus and Solarius, and while it saddens you to go against your brother, he leaves you no choice. Neither Ommadon’s consent nor support are necessary to the unit the four kingdoms. Only his crown is required. His Red Crown is the living embodiment of Ommadon's realm, the ancient focus through which its power flows. With it, the four kingdoms can be united, with or without, Ommadon’s blessing. 

                Ancient law forbids the Brothers from raising immortal hands against one another, so another path has been chosen. One brother must surrender immortality and walk the mortal road alone.

                You accepted without hesitation. To preserve harmony, sacrifice is sometimes the gentlest path.

                Before your departure, you entrusted the Celestial Temple—the sacred heart of your realm—to Carolinus and Solarius. Within its quiet halls they will safeguard your realm while preparing the foundations of the new Realm of Magic. Should you return with Ommadon's Red Crown, the work may finally be completed.

                Your immortality is gone, and with the strong and ancient bonds between you and your brothers, Ommadon felt its passing the instant it left you. And with that knowledge he will know your plans.

                Already his servants stir. Dark creatures gather. Ancient evils awaken. Every obstacle that hatred and fear can place before you will stand upon the road ahead.

                Nor can you rely completely upon your own magic. As the realms weaken, so too does every spell you have ever mastered. Familiar enchantments now fade before they are completed. Powers once as effortless as breathing now fail without warning. Patience, wisdom and quiet resolve must stand in their wake and will serve you just as faithfully as magic itself.

                It was agreed that your journey should begin in the quiet settlement of Brookdown Crossing. Beyond its winding streets lies the last known sighting of the Passing Stones. Once they rested peacefully within a single sacred place, visible only to ordinary mortals who lacked the power to use them, or to the Brothers themselves. But Ommadon, after shattering his own gateway, cursed the glade, leaving it to wander endlessly across the countryside like a cloud carried upon changing winds.

                You must find the Passing Stones. They will carry you to one of the remaining magical realms. Whether your path leads to the enchanted forests of Carolinus or the boundless seas and star-filled heavens of Solarius matters little. Either brother will guide you to Antiquity, the oldest of all living trees, whose wisdom reaches back to the dawn of magic itself. And whose wisdom will be essential in your quest to capture the crown. 

                With the gateway to Ommadon’s realm now beyond the reach of the mortal world, whichever brother you visit will be forced to use what they can of their dwindling magics to tear a rift between realms, providing a brief portal into Ommadon's Red Realm.

                Beyond that portal will await the Red Dunes, the fortress of the Red Sorcerer, and the trial upon which the future of every magical kingdom now depends.

                You gather your spellbook and secure your scrolls within your travelling pack before descending the ancient steps of the Celestial Temple for what may be the final time.

                A cool wind greets you.

                Far below, clouds drift silently across the valleys, their shadows gliding over the land without haste or purpose. High above, the endless sky remains calm, untouched by the fears of those who walk beneath it.

                You close your eyes for a single peaceful breath.

                Then, carrying that tranquillity within you, you descend to the mortal world and begin the journey to Brookdown Crossing.`;}
            if (wizard === "blue") { return `Nothing remains unchanged. The stars wheel across the heavens. Oceans rise and fall with the pull of distant moons. Empires are born, flourish, and fade into forgotten ruins. Even the mountains surrender, grain by grain, to wind and tide. Such is the rhythm of existence, and now the once great pillars of magic are starting to dwindle.

                As master of the realms of the Deep and the Cosmos, keeper of the hidden currents that bind sea and star you have for countless ages charted the movements of the heavens, listened to the songs carried beneath the deepest oceans, and watched fortune weave its endless tapestry across the lives of mortals and immortals alike. Now the currents have shifted once more. Now magic is ebbing from the world.

                Humanity no longer looks to the heavens for guidance or listens to the whispers carried upon the waves. Wonder has been traded for certainty, mystery for reason, enchantment for science. As mankind turns its gaze ever inward, the four great realms of magic slowly fade from existence.

                No tide can be held forever. Yet a new course may still be set.

                It was your brother, Carolinus, like yourself on of the rulers of the four realms, who first imagined a hidden Kingdom of Magic, a sanctuary beyond the reach of mankind's relentless pursuit of knowledge, where magic, enchanted folk and the oldest creatures of legend might endure until the stars themselves grow cold. You recognised the wisdom within his dream, just as Lo Tae Zhao recognised its balance. Only the fourth brother, Ommadon. The red wizard of fire and power stood against you.

                Ommadon, so different to the rest of you. A believer that destiny favours the strong alone. He watches mankind's endless appetite for power with quiet satisfaction, knowing it will lead to conflict. While your own realm weakens as fewer mortals look to the heavens or sail beneath enchanted suns and stars, Ommadon nurtures ambition, greed and conquest. With these seed wars will grow and so to Ommadon’s power. As the other realms fade, his alone will thrive and he will one day inherit both worlds.

                After his refusal, you discussed your options with Carolinus and Lo Tae Zhao, and while it saddens you to go against your brother, he leaves you no choice. Neither Ommadon’s consent nor support are necessary to the unit the four kingdoms. Only his crown is required. The ancient crown, the heart of his realm, the vessel through which its power is gathered. With it, the four kingdoms can be united, with or without, Ommadon’s blessing.

                Ancient law forbids the Brothers from warring against one another. No immortal may raise a hand against his kin, so fate has determined another path. One brother must surrender immortality, become mortal, and undertake the quest alone.

                You offered yourself without hesitation. Fortune has never been a matter of chance. It favours those willing to change the course of the current.

                And so it is that you have entrusted stewardship of the Celestial Tides—the ancient harmony between the deepest oceans and the turning stars—to Carolinus and Lo Tae Zhao. While they guard its power, they will prepare the foundations of the new Realm of Magic. Should you return bearing Ommadon's Red Crown, the dream will become reality.

                As your brothers embraced you one final time, Carolinus smiled.

                "I suppose," he said, "this means you won't be bringing whales to conquer the Red Sorcerer after all."

                Even Lo Tae Zhao laughed. The jest lingered only for a moment before silence returned. For you all know that Ommadon already knows of your quest. The bond between the four of you is strong. The instant your immortality slipped away, he would have felt the balance of the worlds change and would have deduced what you are planning. Every creature loyal to him, every dark enchantment he commands, every cruel servant lurking within his realm will be waiting.

                Worse still, the tides of magic no longer flow as they once did. Spells that answered your voice for millennia now falter. Fortune itself has become uncertain. The stars offer fewer certainties than before, and even the deepest currents conceal dangers they once revealed. You must trust not only your magic, but your judgement, your patience and your willingness to seize opportunity wherever it appears.

                Every voyage begins with a single step ashore and it was discussed and agreed that your course should first lead to the town of Brookdown Crossing.

                Somewhere beyond its winding roads lies the hidden glade of the Passing Stones. Once they stood unmoving beneath open skies, visible only to ordinary mortals who lacked the power to use them, or to the Brothers themselves. But Ommadon, having shattered his own gateway, cursed the ancient glade. Now it drifts across the land like mist upon the sea, never lingering in one place for long.

                Once you leave your kingdom, finding the Passing Stones will be your only was back into the wizard realms. It is hoped that the residents of Brookdown Crossing may have spotted them and may be able to guide you. Whether your path leads beneath the emerald boughs of Carolinus or into the tranquil heavens of Lo Tae Zhao matters little. In either realm, the ancient tree Antiquity will be able reveal what wisdom it chooses to share in order to further your quest, and your brother will, with the last of his waning magic, be able to open a fleeting passage into Ommadon's Red Realm.

                Beyond that portal will lie the endless Red Dunes, Ommadon's fortress, and the destiny that has awaited you since the stars first marked this turning of the age.

                You fasten your spellbook securely inside your pack, settle your horse and gather your scrolls for the road ahead.

                Above you, the constellations continue their silent dance, though dawn has begun to wash them from the sky. Somewhere beyond the horizon the great oceans answer the moon, their tides keeping perfect time with the heavens.

                The currents have chosen their course.

                Now you must follow them and hope that you can return with the Red Crown.`;}   
            if (wizard === "red") { return `Fire consumes. It always has. It devours the weak, hardens the strong, and leaves only truth in its wake. That is the first lesson every novice learns within the sacred halls of the Red Brotherhood. Strength is earned. Mercy is weakness. Power belongs to those willing to seize it.

                You believed those teachings.

                For many years you served faithfully as one of the Red Brotherhood, drawing your magic from the living fires of Ommadon's realm. You honoured your master without question, convinced that his strength alone would preserve the magical kingdoms against whatever future awaited them.

                Time, however, reveals truths that faith alone cannot. Beyond the borders of the magical realms, mankind has changed.

                Each generation reaches further than the last. Forests fall. Rivers are chained. Mountains are hollowed. The old stories are dismissed as superstition, while science and industry become the new masters of the world. Magic retreats with every passing year.

                Many within the Red Realm see this as an opportunity. They believe humanity's endless ambition will fuel Ommadon's power forever. They welcome the wars they know will come, convinced that every battlefield will strengthen the realm in which they dwell.

                But you see something different. Wars end. Kingdoms fall. Empires collapse beneath the weight of their own triumphs. But industry does not stop.

                It advances without hatred, without mercy and without rest, until even war itself becomes a fuel to the machine.

                If mankind continues upon its present course, there will come a day when not only the peaceful realms, but Ommadon's own kingdom will be swept aside. Fire cannot burn where nothing remains to feed it.

                When whispers reached the Red Realm that Carolinus, the Green Wizard of Nature, sought to unite the four magical kingdoms into a hidden sanctuary beyond mankind's reach, you dismissed the idea as fantasy.

                But times have changed... and now you see that perhaps it is the only path upon which magic, even Ommadon’s dark power, can survive.

                The decision that followed was the hardest of your life.

                You crossed the ancient boundaries between the realms and sought an audience with the Three Brothers. You expected suspicion. You found it. Yet when you spoke honestly of what you had seen, of mankind's relentless march towards a future where neither forest nor fortress would escape its grasp, they listened.

                Not because they trusted you. Because they feared you were right and so together, you forged a desperate plan.

                The brothers required Ommadon's Red Crown to unite the realms. You knew Ommadon's kingdom. You knew its customs, its temples, its hidden roads and the minds of those who served within them. Most importantly... You knew how to enter the Red Realm without immediately drawing suspicion.

                No immortal brother could hope to do the same and even if they could, magics even older than their own forbade them from fighting one another. 

                So the task became yours. 

                No sooner had your decision been made than word reached Ommadon. There is a connection between the four brothers, and this was a secret that they could not hide from him.

                Whether by magic, by spies, or by simple instinct, your master learned of your betrayal. You do not know how your master felt when he learned of your betrayal; anger, disappointment, pity. Perhaps all three.

                It matters little now. Every servant of the Red Brotherhood who once called you brother will hunt you. Every creature bound to Ommadon's will shall become your enemy. Every fortress that once welcomed your arrival will become a prison should you enter its gates unwisely.

                Worst of all, the very power upon which your magic depends flows from Ommadon's realm itself.

                Though your spells remain potent, you cannot know when your master may seek to deny them, twist them, or turn them against you. Every incantation you cast carries with it the risk that the source of your strength is also watching.

                Your journey must begin far from the Red Realm. The Three Brothers have sent you first to Brookdown Crossing, where you must seek the Passing Stones, a crossing point into the magical realms.

                Once they stood unmoving within a hidden glade, known only to ordinary mortals who lacked the power to use them, and to the Brothers themselves. But Ommadon destroyed his own gateway and cursed the ancient sanctuary. Now the glade wanders the countryside, never resting in one place for long.

                You must find the Passing Stones and it is your hope that perhaps the people of Brookdown Crossing may be able to point you towards them.

                The stones will carry you to the realm of one of the allied brothers. Whether you arrive beneath the enchanted forests of Carolinus, among the tranquil skies of Lo Tae Zhao, or within the star-lit deeps of Solarius, you will find guidance there. The ancient tree Antiquity will reveal what wisdom it deems fit to share before one of the brothers opens a fleeting portal back into the Red Realm. Back to the place you once called home.

                Beyond the portal lie the Red Dunes, the fortress of your master, and the sacred halls where you were once welcomed as a brother. Now you will return as an outcast.

                You fasten your spellbook to your pack and secure the scrolls you may soon need. Your horse stamps impatiently beside the road, unaware that every mile carries you closer to the land that forged you.

                You cast one last glance towards the insipid lands you now find yourself in. Weak and powerless.

                You sneer in disapproval, hoping that, when this is over, there will still be a Red Realm left for you to return to.`;}

        case "wizardChoice":

            if (wizard === "green") {
                return "greenWizard.jpg";
            }

            if (wizard === "yellow") {
                return "yellowWizard.jpg";
            }

            if (wizard === "blue") {
                return "blueWizard.jpg";
            }

            if (wizard === "red") {
                return "redWizard.jpg";
            }                

        default:
            return null;
    }
}