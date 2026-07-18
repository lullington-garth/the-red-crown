// variableMapChoicesMoneyChanger.js

export function resolveMoneyChangerVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "moneyChangerOutside":

            if (wizard === "green") {
                return `Following the road, you soon arrive outside a narrow stone building wedged tightly between two taller structures. Its yellow-painted walls are cracked and stained by rain, and the faded, unreadable sign hanging above the door swings noisily in the wind. The windows are shuttered despite the time of day, and the whole place has an unwelcoming feel to it, although you can see that the sign in the door says 'Open'.`;
            }
            if (wizard === "yellow") {
                return `Following the road, you soon arrive outside a narrow stone building standing quite alone on its plot. Its grey-painted walls are cracked and stained and all the windows have been blacked out and barred.

A faded sign hanging above the door reads: Styx Coin. The whole place has a dark, oppressive feel to it not helped by the unnaturally black door, which gives the impression of a cave entrance rather than a shop doorway. There is a sign next to it with says OPEN though, but there appears to be no light or sound coming from within.`;
            }
            if (wizard === "blue") {
                return `You soon arrive outside a brightly painted little hut sitting in the shadow of a tall townhouse. Coloured ribbons and strings of beads hang from the doorway, gently clattering together in the breeze. The wide rounded double doors stand fully open and warm yellow light spills cheerfully out into the street.

A sign hammered into the scrubby grass in front of the hut reads Bubbles Coin Exchange and Stuff. Through the open doors, you can just about make out what looks like a room in easy disarray; coins strewn across counters, scales and ledgers laying haphazardly where last used. The whole hut seem to be settled beneath the hum of incense and sweet herbs.`;
            }
            if (wizard === "red") {
                return `You soon come upon a tall narrow building of polished black wood and smoked glass standing silently between two crooked stone houses. The structure rises like a dark monolith above the street, its upper windows reflecting the grey sky like still water. There are no signs, no lanterns and no markings to identify it.

The front door stands slightly open, though no sound emerges from within. None of the nearby townsfolk seem willing to look directly at the place as they pass.`;
            }        

        case "moneyChangerInside":

            if (wizard === "green") {
                return `You step inside the dingy shop. It's no more inviting on the inside. Dust and burnt candle fumes choke the air of the dark and gloomy shop. As your eyes adjust you start making out wooden grilled counters lining the walls. You see tiny scales, ledgers and trays filled with coins you don't recognise trapped securely behind the bars.

Although the shop appears empty, you can hear the the faint sound of coins being counted somewhere beyond a curtained archway to one side.`;
            }
            if (wizard === "yellow") {
                return `You step inside the gloomy shop and the door creaks shut behind you with slow moan. Dust and burnt candle fumes choke the stale air of the darkened room. As your eyes slowly adjust, you begin to make out wooden grilled counters lining the walls, their iron bars, thick with spiderwebs, casting long shadows across the floor. Behind the bars sit tiny scales, ledgers and trays filled with unfamiliar coins from distant lands, all locked securely away.

The shop feels unnaturally quiet, every sound swallowed by the thick gloom. Then, from somewhere beyond a curtained archway to your right, you hear the faint but steady sound of coins being counted with nervous haste.`;
            }
            if (wizard === "blue") {
                return `Inside is a riot of colours and competing smells. Bright rugs cover the floor and every surface seems piled high with curious objects. Jars of dried herbs, bundles of feathers, painted masks, candles, crystals and loose coins everywhere.

Piles of silver and gold coins sit openly upon the counters, between the jars on the throw cushions, you are hard pressed to see a surface were one coin or another has not been discarded.

From somewhere beyond a curtain of brightly coloured beads at the back of the shop comes the faint sound of humming, followed by the lazy clink of coins.`;
            }
            if (wizard === "red") {
                return `You push the heavy door open and step into a long silent chamber illuminated by thin shafts of pale blue light filtering down through narrow ceiling slits far above. The air inside smells faintly of rain.

The shop itself is strangely bare. There are no shelves, no cluttered counters and no displays at all. Instead, a handful of perfectly ordered objects rest upon black stone tables: neat stacks of coins, bundles of parchment tied with silver thread and tiny glass weights balanced carefully beside delicate scales.

At the far end of the room hangs a curtain of dark beads behind which you can hear the soft scratch of a quill moving steadily across parchment.`;
            }   

        case "moneyChangerCurtain":

            if (wizard === "green") {
                return `Pushing aside the curtain, you enter a cramped back room lit by the glow of a single oil lamp. Seated at a table piled high with coins is a sour-faced trader with thinning grey hair and sharp yellow eyes hunched over a pile of mixed coins. He scowls as you enter.

‘I didn’t want to be disturbed,’ he growls. ‘I thought I’d locked the shop.’ 

As he speaks, your attention is drawn to an unusual-looking, runed chest sitting beside him upon the table. The shopkeeper notices your glance and moves the object to the far side of the desk. 

'What do you want?' he snaps.`;
            }
            if (wizard === "yellow") {
                return `Pushing aside the curtain, you enter a cramped back room lit by the weak glow of a single candle. Seated at a table piled high with mixed coins is a thin, nervous-looking man with thick grey hair and sharp yellow eyes. He startles violently as you enter, knocking over a stack of coins on his table.

‘I... I thought I locked the shop,’ his eyes dart around the room and then behind you, presumably to see if you are alone.

Beside him upon the table sits an unusual rune-covered chest. The moment he notices your eyes fall upon it, he hurriedly drags it away to the far side of the desk and places one trembling hand over the lid.

‘What do you want?’ he is trying to sound calm, though his whole body is in an attitude of tense alarm. If you were not blocking the only exit you expect he would have already bolted.`;
            }
            if (wizard === "blue") {
                return `Pushing aside the hanging beads, you step into a warm back room thick with sweet-smelling smoke. Sitting cross-legged upon a pile of cushions is a podgy young man with tangled hair, colourful robes and half-closed eyes. Nestled amongst the cushions he appears to be sitting on a curious rune-covered chest, although he seems completely oblivious to it.

He stares at you for several long moments before smiling.

‘Hey man... are you a customer?’ he says slowly. ‘You are a customer, man. So cool. I love customers...’ he grins broadly then in a serious tone says, ‘I love you man.’`;
            }
            if (wizard === "red") {
                return `Parting the curtain quietly, you step into a circular back room lined floor to ceiling with shelves of ledgers and books. Seated behind a low desk is an elderly man dressed in deep violet robes. His silver hair is braided tightly against his scalp and his expression is calm and unreadable.

Beside him upon the desk is a strange white chest covered in faint silver runes. One of his hands rests lightly upon it.

‘I assume you have come for a reason.’`;
            }   

        case "moneyChangerRequestInfo":

            if (wizard === "green") {
                return `You ask the trader whether he knows anything about the surrounding area and in particular any sightings of standing stones.

‘I am not tourist information,’ he snaps. ‘You want my local knowledge you pay for it. Five Gold Pieces.’ He holds out a thin hand obviously expecting coin.`;
            }
            if (wizard === "yellow") {
                return `You ask the trader whether he knows anything about the surrounding area, particularly any sightings of standing stones.

He licks his lips nervously then with his eyes still darting towards the curtained doorway behind you, he says, ‘I am not from around here exactly, but I know the area a little. I could tell you what I know if you have the coin for it. Five Gold Pieces.’ He seems a little surprised at his own demand, but he then follows through holding out a thin, shaking hand.`;
            }
            if (wizard === "blue") {
                return `You ask the trader whether he knows anything about the surrounding area, particularly any sightings of standing stones.

He leans backwards thoughtfully, staring up at the ceiling for a long time.

‘Standing stones... yeah... yeah, I’ve seen those,’ he says eventually. ‘Big ones. Old ones. They sort of hum if you listen properly. Or maybe that was Barny. Did you want to meet Barny. I can get him. You'd like Barny. He'll know where the stones are.’

He nods slowly to himself.

‘Tell you what,’ he continues, ‘you give me five Gold Pieces and I'll ask Barney where the stones are.’`;
            }
            if (wizard === "red") {
                return `You ask the man whether he knows anything about the surrounding area, particularly any sightings of standing stones.

The man studies you silently for several long moments before speaking.

‘Knowledge has value,’ he says calmly. ‘Five Gold Pieces.’ His voice remains perfectly measured, neither inviting nor hostile. ‘Pay, and I will tell you what I know.’`;
            }   

        case "moneyChangerInfo":

            if (wizard === "green") {
                return `The trader snatches the gold from your hand and waves dismissively towards the street outside.

‘Whatever you’re searching for, it’s not in here. That much I can tell you. Try looking somewhere else and lock the door behind you when you leave.’`;
            }
            if (wizard === "yellow") {
                return `The trader snatches the gold from your hand so quickly that several coins spill across the table. He hurriedly gathers them back up before waving quickly towards the street outside.

‘There's no stones here. None. So you'd best be off,’ he is scooping the coins off the desk now into a bag. ‘Try looking outside, or down the road, or somewhere else... and lock the door behind you when you leave. Thank you.’`;
            }
            if (wizard === "blue") {
                return `The man accepts the gold happily, dropping the coins into a bowl with some other loose currency.

'BARNEY!'  he screams. A pile of what you thought were discarded blankets sits up. A bleary eyed man looks around the small room.

'I am Barney,' he seems pleased about that.

'Tell them about the stones, B,' says the first man.

‘Right, yeah the stones,’ says Barney. ‘They move around, you know. Not on little tiny squeaky legs. More... spiritually like. One time I followed one for three days before I realised it was a hill.’

You ask if he know where the standing stones might be now. He squints thoughtfully at you.

‘Head towards the stones, man... unless they still are singing... then you’re probably close to the moon.’

He collapses back into his blanket pile.

'See,' says the first man. 'Barney knows.'`;
            }
            if (wizard === "red") {
                return `The man accepts the gold without even glancing down at it. The coins disappear somewhere within the folds of his robes.

‘The standing stones you seek are old,’ he says quietly. ‘Older than roads. Older than kings. Places like that do not remain still forever.’ He folds his hands neatly upon the desk and his pale eyes narrow slightly. ‘They are here and they are not. Only the worthy will attain passage.’`;
            }   

        case "moneyChangerReaction":

            if (wizard === "green") {
                return `The man snarls and reaches beneath the table, drawing a curved dagger with surprising speed.`;
            }
            if (wizard === "yellow") {
                return `The man recoils in panic and scrambles backwards. Gathering himself he reaches beneath the table, drawing a wicked looking curved dagger.`;
            }
            if (wizard === "blue") {
                return `The man stares at you in complete confusion. ‘Whoa... bad energy, man.’`;
            }
            if (wizard === "red") {
                return `The man rises slowly and calmly producing a wicked looking dagger from beneath his robes.`;
            }   

        case "moneyChangerTimeWaster":

            if (wizard === "green") {
                return `The trader slams both hands hard upon the table.

‘Then stop wasting my time,’ he snarls, ‘Too many fools wander in here expecting favours.’ He rises from his chair and points furiously towards the door. 'Out. OUT!'`;
            }
            if (wizard === "yellow") {
                return `'Well go then,' says the skittish man. He starts scooping up coins and dropping them in a bag. After a second or two he looks up and seems surprised that you are still there. He lets out an involuntary little squeak. 

‘Please go,' he says, rounding the table and ushering you to the  door with shaking hands.

‘Out, out!’`;
            }
            if (wizard === "blue") {
                return `The man wiggles in his cushions, shrugs lazily and smiles at you.

‘That’s okay, man. Wisdom’s not for everybody.’ He begins stacking coins into uneven little towers. ‘Safe travels though,’ he adds cheerfully. ‘If you see any hills, say hi for me, but  don’t follow them. Total waste of time.’`;
            }
            if (wizard === "red") {
                return `The man inclines his head slightly.

‘Then we have no business together,’ he says calmly.

Without another word, he lowers his eyes and resumes writing upon the parchment before him.`;
            }   

        case "moneyChangerPerson":

            if (wizard === "green") {
                return `old man`;
            }
            if (wizard === "yellow") {
                return `nervous man`;
            }
            if (wizard === "blue") {
                return `air head`;
            }
            if (wizard === "red") {
                return `mysterios man`;
            }   

        case "moneyChangerPersonality":

            if (wizard === "green") {
                return `rude`;
            }
            if (wizard === "yellow") {
                return `skittish`;
            }
            if (wizard === "blue") {
                return `bewildering`;
            }
            if (wizard === "red") {
                return `mysterious`;
            }   





        default:
            return null;
    }
}