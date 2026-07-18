// renderWornItems.js
import { getGold } from './gold.js';
import { hasMagicVision } from './inventoryUI.js';
import { hasDoomVision } from './inventoryUI.js';

export function renderWornItems({
    playerStats,
    slotConfig,
    getItemDisplayParts,
    getWizardDefaultItem,

    onView,
    onViewSpells,
    onCompare,
    onUnequip,
    onUse,
    onViewPurse
}) {
    const wizardGlowColors = {
        Blue: "#424141",
        Green: "#424141",
        Yellow: "#424141",
        Red: "#424141"
    };

    const wizardHeaderColors = {
        Blue: "#424141",
        Green: "#424141",
        Yellow: "#424141",
        Red: "#424141"
    };

    const wornDiv = document.createElement("div");

    // GRID
    wornDiv.style.display = "grid";
    wornDiv.style.gridTemplateColumns = "repeat(7, 1fr)";
    wornDiv.style.gridTemplateRows = "auto repeat(2, 115px)"; // header row + items
    wornDiv.style.width = "98%";
//    wornDiv.style.backgroundColor = "#f0f2f5f0";
    wornDiv.style.border = "1px solid #444";
    wornDiv.style.borderRadius = "10px";
    wornDiv.style.fontSize = "13px";
    wornDiv.style.padding = "6px";
    wornDiv.style.gap = "2px";

    // HEADER
    const wornHeader = document.createElement("h2");
    const glowColor = wizardGlowColors[playerStats.wizardColor] || "#e9a540c5";
    const headerColor = wizardHeaderColors[playerStats.wizardColor] || "#336d5ef0";

    wornHeader.textContent = "Worn Items";
    wornHeader.style.textAlign = "center";

    // ✅ span full width instead of forcing width
    wornHeader.style.gridColumn = "1 / -1";
    wornHeader.style.gridRow = "1";

    wornHeader.style.backgroundColor = headerColor;
    wornHeader.style.border = "1px solid #444";
    wornHeader.style.color = "#d7d4d4";
    wornHeader.style.padding = "10px";
    wornHeader.style.borderRadius = "10px";
    wornHeader.style.margin = "2px";
//    wornHeader.style.boxShadow = `0 0 10px 2px ${glowColor}`;

    wornDiv.appendChild(wornHeader);

    const inv = playerStats.inventory;

    slotConfig.forEach(slot => {
        const item = inv.wornItems[slot.key];
        const isPurse = slot.key === "purse";

        const row = document.createElement("div");

        // CELL STYLE
        row.style.border = "1px solid #444";
//        row.style.backgroundColor = "#fafbfdf0";
        row.style.padding = "5px";
        row.style.borderRadius = "6px";
        row.style.borderColor = "#555";
        row.style.color = "#424141";
        row.style.display = "flex";
        row.style.flexDirection = "column";
        row.style.height = "100px";
        row.style.minHeight = "0";

        // ✅ important grid fix
        row.style.minWidth = "0";

        // Equipped styling
        if (item && item.status !== "cursed") {
//            row.style.backgroundColor = "#ffffff";
            row.style.borderColor = "#9a9a9bf0";

            const glowColor = wizardGlowColors[playerStats.wizardColor] || "#e9a540c5";
            row.style.boxShadow = `0 0 10px 2px ${glowColor}`;

            row.style.color = "#34363bf0";
        }

        // Cursed styling
        if (item && item.status === "cursed" && item["stat-mod-type"] === "equipped") {
            row.style.backgroundColor = "#4b4646a7";
            row.style.color = "#f7f0f0d7";
            row.style.borderColor = "#000000f0";
            row.style.boxShadow = "0 0 10px 2px #000000ee";
        }

        if (isPurse) {
//            row.style.backgroundColor = "#ffffff";
            row.style.borderColor = "#9a9a9bf0";

            const glowColor = wizardGlowColors[playerStats.wizardColor] || "#e9a540c5";
            row.style.boxShadow = `0 0 10px 2px ${glowColor}`;

            row.style.color = "#34363bf0";
        }

        // -------------------
        // DISPLAY DATA
        // -------------------
        let displayParts;

        if (item) {
            displayParts = getItemDisplayParts(item, true);
        } else {
            displayParts = {
                icon: null,
                name: getWizardDefaultItem(slot.key, playerStats.wizardColor),
                stats: ""
            };
        }

        const label = document.createElement("div");

        if (item && !item.identified) {
            label.style.color = "#424141";
        }

        // SLOT LINE
        const slotLine = document.createElement("div");
        slotLine.style.display = "flex";
        slotLine.style.alignItems = "center";
        slotLine.style.gap = "6px";

        let baseKey = slot.key.startsWith("ring") ? "ring" : slot.key;
        const formattedKey = baseKey.charAt(0).toUpperCase() + baseKey.slice(1);

        const slotIcon = document.createElement("img");
        slotIcon.src = `images/worn${formattedKey}.svg`;
        slotIcon.alt = slot.key;
        slotIcon.style.width = "20px";
        slotIcon.style.height = "20px";

        slotLine.appendChild(slotIcon);

        const colon = document.createElement("span");
        colon.textContent = ":";
        slotLine.appendChild(colon);

//const isPurse = slot.key === "purse";
const gold = isPurse ? getGold(playerStats) : 0;

let iconSrc = null;

// 💰 PRIORITY: purse gold icon
if (isPurse && gold > 0) {
    iconSrc = "images/gold.jpg";
}
// ☠️ cursed item
else if (item?.status === "cursed") {
    iconSrc = "images/skull.jpg";
}
// broken item overrides worn icon only
else if (item?.status === "broken") {
    iconSrc = "images/broken.svg";
}
// 📦 normal item
else if (item) {
    iconSrc = displayParts.icon;
}

if (iconSrc) {
    const img = document.createElement("img");
    img.src = iconSrc;
    img.alt = displayParts.name || "gold";
    img.className = "item-icon";
    img.style.width = "20px";
    img.style.height = "20px";
    img.style.mixBlendMode = "multiply";

    // ✨ Magic vision check
    const showMagic = hasMagicVision(playerStats);

    // ✨ Apply glow ONLY to real magical items (not gold/skull icons)
    if (item && item.magical && showMagic && item.status !== "cursed") {
        img.style.boxShadow = "0 0 6px 2px rgba(89, 89, 90, 0.48)";
        img.style.borderRadius = "4px";
    }

    // ✨ Magic vision check
    const showCurse = hasDoomVision(playerStats);

    // ✨ Apply glow ONLY to real cursed items
    if (item && item.status === "cursed" && showCurse) {
        img.style.boxShadow = "0 0 6px 2px rgba(0, 0, 0, 0.8)";
        img.style.borderRadius = "4px";
    }

    slotLine.appendChild(img);
}

        label.appendChild(slotLine);

        const nameLine = document.createElement("div");

        if (slot.key === "purse") {
            const gold = getGold(playerStats);

            const otherCoins = playerStats.inventory.carriedItems.some(
                i => i.type === "coin" && i.subtype !== "gold"
            );

            nameLine.textContent = `${displayParts.name} ${gold} gold pieces` +
                (otherCoins ? " + other coins" : "");
        } else {
            nameLine.textContent = displayParts.name;
        }

        // ✅ prevents long names breaking layout
        nameLine.style.overflow = "hidden";
        nameLine.style.display = "-webkit-box";
        nameLine.style.webkitLineClamp = "3";   // number of lines
        nameLine.style.whiteSpace = "normal";
        nameLine.style.wordBreak = "break-word"; // handles long words
        nameLine.style.overflowWrap = "anywhere";
        
        label.appendChild(nameLine);

        row.appendChild(label);

        // -------------------
        // BUTTONS
        // -------------------

// -------------------
// BUTTONS
// -------------------

if (isPurse) {
    const buttonRow = document.createElement("div");
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "6px";
    buttonRow.style.marginTop = "auto";
    buttonRow.style.width = "100%";

    const purseBtn = document.createElement("button");
    purseBtn.style.borderRadius = "4px";
    purseBtn.style.fontSize = "16px";
    purseBtn.style.flex = "1";
    purseBtn.style.height = "30px";
    purseBtn.style.backgroundColor = "#424141";
    purseBtn.style.color = "#d7d4d4";
    purseBtn.style.border = "1px solid #555";
    purseBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";    

    const img = document.createElement("img");
    img.src = "images/btngold.svg";
    img.alt = "purse";
    img.style.width = "16px";
    img.style.height = "16px";

    purseBtn.appendChild(img);

    purseBtn.addEventListener("click", () => {
        onViewPurse();
    });

    buttonRow.appendChild(purseBtn);
    row.appendChild(buttonRow);
}
else if (item) {
    const buttonRow = document.createElement("div");
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "6px";
    buttonRow.style.marginTop = "auto";
    buttonRow.style.width = "100%";

    const viewBtn = document.createElement("button");
    viewBtn.style.border = "1px solid #444";
    viewBtn.style.borderRadius = "4px";
    viewBtn.style.fontSize = "16px";
    viewBtn.style.paddingTop = "5px"
    viewBtn.style.flex = "1";
    viewBtn.style.height = "30px";

    const isUsable = item["stat-mod-type"] === "use";

    viewBtn.style.backgroundColor = "#424141";
    viewBtn.style.color = "#d7d4d4";
    viewBtn.style.border = "1px solid #555";
    viewBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

    const viewImg = document.createElement("img");
    viewImg.src = "images/btnView.svg";
    viewImg.src = isUsable
        ? "images/btnUse.svg"
        : "images/btnView.svg";

    viewImg.style.width = "15px";
    viewImg.style.height = "15px";

    viewBtn.appendChild(viewImg);

    viewBtn.addEventListener("click", () => {

        if (item["stat-mod-type"] === "use" && item.status !== "broken") {
            onUse(item);
            return;
        }

        if (item.type === "book") {
            const allBooks = [
                ...playerStats.inventory.carriedItems,
                ...Object.values(playerStats.inventory.wornItems || {})
            ].filter(i => i && i.type === "book");

            if (allBooks.length <= 1) {
                onViewSpells(item);
            } else {
                onCompare(item);
            }
            return;
        }

        onView(item);
    });

    buttonRow.appendChild(viewBtn);

    const isLocked =
        (item.status === "cursed" && item["stat-mod-type"] === "equipped") ||
        item.status === "PERM";

    if (!isLocked) {
        const unequipBtn = document.createElement("button");
        unequipBtn.style.borderRadius = "4px";
        unequipBtn.style.fontSize = "16px";
        unequipBtn.style.flex = "1";
        unequipBtn.style.height = "30px";
        unequipBtn.style.paddingTop = "4px";
        unequipBtn.style.backgroundColor = "#424141";
        unequipBtn.style.color = "#d7d4d4";
        unequipBtn.style.border = "1px solid #555";
        unequipBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        const upequipImg = document.createElement("img");
        upequipImg.src = "images/btnUnequip.svg";
        upequipImg.style.width = "21px";
        upequipImg.style.height = "21px";

        unequipBtn.appendChild(upequipImg);

        unequipBtn.addEventListener("click", () => {
            onUnequip(slot.key);
        });

        buttonRow.appendChild(unequipBtn);
    }

    row.appendChild(buttonRow);
}

        wornDiv.appendChild(row);
    });

    return wornDiv;
}