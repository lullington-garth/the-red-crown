// gameplayButtons.js

export function createGameplayButtons({
    playerStats,
    items,
    openInventory,
    openStats,
    returnToMap
}) {
    const buttonRow = document.createElement("div");
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "10px";
    buttonRow.style.position = "sticky";
    buttonRow.style.top = "0";
    buttonRow.style.zIndex = "1000";
//    buttonRow.style.background = "#ffffff";
    buttonRow.style.padding = "40px";
    buttonRow.style.marginTop = "0";
    buttonRow.style.margin = "0";
    buttonRow.style.backgroundImage = "url('images/paper.jpg')";
    buttonRow.style.backgroundSize = "cover";
    buttonRow.style.backgroundPosition = "center";
    buttonRow.style.border = "1px solid #555";
    buttonRow.style.borderRadius = "10px";
    buttonRow.style.overflow = "hidden";

    // -----------------------------
    // Stats
    // -----------------------------
    const statBtn = document.createElement("button");
    statBtn.textContent = "Stats";
    statBtn.style.backgroundColor = "#424141";
    statBtn.style.color = "#d7d4d4";
    statBtn.style.border = "1px solid #555";
    statBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    statBtn.style.transition = "0.2s ease"; 
    statBtn.style.borderRadius = "6px";
    statBtn.style.width = "130px";
    statBtn.style.height = "35px";
    statBtn.style.fontSize = "20px";
    statBtn.addEventListener("click", openStats);
    buttonRow.appendChild(statBtn);
    

    // -----------------------------
    // Inventory
    // -----------------------------
    const invBtn = document.createElement("button");
    invBtn.textContent = "Inventory";
    invBtn.style.backgroundColor = "#424141";
    invBtn.style.color = "#d7d4d4";
    invBtn.style.border = "1px solid #555";
    invBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    invBtn.style.transition = "0.2s ease"; 
    invBtn.style.borderRadius = "6px"
    invBtn.style.width = "130px"
    invBtn.style.height = "35px"
    invBtn.style.fontSize = "20px";
    invBtn.addEventListener("click", openInventory);
    buttonRow.appendChild(invBtn);

    // -----------------------------
    // Wizard Info
    // -----------------------------
    const wizardInfo = document.createElement("span");
    wizardInfo.textContent = `${playerStats.wizardName} - The ${playerStats.wizardColor} Wizard`;

    wizardInfo.style.marginLeft = "30px";
    wizardInfo.style.alignSelf = "center";   // Vertically centers it
    wizardInfo.style.color = "#333";
    wizardInfo.style.fontFamily = "'Book Antiqua', Palatino, serif";
    wizardInfo.style.fontSize = "22px";

    buttonRow.appendChild(wizardInfo);

    return buttonRow;

}