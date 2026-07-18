// combatChaos.js

export async function playChaosPhase({
    playerStats,
    enemy,
    enemyIndex,
    enemyInstances,
    MagicCombat,
    getRandomSpell,
    castSpellByType
}) {
    const hasChaosTrigger = playerStats.effects?.some(
        e => e.type === "chaosTrigger"
    );

    if (!hasChaosTrigger) return null;

    const randomSpell = getRandomSpell();

    const chaosResult = castSpellByType(
        randomSpell,
        playerStats,
        enemy,
        {
            payMagicCost: MagicCombat.payMagicCost,
            resolveSpellRisk: MagicCombat.resolveSpellRisk
        }
    );

    // -------------------------
    // Build targets array
    // -------------------------
    const targets = [];

    const resolveIndex = (enemyRef) => {
        const idx = enemyInstances.indexOf(enemyRef);
        return idx !== -1 ? idx : enemyIndex ?? 0;
    };

    if (chaosResult.targets?.length) {
        chaosResult.targets.forEach(t => {
            targets.push({
                enemy: t.enemy,
                index: resolveIndex(t.enemy)
            });
        });

    } else if (chaosResult.sweepResults?.length) {
        chaosResult.sweepResults.forEach(sr => {
            targets.push({
                enemy: sr.enemy,
                index: resolveIndex(sr.enemy)
            });
        });

    } else if (enemy) {
        targets.push({
            enemy,
            index: resolveIndex(enemy)
        });
    }

    return {
        ...chaosResult,
        targets,
        sweepResults: chaosResult.sweepResults || []
    };
}