// enemySpecialAttacks.js

export function resolveEnemySpecial(enemy, context) {
    const specialType = enemy.special?.attack;

    switch (specialType) {
        case "FIRE":
            return {
                damage: 9,
                type: "special",
                subtype: "FIRE",
                label: "Dragon Fire"
            };
        case "DOUBLE":
            return {
                damage: 4,
                type: "special",
                subtype: "DOUBLE",
                label: "Double Strike"
            };
        case "FORK":
            return {
                damage: 3,
                type: "special",
                subtype: "FORK",
                label: "Fork Strike"
            };
        case "SLASH":
            return {
                damage: 3,
                type: "special",
                subtype: "SLASH",
                label: "Slashed"
            };
        case "BOTTLED":
            return {
                damage: 3,
                type: "special",
                subtype: "BOTTLED",
                label: "Bottled"
            };
        case "WHIP":
            return {
                damage: 4,
                type: "special",
                subtype: "WHIP",
                label: "Whipped"
            };
         case "CHOKE":
            return {
                damage: 4,
                type: "special",
                subtype: "CHOKE",
                label: "Choked"
            };  
        case "POISON":
            return {
                damage: 3,
                type: "special",
                subtype: "POISON",
                label: "Poison Attack"
            };
        case "MACE":
            return {
                damage: 6,
                type: "special",
                subtype: "MACE",
                label: "Mace Attack"
            };
        case "ACID":
            return {
                damage: 2,
                type: "special",
                subtype: "ACID",
                label: "Acid Attack"
            };
        case "CHITTER":
            return {
                damage: 1,
                type: "special",
                subtype: "CHITTER",
                label: "Chitter"
            };
        case "BOW":
            return {
                damage: 3,
                type: "special",
                subtype: "BOW",
                label: "Bow Attack"
            };
        default:
            return {
                damage: 0,
                type: "special",
                label: "Unknown"
            };
    }
}