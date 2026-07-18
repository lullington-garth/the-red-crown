export async function loadWizards() {
    const response = await fetch('./data/wizards.json');
    if (!response.ok) {
        throw new Error('Could not load wizards JSON');
    }
    const wizardsData = await response.json();
    return wizardsData;
}