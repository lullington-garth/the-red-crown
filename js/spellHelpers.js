// spellHelpers.js
import { getBookSpells } from "./spells.js";

/**
 * Standardised fail result
 */
export function failResult(message) {
    return {
        attackRoll: { allRolls: [] },
        hitResult: { hit: false },
        damageResult: {
            hit: false,
            damage: 0,
            riskType: "misfire",
            riskDescription: message
        }
    };
}

/**
 * Get equipped spell of a given type
 */
export function getEquippedSpell(playerStats, type) {

    const bookItem = playerStats.inventory?.wornItems?.book;

    if (!bookItem) {
        return { error: failResult("You have no spellbook equipped.") };
    }

    const spells = getBookSpells(bookItem.id);
    const spell = spells.find(s => s.type === type);

    if (!spell) {
        return { error: failResult(`No ${type.toLowerCase()} spell found.`) };
    }

    return { spell };
}

/**
 * Get wizard color safely
 */
export function getWizardColor(playerStats) {
    return playerStats.wizardColor.toLowerCase();
}

/**
 * Check if spell fails (misfire)
 */
export function checkSpellFailure(spell, wizardColor) {
    const riskMod = spell.riskMod?.[wizardColor] ?? 0;
    return Math.random() < (riskMod / 100);
}