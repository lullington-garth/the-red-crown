// combatSelectionModal.js

import { setModalContent, openModal, closeModal, setModalWidth, showModalCloseButton } from "./modal.js";
import { getItemBonusText } from './inventoryUI.js';

export function openCombatSelectionModal({
    playerStats,
    title,
    filterFn,
    emptyMessage,
    buttonClass = "use-item-btn",
    onUse
}) {
    const inv = playerStats.inventory;

    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}))
    ];

    const items = allItems.filter(filterFn);

    const container = document.createElement("div");
    container.innerHTML = `<h2 style="margin-top:0;">${title}</h2>`;

    if (items.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = emptyMessage;
        container.appendChild(empty);
    } else {
        items.forEach((item) => {

            const isIdentified = item.identified;
            const statText = isIdentified ? (getItemBonusText(item, false) || "") : "";

            const descriptionText = item.identified
                ? (item["id-description"] || item.description || "")
                : (item.description || "");

            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "space-between";
            row.style.gap = "10px";
            row.style.padding = "6px 0";
            row.style.borderBottom = "1px solid #ccc";

            row.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="images/${item.image}" 
                         style="width:50px; height:50px; object-fit:contain; mix-blend-mode: multiply;" />
                    <div>
                        <strong>${item.item}</strong>

                        <div style="font-size:12px; opacity:0.7;">
                            ${descriptionText}
                        </div>

                        <div style="
                            font-size:12px;
                            margin-top:4px;
                            color:#000000;
                            font-weight:bold;
                        ">
                            ${statText}
                        </div>
                    </div>
                </div>

                <button class="${buttonClass}" style="
                    background:#424141;
                    color:#d7d4d4;
                    padding:10px 16px;
                    border:1px solid #555;
                    box-shadow:0 1px 7px rgba(0,0,0,0.5);
                    border-radius:8px;
                    cursor:pointer;
                ">
                    Use
                </button>
            `;

            const btn = row.querySelector(`.${buttonClass}`);

            btn.addEventListener("click", () => {
                closeModal();
                onUse(item);
            });

            container.appendChild(row);
        });
    }

    setModalContent(container);
    setModalWidth("400px");
    showModalCloseButton();
    openModal();
}