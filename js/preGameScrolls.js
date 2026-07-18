// preGameScrolls.js
export function showScrollSelection(container, playerStats, items, onComplete) {

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.style.marginTop = "20px";
    wrapper.style.padding = "10px";

    const headerRow = document.createElement("div");
    headerRow.style.display = "flex";
    headerRow.style.alignItems = "center";
    headerRow.style.justifyContent = "space-between";
    headerRow.style.marginBottom = "10px";

    const headerLeft = document.createElement("div");
    headerLeft.style.display = "flex";
    headerLeft.style.alignItems = "center";
    headerLeft.style.gap = "8px";

    const header = document.createElement("h2");
    header.textContent = "Select up to Five Starting Scrolls";
    header.style.margin = "0";


    headerLeft.appendChild(header);

    headerRow.appendChild(headerLeft);

    wrapper.appendChild(headerRow);

    // -----------------------------------
    // Filter scrolls
    // -----------------------------------
    const wizardColor = playerStats.wizardColor.toLowerCase();

    const scrollItems = items.filter(item =>
        item.type === "scroll" &&
        Number(item.found) === 0 &&
        (item.wizard === "all" || item.wizard.toLowerCase() === wizardColor)
    );

    const wizardScroll = scrollItems.find(s => s.wizard.toLowerCase() === wizardColor);
    const otherScrolls = scrollItems.filter(s => s !== wizardScroll);

    const wizardHighlightColors = {
        blue: "#7f83813f",
        red: "#7f83813f",
        green: "#7f83813f",
        yellow: "#7f83813f"
    };
    const highlightColor = wizardHighlightColors[wizardColor] || "#e6f0ff"; // fallback

    // -----------------------------------
    // Selection tracker
    // -----------------------------------
    const selectedScrolls = new Set();
    const maxSelectable = 5;

    if (wizardScroll) selectedScrolls.add(wizardScroll.id);

    const counter = document.createElement("div");
    counter.style.fontWeight = "bold";
    counter.textContent = `Selected ${selectedScrolls.size - 1}/${maxSelectable}`;
    counter.style.fontSize = "18px";
    counter.style.marginRight = "30px";

    headerRow.appendChild(counter);

    const list = document.createElement("div");
    list.style.marginTop = "10px";
    list.style.display = "grid";
    list.style.gridTemplateColumns = "1fr 1fr";
    list.style.gap = "8px";

    // --- Wizard scroll ---
    if (wizardScroll) {
        const row = document.createElement("div");
        row.style.gridColumn = "1 / -1";
        row.style.border = `1px solid ${highlightColor}`;
        row.style.padding = "8px";
        row.style.marginBottom = "6px";
        row.style.borderRadius = "6px";
        row.style.backgroundColor = highlightColor;

        const label = document.createElement("label");
        label.style.fontWeight = "bold";

        label.appendChild(document.createTextNode(` ${wizardScroll.item} (Wizard Scroll)`));
        row.appendChild(label);

        // Description
        const desc = document.createElement("div");
        desc.textContent = wizardScroll["id-description"];
        desc.style.fontSize = "12px";
        row.appendChild(desc);

        // Magic cost
        if (wizardScroll["magic-cost"] != null) {
            const cost = document.createElement("div");
            cost.textContent = `Magic Cost: ${wizardScroll["magic-cost"]}`;
            cost.style.fontSize = "11px";
            cost.style.fontStyle = "italic";
            cost.style.color = "#333";
            row.appendChild(cost);
        }

        // Magic charges
        if (wizardScroll["charges"] != null) {
            const charges = document.createElement("div");
            charges.textContent = `Charges: ${wizardScroll["charges"]}`;   // ← ADD HERE
            charges.style.fontSize = "11px";
            charges.style.fontStyle = "italic";
            charges.style.color = "#333";
            row.appendChild(charges);
        }

        list.appendChild(row);
    }

    // --- Other scrolls ---
    const descriptions = []; // keep description refs
    const magicCosts = []; // keep refs for grey-out
    const magicCharges = []; // keep refs for grey-out
    const rows = []; // keep refs to row divs for highlighting

    otherScrolls.forEach(scroll => {
        const row = document.createElement("div");
        row.style.border = "1px solid #8f8c8c";
        row.style.padding = "8px";
        row.style.marginBottom = "6px";
        row.style.borderRadius = "6px";
        row.style.cursor = "pointer";
        row.dataset.selected = "false";
//        row.style.backgroundColor = "#f9f9f9";

        // Description
        const desc = document.createElement("div");
        desc.textContent = scroll["id-description"];
        desc.style.fontSize = "12px";

        // Magic cost
        const cost = document.createElement("div");
        if (scroll["magic-cost"] != null) {
            cost.textContent = `Magic Cost: ${scroll["magic-cost"]}`;
            cost.style.fontSize = "11px";
            cost.style.fontStyle = "italic";
            cost.style.color = "#333";
        }

        // Magic charges
        const charges = document.createElement("div");
        if (scroll["charges"] != null) {
            charges.textContent = `Charges: ${scroll["charges"]}`;
            charges.style.fontSize = "11px";
            charges.style.fontStyle = "italic";
            charges.style.color = "#333";
        }

        // Keep references for grey-out / highlighting
        descriptions.push(desc);
        magicCosts.push(cost);
        magicCharges.push(charges);
        rows.push(row);

        row.addEventListener("click", () => {

            const currentlySelected = row.dataset.selected === "true";

            if (!currentlySelected) {

                if (selectedScrolls.size - (wizardScroll ? 1 : 0) >= maxSelectable) {
                    return;
                }

                row.dataset.selected = "true";
                selectedScrolls.add(scroll.id);

            } else {

                row.dataset.selected = "false";
                selectedScrolls.delete(scroll.id);

            }

            counter.textContent =
                `Selected ${selectedScrolls.size - (wizardScroll ? 1 : 0)}/${maxSelectable}`;

            const selectedCount = selectedScrolls.size - (wizardScroll ? 1 : 0);

            rows.forEach((r, idx) => {

                const d = descriptions[idx];
                const c = magicCosts[idx];
                const ch = magicCharges[idx];

                const isSelected = r.dataset.selected === "true";

                if (isSelected) {

                    r.style.backgroundColor = highlightColor;
                    r.style.opacity = "1";

                    if (c) c.style.opacity = "1";
                    if (ch) ch.style.opacity = "1";

                } else {

                    const greyOut = selectedCount >= maxSelectable;

                    r.style.backgroundColor = "";
                    r.style.opacity = greyOut ? "0.5" : "1";

                    d.style.opacity = greyOut ? "0.5" : "1";

                    if (c) c.style.opacity = greyOut ? "0.5" : "1";
                    if (ch) ch.style.opacity = greyOut ? "0.5" : "1";
                }

            });

        });

        const title = document.createElement("div");
        title.textContent = scroll.item;
        title.style.fontWeight = "bold";

        row.appendChild(title);
        row.appendChild(desc);
        if (scroll["magic-cost"] != null) row.appendChild(cost);
        if (scroll["charges"] != null) row.appendChild(charges);

        list.appendChild(row);
    });

    // --- Decorative image in final grid cell ---
    const scrollImage = document.createElement("img");
    scrollImage.src = "icons/scroll.jpg";
    scrollImage.style.width = "100px";
    scrollImage.style.justifySelf = "center";
    scrollImage.style.alignSelf = "center";
    scrollImage.style.mixBlendMode = "multiply";

    list.appendChild(scrollImage);

    wrapper.appendChild(list);

    // -----------------------------------
    // Continue Button
    // -----------------------------------
    const btn = document.createElement("button");
    btn.textContent = "Continue to Horse Selection";
    btn.style.marginTop = "20px";
    btn.style.backgroundColor = "#424141";
    btn.style.color = "#d7d4d4";
    btn.style.border = "1px solid #555";
    btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    btn.style.padding = "10px 16px";
    btn.style.fontSize = "18px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";

    btn.addEventListener("click", () => {
        playerStats.inventory.selectedScrolls = [];

        if (wizardScroll) playerStats.inventory.selectedScrolls.push(wizardScroll);
        otherScrolls.forEach(scroll => {
            if (selectedScrolls.has(scroll.id)) playerStats.inventory.selectedScrolls.push(scroll);
        });

        // ---- ADD SELECTED SCROLLS TO INVENTORY ----
        playerStats.inventory.selectedScrolls.forEach(scroll => {
            if (!playerStats.inventory.carriedItems.includes(scroll)) {
                playerStats.inventory.carriedItems.push(scroll);
            }
        });

        if (onComplete) onComplete(playerStats);
    });
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
}