// scrollShredder.js

import { setModalContent, setModalWidth, openModal, closeModal } from "./modal.js";
import { removeGold } from "./gold.js";
import { showItemOverlay } from "./itemOverlay.js";
import { showItemDescription } from "./inventoryUI.js";
import { createSpellTransformationModal } from "./spellTransformationModal.js";

export function openScrollShredder(playerStats, {
    stallItems = [],
    onShred,
    onReturn
} = {}) {

    // =====================================
    // FILTER PLAYER SCROLLS
    // =====================================
    const playerScrolls =
        (playerStats.inventory.carriedItems || []).filter(
            item => item.type === "scroll"
        );

    // =====================================
    // MAIN CONTAINER
    // =====================================
    let selectedPlayerScroll = null;
    let selectedPlayerRow = null;

    let selectedStallScroll = null;
    let selectedStallRow = null;
    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.height = "70vh";
    container.style.gap = "10px";

    // =====================================
    // STATIC HEADER
    // =====================================
    const header = document.createElement("div");

    header.innerHTML = `
        <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:10px;
        ">

            <!-- LEFT -->
            <div style="
                width:120px;
                display:flex;
                justify-content:flex-start;
            ">
            </div>

            <!-- CENTRE -->
            <div style="
                flex:1;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                text-align:center;
            ">
                <img 
                    src="images/shredder.jpg"
                    alt="Scroll Shredder"
                    style="
                        width:100px;
                        height:100px;
                        object-fit:contain;
                        margin-bottom:6px;
                        mix-blend-mode: multiply;
                    "
                />

                <h2 style="
                    margin:0;
                ">
                    Scroll Shredder
                </h2>
            </div>

            <!-- RIGHT -->
            <div style="
                width:120px;
                display:flex;
                align-items:center;
                justify-content:flex-end;
                gap:6px;
                font-size:1.1rem;
                font-weight:bold;
            ">
                <span id="goldDisplay">${playerStats.gold || 0}</span>

                <img
                    src="images/gold.jpg"
                    alt="Gold"
                    style="
                        width:40px;
                        height:40px;
                        object-fit:contain;
                        mix-blend-mode: multiply;
                    "
                />
            </div>

        </div>

        <!-- COLUMN LABELS -->
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
                font-size: 18px;
            ">
                Your Spells - Shred
            </div>

            <div style="
                text-align:center;
                font-weight:bold;
                border-bottom:1px solid #777;
                padding-bottom:6px;
                font-size: 18px;
            ">
                Stall Spells - Gain
            </div>

        </div>
    `;

    // =====================================
    // SCROLLING BODY
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
    leftColumn.classList.add("hide-scrollbar");

    // =====================================
    // RIGHT COLUMN
    // =====================================
    const rightColumn = document.createElement("div");

    rightColumn.style.overflowY = "auto";
    rightColumn.style.border = "1px solid #555";
    rightColumn.style.borderRadius = "8px";
    rightColumn.style.padding = "8px";
    rightColumn.classList.add("hide-scrollbar");

    // =====================================
    // PLAYER SCROLLS
    // =====================================
    if (playerScrolls.length === 0) {

        leftColumn.innerHTML = `
            <p style="text-align:center;">
                No scrolls available
            </p>
        `;
    }
    else {

        playerScrolls.forEach(item => {

            const row = document.createElement("div");

            row.style.padding = "6px 0";
            row.style.borderBottom = "1px solid #444";

            const display = showItemDescription(
                item,
                playerStats,
                { compact: true }
            );

            row.appendChild(display);

            row.style.cursor = "pointer";
            row.style.borderRadius = "6px";

            row.addEventListener("click", () => {

                // Remove old highlight
                if (selectedPlayerRow) {
                    selectedPlayerRow.style.background = "";
                }

                selectedPlayerScroll = item;
                selectedPlayerRow = row;

                row.style.background = "rgba(255, 255, 255, 0.35)";

                updateShredButtonState();
            });

            leftColumn.appendChild(row);
        });
    }

    // =====================================
    // STALL ITEMS
    // =====================================
    if (stallItems.length === 0) {

        rightColumn.innerHTML = `
            <p style="text-align:center;">
                No spells available
            </p>
        `;
    }
    else {

        stallItems.forEach(item => {

            const row = document.createElement("div");

            row.style.padding = "6px 0";
            row.style.borderBottom = "1px solid #444";

            const display = showItemDescription(
                item,
                playerStats,
                { compact: true }
            );

            row.appendChild(display);

            row.style.cursor = "pointer";
            row.style.borderRadius = "6px";

            row.addEventListener("click", () => {

                // Remove old highlight
                if (selectedStallRow) {
                    selectedStallRow.style.background = "";
                }

                selectedStallScroll = item;
                selectedStallRow = row;

                row.style.background = "rgba(255, 255, 255, 0.35)";

                updateShredButtonState();
            });

            rightColumn.appendChild(row);
        });
    }

    body.appendChild(leftColumn);
    body.appendChild(rightColumn);

    function updateShredButtonState() {

        const shredBtn = footer.querySelector("#shredBtn");

        if (!shredBtn) return;

        const enabled =
            selectedPlayerScroll &&
            selectedStallScroll;

        shredBtn.disabled = !enabled;

        shredBtn.style.opacity = enabled ? "1" : "0.45";
        shredBtn.style.cursor = enabled ? "pointer" : "not-allowed";
    }

    // =====================================
    // STATIC FOOTER
    // =====================================
    const footer = document.createElement("div");

    footer.style.display = "flex";
    footer.style.gap = "10px";
    footer.style.paddingTop = "10px";

    footer.innerHTML = `
        <button id="shredBtn" style="
            flex:1;
            padding:10px;
            border-radius:8px;
            cursor:not-allowed;
            background:#424141;
            color:#d7d4d4;
            border:1px solid #555;                
            box-shadow:0 1px 7px rgba(0,0,0,0.5);
            font-weight:bold;
            opacity:0.45;
        " disabled>
            Shred
        </button>

        <button id="returnBtn" style="
            flex:1;
            padding:10px;
            border-radius:8px;
            cursor:pointer;
            background:#424141;
            color:#d7d4d4;
            border:1px solid #555;
            box-shadow:0 1px 7px rgba(0,0,0,0.5);
            font-weight:bold;
        ">
            Return to Stall
        </button>
    `;

    // =====================================
    // BUTTONS
    // =====================================
    footer.querySelector("#shredBtn")
        .addEventListener("click", () => {

            if (!selectedPlayerScroll || !selectedStallScroll) {
                return;
            }

            const success = removeGold(playerStats, 2);

            if (!success) {
                showItemOverlay(
                    {
                        item: "Spell Shredder",
                        image: "gold.jpg",
                        "display-size": "medium"
                    },

                    `You do not have enough gold.<br><br>
                    2 Gold Pieces are required for spell shredding.`
                );
                return;
            }

            // =====================================
            // REMOVE PLAYER SCROLL
            // =====================================
            const carried =
                playerStats.inventory.carriedItems;

            const playerIndex =
                carried.indexOf(selectedPlayerScroll);

            if (playerIndex !== -1) {
                carried.splice(playerIndex, 1);
            }

            // =====================================
            // ADD NEW SCROLL
            // =====================================
            const newScroll =
                structuredClone(selectedStallScroll);

            playerStats.inventory.carriedItems.push(newScroll);

            // =====================================
            // REMOVE FROM STALL INVENTORY
            // =====================================
            const stallIndex =
                stallItems.indexOf(selectedStallScroll);

            if (stallIndex !== -1) {
                stallItems.splice(stallIndex, 1);
            }

            // Update gold display in modal
            const goldDisplay = container.querySelector("#goldDisplay");

            if (goldDisplay) {
                goldDisplay.textContent = playerStats.gold;
            }

            if (onShred) {
                onShred();
            }

            // =====================================
            // SPELL TRANSFORMATION MODAL
            // =====================================
            createSpellTransformationModal({

                oldScroll: selectedPlayerScroll,
                newScroll,

                onComplete: () => {

                    openScrollShredder(playerStats, {
                        stallItems,
                        onShred,
                        onReturn
                    });
                }
            });
        });

    // =====================================
    // RETURN BUTTON
    // =====================================
        footer.querySelector("#returnBtn")
            .addEventListener("click", () => {

                closeModal();

                if (onReturn) {
                    onReturn();
                }
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