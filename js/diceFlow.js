// diceFlow.js
import { showPreRollModal, showPostRollModal, rollModal } from "./diceModals.js";
import { getPreRollOptions, getPostRollOptions } from "./diceRollModifier.js";
import { resolveStatCheck } from "./statChecks.js";

export function diceFlow({
    stat,
    playerStats,
    dice = 2,
    image,
    itemName,
    onComplete,
    mode = "stat_check",
    rollMessage = "Test your LUCK"
}) {

    const context = { stat };
    const options = getPreRollOptions(playerStats, context);

    const meaningfulOptions = options.filter(o => o.id !== "normal_roll");

    if (meaningfulOptions.length === 0) {
        return startRoll({
            stat,
            dice,
            statModifier: 0,
            message: rollMessage
        });
    }

    showPreRollModal({
        itemName,
        image,
        stat,
        options,
        playerStats,
        rollMessage,
        onSelect: (selectedOption) => {

        const session = {
            stat,
            dice,
            message: rollMessage,
            preRollMessage: null,

            // Passive horse abilities
            devilsDice:
                playerStats.horse?.id === "enchanted_friesian" &&
                stat === "LUCK"
        };

            if (selectedOption?.apply) {
                selectedOption.apply(session);
            }

            startRoll(session);
        }
    });

    function startRoll(session) {

        let lastRoll = null;

function handlePostRollSelect(selected) {

const newSession = {
    ...session,
    message: session.message,
    preRollMessage: session.preRollMessage
};

    if (selected?.apply) {
        selected.apply(newSession);
    }

    if (newSession.reroll) {

        rollModal({
            item: {
                item: "Reroll",
                image: "dice.jpg"
            },
            dice: session.dice ?? dice,
            rollMessage: newSession.message,
            session: newSession,

            onPostRollOptions: ({ lastRoll: newRoll }) => {

                lastRoll = newRoll;

                const updatedPostOptions = getPostRollOptions(
                    playerStats,
                    { stat },
                    lastRoll,
                    newSession
                );

                showPostRollModal({
                    itemName: "Would you like to Reroll?",
                    image: "dice.jpg",
                    stat,
                    lastRoll,
                    rollMessage,
                    options: [
                        {
                            id: "keep",
                            item: {
                                item: "Keep Roll",
                                image: "dice.jpg",
                                description: "Continue with your existing roll",
                            },
                            apply: () => {}
                        },
                        ...updatedPostOptions
                    ],
                    playerStats,
                    onSelect: handlePostRollSelect
                });
            },

            onRollComplete: (rollTotal) => {
                if (mode === "roll_only") {
                    onComplete({ rollTotal: lastRoll?.total ?? rollTotal });
                    return;
                }

                const result = resolveStatCheck(stat, rollTotal, session, playerStats);
                onComplete(result);
            }
        });

        return;
    }

    // ✅ KEEP PATH FIX
    if (mode === "roll_only") {
        onComplete({ rollTotal: lastRoll?.total ?? 0 });
        return;
    }

    const result = resolveStatCheck(stat, lastRoll.total, session, playerStats);
    onComplete(result);
}

        rollModal({
            item: { item: itemName, image },
            dice: session.dice ?? dice,
            rollMessage: session.message,
            session,

            onPostRollOptions: ({ lastRoll: lr }) => {

                lastRoll = lr;

                // Fate's Edge Rune skips post-roll flow entirely
                if (session.forceLucky && stat === "LUCK") {
                    return;
                }

                const postOptions = getPostRollOptions(
                    playerStats,
                    { stat },
                    lastRoll,
                    session
                );

                if (!postOptions.length) return;

                showPostRollModal({
                    itemName: "Would you like to Reroll?",
                    image: "dice.jpg",
                    stat,
                    lastRoll,
                    rollMessage,
                    options: [
                        {
                            id: "keep",
                            item: {
                                item: "Keep Roll",
                                image: "dice.jpg",
                                description: "Continue with your existing roll",
                            },
                            apply: () => {}
                        },
                        ...postOptions
                    ],
                    playerStats,
                    onSelect: handlePostRollSelect
                });
            },

            onRollComplete: (rollTotal) => {
                // ✅ CLEAN: delegate to resolver
                if (mode === "roll_only") {
                    onComplete({ rollTotal: lastRoll.total });
                    return;
                }

                const result = resolveStatCheck(stat, rollTotal, session, playerStats);
                onComplete(result);
            }
        });
    }
}