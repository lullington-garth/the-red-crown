// resolveFlag.js

import { isOwned } from "./inventoryQueries.js";

export function resolveFlag(
    expression,
    playerStats
) {

    if (
        typeof expression !== "string"
    ) {
        return expression;
    }

    const match =
        expression.match(
            /^resolve\(([^)]+)\)$/
        );

    if (!match) {
        return expression;
    }

    const resolverName = match[1];

    switch (resolverName) {

        case "correctCoinSelection":
            if (
                playerStats.visitingBrother === "Green" &&
                isOwned(playerStats, "0019")
            ) {

                return true;
            }

            if (
                playerStats.visitingBrother === "Blue" &&
                isOwned(playerStats, "0020")
            ) {
                return true;
            }

            if (
                playerStats.visitingBrother === "Yellow" &&
                isOwned(playerStats, "0021")
            ) {
                return true;
            }

            playerStats.hasIncorrectBrotherToken = true
            return false;

        case "absentBrother":
            if (
                playerStats.visitingBrother === "Green" && playerStats.wizardColor === "Blue") 
            {
                playerStats.absentBrotherEthos = "STAMINA";
                playerStats.absentBrotherName = "Lo Tae Zhao";                
                return "Yellow";
            }

            if (
                playerStats.visitingBrother === "Blue" && playerStats.wizardColor === "Green") 
            {
                playerStats.absentBrotherEthos = "STAMINA";
                playerStats.absentBrotherName = "Lo Tae Zhao";                
                return "Yellow";
            }

            if (
                playerStats.visitingBrother === "Blue" && playerStats.wizardColor === "Yellow") 
            {
                playerStats.absentBrotherEthos = "MAGIC";
                playerStats.absentBrotherName = "Carolinus";                
                return "Green";
            }

            if (
                playerStats.visitingBrother === "Yellow" && playerStats.wizardColor === "Blue") 
            {
                playerStats.absentBrotherEthos = "MAGIC";
                playerStats.absentBrotherName = "Carolinus";                
                return "Green";
            }

            if (
                playerStats.visitingBrother === "Green" && playerStats.wizardColor === "Yellow") 
            {
                playerStats.absentBrotherEthos = "LUCK";
                playerStats.absentBrotherName = "Solarius";                
                return "Blue";
            }

            if (
                playerStats.visitingBrother === "Yellow" && playerStats.wizardColor === "Green") 
            {
                playerStats.absentBrotherEthos = "LUCK";
                playerStats.absentBrotherName = "Solarius";                
                return "Blue";
            }

            if (
                playerStats.visitingBrother === "Green" && playerStats.wizardColor === "Red") 
            {
                playerStats.absentBrotherEthos = "LUCK";
                playerStats.absentBrotherName = "Solarius";                
                return "Blue";
            }

            if (
                playerStats.visitingBrother === "Yellow" && playerStats.wizardColor === "Red") 
            {
                playerStats.absentBrotherEthos = "MAGIC";
                playerStats.absentBrotherName = "Carolinus";                
                return "Green";
            }

            if (
                playerStats.visitingBrother === "Blue" && playerStats.wizardColor === "Red") 
            {
                playerStats.absentBrotherEthos = "STAMINA";
                playerStats.absentBrotherName = "Lo Tae Zhao";                
                return "Yellow";
            }

            return "Green";

        default:

            console.warn(
                `Unknown flag resolver: ${resolverName}`
            );

            return false;
    }
}