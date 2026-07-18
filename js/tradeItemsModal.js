// tradeItemsModal.js

import { setModalContent, setModalWidth, openModal, closeModal } from "./modal.js";

import { showItemDescription } from "./inventoryUI.js";

export function openTradeItemsModal(playerStats, {

    stallItem = null,
    sellerDisplayImage = null,
    filterFn = null,
    onTrade,
    onReturn

} = {}) {

    // =====================================
    // FILTER PLAYER ITEMS
    // =====================================
    const playerItems =
        (playerStats.inventory.carriedItems || []).filter(item => {

            if (typeof filterFn === "function") {
                return filterFn(item);
            }

            return true;
        });

    // =====================================
    // MAIN CONTAINER
    // =====================================
    let selectedPlayerItem = null;
    let selectedPlayerRow = null;

    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.height = "65vh";
    container.style.gap = "10px";

    // =====================================
    // HEADER
    // =====================================
    const header = document.createElement("div");

    header.innerHTML = `
        <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            margin-top:12px;
        ">

            <div style="
                text-align:center;
                font-weight:bold;
                border-bottom:1px solid #777;
                padding-bottom:6px;
            ">
                Your Items - Trade Away
            </div>

            <div style="
                text-align:center;
                font-weight:bold;
                border-bottom:1px solid #777;
                padding-bottom:6px;
            ">
                Seller Item - Gain
            </div>

        </div>
    `;

    // =====================================
    // BODY
    // =====================================
    const body = document.createElement("div");

    body.style.flex = "1";
    body.style.display = "grid";
    body.style.gridTemplateColumns = "1fr 1fr";
    body.style.gap = "10px";
    body.style.minHeight = "0";

    // =====================================
    // LEFT COLUMN
    // =====================================
    const leftColumn = document.createElement("div");

    leftColumn.style.overflowY = "auto";
    leftColumn.style.border = "1px solid #555";
    leftColumn.style.borderRadius = "8px";
    leftColumn.style.padding = "8px";

    // =====================================
    // RIGHT COLUMN
    // =====================================
    const rightColumn = document.createElement("div");

    rightColumn.style.overflowY = "auto";
    rightColumn.style.border = "1px solid #555";
    rightColumn.style.borderRadius = "8px";
    rightColumn.style.padding = "8px";

    // =====================================
    // PLAYER ITEMS
    // =====================================
    if (playerItems.length === 0) {

        leftColumn.innerHTML = `
            <p style="text-align:center;">
                No valid items available
            </p>
        `;
    }
    else {

        playerItems.forEach(item => {

            const row = document.createElement("div");

            row.style.padding = "6px 0";
            row.style.borderBottom = "1px solid #444";
            row.style.cursor = "pointer";
            row.style.borderRadius = "6px";

            const display = showItemDescription(
                item,
                playerStats,
                { compact: true }
            );

            row.appendChild(display);

            row.addEventListener("click", () => {

                if (selectedPlayerRow) {
                    selectedPlayerRow.style.background = "";
                }

                selectedPlayerItem = item;
                selectedPlayerRow = row;

                row.style.background = "rgba(200, 197, 197, 0.25)";

                updateTradeButtonState();
            });

            leftColumn.appendChild(row);
        });
    }

    // =====================================
    // STALL ITEM / CUSTOM DISPLAY
    // =====================================
    if (!stallItem && !sellerDisplayImage) {

        rightColumn.innerHTML = `
            <p style="text-align:center;">
                No item available
            </p>
        `;
    }

    // =====================================
    // CUSTOM SELLER IMAGE
    // =====================================
    else if (!stallItem && sellerDisplayImage) {

        const wrapper = document.createElement("div");

        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center";
        wrapper.style.alignItems = "center";
        wrapper.style.height = "100%";

        const img = document.createElement("img");

        img.src = sellerDisplayImage;

        img.style.maxWidth = "100%";
        img.style.maxHeight = "260px";
        img.style.objectFit = "contain";
        img.style.borderRadius = "8px";

        wrapper.appendChild(img);

        rightColumn.appendChild(wrapper);
    }

    // =====================================
    // NORMAL STALL ITEM
    // =====================================
    else {

        const row = document.createElement("div");

        row.style.padding = "6px 0";
        row.style.borderBottom = "1px solid #444";
        row.style.borderRadius = "6px";

        const display = showItemDescription(
            stallItem,
            playerStats,
            { compact: true }
        );

        row.appendChild(display);

        rightColumn.appendChild(row);
    }

    body.appendChild(leftColumn);
    body.appendChild(rightColumn);

    // =====================================
    // BUTTON STATE
    // =====================================
    function updateTradeButtonState() {

        const tradeBtn = footer.querySelector("#tradeBtn");

        if (!tradeBtn) return;

        const enabled = !!selectedPlayerItem;

        tradeBtn.disabled = !enabled;

        tradeBtn.style.opacity = enabled ? "1" : "0.45";
        tradeBtn.style.cursor = enabled ? "pointer" : "not-allowed";
    }

    // =====================================
    // FOOTER
    // =====================================
    const footer = document.createElement("div");

    footer.style.display = "flex";
    footer.style.gap = "10px";
    footer.style.paddingTop = "10px";

    footer.innerHTML = `
        <button id="tradeBtn" style="
            flex:1;
            padding:10px;
            border:none;
            border-radius:8px;
            cursor:not-allowed;
            background:#272424;
            color:white;
            font-weight:bold;
            opacity:0.45;
        " disabled>
            Trade
        </button>
    `;

    // =====================================
    // TRADE BUTTON
    // =====================================
    footer.querySelector("#tradeBtn")
        .addEventListener("click", () => {

            if (!selectedPlayerItem) {
                return;
            }

            // =====================================
            // REMOVE PLAYER ITEM
            // =====================================
            const carried =
                playerStats.inventory.carriedItems;

            const playerIndex =
                carried.indexOf(selectedPlayerItem);

            if (playerIndex !== -1) {
                carried.splice(playerIndex, 1);
            }

            // =====================================
            // ADD NEW ITEM
            // =====================================
            let newItem = null;

            if (stallItem) {

                newItem =
                    structuredClone(stallItem);

                playerStats.inventory.carriedItems.push(newItem);
            }

            if (onTrade) {
                onTrade({
                    tradedItem: selectedPlayerItem,
                    gainedItem: newItem || null
                });
            }

            closeModal();
        });

    // =====================================
    // BUILD MODAL
    // =====================================
    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(footer);

    setModalContent(container);
    setModalWidth("600px");

    openModal();
}