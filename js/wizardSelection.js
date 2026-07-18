// wizardSelection.js
import { createWizardCard } from "./wizardCard.js";

export function showWizardSelection(container, wizards, onWizardSelected) {

    container.innerHTML = "";

    const heading = document.createElement('div');
    heading.textContent = "Choose your Wizard";
    heading.style.textAlign = "center";
    heading.style.marginTop = "5px";
    heading.style.marginBottom = "5px";
    heading.style.fontSize = "22px";

    container.appendChild(heading);

    // ---------------- Options Container ----------------
    const options = document.createElement('div');
    options.style.marginBottom = "10px";
    options.style.display = "grid";
    options.style.gridTemplateColumns = "1fr 1fr";
    options.style.columnGap = "10px";
    options.style.rowGap = "8px";
    options.style.alignItems = "start";



    container.appendChild(options);

    // ---------------- Safe Wizard Check ----------------
    if (!wizards || Object.keys(wizards).length === 0) {

        const msg = document.createElement('p');
        msg.textContent = "No wizards available.";
        msg.style.color = "red";

        container.appendChild(msg);

        console.warn("Wizard list empty or undefined:", wizards);

        return;
    }

    // ---------------- Wizard Buttons ----------------
    Object.keys(wizards).forEach(name => {

        const wizard = wizards[name];

        // Card
        const card = createWizardCard(
    {
        ...wizard,
        selectedWizard: wizard,
        name
    },
    true,
    () => {

        onWizardSelected({

            wizardName: wizard.wizardName,
            name,
            ...wizard,
            selectedWizard: wizard,
            debugMode: false // CHANGE TO FALSE FOR GAME

        });

    },
    true
);
        options.appendChild(card);
    });

}