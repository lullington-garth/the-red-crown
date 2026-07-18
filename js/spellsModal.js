// spellsModal.js

import { createSpellCard } from "./spellRenderer.js";
import { setModalContent, openModal, showModalCloseButton, setModalWidth } from "./modal.js";

export function openSpellModal(spell, wizardColor) {
    const fullCard = createSpellCard(spell, wizardColor);

    // Optional: tweak styling if needed
    fullCard.style.marginTop = "30px";

    setModalContent(fullCard);
    setModalWidth("340px");
    showModalCloseButton();
    openModal();
}