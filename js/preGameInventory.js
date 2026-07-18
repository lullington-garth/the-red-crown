// preGameInventory.js

import { showInventoryUI } from './inventoryUI.js';

export function openPreGameInventory(gameDiv, playerStats, onStartGame) {
    gameDiv.innerHTML = "";

    // ---- Start Game Button (now at top) ----
    const startBtn = document.createElement('button');
    startBtn.textContent = "Start Game";
    startBtn.style.display = "block";
    startBtn.style.marginBottom = "20px"; // spacing below button

    startBtn.addEventListener('click', () => {
        onStartGame(playerStats);
    });

    gameDiv.appendChild(startBtn);

    // ---- Inventory Container ----
    const inventoryContainer = document.createElement('div');
    gameDiv.appendChild(inventoryContainer);

    // Render inventory
    showInventoryUI(inventoryContainer, playerStats, null);
}