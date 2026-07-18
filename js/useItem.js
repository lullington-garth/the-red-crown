// useItem.js
import { closeModal, setModalContent, openModal } from './modal.js';
import { usePotion } from './potions.js';
import { useScroll, handleSpecialScroll } from './scrolls.js';
import { playerDeathByItem } from './playerDeath.js';
import { applyUseStatMods } from './itemStatModifiers.js';
import { refreshInventoryUI } from './inventoryUI.js';
import { handleCombatItem } from './combatItems.js';
import { equipItem, unequipItem } from "./equipItem.js";
import { diceFlow } from './diceFlow.js';
import { handleMixItem } from './mixPotion.js';
import { tryAddItems } from "./calculateCapacity.js";

export function useItem(playerStats, item, context = "inventory", onResolved, enemyInstances = [], targets = []) {
    // Route by type first
    switch (item.type) {
        case "potion":
            usePotion(playerStats, item, context);
            break;

        case "scroll":
            const success = useScroll(playerStats, item, context);
            if (!success) {
                showItemModal(item, item.extraMessage || "Nothing happens.", playerStats);
                return;
            }

            const handledAsync = handleSpecialScroll(playerStats, item);

            if (handledAsync) {
                consumeItem(playerStats, item);
                return;
            }

            break;

        case "misc":
            if (item["special-ability"] === "DAZZLE") {
                handleDazzleItem(playerStats, item, enemyInstances, targets, context, onResolved);
                return;
            }
            if (item["special-ability"] === "ORB_WHIMSY") {
                handleOrbOfWhimsy(playerStats, item, enemyInstances, targets, context, onResolved);
                return;
            } 
            if (item["special-ability"] === "MIX") {
                handleMixItem(playerStats, item, onResolved);
                return;
            }          

            handleCombatItem(playerStats, item, enemyInstances, targets);
            break;


        case "other":
        case "provisions":
            consumeItem(playerStats, item);
            break;

        default:
            console.warn("Unhandled item type:", item.type);
            return;
    }

    // 🟣 HANDLE (D) DICE ROLL ITEMS
    if (item["stat-mod"] && item["stat-mod"].includes("(D)")) {

        const statName = item["stat-mod"]
            .replace("(D)", "")
            .trim();

        diceFlow({
            mode: "roll_only",
            stat: null,
            playerStats,
            dice: 1,
            itemName: item.item,
            image: item.image,
            rollMessage: "Roll a dice to decide mixture strength...",

            onComplete: ({ rollTotal }) => {

                applyDiceStat(playerStats, statName, rollTotal);

                showItemModal(
                    item,
                    `${rollTotal} ${statName} restored.`,
                    () => {
                        if (context === "combat" && typeof onResolved === "function") {
                            onResolved();
                        }
                    },
                    playerStats
                );
            }
        });

        consumeItem(playerStats, item);
        return;
    }

    const mods = item["stat-mod-object"];
    if (!mods) return;
    
    applyUseStatMods(playerStats, item);

    showItemModal(
        item,
        item.extraMessage || "",
        () => {
            if (context === "combat" && typeof onResolved === "function") {
                onResolved();
            }
        }, playerStats
    );

    consumeItem(playerStats, item);
}

export function showItemModal(item, extraMessage = "", onClose, playerStats, options = {}) {
    const container = document.createElement("div");

    container.classList.add("hide-scrollbar");
    container.style.maxHeight = "70vh";
    container.style.overflowY = "auto";

    const imageSize = item["display-size"] === "large" ? 380 : 80;

    // ✅ Use override if provided, otherwise default to item.image
    const imageSrc = options.image || item.image;

    container.innerHTML = `
        <div style="text-align:center;">
            <img src="images/${imageSrc}" 
                style="width:${imageSize}px; height:${imageSize}px; margin-bottom:10px; mix-blend-mode:multiply;" />

            <h3>${item.item}</h3>

            <p>
                ${item["use-message"] || ""}
                ${extraMessage ? `<br><br><strong>${extraMessage}</strong>` : ""}
            </p>

            <div style="margin-top:15px; display:flex; justify-content:center;">
                <button id="closeBtn" style="
                    display:block;
                    margin:15px auto 0 auto;
                    background:#424141;
                    color:#d7d4d4;
                    padding:10px 16px;
                    border:1px solid #555;
                    box-shadow:0 1px 7px rgba(0,0,0,0.5);
                    border-radius:8px;
                    cursor:pointer;
                ">
                    Close
                </button>
            </div>
        </div>
    `;

    setModalContent(container);
    openModal();

    container.querySelector("#closeBtn").addEventListener("click", () => {
        closeModal();

        if (playerStats) {
            playerDeathByItem(playerStats, item);
        }

        if (typeof onClose === "function") {
            onClose();
        }
    });
}

export function consumeItem(playerStats, item) {
    const inv = playerStats.inventory;

    if (item.charges != null) {
        item.charges -= 1;
    }

    const shouldRemove = item["lose-on-use"] || item.charges <= 0;

    if (!shouldRemove) return;

    // 🧹 Remove from carried items
    const carriedIdx = inv.carriedItems.findIndex(i => i.id === item.id);
    if (carriedIdx !== -1) {
        inv.carriedItems.splice(carriedIdx, 1);
    }

    // 🧹 Remove from worn items
    for (const key in inv.wornItems) {
        if (inv.wornItems[key] && inv.wornItems[key].id === item.id) {
            inv.wornItems[key] = null;
        }
    }

    item.used = (item.used || 0) + 1;
}

function applyDiceStat(playerStats, statName, value) {

    if (!playerStats.stats[statName]) {
        playerStats.stats[statName] = {
            current: 0,
            max: 10,
            min: 0
        };
    }

    const statObj = playerStats.stats[statName];

    statObj.current += value;

    if (statObj.max != null) {
        statObj.current = Math.min(statObj.current, statObj.max);
    }

    if (statObj.min != null) {
        statObj.current = Math.max(statObj.current, statObj.min);
    }

    refreshInventoryUI();
}

function handleDazzleItem(playerStats, item, enemyInstances, targets, context, onResolved) {

    diceFlow({
        stat: "LUCK",
        playerStats,
        dice: 2,
        image: item.image,       
        itemName: item.item,
        rollMessage: "Test your LUCK...",    
        onComplete: ({ success, rollTotal, statValue }) => {

            let message = "";

            if (success) {

                enemyInstances?.forEach(enemy => {
                    if (!enemy || enemy.stats.stamina <= 0) return;
                    enemy.stats.skill -= 2;
                });

                message = `You are Lucky! All enemies lose 2 SKILL.`;

            } else {

                playerStats.stats.SKILL.current -= 2;
                message = `You are unlucky. You lose 2 SKILL.`;
            }

            playerStats.stats.SKILL.current = Math.max(0, playerStats.stats.SKILL.current);

            playerStats.effects ??= [];
            playerStats.effects.push({
                type: "dazzler",
                name: item.item,
                image: item.image
            });

            showItemModal(
                item,
                message,
                () => {
                    if (context === "combat" && typeof onResolved === "function") {
                        onResolved();
                    }
                },
                playerStats
            );

            consumeItem(playerStats, item);
        }
    });
}

function handleOrbOfWhimsy(playerStats, item, enemyInstances, targets, context, onResolved) {

    diceFlow({
        mode: "roll_only",
        playerStats,
        dice: 1,
        image: item.image,
        itemName: item.item,
        rollMessage: `<hr><br>
        1 - <strong>The Unhappy Cap</strong><br>Your current stat scores become your maximum stat scores<br><br>
        2 - <strong>Butter Fingers</strong><br>All your equipped items fall off<br><br>
        3 - <strong>Dancing shoes</strong><br>You are equipped with fabulous dancing shoes<br><br>
        4 - <strong>Summer Feeling</strong><br>Your STAMINA and MAGIC are fully restored<br><br>
        5 - <strong>The Big Bad Slap</strong><br>One enemy is reduced to 1 STAMINA<br><br>
        6 - <strong>Shiny Shiny</strong><br>Gain a magical weapon of ATTACK +3`,

        onComplete: ({ rollTotal }) => {

            let message = "";

            switch (rollTotal) {

                case 1: {
                    message = `You rolled a 1.<br><br>Your current stat scores become your maximum stat scores`;

                    const stats = playerStats.stats;

                    for (const key in stats) {
                        const stat = stats[key];

                        if (stat && typeof stat === "object") {
                            if (stat.current != null && stat.max != null) {
                                stat.max = stat.current;
                            }
                        }
                    }
                    break;
                }

                case 2: {
                    const wornItems = playerStats.inventory.wornItems;
                    const slots = Object.keys(wornItems);

                    slots.forEach(slotKey => {
                        const before = wornItems[slotKey];
                        if (!before) return;

                        unequipItem(playerStats, slotKey);
                    });

                    message = `You rolled a 2.<br><br>Butter Fingers! You've dropped everything. 
                    EVERYTHING!<br>Clothes, weapons, books, the lot! There is stuff everywhere.<br>
                    Your potions and items have fallen within reach.<br>You can still grab at them.`;

                    refreshInventoryUI();
                    break;
                }

                case 3: {
                    const shoesTemplate = playerStats.items.find(i => i.id === "0299");

                    if (!shoesTemplate) {
                        message = `You rolled a 3.<br><br>Something went wrong.`;
                        break;
                    }

                    const shoesItem = structuredClone(shoesTemplate);
                    shoesItem.id = Date.now().toString();

                    message = `You rolled a 3.<br><br>You are equipped with fabulous dancing shoes.<br>
                    Your SKILL increases by 2, but dancing is exhausting.<br>
                    Your STAMINA cap is reduced by 2.`;

                    tryAddItems(playerStats, [shoesItem], () => {

                        equipItem(playerStats, shoesItem);

                        refreshInventoryUI();

                        showItemModal(
                            item,
                            message,
                            () => {
                                if (context === "combat" && typeof onResolved === "function") {
                                    onResolved();
                                }
                            },
                            playerStats
                        );
                    });

                    consumeItem(playerStats, item);

                    return;
                }

                case 4: {
                    playerStats.stats.STAMINA.current = playerStats.stats.STAMINA.max;
                    playerStats.stats.MAGIC.current = playerStats.stats.MAGIC.max;

                    message = `You rolled a 4.<br><br>Your STAMINA and MAGIC are fully restored.`;

                    refreshInventoryUI();
                    break;
                }

                case 5: {
                    let targetEnemy = null;

                    if (targets?.length) {
                        targetEnemy = targets[0]?.enemy;
                    }

                    if (!targetEnemy) {
                        targetEnemy = enemyInstances?.find(e => e?.stats?.stamina > 0);
                    }

                    if (targetEnemy) {
                        targetEnemy.stats.stamina = 1;

                        targetEnemy.effects ??= [];
                        targetEnemy.effects.push({ type: "slap" });

                        message = `You rolled a 5. SLAP!<br><br>${targetEnemy.name} is reduced to 1 STAMINA!`;
                    } else {
                        message = `You rolled a 5.<br><br>No enemies available.`;
                    }

                    break;
                }

                case 6: {
                    const axeTemplate = playerStats.items.find(i => i.id === "0300");

                    if (!axeTemplate) {
                        message = `You rolled a 6.<br><br>Something went wrong.`;
                        break;
                    }

                    const axeItem = structuredClone(axeTemplate);
                    axeItem.id = Date.now().toString();

                    message = `You rolled a 6.<br><br>You find yourself wielding an ATTACK +3 magical flaming axe.<br>COOL!`;

                    tryAddItems(playerStats, [axeItem], () => {

                        equipItem(playerStats, axeItem);

                        refreshInventoryUI();

                        showItemModal(
                            item,
                            message,
                            () => {
                                if (context === "combat" && typeof onResolved === "function") {
                                    onResolved();
                                }
                            },
                            playerStats
                        );
                    });

                    consumeItem(playerStats, item);

                    return;
                }

                default: {
                    message = "No roll detected.";
                }
            }

            playerStats.effects ??= [];
            playerStats.effects.push({
                type: "whimsy",
                name: item.item,
                image: item.image
            });

            showItemModal(
                item,
                message,
                () => {
                    if (context === "combat" && typeof onResolved === "function") {
                        onResolved();
                    }
                },
                playerStats
            );

            consumeItem(playerStats, item);
        }
    });
}
