// combatItems.js
import { inviteFairy } from "./combatCompanions.js";

function isPhantom(enemy) {
    return enemy?.type === "phantom";
}

export function handleCombatItem(playerStats, item, enemyInstances, targets) {

    const ability = item["special-ability"];

    if (ability && ability !== "None") {
        applyItemSpecialAbility(playerStats, ability, item, enemyInstances, targets);
    }
}

function applyItemSpecialAbility(playerStats, ability, item, enemyInstances, targets) {
   
    // Ensure effects array exists
    if (!playerStats.effects) {
        playerStats.effects = [];
    }

    switch (ability) {

        case "VEIL":
        {
            if (!enemyInstances) {
                break;
            }

            if (enemyInstances.length === 0) {
                break;
            }

            enemyInstances.forEach((enemy, index) => {

                if (!enemy || isPhantom(enemy)) return;

                if (!enemy) {
                    return;
                }

                if (enemy.stats?.stamina <= 0) {
                    return;
                }

                if (!enemy.effects) {
                    enemy.effects = [];
                }

                const existing = enemy.effects.find(e => e.type === "veilSkillDebuff");

                if (existing) {
                    return;
                }

                enemy.stats.skill -= 1;

                enemy.effects.push({
                    type: "veilSkillDebuff",
                    amount: 1,
                    applied: true
                });

            });

                 playerStats.effects.push({
                    type: "veilBuff",
                    image: item.image,
                    remaining: 99,
                });

            break;
        }

    case "DB_ATTACK":
        {
            // --- PLAYER BUFF ---
            if (!playerStats.effects) playerStats.effects = [];

            const existingPlayerBuff = playerStats.effects.find(e => e.type === "doubleAttack");

            if (!existingPlayerBuff) {

            const attackBonus = playerStats.stats.ATTACK.current;

            playerStats.stats.ATTACK.current += attackBonus;

            playerStats.effects.push({
                type: "doubleAttack",
                name: item.item,
                image: item.image,
                stat: "ATTACK",
                amount: attackBonus,
                remaining: 99,
                revert: true,
                });

            } 

            // --- ENEMY DEBUFF
            if (!enemyInstances || enemyInstances.length === 0) break;

            enemyInstances.forEach((enemy, index) => {

                if (!enemy || isPhantom(enemy) || enemy.stats.stamina <= 0) return;

                if (!enemy.effects) enemy.effects = [];

                const existing = enemy.effects.find(e => e.type === "veilSkillDebuff");

                if (existing) return;

                enemy.stats.skill -= 1;

                enemy.effects.push({
                    type: "veilSkillDebuff",
                    amount: 1
                });
            });

            break;
        }

    case "MASSIVE_DAMAGE":
        {
            if (!playerStats.effects) playerStats.effects = [];

            const existing = playerStats.effects.find(e => e.type === "doubleSweepDamage");

            if (!existing) {
                playerStats.effects.push({
                    type: "doubleSweepDamage",
                    name: item.item,
                    image: item.image,
                    remaining: 99
                });
            }

            break;
        }
    
    case "DB_SPEED":
        {
            if (!playerStats.effects) playerStats.effects = [];

            const existing = playerStats.effects.find(e => e.type === "doubleSpeed");

            if (!existing) {
                playerStats.effects.push({
                    type: "doubleSpeed",
                    name: item.item,
                    image: "escape.jpg",
                    remaining: 99
                });
            }

            break;
        }

    case "DEATH_RATTLE":
        {
            playerStats.stats.STAMINA.current = Math.ceil(
                playerStats.stats.STAMINA.current / 2
            );

            let targetName = "enemy"; // fallback

            if (targets && targets.length > 0) {
                const { enemy } = targets[0];

                targetName = enemy.name;

                if (enemy && !isPhantom(enemy)) {
                    enemy.stats.stamina = 3;
                }
            }

            playerStats.effects.push({
                    type: "deathRattle",
                    name: item.item,
                    image: item.image
            });

            item.extraMessage = `Your STAMINA is reduced to ${playerStats.stats.STAMINA.current}, and the ${targetName}'s to 3.`;

            break;
        }

        case "ORB_DEATH":
            {
                playerStats.stats.STAMINA.current = Math.ceil(
                    playerStats.stats.STAMINA.current = 1
                );

                let targetName = "enemy"; // fallback

                if (targets && targets.length > 0) {
                    const { enemy } = targets[0];

                    targetName = enemy.name;

                    if (enemy && !isPhantom(enemy)) {
                        enemy.stats.stamina = 0;
                    }
                }

                playerStats.effects.push({
                        type: "deathOrb",
                        name: item.item,
                        image: item.image
                });

                item.extraMessage = `The ${targetName} is killed instantly at the cost of your STAMINA which has been reduced to 1.`;

                break;
            }

        case "FAIRY":
            {
                playerStats.fairyShower = true;

                playerStats.effects.push({
                        type: "fairyShower",
                        name: item.item,
                        image: item.image
                });

                item.extraMessage = `A fairy warrior has joined your party.`;

                inviteFairy(playerStats);
                break;
            }            

        case "SICKLE_BLOOD":
        case "ORB_FIRE": {

            if (!enemyInstances || enemyInstances.length === 0) {
                break;
            }

            let messages = [];

        enemyInstances.forEach((enemy) => {

            if (!enemy || isPhantom(enemy) || enemy.stats?.stamina <= 0) return;

                if (!enemy.effects) {
                    enemy.effects = [];
                }

                const effectType = "fireOrbDebuff";

                const existing = enemy.effects.find(e => e.type === effectType);
                if (existing) return;

                const combat = enemy.combat;
                const name = enemy.name || "enemy";

                // --- BASE DAMAGE PER ITEM ---
                let reduction =
                    item["special-ability"] === "SICKLE_BLOOD" ? 3 : 5;

                    if (combat) {

                        // --- IMMUNITY / RESISTANCE ---
                        if (combat.immune === "FIRE" && combat.immune_mod) {

                            reduction = Math.floor(reduction / combat.immune_mod);

                            if (reduction === 0) {
                                messages.push(`The ${name} is immune to fire.<br>The ${item.item} has no effect.<br><br>`);
                            } else {
                                messages.push(`The ${name} resists the fire.<br>The ${item.item} has a reduced effect.<br><br>`);
                            }

                        } 
                        // --- WEAKNESS ---
                        else if (combat.weak === "FIRE" && combat.weak_mod) {

                            reduction = reduction * combat.weak_mod;

                            messages.push(`The ${name} is weak against fire.<br>The ${item.item} has a staggering effect upon it.`);
                        }
                    }

                reduction = Math.max(0, reduction);

                enemy.stats.stamina = Math.max(0, enemy.stats.stamina - reduction);

                enemy.effects.push({
                    type: effectType,
                    amount: reduction,
                    applied: true
                });

            });

            playerStats.effects.push({
                type: item.type,
                image: item.image,
            });

            item.extraMessage = messages.length > 0
                ? messages.join(" ")
                : `All enemies are hit with burning damage.`;

            break;
        }

        default:
            console.warn("Unknown item ability:", ability, "Item:", item.id);
    }
}

