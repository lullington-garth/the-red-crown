// gameFlow.js
import { runWizardFlow } from './wizardFlow.js';
import { startGameplay } from './gameplay.js';
import { equipBook } from "./spells.js";
import { showCoverScreen } from "./coverScreen.js";
import { showRulesScreen } from "./rulesScreen.js";

export function startGameFlow(
    gameDiv,
    wizards,
    horses,
    items,
    enchantments,
    enemies,
    initGame,
    nodeIndex
) {

    showCoverScreen(gameDiv, () => {

    showRulesScreen(gameDiv, () => {

        runWizardFlow(gameDiv, wizards, horses, items, (playerStats) => {

        // ----------------------------
        // DEBUG MODE: set defaults
        // ----------------------------
        if (playerStats.debugMode) {

            // --- Default stats ---
            playerStats.stats = {
                SKILL:   { current: 10, max: 10, min: 0 },
                STAMINA: { current: 24, max: 24, min: 0 },
                LUCK:    { current: 10, max: 10, min: 0 },
                MAGIC:   { current: 10, max: 10, min: 0 },
                ATTACK:  { current: 2, max: 2, min: 2 }
            };

            // --- Default horse: Pack Horse ---
            const packHorse = horses.find(h => h.name === "Pack Horse");
            if (packHorse) {
                if (packHorse.statModifiers) {
                    Object.keys(packHorse.statModifiers).forEach(rawStat => {
                        const amount = packHorse.statModifiers[rawStat];
                        const isBase = rawStat.endsWith(" (B)");
                        const stat = isBase ? rawStat.replace(" (B)", "") : rawStat;
                        if (!playerStats.stats.hasOwnProperty(stat)) return;
                        const statObj = playerStats.stats[stat];
                        if (stat === "SKILL" || isBase) {
                            statObj.max += amount;
                            statObj.current += amount;
                        } else {
                            statObj.current += amount;
                            if (statObj.current > statObj.max) statObj.current = statObj.max;
                        }
                    });
                }
                playerStats.horse = packHorse;
            }

            // --- Default book: #9 ---
            const bookItem = items.find(i => i.id === "0012");

            if (bookItem) {
                playerStats.inventory.wornItems.book = bookItem;
                equipBook(bookItem);
            }

            // --- Default wizard scroll ---
            const wizardColor = playerStats.wizardColor.toLowerCase();
            const scrollItems = items.filter(i => i.type === "scroll" &&
                (i.wizard === "all" || i.wizard.toLowerCase() === wizardColor));
            const wizardScroll = scrollItems.find(s => s.wizard.toLowerCase() === wizardColor);
            if (wizardScroll) {
                if (!playerStats.inventory.carriedItems.includes(wizardScroll)) {
                    playerStats.inventory.carriedItems.push(wizardScroll);
                }
            }

            // Skip all pre-game UI and start gameplay
            startGameplay(
                gameDiv,
                playerStats,
                enemies,
                items,
                enchantments,
                initGame,
                nodeIndex
            );
            return;
        }

            // ----------------------------
            // NORMAL FLOW
            // ----------------------------

            // Skip pre-game inventory and start gameplay immediately

            startGameplay(
                gameDiv,
                playerStats,
                enemies,
                items,
                enchantments,
                initGame,
                nodeIndex
            );

        });

    });

});

}