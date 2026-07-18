// diceRollModifier.js

import { consumeItem } from "./useItem.js";

export function getPreRollOptions(playerStats, context) {

    const items = playerStats.inventory?.carriedItems || [];

    const normalRollItem = {
        item: "Roll Normally",
        description: "Make a standard roll with no modifiers.",
        image: "dice.jpg",
        identified: true,
        type: "system",
        status: "None",
        magical: false,
        "stat-mod": "None",
        "stat-mod-object": {}
    };

    const options = [];

    // ✅ ALWAYS add normal roll
    options.push({
        id: "normal_roll",
        label: "Roll Normally",
        type: "pre",
        item: normalRollItem,
        });
    // Jester's Gambit (SP_LUCK)
    const jester = items.find(i => i.id === "0016");

    if (jester && context.stat === "LUCK") {

        options.push({
            id: "jesters_gambit",
            label: "Use Jester's Gambit",
            type: "pre",
            item: jester,

            apply: (session) => {

                const coin = Math.random() < 0.85; // heads/tails

                if (coin) {
                    session.dice = 1;
                    session.preRollMessage = "You flip the Jester's Gambit.<br>It lands on... Heads!<br><br>You may now roll for LUCK using a single dice.";
                } else {
                    playerStats.stats.LUCK.current -= 1;
                    session.preRollMessage = "You flip the Jester's Gambit.<br>It lands on... Tails!<br>Bad luck.<br><br>You lose 1 LUCK and must now roll normally.";
                }

//                consumeItem(playerStats, jester);
            }
        });
    }

        // Fates Edge Rune
    const fateRune = items.find(i => i.id === "0051");

    if (fateRune && context.stat === "LUCK") {

        options.push({
            id: "fates_rune",
            label: "Use Fate's Edge Rune",
            type: "pre",
            item: fateRune,

            apply: (session) => {

                session.preRollMessage = "You snap the rune stone.<br>Luck floods through you.<br><br>Roll for LUCK. It's guaranteed!";
                session.forceLucky = true;
                consumeItem(playerStats, fateRune);
            }
        });
    }

            // Devil's Dice
const diceOfTheDevil = items.find(i => i.id === "0235");

if (
    diceOfTheDevil &&
    playerStats.stats.MAGIC.current >= (diceOfTheDevil["magic-cost"] || 0)
) {
    options.push({
        id: "dice_of_the_devil",
        label: "Use The Dive Of The Devil Scroll",
        type: "pre",
        item: diceOfTheDevil,

        apply: (session) => {

            session.preRollMessage = "You are using the Devil's dice.<br>Who knows what price you will pay.<br><br>Roll one extra dice and choose one to discard.";

            // Devil Dice required
            session.devilsDice = true;

            // PAY MAGIC
            const cost = diceOfTheDevil["magic-cost"] || 0;
            playerStats.stats.MAGIC.current -= cost;

            // clamp (safety)
            if (playerStats.stats.MAGIC.current < playerStats.stats.MAGIC.min) {
                playerStats.stats.MAGIC.current = playerStats.stats.MAGIC.min;
            }

            // HANDLE CHARGES + REMOVAL
            consumeItem(playerStats, diceOfTheDevil);
        }
    });
}
    return options;
}

export function getPostRollOptions(playerStats, context, rollResult, session) {

    const items = playerStats.inventory?.carriedItems || [];
    const options = [];

    // ✅ ensure tracking exists
    if (!session.usedItems) {
        session.usedItems = new Set();
    }

    const secondChance = items.find(i => i.id === "0227");

    if (
        secondChance &&
        playerStats.stats.MAGIC.current >= (secondChance["magic-cost"] || 0) //&&
//        !session.usedItems.has("second_chance") // ✅ prevent reuse if desired
    ) {
        options.push({
            id: "second_chance",
            label: "Use Second Chance Scroll",
            type: "post",
            item: secondChance,

            apply: (session) => {
                session.message = "You twist fate and demand another outcome...";

                const cost = secondChance["magic-cost"] || 0;
                playerStats.stats.MAGIC.current -= cost;

                if (playerStats.stats.MAGIC.current < playerStats.stats.MAGIC.min) {
                    playerStats.stats.MAGIC.current = playerStats.stats.MAGIC.min;
                }

                consumeItem(playerStats, secondChance);

                session.reroll = true;

                // ✅ mark used
                session.usedItems.add("second_chance");
            }
        });
    }

    // ✅ WORN ITEMS
    const worn = playerStats.inventory?.wornItems;

    const ringOfFate =
        worn?.ring1?.id === "0199" ? worn.ring1 :
        worn?.ring2?.id === "0199" ? worn.ring2 :
        null;

    if (
        ringOfFate &&
        !session.usedItems.has("ring_of_fate")
    ) {
        options.push({
            id: "ring_of_fate",
            label: "Use Ring of Fate",
            type: "post",
            item: ringOfFate,

            apply: (session) => {
                session.message = "The ring pulses... fate bends once more.";
                session.reroll = true;

                // ✅ mark used for this roll set
                session.usedItems.add("ring_of_fate");
            }
        });
    }

    return options;
}