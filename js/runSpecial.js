// runSpecial.js
import { handleShrine } from "./shrine.js";
import { handleCurio } from "./curio.js";
import { openMixPotionModal } from "./potionModals.js";
import { startBlacksmithDiceGame } from "./inGameGames.js";
import { handleCurseRemoval } from "./curseRemoval.js";
import { openScrollShredder } from "./scrollShredder.js";
import { handleEnchantment } from "./enchantment.js";
import { startTavernDiceGame } from "./games.js";
import { handleEnvironment1Red } from "./environment1Red.js";
import { startGraffleCluckGame } from "./graffleCluckGame.js";

export function runSpecial(fnName, context = {}) {

    const {
        playerStats,
        node,
        engine,
        ui,
        refreshNode,
        enchantments
    } = context;

    // Safety guard
    if (!fnName) {
        console.warn("runSpecial called without fnName");
        return;
    }

    switch (fnName) {

        case "shrine": {

            handleShrine(
                playerStats,
                {
                    node,
                    engine,
                    ui
                },
                () => {
                    // ----------------------------
                    // AFTER SHRINE RESOLVES
                    // ----------------------------

                    // Handle death (important)
                    if (playerStats.stats?.STAMINA?.current <= 0) {
                        if (engine && typeof engine.handlePlayerDeath === "function") {
                            engine.handlePlayerDeath(node);
                            return;
                        }
                    }
                    // Remove button after use
                    if (engine && node?.id) {
                        engine.state.flags[`special_shrine_${node.id}`] = true;
                    }
                    // Refresh node UI
                    if (typeof refreshNode === "function") {
                        refreshNode();
                    }

                }
            );

            break;
        }

        case "environment1Red": {

            handleEnvironment1Red(
                playerStats,
                {
                    node,
                    engine,
                    ui
                },
                () => {

                    if (engine && node?.id) {
                        engine.state.flags[
                            `special_environment1Red_${node.id}`
                        ] = true;
                    }

                    if (typeof refreshNode === "function") {
                        refreshNode();
                    }
                }
            );

            break;
        }

        case "curio": {

            handleCurio(
                playerStats,
                {
                    node,
                    engine,
                    ui
                },
                () => {
                    // Remove button after use
                    if (engine && node?.id) {
                        engine.state.flags[`special_curio_${node.id}`] = true;
                    }
                    // Refresh node UI
                    if (typeof refreshNode === "function") {
                        refreshNode();
                    }
                }
            );

            break;
        }

        case "brewPotion": {
            openMixPotionModal(
                playerStats,
                playerStats.items,
                () => {
                    // Remove button after use
                    if (engine && node?.id) {
                        engine.state.flags[`special_brewPotion_${node.id}`] = true;
                    }
                    // refresh node
                    if (typeof refreshNode === "function") {
                        refreshNode();
                    }
                },
                {
                    mode: "event"
                }
            );

            break;
        }

        case "blacksmithDice": {

            startBlacksmithDiceGame(playerStats);

            break;
        }

        case "graffleCluck": {

            startGraffleCluckGame(
                playerStats
            );

            break;
        }

        case "curseRemoval": {

            handleCurseRemoval(playerStats, {

                chargeGold: 5,

                noCurseMessage:
                    "There are no cursed items in your inventory. The stall owner's spell has been wasted. You will still be charged for his time and spell craft"
            });

            break;
        }

        case "diceGame":{

            startTavernDiceGame({
                playerStats,

                onComplete: (result) => {

                    playerStats.wonDiceGame =
                        result === "win";
                }
            });

            break;
        }

        case "shredder": {

        if (!engine.state.shopState[node.id]) {

            const stallItemIds = [
                "0247","0248","0249","0250","0251",
                "0252","0253","0254","0255","0256"
            ];

            engine.state.shopState[node.id] =
                playerStats.items.filter(
                    item => stallItemIds.includes(item.id)
                );
        }

        openScrollShredder(playerStats, {

            stallItems: engine.state.shopState[node.id],

            });

            break;
        }       

        case "enchantItem": {
            handleEnchantment(
                playerStats,
                enchantments
            );

            // Remove button after use
            if (engine && node?.id) {
                engine.state.flags[`special_enchantItem_${node.id}`] = true;
            }

            // Refresh node UI
            if (typeof refreshNode === "function") {
                refreshNode();
            }

            break;
        }

        default: {
            console.warn(`Unknown special function: ${fnName}`);
            break;
        }
    }

    // Optional: refresh UI if something changed
    if (typeof refreshNode === "function") {
        refreshNode();
    }
}