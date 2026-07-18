// inventoryUI.js
import { showInventoryBook, showEquippedBook } from './spellsUI.js';
import { showCompareSpells } from './compareSpellsUI.js';
import { renderWornItems } from './renderWornItems.js';
import { renderBackpackItems } from './renderBackpackItems.js';
import { openModal, setModalContent, setModalWidth, showModalCloseButton } from './modal.js';
import { confirmUseItemModal, confirmModal } from './itemModals.js';
import { createPurseModal } from './purseModal.js';
import { equipItem, equipRing, unequipItem } from './equipItem.js';
import { calculateUsedSlots, calculateMaxSlots } from './calculateCapacity.js';
import { filterInventory, sortInventory } from './filterInventory.js';
import { useItem } from './useItem.js';

let currentFilter = "all";

function getItemIcon(item) {
    return item.image
        ? `images/${item.image}`
        : "images/cyclone.jpg";
}

function getItemDisplayParts(item, worn = false) {

    const icon = getItemIcon(item);
    const name = item.item;

    let stats = getItemBonusText(item, worn);

    // 🔴 Append broken icon
    if (item.status === "broken") {
        stats += ` <img src="images/broken.svg" alt="broken" style="width:20px;height:20px;vertical-align:middle;margin-left:4px;">`;
    }

    // Add scroll details
    if (item.type === "scroll") {
        if (item["magic-cost"] != null) {
            stats += ` M:${item["magic-cost"]}`;
        }

        if (item["charges"] != null) {
            stats += ` C:${item["charges"]}`;
        }
    }

    return {
        icon,
        name,
        stats: stats.trim()
    };
}

function canDiscardItem(playerStats, item) {
    const inv = playerStats.inventory;

    // If NOT cursed → use normal rule
    if (item.status !== "cursed") {
        return item["can-discard"];
    }

    // From here: item IS cursed

    // Determine if item is equippable
    let isEquippable = false;

    if (item.type === "ring") {
        isEquippable = true;
    } else if (inv.wornItems.hasOwnProperty(item.type)) {
        isEquippable = true;
    }

    // If cursed and equippable
    if (isEquippable) {
        const isEquipped =
            inv.wornItems.ring1 === item ||
            inv.wornItems.ring2 === item ||
            inv.wornItems[item.type] === item;

        return !isEquipped;
    }

    // Cursed and NOT equippable → never discardable
    return false;
}

export function getItemBonusText(item) {
    if (item.status === "broken") return "Needs Repair";
    const parts = [];

    const tagMatch = item["stat-mod"]?.match(/\((T|D)\)/);
    const statMatch = item["stat-mod"]?.match(/^([^(]+)/);

    if (tagMatch && statMatch) {
        parts.push(`${statMatch[1].trim()} (${tagMatch[1]})`);
    }

    const mods = item["stat-mod-object"];
    if (!mods) return "";

    Object.keys(mods).forEach(stat => {
        const val = mods[stat];
        if (val === 0) return;

        if (val > 0) {
            parts.push(`${stat} +${val}`);
        } else {
            parts.push(`${stat} ${val}`);
        }
    });

    return parts.length ? " " + parts.join(" ") : "";
}

function getWizardDefaultItem(slotKey, wizardColor) {
    // Wizard-color-specific defaults
    const colorDefaults = {
        Blue: {
            torso: "Blue Wizard Robes",
            feet: "Blue Shoes",
            head: "Blue Turban"
        },
        Green: {
            torso: "Green Wizard Robes",
            feet: "Green Slippers",
            head: "Green Skullcap"
        },
        Yellow: {
            torso: "Yellow Wizard Robes",
            feet: "Yellow Sandals",
            head: "Yellow Wizard Hat"
        },
        Red: {
            torso: "Red Wizard Robes",
            feet: "Red Boots",
            head: "Red Hood"
        }
    };

    // Global defaults for all wizards
    const globalDefaults = {
        hands: "None worn",
        ring1: "None worn",
        ring2: "None worn",
        neck: "None worn",
        staff: "Standard Wizard's Staff",
        weapon: "No weapon",
        shield: "Not carried",
        glasses: "None worn",
        book: "No book",
        carried: "Empty",
        purse: " "
    };

    // First try wizard color defaults
    if (colorDefaults[wizardColor]?.[slotKey]) {
        return colorDefaults[wizardColor][slotKey];
    }

    // Otherwise, fallback to global default
    if (globalDefaults[slotKey]) {
        return globalDefaults[slotKey];
    }

    // Last fallback
    return "None";
}

export function showItemDescription(item, playerStats, options = {}) {

    const compact = options.compact === true;

    const wrapper = document.createElement("div");

    const baseDescription =
    item.type === "scroll"
        ? ""
        : (item.description || "No description available.");

    let fullText = "";

    if (baseDescription) {
        fullText += `
            <p style="margin-top:${compact ? "3px" : "6px"}; font-size:${compact ? "0.9rem" : "18px"};">
                ${baseDescription}
            </p>
        `;
    }

    const wornItems = playerStats.inventory.wornItems;

    const isEquipped = Object.values(wornItems).includes(item);

    const glasses = wornItems.glasses;
    const hasIdentifyVision =
        glasses &&
        glasses["special-ability"] === "IDENTIFY";

    const isIdentified = item.identified || hasIdentifyVision;

    const isCursed = item.status === "cursed";

    // ----------------------------
    // ✅ RULE: STAT VISIBILITY
    // ----------------------------
    const showStats =
        isIdentified && (!isCursed || (isCursed && isEquipped));

    if (showStats) {
        const stats = getItemBonusText(item);

        if (stats) {
            const label = isCursed ? "☠️ Cursed Item:" : "Effects:";

            fullText += `
                <hr style="margin:${compact ? "4px 0" : "8px 0"};">
                <div style="font-size:${compact ? "0.85rem" : "1rem"};">
                    <strong>${label}</strong> ${stats}
                </div>
            `;
        }
    }

    // ----------------------------
    // ✅ RULE: ID DESCRIPTION
    // ----------------------------
    if (isIdentified && item["id-description"]) {
        fullText += `
            <hr style="margin:${compact ? "4px 0" : "8px 0"};">
            <p style="font-size:${compact ? "0.85rem" : "1rem"};">
                <em>${item["id-description"]}</em>
            </p>
        `;
    }

    if (item.type === "scroll") {
        let extra = "";

        if (item["magic-cost"] != null) {
            extra += `<div>Magic Cost: ${item["magic-cost"]}</div>`;
        }

        if (item["charges"] != null) {
            extra += `<div>Charges: ${item["charges"]}</div>`;
        }

        if (extra) {
            fullText += `<hr style="margin:${compact ? "4px 0" : "8px 0"};">${extra}`;
        }
    }

    const showMagic = hasMagicVision(playerStats);

    const glowStyle = (item.magical && showMagic)
        ? "box-shadow: 0 0 12px 3px rgba(89, 89, 90, 0.48); border-radius: 6px;"
        : "";

    const imageSize = compact ? 70 : 100;

    wrapper.innerHTML = `
        <div style="
            display: flex;
            align-items: flex-start;
            gap: ${compact ? "6px" : "10px"};
            font-size: ${compact ? "0.85rem" : "1.1rem"};
        ">
            <img src="images/${item.image}" 
                alt="${item.item}" 
                style="
                    width: ${imageSize}px;
                    object-fit: contain;
                    mix-blend-mode:multiply;
                    ${glowStyle}
                " />
            <div>
                <strong>${item.item}</strong>
                ${fullText}
            </div>
        </div>
    `;

    return wrapper;
}

function isItemEquipped(playerStats, item) {
    const worn = playerStats.inventory.wornItems;

    return Object.values(worn).includes(item);
}

function onViewItem(item, playerStats) {
    setModalContent(showItemDescription(item, playerStats));
    showModalCloseButton();
    openModal();
}

let externalRerender = null;

export function showInventoryUI(container, playerStats, onUpdate) {

    container.innerHTML = "";

    function rerender() {
        showInventoryUI(container, playerStats, onUpdate);
        if (onUpdate) onUpdate(playerStats);
    }

        externalRerender = rerender;

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "0px";

    const slotConfig = [
        { key: "head", icon: "icons/wornHead.jpg" },
        { key: "hands", icon: "icons/wornHands.jpg" },
        { key: "torso", icon: "icons/wornTorso.jpg" },
        { key: "feet", icon: "icons/wornFeet.jpg" },
        { key: "ring1", icon: "icons/wornRing1.jpg" },
        { key: "ring2", icon: "icons/wornRing2.jpg" },
        { key: "neck", icon: "icons/wornNeck.jpg" },
        { key: "staff", icon: "icons/wornStaff.jpg" },
        { key: "weapon", icon: "icons/wornWeapon.jpg" },
        { key: "shield", icon: "icons/wornShield.jpg" },
        { key: "glasses", icon: "icons/wornGlasses.jpg" },
        { key: "book", icon: "icons/wornBook.jpg" },
        { key: "carried", icon: "icons/wornCarried.jpg" },
        { key: "purse", icon: "icons/wornPurse.jpg" }
    ];

    // ✅ WORN ITEMS
const wornDiv = renderWornItems({
    playerStats,
    slotConfig,
    getItemDisplayParts,
    getWizardDefaultItem,

    onView: (item) => {
    setModalContent(showItemDescription(item, playerStats));
    showModalCloseButton();
    openModal();
    },

    onViewSpells: (item) => {
        const content = document.createElement("div");

        showInventoryBook(content, item, playerStats.wizardColor);

        setModalContent(content);
        showModalCloseButton();
        openModal();
    },

    onViewPurse: () => {
        const content = createPurseModal(playerStats, onViewItem);
        setModalContent(content);
        showModalCloseButton();
        openModal();
    },

    onCompare: (item) => {
        setModalWidth("600px");

        setModalContent(
            showCompareSpells(item, playerStats.wizardColor, playerStats)
        );
        showModalCloseButton();
        openModal();
    },

        onUnequip: (slotKey) => {
            unequipItem(playerStats, slotKey);
            rerender();
        },

        onUse: (item) => {
            const content = document.createElement("div");

            content.appendChild(showItemDescription(item, playerStats));

            confirmUseItemModal(
                item,
                () => {
                    // remove from worn slot first (your existing logic)
                    const wornItems = playerStats.inventory.wornItems;

                    for (const key in wornItems) {
                        if (wornItems[key] === item) {
                            wornItems[key] = null;
                            break;
                        }
                    }

                    useItem(playerStats, item, "worn");
                    rerender();
                },
                "inventory",
                content,
                playerStats
            );
        }
});

    wrapper.appendChild(wornDiv);

    // Inventory Buttons
    const filterBar = document.createElement("div");
    filterBar.style.display = "flex";
    filterBar.style.width = "100%";
    filterBar.style.gap = "4px";

    const buttons = [
        { key: "all", label: "All", title: "Show all items" },
        { key: "books", label: "Book", title: "Spell Books" },
        { key: "worn", label: "Torso", title: "Worn Items" },
        { key: "jewellery", label: "ring", title: "Jewellery" },
        { key: "potions", label: "Potion", title: "Potions" },
        { key: "scrolls", label: "Scroll", title: "Scrolls" },
        { key: "misc", label: "Carried", title: "Misc Items" },
        { key: "weapons", label: "Weapon", title: "Weapons, Staffs, Shields" }
    ];

    buttons.forEach(btn => {
        const button = document.createElement("button");

    if (btn.key === "all") {
        button.textContent = btn.label;
    } else {
        const img = document.createElement("img");

        const prefix = (currentFilter === btn.key) ? "worn" : "btn";

        const fileName =
            prefix +
            btn.label.charAt(0).toUpperCase() +
            btn.label.slice(1) +
            ".svg";

        img.src = `images/${fileName}`;
        img.alt = btn.label;
        img.style.width = "20px";
        img.style.height = "20px";

        button.appendChild(img);
    }

    button.style.flex = "1";
    button.style.padding = "6px 4px";
    button.style.borderRadius = "10px";
    button.style.backgroundColor = "#424141";
    button.style.color = "#d7d4d4";
    button.style.border = "1px solid #555";
    button.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

    // Center content (works for both text + image)
    button.style.display = "flex";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";

    // Highlight active filter
    if (currentFilter === btn.key) {
        button.style.background = "#d7d4d4";
        button.style.color = "#000000";
    }

    button.title = btn.title || btn.label;

    button.addEventListener("click", () => {
        currentFilter = btn.key;
        rerender();
    });

    filterBar.appendChild(button);
});

    wrapper.appendChild(filterBar);

    // ✅ BACKPACK 
    const filteredItems = sortInventory(
        filterInventory(playerStats.inventory.carriedItems, currentFilter)
    );

    const invDiv = renderBackpackItems({
        playerStats,
        items: filteredItems,
        filterBar,
        currentFilter,
        getItemDisplayParts,
        canDiscardItem,
        calculateUsedSlots,
        calculateMaxSlots,

        onView: (item) => {
        setModalContent(showItemDescription(item, playerStats));
        showModalCloseButton();
        openModal();
        },

        onViewSpells: (item) => {
            const content = document.createElement("div");

            showInventoryBook(content, item, playerStats.wizardColor);

            setModalContent(content);
            showModalCloseButton();
            openModal();
        },

        onEquip: (item) => {
            equipItem(playerStats, item);
            rerender();
        },

        onEquipRing: (item, slot) => {
            equipRing(playerStats, item, slot);
            rerender();
        },

        onUse: (item) => {
            const content = document.createElement("div");

            content.appendChild(showItemDescription(item, playerStats));

            confirmUseItemModal(item, () => {
                useItem(playerStats, item, "inventory");
                rerender();
            }, "inventory", content, playerStats);
        },

        onDiscard: (item) => {
            confirmModal(
                item,
                "Are you sure you want to discard this item?",
                () => {
                    const list = playerStats.inventory.carriedItems;
                    const idx = list.findIndex(i => i.id === item.id);
                    if (idx !== -1) list.splice(idx, 1);

                    rerender();
                }
            );
        }
    });

    wrapper.appendChild(invDiv);

    container.appendChild(wrapper);
}

export function refreshInventoryUI() {
    if (externalRerender) externalRerender();
}

export function hasMagicVision(playerStats) {
    const wornItems = Object.values(playerStats.inventory.wornItems);

    return wornItems.some(
        item => item && item["special-ability"] === "SHOW_MAGIC"
    );
}

export function hasDoomVision(playerStats) {
    const wornItems = Object.values(playerStats.inventory.wornItems);

    return wornItems.some(
        item => item && item["special-ability"] === "SHOW_CURSE"
    );
}

export function hasAngelCompanion(playerStats) {
    const wornItems = Object.values(playerStats.inventory.wornItems);

    return wornItems.some(
        item => item && item["special-ability"] === "ANGEL"
    );
}

export function hasImpCompanion(playerStats) {
    const wornItems = Object.values(playerStats.inventory.wornItems);

    return wornItems.some(
        item => item && item["special-ability"] === "IMP"
    );
}