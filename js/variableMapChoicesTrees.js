// variableMapChoicesTrees.js

export function resolveTreesVariable(path, playerStats) {

const wizard = (playerStats.visitingBrother || "").toLowerCase();
const wizardYou = (playerStats.wizardColor || "").toLowerCase();

    switch (path) {
            
        case "treesArrive":
            if (wizard === "green") { return `The forest grows ever thicker as you press onwards. Ancient trunks crowd together, their branches weaving a living roof overhead that allows only shafts of silver light to reach the mossy floor. The air is cool and fragrant with damp earth, wildflowers and pine resin, while somewhere ahead you glimpse a soft silver glow shining through the trees.

Drawn onwards, you follow the light. At last the woodland parts, and you step into the largest clearing you have yet encountered.

The sight before you steals your breath. Gentle sunlight pours through the canopy, illuminating rolling meadows carpeted in wildflowers. Crystal streams meander between moss-covered stones, feeding tranquil pools where lilies bloom upon still water. Butterflies drift lazily through the air while deer, foxes, hares and brilliantly coloured birds wander the glade without the slightest fear of your presence.

At the far end of the clearing stands a magnificent temple unlike anything you have ever seen. Rather than being built upon the land, it seems to have grown from it. Towering oaks rise through walls of polished white stone entwined with flowering vines and twisting roots. Great archways are framed by living branches, while every surface is carved with leaves, beasts and flowing woodland patterns. The temple is timeless, as though it has stood here since the first seed ever took root.

Standing alone upon the broad woodland path leading towards the temple is the gigantic gatekeeper who first welcomed you into this realm. His great stag antlers reach high into the sunlight, their polished tines entwined with fresh ivy and tiny white blossoms. In one hand he carries an ancient staff of living wood whose bark bears green shoots and tender leaves.`;}
            if (wizard === "yellow") { return `The clouds ahead thicken until they become an unbroken wall of dazzling white. You press through and emerge into a magnificent sky platform, easily the largest you have yet encountered.

Bathed in warm golden sunlight, it stretches away in every direction like a kingdom suspended amongst the heavens. Wide avenues of polished cloudstone wind through immaculate gardens where crystal fountains cast glittering arcs into the air. Brilliant flowers sway gently in the breeze while birds wheel gracefully overhead, their songs filling the air with joyful music.

At the far end of the grounds rises an immense temple unlike anything you have ever seen. Its towering façade appears to have been carved directly from a living bank of cloud. Wisps of vapour drift continually across its walls, changing its appearance from moment to moment, yet somehow never altering its perfect form. The entire structure seems both solid and ethereal, as though it belongs equally to the skies and to platform on which it is rooted.

Standing alone upon the broad path leading to the temple is the gigantic gatekeeper who first welcomed you into this realm. His vast wings are folded behind him, and the head of his great lightning spear glows softly beneath the endless blue sky.`;}
            if (wizard === "blue") { return `You continue across the silver sands, the gentle waves of the star-soaked sea rolling endlessly beside you. Above, countless stars burn in a sky untouched by dawn or dusk, their light reflected in every grain of silver beneath your feet. Far ahead, standing alone upon the beach, is the colossal arch of polished black obsidian.

As you draw nearer, it seems strangely out of place.

Beyond it, and beside it, you can see nothing except the endless silver shoreline stretching away into the distance. There is break inf the scenery and seemingly no purpose to the archway. It is simply an immense arch standing alone upon the beach beneath the stars.

You need not passthrough it, but curiosity urges you towards it and soon you are passing beneath the enormous obsidian arch.

The world changes in a heartbeat. The endless shoreline vanishes, replaced by a magnificent celestial sanctuary hidden beyond the threshold. The silver beach gives way to broad avenues of polished black crystal bordered by tranquil reflecting pools that perfectly mirror the heavens above. Elegant sculptures of planets, comets and constellations line the pathways, while crystal braziers burn with pale silver flame. Tiny motes of starlight drift lazily through the air like wandering fireflies.

At the far end of the grounds stands a magnificent temple unlike anything you have ever seen. Its towering walls are fashioned from flawless black crystal veined with silver that glows softly from within. Great pillars rise like frozen shafts of starlight, while the entire façade is carved with swirling constellations, planets and celestial spheres. The temple feels impossibly ancient, as though it has stood here since the first stars were kindled.

Standing alone upon the broad crystal path leading towards the temple is the gigantic gatekeeper who first welcomed you into this realm. A crown of flawless crystal rests upon his brow, catching the starlight and scattering it into shifting rainbows. In one hand he carries a tall crystal staff that glows with a cool inner radiance. Around his immense form, tiny planets circle silently in perfect elliptical rings, each following its eternal course as though governed by laws older than time itself.`;}   
            
        case "treesTruePath":
            if (wizard === "green") { return `As you approach, the towering guardian straightens to his full height, his mighty antlers silhouetted against the sunlight filtering through the trees. His ancient wooden staff rests lightly in one hand, though you sense immense strength within it.

He raises one enormous hand.

"Come."

The single word is deep and ancient, carrying the quiet authority of the forest. He studies you with calm, knowing eyes.

"Your path has been true," he says. "So shall be your reward."

Lowering his staff, he gently touches its end to the earth.

Countless silver-blue motes rise from the moss like glowing seeds caught upon an unseen breeze. They dance together before settling into a shimmering trail that leads towards one of two magnificent temple doors.

The guardian steps aside and bows his head in silent invitation.`;}
            if (wizard === "yellow") { return `As you approach, the towering guardian slowly spreads his enormous wings until they cast long shadows across the path. His mighty lightning spear rests beside him, its crackling head humming with quiet power.

He raises one enormous hand.

"Come." The single word is deep and ancient, carrying the weight of the skies themselves. He studies you with calm, unreadable eyes.

"Your path has been true," he says. "So shall be your reward."

Lowering his spear, he touches its tip against the cloudstone path.

Countless silver-blue motes burst into the air like glowing fireflies. They swirl together before settling into a shimmering trail that leads towards one of two magnificent temple doors.

Without another word, the guardian steps aside and bows his head in silent invitation.`;}
            if (wizard === "blue") { return `As you approach, the towering guardian stands motionless beneath the endless stars. His crystal crown sparkles softly, while the tiny planets continue their silent orbit around him. His great crystal staff rests lightly in one hand, glowing with quiet power.

He raises one enormous hand.

"Come." The single word is deep and ancient, carrying the stillness of the heavens themselves. He studies you with calm, unreadable eyes.

"Your path has been true," he says. "So shall be your reward."

Lowering his staff, he gently touches its tip against the crystal path.

Countless silver-blue motes rise into the air like newborn stars. They swirl together before settling into a shimmering trail that leads towards one of two magnificent temple doors.

The guardian steps aside and bows his head in silent invitation.`;}   
            
        case "treesBothPaths":
            if (wizard === "green") { return `The great gatekeeper stands waiting upon the woodland path, his vast antlers reaching into the canopy above. His living staff rests quietly beside him.

As you approach a deep rumble rolls beneath the earth. Leaves tremble upon the branches, birds take flight in startled flocks and ripples race across the surface of the nearby pools. It is rift magic, utterly alien to this ancient woodland and it feels as though some unseen force has trespassed upon this sacred place.

The guardian remains perfectly still through the disturbance, and as it passes he extends one vast hand towards you.

"Come." His voice is as ancient and enduring as the forest itself. "You have trodden many paths to arrive at these gates," he says solemnly. "Now you must choose your next."

He lowers the end of his staff until it touches the earth.

A whirlwind of glittering motes bursts from the forest floor. They separate into two winding trails that weave gracefully between the flowers and streams towards the temple. One glows with cool silver-blue light, while the other shines with a rich silver-green radiance. Each comes to rest before one of the temple's great entrances.

The guardian steps aside and beckons for you to choose.`;}
            if (wizard === "yellow") { return `The giant gatekeeper stands waiting, his immense wings spread wide beneath the golden sunlight. His lightning spear crackles softly beside him.

Thunder rolls across the heavens. It echoes through the sky vibrating beneath your boots. It is rift magic, alien to the realm. It feels as though the unseen force is a trespasser upon this sacred place.

The guardian remains solid through the thunder, and as it passes he extends one vast hand towards you.

"Come." His voice is as ancient and immense, of the sky itself. "You have trodden many paths to arrive at these gates," he says solemnly. "Now you must choose your next."

He lowers the butt of his spear until it touches the ground.

A whirlwind of glittering silver motes erupts into the air. They separate into two shimmering streams that race towards the temple. One glows with cool silver-blue light, while the other carries a faint emerald-green radiance. Each trail ends before one of the temple's enormous doors.

The guardian steps aside and beckons for you to choose.`;}
            if (wizard === "blue") { return `The giant gatekeeper stands waiting upon the crystal path. Around him the tiny planets continue their silent dance while his crystal staff glows softly in the darkness.

As you approach, the stars themselves flicker unnaturally. A deep vibration passes through the crystal beneath your feet and faint cracks of violet light briefly appear in the air before fading once more. It is rift magic, utterly alien to this timeless realm. It feels as though some unseen force has trespassed upon the order of the heavens.

The guardian remains perfectly still throughout the disturbance, and as it passes he extends one vast hand towards you.

"Come." His voice is as ancient and immeasurable as the night sky itself. "You have trodden many paths to arrive at these gates," he says solemnly. "Now you must choose your next."

He lowers the end of his crystal staff until it touches the crystal path.

A whirlwind of glittering silver motes erupts around him. They separate into two shimmering streams that wind gracefully towards the temple. One glows with cool silver-blue light, while the other shines with a rich silver-green radiance. Each comes to rest before one of the temple's great entrances.

The guardian steps aside and beckons for you to choose.`;}   
            
        case "treesFalsePath":
            if (wizard === "green") { return `The giant guardian towers above you, his magnificent antlers framed by shafts of sunlight, his ancient wooden staff planted firmly beside him.

As you approach, the woodland erupts. A violent tremor races through the earth beneath your feet. Great trees sway as the ground bucks, throwing you sprawling amongst the moss and roots. Birds explode from the canopy while frightened deer vanish into the undergrowth. Rift magic, utterly foreign to this peaceful realm, tears through the forest like a wound.

The disturbance fades as quickly as it came, and throughout it all the gatekeeper has remained completely unmoving.

He extends one vast hand.

"Come." His voice is ancient and unyielding. "You have walked a difficult path," he says quietly. "And a difficult path lies ahead."

He lowers his staff until it touches the forest floor.

Silver-green lights bloom amongst the moss, flowing together into a radiant woodland trail that winds towards one of the temple's great entrances.

The guardian silently steps aside.`;}
            if (wizard === "yellow") { return `The giant guardian towers above you, his mighty wings stretched wide beneath the sunlight, his lightning spear planted firmly beside him.

As you approach the heavens erupt. A deafening crack of thunder tears across the sky, and the ground lurches violently beneath your feet. You are thrown heavily onto the cloudstone before managing to scramble back to your feet. Rift magic, alien to the realm. It feels as though the unseen force is a trespasser upon this sacred place.

The disturbance fades quickly as it came and only the gatekeeper had remained unmoving throughout the upheaval.

He extends one vast hand.

"Come." His voice is immense and ancient. "You have walked a difficult path," he says quietly. "And a difficult path lies ahead."

He lowers his spear until its point touches the path. Silver-green lights spill across the ground, dancing together into a radiant trail that winds towards one of the temple's great entrances.

The guardian silently steps aside.`;}
            if (wizard === "blue") { return `The giant guardian towers above you, his crystal crown gleaming beneath the stars, his great crystal staff planted firmly beside him while the tiny planets continue their silent orbit.

As you approach, the heavens erupt. The crystal path shudders violently beneath your feet. Great fractures of violet light race through the air, throwing you heavily onto the polished crystal. Rift magic, alien to this ancient realm, tears briefly through the fabric of reality itself. It feels as though the order of the cosmos has been violated.

The disturbance fades as quickly as it came, and throughout it all the gatekeeper has remained completely unmoving.

He extends one vast hand.

"Come." His voice is immense and ancient. "You have walked a difficult path," he says quietly. "And a difficult path lies ahead."

He lowers his crystal staff until it touches the path.

Silver-green lights bloom across the crystal beneath your feet, flowing together into a radiant trail that winds towards one of the temple's great entrances.

The guardian silently steps aside.`;}   
            
        case "treesEjected":
            if (wizard === "green") { return `As you near the waiting gatekeeper, the birds abruptly fall silent.

The warm sunlight fades as dark clouds gather unnaturally above the clearing. A low groan rolls through the earth beneath your feet before the entire forest convulses.

With a deafening crack, the ground splits apart. An enormous fissure tears through the sacred glade. Ancient trees topple into the widening chasm, their roots ripped from the earth. Crystal streams vanish into the darkness below, while moss, flowers and great slabs of stone collapse after them. Frightened animals flee in every direction as the woodland is ripped asunder.

Only the gatekeeper remains unmoved.

He plants his living staff before him and points it directly at you.

"Your path has been turbulent," he declares, his voice echoing through the breaking forest. "Your choices have damaged this realm. You must be gone."

With one mighty sweep of his staff, the air itself tears open. Reality parts, revealing a shimmering portal. Beyond it you glimpse the familiar grassy hill and the ancient Passing Stones. Passing through the portal will end your quest—but remaining here will surely doom this beautiful realm.

"Quickly!" the gatekeeper commands.

As the woodland collapses around you, you hurl yourself through the portal.

The tear in reality snaps shut behind you.

You land upon the soft grass beside the Passing Stones. They stand silent and lifeless. Their magic has faded, and you know instinctively that the strength required to hold them open no longer remains.

There will be no returning.

Your quest is over.`;}
            if (wizard === "yellow") { return `As you near the waiting gatekeeper, the sunlight fades as dark clouds race across the heavens with an unnatural speed. Thunder explodes overhead, shaking the very air around you. Then the ground splits apart with a deafening roar.

An enormous fissure tears through the temple gardens. Great sections of cloudstone collapse into the widening chasm, dissolving into swirling vapour as they fall. Crystal fountains vanish into the depths. Trees are torn from the earth. Flocks of startled birds burst into the sky in every direction.

The entire realm is coming apart.

Only the gatekeeper remains unmoved.

He plants his lightning spear before him and points it directly at you.

"Your path has been turbulent," he declares, his voice booming louder than the storm itself. "Your choices have damaged this realm. You must be gone."

With one mighty sweep of his spear, the air itself is sliced open.

Reality tears apart, revealing a shimmering portal. Beyond it you glimpse the familiar grassy hill and the ancient Passing Stones. Passing through the portal will end your quest—but remaining here will surely doom this beautiful realm.

"Quickly!" the gatekeeper commands.

The heavens continue to collapse around you. With no other choice, you hurl yourself through the portal.

The tear in reality snaps shut behind you.

You land upon the soft grass beside the Passing Stones. They stand silent and lifeless. Their magic has faded, and you know instinctively that the strength required to hold them open no longer remains.

There will be no returning.

Your quest is over.`;}
            if (wizard === "blue") { return `As you near the waiting gatekeeper, the stars begin to die. One by one they wink out, plunging the celestial sanctuary into gathering darkness. The crystal beneath your feet groans as great fractures race across the pathways, glowing with violent violet light.

Then reality splits apart. An enormous rift tears through the temple grounds. Crystal obelisks topple into the widening abyss. Reflecting pools spill into the darkness below, their perfect images of the heavens shattered. Great sections of the crystal walkways collapse away while the constellations above twist and distort as though the universe itself is beginning to unravel.

Only the gatekeeper remains unmoved.

He plants his crystal staff before him and points it directly at you.

"Your path has been turbulent," he declares, his voice echoing like the birth of worlds. "Your choices have damaged this realm. You must be gone."

With one mighty sweep of his staff, the air tears open.

Reality parts, revealing a shimmering portal. Beyond it you glimpse the familiar grassy hill and the ancient Passing Stones. Passing through the portal will end your quest—but remaining here will surely doom this beautiful realm.

"Quickly!" the gatekeeper commands.

As the celestial sanctuary collapses around you, you hurl yourself through the portal.

The tear in reality snaps shut behind you.

You land upon the soft grass beside the Passing Stones. They stand silent and lifeless. Their magic has faded, and you know instinctively that the strength required to hold them open no longer remains.

There will be no returning.

Your quest is over.`;}   
                        
        case "treesLeave":
            if (wizard === "green") { return `You follow the gatekeeper through the great doorway.

As you pass beyond the threshold, a gentle wave of ancient magic flows over you and you find yourself standing back in Carolinus's realm.

Towering trees surround an immense woodland fortress grown from living timber and grey stone. Great roots weave through its walls, flowering vines climb its towers and broad branches spread high above its rooftops as though the forest itself has embraced the keep.

You have arrived at your brother's keep. Unreachable without both invitation and the guidance of the gatekeeper.

You glance behind you. You are not surprised to find that the doorway has disappeared. Only the ancient forest remains, stretching away between shafts of warm sunlight with no sign that the hidden temple was ever there.

You turn back to see the gatekeeper waiting for you. He leads you up broad stone steps towards the entrance. He touches the broad oak doors with the living wood of his staff. The bark shimmers softly before dissolving into a curtain of glowing silver-green light.

"It is here that I leave you," says the gatekeeper. "Your brother awaits."

He bows his head before turning back towards the forest and descending the steps.

A sudden crack echoes through the woodland, followed by a brief flash of emerald light. You spin around to find the gatekeeper has gone.`;}
            if (wizard === "yellow") { return `You follow the gatekeeper through the great doorway. As you cross the threshold, you feel a transition and you stand once more beneath the endless blue skies of Lo Tae Zhao's realm.

Soft white clouds drift lazily overhead, while warm sunlight bathes everything in a golden glow. You find yourself standing upon a broad avenue of polished cloudstone leading towards an immense fortress. Its soaring towers and sweeping walls appear to have been carved from the very clouds themselves, each crowned with banners that dance in the ever-present breeze.

You have arrived at your brother's keep. Unreachable without both invitation and the guidance of the gatekeeper.

Curious, you glance back over your shoulder. You are not surprised to see that the doorway through which you entered has vanished. Instead, behind you stretches only the peaceful sky realm, its floating gardens and drifting clouds giving no hint of your passage to this place.

Turning back you see the gatekeeper waiting for you. He gatekeeper leads you up the broad steps to the fortress entrance, gently touching the great entrance with his staff. The cloudstone ripples like still water before becoming a shimmering curtain of silver light.

"It is here that I leave you," says the gatekeeper. "Your brother awaits."

He inclines his head before turning and descending the broad steps.

A sharp crack echoes through the sky behind you, followed by a brilliant flash of silver-blue light. You turn to find the gatekeeper has gone.`;}
            if (wizard === "blue") { return `You follow the gatekeeper through the great doorway.

As you cross its threshold, reality seems to fold gently around you and you find yourself back on the silver sands of Solarius's realm.

Before you rises an immense fortress of polished black obsidian and silver crystal. Its towering walls reflect the light of sea and stars, while crystal spires reach towards the heavens like shooting stars frozen in motion. The entire keep seems less constructed than perfectly formed, as though it had always belonged beneath this eternal night.

You have arrived at your brother's keep. Unreachable without both invitation and the guidance of the gatekeeper.

You glance behind you. You are not surprised to find that the doorway has disappeared. Only the endless silver beach stretches away beneath the stars, with the gentle waves quietly washing against their shores.

You turn back to see the gatekeeper waiting for you. He leads you up wide obsidian steps towards the fortress entrance. He raises his crystal staff and touches the smooth black stone. It ripples like the surface of a still pool before becoming a curtain of shimmering silver light.

"It is here that I leave you," says the gatekeeper. "Your brother awaits."

He inclines his head before turning away and descending the steps.

A single sharp crack breaks the silence of the night, followed by a brilliant flash of starlight. You spin around to find the gatekeeper has gone.`;}   
                        
        case "ENTER DETAILS":
            if (wizard === "green") { return ``;}
            if (wizard === "yellow") { return ``;}
            if (wizard === "blue") { return ``;}   
            
        case "ENTER DETAILS":
            if (wizard === "green") { return ``;}
            if (wizard === "yellow") { return ``;}
            if (wizard === "blue") { return ``;}  
            
         default:
            return null;
    }
}