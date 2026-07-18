// spells.js
import { loadSpells } from './loadSpells.js';

// -----------------------------
// GLOBAL SPELL STORAGE
// -----------------------------
export let allSpells = [];      // all spells loaded from JSON
let equippedBook = null;        // currently equipped book { item, spells: [] }

// -----------------------------
// Initialize spells from JSON
// -----------------------------
export async function initSpells() {
    allSpells = await loadSpells();
}

// -----------------------------
// Set all spells manually (used if already loaded in main.js)
// -----------------------------
export function setAllSpells(spellsArray) {
    allSpells = spellsArray;
}

// -----------------------------
// Equip a spell book (replaces any currently equipped book)
// -----------------------------
export function equipBook(bookItem) {
    if (!bookItem || bookItem.type !== 'book') {
        console.warn("Attempted to equip a non-book item.");
        return;
    }

    const bookSpells = getBookSpells(bookItem.id);

    if (!bookSpells || bookSpells.length === 0) {
        console.warn(`No spells found for book ID ${bookItem.id}`);
        return;
    }

    equippedBook = {
        item: bookItem,
        spells: bookSpells
    };
}

// -----------------------------
// Unequip the currently equipped book
// -----------------------------
export function unequipBook() {
    equippedBook = null;
}

// -----------------------------
// Get currently equipped book (or null)
// -----------------------------
export function getEquippedBook() {
    return equippedBook;
}

// -----------------------------
// Get all spells belonging to a given book ID
// -----------------------------
export function getBookSpells(bookId) {
    return allSpells.filter(spell => spell.bookId === bookId);
}

// -----------------------------
// Get a specific spell by ID
// -----------------------------
export function getSpellById(spellId) {
    return allSpells.find(spell => spell.id === spellId) || null;
}