// variableMapChoicesBathhouse.js

export function resolveShepherdsHutVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "hutName":
            if (wizard === "green") {
                return `shepherd's hut`;
            }
            if (wizard === "yellow") {
                return `smoke house`;
            }
            if (wizard === "blue") {
                return `lambing shed`;
            }
            if (wizard === "red") {
                return `burning village`;
            }

        case "hutGift":
            if (wizard === "green") {
                return `gloves`;
            }
            if (wizard === "yellow") {
                return `apron`;
            }
            if (wizard === "blue") {
                return `boots`;
            }
            if (wizard === "red") {
                return `mantle`;
            }            

        case "hutExplore":
            if (wizard === "green") {
                return `Explore the shepherd's hut?`;
            }
            if (wizard === "yellow") {
                return `Explore the smoke house?`;
            }
            if (wizard === "blue") {
                return `Explore the lambing shed?`;
            }
            if (wizard === "red") {
                return `Try and save the lady's father?`;
            } 

        case "hutIgnore":
            if (wizard === "green") {
                return `Ignore the hut and carry on south?`;
            }
            if (wizard === "yellow") {
                return `Ignore the smoke house and carry on south?`;
            }
            if (wizard === "blue") {
                return `Ignore the shed and carry on south?`;
            }
            if (wizard === "red") {
                return `Let the villagers deal with their own problems and carry on south?`;
            } 

        case "hutGiftTry":
            if (wizard === "green") {
                return `Would you like to try the gloves on?`;
            }
            if (wizard === "yellow") {
                return `Would you like to try the apron on?`;
            }
            if (wizard === "blue") {
                return `Would you like to try the boots on?`;
            }
            if (wizard === "red") {
                return `Would you like to check on the old man?`;
            }    
            
        case "hutGiftLeave":
            if (wizard === "green") {
                return `Would you rather leave the gloves and head back to the path?`;
            }
            if (wizard === "yellow") {
                return `Would you rather leave the apron and head back to the path?`;
            }
            if (wizard === "blue") {
                return `Would you rather leave the boots and head back to the path?`;
            }
            if (wizard === "red") {
                return `Would you rather press on and carry on south?`;
            }              

        case "shepherdsHutRoadside":
            if (wizard === "green") {
                return `The road winds steadily south through open countryside bordered by dry-stone walls and windswept fields. Your horse plods onwards at an easy pace while crows circle lazily overhead beneath the pale afternoon sky.

Before long you pass a small shepherd’s hut standing alone beside the road. The little structure is old but still sturdy, its timber walls darkened by years of rain and smoke. Thin curls of dried moss cling to the roof and a pile of neatly chopped firewood rests beneath one window.

The door sits slightly ajar and the earth around the door shows recent footprints, though nobody appears to be home presently.`;
            }
            if (wizard === "yellow") {
                return `The road bends between low green hills dotted with grazing sheep and crooked hawthorn trees. Your horse moves steadily onwards while the smell of damp earth and woodsmoke hangs in the cool country air.

Ahead, beside a narrow stream, stands a squat stone smokehouse with a tall black chimney rising above its slate roof. Thin ribbons of smoke finger the sky and the rich scent of cured meat carries clearly on the breeze.

The building is clearly in use, although no workers can be seen nearby and the heavy oak door stands slightly open.`;
            }
            if (wizard === "blue") {
                return `The road winds steadily south through open countryside bordered by dry-stone walls and windswept fields. Your horse plods onwards at an easy pace while crows circle lazily overhead beneath the pale afternoon sky.

Before long you pass a derelict lambing shed standing beside the road. Its weather-beaten timber walls are and silvered with age, while roofing slats lay crooked and gappy like broken teeth. A faint smell of animal remains drifting from the half-open doorway.`;
            }
            if (wizard === "red") {
                return `The road descends into a shallow wooded valley where the evening air grows thick with smoke.

                At first you think it is only somebody burning brushwood, but as you round a bend you suddenly see flames roaring high above the treeline ahead. A large farmhouse stands ablaze beside the road, its upper floor completely engulfed in fire.

                Villagers rush frantically back an forth with buckets filled from water troughs while terrified horses scream inside a nearby stable. Sparks whirl upwards into the smoke darkened sky and the heat strikes your face even from a distance.

                A woman covered in soot points desperately towards the burning house.

                ‘My father’s still inside!’ she cries.`;
            }

        case "shepherdsHutInterior":
            if (wizard === "green") {
                return `Inside the single-room interior is dim but surprisingly tidy. A small iron stove stands cold in the corner beside a narrow cot draped in rough wool blankets. Lantern hooks hang from the ceiling beams and bundles of dried herbs sway gently in the breeze drifting through the open door.

A shepherd clearly still uses this place from time to time.

Something feels off to you, and it takes you a moment to realise what. Resting neatly upon the wooden table, is a pair of fitted black leather gloves reinforced across the knuckles with dark iron studs. They are finely made and appear freshly polished without a mark upon them. They look entirely out of place in such a humble hut. 
`;
            }
            if (wizard === "yellow") {
                return `You step inside the smokehouse and are immediately met by the thick smell of salt, ash and smoked meat.

The interior is warm and hazy with lingering smoke. Iron hooks hang from dark ceiling beams and rows of cured meats sway gently above slow-burning fire pits. Chopping blocks stained dark with years of use stand beside racks of knives and heavy cleavers.

Whoever works here clearly takes pride in their craft.

Resting upon one of the butcher’s tables is a stained leather apron reinforced with thick black stitching across the chest and waist. Though worn and scarred from years of hard labour, it appears exceptionally well made.
`;
            }
            if (wizard === "blue") {
                return `Inside the lambing shed is dim and cool. Sunlight pierces through gaps in the timber walls, illuminating the straw scattered across the floor. Empty feeding troughs line one wall and rusted farm tools hang forgotten from wooden pegs.

                The shed appears long abandoned, yet, resting neatly upon a clean bed of straw near the back wall is a pair of black leather riding boots. They are polished to a mirror shine without a speck of dust upon them.
                `;
            }
            if (wizard === "red") {
                return `You wrap cloth around your mouth and force your way into the burning farmhouse.

                Inside, the heat is suffocating. Thick smoke rolls across the ceiling while blazing beams crack and spit overhead. Furniture burns fiercely around you and every breath tastes of ash.

                At the far end of the room you find an elderly man trapped beneath a fallen support beam. Gritting your teeth, you heave the timber aside and drag him towards the doorway just as part of the ceiling collapses behind you in a shower of sparks.

                You stumble outside moments before the upper floor caves in entirely.

                The villagers rush forwards to help the old man while the soot-covered woman clasps your hands gratefully.
`;
            }

        case "shepherdsHutGift":
            if (wizard === "green") {
                return `You pick up the leather gloves and turn them over in your hands. As you do, a folded note slips from inside one of them and falls to the floor.

                It reads:

                ‘Jane, you say you have found the key to entering the brothers’ realm. Well, I have found a doorway for your key. It is not far from here. Head south. The stones have been sighted. K.’

You read the message again before slipping it into your pack.

Curious now, you pull on the gloves. The leather is supple and fits perfectly, tightening comfortably around your hands and wrists as though crafted specifically for you.

At once you feel steadier and more controlled. Your grip strengthens and your movements become sharper and more precise.

The gloves are undoubtedly magical.


GAIN ITEM
Reinforced Leather Gloves
`;
            }
            if (wizard === "yellow") {
                return `You lift the heavy apron from the table and discover a folded scrap of parchment tucked behind in its pocket.
It reads:

‘Jane, you say you have found the key to entering the brothers’ realm. Well, I have found a doorway for your key. It is not far from here. Head south. The stones have been sighted. K.’

You read the message again before slipping it back in the pocket.

You slip the apron over your shoulders and pull the straps tight. The leather settles heavily against your body, but instead of restricting your movement it makes you feel agile, lighter, like your movements have been honed by years of focused practice.

The apron is undoubtedly magical.

GAIN ITEM
Butcher’s Apron
`;
            }
            if (wizard === "blue") {
                return `As you sit down upon an overturned feed bucket to pull on the riding boots a note falls out of them. 

‘Jane, you say you have found the key to entering the brothers’ realm, well I have found a doorway for your key. It is not far from here. Head south. The stones have been sighted. K.’

You drop the note and slip the boots on. The leather is supple, moulding comfortably to your feet as though made specially for you.

As you stand, you feel lighter and more balanced. Your movements become sharper, quicker and precise. The boots are undoubtedly magical.


GAIN ITEM:
Riding Boots
`;
            }
            if (wizard === "red") {
                return `The old man coughs heavily before removing a scorched leather mantle from around his shoulders.

Though blackened by smoke, the garment is remarkably untouched by the flames. Strange red stitching runs along its inner seams and faint warmth radiates from the leather.

‘Take it,’ the old man wheezes. ‘Kept me alive through two fires already. Seems it’s chosen you now.’

You place the mantle across your shoulders and immediately feel a comforting light steadiness spread through your body.

The item is undoubtedly magical.


GAIN ITEM
Emberhide Mantle
`;
            }            

        default:
            return null;
    }
}