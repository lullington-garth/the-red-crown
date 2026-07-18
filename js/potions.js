// potions.js

export function usePotion(playerStats, item, context) {

    // 🧭 Route by context (future-proofing)
    switch (context) {
        case "combat":
            handleCombatPotion(playerStats, item);
            break;

        case "inventory":
        case "gameplay":
        default:
            handleStandardPotion(playerStats, item);
            break;
    }

    // ✨ Special abilities (only if valid)
    const ability = item["special-ability"];

    if (ability && ability !== "None") {
        applySpecialAbility(playerStats, ability, item);
    }
}

function handleStandardPotion(playerStats, item) {
    if (item["stat-mod-type"] === "use") {}
}

function handleCombatPotion(playerStats, item) {

    switch (item.id) {

        case "healing_potion_small":
            playerStats.stats.STAMINA.current += 5;
            return;

        case "stamina_boost":
            playerStats.stats.STAMINA.current += 10;
            return;
    }

    handleStandardPotion(playerStats, item);
}

function applySpecialAbility(playerStats, ability, item) {

    // Ensure effects array exists
    if (!playerStats.effects) {
        playerStats.effects = [];
    }

    switch (ability) {

        case "IRON_1":
        {
                playerStats.effects.push({
                    type: "invulnerable",
                    duration: 3,
                    remaining: 3,
                    source: "potion",
                    itemId: item.id,
                    justApplied: true
                });

            // Skill buff
            if (!playerStats.stats.SKILL) {
                playerStats.stats.SKILL = { current: 0, max: 0, min: 0 };
            }

            const skillBonus = 1;

            playerStats.stats.SKILL.current += skillBonus;

            playerStats.effects.push({
                type: "skillBuffP",
                name: item.item,
                stat: "SKILL",
                amount: skillBonus,
                remaining: 3,
                revert: true,
                justApplied: true
            });

            break;
        }

        case "IRON_2":
        {
                playerStats.effects.push({
                    type: "invulnerable",
                    duration: 3,
                    remaining: 3,
                    source: "potion",
                    itemId: item.id,
                    justApplied: true
                });

            // Strength buff
            if (!playerStats.stats.ATTACK) {
                playerStats.stats.ATTACK = { current: 0, max: 0, min: 0 };
            }

            const attackBonus = 2;

            playerStats.stats.ATTACK.current += attackBonus;

            playerStats.effects.push({
                type: "strengthBuffP",
                name: item.item,
                stat: "ATTACK",
                amount: attackBonus,
                remaining: 3,
                revert: true,
                justApplied: true
            });

            break;
        } 
        
                case "IRON_3":
        {
                playerStats.effects.push({
                    type: "invulnerable",
                    duration: 3,
                    remaining: 3,
                    source: "potion",
                    itemId: item.id,
                    justApplied: true
                });

            break;
        }  

        case "OGRE":
        {
                playerStats.effects.push({
                    type: "halfDamage",
                    duration: 3,
                    remaining: 3,
                    source: "potion",
                    itemId: item.id,
                    justApplied: true
                });

            // Strength buff
            if (!playerStats.stats.ATTACK) {
                playerStats.stats.ATTACK = { current: 0, max: 0, min: 0 };
            }

            const attackBonus = 4;

            playerStats.stats.ATTACK.current += attackBonus;

            playerStats.effects.push({
                type: "strengthBuffO",
                name: item.item,
                stat: "ATTACK",
                amount: attackBonus,
                remaining: 3,
                revert: true,
                justApplied: true
            });

            break;
        } 

    case "VEIL":
        {
                playerStats.effects.push({
                    type: "hazed",
                    duration: 3,
                    remaining: 3,
                    source: "potion",
                    itemId: item.id,
                    justApplied: true
                });

                item.extraMessage = "While not fully effective against ground based creatures your form is hazed and enemy blows fall less sure.";

            break;
        } 

    case "CLIFF":
        {
            if (!playerStats.stats.SKILL) {
                playerStats.stats.SKILL = { current: 0, max: 0, min: 0 };
            }

            const skillBonus = 1;

            playerStats.stats.SKILL.current += skillBonus;

            playerStats.effects.push({
                type: "skillBuffP",
                name: item.item,
                stat: "SKILL",
                amount: skillBonus,
                remaining: 3,
                revert: true,
                justApplied: true
            });

                item.extraMessage = "While not designed for combat use, you find your stance steadied and your skill improved.";

            break;
        }     

    case "FEATHER":
        {
            if (!playerStats.stats.SKILL) {
                playerStats.stats.SKILL = { current: 0, max: 0, min: 0 };
            }

            const skillPenalty = -4;

            playerStats.stats.SKILL.current += skillPenalty;

            playerStats.effects.push({
                type: "skillDeBuff",
                name: item.item,
                stat: "SKILL",
                amount: skillPenalty,
                remaining: 3,
                revert: true,
                justApplied: true
            });

                item.extraMessage = "Are you out of your mind! Why would you make yourself as light as a feather during battle? Your SKILL is reduced by 4 while you waft around in the breeze.";

            break;
        }   

    case "RAISE": {
        if (!playerStats.__raiseInjected) {
            playerStats.__raiseInjected = true;

            // Create your injected enemy
            const raisedEnemy = {
                id: "RAISED_001",
                name: "Unhappy Harry",
                stats: {
                    skill: 6,
                    stamina: 6
                },
                combat: {
                    attack: 1,
                    magic: 0,
                    defence: 0,
                    magic_res: 0,
                    attack_type: "melee",
                    dice: 2,
                    group: true
                },
                special: {
                    attack: null
                },
                encounter: {
                    found: 100
                },
                effects: []
            };

            // Inject into global combat (you’ll wire this in step 2)
            if (window.__injectEnemyIntoCombat) {
                window.__injectEnemyIntoCombat(raisedEnemy);
            }

            item.extraMessage = "An enemy has been raised!";
        }
        break;
    }

        case "DELAY_RESTORE":
        {
            playerStats.effects.push({
                name: item.item,
            });

                item.extraMessage = "There will be a delay of one combat round before the effects fully embed, while the potion infuses your body and mind.";

            break;
        }   

        default:
            console.warn("Unknown potion ability:", ability, "Item:", item.id);
    }
}