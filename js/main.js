// main.js

import { loadWizards } from './wizards.js';
import { loadHorses } from './horses.js';
import { loadItems } from './items.js';
import { loadSpells } from './loadSpells.js';
import { loadEnchantments } from './loadEnchantments.js';
import { setAllSpells } from './spells.js';
import { loadEnemies } from './enemies.js';
import { loadNodeIndex } from './loadNodeIndex.js';
import { startGameFlow } from './gameFlow.js';

const gameDiv = document.getElementById('game');

let nodeIndex = {};
let wizards = {};
let horses = {};
let items = {};
let spells = {};
let enchantments = {};
let enemies = {};


// ---------------- Initialize Game ----------------
async function initGame() {

    wizards = await loadWizards();
    horses = await loadHorses();
    items = await loadItems();
    spells = await loadSpells();
    enchantments = await loadEnchantments();
    enemies = await loadEnemies();
    nodeIndex = await loadNodeIndex();

    setAllSpells(spells);

    startGameFlow(
        gameDiv,
        wizards,
        horses,
        items,
        enchantments,
        enemies,
        initGame,
        nodeIndex
    );

}

// ---------------- Start ----------------
initGame();