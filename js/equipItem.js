// equipItem.js
import { equipBook } from './spells.js';
import { applyEquipStatMods,  removeStatMods } from './itemStatModifiers.js';
import { calculateUsedSlots, calculateMaxSlots } from './calculateCapacity.js';
import { openModal, showModalCloseButton, setModalContent } from './modal.js';

////////////////////////////////////////////////////////
// EQUIP RING
////////////////////////////////////////////////////////

export function equipRing(playerStats, item, slotKey) {
    const inv = playerStats.inventory;

        if (inv.wornItems.ring1 === item || inv.wornItems.ring2 === item) {
                return;
            }

    const existingItem = inv.wornItems[slotKey];

    if (existingItem) {
        if (existingItem["stat-mod-type"] === "equipped") {
            removeStatMods(playerStats, existingItem);
        }
        if (!inv.carriedItems.includes(existingItem)) {
            inv.carriedItems.push(existingItem);
        }
    }

    inv.wornItems[slotKey] = item;
    if (item["stat-mod-type"] === "equipped") {
        applyEquipStatMods(playerStats, item);
    }

    const idx = inv.carriedItems.findIndex(i => i.id === item.id);
    if (idx !== -1) inv.carriedItems.splice(idx, 1);
}

////////////////////////////////////////////////////////
// EQUIP
////////////////////////////////////////////////////////

export function equipItem(playerStats, item) {
    const inv = playerStats.inventory;
    const type = item.type;

    if (Object.values(inv.wornItems).includes(item)) {
        return; // already equipped
    }

    if (inv.wornItems.hasOwnProperty(type)) {

        const existingItem = inv.wornItems[type];

        if (existingItem && existingItem.status === "cursed" && item["stat-mod-type"] === "equipped") {
            setModalContent(`
                <h3>Cursed Item</h3>
                <p>A cursed item must be removed by a curse breaker or curse romoval spell before it can be removed or unequipped.</p>
            `);
            openModal();
            return;
        }

        // 🔒 PERM carried item check
        if (existingItem && existingItem.status === "PERM") {
            showPermBlockModal();
            return;
        }

        if (existingItem) {
            const used = calculateUsedSlots(playerStats);
            const max = calculateMaxSlots(playerStats);
            const existingSlots = existingItem["inventory-slots"] || 0;

        if (used + existingSlots > max) {
            setModalContent("Not enough inventory space to swap items.");
            showModalCloseButton();
            openModal();
            return;
        }

            if (existingItem["stat-mod-type"] === "equipped") {
                removeStatMods(playerStats, existingItem);
            }
            if (!inv.carriedItems.includes(existingItem)) {
                inv.carriedItems.push(existingItem);
            }
        }

        inv.wornItems[type] = item;
        if (item["stat-mod-type"] === "equipped") {
            applyEquipStatMods(playerStats, item);
        }
        const idx = inv.carriedItems.findIndex(i => i.id === item.id);
        if (idx !== -1) inv.carriedItems.splice(idx, 1);

        if (item.type === "book") {
            equipBook(item);
        }

        return;
    }

    // carried fallback
    const existingCarried = inv.wornItems.carried;

    if (existingCarried && existingCarried.status === "cursed" && item["stat-mod-type"] === "equipped") {
        setModalContent(`
            <h3>Cursed Item</h3>
            <p>A cursed item must be removed by a curse breaker or curse romoval spell before it can be removed or unequipped.</p>
        `);
        openModal();
        return;
    }

    // 🔒 PERM carried item check
    if (existingCarried && existingCarried.status === "PERM") {
        showPermBlockModal();
        return;
    }

    if (inv.wornItems.hasOwnProperty("carried")) {
        if (existingCarried) {
            removeStatMods(playerStats, existingCarried);
            inv.carriedItems.push(existingCarried);
        }

        inv.wornItems.carried = item;
        if (item["stat-mod-type"] === "equipped") {
            applyEquipStatMods(playerStats, item);
        }
        const idx = inv.carriedItems.findIndex(i => i.id === item.id);
        if (idx !== -1) inv.carriedItems.splice(idx, 1);
        return;
    }

    alert("This item cannot be equipped.");
}

////////////////////////////////////////////////////////
// UNEQUIP
////////////////////////////////////////////////////////

export function unequipItem(playerStats, slotKey) {
    const inv = playerStats.inventory;
    const item = inv.wornItems[slotKey];
    if (!item) return;

    const used = calculateUsedSlots(playerStats);
    const max = calculateMaxSlots(playerStats);

    if (used + (item["inventory-slots"] || 0) > max) {
        setModalContent("Not enough inventory space.");

        openModal();
        showModalCloseButton();
        return;
    }

    removeStatMods(playerStats, item);
    inv.wornItems[slotKey] = null;
    inv.carriedItems.push(item);
}

function showPermBlockModal() {
    setModalContent(`
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <img src="images/0298.jpg" 
                 alt="Magnificent Hair & Beard"
                 style="width:64px; height:64px; object-fit:contain; mix-blend-mode:multiply;" />

            <h3 style="margin:0;">Absolutely Not</h3>
        </div>

        <p>It would be a crime to cover this hair and beard combo. You just can't bring yourself to do it.</p>
    `);
    openModal();
}