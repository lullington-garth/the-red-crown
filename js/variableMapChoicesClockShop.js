// variableMapChoicesBathhouse.js

export function resolveClockShopVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "clockShopName":
            if (wizard === "green") {
                return `The Whispering Lute`;
            }
            if (wizard === "yellow") {
                return `The Midnight Orrery`;
            }
            if (wizard === "blue") {
                return `The Crooked Hourglass`;
            }
            if (wizard === "red") {
                return `The Blue Flame`;
            }

        case "clockShopImage":

            if (wizard === "green") {
                return "musicShop.jpg";
            }

            if (wizard === "yellow") {
                return "astronomyShop.jpg";
            }

            if (wizard === "blue") {
                return "clockMaker.jpg";
            }

            if (wizard === "red") {
                return "candleShop.jpg";
            }

        case "clockShopDescription":
            if (wizard === "green") {
                return `It’s not much further down Clocktower Street that you come across a small music shop with peeling green paintwork proclaiming the shop to be The Whispering Lute. Lutes, flutes, curled horns and drums hang outside beneath the eaves. From within comes the sound of unseen instruments being played, sometimes softly, sometimes in sudden angry bursts, but always beautiful. A few people linger near the doorway listening.`;
            }
            if (wizard === "yellow") {
                return `It’s not much further down Clocktower Street that you come across a tall, narrow shop with a dark blue sign painted with silver stars. Heavy curtains hide the interior, although a faint glow escapes through the windows. Above the door hangs a brass sphere whose rings slowly turn in the breeze and a bold blue and gold sign which reads The Midnight Orrery.`;
            }
            if (wizard === "blue") {
                return `It’s not much further down Clocktower Street that you come across a narrow clock-maker’s shop. The dirty window is crowded with brass clocks and silver watches, all ticking out of time with one another. From inside comes the constant sound of clicking gears and chiming bells. A rusted pendulum sign swings slowly above the door proclaiming the shop to be The Crooked Hourglass.`;
            }
            if (wizard === "red") {
                return `It’s not much further down Clocktower Street that you come across a candle shop tucked between two leaning houses. The windows flicker with the light of hundreds of coloured candles, while thick scented smoke curls from the chimney above. Melted wax covers the front step in hardened yellow streams. A solid wooden sign over the door reads The Blue Flame Candle Shop.`;
            }

        case "clockShopEntrance":
            if (wizard === "green") {
                return `As you enter the music shop, a small brass bell rings above the door. The room is narrow and dimly lit, with stringed instruments hanging from rafters blackened by years of smoke. Lutes, viols and mandolins line the walls, while polished flutes and hunting horns rest inside wooden display cases. Somewhere nearby comes the smell of varnish and fresh-cut cedar wood.

A tall woman with silver rings on every finger sits behind the counter restringing a lute, her sharp eyes rarely lifting from her work. Beside her, a stout man with a thick beard tests the skin of a drum with the flat of his hand, listening carefully to its tone. At the rear of the shop a freckled boy no older than fifteen struggles to carry a harp almost as tall as himself, grunting with effort while trying not to drop it.
`;
            }
            if (wizard === "yellow") {
                return `The door opens with a dry creak and you step into a surprisingly quiet room. Shelves crowd the walls, stacked with rolled star charts, brass telescopes and curious measuring devices marked with tiny engraved numbers. A large globe of the night sky stands in the centre of the shop, its surface painted with faded constellations and sea-green oceans.

An elderly man with long white hair peers through a brass instrument mounted on a tripod near the window, muttering under his breath as he adjusts its screws. A dark-skinned woman wearing a heavy wool cloak sits at a desk copying symbols onto parchment with a black ink quill. Nearby, a pale-faced apprentice carefully dusts the shelves with a feather brush, though she pauses often to stare absent-mindedly at the charts hanging overhead.
`;
            }
            if (wizard === "blue") {
                return `You duck your head as you step through the low doorway. The air inside is warm and thick with the smell of lamp oil and metal filings. Clocks of every size cover the walls from floor to ceiling: brass carriage clocks, tall walnut cases and tiny silver watches laid carefully on velvet cloths beneath the counter. Their endless ticking fills the cramped shop like the sound of heavy rain.

Behind a workbench sits a bald old man with a jeweller’s lens fixed into one eye, patiently adjusting the gears of a dismantled watch with a pair of delicate tweezers. Standing beside him is a broad-shouldered woman in a leather apron polishing the glass face of a grandfather clock with a square of cloth, while near the back of the shop a thin youth with soot-blackened fingers carefully winds dozens of clocks with a brass key, moving nervously whenever one of the others glances his way.
`;
            }
            if (wizard === "red") {
                return `A wave of heat greets you as you enter the candle shop. The room smells strongly of wax, smoke and sweet oils. Candles of every colour and shape fill the shelves: long white tapers bundled with twine, thick red candles stamped with floral patterns and squat yellow ones resting in iron holders. Melted wax coats the wooden counter in hardened layers.

Behind the counter stands a thin man with pointed features and neatly combed fair hair, slowly pouring hot wax from an iron pan into a row of moulds. Beside him, a heavy-set woman with rolled sleeves trims candlewicks with a small pair of scissors before placing the finished candles into wooden crates. Near the back room a young girl in a grey apron carefully dips lengths of string into steaming wax, her hands moving with practised speed despite her age.
`;
            }

        case "clockShopSaleItems":
            if (wizard === "green") {
                return `The music shop contains more than instruments for wealthy performers. Among the cluttered shelves are several items that may prove useful on the road:

 A bone whistle with a shrill, piercing tone
 A tightly stretched hand drum small enough to strap to a backpack
 A leather case containing spare lute strings and thin wire
 A polished hunting horn capable of carrying sound over long distances`;
            }
            if (wizard === "yellow") {
                return `The astronomy shop is filled with charts, instruments and strange devices intended for studying the heavens. Several seem practical enough for a traveller:

 A rolled parchment star map showing the northern skies
 A brass pocket spyglass with worn black leather grips
 A measuring compass for plotting distances on maps
 A heavy oilskin cloak embroidered with faded constellations`;
            }
            if (wizard === "blue") {
                return `You spend several minutes examining the crowded shelves and glass display cases. Most of the goods would be of little use outside the city, although a few items catch your eye:

 A sturdy brass pocket-watch with a cracked leather chain
 A small sandglass fitted inside a wooden travelling case
 A compass set into a silver casing scratched by age
 A bundle of clockwork springs and fine steel wire useful for repairs or traps`;
            }
            if (wizard === "red") {
                return `The shelves of the candle shop are stacked high with candles, lanterns and smoking jars of scented wax. Among them you notice several items worth closer inspection:

 A bundle of slow-burning travel candles wrapped in cloth
 A brass lantern with thick horn windows to protect the flame
 A small pot of pine-scented sealing wax with a wooden stamp
 A packet of black candle-smoke powder used to darken windows or signal fires`;
            }

        case "clockShopEnquire":
            if (wizard === "green") {
                return `The tall woman behind the counter sets down her tools as you admire the instruments. You ask if they have any of them are magical.

Her smile vanishes instantly, the boy gasps and the man looking nervous lays the drum he’s working on down.

His voiced is hushed when he speaks. “That sort of talk brings trouble.,” he says. “People start thinking music does things it shouldn’t. We tune wood and string here. Nothing more.”
`;
            }
            if (wizard === "yellow") {
                return `The elderly man lowers his brass instrument as you approach.

You glance at the star charts asking if he ever deals in enchanted navigation tools?

The old man’s expression tightens. “There is no such thing,” he says irritably. “Only poor judgement and bad maps.” The atmosphere in the shop is suddenly tense even a little hostile. “If you’re lost, learn to read the sky properly,” snaps the man. “Don’t chase fairytales. Now out. Out of my shop.”
`;
            }
            if (wizard === "blue") {
                return `You approach the counter where the bald clockmaker is reassembling a shattered pocket-watch. You ask the man if he has any enchanted timepieces.

The effect is immediate. The old man slams what he is work on down. “We don’t deal in tricks or nonsense here. Honest timepieces, nothing else,” he appears red in the faced as he starts to rise. The woman stands behind him arm folded glowering at you and the boy stares at you wide eyed and scared. 
“You want that filth,” the man continues, his voice angry, ‘get south of the river with the rest of your lot. Never here.’
`;
            }
            if (wizard === "red") {
                return `Heat rolls gently through the shop as the fair-haired man continues pouring wax into moulds.

You ask if he has any enchanted candles with unusual effects when burned?”

The man drops the pouring pot. All three of the staff are tense now and the room feels suddenly smaller.

“We sell light,” he says quietly. “Nothing more. You will never find that kind of evil within these walls.”
`;
            }

        case "clockShopFight":
            if (wizard === "green") {
                return `The bearded man is now standing fully upright, arms folded across his chest, as you try and defend magic, but the mood in the music shop just becomes more tense. 

“That’s enough,” the man says, his voice deep and threatening. He reaches slowly beneath the counter. “I’ll not have that talk in my shop.” He lifts a heavy spike bat and steps towards you. 
`;
            }
            if (wizard === "yellow") {
                return `As you try and explain that magic is a peaceful and misunderstood art the astronomer’s already stretched patience finally snaps. He lowers his instrument and stares at you directly.

“LIES,” cries the man. “LIES, LIES, LIES!’ His face red, his eyes popping. “That’s not how the sky works,” He grabs a large brass telescope and swings it at you. “And it’s not how this honest people talk. Be gone DEVIL!”
`;
            }
            if (wizard === "blue") {
                return `The already tense mood in the clockmaker’s shop stiffens further as you try and explain that magic is a peaceful and misunderstood art. The more you talk though the tighter the bald clockmaker’s jaw becomes until eventually he sets down his tools with deliberate care and picks up a ball hammer.

“There are no such things,” he says again, slower this time, raising the hammer. “And I don’t like you pretending there is.” 
`;
            }
            if (wizard === "red") {
                return `As you try and explain that magic is a peaceful and misunderstood art the fair-haired man’s expression darkens. He picks up a heavy melting pot testing the weight in his hands.

“No,” he says. “We are honest people, we sell light and I will not brook you evil mongering in my shop.” He steps forward and takes a swing at you with the heavy saucepan.
`;
            }

        case "clockShopDirections":
            if (wizard === "green") {
                return `You hold your hands up and tell the shopkeeper that you are not looking for trouble. Instead, you ask them if they know of any standing stones in the local area. You are careful not to mention their magical purpose as gateways to magical realms, but the bearded man does not lower his guard.

“The Parting Stones,” he spits. “South. That’s what I’ve heard. Out past the foundary. Now get out of my shop.”
`;
            }
            if (wizard === "yellow") {
                return `You hold your hands up and tell the shopkeeper that you are not looking for trouble. Instead, you ask them if they know of any standing stones in the local area. You are careful not to mention their magical purpose as gateways to magical realms, but the astronomer’s expression darkens further.

“For fairy tales and nonsense head south. That’s where your kind gather.” He turns his back on you. “I will have nothing to do with such things.”
`;
            }
            if (wizard === "blue") {
                return `You hold your hands up and tell the shopkeeper that you are not looking for trouble. Instead, you ask them if they know of any standing stones in the local area. You are careful not to mention their magical purpose as gateways to magical realms, but the clockmaker’s stare hardens.

“South,” he says at last. “Just keep going south. Now get out of my shop.”
`;
            }
            if (wizard === "red") {
                return `You hold your hands up and tell the shopkeeper that you are not looking for trouble. Instead, you ask them if they know of any standing stones in the local area. You are careful not to mention their magical purpose as gateways to magical realms, but when he next speaks there is barely controlled hatred in his voice.

“South,” he hisses.
“Near where your lot gather,” says the lady then spits.

You decide not to push your luck.
`;
            }
 
        case "clockShopPostFight":
            if (wizard === "green") {
                return `Inside the music shop, instruments lie scattered and damaged among the wreckage. The boy remains for a moment, crouched behind a shelf, clutching the harp. Then he is gone. Out through the front door, almost tripping over the threshold, shouting for his uncle.`;
            }
            if (wizard === "yellow") {
                return `The astronomy shop is in disarray. Star charts hang torn from the walls; brass instruments lay smashed and strewn across the once organised space.

The apprentice stands frozen amid the chaos, feather brush still in her hand. She drops it and runs shouting for the city guards.
`;
            }
            if (wizard === "blue") {
                return `Broken glass lies scattered across the floor, and several clocks have toppled from their shelves, still ticking faintly as they lie on their sides like wounded creatures refusing to die quietly.

The boy hesitates for a moment among the wreckage, eyes wide, then bolts. You hear him shouting as he runs into the street: calling for the militia, his voice shrill and panicked as he disappears into Clocktower Street.
`;
            }
            if (wizard === "red") {
                return `The candle shop is a mess of overturned wax trays and broken moulds. Pools of half-cooled wax spread across the floor forming pooled blots.

The girl, staring at the ruined shop, whimpers and flees. She bursts into the street, calling for her sister.
`;
            }

        case "clockShopSearch":
            if (wizard === "green") {
                return `Beneath a collapsed display shelf, you discover a hard leather case containing a master crafted travelling violin, obviously valuable. There is a false base inside the same case in which you find a small, sealed pouch of rare resin and pitch. You pocket both.`;
            }
            if (wizard === "yellow") {
                return `Inside a smashed desk compartment, you find a tightly rolled tube containing a detailed celestial navigation atlas, far more precise than the wall charts Alongside it rests a high-grade sighting telescope, fitted with adjustable lenses and a calibrated focus ring. It is heavier than it looks, clearly expensive, and designed for serious navigational work rather than casual stargazing. You stash both in your backpack.`;
            }
            if (wizard === "blue") {
                return `Behind an overturned workbench, you find a small, locked tin case wedged beneath a pile of tools. Inside, carefully wrapped in oilcloth, is a heavily engraved watch, far finer than anything else in the shop. Tucked beside it is a ring of twelve finely cut keys used to open almost any high-end timepiece casing. Small, practical, and clearly valuable to the right buyer. You pocket both items.`;
            }
            if (wizard === "red") {
                return `Behind the counter, inside a reinforced storage drawer, you find a carefully wrapped bundle of royal-grade sealing candles, black and deep blue. These are rare items indeed. Tucked beneath them is a small iron-bound container holding refined candle essence oils. The bottle is stoppered with wax and labelled in precise, professional script. You take both and drop them in your backpack.`;
            }

        default:
            return null;
    }
}