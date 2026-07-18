// environment1Red.js

import { diceFlow } from "./diceFlow.js";
import { showItemModal } from "./useItem.js";
import { refreshInventoryUI } from "./inventoryUI.js";
import { tryAddItems } from "./calculateCapacity.js";

export function handleEnvironment1Red(
    playerStats,
    context,
    onResolved
) {

    const wizard =
        (playerStats.visitingBrother || "").toLowerCase();

    const flavourText = {

        green: {

            1: `You rolled a 1.<br><br>
            You pull out a surprised-looking salamander. It flares, flames licking across its body and burning your hands, and it bites your nose.
            <br><br>
            LOSE 4 STAMINA.
            <br><br>
            You drop the little creature, which scurries up the rock face and back into its nest.`,

            2: `You rolled a 2.<br><br>
            Your hand finds something rough and hot. A sharp pain runs through your hand as something bites you.
            <br><br>
            LOSE 2 STAMINA.
            <br><br>
            You pull your hand back quickly and decide not to try again.`,

            3: `You rolled a 3.<br><br>
            Try as you might, your arm just is not long enough to reach the salamanders' nest. They are simply too deep within the crack.
            <br><br>
            Frustrated, you pull yourself free and leave the elusive treasures behind.`,

            4: `You rolled a 4.<br><br>
            Your hand closes over something. It is not the chain, but having groped around as much as you dare, you have concluded that the chain itself must be out of reach.
            <br><br>
            You pull your hand free and find that you have picked up a handful of gold.
            <br><br>
            GAIN 12 GOLD PIECES.`,

            5: `You rolled a 5.<br><br>
            Your hand brushes one of the sleeping creatures. They are highly magical beasts and, when not alarmed, their touch is restorative.
            <br><br>
            GAIN 4 STAMINA, 2 MAGIC AND 2 LUCK.`,

            6: `You rolled a 6.<br><br>
            You can hardly believe it as your hand closes over the chain. You tug it gently free and pull it out from the crack without disturbing the sleeping salamanders.
            <br><br>
            GAIN ITEM – SKY BINDERS CHAIN.
            <br><br>
            When you are done, you head back to the path.`
        },

        yellow: {

            1: `You rolled a 1.<br><br>
            Your hand finds something soft. It chirrups with a startled screech and flies up from the lip below. The bright bird, clacking and cawing, scratches and claws at your face with razor-sharp talons until you scramble back from the edge. It puffs up, spits a ball of fire at you and then flutters back down to its nest in the rock face.
            <br><br>
            LOSE 4 STAMINA.
            <br><br>
            Bleeding and burnt, you get away from the edge as fast as possible.`,

            2: `You rolled a 2.<br><br>
            Your hand finds something rough and hot. A sharp pain runs through your hand as something bites you.
            <br><br>
            LOSE 2 STAMINA.
            <br><br>
            You pull your hand back quickly and decide not to try again.`,

            3: `You rolled a 3.<br><br>
            Try as you might, your arm just is not long enough to reach the hoard below.
            <br><br>
            Frustrated, you pull yourself free and leave the elusive treasures behind.`,

            4: `You rolled a 4.<br><br>
            Your hand closes over something. It is not the chain, but having strained and stretched to your very limits, you have concluded that the chain itself must be out of reach.
            <br><br>
            You pull your hand free and find that you have picked up a pouch full of gold.
            <br><br>
            GAIN 12 GOLD PIECES.`,

            5: `You rolled a 5.<br><br>
            Your hand finds a bottle. Unable to reach anything else, you pull it up to see what you have found.
            <br><br>
            It looks like a restorative potion. Before you can talk yourself out of it, you pop the cork and gulp it down.
            <br><br>
            Warm magic floods through you.
            <br><br>
            The potion is good.
            <br><br>
            GAIN 4 STAMINA, 2 MAGIC AND 2 LUCK.`,

            6: `You rolled a 6.<br><br>
            You can hardly believe it as your hand closes over the chain. You tug it gently free and pull it up over the edge as the monkey god stares on.
            <br><br>
            GAIN ITEM – SKY BINDERS CHAIN.
            <br><br>
            When you are done, you head back to the path.`
        },

        blue: {

            1: `You rolled a 1.<br><br>
            As your hand closes around the chain, lava spurts from a nearby fissure.
            <br><br>
            The molten rock sprays up your arm. You scream in pain, pulling your flaming arm free.
            <br><br>
            LOSE 4 STAMINA.
            <br><br>
            You scramble back from the crater edge and beat out the flames.`,

            2: `You rolled a 2.<br><br>
            Your hand closes over the chain. Pain shoots through your fingers as the metal sears your flesh.
            <br><br>
            It is too hot to handle.
            <br><br>
            LOSE 2 STAMINA.
            <br><br>
            You pull your hand back quickly and decide not to try again.`,

            3: `You rolled a 3.<br><br>
            Try as you might, you simply cannot reach the hoard below.
            <br><br>
            Frustrated, you pull yourself away from the edge and leave the treasures undisturbed.`,

            4: `You rolled a 4.<br><br>
            Your hand closes around something. It is not the chain, but after stretching to your absolute limit, you have concluded that the chain itself must be out of reach.
            <br><br>
            You pull your prize free and discover a pouch filled with gold.
            <br><br>
            GAIN 12 GOLD PIECES.`,

            5: `You rolled a 5.<br><br>
            Your hand finds a small crystal vial nestled amongst the treasure.
            <br><br>
            Warm crimson liquid swirls inside. Before you can reconsider, you uncork it and drink.
            <br><br>
            The potion is good.
            <br><br>
            GAIN 4 STAMINA, 2 MAGIC AND 2 LUCK.`,

            6: `You rolled a 6.<br><br>
            You can hardly believe it as your hand closes around the chain.
            <br><br>
            Carefully, you tug it free from beneath the surrounding treasure and pull it safely onto the crater rim.
            <br><br>
            GAIN ITEM – SKY BINDERS CHAIN.
            <br><br>
            When you are done, you head back to the path.`
        }
    };

    diceFlow({
        mode: "roll_only",
        playerStats,
        dice: 1,
        image: "fire.jpg",
        itemName: "Hidden Treasure",
        rollMessage: `<hr><br>
        You carefully reach for the treasure...`,

        onComplete: ({ rollTotal }) => {

            let message = "";

            if (!playerStats.stats) {
                playerStats.stats = {};
            }

            switch (rollTotal) {

                case 1: {

                    const stamina =
                        playerStats.stats.STAMINA ??= {
                            current: 0,
                            max: 10,
                            min: 0
                        };

                    stamina.current -= 4;

                    if (stamina.min != null) {
                        stamina.current =
                            Math.max(stamina.current, stamina.min);
                    }

                    message = flavourText[wizard]?.[1];

                    break;
                }

                case 2: {

                    const stamina =
                        playerStats.stats.STAMINA ??= {
                            current: 0,
                            max: 10,
                            min: 0
                        };

                    stamina.current -= 2;

                    if (stamina.min != null) {
                        stamina.current =
                            Math.max(stamina.current, stamina.min);
                    }

                    message = flavourText[wizard]?.[2];

                    break;
                }

                case 3: {

                    message = flavourText[wizard]?.[3];

                    break;
                }

                case 4: {

                    playerStats.gold =
                        (playerStats.gold ?? 0) + 12;

                    message = flavourText[wizard]?.[4];

                    break;
                }

                case 5: {

                    const gains = {
                        STAMINA: 4,
                        MAGIC: 2,
                        LUCK: 2
                    };

                    Object.entries(gains).forEach(
                        ([statName, amount]) => {

                            const stat =
                                playerStats.stats[statName] ??= {
                                    current: 0,
                                    max: 10,
                                    min: 0
                                };

                            stat.current += amount;

                            if (stat.max != null) {
                                stat.current =
                                    Math.min(
                                        stat.current,
                                        stat.max
                                    );
                            }
                        }
                    );

                    message = flavourText[wizard]?.[5];

                    break;
                }

                case 6: {

                    const chainTemplate =
                        playerStats.items.find(
                            i => i.id === "0097"
                        );

                    if (!chainTemplate) {

                        message = `You rolled a 6.<br><br>
                        You found the chain, but something went wrong.`;

                        break;
                    }

                    const chainItem =
                        structuredClone(chainTemplate);

                    chainItem.id =
                        Date.now().toString();

                    message = flavourText[wizard]?.[6];

                    tryAddItems(playerStats, [chainItem], () => {

                        refreshInventoryUI();

                        showItemModal(
                            {
                                item: "Hidden Treasure",
                                image: "fire.jpg",
                                "use-message":
                                    "You reach for the treasure..."
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
                    item: "Hidden Treasure",
                    image: "fire.jpg",
                    "use-message":
                        "You reach for the treasure..."
                },
                message,
                onResolved,
                playerStats
            );
        }
    });
}