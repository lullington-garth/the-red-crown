// openPickupSelectionModal.js

import { setModalContent, setModalWidth, openModal, closeModal } from "./modal.js";
import { showItemDescription } from "./inventoryUI.js";

export function openPickupSelectionModal(playerStats, items, {
    title = "Choose One Item",
    onSelect
}) {
    const container = document.createElement("div");

    container.innerHTML = `<h2 style="margin-top:0;">${title}</h2>`;

    if (!items || items.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No items available.";
        container.appendChild(empty);
    } else {
        items.forEach(item => {
            const row = document.createElement("div");

            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "space-between";
            row.style.gap = "10px";
            row.style.padding = "6px 0";
            row.style.borderBottom = "1px solid #414242";

            // Left side (item display)
            const itemDisplay = showItemDescription(item, playerStats, {
                compact: true
            });

            const leftWrap = document.createElement("div");
            leftWrap.style.flex = "1";
            leftWrap.classList.add("hide-scrollbar");
            leftWrap.appendChild(itemDisplay);

            // Right side (button)
            const btn = document.createElement("button");
            btn.textContent = "Select";
            btn.style.backgroundColor = "#424141";
            btn.style.color = "#d7d4d4";
            btn.style.border = "1px solid #555";
            btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            btn.style.padding = "8px 12px";
            btn.style.borderRadius = "8px";
            btn.style.cursor = "pointer";

            btn.addEventListener("click", () => {
                closeModal();
                onSelect(item);
            });

            row.appendChild(leftWrap);
            row.appendChild(btn);

            container.appendChild(row);
        });
    }

    setModalContent(container);
    setModalWidth("450px");
    openModal();
}