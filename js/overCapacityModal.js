import { setModalContent, openModal, closeModal } from "./modal.js";
import { showItemDescription } from "./inventoryUI.js";
import { showItemOverlay } from "./itemOverlay.js";

export function openOverCapacityModal({
    playerStats,
    newItems,
    maxSlots,
    onConfirm,
    filterFn
}) {

    const existingItems = [...playerStats.inventory.carriedItems];

    const allItems = [
        ...newItems.map(i => ({ ...i, isNew: true })),
        ...existingItems.map(i => ({ ...i, isNew: false }))
    ];

    // Don't show items that:
    // - take up no inventory space
    // - cannot be discarded
    let currentItems = allItems.filter(item =>
        (item["inventory-slots"] ?? 0) > 0 &&
        item["can-discard"] !== false
    );

    function calculateSlots(items = currentItems) {
        return items.reduce((sum, item) => {
            return sum + (item["inventory-slots"] || 0);
        }, 0);
    }

    // =========================
    // LAYOUT CONTAINERS
    // =========================
    const container = document.createElement("div");
    const header = document.createElement("div");
    const body = document.createElement("div");
    const footer = document.createElement("div");

    // Main layout styling
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.height = "70vh";
    
    // Scroll only middle section
    body.style.flex = "1";
    body.style.overflowY = "auto";
    body.style.padding = "10px 0";
    body.classList.add("hide-scrollbar");
    footer.style.paddingTop = "10px";

    function render() {

        const used = calculateSlots();
        const reduceItems = Math.max(0, used - maxSlots);

        // =========================
        // HEADER (STATIC)
        // =========================
        header.innerHTML = `
            <h3>Inventory Over Capacity - ${used} / ${maxSlots}</h3>
            <p>Reduce items by ${reduceItems} to continue</p>
        `;

        // clear scroll body only
        body.innerHTML = "";

        const newSection = document.createElement("div");
        newSection.innerHTML = `<h4>New Items</h4>`;

        const existingSection = document.createElement("div");
        existingSection.innerHTML = `<h4>Current Inventory</h4>`;

        function createRow(item) {

            const row = document.createElement("div");

            row.style.display = "flex";
            row.style.justifyContent = "space-between";
            row.style.alignItems = "flex-start";
            row.style.width = "100%";
            row.style.padding = "10px 0";
            row.style.gap = "10px";
            row.style.borderBottom = "1px solid rgb(0, 0, 0)";
            row.style.boxSizing = "border-box";

            const label = item.isNew ? "Leave" : "Discard";

            const descriptionEl = showItemDescription(item, playerStats, { compact: true });

            const left = document.createElement("div");
            left.style.flex = "1";
            left.style.minWidth = "0";
            left.appendChild(descriptionEl);

            const button = document.createElement("button");
            button.className = "remove-btn";
            button.textContent = label;

            button.style.backgroundColor = "#424141";
            button.style.color = "#d7d4d4";
            button.style.border = "1px solid #555";
            button.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            button.style.padding = "6px 10px";
            button.style.borderRadius = "6px";
            button.style.cursor = "pointer";
            button.style.height = "fit-content";

            const canInteract = filterFn ? filterFn(item) : true;

            if (!canInteract && !item.isNew) {
                button.disabled = true;
                button.style.opacity = "0.4";
            }

            button.addEventListener("click", () => {
                currentItems = currentItems.filter(i => i.id !== item.id);
                render();
            });

            row.appendChild(left);
            row.appendChild(button);

            return row;
        }

        // Populate sections
        currentItems.forEach(item => {
            const row = createRow(item);

            if (item.isNew) {
                newSection.appendChild(row);
            } else {
                existingSection.appendChild(row);
            }
        });

        body.appendChild(newSection);
        body.appendChild(existingSection);

        // =========================
        // FOOTER (STATIC)
        // =========================
function updateFooter() {

    const used = calculateSlots();

    const isValid =
        currentItems.length > 0 &&
        used <= maxSlots;

    footer.innerHTML = `
        <button id="confirmBtn" style="
            background:${isValid ? '#424141' : '#3a3a3a'};
            color:#d7d4d4;
            padding:10px 16px;
            border:1px solid #555;
            box-shadow: 0 1px 7px rgba(0,0,0,0.5);
            border-radius:8px;
            cursor:${isValid ? 'pointer' : 'not-allowed'};
            opacity:${isValid ? '1' : '0.5'};
        "
        ${!isValid ? 'disabled' : ''}>
            Return to Game
        </button>
    `;

    const confirmBtn = footer.querySelector("#confirmBtn");

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {

            const used = calculateSlots();

            const isStillValid =
                currentItems.length > 0 &&
                used <= maxSlots;

            if (!isStillValid) return;

            const finalItems = [...currentItems];

            closeModal();

            if (onConfirm) {
                onConfirm(finalItems);
            }
        });
    }
}

        updateFooter();
    }

    render();

    // assemble layout ONCE (important for sticky layout)
    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(footer);

    setModalContent(container);
    openModal();

    // attach after DOM exists
    const confirmBtn = footer.querySelector("#confirmBtn");

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {

            const used = calculateSlots();

            if (used > maxSlots || currentItems.length === 0) return;

            const finalItems = [...currentItems];

            closeModal();

            if (onConfirm) {
                onConfirm(finalItems);
            }
        });
    }
}