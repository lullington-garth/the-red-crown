// spellsUI.js
import { getEquippedBook, getBookSpells } from './spells.js';
import { createSpellCard, createCombatSpellCard } from './spellRenderer.js';

// Render spells of a book in a container
export function showSpellBook(container, book, wizardColor) {
    container.innerHTML = ""; // Clear previous

    if (!wizardColor) {
        container.innerHTML = "<em>Wizard colour not defined.</em>";
        return;
    }

    if (!book || !book.spells || book.spells.length === 0) {
        container.innerHTML = "<em>No spells found in this book.</em>";
        return;
    }

    // Header with image + title
    const header = document.createElement('div');
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.gap = "10px";
    header.style.marginBottom = "13px";
    header.style.fontSize = "20px";

    header.innerHTML = `
        <img src="images/${book.item.image}" 
             alt="${book.item.item}" 
             style="width: 50px; height: 50px; object-fit: contain; mix-blend-mode:multiply;" />
        <h4 style="margin: 0;">${book.item.item}</h4>
    `;

    container.appendChild(header);

    book.spells.forEach(spell => {
        const card = createSpellCard(spell, wizardColor);
        container.appendChild(card);
    });
}

// Helper: show currently equipped book
export function showEquippedBook(container, wizardColor) {
    const book = getEquippedBook();
    if (!book) {
        container.innerHTML = "<em>No spell book equipped.</em>";
        return;
    }
    showSpellBook(container, book, wizardColor);
}

export function showCombatSpells(container, book, wizardColor, onCast, onInspect) {
    container.innerHTML = "";

    if (!book || !book.spells || book.spells.length === 0) {
        container.innerHTML = "<em>No combat spells available.</em>";
        return;
    }

    book.spells.forEach(spell => {
        const card = createCombatSpellCard(spell, wizardColor);

        //  Inspect (popup)
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            if (onInspect) onInspect(spell);
        });

        // ⚔️ Cast (optional — if you want separate trigger later)
        // You could attach this to a button instead
        // if (onCast) onCast(spell);

        container.appendChild(card);
    });
}

export function showBookPreview(container, book, wizardColor, onInspect) {
    container.innerHTML = "";

    if (!book || !book.spells || book.spells.length === 0) {
        container.innerHTML = "<em>No spells available.</em>";
        return;
    }

    book.spells.forEach(spell => {
        const card = createCombatSpellCard(spell, wizardColor);
        card.style.width = "100%";
        card.style.boxSizing = "border-box";
        card.addEventListener("click", () => {
            if (onInspect) onInspect(spell);
        });

        container.appendChild(card);
    });
}

// Helper: show any book from inventory (by book item)
export function showInventoryBook(container, bookItem, wizardColor) {
    const spells = getBookSpells(bookItem.id);
    showSpellBook(container, { item: bookItem, spells }, wizardColor);
}

export function hasEquippedSpellBook(playerStats) {
    return Boolean(
        playerStats.inventory?.wornItems?.book &&
        getEquippedBook()
    );
}

export function renderSpellsCell({
    spellsDiv,
    playerStats,
    openSpellModal
}) {

    spellsDiv.innerHTML = "";

const spellsEnabled = hasEquippedSpellBook(playerStats);

if (!spellsEnabled) {
    spellsDiv.innerHTML = "<p style='margin:0'>No spell book equipped</p>";
    return;
}

    const book = getEquippedBook();

    if (!book) {
        spellsDiv.innerHTML = "<p style='margin:0'>No spell book equipped</p>";
        return;
    }

    showCombatSpells(
        spellsDiv,
        book,
        playerStats.wizardColor,
        (spell) => {
            console.log("Cast spell:", spell);
        },
        (spell) => openSpellModal(spell, playerStats.wizardColor)
    );
}