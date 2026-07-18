// openPickupSomeModal.js

import { setModalContent, setModalWidth, openModal, closeModal } from "./modal.js";
import { showItemDescription } from "./inventoryUI.js";
import { showConfirmOverlay } from "./overlayConfirm.js";

export function openPickupSomeModal(playerStats, items, {
    title = "Take what you want",
    onConfirm
}) {
    const selected = new Set();

    // =========================
    // LAYOUT CONTAINERS
    // =========================
    const container = document.createElement("div");
    const header = document.createElement("div");
    const body = document.createElement("div");
    const footer = document.createElement("div");

    // Main layout
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.height = "70vh";

    // Scrollable middle
    body.style.flex = "1";
    body.style.overflowY = "auto";
    body.style.padding = "10px 0";
    body.classList.add("hide-scrollbar");

    footer.style.paddingTop = "10px";

    // =========================
    // RENDER FUNCTION
    // =========================
    function render() {

        // -------------------------
        // HEADER (STATIC)
        // -------------------------
        header.innerHTML = `
            <h3 style="margin-top:0;">${title}</h3>
            <p>Select any items you want to take</p><hr>
        `;

        // -------------------------
        // BODY (SCROLLING)
        // -------------------------
        body.innerHTML = "";

        if (!items || items.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "No items available.";
            body.appendChild(empty);
        } else {

            items.forEach(item => {
                const row = document.createElement("div");

                row.style.display = "flex";
                row.style.alignItems = "center";
                row.style.justifyContent = "space-between";
                row.style.gap = "10px";
                row.style.padding = "6px 0";
//                row.style.borderBottom = "1px solid #424141";
                row.style.border = "1px solid #424141";
                row.style.borderRadius = "6px";
                row.style.marginBottom = "6px";

                // LEFT
                const itemDisplay = showItemDescription(item, playerStats, {
                    compact: true
                });

                const leftWrap = document.createElement("div");
                leftWrap.style.flex = "1";
                leftWrap.appendChild(itemDisplay);

                // Make the whole row clickable
                row.style.cursor = "pointer";
                row.addEventListener("mouseenter", () => {
                    if (row.dataset.selected !== "true") {
                        row.style.backgroundColor = "#00000010";
                    }
                });

                row.addEventListener("mouseleave", () => {
                    if (row.dataset.selected !== "true") {
                        row.style.backgroundColor = "";
                    }
                });
                row.style.border = "1px solid #424141";
                row.style.borderRadius = "6px";
                row.style.padding = "8px";
                row.dataset.selected = selected.has(item) ? "true" : "false";

                // Apply initial highlighting
                if (selected.has(item)) {
                    row.style.backgroundColor = "#7f83813f";
                    row.style.border = "1px solid #8f8c8c";
                }

                row.addEventListener("click", () => {

                    const isSelected = row.dataset.selected === "true";

                    if (isSelected) {
                        selected.delete(item);
                        row.dataset.selected = "false";
                        row.style.backgroundColor = "";
                        row.style.border = "1px solid transparent";
                    }
                    else {
                        selected.add(item);
                        row.dataset.selected = "true";
                        row.style.backgroundColor = "#ffffff3f";
                        row.style.border = "1px solid #8f8c8c";
                        row.style.boxShadow = "0 7px 7px rgba(0,0,0,0.5)";
                    }

                    updateFooter();
                });

                row.appendChild(leftWrap);

                body.appendChild(row);
            });
        }

        updateFooter();
    }

    // =========================
    // FOOTER (STATIC)
    // =========================
    function updateFooter() {

        const count = selected.size;

        const isValid = true; // allow 0 → all

    footer.innerHTML = `
        <div style="display:flex; gap:10px;">
            <button id="selectAllBtn" style="
                flex:1;
                background:#424141;
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                padding:10px;
                border-radius:8px;
                cursor:pointer;
            ">
                ${count === items.length ? "Deselect All" : "Select All"}
            </button>

            <button id="confirmBtn" style="
                flex:2;
                background:${isValid ? '#424141' : '#3a3a3a'};
                color:#d7d4d4;
                border:1px solid #555;
                box-shadow:0 1px 7px rgba(0,0,0,0.5);
                padding:10px;
                border-radius:8px;
                cursor:${isValid ? 'pointer' : 'not-allowed'};
                opacity:${isValid ? '1' : '0.5'};
            ">
                Take Selected (${count})
            </button>
        </div>
    `;

        const selectAllBtn = footer.querySelector("#selectAllBtn");

        if (selectAllBtn) {
            selectAllBtn.addEventListener("click", () => {

                if (selected.size === items.length) {
                    // Deselect all
                    selected.clear();
                } else {
                    // Select all
                    items.forEach(item => selected.add(item));
                }

                render(); // 🔁 re-render to update checkboxes + labels
            });
        }

        const btn = footer.querySelector("#confirmBtn");

        if (btn) {
            btn.addEventListener("click", () => {

                // ⚠️ No items selected → confirm first
                if (selected.size === 0) {

                    showConfirmOverlay(
                        "You have not selected any items. Are you sure you want to continue?",
                        {
                            onConfirm: () => {
                                closeModal();
                                if (onConfirm) {
                                    onConfirm([]);
                                }
                            },
                            onCancel: () => {
                                // do nothing → return to modal
                            }
                        }
                    );

                    return;
                }

                // Normal flow
                closeModal();

                if (onConfirm) {
                    onConfirm(Array.from(selected));
                }
            });
        }
    }

    // =========================
    // INIT
    // =========================
    render();

    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(footer);

    setModalContent(container);
    setModalWidth("450px");
    openModal();
}