// wizardCard.js
import { showWizardModal } from "./wizardModal.js";

export function createWizardCard(playerStats, includeButton = false, onSelect = null, showBorder = false) {

    const wizard = playerStats.selectedWizard || playerStats;

    const card = document.createElement("div");
    card.style.textAlign = "center";
    card.style.height = "auto";
    card.style.position = "relative";

    if (showBorder) {
        card.style.border = "1px solid #999";
        card.style.borderRadius = "10px";
        card.style.padding = "10px";
//        card.style.background = "#f8f8f8";
    }

    // Image
    const img = document.createElement("img");
    img.src = `images/${playerStats.name.toLowerCase()}Wizard.jpg`;
    img.alt = wizard.wizardName;
    img.style.width = "100%";
    img.style.maxWidth = "265px";
    img.style.display = "block";
    img.style.margin = "0 auto 10px";
    img.style.mixBlendMode = "multiply";

    // Theme
    const theme = document.createElement("p");
    theme.innerHTML = `<strong>${wizard.theme}</strong>`;
    theme.style.fontSize = "18px";
    theme.style.marginBottom = "10px";

    // Colour
    const colour = document.createElement("p");
    colour.textContent = `The ${playerStats.name} Wizard`;
    colour.style.marginBottom = "5px";
    colour.style.marginTop = "5px";
    

    // Bonus
    const bonusStat = Object.keys(wizard.bonus)[0];
    const bonusValue = wizard.bonus[bonusStat];

    const bonus = document.createElement("p");
    bonus.textContent = `Bonus: +${bonusValue} ${bonusStat}`;
    bonus.style.marginTop = "0px";
    bonus.style.marginBottom = "5px";

    const starterItemName = playerStats.starterItem;

    const starterItem = document.createElement("div");
    starterItem.textContent = `Starter Item: ${starterItemName}`;
    starterItem.style.marginTop = "0px";
    starterItem.style.marginBottom = "15px";

    card.appendChild(img);
    card.appendChild(theme);
    card.appendChild(colour);
    card.appendChild(bonus);

    if (includeButton && onSelect) {

    card.appendChild(starterItem);

        const btn = document.createElement("button");

        btn.textContent = wizard.wizardName;
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.padding = "5px 5px";
        btn.style.fontSize = "16px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.width = "140px";
        btn.style.marginBottom = "0px";

        btn.addEventListener("click", onSelect);

        card.appendChild(btn);

        const cyclone = document.createElement("img");
        cyclone.src = "images/cyclone.jpg";
        cyclone.alt = "Cyclone";
        cyclone.style.position = "absolute";
        cyclone.style.left = "10px";
        cyclone.style.bottom = "12px";
        cyclone.style.width = "20px";
        cyclone.style.height = "20px";
        cyclone.style.mixBlendMode = "multiply";
        cyclone.style.border = "1px solid #555";
        cyclone.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        cyclone.style.borderRadius = "50%";
        cyclone.style.padding = "4px";
        cyclone.style.cursor = "pointer";

        cyclone.addEventListener("click", (e) => {
            e.stopPropagation();
            showWizardModal(playerStats);
        });

        card.appendChild(cyclone);
    }
    return card;
}