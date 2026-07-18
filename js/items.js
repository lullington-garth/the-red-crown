// items.js
export async function loadItems() {
    const response = await fetch('./data/items.json'); // adjust path if needed
    if (!response.ok) {
        throw new Error('Could not load items JSON');
    }
    const itemsData = await response.json();
    return itemsData;
}