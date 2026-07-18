// mapReadyCombat.js

export function resolveCombatEnemies(combatList, enemiesDb) {
    return combatList
        .map(c => enemiesDb.find(e => e.id === c.enemy))
        .filter(Boolean);
}

export function startNodeCombat({
    combatList,
    horseAllowed,
    canEscape,
    enemiesDb,
    startGroupCombat,
    playerStats,
    gameElement,
    onReturn
}) {
    if (!combatList?.length) return;

    const resolvedEnemies = resolveCombatEnemies(combatList, enemiesDb);

    startGroupCombat(
        gameElement,
        playerStats,
        resolvedEnemies,
        onReturn,
        null,
        horseAllowed,
        canEscape
    );
}

export function getEnemyNames(combatList, enemiesDb) {
    const resolved = resolveCombatEnemies(combatList, enemiesDb);

    return resolved.map(e => e.name).join(", ");
}

export function getEnemyDisplayLines(combatList, enemiesDb) {
    const resolved = resolveCombatEnemies(combatList, enemiesDb);

    return resolved.map(e => ({
        name: e.name,
        skill: e.stats?.skill ?? "?",
        stamina: e.stats?.stamina ?? "?",
        attack: e.combat?.attack ?? "?",
        magic: e.combat?.magic ?? "?"
    }));
}