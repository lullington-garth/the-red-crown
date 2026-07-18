// curio.js

import { diceFlow } from './diceFlow.js';
import { showItemModal } from './useItem.js';
import { refreshInventoryUI } from './inventoryUI.js';
import { tryAddItems } from "./calculateCapacity.js";

export function handleCurio(playerStats, context, onResolved) {

    diceFlow({
        mode: "roll_only",
        playerStats,
        dice: 1,
        image: "curio.jpg",
        itemName: "The Curio Chip",
        rollMessage: `<hr><br>
        Roll to decide the results... `,

//        onComplete: ({ rollTotal }) => {
onComplete: () => { // 👈 force it
const rollTotal = 6; // 👈 force it
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

                stamina.current = Math.min(stamina.current + 1, stamina.max);

                message = `As you flip the curio it dissapears...<br>
                <br>You are filled with a warm glow as
                <br>you are healed 1 STAMINA`;
                break;
            }

                case 2: {
                if (!playerStats.stats.MAGIC) {
                    playerStats.stats.MAGIC = {
                        current: 0,
                        max: 10,
                        min: 0
                    };
                }

                const magic = playerStats.stats.MAGIC;

                magic.current = Math.min(magic.current + 1, magic.max);

                message = `As you flip the curio it dissapears...<br>
                <br>You are filled with a warm glow as
                <br>your are restored 1 MAGIC point`;
                break;
            }

                case 3: {
                if (!playerStats.stats.LUCK) {
                    playerStats.stats.LUCK = {
                        current: 0,
                        max: 10,
                        min: 0
                    };
                }

                const luck = playerStats.stats.LUCK;

                luck.current = Math.min(luck.current + 1, luck.max);

                message = `As you flip the curio it dissapears...<br>
                <br>You are filled with a warm glow as
                <br>your are restored 1 LUCK point`;
                break;
                }

                case 4: {
                    message = `... it lands with a dull clunck.
                    <br>Nothing happens.
                    <br>You can't win them all.`;
                    break;
                }

                case 5: {
                    playerStats.gold = (playerStats.gold ?? 0) + 1;

                    message = `... it glints in the air
                    <br>and transforms.
                    <br>It lands as a gold piece.`;
                    break;
                }

                case 6: {
                    const cookieTemplate = playerStats.items.find(i => i.id === "0302");

                    if (!cookieTemplate) {
                        message = `The chip disolves.<br><br>Nothing gained.`;
                        break;
                    }

                    const cookieItem = structuredClone(cookieTemplate);
                    cookieItem.id = Date.now().toString();

                    message = `... it sparks in the air
                    <br>and transforms.
                    <br>It lands as a cookie.`;

                    tryAddItems(playerStats, [cookieItem], () => {

                        refreshInventoryUI();

                        showItemModal(
                            {
                                item: "The Curio Chip",
                                image: "curio.jpg",
                                "use-message": "You flip the chip..."
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
            item: "The Curio Chip",
            image: "curio.jpg",
            "use-message": "You flip the chip..."
        },
        message,
        onResolved,
        playerStats
    );
        }
    });
}
