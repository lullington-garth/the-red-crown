// horseCard.js

export function createHorseCard(horse, includeButton = false, onSelect = null, showBonus = false) {

    const card = document.createElement("div");

    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.height = "100%";

    // Image
    const image = document.createElement("img");

    image.src = `images/${horse.id}.jpg`;
    image.alt = horse.name;
    image.style.width = "100%";
//    image.style.height = "300px";
    image.style.objectFit = "block";
    image.style.borderRadius = "6px";
    image.style.marginBottom = "0px";
    image.style.border = "1px solid #555";
//    image.style.opacity = "0.9";
    image.style.mixBlendMode = "multiply";

    card.appendChild(image);


    // Name
    const name = document.createElement("h3");

    name.textContent = horse.name;
    name.style.marginBottom = "0px";
    name.style.marginTop = "3px";
    name.style.fontFamily = '"Book Antiqua", Palatino, serif';

    card.appendChild(name);


    // Capacity
    const capacity = document.createElement("p");

    capacity.textContent = `Capacity: ${horse.capacity} items`;
    capacity.style.marginBottom = "0px";
    capacity.style.marginTop = "5px";
    capacity.style.fontFamily = '"Book Antiqua", Palatino, serif';

    card.appendChild(capacity);


    // Description (optional)
    if (showBonus) {

        const description = document.createElement("p");

        description.textContent = horse.bonus;
        description.style.marginBottom = "10px";     
        description.style.marginTop = "10px";
        description.style.fontFamily = '"Book Antiqua", Palatino, serif';

        card.appendChild(description);

    }


    // Stat modifiers
    if (horse.statModifiers && Object.keys(horse.statModifiers).length > 0) {

        const modifiers = document.createElement("p");

        modifiers.textContent =
            `Stat Modifier: ${
                Object.entries(horse.statModifiers)
                .map(([stat, val]) => `${stat} +${val}`)
                .join(", ")
            }`;

        modifiers.style.fontFamily = '"Book Antiqua", Palatino, serif';     
        modifiers.style.marginTop = "5px";
        modifiers.style.marginBottom = "5px";

        card.appendChild(modifiers);
    }


    // Optional button
    if (includeButton && onSelect) {

        const selectBtn = document.createElement("button");

        selectBtn.textContent = "Select This Horse";
        selectBtn.style.marginTop = "auto";
        selectBtn.style.backgroundColor = "#424141";
        selectBtn.style.color = "#d7d4d4";
        selectBtn.style.border = "1px solid #555";
        selectBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        selectBtn.style.padding = "10px 16px";
        selectBtn.style.fontSize = "16px";
        selectBtn.style.cursor = "pointer";
        selectBtn.style.borderRadius = "6px";

        selectBtn.addEventListener("click", onSelect);

        card.appendChild(selectBtn);
    }


    return card;
}