// combatButtons.js
import { hasEquippedSpellBook } from "./spellsUI.js";

const BUTTON_HEIGHT = 35;
const BUTTON_WIDTH = 48;

const TYPE_COLORS = {
    attack: "#d7d4d4",
    spell: "#424141",
    potion: "#424141",
    item: "#424141"
};

export function createCombatButton({ label, type = "spell", onClick, disabled = false }) {

    const btn = document.createElement("button");

    if (label.endsWith(".svg")) {

        const img = document.createElement("img");

        img.src = `icons/${label}`;
        img.style.width = "22px";
        img.style.height = "22px";
        img.style.objectFit = "contain";
//        img.style.mixBlendMode = "multiply";

        btn.appendChild(img);

    } else {

        btn.textContent = label;

    }
    btn.className = "combat-btn";

    Object.assign(btn.style, {
        width: `${BUTTON_WIDTH}px`,
        height: `${BUTTON_HEIGHT}px`,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "1px solid #555",
        boxShadow: "0 1px 7px rgba(0,0,0,0.5)",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        fontSize: "14px",
        background: TYPE_COLORS[type] || TYPE_COLORS.spell,
        opacity: disabled ? 0.5 : 1
    });

    btn.disabled = disabled;

    // Only attach handler if enabled
    if (!disabled && typeof onClick === "function") {
        btn.onclick = onClick;
    }

    return btn;
}


// Attack button
export function createAttackButton({ onClick }) {
    return createCombatButton({
        label: "meleeAttackBtn.svg",
        type: "attack",
        onClick
    });
}


// Spell buttons
export function createAttackSpellButton(onClick) {
    return createCombatButton({
        label: "magicAttackBtn.svg",
        type: "spell",
        onClick
    });
}

export function createExplosiveSpellButton(onClick) {
    return createCombatButton({
        label: "explosiveBtn.svg",
        type: "spell",
        onClick
    });
}

export function createSlowBurnSpellButton(onClick) {
    return createCombatButton({
        label: "slowBurnBtn.svg",
        type: "spell",
        onClick
    });
}

export function createDefenceSpellButton(onClick) {
    return createCombatButton({
        label: "defenceBtn.svg",
        type: "spell",
        onClick
    });
}

export function createOtherSpellButton(onClick) {
    return createCombatButton({
        label: "specialBtn.svg",
        type: "spell",
        onClick
    });
}


// Item buttons
export function createItem1Button(onClick) {
    return createCombatButton({
        label: "potionBtn.svg",
        type: "potion",
        onClick
    });
}

export function createItem2Button(onClick) {
    return createCombatButton({
        label: "itemsBtn.svg",
        type: "item",
        onClick
    });
}

export function createEnemyButtonBar({
    enemy,
    enemyIndex,
    cell,
    playerStats,
    handlers
}) {
    const {
        onAttack,
        onSpell,
        onPotion,
        onItem,
    } = handlers;

    const bar = document.createElement("div");
    bar.className = "enemy-button-bar";

    Object.assign(bar.style, {
        display: "grid",
        gridTemplateColumns: "repeat(4, 50px)",
        rowGap: "12px",
        columnGap: "4px",
        marginBottom: "4px",
        alignSelf: "flex-start"
    });

    // ✅ Determine if spells should be enabled
const chaosActive = playerStats.effects?.some(e => e.type === "chaosSpell");

const spellsEnabled =
    hasEquippedSpellBook(playerStats) &&
    handlers.canCastSpells() &&
    !chaosActive;

    // Attack
    bar.appendChild(createAttackButton({
        onClick: () => onAttack(enemy, enemyIndex, cell)
    }));

    // Spells
    const spellTypes = ["spell1", "spell2", "spell3", "spell4", "spell5"];

    spellTypes.forEach(type => {
        const btn = createCombatButton({
            label: getSpellIcon(type),
            type: "spell",
            onClick: () => onSpell(type, enemy, enemyIndex, cell),
            disabled: !spellsEnabled
        });

        bar.appendChild(btn);
    });

    const hasPotions = playerStats.inventory?.carriedItems?.some(
        item => item && item.type === "potion" && item.status !== "broken"
    );

    const hasCombatItems = playerStats.inventory?.carriedItems?.some(
    item =>
        item &&
        item.type === "misc" &&
        item["use-in-combat"] === true &&
        item.status !== "broken"
    );

    // Items
    bar.appendChild(createCombatButton({
        label: "potionBtn.svg",
        type: "potion",
        onClick: () => onPotion(enemy),
        disabled: !hasPotions
    }));

    bar.appendChild(createCombatButton({
        label: "itemsBtn.svg",
        type: "item",
        onClick: () => onItem(enemy),
        disabled: !hasCombatItems
    }));

    return bar;
}

    function getSpellIcon(type) {
        switch (type) {
            case "spell1": return "magicAttackBtn.svg";
            case "spell2": return "explosiveBtn.svg";
            case "spell3": return "slowBurnBtn.svg";
            case "spell4": return "defenceBtn.svg";
            case "spell5": return "specialBtn.svg";
        }
    }