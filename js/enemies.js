// enemies.js

export async function loadEnemies() {
    const response = await fetch('./data/enemies.json'); // adjust path if needed
    if (!response.ok) {
        throw new Error('Could not load enemies JSON');
    }
    const enemiesData = await response.json();
    return enemiesData;
}