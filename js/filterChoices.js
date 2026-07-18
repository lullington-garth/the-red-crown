// filterChoices.js
import { isOwned, isWorn,isOwnedType, hasMagicalItem, hasNonMagicalItem, hasCursedItem, hasTradableItem } from "./inventoryQueries.js";

const ITEM_GROUPS = {
    realmStaff: ["0262","0263","0264","0265","0266","0267","0269","0270","0271","0272","0273",
                "0274","0275","0276","0277","0278","0279","0280"]
};

function getSpecialItem(playerStats, key) {

    switch (key) {

        case "enviro2Item": {

            const colour =
                (playerStats.visitingBrother || "").toLowerCase();

            if (colour === "yellow") return "0083";
            if (colour === "green")  return "0084";
            if (colour === "blue")   return "0086";

            return null;
        }

        default:
            return null;
    }
}

export function filterChoices(engine, choices = []) {

    return choices
        .map(choice => {

            // ----------------------------
            // CUSTOM CHECK
            // ----------------------------
            if (choice.check) {

                let passed = false;

                try {

                    passed = Function(
                        "playerStats",
                        `return (${choice.check});`
                    )(engine.playerStats);

                } catch (err) {

                    console.error(
                        "Choice check failed:",
                        choice.check,
                        err
                    );

                    passed = false;
                }

                // FAIL CONDITION
                if (!passed) {

                    const mode =
                        (choice.onFail || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (passed) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // TENSION RANGE CHECK
            // ----------------------------
            if (choice.tensionBetween) {

                const [min, max] =
                    choice.tensionBetween
                        .split("-")
                        .map(Number);

                const tension =
                    engine.state.tension || 0;

                const passed =
                    tension >= min &&
                    tension <= max;

                // FAIL CONDITION
                if (!passed) {

                    const mode =
                        (choice.onFail || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (passed) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // VISITED NODE CHECK
            // ----------------------------
            if (choice.visitedAlready) {

                const visited =
                    engine.state.visitedNodes[choice.visitedAlready];

                if (visited) {

                const mode =
                    (choice.onVisited || "hide").toLowerCase();;

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // COMBAT RESULT CHECKS
            // ----------------------------

            const wonCombat =
                engine.state.flags[
                    `combatWon_${engine.state.currentNode}`
                ];

            const escapedCombat =
                engine.state.flags[
                    `combatEscaped_${engine.state.currentNode}`
                ];

            // ----------------------------
            // onWin
            // ----------------------------
            if (choice.onWin) {

                const mode = choice.onWin.toLowerCase();

                if (wonCombat && mode === "hide") {
                    return null;
                }

                if (wonCombat && mode === "disable") {
                    return {
                        ...choice,
                        disabled: true
                    };
                }
            }

            // ----------------------------
            // onEscape
            // ----------------------------
            if (choice.onEscape) {

                const mode = choice.onEscape.toLowerCase();

                if (escapedCombat && mode === "hide") {
                    return null;
                }

                if (escapedCombat && mode === "disable") {
                    return {
                        ...choice,
                        disabled: true
                    };
                }
            }

            // ----------------------------
            // ITEM OWNERSHIP CHECK
            // ----------------------------
            if (choice.requiresItemOwned) {

                let owned = false;

                if (Array.isArray(choice.requiresItemOwned)) {

                    owned = choice.requiresItemOwned.some(
                        itemId => isOwned(engine.playerStats, itemId)
                    );
                }
                else {

                    const group =
                        ITEM_GROUPS[choice.requiresItemOwned];

                    if (group) {

                        owned = group.some(
                            itemId =>
                                isOwned(engine.playerStats, itemId)
                        );

                    }
                    else {

                        const specialItem =
                            getSpecialItem(
                                engine.playerStats,
                                choice.requiresItemOwned
                            );

                        if (specialItem) {

                            owned = isOwned(
                                engine.playerStats,
                                specialItem
                            );

                        } else {

                            owned = isOwned(
                                engine.playerStats,
                                choice.requiresItemOwned
                            );
                        }
                    }
                }

                // FAIL CONDITION
                if (!owned) {

                    const mode =
                        (choice.onFail || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (owned) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // NULL CHECK
            // ----------------------------
            if (choice.requiresNull) {

                const isNull =
                    engine.playerStats[
                        choice.requiresNull
                    ] == null;

                // FAIL CONDITION
                if (!isNull) {

                    const mode =
                        (choice.onFail || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (isNull) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // TRUE CHECK
            // ----------------------------
            if (choice.requiresTrue) {

                const isTrue =
                    !!engine.playerStats[
                        choice.requiresTrue
                    ];

                // FAIL CONDITION
                if (!isTrue) {

                    const mode =
                        (choice.onFail || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (isTrue) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

//console.log(
  //  "requiresTrue check:",
    //choice.requiresTrue,
//    engine.playerStats[choice.requiresTrue],
  //  isTrue
//);
            }

            // ----------------------------
            // TRADABLE ITEM CHECK
            // ----------------------------
            if (choice.requiresTradableItem) {

                const hasTradable =
                    hasTradableItem(engine.playerStats)

                // FAIL CONDITION
                if (!hasTradable) {

                    const mode =
                        (choice.onFail || "hide").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (hasTradable) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // GOLD CHECK
            // ----------------------------
            if (choice.requiresGold !== undefined) {

            const playerGold =
                engine.playerStats.gold || 0;

            let requiredGold = choice.requiresGold;

            // ---------------------------------
            // Variable gold support
            // requiresGold: gameTotal
            // ---------------------------------

            if (typeof requiredGold === "string") {

                requiredGold =
                    engine.playerStats?.[requiredGold];

                if (requiredGold === undefined) {
                    requiredGold = 0;
                }
            }

            requiredGold = Number(requiredGold) || 0;

            const hasEnoughGold =
                playerGold >= requiredGold;

                // FAIL CONDITION
                if (!hasEnoughGold) {

                    const mode =
                        (choice.onFail || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (hasEnoughGold) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // MAGICAL ITEM CHECK
            // ----------------------------
            if (choice.requiresMagicalItem) {

                const hasMagical =
                    hasMagicalItem(engine.playerStats)

                // FAIL CONDITION
                if (!hasMagical) {

                    const mode =
                        (choice.onFail || "hide").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (hasMagical) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // NON-MAGICAL ITEM CHECK
            // ----------------------------
            if (choice.requiresNonMagicalItem) {

                const hasNonMagical =
                    hasNonMagicalItem(engine.playerStats)

                // FAIL CONDITION
                if (!hasNonMagical) {

                    const mode =
                        (choice.onFail || "hide").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (hasNonMagical) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // CURSED ITEM CHECK
            // ----------------------------
            if (choice.requiresCursedItem) {

                const hasCursed =
                    hasCursedItem(engine.playerStats)

                // FAIL CONDITION
                if (!hasCursed) {

                    const mode =
                        (choice.onFail || "hide").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (hasCursed) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // ITEM TYPE CHECK
            // ----------------------------
            if (choice.requiresItemType) {

                const hasType =
                    isOwnedType(
                        engine.playerStats,
                        choice.requiresItemType
                    )

                // FAIL CONDITION
                if (!hasType) {

                    const mode =
                        (choice.onFail || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }

                // PASS CONDITION
                if (hasType) {

                    const mode =
                        (choice.onPass || "").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }

            // ----------------------------
            // ITEM WORN CHECK
            // ----------------------------
            if (choice.requiresItemWorn) {

                const worn =
                    isWorn(
                        engine.playerStats,
                        choice.requiresItemWorn
                    )

                if (!worn) {

                    const mode =
                        (choice.onFail || "hide").toLowerCase();

                    if (mode === "hide") return null;

                    if (mode === "disable") {
                        return {
                            ...choice,
                            disabled: true
                        };
                    }
                }
            }
        return choice;

        })
        .filter(Boolean)
.map(choice => {

    return choice;
})
        .map(choice => {

            if (choice.state === "hidden") {
                return null;
            }

            if (choice.state === "disabled") {
                return {
                    ...choice,
                    disabled: true
                };
            }

            return choice;

        })
        .filter(Boolean);
}