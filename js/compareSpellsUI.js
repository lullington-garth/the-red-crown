// compareSpellsUI.js
import { getBookSpells } from './spells.js';
import { showSpellBook } from './spellsUI.js';
import { buildCompareBook } from './compareSpells.js';
import { createSpellCard } from './spellRenderer.js';
import { scrollModalToTop } from "./modal.js";

// --------------------------------------------------
// Show comparison popup
// --------------------------------------------------
export function showCompareSpells(equippedBookItem, wizardColor, playerStats) {

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.padding = "12px";

    // ----------------------------------------
    // Fallback: no equipped book
    // ----------------------------------------
    if (!equippedBookItem) {
        container.innerHTML = "<em>No spell book equipped.</em>";
        return container;
    }

    const equippedSpells = getBookSpells(equippedBookItem.id);
    const baseBook = buildCompareBook(equippedBookItem, equippedSpells);

    // ----------------------------------------
    // Fallback: no spells found
    // ----------------------------------------
    if (!baseBook || baseBook.spells.length === 0) {
        container.innerHTML = "<em>No spells found in equipped book.</em>";
        return container;
    }

    // ----------------------------------------
    // LEFT COLUMN (equipped book)
    // ----------------------------------------
    const leftCol = document.createElement("div");
    leftCol.style.flex = "1";
    leftCol.style.borderRight = "1px solid #ccc";
    leftCol.style.paddingRight = "10px";
    leftCol.style.margin = "15px"

    showSpellBook(leftCol, baseBook, wizardColor);

    // ----------------------------------------
    // RIGHT COLUMN (comparison UI)
    // ----------------------------------------
    const rightCol = document.createElement("div");
    rightCol.style.flex = "1";
    rightCol.style.paddingLeft = "10px";

    const header = document.createElement("h4");
    header.textContent = "Comparison Book";
    header.style.fontSize = "20px";
    header.style.marginBottom = "40px";
    rightCol.appendChild(header);

    const bookList = document.createElement("div");
    bookList.style.display = "flex";
    bookList.style.flexDirection = "column";
    bookList.style.gap = "6px";

    const carriedBooks = playerStats.inventory.carriedItems
        .filter(item => item.type === "book" && item.id !== equippedBookItem.id);

    if (carriedBooks.length === 0) {

        const noneText = document.createElement("p");
        noneText.innerHTML = "<em>No other spell books available.</em>";
        rightCol.appendChild(noneText);

    } else {

        carriedBooks.forEach(bookItem => {

            const bookEntry = document.createElement("div");
            bookEntry.textContent = bookItem.item;
            bookEntry.style.padding = "6px";
            bookEntry.style.borderRadius = "6px";
            bookEntry.style.cursor = "pointer";
            bookEntry.style.backgroundColor = "#424141";
            bookEntry.style.color = "#d7d4d4";
            bookEntry.style.border = "1px solid #555";
            bookEntry.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

            bookEntry.addEventListener("click", () => {

                rightCol.innerHTML = "";

                const inventorySpells = getBookSpells(bookItem.id);

                // -----------------------------
                // Defence comparison
                // -----------------------------
                const equippedDefence = baseBook.spells.find(
                    spell => spell.type === "Defence"
                );

                const inventoryDefence = inventorySpells.find(
                    spell => spell.type === "Defence"
                );

                let defenceIsHigher = false;

                if (equippedDefence && inventoryDefence) {

                    const colorKey = wizardColor.toLowerCase();

                    const equippedDuration =
                        equippedDefence.duration?.[colorKey] ?? 0;

                    const inventoryDuration =
                        inventoryDefence.duration?.[colorKey] ?? 0;

                    defenceIsHigher = inventoryDuration > equippedDuration;
                }

                const finalSpells = inventorySpells;

                // -----------------------------
                // Header
                // -----------------------------
                const compareHeader = document.createElement('div');
                    compareHeader.style.display = "flex";
                    compareHeader.style.alignItems = "center";
                    compareHeader.style.gap = "10px";
                    compareHeader.style.marginBottom = "13px";
                    compareHeader.style.marginTop = "15px";
                    compareHeader.style.fontSize = "20px";
                    compareHeader.style.backgroundImage = "url('./images/paper1.jpg')";
                    compareHeader.innerHTML = `
                        <img src="images/${bookItem.image}" 
                            alt="${bookItem.item}" 
                            style="width: 50px; height: 50px; object-fit: contain; mix-blend-mode:multiply;" />
                        <h4 style="margin: 0;">${bookItem.item}</h4>
                    `;

                rightCol.appendChild(compareHeader);

                // -----------------------------
                // Render spells
                // -----------------------------
                finalSpells.forEach(spell => {

                    const colorKey = wizardColor.toLowerCase();
                    const comparableTypes = ["Attack", "Defence", "Explosive", "Slow Burn"];
                    const isComparable = comparableTypes.includes(spell.type);

                    let attackDelta = 0;
                    let durationDelta = 0;
                    let aoeDelta = 0;

                    if (isComparable) {
                        const equippedMirror = baseBook.spells.find(
                            eqSpell => eqSpell.type === spell.type
                        );

                        if (equippedMirror) {
                            attackDelta =
                                (spell.attack?.[colorKey] ?? 0) -
                                (equippedMirror.attack?.[colorKey] ?? 0);

                            durationDelta =
                                (spell.duration?.[colorKey] ?? 0) -
                                (equippedMirror.duration?.[colorKey] ?? 0);

                            aoeDelta =
                                spell.risk?.stat === "ROLL"
                                    ? 3.5
                                    : (spell.areaOfEffect?.[colorKey] ?? 0) -
                                      (equippedMirror.risk?.stat === "ROLL"
                                          ? 3.5
                                          : (equippedMirror.areaOfEffect?.[colorKey] ?? 0));
                        }
                    }

                    const card = createSpellCard(spell, wizardColor, {
                        attackDelta,
                        durationDelta,
                        aoeDelta,
                        isComparison: isComparable
                    });

                    rightCol.appendChild(card);
                });

                // -----------------------------
                // Compare another button
                // -----------------------------
                const compareAnotherBtn = document.createElement("button");
                compareAnotherBtn.textContent = "Compare another book";
                compareAnotherBtn.style.marginTop = "12px";
                compareAnotherBtn.style.backgroundColor = "#424141";
                compareAnotherBtn.style.color = "#d7d4d4";
                compareAnotherBtn.style.border = "1px solid #555";
                compareAnotherBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
                compareAnotherBtn.style.borderRadius = "6px";
                compareAnotherBtn.style.height = "35px";
                compareAnotherBtn.style.width = "100%";
                compareAnotherBtn.style.fontSize = "20px";

                compareAnotherBtn.addEventListener("click", () => {
                    rightCol.innerHTML = "";
                    rightCol.appendChild(header);
                    rightCol.appendChild(bookList);
                    scrollModalToTop();
                });

                rightCol.appendChild(compareAnotherBtn);
            });

            bookList.appendChild(bookEntry);
        });

        rightCol.appendChild(bookList);
    }

    // ----------------------------------------
    // Assemble layout
    // ----------------------------------------
    container.appendChild(leftCol);
    container.appendChild(rightCol);

    return container;
}