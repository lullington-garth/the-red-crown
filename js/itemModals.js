// itemModals.js
import { setModalContent, openModal, closeModal, setModalWidth } from "./modal.js";
import { getItemBonusText } from './inventoryUI.js';
import { openCombatSelectionModal } from "./combatSelectionModal.js";

export function openItemModal(playerStats, onUse) {
    openCombatSelectionModal({
        playerStats,
        title: "Select an Item",
        emptyMessage: "No combat items available.",
        filterFn: item =>
            item &&
            item.type === "misc" &&
            item["use-in-combat"] === true &&
            item.status !== "broken",
        buttonClass: "use-combatItem-btn",
        onUse
    });
}

export function confirmUseItemModal(item, onConfirm, context = "inventory", extraContent = null, playerStats = null) {

    const container = document.createElement("div");

    const isInventory = context === "inventory";
    const isCombatOnly = item["use-in-combat"] === true;
    const notForUseNow =
        item["special-ability"] === "REROLL" ||
        item["special-ability"] === "DEVIL_DICE" ||
        item["special-ability"] === "PASS_LUCK";

    let notEnoughMagic = false;
    let missingSickleBlood = false;
    let missingOgreBlood = false;

    if (item["special-ability"] === "MIX" && playerStats?.inventory) {

        const inv = playerStats.inventory;

        const ownedIds = new Set([
            ...(inv.carriedItems || []),
            ...Object.values(inv.wornItems || {}).filter(Boolean)
        ].map(i => i.id));

        // MIX pair rule
        if (item.id === "0092" && !ownedIds.has("0115")) {
            missingSickleBlood = true;
        }

        if (item.id === "0115" && !ownedIds.has("0092")) {
            missingOgreBlood = true;
        }
    }

    if (item.type === "scroll") {

        const cost = item["magic-cost"] || 0;

        const currentMagic = playerStats?.stats?.MAGIC?.current ?? 0;

        if (currentMagic < cost) {
            notEnoughMagic = true;
        }
    }

    const statText = getItemBonusText(item, false);

    container.innerHTML = `
    
        <div style="display:flex; gap:12px; align-items:flex-start;">
            
            ${!extraContent ? `
                <img src="images/${item.image}" 
                    alt="${item.item}" 
                    style="width:70px; height:70px; object-fit:contain; mix-blend-mode:multiply;" />
            ` : ""}

            <div style="flex:1;">
                ${extraContent ? "" : `
                    <h3 style="margin:0 0 6px 0;">${item.item}</h3>
                    <p>${item.description || "No description available."}</p>

                    ${statText ? `
                        <div style="
                            margin-top:8px;
                            font-size:13px;
                            color:#2a7a2a;
                            font-weight:bold;
                        ">
                            ${statText}
                        </div>
                    ` : ""}
                `}
            </div>
        </div>

        ${notEnoughMagic ? `
            <div style="
                margin-top:10px;
                padding:8px;
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                border-radius:6px;
                font-size:16px;
                text-align:center;
            ">
                You do not have enough magic to cast this spell.
            </div>
        ` : ""}

        ${notForUseNow ? `
            <div style="
                margin-top:10px;
                padding:8px;
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                border-radius:6px;
                font-size:13px;
                text-align:center;
            ">
                This item is for use with dice roles and cannot be used right now.
            </div>
        ` : ""}

        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:15px;">
            
            <button id="useBtn" style="
                background:#424141;
                color:#d7d4d4;
                padding:10px 16px;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                border-radius:8px;
                cursor:pointer;
                min-width:100px;
            ">
                Use
            </button>

            <button id="cancelBtn" style="
                background:#424141;
                color:#d7d4d4;
                padding:10px 16px;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                border-radius:8px;
                cursor:pointer;
                width:100px;
            ">Cancel</button>

        </div>
    `;
    if (extraContent) {
        const contentWrapper = container.querySelector("div > div:last-child");
        contentWrapper.appendChild(extraContent);
    }
    setModalContent(container);
    openModal();
 
    const useBtn = container.querySelector("#useBtn");

    // 🚫 Disable if combat-only AND from inventory
    if (
    isInventory &&
    (isCombatOnly || notEnoughMagic || notForUseNow || missingSickleBlood || missingOgreBlood)
) {

        useBtn.disabled = true;

if (notEnoughMagic) {
    useBtn.textContent = "Not enough magic";

} else if (isCombatOnly) {
    useBtn.textContent = "Combat Use Only";

} else if (notForUseNow) {
    useBtn.textContent = "No No NO!";

} else if (missingSickleBlood) {
    useBtn.textContent = "Sickle Blood Required";

} else if (missingOgreBlood) {
    useBtn.textContent = "Ogre Blood Required";
}

        useBtn.style.opacity = "0.5";
        useBtn.style.cursor = "not-allowed";
    }

    container.querySelector("#cancelBtn").addEventListener("click", () => {
        closeModal();
    });

    useBtn.addEventListener("click", () => {

        if (useBtn.disabled) return;

        closeModal();
        onConfirm();
    });
}

export function openItemSelectionModal(playerStats, {
    title = "Select an Item",
    filterFn = null,
    onSelect,
    formatItem = null
}) {

    const inv = playerStats.inventory;

    // ✅ Combine carried + worn
    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    // Optional filtering
    const items = filterFn ? allItems.filter(filterFn) : allItems;

    const container = document.createElement("div");

    container.innerHTML = `<h2 style="margin-top:0;">${title}</h2>`;
    container.classList.add("hide-scrollbar");
    container.style.maxHeight = "70vh";
    container.style.overflowY = "auto";


    if (items.length === 0) {

        const empty = document.createElement("p");
        empty.textContent = "No valid items available.";
        container.appendChild(empty);

    } else {

        items.forEach(item => {

            const row = document.createElement("div");

            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "space-between";
            row.style.gap = "10px";
            row.style.padding = "6px 0";
            row.style.borderBottom = "1px solid #ccc";

            const extraLine = formatItem ? formatItem(item) : "";

            row.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">

                    <div style="
                        width:16px;
                        height:16px;
                        border:1px solid #888;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:10px;
                        color:#444;
                        flex-shrink:0;
                    ">
                        ${item["inventory-slots"] ?? 0}
                    </div>

                    <img src="images/${item.image}" 
                        style="width:40px; height:40px; object-fit:contain; mix-blend-mode:multiply;" />

                    <div>
                        <strong>${item.item}</strong>

                        <div style="font-size:12px; opacity:0.7;">
                            ${item.description || ""}
                        </div>

                        ${extraLine ? `
                            <div style="font-size:12px; opacity:0.7;">
                                ${extraLine}
                            </div>
                        ` : ""}
                    </div>
                </div>

                <button class="select-item-btn" style="
                    background:#424141;
                    color:#d7d4d4;
                    padding:10px 16px;
                    border:1px solid #555;
                    box-shadow:0 1px 7px rgba(0,0,0,0.5);
                    border-radius:8px;
                    cursor:pointer;
                ">
                    Select
                </button>
            `;

            row.querySelector(".select-item-btn").addEventListener("click", () => {
                closeModal();
                onSelect(item);
            });

            container.appendChild(row);
        });
    }

    setModalContent(container);
    setModalWidth("450px");
    openModal();
}

export function confirmModal(item, message, onConfirm) {
    const container = document.createElement("div");

    container.style.backgroundColor = "transparent"
    container.style.borderRadius = "10px";
    container.style.padding = "5px";
    container.style.boxSizing = "border-box";

    container.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
        <img src="images/${item.image}" 
            alt="${item.item}" 
            style="width:100px; object-fit:contain; mix-blend-mode:multiply;" />

        <h3 style="margin:20px;">${item.item}</h3>
        </div>

        <p>${message}</p>

<div style="display:flex; justify-content:flex-end; gap:10px; margin-top:15px;">
    <button id="confirmBtn" style="
    background:#424141;
    color:#d7d4d4;
    border:1px solid #555;
    box-shadow:0 1px 7px rgba(0,0,0,0.5);
    padding:10px 16px;
    border-radius:8px;
    font-size:14px;
    cursor:pointer;
    width: 80px;
">Yes</button>

    <button id="cancelBtn" style="
    background:#424141;
    color:#d7d4d4;
    border:1px solid #555;
    box-shadow:0 1px 7px rgba(0,0,0,0.5);
    padding:10px 16px;
    border-radius:8px;
    font-size:14px;
    cursor:pointer;
    width: 80px;
">No</button>
</div>
    `;

    setModalContent(container);
    openModal();

    container.querySelector("#cancelBtn").addEventListener("click", () => {
        closeModal();
    });

    container.querySelector("#confirmBtn").addEventListener("click", () => {
        closeModal();
        onConfirm();
    });
}
