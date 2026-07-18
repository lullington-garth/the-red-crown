// preGameBookSelection.js
import { equipBook, getBookSpells  } from './spells.js';
import { showBookPreview } from './spellsUI.js';
import { openSpellModal } from './spellsModal.js';

export function showBookSelection(container, playerStats, items, onComplete) {
    container.innerHTML = "";

    const wrapper = document.createElement('div');
    wrapper.style.marginTop = "0px";

    const header = document.createElement('h2');
    header.textContent = "Select Spell Book";
    header.style.marginTop = "0px";
    header.style.marginBottom = "5px";
    header.style.textAlign = "center";
    wrapper.appendChild(header);

    const listContainer = document.createElement('div');
    listContainer.style.display = "grid";
    listContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
    listContainer.style.gap = "5px";
    listContainer.style.marginTop = "0px";
    wrapper.appendChild(listContainer);

    const bookIds = ["0009", "0010", "0011", "0012"];
    let selectedCard = null; // track highlighted card

    bookIds.forEach(id => {
        const bookItem = items.find(it => it.id === id);
        if (!bookItem) return;

        const bookCard = document.createElement('div');
        bookCard.style.border = "1px solid #ccc";
        bookCard.style.padding = "10px";
        bookCard.style.borderRadius = "8px";
        bookCard.style.border = "1px solid #878787";
//        bookCard.style.backgroundColor = "#f9f9f9"; // white/light card background
        bookCard.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        bookCard.style.cursor = "pointer";
        const bookHeader = document.createElement("div");
        bookHeader.style.display = "flex";
        bookHeader.style.alignItems = "center";
        bookHeader.style.gap = "5px";
        bookHeader.style.marginBottom = "12px";

        bookHeader.innerHTML = `
            <h3 style="
                margin:0;
                font-family:'Book Antiqua', Palatino, serif;
                font-size:18px;
                margin-bottom:0px;
            ">
                ${bookItem.item}
            </h3>
        `;

        bookCard.appendChild(bookHeader);

        const spellsContainer = document.createElement('div');

        const book = {
            item: bookItem,
            spells: getBookSpells(bookItem.id)
        };

        showBookPreview(
            spellsContainer,
            book,
            playerStats.wizardColor,
            (spell) => openSpellModal(spell, playerStats.wizardColor)
        );

        bookCard.appendChild(spellsContainer);

        const selectBtn = document.createElement('button');
        selectBtn.textContent = "Select Book";
        selectBtn.style.marginTop = "10px";
        selectBtn.style.display = "block";
        selectBtn.style.width = "100%";
        selectBtn.style.height = "35px"
        selectBtn.style.backgroundColor = "#424141";
        selectBtn.style.color = "#d7d4d4";
        selectBtn.style.border = "1px solid #555";
        selectBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
//        selectBtn.style.padding = "10px 16px";
        selectBtn.style.fontSize = "16px";
        selectBtn.style.cursor = "pointer";
        selectBtn.style.borderRadius = "6px";


        selectBtn.addEventListener('click', () => {
            playerStats.inventory.wornItems.book = bookItem;

            // CRITICAL: sync spell system
            equipBook(bookItem);

            if (onComplete) onComplete(playerStats);
        });

        bookCard.addEventListener('click', () => {
            // highlight selected book
            if (selectedCard) selectedCard.style.borderColor = "#ccc";
            bookCard.style.borderColor = "#505051";
            selectedCard = bookCard;
        });

        bookCard.appendChild(selectBtn);
        listContainer.appendChild(bookCard);
    });

    const footer = document.createElement("div");
    footer.style.marginTop = "5px";
    footer.style.paddingTop = "0px";
    footer.style.fontSize = "13px";
    footer.style.lineHeight = "1.4";
    footer.style.textAlign = "center";

    footer.innerHTML = `
        <div style="margin-bottom:8px;">
            <strong>Spell Type:</strong>
            <img src="icons/magicAttack.svg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;">
            Attack&nbsp;&nbsp;|
            <img src="icons/explosive.svg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;">
            Explosive&nbsp;&nbsp;|
            <img src="icons/slowBurn.svg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;">
            Slow Burn&nbsp;&nbsp;|
            <img src="icons/defence.svg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;">
            Defence&nbsp;&nbsp;|
            <img src="icons/special.svg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;">
            Miscellaneous
        </div>

        <div>
            <strong>Effect Type:</strong>
            <img src="icons/meleeAttack.jpg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;mix-blend-mode:multiply;">
            Damage&nbsp;&nbsp;|
            <img src="icons/duration.jpg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;mix-blend-mode:multiply;">
            Duration&nbsp;&nbsp;|
            <img src="icons/aoe.jpg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;mix-blend-mode:multiply;">
            Area of Effect&nbsp;&nbsp;|
            <img src="icons/risk.jpg" style="width:16px;height:16px;vertical-align:middle;margin:0 3px;mix-blend-mode:multiply;">
            Risk of Mis-cast
        </div>
    `;

    wrapper.appendChild(footer);    

    container.appendChild(wrapper);
}