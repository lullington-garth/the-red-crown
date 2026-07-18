// horseSelection.js
import { createHorseCard } from "./horseCard.js";

export function showHorseSelection(container, playerStats, horses, onSelected) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    container.innerHTML = "";

    const wrapper = document.createElement('div');
    wrapper.style.marginTop = "10px";
    wrapper.style.paddingLeft = "15px";
    wrapper.style.paddingRight = "15px";

    const header = document.createElement('h2');
    header.textContent = "Select Your Horse";
    header.style.textAlign = "center";
    header.style.fontFamily = '"Book Antiqua", Palatino, serif';
    header.style.marginTop = "0px";
    wrapper.appendChild(header);

    const introText = document.createElement("p");
    introText.textContent = "Choose your companion wisely. Each horse has its own strengths, abilities, and limitations. Your choice will affect your journey ahead.";
    introText.style.textAlign = "left";
    introText.style.fontFamily = '"Book Antiqua", Palatino, serif';
    introText.style.fontSize = "16px";
    introText.style.lineHeight = "1.5";
    introText.style.marginBottom = "20px";

    wrapper.appendChild(introText);

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    grid.style.columnGap = "12px";
    grid.style.rowGap = "12px";

    wrapper.appendChild(grid);

horses.forEach(horse => {

    const card = createHorseCard(
        horse,
        true,
        () => {

            // ---- Apply Stat Modifiers (with tracking for reversal) ----

            playerStats.horseEffects = {
                statModifiers: {},
                capacity: horse.capacity,
                horseId: horse.id
            };

            if (horse.statModifiers) {

                Object.keys(horse.statModifiers).forEach(rawStat => {

                    const amount = horse.statModifiers[rawStat];

                    const isBase = rawStat.endsWith(" (B)");
                    const isMinimum = rawStat.endsWith(" (M)");

                    const stat = rawStat.replace(/\s+\([BM]\)$/, "");

                    if (!playerStats.stats.hasOwnProperty(stat)) return;

                    const statObj = playerStats.stats[stat];

                    playerStats.horseEffects.statModifiers[stat] =
                        (playerStats.horseEffects.statModifiers[stat] || 0) + amount;


                    if (stat === "SKILL") {
                        statObj.max += amount;
                        statObj.current += amount;
                        return;
                    }


                    if (isBase) {
                        statObj.max += amount;
                        statObj.current += amount;
                        return;
                    }


                    if (isMinimum) {

                        statObj.min += amount;

                        if (statObj.current < statObj.min) {
                            statObj.current = statObj.min;
                        }

                        return;
                    }


                    statObj.current += amount;

                    if (statObj.current > statObj.max) {
                        statObj.current = statObj.max;
                    }

                });
            }


            // ---- Apply capacity ----

            playerStats.inventory.horseCapacity = horse.capacity;


            // ---- Save horse ----

            playerStats.horse = horse;


            // Continue game

            if (onSelected) onSelected(playerStats);

        },
    true
    );


    grid.appendChild(card);

});

// Description text under the horse grid

const description = document.createElement("p");
description.textContent = `A bond of old magic links your backpack to the saddle bags of your trusted companion. While your horse remains nearby, anything it carries is as accessible as the items upon your own back. There is no need to bring your horse into shops, taverns, or places where it cannot follow.`;
description.style.textAlign = "left";
description.style.marginTop = "20px";
description.style.fontFamily = '"Book Antiqua", Palatino, serif';
description.style.fontSize = "16px";
description.style.lineHeight = "1.5";

wrapper.appendChild(description);

const description1 = document.createElement("p");
description1.textContent = `Your horse also bears a limited teleportation charm, allowing it to cross short stretches of impassable terrain and meet you safely on the other side.`;
description1.style.textAlign = "left";
description1.style.marginTop = "20px";
description1.style.fontFamily = '"Book Antiqua", Palatino, serif';
description1.style.fontSize = "16px";
description1.style.lineHeight = "1.5";

wrapper.appendChild(description1);

const description2 = document.createElement("p");
description2.textContent = `Your horse is a true companion, bound to you by trust and magic, and will remain by your side unless some great power should ever break that bond.`;
description2.style.textAlign = "left";
description2.style.marginTop = "20px";
description2.style.fontFamily = '"Book Antiqua", Palatino, serif';
description2.style.fontSize = "16px";
description2.style.lineHeight = "1.5";

wrapper.appendChild(description2);

container.appendChild(wrapper);
}