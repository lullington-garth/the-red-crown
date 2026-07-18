// enchantmentModals.js

import { setModalContent, openModal, closeModal, setModalWidth } from "./modal.js";
import { runMagicRevealEffect } from "./magicRevealEffect.js";
import { showItemOverlay } from "./itemOverlay.js";
import { removeGold } from "./gold.js";

export function openEnchantmentSelectionModal(
    playerStats,
    onSelect
) {

    const inv = playerStats.inventory;

    const allItems = [
        ...(inv.carriedItems || []),
        ...(Object.values(inv.wornItems || {}).filter(Boolean))
    ];

    const excludedTypes = ["coin"];
    const excludedStatMods = ["pickup", "use"];

    const items = allItems.filter(item =>
        item &&
        !excludedTypes.includes(item.type) &&
        !excludedStatMods.includes(item["stat-mod-type"])
    );

    const container = document.createElement("div");

    container.innerHTML = `
        <h2 style="margin-top:0;">
            Select an item to enchant
        </h2>
    `;

    if (items.length === 0) {

                showItemOverlay(
                    {
                        item: "Enchantment",
                        image: "witchHat.jpg",
                        "display-size": "medium"
                    },

                    `You do not have any suitable items<br>for enchantment.`
                );
    
                return;
    } else {

            const success = removeGold(playerStats, 10);

            if (!success) {
                showItemOverlay(
                    {
                        item: "Enchantment",
                        image: "gold.jpg",
                        "display-size": "medium"
                    },

                    `You do not have enough gold.<br><br>
                    10 Gold Pieces are required for enchanting.`
                );
                return;
            }

        items.forEach(item => {

            const row = document.createElement("div");

            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "space-between";
            row.style.gap = "10px";
            row.style.padding = "8px 0";
            row.style.borderBottom = "1px solid #ccc";

            row.innerHTML = `
                <div style="
                    display:flex;
                    align-items:center;
                    gap:12px;
                ">
                    <img src="images/${item.image}"
                        style="
                            width:60px;
                            object-fit:contain;
                            mix-blend-mode: multiply;
                        " />

                    <div>
                        <strong>${item.item}</strong>

                        <div style="
                            font-size:12px;
                            opacity:0.7;
                        ">
                            ${item.description || ""}
                        </div>
                    </div>
                </div>

                <button class="enchant-btn" style="
                    background:#424141;
                    color:#d7d4d4;
                    padding:10px 16px;
                    border:1px solid #555;
                    box-shadow:0 1px 7px rgba(0,0,0,0.5);
                    border-radius:8px;
                    cursor:pointer;
                ">
                    Enchant
                </button>
            `;

            row.querySelector(".enchant-btn")
                .addEventListener("click", () => {

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

export function showEnchantmentResultModal({
    item,
    enchantment,
    onComplete
}) {

    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.overflow = "hidden";
    container.style.wordBreak = "break-word";
    container.style.overflowWrap = "anywhere";
    container.style.flexDirection = "column";
    container.style.height = "400px";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.padding = "30px";
    container.style.textAlign = "center";
    container.style.minHeight = "260px";
    container.style.gap = "15px";

    const title = document.createElement("h2");
    title.textContent = "Enchantment";
    title.style.margin = "5px";

    const itemImage = document.createElement("img");

    itemImage.style.width = "96px";
    itemImage.style.height = "96px";
    itemImage.style.objectFit = "contain";
    itemImage.style.transition = "filter 0.2s ease";

    itemImage.src = `images/${item.image}`;
    itemImage.style.mixBlendMode = "multiply";

    const text = document.createElement("div");

    text.style.fontSize = "1.3rem";
    text.style.fontWeight = "bold";
    text.style.minHeight = "40px";
    text.style.letterSpacing = "1px";
    text.style.color = "#424141";

    const message = document.createElement("div");

    message.style.opacity = "0";
    message.style.transition = "opacity 0.4s ease";
    message.innerHTML = `
        ...has been bestowed upon your ${item.type}:<br>${item.item}
        <hr>
        ${enchantment["id-description"]}
        ${enchantment["stat-mod"] !== "None" ? `<hr>${enchantment["stat-mod"]}` : ""}
    `;

    const closeBtn = document.createElement("button");

    closeBtn.textContent = "Close";

    closeBtn.style.padding = "10px 20px";
    closeBtn.style.borderRadius = "8px";
    closeBtn.style.backgroundColor = "#424141";
    closeBtn.style.color = "#d7d4d4";
    closeBtn.style.border = "1px solid #555";
    closeBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.opacity = "0";
    closeBtn.style.transition = "opacity 0.4s ease";

    container.appendChild(itemImage);
    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(message);
    container.appendChild(closeBtn);

    setModalWidth("420px");
    setModalContent(container);
    openModal();

    const oldName =
        "Enchanting Object" ||
        "Unknown Enchantment";

    const newName =
        `${enchantment.description}...` ||
        "Unknown Enchantment";

    runMagicRevealEffect({
        textElement: text,
        imageElement: itemImage,
        oldText: oldName,
        finalText: newName,
        finalImage: `images/${item.image}`,
        baseColor: "#424141",

        onComplete: () => {

            message.style.opacity = "1";
            closeBtn.style.opacity = "1";
        }
    });

    closeBtn.addEventListener("click", () => {

        closeModal();

        if (onComplete) {
            onComplete();
        }
    });
}