// purseModal.js

import { getGold, removeGold } from './gold.js';
import { showItemOverlay } from './itemOverlay.js';
import { showItemDescription } from './inventoryUI.js';
import { closeModal } from './modal.js';

export function createPurseModal(playerStats, onViewItem) {

    const wrapper = document.createElement("div");
    wrapper.style.padding = "45px";
    wrapper.style.borderRadius = "10px";
    wrapper.style.border = "1px solid #555";

    const pouchImg = document.createElement("img");
    pouchImg.src = "images/pouch.jpg";
    pouchImg.alt = "Coin Pouch";
    pouchImg.style.display = "block";
    pouchImg.style.margin = "0 auto 10px auto";
    pouchImg.style.width = "100px";
    pouchImg.style.objectFit = "contain";
    pouchImg.style.mixBlendMode = "multiply";

    wrapper.appendChild(pouchImg);

    const title = document.createElement("h2");
    title.textContent = "Coin Pouch";
    title.style.marginTop = "0";
    title.style.marginBottom = "10px";
    title.style.textAlign = "center";

    wrapper.appendChild(title);

    const gold = getGold(playerStats);

    // 💰 GOLD DISPLAY
    const goldRow = document.createElement("div");
    goldRow.style.display = "flex";
    goldRow.style.alignItems = "center";
    goldRow.style.gap = "8px";
    goldRow.style.marginBottom = "10px";

    const goldIcon = document.createElement("img");
    goldIcon.src = "images/gold.jpg";
    goldIcon.style.width = "35px";
    goldIcon.style.height = "35px";
    goldIcon.style.mixBlendMode = "multiply";

    const goldText = document.createElement("div");
    goldText.textContent = `${gold} gold pieces`;

    goldRow.appendChild(goldIcon);
    goldRow.appendChild(goldText);

    wrapper.appendChild(goldRow);

    // 🪙 FILTER COIN ITEMS
    const coins = playerStats.inventory.carriedItems.filter(
        item => item.type === "coin"
    );

    if (coins.length === 0) {
        const empty = document.createElement("div");
        empty.textContent = "No coin items.";
        empty.style.opacity = "0.7";
        wrapper.appendChild(empty);
        return wrapper;
    }

coins.forEach(item => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "8px";
    row.style.marginBottom = "6px";

    // 🪙 ICON
    const img = document.createElement("img");
    img.src = `images/${item.image}`;
    img.style.width = "35px";
    img.style.height = "35px";
    img.style.mixBlendMode = "multiply";

    // 📝 NAME
    const text = document.createElement("div");
    text.textContent = item.item;
    text.style.flex = "1";

    // 👁 VIEW BUTTON (same style as worn items)
    const viewBtn = document.createElement("button");
    viewBtn.style.borderRadius = "4px";
    viewBtn.style.fontSize = "16px";
    viewBtn.style.paddingTop = "5px";
    viewBtn.style.height = "30px";
    viewBtn.style.width = "40px";
    viewBtn.style.backgroundColor = "#424141";
    viewBtn.style.color = "#d7d4d4";
    viewBtn.style.border = "1px solid #555";
    viewBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

    const viewImg = document.createElement("img");
    viewImg.src = "images/btnView.svg";
    viewImg.style.width = "15px";
    viewImg.style.height = "15px";

    viewBtn.appendChild(viewImg);

viewBtn.addEventListener("click", () => {
    const descriptionEl = showItemDescription(item, playerStats);

    showItemOverlay(
        {
            item: "",
            image: "pouch.jpg"
        },
        descriptionEl.outerHTML,
//        () => closeModal()
    );
});

    row.appendChild(img);
    row.appendChild(text);
    row.appendChild(viewBtn);

    wrapper.appendChild(row);
});

    return wrapper;
}