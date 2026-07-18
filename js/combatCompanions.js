// combatCompanions.js
import { renderEnemyHitResult, updateEnemyStaminaUI } from "./combatRenderer.js";
import { handleEnemyDeath } from "./enemyDeath.js";
import { showItemOverlay } from "./itemOverlay.js";
import { closeModal } from "./modal.js";
import { breakCarriedItem } from "./breakItem.js";
import { hasAngelCompanion } from "./inventoryUI.js";
import { hasImpCompanion } from "./inventoryUI.js";

const companions = {
    sam: {
        id: "sam",
        name: "Sam",
        image: "images/sam.svg",
        hitChance: 0.4,  
        damage: 1,
        targetChance: 0.2,  
        maxHits: 3,   
        onExceed: "die"
    },
    shadow: {
        id: "shadow",
        name: "Shadow",
        image: "images/shadow.svg",
        hitChance: 0.2,
        damage: 1,
        targetChance: 0.1,
        maxHits: 0,
        onExceed: "retreat"
    },
    beholder: {
        id: "beholder",
        name: "Beholder",
        image: "images/beholder.svg",
        hitChance: 0.5,
        damage: 1,
        targetChance: 0.5,
        maxHits: 8,
        onExceed: "retreatBeholder"
    },
    warHorse: {
        id: "warHorse",
        name: "War Horse",
        image: "images/horse.svg",
        hitChance: 0.4,
        damage: 2,
        targetChance: 0.2,
        maxHits: 2,
        onExceed: "breakCarriedItem"
    },
    fairy: {
        id: "fairy",
        name: "Fairy",
        image: "images/fairy.svg",
        hitChance: 0.7,
        damage: 2,
        targetChance: 0.1,
        maxHits: 3,
        onExceed: "portal"
    },
        angel: {
        id: "angel",
        name: "Angel",
        image: "images/angel.svg",
        hitChance: 0.75,
        damage: 2,
        targetChance: 0.5,
        maxHits: 15,
        onExceed: "retire"
    },
        sirOrrin: {
        id: "sirOrrin",
        name: "Sir Orrin",
        image: "images/knight.svg",
        hitChance: 0.8,
        damage: 4,
        targetChance: 0.5,
        maxHits: 10000,
        onExceed: "retire"
    },
        imp: {
        id: "imp",
        name: "Imp",
        image: "images/imp.svg",
        hitChance: 0.5,
        damage: 1,
        targetChance: 0.5,
        maxHits: 5,
        onExceed: "scurry"
    }
};

// Check if present
export function isCompanionPresent(playerStats, companionKey) {
    return playerStats?.companions?.includes(companionKey);
}

// Get one companion
export function getCompanion(companionKey) {
    return companions[companionKey];
}

// ✅ NEW: get all active companions
export function getActiveCompanions(playerStats) {
    if (!playerStats?.companions) return [];

    return playerStats.companions
        .map(key => companions[key])
        .filter(Boolean); // safety
}

export function getRandomCompanionTarget(enemyInstances) {
    if (!enemyInstances || enemyInstances.length === 0) return null;

    // Only first 6 enemies
    const validTargets = enemyInstances.slice(0, 6).filter(Boolean);

    if (validTargets.length === 0) return null;

    const index = Math.floor(Math.random() * validTargets.length);

    return {
        enemy: validTargets[index],
        index
    };
}

export function resolveCompanionAttacks({
    playerStats,
    enemyInstances,
    enemySlots
}) {
    const activeCompanions = getActiveCompanions(playerStats);

    activeCompanions.forEach(companion => {
        const roll = Math.random();

        if (roll >= companion.hitChance) return;

        const targetData = getRandomCompanionTarget(enemyInstances);
        if (!targetData) return;

        const { enemy, index } = targetData;
        const targetCell = enemySlots[index];

        // -------------------------
        // APPLY DAMAGE
        // -------------------------
        enemy.stats.stamina -= companion.damage;
        if (enemy.stats.stamina < 0) enemy.stats.stamina = 0;

        if (!enemy.companionHits) enemy.companionHits = [];
        enemy.companionHits.push(companion.id);

        const damageResult = {
            hit: true,
            damage: companion.damage
        };

        // -------------------------
        // RENDER
        // -------------------------
        if (targetCell) {
            renderEnemyHitResult(targetCell, enemy, damageResult);
            updateEnemyStaminaUI(targetCell, enemy);
            handleEnemyDeath(enemy, targetCell, index);
        }

    });
}

export function applyCompanionDamage(playerStats, enemyInstances, combatState) {
    const companions = getActiveCompanions(playerStats);
    companions.forEach(companion => {
        const state = getCompanionState(playerStats, companion.id);

        // reset round flag
        state.hitThisRound = false;
    });

    // --- scan enemy logs ---
    enemyInstances.forEach(enemy => {
        if (!enemy?._lastTargetLog) return;

        enemy._lastTargetLog.forEach(hit => {
            if (hit.target === "player") return;

            const state = getCompanionState(playerStats, hit.target);

            // ✅ collapse multiple hits → one
            if (!state.hitThisRound) {
                state.hitThisRound = true;
                state.hitsTaken++;
            }
        });
    });

    // --- resolve outcomes ---
    companions.forEach(companion => {
        const state = getCompanionState(playerStats, companion.id);

        if (!state.hitThisRound) return;

//        console.log(
  //          `⚔️ ${companion.name} was hit (${state.hitsTaken}/${companion.maxHits})`
    //    );

        if (state.hitsTaken > companion.maxHits) {
            handleCompanionExit(playerStats, companion, combatState);
        }
    });
}

function handleCompanionExit(playerStats, companion, combatState) {
    switch (companion.onExceed) {

        case "die":
              showItemOverlay(
                {
                  item: "Sam Defeated",
                  image: "sam.svg"
                },
                `Come on Sam... Sam? Sam? SAM!<br>Sam is lost. Poor sam.<br><br>Perhaps you could make some shoes out of him.`,
                () => closeModal()
              );            
            playerStats.companions =
                playerStats.companions.filter(c => c !== companion.id);
                playerStats.comeOnSam = false;
                playerStats.stats.LUCK.max -=2;
                if (playerStats.stats.LUCK.max < playerStats.stats.LUCK.min) {
                        playerStats.stats.LUCK.max = playerStats.stats.LUCK.min;
                    }
                if (playerStats.stats.LUCK.current > playerStats.stats.LUCK.max) {
                        playerStats.stats.LUCK.current = playerStats.stats.LUCK.max;
                    }
            break;

        case "portal":
              showItemOverlay(
                {
                  item: "Fairy Defeated",
                  image: "fairy.svg"
                },
                `The fairy warrior is badly wounded.<br><br>She nods her respect, opens a portal<br>and returns the fae realm.`,
                () => closeModal()
              );            
            playerStats.companions =
                playerStats.companions.filter(c => c !== companion.id);
                playerStats.fairyShower = false;
            break;

        case "retreat":
              showItemOverlay(
                {
                  item: "Shadow Defeated",
                  image: "shadowHit.svg"
                },
                `Your shadow has been defeated but is not lost.<br>It fades into smoke and can play no further part in this battle.`,
                () => closeModal()
              );
            playerStats.companions =
                playerStats.companions.filter(c => c !== companion.id);
            break;

        case "retreatBeholder":
              showItemOverlay(
                {
                  item: "Beholder Wounded",
                  image: "beholder.svg"
                },
                `Your beholder has been wounded but is not lost.<br>It will heal quickly but can play no further part in this battle.`,
                () => closeModal()
              );
            playerStats.companions =
                playerStats.companions.filter(c => c !== companion.id);
            break;

        case "retire":
              showItemOverlay(
                {
                  item: "Angel Retires",
                  image: "angel.svg"
                },
                `Your angel can sustain no more<br>damage this battle.<br>She fades into fades in a glow of light.`,
                () => closeModal()
              );
            playerStats.companions =
                playerStats.companions.filter(c => c !== companion.id);
            break;

        case "scurry":
              showItemOverlay(
                {
                  item: "Imp Retreats",
                  image: "imp.svg"
                },
                `Your imp can sustain no more<br>damage this battle.<br>It scurries off to your<br>backpack to lick its wounds.`,
                () => closeModal()
              );
            playerStats.companions =
                playerStats.companions.filter(c => c !== companion.id);
            break;

        case "breakCarriedItem":
              showItemOverlay(
                {
                  item: "War Horse Retreat",
                  image: "horse.svg"
                },
                `Your war horse takes a heavly blow.<br>Something sounds like it broke.<br>
                The horse looks OK, but you should propably check your belongings after the battle.
                <br><br>The horse backs off and will play no further part in the battle.`,
                () => closeModal()
              );
            playerStats.companions =
                playerStats.companions.filter(c => c !== companion.id);
            breakCarriedItem(playerStats)
                
            break;
    }
}

function getCompanionState(playerStats, id) {
    if (!playerStats._companionState) {
        playerStats._companionState = {};
    }

    if (!playerStats._companionState[id]) {
        playerStats._companionState[id] = {
            hitsTaken: 0,
            hitThisRound: false
        };
    }

    return playerStats._companionState[id];
}

export function resetCompanionState(playerStats) {
    if (!playerStats?.companions) return;

    // ensure container exists
    if (!playerStats._companionState) {
        playerStats._companionState = {};
    }

    playerStats.companions.forEach(id => {
        playerStats._companionState[id] = {
            hitsTaken: 0,
            hitThisRound: false
        };
    });
}

export function inviteShadowSlip(playerStats) {
    if (!playerStats) return;

    const worn = playerStats.inventory?.wornItems;

    const hasShadowRing =
        worn?.ring1?.id === "0202" ||
        worn?.ring2?.id === "0202";

    // ensure companions array exists
    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    // --- ADD SHADOW ---
    if (hasShadowRing) {
        if (!playerStats.companions.includes("shadow")) {
            playerStats.companions.push("shadow");
        }
    } else {
        // --- REMOVE SHADOW if ring not worn ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "shadow");
    }
}

export function inviteBeholder(playerStats) {
    if (!playerStats) return;

    const worn = playerStats.inventory?.wornItems;

    const hasBeholderRing =
        worn?.ring1?.id === "0363" ||
        worn?.ring2?.id === "0363";

    // ensure companions array exists
    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    // --- ADD SHADOW ---
    if (hasBeholderRing) {
        if (!playerStats.companions.includes("beholder")) {
            playerStats.companions.push("beholder");
        }
    } else {
        // --- REMOVE SHADOW if ring not worn ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "beholder");
    }
}

export function inviteWarHorse(playerStats, combatState) {
    playerStats._companionState = {};

    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    if (combatState?.horseAllowed && playerStats.horse.id === "war_horse") {
        if (!playerStats.companions.includes("warHorse")) {
            playerStats.companions.push("warHorse");
        }
    } else {
        // --- REMOVE WARHORSE if not in combatState ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "warHorse");
    }
}

export function inviteSam(playerStats) {
    playerStats._companionState = {};

    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    if (playerStats.comeOnSam) {
        if (!playerStats.companions.includes("sam")) {
            playerStats.companions.push("sam");
        }
    } else {
        // --- REMOVE SAM if not in combatState ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "sam");
    }
}

export function inviteFairy(playerStats) {
    playerStats._companionState = {};

    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    if (playerStats.fairyShower) {
        if (!playerStats.companions.includes("fairy")) {
            playerStats.companions.push("fairy");
        }
    } else {
        // --- REMOVE FAIRY if not in combatState ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "fairy");
    }
}

export function inviteAngel(playerStats) {
    playerStats._companionState = {};

    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    if (hasAngelCompanion(playerStats)) {
        if (!playerStats.companions.includes("angel")) {
            playerStats.companions.push("angel");
        }
    } else {
        // --- REMOVE FAIRY if not in combatState ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "angel");
    }
}

export function inviteImp(playerStats) {
    playerStats._companionState = {};

    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    if (hasImpCompanion(playerStats)) {
        if (!playerStats.companions.includes("imp")) {
            playerStats.companions.push("imp");
        }
    } else {
        // --- REMOVE IMP if not in combatState ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "imp");
    }
}

export function inviteSirOrrin(playerStats) {
    playerStats._companionState = {};

    if (!playerStats.companions) {
        playerStats.companions = [];
    }

    if (playerStats.sirOrrin) {
        if (!playerStats.companions.includes("sirOrrin")) {
            playerStats.companions.push("sirOrrin");
        }
    } else {
        // --- REMOVE SIR ORRIN if not in combatState ---
        playerStats.companions =
            playerStats.companions.filter(c => c !== "sirOrrin");
    }
}