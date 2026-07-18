// enchantment.js
import { diceFlow } from "./diceFlow.js";
import { openEnchantmentSelectionModal, showEnchantmentResultModal } from "./enchantmentModals.js";
import { removeStatMods } from "./itemStatModifiers.js";

export function handleEnchantment(playerStats, enchantments = []) {

    const enchantmentList = Array.isArray(enchantments) ? enchantments : [];

    openEnchantmentSelectionModal(
        playerStats,

        (selectedItem) => {

            diceFlow({

                mode: "roll_only",

                stat: null,

                playerStats,

                dice: 4,

                itemName: selectedItem.item,

                image: selectedItem.image,

                rollMessage:
                    "Roll four dice for enchantment...",

                onComplete: ({ rollTotal }) => {

                const enchantment =
                    enchantmentList.find(
                        e => parseInt(e.id, 10) === rollTotal
                    );

                    if (!enchantment) {
                        console.warn(
                            "No enchantment found for:",
                            rollTotal
                        );
                        return;
                    }

                    applyEnchantment(
                        playerStats,
                        selectedItem,
                        enchantment
                    );

                    showEnchantmentResultModal({
                        item: selectedItem,
                        enchantment
                    });
                }
            });
        }
    );
}

function applyEnchantment(playerStats, item, enchantment) {

    // ---------------------------------
    // ENSURE MOD OBJECT EXISTS
    // ---------------------------------

    if (!item["stat-mod-object"]) {
        item["stat-mod-object"] = {};
    }
    item["stat-mod-type"] = "equipped";
    
    // ---------------------------------
    // APPLY STAT MODS
    // ---------------------------------

    const mods = enchantment["stat-mod-object"] || {};

    for (const [stat, value]
        of Object.entries(mods)) {

        if (!item["stat-mod-object"][stat]) {
            item["stat-mod-object"][stat] = 0;
        }

        item["stat-mod-object"][stat] += value;
    }

    // ---------------------------------
    // UPDATE SELL VALUE
    // ---------------------------------   

    item.sell = item.sell + enchantment.sell

    // ---------------------------------
    // UPDATE DISPLAY STRING
    // ---------------------------------

    item["stat-mod"] = buildStatString(item["stat-mod-object"]);

    // ---------------------------------
    // APPLY SPECIALS
    // ---------------------------------

    if (
        enchantment["special-ability"] && enchantment["special-ability"] !== "None"
    ) {
        item["special-ability"] = enchantment["special-ability"];
    }

    // ---------------------------------
    // FEAST FORM OVERRIDES
    // ---------------------------------

    if (
        enchantment.description === "Feast Form"
    ) {

        // -----------------------------
        // UNEQUIP ITEM IF WORN
        // -----------------------------

        const wornEntries =
            Object.entries(
                playerStats.inventory.wornItems
            );

        for (const [slotKey, wornItem]
            of wornEntries) {

            if (wornItem === item) {

                if (
                    item["stat-mod-type"] ===
                    "equipped"
                ) {
                    removeStatMods(
                        playerStats,
                        item
                    );
                }

                playerStats.inventory
                    .wornItems[slotKey] = null;

                if (
                    !playerStats.inventory
                        .carriedItems
                        .includes(item)
                ) {
                    playerStats.inventory
                        .carriedItems
                        .push(item);
                }

                break;
            }
        }

        // -----------------------------
        // CONVERT ITEM TYPE
        // -----------------------------
        item.type = "misc";
        item["stat-mod-type"] = "use";
        item["use-message"] = `You health is fully restored... having just eaten your ${item.item}... ${item.description}... YUM!`;
        item["special-ability"] = "None";
        item.status = "None";
        item.sell = enchantment.sell;
        if (item["inventory-slots"] === 0) {item["inventory-slots"] = 1;}

        // -----------------------------
        // REPLACE ALL STAT MODIFIERS
        // -----------------------------

        item["stat-mod-object"] = {};
        item["stat-mod"] = "STAMINA (T)";

        // -----------------------------
        // REPLACE ID DESCRIPTION
        // -----------------------------

        item["id-description"] = [
            "Enchanted with",
            enchantment.description,
            enchantment["id-description"]
        ]
            .filter(Boolean)
            .join(" ");
    }

    // ---------------------------------
    // APPLY INVENTORY SLOT CHANGE
    // ---------------------------------

    if (enchantment["inventory-slots"] === 0) {item["inventory-slots"] = 0;}

    // ---------------------------------
    // APPLY BREAKABLE OVERRIDE
    // ---------------------------------

    if (enchantment.breakable === false) {item.breakable = false;}

    // ---------------------------------
    // APPEND ENCHANTMENT DESCRIPTION
    // ---------------------------------

    if ( enchantment.description !== "Feast Form") {
        const enchantmentText = [
            "Enchanted with",
            enchantment.description,
            enchantment["id-description"]
        ]
            .filter(Boolean)
            .join(" - ");

        if (item["id-description"]) {

            item["id-description"] +=
                ` ${enchantmentText}`;

        } else {

            item["id-description"] =
                enchantmentText;
        }
    }

    // ---------------------------------
    // MARK MAGICAL & IDENTIFY
    // ---------------------------------
    item.identified = true;
    item.magical = true;
}

function buildStatString(mods) {

    return Object.entries(mods)

        .map(([stat, value]) => {

            if (typeof value !== "number") {
                return stat;
            }

            return `${stat} ${
                value >= 0 ? "+" : ""
            }${value}`;
        })

        .join(", ");
}