// wizardModal.js

import {
    setModalContent,
    openModal,
    showModalCloseButton,
    setModalWidth,
    closeModal
} from "./modal.js";

export function showWizardModal(playerStats) {

    const wizard = playerStats.selectedWizard || playerStats;

    const container = document.createElement("div");
    container.style.textAlign = "center";

    const title = document.createElement("h2");
    title.textContent = wizard.wizardName;
    title.style.marginTop = "0";
    title.style.marginBottom = "15px";

    const img = document.createElement("img");
    img.src = `images/${playerStats.name.toLowerCase()}Wizard.jpg`;
    img.style.width = "475px";
    img.style.maxWidth = "100%";
    img.style.mixBlendMode = "multiply";
    img.style.marginBottom = "0px";

    const theme = document.createElement("p");
    theme.innerHTML = `<strong>${wizard.theme}</strong>`;
    theme.style.fontSize = "20px";
    theme.style.marginBottom = "10px";

    const starterItem = document.createElement("p");
    starterItem.innerHTML = `${playerStats.wizardName} starts the game with <strong>${wizard.starterItem}</strong>. ${wizard.starterItemDescription}`;
    starterItem.style.fontSize = "20px";
    starterItem.style.marginBottom = "10px";
    starterItem.style.textAlign = "left";
    starterItem.style.lineHeight = "1.6";
    starterItem.style.marginLeft = "15px";

    const bonusStat = Object.keys(wizard.bonus)[0];
    const bonusValue = wizard.bonus[bonusStat];

    const bonus = document.createElement("p");

    let bonusText =
        `${wizard.bonusWords} As such he starts the game with a <strong>+${bonusValue}</strong> boost to his <strong>${bonusStat}</strong> stat roll.`;

    if (wizard.wizardName === "Terry") {
        bonusText += " He also begins the game with <strong>1 extra ATTACK point</strong>.";
    }

    bonus.innerHTML = bonusText;

    bonus.style.fontSize = "20px";
    bonus.style.marginBottom = "10px";
    bonus.style.textAlign = "left";
    bonus.style.lineHeight = "1.6";
    bonus.style.marginLeft = "15px";

    const bio = document.createElement("p");
    bio.textContent = wizard.bio;
    bio.style.textAlign = "left";
    bio.style.lineHeight = "1.6";
    bio.style.marginLeft = "15px";

    const returnBtn = document.createElement("button");

    returnBtn.textContent = "Return to Selection";
    returnBtn.style.display = "block";
    returnBtn.style.margin = "25px auto 0";
    returnBtn.style.height = "35px";
    returnBtn.style.backgroundColor = "#424141";
    returnBtn.style.color = "#d7d4d4";
    returnBtn.style.border = "1px solid #555";
    returnBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    returnBtn.style.borderRadius = "6px";
    returnBtn.style.cursor = "pointer";
    returnBtn.style.fontSize = "20px";
    returnBtn.style.marginBottom = "30px";

    returnBtn.addEventListener("click", () => {
        closeModal();
    });

    container.appendChild(title);
    container.appendChild(img);
    container.appendChild(theme);
    container.appendChild(bio);
    container.appendChild(starterItem);
    container.appendChild(bonus);
    container.appendChild(returnBtn);

    setModalWidth("500px");
    setModalContent(container);
    showModalCloseButton();
    openModal();
}