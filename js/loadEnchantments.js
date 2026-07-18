// loadEnchantments.js
export async function loadEnchantments() {
    const response = await fetch('./data/enchantments.json');

    if (!response.ok) {
        throw new Error('Could not load enchantments JSON');
    }

    const enchantmentsData = await response.json();

    return enchantmentsData;
}