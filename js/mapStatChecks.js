// mapStatChecks.js
import { resolveStatCheck, resolveStatName } from "./statChecks.js";
import { diceFlow } from "./diceFlow.js";
import { showItemOverlay } from "./itemOverlay.js";

export function handleStatCheck(statChecks, playerStats, goToNode, onDone){

    if (!Array.isArray(statChecks) || statChecks.length === 0) return;

    // For now: handle FIRST check only
    const check = statChecks[0];
    const resolvedStat = resolveStatName(check.stat, playerStats);
    const displayStat =
    resolvedStat === "STAMINA"
        ? "INNER STRENGTH"
        : resolvedStat;

    const properDisplayStat = displayStat
        .toLowerCase()
        .replace(/\b\w/g, letter => letter.toUpperCase());

    if (!resolvedStat) {
        console.warn("Invalid stat:", check.stat);
        return;
    }

    const diceCount = resolvedStat === "STAMINA"
    ? 4
    : (check.dice ?? 2);
    const modifiedDiceCount = diceCount - playerStats.connectionModifier;

    const statValue = playerStats.stats[resolvedStat].current;

    diceFlow({
        stat: resolvedStat,
        playerStats,
        dice: modifiedDiceCount,
        image: "dice.jpg",
        itemName: `Your ${properDisplayStat} ${statValue}`,
        rollMessage: `<hr><br>
        Test your ${properDisplayStat}... `,

        onComplete: (rollResult) => {

            const success = rollResult.rollTotal <= statValue;

            const resultText = success ? `SUCCESS!<br><br>You pull deep on your ${properDisplayStat} and find it plentyful. You are successful.` : `FAILURE!<br><br>Your ${properDisplayStat} ebbs and dwindles. You are unsuccessful.`;

            const nextNode = success
                ? check.successTo
                : check.failTo;

            if (!nextNode) {
                console.warn("No routing target defined");
                return;
            }

            // 🎯 SHOW OVERLAY INSTEAD OF CONSOLE LOG
            showItemOverlay(
                {
                    item: `Your ${properDisplayStat} ${statValue}`,
                    image: "dice.jpg",
                },
                `You rolled: ${rollResult.rollTotal}
                <br><br>${resultText}`,
                () => {
                if (typeof onDone === "function") {
                    onDone();
                }
                    goToNode(nextNode);
                }
            );
        }
    });
}