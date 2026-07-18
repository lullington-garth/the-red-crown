// variableMapChoicesPeck.js

export function resolvePeckVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "peckMeetChoice1":
            if (wizard === "green") { return `Leave Puck to his herd and cross the grassy field to the paths on the far side?`;}
            if (wizard === "yellow") { return `Leave Puck to his herd and cross the cloud-dusted field to the bridges on the far side?`;}
            if (wizard === "blue") { return `Leave Puck to his herd and make your way out of the cove?`;}   

        case "graffleFleeceColour":
            if (wizard === "green") { return `brown mossy`;}
            if (wizard === "yellow") { return `brilliant white`;}
            if (wizard === "blue") { return `black glossy`;}   

        case "graffleGraze":
            if (wizard === "green") { return `lush grassy ground`;}
            if (wizard === "yellow") { return `cloud-misted ground`;}
            if (wizard === "blue") { return `gently lapping waters`;}             

        case "peckInfoChoice1":
            if (wizard === "green") { return `Thank him for his time and follow the paths beyond the flock?`;}
            if (wizard === "yellow") { return `Thank him for his time and head towards the three bridges beyond the flock?`;}
            if (wizard === "blue") { return `Thank him for his time and head out of the silver sands of the cove?`;}   

        case "peckInfo":
            if (wizard === "green") { return `He points towards the distant slopes of Ditchdown Valley.

"There's a witch lives in a cave over there. Morwen they call her. Comes down to the village every now and then for salt, candles and such. Reckons the boundaries between the realms are thinning. Says she can hear voices through the stone walls of her cave when the moon's right."

He scratches at his beard.

"Down in the woods south of here there's a band of vigilantes camped among the trees. Say they're hunting smugglers and thieves, though some folk reckon they enjoy the chasing more than the catching. Morwen says they've been wandering too close to the weak places between the worlds."

He glances towards the north.

"Tabby Allwhit nearly scared herself witless a few days ago. Found a tear in the air beside the stepping stones at Rackleburn Brook. Said she looked through and saw some enormous fellow with great horns upon his head standing guard over a path between two silver oaks."

He shrugs.

"Mind you, Morwen reckons Tabby enjoys the odd mushroom off the gatepost, so who can say?"

When Puck finally finishes his rambling tale, will you:
`;}
            if (wizard === "yellow") { return `He points towards a distant platform upon which stands a small cottage.

"Old Mr Rivers comes over from the shop sometimes. If he's right, they're moving prisoners through the realms over there."

He points towards another platform where soldiers stand among several wagons.

"Risky business, making something that's already weak even weaker, but that's their affair."

He scratches his chin thoughtfully.

"Saw Tabby Allwhit over on the old Coldridge Plateau the other day. She was peering through a tear right there in the sky. Nearly frightened her to death, it did. Said she saw some enormous man with great horns upon his head guarding a path between two silver oaks."

He shrugs.

"Mind you, Mr Rivers says she does enjoy the sauce."

When Puck finally finishes his rambling tale, will you:`;}
            if (wizard === "blue") { return `He points towards the distant line of pale dunes.

"There's a fellow named Elias Vane living out among the Silver Sand Dunes. Makes his living scavenging whatever the tide leaves behind. Driftwood, wreckage, old bottles, bits of ships and such. Says the sea brings him things from places that don't belong on any map. Claims he once found a bell covered in writing that changed every time he looked at it."

He scratches his chin thoughtfully.

"There's a little island off the coast where the locals have started leaving offerings. Fish, flowers, carved charms and the like. They say it's to keep some great kraken sleeping beneath the waves. Elias reckons folk only started doing it after strange lights began appearing offshore. Dangerous business inviting monsters into your home."

He glances towards the hills.

"Tabby Allwhit nearly frightened herself senseless down in Finger Cave a few days ago. Said she found a tear hanging in the darkness and looked straight through it. Claimed she saw some enormous man with great horns upon his head guarding a path between two silver oaks."

He shrugs.

"Mind you, Elias says Tabby does enjoy licking the mould off of pancakes, so who can say?"

When Puck finally finishes his rambling tale, will you:
`;}   
                     
        case "peckRealmStaff":
            if (wizard === "green") { return `Do you possess the Tanglewood Staff?`;}
            if (wizard === "yellow") { return `Do you possess the Sky Shard?`;}
            if (wizard === "blue") { return `Do you possess the Crystal Shard?`;}   
            
        case "peckRealmStaffName":
            if (wizard === "green") { return `Tanglewood Staff`;}
            if (wizard === "yellow") { return `Sky Shard`;}
            if (wizard === "blue") { return `Crystal Shard`;}   
            
        case "peckTradeCoice":
            if (wizard === "green") { return `You carefully pick your way through the flock towards the paths on the far side of the field.`;}
            if (wizard === "yellow") { return `You carefully pick your way through the flock towards the three bridges on the far side of the platform.`;}
            if (wizard === "blue") { return `You carefully pick your way through the flock, cross the silver sands and leave the cove.`;}   
            
        case "peckLeave":
            if (wizard === "green") { return `Beyond the settlement, three narrow paths lead away across the hillside, winding between rocks, heather and patches of coarse grass.

The first path descends towards a bubbling stream where a line of worn stepping stones crosses the water. A faint haze hangs above the stones, blurring the air, and now and then the mist seems to ripple despite the stillness of the valley.

The second path disappears into a small but dense wood. Between the trunks you can make out several men dressed in greens and browns, their cloaks and tunics blending almost perfectly with the foliage. A small campfire burns beneath the trees, its smoke drifting lazily through the branches.

The final path leads into a picturesque valley lined with ancient trees whose branches meet overhead. Sunlight filters through the leaves and dances across the grass, while high upon the far hillside you can just make out what appears to be the mouth of a cave set amongst the rocks.

Which area will you visit next?`;}
            if (wizard === "yellow") { return `On the far side of the platform, three further bridges stretch out through the clouds, spanning the skies far above the unseen lands below.

The first bridge leads to the smallest plateau you have yet seen in the settlement, barely large enough to turn a horse upon. The air above it shimmers, and thin lines seem to ripple through the sky.

The second bridge leads to a busy platform where soldiers stand in groups beside several wagons. The cloud is thick there, yet the soldiers have still managed to light a fire that spits and hisses as the mist rolls across it.

The final bridge leads to a pleasant cottage standing alone upon its platform. A table and stall have been set up outside, and the steady flow of visitors suggests that it serves as the settlement's shop.

Which area will you visit next?`;}
            if (wizard === "blue") { return `Beyond the edge of the settlement, the silver shoreline stretches away beneath the stars, its pale sands gleaming softly in the strange light above.

The first landmark to catch your eye is a tall, crooked pillar of rock that rises from the shore like a bent finger pointing accusingly towards the heavens. Its jagged silhouette stands black against the star-filled sky.

A little farther along the coast lies a small island, which you judge must be reachable only when the silver waters retreat. A handful of buildings stand scattered upon the rocky ground, while near the centre rises what appears to be the mast of a ship or perhaps some tall wooden pole reaching towards the stars.

Beyond the island, the shoreline continues into the distance. A lone man wanders the beach picking up items and taking his findings back to the rough driftwood shack where he appears to be living.

Which area will you visit next?`;}   
            
        case "peckLeaveChoice1":
            if (wizard === "green") { return `The shimmering stepping stones?`;}
            if (wizard === "yellow") { return `The tiny plateau with the shimmering air?`;}
            if (wizard === "blue") { return `The crooked finger-like rock?`;}   
            
        case "peckLeaveChoice2":
            if (wizard === "green") { return `The wooded area occupied by the men in forest colours?`;}
            if (wizard === "yellow") { return `The platform occupied by soldiers?`;}
            if (wizard === "blue") { return `The small island with the mast?`;}   
            
        case "peckLeaveChoice3":
            if (wizard === "green") { return `The valley with the distant cave?`;}
            if (wizard === "yellow") { return `The platform containing the village shop?`;}
            if (wizard === "blue") { return `The beach comber in his driftwood shack?`;}   
                        
        default:
            return null;
    }
}