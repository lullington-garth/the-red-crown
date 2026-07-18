// shrine.js

import { diceFlow } from './diceFlow.js';
import { showItemModal } from './useItem.js';
import { refreshInventoryUI } from './inventoryUI.js';
import { equipItem } from './equipItem.js';
import { tryAddItems } from "./calculateCapacity.js";

export function handleShrine(playerStats, context, onResolved) {

    diceFlow({
        mode: "roll_only",
        playerStats,
        dice: 1,
        image: "shrine.jpg",
        itemName: "The Wayfarer Shrine",
        rollMessage: `<hr><br>
You take to your knees and pray to the gods.`,

        onComplete: ({ rollTotal }) => {
//onComplete: () => { // 👈 force it
//    const rollTotal = 6; // 👈 force it
            let message = "";

            if (!playerStats.stats) {
                playerStats.stats = {};
            }

            switch (rollTotal) {

                case 1: {

                    if (!playerStats.stats.STAMINA) {
                        playerStats.stats.STAMINA = {
                            current: 0,
                            max: 10,
                            min: 0
                        };
                    }

                    const stamina = playerStats.stats.STAMINA;

                    stamina.current = 0;

                    if (stamina.min != null) {
                        stamina.current = Math.max(stamina.current, stamina.min);
                    }

                    message = `You rolled a 1.<br><br>The gods are not pleased.
                    <br><br>They demand your life.
                    <br><br>Your quest is over.`;
                    break;
                }

                case 2: {
                    const stamina = playerStats.stats.STAMINA ??= {
                        current: 0,
                        max: 10,
                        min: 0
                    };

                    stamina.current = Math.ceil(stamina.current / 2);

                    message = `You rolled a 2.<br><br>
                    You are struck by lightning... <br><br>
                    It really hurts! <br><br>Your STAMINA is halved`;
                    break;
                }

                case 3: {
                    message = `You rolled a 3.<br><br>You are too boring to warrant noticing
                    <br><br>You are ignored.`;
                    break;
                }

                case 4: {
                    playerStats.gold = (playerStats.gold ?? 0) + 20;

                    message = `You rolled a 4.<br><br>Cher-Ching!
                    <br><br>You gain 20GP.`;
                    break;
                }

                case 5: {
                        const statsToRestore = ["STAMINA", "LUCK", "MAGIC"];

                        statsToRestore.forEach(statName => {

                            if (!playerStats.stats[statName]) {
                                playerStats.stats[statName] = {
                                    current: 0,
                                    max: 10,
                                    min: 0
                                };
                            }

                            const stat = playerStats.stats[statName];

                            if (stat.max != null && stat.current < stat.max) {
                                stat.current = stat.max;
                            }
                        });
                    message = `You rolled a 5.<br><br>The gods smile upon you
                    <br><br> Your STAMINA, LUCK & MAGIC are fully restored.`;
                    break;
                }

                case 6: {
                    const robeTemplate = playerStats.items.find(i => i.id === "0301");

                    if (!robeTemplate) {
                        message = `You rolled a 6.<br><br>The gods are fickle.<br><br>They changed their minds.`;
                        break;
                    }

                    const robeItem = structuredClone(robeTemplate);
                    robeItem.id = Date.now().toString();

message = `You rolled a 6.<br><br>You find yourself wearing a quite magnificent robe.`;

tryAddItems(playerStats, [robeItem], () => {

    equipItem(playerStats, robeItem);

    refreshInventoryUI();

    showItemModal(
        {
            item: "The Wayfarer Shrine",
            image: "shrine.jpg",
            "use-message": "You pray at the shrine..."
        },
        message,
        onResolved,
        playerStats
    );
});

return;
                }

                default: {
                    message = "No roll detected.";
                }
            }
    showItemModal(
        {
            item: "The Wayfarer Shrine",
            image: "shrine.jpg",
            "use-message": "You pray at the shrine..."
        },
        message,
        onResolved,
        playerStats
    );
        }
    });
}
