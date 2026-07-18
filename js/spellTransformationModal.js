// spellTransformationModal.js

import { setModalContent, setModalWidth, openModal, closeModal } from "./modal.js";
import { runMagicRevealEffect } from "./magicRevealEffect.js";

export function createSpellTransformationModal({
    oldScroll,
    newScroll,
    onComplete
}) {

    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.overflow = "hidden";
    container.style.wordBreak = "break-word";
    container.style.overflowWrap = "anywhere";
    container.style.flexDirection = "column";
    container.style.height = "350px";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.padding = "30px";
    container.style.textAlign = "center";
    container.style.minHeight = "260px";
    container.style.gap = "18px";

    const title = document.createElement("h2");
    title.textContent = "Spell Transmutation";

    const spellImage = document.createElement("img");

    spellImage.style.width = "96px";
    spellImage.style.height = "96px";
    spellImage.style.objectFit = "contain";
    spellImage.style.transition = "filter 0.2s ease";
    spellImage.style.mixBlendMode = "multiply";

    spellImage.src = `images/scrollOpen.jpg`;

    const text = document.createElement("div");

    text.style.fontSize = "1.3rem";
    text.style.fontWeight = "bold";
    text.style.minHeight = "40px";
    text.style.letterSpacing = "2px";
    text.style.color = "#000000";

    const message = document.createElement("div");

    message.style.opacity = "0";
    message.style.transition = "opacity 0.4s ease";
    message.innerHTML = `
        Your new spell is ready for use.
    `;

    const closeBtn = document.createElement("button");

    closeBtn.textContent = "Close";

    closeBtn.style.padding = "10px 20px";
    closeBtn.style.borderRadius = "8px";
    closeBtn.style.backgroundColor = "#424141";
    closeBtn.style.color = "#d7d4d4";
    closeBtn.style.border = "1px solid #555";
    closeBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.opacity = "0";
    closeBtn.style.transition = "opacity 0.4s ease";

    container.appendChild(spellImage);
    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(message);
    container.appendChild(closeBtn);

    setModalWidth("420px");
    setModalContent(container);
    openModal();

    const oldName =
        oldScroll.name ||
        oldScroll.item ||
        "Unknown Spell";

    const newName =
        newScroll.name ||
        newScroll.item ||
        "Unknown Spell";
    setTimeout(() => {
    runMagicRevealEffect({
        textElement: text,
        imageElement: spellImage,
        oldText: oldName,
        finalText: newName,
        finalImage: "images/scrollOpen.jpg",
        baseColor: "#000000",

        onComplete: () => {

            message.style.opacity = "1";
            closeBtn.style.opacity = "1";
        }
    });
    }, 150);
    closeBtn.addEventListener("click", () => {

        closeModal();

        if (onComplete) {
            onComplete();
        }
    });
}