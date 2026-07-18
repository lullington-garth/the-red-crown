// wornCombatEffects.js

export function handleWornItemEffects(playerStats, enemyInstances) {
    const worn = playerStats.inventory?.wornItems;
    if (!worn) return;

    const items = Object.values(worn).filter(Boolean);

    items.forEach(item => {
        const ability = item["special-ability"];

        if (!ability || ability === "None") return;

        applyWornAbility(playerStats, ability, item, enemyInstances);
    });
}

function applyWornAbility(playerStats, ability, item, enemyInstances) {
    if (!playerStats.effects) {
        playerStats.effects = [];
    }

    switch (ability) {

    case "DEATH_SLIP":  
    case "RESURRECT":
        {
            const existing = playerStats.effects.find(e => e.type === "resurrect");

            if (!existing) {
                playerStats.effects.push({
                    type: "resurrect",
                    name: item.item,
                    image: "resurrect.jpg",
                });
            }

            break;
        }

    case "WORM":
        {
            const existing = playerStats.effects.find(e => e.type === "worm");

            if (!existing) {
                playerStats.effects.push({
                    type: "worm",
                    name: item.item,
                    image: "fire.jpg",
                });
            }

            break;
        }

    case "ABSORB_FIRE":
    case "ABSORB_MAGIC":
    case "ESCAPE":
        {
            const existing = playerStats.effects.find(e => e.type === "other");

            if (!existing) {
                playerStats.effects.push({
                    type: "other",
                    name: item.item,
                    image: item.image,
                    item
                });
            }

            break;
        }
 
    case "SHADOW_SLIP":
    case "BEHOLD":
    case "ANGEL":
    case "IMP":        
        {
            break;
        }        

        default:
            console.warn("Unknown worn ability:", ability);
    }

}