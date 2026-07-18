// randomSpell.js
import { allSpells } from './spells.js';
import { handleAttackSpell } from "./attackSpells.js";
import { handleExplosiveSpell } from "./explosiveSpells.js";
import { handleSlowBurnSpell } from "./slowBurnSpells.js";
import { handleDefenceSpell } from "./defenceSpells.js";
import { handleOtherSpell } from "./otherSpells.js";

// --- GET RANDOM SPELL ---
export function getRandomSpell() {
    if (!allSpells || allSpells.length === 0) {
        console.warn("No spells loaded yet!");
        return null;
    }

    // Filter out the 40th spell (index 39)
    const validSpells = allSpells.filter((_, index) => index !== 39);

    // Pick a random spell
    const randomIndex = Math.floor(Math.random() * validSpells.length);
    const spell = validSpells[randomIndex];

    // Log the spell details
//    console.log(`RANDOM SPELL HERE: id=${spell.id}, name=${spell.name}, type=${spell.type}`);

    return spell;
}

export function castSpellByType(spell, playerStats, targetEnemy, context) {
    if (!spell) {
        console.warn("No spell provided to castSpellByType");
        return null;
    }

 //   console.log(`CAST DISPATCH: Spell "${spell.name}" is of type "${spell.type}"`);

    switch (spell.type) {
        case "Attack":
 //           console.log("➡️ Casting Attack spell");

            return handleAttackSpell(playerStats, targetEnemy, {
                ...context,
                overrideSpell: spell
            });

        case "Explosive":
 //           console.log("➡️ Casting Explosive spell");

            return handleExplosiveSpell(playerStats, targetEnemy, {
                ...context,
                overrideSpell: spell,
                enemyIndex: context.enemyIndex
            });
            
        case "Slow Burn":
 //           console.log("➡️ Casting Slow Burn spell");

            return handleSlowBurnSpell(playerStats, [targetEnemy], {
                ...context,
                overrideSpell: spell
            });

        case "Defence":
 //           console.log("➡️ Casting Defence spell");

            return handleDefenceSpell(playerStats, targetEnemy, {
                ...context,
                overrideSpell: spell
            });

        case "Other":
 //
            return handleOtherSpell(
                playerStats,
                [targetEnemy],
                spell,
                context
            );

        default:
            console.warn("Unknown spell type:", spell.type);
            break;
    }

    return null; // no execution yet
}