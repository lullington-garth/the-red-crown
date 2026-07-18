// loadSpells.js
export async function loadSpells() {
    const response = await fetch('./data/spells.json');
    if (!response.ok) {
        throw new Error('Could not load spells JSON');
    }
    const spellsData = await response.json();
    return spellsData;
}