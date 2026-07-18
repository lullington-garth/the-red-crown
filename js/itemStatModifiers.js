// itemStatModifiers.js

////////////////////////////////////////////////////////
// APPLY ON USE STAT MODIFIERS
////////////////////////////////////////////////////////
export function applyUseStatMods(playerStats, item) {
    if (item["stat-mod-type"] !== "use") return;

    if (!playerStats.stats) {
        playerStats.stats = {};
    }

    // 🟡 HANDLE (T) TOTAL RESTORE
    if (item["stat-mod"] && item["stat-mod"].includes("(T)")) {

        const statName = item["stat-mod"]
            .replace("(T)", "")
            .trim();

        if (!playerStats.stats[statName]) {
            playerStats.stats[statName] = {
                current: 0,
                max: 10,
                min: 0
            };
        }

        const statObj = playerStats.stats[statName];

        if (statObj.max != null) {
            statObj.current = statObj.max;
        }

        return; 
        }

    const mods = item["stat-mod-object"];
    if (!mods) return;

    Object.keys(mods).forEach(stat => {

        if (!playerStats.stats[stat]) {
            playerStats.stats[stat] = {
                current: 0,
                max: 10,
                min: 0
            };
        }

        const statObj = playerStats.stats[stat];

        statObj.current += mods[stat];

        if (statObj.max != null) {
            statObj.current = Math.min(statObj.current, statObj.max);
        }

        if (statObj.min != null) {
            statObj.current = Math.max(statObj.current, statObj.min);
        }
    });

}

////////////////////////////////////////////////////////
// BASE STAT RULE HELPERS
////////////////////////////////////////////////////////

function isMaxOnlyBaseStat(stat) {
    return ["STAMINA", "LUCK", "MAGIC"].includes(stat);
}

function isMaxAndCurrentBaseStat(stat) {
    return ["SKILL", "ATTACK"].includes(stat);
}

////////////////////////////////////////////////////////
// APPLY STAT EQUIP MODIFIERS
////////////////////////////////////////////////////////

export function applyEquipStatMods(playerStats, item) {
    if (item.status === "broken") return;
    const mods = item["stat-mod-object"];
    if (!mods) return;

    Object.keys(mods).forEach(rawStat => {

        const amount = mods[rawStat];

        const isBase = rawStat.endsWith(" (B)");
        const isMinimum = rawStat.endsWith(" (M)");

        let stat = rawStat;

        if (isBase) stat = stat.replace(" (B)", "");
        if (isMinimum) stat = stat.replace(" (M)", "");

        if (!playerStats.stats.hasOwnProperty(stat)) return;

        const statObj = playerStats.stats[stat];

        // (M) MINIMUM
        if (isMinimum) {
            if (!statObj._equipmentMinMods) {
                statObj._equipmentMinMods = [];
            }

            statObj._equipmentMinMods.push(amount);
            statObj.min = Math.max(...statObj._equipmentMinMods);

            if (statObj.current < statObj.min) {
                statObj.current = statObj.min;
            }

            return;
        }

        // (B) BASE STAT MODIFIERS
        if (isBase) {

            // STAMINA / LUCK / MAGIC
            // Raise MAX only
            if (isMaxOnlyBaseStat(stat)) {

                statObj.max += amount;

                clampStat(statObj);
                return;
            }

            // SKILL / ATTACK
            // Raise MAX and CURRENT
            if (isMaxAndCurrentBaseStat(stat)) {

                statObj.max += amount;
                statObj.current += amount;

                clampStat(statObj);
                return;
            }

            // fallback
            statObj.max += amount;

            clampStat(statObj);
            return;
        }

        // NORMAL
        statObj.current += amount;

        if (statObj.current > statObj.max) statObj.current = statObj.max;

        const minValue = statObj.min ?? 0;
        if (statObj.current < minValue) statObj.current = minValue;
    });
}

////////////////////////////////////////////////////////
// APPLY STAT PICK UP MODIFIERS
////////////////////////////////////////////////////////

export function applyPickupStatMods(playerStats, item) {
    const statModType = item["stat-mod-type"]

    if (statModType !== "pickup") {return};

    const mods = item["stat-mod-object"];
    if (!mods) return;

    Object.keys(mods).forEach(rawStat => {

        const amount = mods[rawStat];

        const isSet = rawStat.endsWith(" (=)");

        let stat = rawStat;

        if (isSet) stat = stat.replace(" (=)", "");

        if (!playerStats.stats.hasOwnProperty(stat)) return;

        const statObj = playerStats.stats[stat];

        // (=) SET
        if (isSet) {
            statObj.max = amount;
            statObj.current = amount;
            return;
        }
        // NORMAL
        statObj.current += amount;

        if (statObj.current > statObj.max) statObj.current = statObj.max;

        const minValue = statObj.min ?? 0;
        if (statObj.current < minValue) statObj.current = minValue;
    });
}

////////////////////////////////////////////////////////
// REMOVE STAT MODIFIERS
////////////////////////////////////////////////////////

export function removeStatMods(playerStats, item) {
    if (item.status === "broken") return;
    const mods = item["stat-mod-object"];
    if (!mods) return;

    Object.keys(mods).forEach(rawStat => {

        const amount = mods[rawStat];

        const isBase = rawStat.endsWith(" (B)");
        const isMinimum = rawStat.endsWith(" (M)");

        let stat = rawStat;

        if (isBase) stat = stat.replace(" (B)", "");
        if (isMinimum) stat = stat.replace(" (M)", "");

        if (!playerStats.stats.hasOwnProperty(stat)) return;

        const statObj = playerStats.stats[stat];

        // (M) REMOVE MINIMUM
        if (isMinimum) {
            if (!statObj._equipmentMinMods) return;

            const index = statObj._equipmentMinMods.indexOf(amount);
            if (index !== -1) {
                statObj._equipmentMinMods.splice(index, 1);
            }

            if (statObj._equipmentMinMods.length > 0) {
                statObj.min = Math.max(...statObj._equipmentMinMods);
            } else {
                statObj.min = 0;
                delete statObj._equipmentMinMods;
            }

            if (statObj.current < statObj.min) {
                statObj.current = statObj.min;
            }

            return;
        }

        // (B) REMOVE BASE MODIFIERS
        if (isBase) {

            // STAMINA / LUCK / MAGIC
            // Lower MAX only
            if (isMaxOnlyBaseStat(stat)) {

                statObj.max -= amount;

                // If current exceeds new max,
                // clamp it down
                if (statObj.current > statObj.max) {
                    statObj.current = statObj.max;
                }

                clampStat(statObj);
                return;
            }

            // SKILL / ATTACK
            // Lower MAX and CURRENT
            if (isMaxAndCurrentBaseStat(stat)) {

                statObj.max -= amount;
                statObj.current -= amount;

                clampStat(statObj);
                return;
            }

            // fallback
            statObj.max -= amount;

            clampStat(statObj);
            return;
        }
    });
}

////////////////////////////////////////////////////////
// SIMPLE MODIFIER (UTILITY)
////////////////////////////////////////////////////////

export function modifyStat(playerStats, stat, amount) {
    const s = playerStats.stats[stat];

    s.current += amount;

    if (s.current > s.max) s.current = s.max;

    const minValue = s.min ?? 0;
    if (s.current < minValue) s.current = minValue;
}

////////////////////////////////////////////////////////
// CLAMP STATS
////////////////////////////////////////////////////////

function clampStat(statObj) {
    if (statObj.max != null && statObj.current > statObj.max) {
        statObj.current = statObj.max;
    }

    const minValue = statObj.min ?? 0;
    if (statObj.current < minValue) {
        statObj.current = minValue;
    }
}