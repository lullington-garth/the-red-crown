// renderBackpackItems.js
import { hasMagicVision } from "./inventoryUI.js";
import { hasDoomVision } from "./inventoryUI.js";

export function renderBackpackItems({
    playerStats,
    items,
    filterBar,
    currentFilter,
    getItemDisplayParts,
    canDiscardItem,
    calculateUsedSlots,
    calculateMaxSlots,

    // 🔹 callbacks (controller layer)
    onView,
    onViewSpells,
    onEquip,
    onEquipRing,
    onUse,
    onDiscard
}) {

    const invDiv = document.createElement("div");
    invDiv.style.width = "100%";

    // 🔹 OUTER container (border + radius + clipping)
    const outerContainer = document.createElement("div");
    outerContainer.style.border = "1px solid #939090";
    outerContainer.style.borderRadius = "20px";
    outerContainer.style.overflow = "hidden";
//    outerContainer.style.background = "#f8f9fb";
    outerContainer.style.boxShadow = "inset 0 0 6px rgba(0,0,0,0.1)";

    // 🔹 INNER scroll container
    const scrollContainer = document.createElement("div");
    scrollContainer.style.height = "430px";
    scrollContainer.style.overflowY = "auto";
    scrollContainer.classList.add("hide-scrollbar");
    scrollContainer.style.padding = "6px";
    scrollContainer.style.paddingRight = "10px";
    scrollContainer.style.backgroundImage = "url('images/paper1.jpg')";

    const inv = playerStats.inventory;

    const invHeader = document.createElement("h3");
    invHeader.textContent =
        `Inventory (${calculateUsedSlots(playerStats)} / ${calculateMaxSlots(playerStats)})`;
    invHeader.style.margin = "15px 0 6px 0";

    invDiv.appendChild(invHeader);

    // ⚠️ Remove if already added elsewhere
    if (filterBar) {
        filterBar.style.marginBottom = "6px";
        invDiv.appendChild(filterBar);
    }

    const list = items || inv.carriedItems;
    
    let message = "No items to display";

    switch (currentFilter) {
        case "worn":
            message = "No Worn Items to display: Robes, Armour, Gloves, Boots, Glasses, Head Gear";
            break;
        case "books":
            message = "No Spell Books to display";
            break;
        case "jewellery":
            message = "No Jewellery to display: Rings, Necklaces";
            break;
        case "potions":
            message = "No Potions to display";
            break;
        case "scrolls":
            message = "No Scrolls to display";
            break;
        case "weapons":
            message = "No Weapons ot Armour to display: Swords, Daggers, Staffs, Wands; Shields";
            break;
        case "misc":
            message = "No items to display";
            break;
    }

    if (list.length === 0) {
        const emptyRow = document.createElement("div");

        emptyRow.textContent = message;

        // Match row styling
        emptyRow.style.padding = "8px";
        emptyRow.style.marginBottom = "4px";
        emptyRow.style.borderRadius = "6px";
        emptyRow.style.fontStyle = "italic";
        emptyRow.style.color = "#666";
        emptyRow.style.textAlign = "center";

        scrollContainer.appendChild(emptyRow);
    }

    list.forEach((item) => {
    
        // ===================
        // ROW (main flex line)
        // ===================
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.gap = "8px";
        row.style.marginBottom = "4px";
        row.style.padding = "4px";
        row.style.borderRadius = "6px";

        // Hover effect
        row.addEventListener("mouseenter", () => {
            row.style.background = "#eef1f55b";
        });
        row.addEventListener("mouseleave", () => {
            row.style.background = "transparent";
        });

        // ===================
        // LEFT SIDE (icon + text)
        // ===================
        const parts = getItemDisplayParts(item, false);

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.gap = "6px";
        container.style.flex = "1";
        container.style.minWidth = "0"; // enables ellipsis

        // 🔹 Inventory slots (small text before icon)
        const slotLabel = document.createElement("div");
        slotLabel.textContent = item["inventory-slots"] ?? 0;

        slotLabel.style.fontSize = "10px";
        slotLabel.style.color = "#444";

        // 🔵 Circle styling
        slotLabel.style.width = "16px";
        slotLabel.style.height = "16px";
        slotLabel.style.border = "1px solid #888";
        slotLabel.style.borderRadius = "50%";

        slotLabel.style.display = "flex";
        slotLabel.style.alignItems = "center";
        slotLabel.style.justifyContent = "center";

        slotLabel.style.flexShrink = "0"; // prevents squishing

        container.appendChild(slotLabel);

        // 🔹 Item icon
        const img = document.createElement("img");
        img.src = parts.icon;
        img.alt = parts.name;
        img.className = "item-icon";
        img.style.width = "30px";
        img.style.height = "30px";
        img.style.mixBlendMode = "multiply";

        if (item.magical && hasMagicVision(playerStats)) {
            img.style.boxShadow = "0 0 6px 2px rgba(89, 89, 90, 0.48)";
            img.style.borderRadius = "4px";
        }

        if (item.status === "cursed" && hasDoomVision(playerStats)) {
            img.style.boxShadow = "0 0 6px 2px rgba(0, 0, 0, 0.8)";
            img.style.borderRadius = "4px";
        }        

        container.appendChild(img);

        const textLine = document.createElement("div");
        const isCursed = item.status === "cursed";
        const isIdentified = item.identified === true;
        const isEquipped =
            inv.wornItems.ring1 === item ||
            inv.wornItems.ring2 === item ||
            inv.wornItems[item.type] === item;


        const showStats =
            isIdentified && (!isCursed || (isCursed && isEquipped));

        textLine.innerHTML =
            showStats && parts.stats
                ? `${parts.name} - ${parts.stats.trim()}`
                : parts.name;

        textLine.style.whiteSpace = "nowrap";
        textLine.style.overflow = "hidden";
        textLine.style.textOverflow = "ellipsis";

        if (!item.identified) {
            textLine.style.color = "#616060";
        }

        container.appendChild(textLine);

        // ===================
        // RIGHT SIDE (buttons)
        // ===================
        const buttonGroup = document.createElement("div");
        buttonGroup.style.display = "flex";
        buttonGroup.style.gap = "4px";
        buttonGroup.style.flexShrink = "0";

        // VIEW
        const viewBtn = document.createElement("button");

        // Label can optionally change
        viewBtn.style.display = "0 0 auto";
        viewBtn.style.justifyContent = "center";
        viewBtn.style.alignItems = "center";
        viewBtn.style.padding = "4px";
        viewBtn.style.borderRadius = "6px";
        viewBtn.style.backgroundColor = "#424141";
        viewBtn.style.color = "#d7d4d4";
        viewBtn.style.border = "1px solid #555";
        viewBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        viewBtn.style.width = "35px";
        viewBtn.style.minWidth = "35px";
        viewBtn.style.maxWidth = "35px";
        viewBtn.style.boxSizing = "border-box";

        const isUsable = item["stat-mod-type"] === "use" && item.status !== "broken";

        const viewImg = document.createElement("img");
        viewImg.src = "images/btnView.svg";
        viewImg.src = isUsable
            ? "images/btnUse.svg"
            : "images/btnView.svg";

        viewImg.alt = "view";
        viewImg.style.width = "20px";
        viewImg.style.height = "20px";

        viewBtn.appendChild(viewImg);

        viewBtn.addEventListener("click", () => {

            // ✅ USE-type items behave like onUse
            if (item["stat-mod-type"] === "use" && item.status !== "broken") {
                onUse(item);
                return;
            }

            // ✅ Otherwise normal view logic
            if (item.type === "book") {
                onViewSpells(item);
            } else {
                onView(item);
            }
        });

        buttonGroup.appendChild(viewBtn);

        // EQUIP
        if (item.type === "ring") {

            const ring1Item = inv.wornItems.ring1;
            const ring2Item = inv.wornItems.ring2;

            const equip1 = document.createElement("button");
            equip1.style.display = "flex";
            equip1.style.justifyContent = "center";
            equip1.style.alignItems = "center";
            equip1.style.padding = "4px";
            equip1.style.borderRadius = "6px";
            equip1.style.backgroundColor = "#424141";
            equip1.style.color = "#d7d4d4";
            equip1.style.border = "1px solid #555";
            equip1.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            equip1.style.width = "35px";

            const equip1Img = document.createElement("img");
            equip1Img.src = "images/btnEquip.svg";
            equip1Img.alt = "Equip ring 1";
            equip1Img.style.width = "20px";
            equip1Img.style.height = "20px";

            equip1.appendChild(equip1Img);

            // 🔴 Disable if cursed ring is already in slot
            if (ring1Item && ring1Item.status === "cursed") {
                equip1.disabled = true;
                equip1.style.opacity = "0.4";
                equip1.style.cursor = "not-allowed";
                equip1.title = "Ring slot 1 is cursed";
            } else {
                equip1.addEventListener("click", () => {
                    onEquipRing(item, "ring1");
                });
                equip1.title = "Equip to ring slot 1";
            }

            buttonGroup.appendChild(equip1);


            const equip2 = document.createElement("button");
            equip2.style.display = "flex";
            equip2.style.justifyContent = "center";
            equip2.style.alignItems = "center";
            equip2.style.padding = "4px";
            equip2.style.borderRadius = "6px";
            equip2.style.backgroundColor = "#424141";
            equip2.style.color = "#d7d4d4";
            equip2.style.border = "1px solid #555";
            equip2.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            equip2.style.width = "35px";

            const equip2Img = document.createElement("img");
            equip2Img.src = "images/btnEquip2.svg";
            equip2Img.alt = "Equip ring 2";
            equip2Img.style.width = "20px";
            equip2Img.style.height = "20px";

            equip2.appendChild(equip2Img);

            // 🔴 Disable if cursed ring is already in slot
            if (ring2Item && ring2Item.status === "cursed") {
                equip2.disabled = true;
                equip2.style.opacity = "0.4";
                equip2.style.cursor = "not-allowed";
                equip2.title = "Ring slot 2 is cursed";
            } else {
                equip2.addEventListener("click", () => {
                    onEquipRing(item, "ring2");
                });
                equip2.title = "Equip to ring slot 2";
            }

            buttonGroup.appendChild(equip2);

        } else {

            const equipBtn = document.createElement("button");
            equipBtn.style.display = "flex";
            equipBtn.style.justifyContent = "center";
            equipBtn.style.alignItems = "center";
            equipBtn.style.padding = "4px";
            equipBtn.style.borderRadius = "6px";
            equipBtn.style.backgroundColor = "#424141";
            equipBtn.style.color = "#d7d4d4";
            equipBtn.style.border = "1px solid #555";
            equipBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

            const equipImg = document.createElement("img");
            equipImg.src = "images/btnEquip.svg";
            equipImg.alt = "Equip";
            equipImg.style.width = "23px";
            equipImg.style.height = "23px";

            equipBtn.appendChild(equipImg);

            // 🔹 Disable if item cannot be equipped
            if (item["can-equip"] === false) {
                equipBtn.disabled = true;
                equipBtn.style.opacity = "0.4";
                equipBtn.style.cursor = "not-allowed";
                equipBtn.title = "This item cannot be equipped";
            } else {
                equipBtn.addEventListener("click", () => {
                    onEquip(item);
                });
            }
            
            equipBtn.addEventListener("click", () => {
                onEquip(item);
            });

            buttonGroup.appendChild(equipBtn);
        }

        // DISCARD
        const discardBtn = document.createElement("button");

        discardBtn.style.display = "flex";
        discardBtn.style.justifyContent = "center";
        discardBtn.style.alignItems = "center";
        discardBtn.style.padding = "4px";
        discardBtn.style.borderRadius = "6px";
        discardBtn.style.backgroundColor = "#424141";
        discardBtn.style.color = "#d7d4d4";
        discardBtn.style.border = "1px solid #555";
        discardBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        const discardImg = document.createElement("img");
        discardImg.src = "images/btnDiscard.svg";
        discardImg.alt = "Discard";
        discardImg.style.width = "20px";
        discardImg.style.height = "20px";

        discardBtn.appendChild(discardImg);

        // 🔹 Check discard permission
        if (!canDiscardItem(playerStats, item)) {
            discardBtn.disabled = true;
            discardBtn.style.opacity = "0.4";
            discardBtn.style.cursor = "not-allowed";
            discardBtn.title = "Cannot discard this item";
        } else {
            discardBtn.addEventListener("click", () => {
                onDiscard(item);
            });
            discardBtn.title = "Discard";
        }

        buttonGroup.appendChild(discardBtn);

        // Assemble row
        row.appendChild(container);
        row.appendChild(buttonGroup);

        scrollContainer.appendChild(row);
    });

    outerContainer.appendChild(scrollContainer);
    invDiv.appendChild(outerContainer);

    return invDiv;
}