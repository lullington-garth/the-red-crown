// spellRenderer.js
const elementIconMap = {
    earth: "icons/earth.jpg",
    water: "icons/water.jpg",
    air: "icons/air.jpg",
    fire: "icons/fire.jpg"
};

const typeIconMap = {
    attack: "icons/magicAttack.svg",
    explosive: "icons/explosive.svg",
    "slow burn": "icons/slowBurn.svg",
    defence: "icons/defence.svg",
    other: "icons/special.svg"
};

const spellTypeDescriptionMap = {
    attack: "Fast casting spell, applies damage immediately",
    defence: "Medium casting time, protective spell, immediate effects",
    "slow burn": "Slow cast time, low damage, but burns for many rounds",
    explosive: "Fast casting, high damage, effects are immediate",
    other: "Casting speed, risk, effects and duration vary"
};

function createIcon(src, size = 18) {
    const img = document.createElement("img");
    img.src = src;
    img.width = size;
    img.height = size;
    img.style.verticalAlign = "middle";
    img.style.objectFit = "contain";
    img.style.mixBlendMode = "multiply";
    return img;
}

function applyElementStyling(card, element, options = {}) {
    const {
        borderWidth = 2,
        glowSize = 12,
        glowSpread = 3
    } = options;

    const elementKey = (element || "").toLowerCase();

    const elementColorMap = {
        earth: "#8c8d90",
        water: "#8c8d90",
        air: "#8c8d90",
        fire: "#8c8d90"
    };

    const color = elementColorMap[elementKey] || "#8c8d90";

    // Border
    card.style.border = `${borderWidth}px solid ${color}`;

    // Glow
    card.style.boxShadow = `0 0 ${glowSize}px ${glowSpread}px ${color}55`;
}

export function createSpellCard(spell, wizardColor, options = {}) {
    const {
        attackDelta = 0,
        durationDelta = 0,
        aoeDelta = 0,
        isComparison = false
    } = options;

    const colorKey = wizardColor.toLowerCase();

    const card = document.createElement('div');
    card.style.borderRadius = "20px";
    card.style.padding = "8px";
    card.style.marginBottom = "6px";
    card.style.backgroundImage = "url('./images/paper1.jpg')";
    card.style.height = "380px";
    card.style.position = "relative";

    // ----- Border color based on element -----
    applyElementStyling(card, spell.element, {
        borderWidth: 2,
        glowSize: 12,
        glowSpread: 3
    });

    const typeIcon = createIcon(
        typeIconMap[(spell.type || "").toLowerCase()] || "icons/magicAttack.jpg",
        40
    );

    typeIcon.style.position = "absolute";
    typeIcon.style.top = "6px";
    typeIcon.style.right = "8px";
    typeIcon.style.mixBlendMode = "multiply";

    card.appendChild(typeIcon);

    // ----- Spell title with element emoji -----
    const titleContainer = document.createElement('div');
    titleContainer.style.display = "flex";
    titleContainer.style.flexDirection = "column";
    titleContainer.style.marginBottom = "4px";

    const title = document.createElement("strong");

    const elementIcon = createIcon(
        elementIconMap[(spell.element || "").toLowerCase()] || "icons/earth.jpg",
        35
    );
    elementIcon.style.mixBlendMode = "multiply";

    title.appendChild(elementIcon);
    title.append(" " + spell.name);

    titleContainer.appendChild(title);

    const typeText = document.createElement('span');
    typeText.textContent = `(${spell.type})`;
    typeText.style.fontSize = "0.8em";
    typeText.style.color = "#555";
    typeText.style.fontStyle = "italic";
    typeText.style.marginLeft = "2em";
//    titleContainer.appendChild(typeText);

    card.appendChild(titleContainer);

    // ----- Description -----
    const desc = document.createElement('p');
    desc.style.marginTop = "4px";
    desc.textContent = spell.description;
    card.appendChild(desc);

    // ----- Compute stats safely -----
    const attack = spell.attack?.[colorKey] ?? 0;
    const duration = spell.duration?.[colorKey] ?? 0;
    const aoeValue = spell.risk?.stat === "ROLL"
        ? "1d6"
        : spell.areaOfEffect?.[colorKey] ?? 0;
    const riskPercent = spell.riskMod?.[colorKey] ?? 0;

    let statModText = "None";
    if (spell.statMod && Object.keys(spell.statMod).length > 0) {
        statModText = Object.entries(spell.statMod)
            .map(([stat, value]) => `${stat} ${value > 0 ? "+" : ""}${value}`)
            .join(", ");
    }

    let enemyModText = "None";
    if (spell.enemyMod && Object.keys(spell.enemyMod).length > 0) {
        if (spell.enemyMod.stat && typeof spell.enemyMod.amount === "number") {
            enemyModText = `${spell.enemyMod.stat} ${spell.enemyMod.amount > 0 ? "+" : ""}${spell.enemyMod.amount}`;
        } else {
            enemyModText = Object.entries(spell.enemyMod)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ");
        }
    }

    // ----- Helper for comparison display -----
    function buildStatDisplay(value, delta) {
        if (!isComparison) return value;
        if (delta > 0) return `${value} <span style="color:black;">⇧</span>`;
        if (delta < 0) return `${value} <span style="color:black;">⇩</span>`;
        if (delta === 0) return `${value} <span style="color:black;">⇦</span>`;
        return value;
    }

    const stats = document.createElement('p');
    stats.style.fontSize = "0.85em";
    stats.style.color = "#000000";

    stats.innerHTML = `
    <div><img src="icons/meleeAttack.jpg"
     width="16"
     style="mix-blend-mode: multiply;"> <em>Attack:</em> ${buildStatDisplay(attack, attackDelta)}</div>

    <div><img src="icons/duration.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> <em>Duration:</em> ${buildStatDisplay(duration, durationDelta)}</div>

    <div><img src="icons/aoe.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> <em>AoE:</em> ${buildStatDisplay(aoeValue, aoeDelta)}</div>

    <div><img src="icons/statMod.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> <em>Stat Mod:</em> ${statModText}</div>

    <div><img src="icons/enemyMod.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> <em>Enemy Mod:</em> ${enemyModText}</div>

    <div>
    <img src="icons/risk.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> 
    ${riskPercent}% Risk: ${spell.risk?.description ?? ""}
    </div>
    `;

    card.appendChild(stats);

    // ----- Spell casting information -----
    const castingInfo = document.createElement("div");
    castingInfo.style.fontSize = "1em";
    castingInfo.style.fontStyle = "italic";
    castingInfo.style.marginTop = "8px";
    castingInfo.style.paddingTop = "4px";
    castingInfo.style.borderTop = "1px solid #999";
    castingInfo.style.color = "#000000";

    const typeKey = (spell.type || "other").toLowerCase();

    castingInfo.textContent =
        spellTypeDescriptionMap[typeKey] || spellTypeDescriptionMap.other;

    card.appendChild(castingInfo);

    return card;
}

// spellRenderer.js

export function createCombatSpellCard(spell, wizardColor) {
    const card = document.createElement('div');
    card.style.borderRadius = "12px";
    card.style.padding = "4px";
    card.style.marginBottom = "4px";
    card.style.backgroundImage = "url('./images/paper1.jpg')";
    card.style.border = "1px solid #444";
    card.style.cursor = "pointer";
    card.style.width = "100%";
    card.style.position = "relative";

    const colorKey = wizardColor.toLowerCase();

    const elementKey = (spell.element || "").toLowerCase();
    const typeKey = (spell.type || "").toLowerCase();

    const title = document.createElement("strong");

    const attackIcon = createIcon(
        typeIconMap[typeKey] || "icons/magicAttack.jpg",
        18
    );

    title.appendChild(attackIcon);
    title.append(" " + spell.name);
    title.style.display = "block";
    title.style.fontSize = "0.9em";
    card.appendChild(title);

    // ----- Stats -----
    const stats = document.createElement("div");
    stats.style.fontSize = "0.8em";
    stats.style.marginTop = "4px";

    // Build stat line
    const attack = spell.attack?.[colorKey] ?? 0;
    const duration = spell.duration?.[colorKey] ?? 0;
    const aoe = spell.areaOfEffect?.[colorKey] ?? 0;
    const risk = spell.riskMod?.[colorKey] ?? 0;

    stats.innerHTML = `

    <img src="icons/meleeAttack.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> 
    ${attack}

    &nbsp;|&nbsp;

    <img src="icons/duration.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> 
    ${duration}

    &nbsp;|&nbsp;

    <img src="icons/aoe.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> 
    ${aoe}

    &nbsp;|&nbsp;

    <img src="icons/risk.jpg"     
     width="16"
     style="mix-blend-mode: multiply;"> 
    ${risk}
    `;

    // ----- Border color based on element -----
    applyElementStyling(card, spell.element, {
        borderWidth: 2,
        glowSize: 8,
        glowSpread: 2
    });

    card.appendChild(stats);
    return card;
}