// mapApplyEffects.js

import { applyUseStatMods } from "./itemStatModifiers.js";

export function applyEffects(playerStats, effects, isPlayerDeadFn) {
    if (!effects || effects.length === 0) return false;

    for (const effect of effects) {
        let statKey = effect.stat?.toUpperCase();
        const value = effect.value;
        const total = effect.total;
        const equals = effect.equals;

        if (!statKey) continue;

        // 🟡 SPECIAL: REPLENISH
        if (statKey === "REPLENISH") {
            const replenishStat = playerStats.replenishStat;

            if (!replenishStat) {
                console.warn("⚠️ No replenishStat defined on player");
                continue;
            }

            let modSuffix;

            if (typeof value === "string") {
                if (value.toUpperCase() === "TOTAL" || value.toUpperCase() === "MAX") {
                    modSuffix = "(T)";
                } else {
                    console.warn("⚠️ Unknown replenish value:", value);
                    continue;
                }
            } else if (typeof value === "number") {
                modSuffix = value;
            } else {
                console.warn("⚠️ Invalid replenish value:", value);
                continue;
            }

            const finalStatMod = `${replenishStat}${modSuffix}`;

            const item = {
                "stat-mod-type": "use",
                "stat-mod": finalStatMod
            };

            applyUseStatMods(playerStats, item);

            continue;
        }

        if (statKey === "ETHOSOTHER") {
            statKey = playerStats.absentBrotherEthos;
        }

        if (statKey === "ETHOS") {
            statKey = playerStats.visitingBrotherEthos;
        }

        if (statKey === "ETHOSOWN") {
            statKey = playerStats.replenishStat;
        }

        // 🟢 NORMAL STAT HANDLING
        const stat = playerStats.stats?.[statKey];

        if (!stat) {
            console.warn(`⚠️ Unknown stat: ${statKey}`);
            continue;
        }

        // 🟣 SET CURRENT AND MAX TO A FIXED TOTAL
        if (total !== null && total !== undefined) {

            stat.current = Number(total);
            stat.max = Number(total);

            continue;
        }

        // 🟣 SET CURRENT TO AN EXACT VALUE
        if (equals !== null && equals !== undefined) {

            stat.current = Number(equals);

            if (stat.max != null) {
                stat.current = Math.min(stat.current, stat.max);
            }

            if (stat.min != null) {
                stat.current = Math.max(stat.current, stat.min);
            } else {
                stat.current = Math.max(stat.current, 0);
            }

            continue;
        }

        stat.current += value;

        if (stat.max != null) {
            stat.current = Math.min(stat.current, stat.max);
        }

        if (stat.min != null) {
            stat.current = Math.max(stat.current, stat.min);
        } else {
            stat.current = Math.max(stat.current, 0);
        }
    }

    return isPlayerDeadFn(playerStats);
}