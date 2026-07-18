// horses.js
export async function loadHorses() {
    const response = await fetch('./data/horses.json'); // adjust path if needed
    if (!response.ok) {
        throw new Error('Could not load horses JSON');
    }
    const horsesData = await response.json();
    return horsesData;
}