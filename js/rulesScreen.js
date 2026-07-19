// rulesScreen.js

export function showRulesScreen(container, onContinue) {

    container.innerHTML = "";

    function applyPortraitMode() {

        const gameDiv = document.getElementById('game');
        if (!gameDiv) return;

            gameDiv.style.width = "100vw";
            gameDiv.style.maxWidth = "820px";

            gameDiv.style.aspectRatio = "3 / 4";
            gameDiv.style.height = "auto";
            gameDiv.style.margin = "0";
            gameDiv.style.overflowY = "auto";
            gameDiv.style.overflowX = "hidden";
            gameDiv.style.border = "1px solid #444";
            gameDiv.style.padding = "10px";
            gameDiv.style.borderRadius = "30px";
            gameDiv.style.backgroundImage = "url('./images/paper.jpg')";
            gameDiv.style.backgroundSize = "cover";
            gameDiv.style.backgroundPosition = "center";
            document.body.style.backgroundColor = "black";

    }

    applyPortraitMode();

    const wrapper = document.createElement("div");
    wrapper.style.padding = "20px";
    wrapper.style.maxWidth = "600px";
    wrapper.style.margin = "0 auto";
    wrapper.style.lineHeight = "1.6";
    
    // ------------------------------------------------
    // Helpers
    // ------------------------------------------------
    function imageRow(...images) {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "center";
        row.style.alignItems = "flex-start";
        row.style.gap = "20px";
        row.style.margin = "15px 0";

        images.forEach(([file, width]) => {
            const img = document.createElement("img");
            img.src = `icons/${file}`;
            img.style.width = width;
            row.appendChild(img);
        });

        wrapper.appendChild(row);
    }

    function heading(text) {
        const h = document.createElement("h2");
        h.textContent = text;
        h.style.marginTop = "20px";
        h.style.marginBottom = "10px";
        h.style.textAlign = "center";
        wrapper.appendChild(h);
    }

    function section(title) {
        const h = document.createElement("h3");
        h.textContent = title;
        h.style.marginTop = "20px";
        h.style.marginBottom = "8px";
        wrapper.appendChild(h);
    }

    function paragraph(text = "TEXT HERE") {
        const p = document.createElement("p");
        p.innerHTML = text;
        p.style.textAlign = "justify";
        wrapper.appendChild(p);
    }

    function divider() {
        const hr = document.createElement("hr");
        hr.style.margin = "20px 0";
        hr.style.border = "0";
        hr.style.borderTop = "1px solid #888";
        wrapper.appendChild(hr);
    }

    function image(file, width = "100%") {
        const img = document.createElement("img");
        img.src = `icons/${file}`;
        img.style.display = "block";
        img.style.width = width;
        img.style.margin = "15px auto";
        wrapper.appendChild(img);
    }

    function iconRow(icon, text) {

        const row = document.createElement("div");

        row.style.display = "flex";
        row.style.alignItems = "flex-start";
        row.style.gap = "10px";
        row.style.marginBottom = "8px";

        const img = document.createElement("img");
        img.src = `icons/${icon}`;
        img.style.width = "22px";
        img.style.height = "22px";
        img.style.mixBlendMode = "multiply";

        const span = document.createElement("div");
        span.innerHTML = text;

        row.appendChild(img);
        row.appendChild(span);

        return row;
    }

    // ------------------------------------------------

    const btnSkip = document.createElement("button");

    btnSkip.textContent = "Skip";

    btnSkip.style.display = "block";
    btnSkip.style.margin = "0";
    btnSkip.style.width = "80px";
    btnSkip.style.height = "30px";
    btnSkip.style.backgroundColor = "#424141";
    btnSkip.style.color = "#d7d4d4";
    btnSkip.style.border = "1px solid #555";
    btnSkip.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    btnSkip.style.borderRadius = "6px";
    btnSkip.style.cursor = "pointer";
    btnSkip.style.fontSize = "20px";

    btnSkip.onclick = onContinue;

    wrapper.appendChild(btnSkip);

const imageContainer = document.createElement("div");

imageContainer.innerHTML = `
    <img
        src="mapImages/crown.jpg"
        style="
            width:100%;
            max-width:325px;
            display:block;
            margin:0 auto 10px;
            mix-blend-mode:multiply;
        ">
`;

wrapper.appendChild(imageContainer);
 
    heading("THE RED CROWN");

    paragraph(`Magic is dying.

As humanity embraces science and reason, the ancient realms of enchantment are fading into legend. Only one desperate hope remains. Four immortal brothers once ruled the Pillars of Magic together, but one has turned way from magical unity, believing that mankind's thirst from progress can be turned in his favour making him master of both worlds.

To preserve magic forever, the remaining brothers must unite their kingdoms and form a hidden Realm of Magic—but this they can not do without first seizing their brother's power.

The fate of every magical creature, every forgotten legend and every enchanted realm now rests upon a single quest.
<br><br>
The quest for the Red Crown...`);

    divider();

    heading("HOW GAMEPLAY DIFFERS FROM STANDARD FIGHTING FANTASY");

    section("CHARACTERS");
    paragraph(`You can play the game as one of four wizards. Each wizard has their own abilities and affinities. One wizard may be great at casting one spell group, while another might struggle with the same spells.
Your choice of wizard will also affect gameplay. Not all encounters, items and enemies are the same for every wizard, and there are some areas of the game that one wizard can reach that another cannot, meaning the game may play differently depending on your choice of character.
`);

    divider();

    section("HORSES");
    paragraph(`You will start the game with a horse. Your choice of horse will also have an effect on gameplay, your stats and your carrying capacity. Choose your horse wisely.`);

    divider();

    section("COMBAT");

    paragraph(`<strong>SKILL</strong>: While you will still roll against your SKILL for melee combat, the mechanism for success differs. To land a physical hit in a combat round, you must roll two dice. If the number rolled is equal to or less than your current SKILL, you have performed a successful hit.
Enemies roll in the same way (although not always with two dice), which means that in a single combat round both a player and an enemy may land a successful blow.
`);

    paragraph("<strong>MAGIC</strong>:You will start the game with a spellbook from which you will be able to cast spells during combat. Each spellbook contains five spells, one from each of the following categories:");

    wrapper.appendChild(
        iconRow(
        "magicAttack.svg",
        "<strong>Attack Spells</strong> – These are quick-fire, low to medium damage spells suited to aggressive play. Attack spells will only ever target a single enemy."
        )
    );

    wrapper.appendChild(
    iconRow(
        "explosive.svg",
        "<strong>Explosive Spells</strong> – As the name suggests, these spells pack a big punch. They target only a single enemy but are often powerful enough to kill outright."
        )
    );

    wrapper.appendChild(
    iconRow(
        "slowBurn.svg",
        "<strong>Slow Burn Spells</strong> – These are low-damage spells that continue to inflict damage over several combat rounds. Depending on a caster's affinity with this type of magic, Slow Burn spells may also have a wide area of effect, causing damage to multiple enemies at once."
        )
    );

    wrapper.appendChild(
    iconRow(
        "defence.svg",
        "<strong>Defence Spells</strong> – These spells are used to reduce your chances of taking damage. They usually work by affecting an enemy's chance to hit you, or the strength with which they can hit, rather than directly affecting your own statistics."
        )
    );

    wrapper.appendChild(
    iconRow(
        "special.svg",
        "<strong>Other Spells</strong> – These vary greatly. See the individual spell descriptions for details of their effects."
        )
    );

    paragraph("<strong>POTIONS</strong>: You will have access to potions during combat. Using a potion in battle will cost you one combat round.");

    paragraph("<strong>ITEMS</strong>: There are also combat items in the game. As with potions, using an item during combat will cost you one combat round.");

    paragraph(`<strong>SPECIAL EFFECTS</strong>: Some spells and items have lingering effects. While potions and items are active, they will be displayed in the Player Effects bar at the top of the screen.
Spell effects will also appear in the Player Effects bar if they affect the player, or in the relevant enemy cell if they affect an enemy.
`);

    image("playerEffectBar.jpg", "520px");
    image("enemyEffect.jpg", "220px");

    paragraph(`<strong>ESCAPING</strong>: In some combats you will be given the option to escape. If escape is possible, an Escape button will appear in the player dice cell after three rounds of combat.
Be warned: should you choose this option, any remaining combatants will each receive a free attack against you with an increased SKILL as you turn your back on them.
`);

    image("escapeImage.jpg", "220px");

    paragraph(`<strong>GROUP COMBAT</strong>: In many battles you will face more than one opponent. In these situations, all enemies attack simultaneously as individuals rather than as a single group.
You can fight up to six enemies at once. If there are more than six, the remaining enemies will stay on the fringes of the battle and wait until space becomes available before joining the fight.
`);

    paragraph(`<strong>RANGED COMBAT</strong>: In some situations enemies will remain out of your reach and attack from a distance. While you cannot attack them directly, they will flee if you defeat all other opponents.
A ranged enemy will appear in grey on the combat sheet.
`);

    paragraph("<strong>LUCK</strong>: You may not use LUCK in battle unless specifically instructed to do so by the use of an item, potion or spell.");

    divider();

    section("COMPANIONS");

    paragraph(`It is possible to recruit companions during the game to fight alongside you.
When a companion is active, they will appear in the Player Stats box.
Companions do not roll for attacks like players and enemies. Instead, they have a percentage chance to hit and be hit. They also do not have a STAMINA score. Instead, they can withstand a certain number of successful hits before being forced to leave the combat.
Some companions will die once they reach their hit limit, while others will retreat to lick their wounds, ready to return and fight alongside you in the next battle.
You may fight with multiple companions at the same time.
`);

    image("companion.jpg", "220px");

    divider();

    section("MAGIC");

    paragraph(`There are two types of magic in the game: Spellbooks and Scrolls.
Spellbooks are used in combat, while Scrolls are intended for general use.
All magic costs MAGIC points. Every scroll has both a magic cost and a number of charges. The magic cost is the number of MAGIC points required to cast it, while the number of charges determines how many times it can be used.
Each use consumes both the stated MAGIC cost and one charge. For example, if a scroll has two charges and costs two MAGIC points, each casting will cost two MAGIC points and consume one charge.
`);

    paragraph(`<strong>COMBAT MAGIC COST</strong>: Casting spells during combat costs 2 MAGIC points.
This cost is charged once per combat, not once per spell. Therefore, if you choose to cast spells during a battle, you will spend 2 MAGIC points whether you cast one spell or twenty.
`);

    divider();

    section("INVENTORY");

    paragraph(`Your inventory is divided into two sections: the items you are wearing or carrying on your person, and the combined contents of your backpack and saddlebags.
The amount you can carry is limited by the combined capacity of your backpack (eight items) and your horse's carrying capacity. Once this limit is reached, you must sell or discard items before carrying anything else.
For the purposes of the game, your backpack and saddlebags are treated as one inventory. You do not need to take your horse shopping with you.
`);

    paragraph(`<strong>WORN ITEMS</strong>: You can also equip items. Equipped items are considered worn and do not consume inventory space.
There are twelve Worn Item slots, each intended for a different type of equipment. There is also one Carried slot that may hold a single miscellaneous item.
`);

    image("wornItems.jpg", "520px");

    paragraph("<strong>WORN ITEM NOTATION</strong>");

    const wornGrid = document.createElement("div");
    wornGrid.style.display = "grid";
    wornGrid.style.gridTemplateColumns = "1fr 1fr";
    wornGrid.style.columnGap = "25px";
    wornGrid.style.rowGap = "6px";
    wornGrid.style.marginTop = "10px";
    wornGrid.style.marginBottom = "15px";

    [
        ["wornHead.svg", "Head Gear"],
        ["wornStaff.svg", "Staffs, Wands and Shards"],
        ["wornHands.svg", "Gloves or Gauntlets"],
        ["wornWeapon.svg", "Weapons"],
        ["wornTorso.svg", "Robes, Coats, Cloaks, Armour"],
        ["wornShield.svg", "Shields"],
        ["wornFeet.svg", "Footwear"],
        ["wornBook.svg", "Spellbooks"],
        ["wornRing.svg", "Ring Slot 1"],
        ["wornGlasses.svg", "Glasses and Monocles"],
        ["wornRing.svg", "Ring Slot 2"],
        ["wornCarried.svg", "Miscellaneous Equipped Item"],
        ["wornNeck.svg", "Necklaces, Pendants, Some Companions"],
        ["wornPurse.svg", "Gold and Coins"]
    ].forEach(([icon, text]) => {
        wornGrid.appendChild(iconRow(icon, text));
    });

    wrapper.appendChild(wornGrid);

    paragraph("<strong>INVENTORY FILTERS</strong>");

    image("inventoryButtons.jpg","520px");

    wrapper.appendChild(iconRow("wornBook.svg","Spellbooks"));
    wrapper.appendChild(iconRow("wornTorso.svg","Clothing – Robes, Armour, Gloves, Gauntlets, Boots, Helmets, Hats etc."));
    wrapper.appendChild(iconRow("wornRing.svg","Jewellery – Rings, Pendants, Lockets, Necklaces"));
    wrapper.appendChild(iconRow("wornPotion.svg","Potions, Salves, Ointments"));
    wrapper.appendChild(iconRow("wornScroll.svg","Scrolls"));
    wrapper.appendChild(iconRow("wornCarried.svg","Miscellaneous Items"));
    wrapper.appendChild(iconRow("wornWeapon.svg","Weapons – Sword, Daggers, Axes, Clubs, Wands, Shards, Staffs"));

    divider();

    section("SPELLBOOKS");

    paragraph(`When a spellbook is opened, its contents are displayed as a series of spell cards. Clicking on one of these cards will display the full details of that spell.`);

    imageRow(
        ["spellbook.jpg", "220px"],
        ["spellcard.jpg", "220px"]
    );

    paragraph("<strong>SPELL ATTRIBUTES</strong>: All spells have the following attributes, although many may be set to zero.");

    wrapper.appendChild(iconRow("meleeAttack.jpg","Attack Strength (Damage)"));
    wrapper.appendChild(iconRow("duration.jpg","Duration"));
    wrapper.appendChild(iconRow("aoe.jpg","Area of Effect"));
    wrapper.appendChild(iconRow("risk.jpg","Chance of Spell Failure"));

    divider();

    section("ITEM ABILITIES");

    paragraph(`Some items possess special abilities. These abilities only take effect while the item is equipped in your Carried slot.`);

    divider();

    section("GAMEPLAY");

    paragraph(`There are many routes through the game.
Enjoy.
`);

    // ------------------------------------------------

    const btn = document.createElement("button");

    btn.textContent = "Continue";

    btn.style.display = "block";
    btn.style.margin = "30px auto 10px";
    btn.style.width = "180px";
    btn.style.height = "40px";
    btn.style.backgroundColor = "#424141";
    btn.style.color = "#d7d4d4";
    btn.style.border = "1px solid #555";
    btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "20px";

    btn.onclick = onContinue;

    wrapper.appendChild(btn);

    container.appendChild(wrapper);
}