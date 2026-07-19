// mapUI.js
import { resolveVariable } from "./variableResolver.js";
import { resolveStatName } from "./statChecks.js"; 
import { getEnemyDisplayLines, getEnemyNames } from "./mapReadyCombat.js";
import { runSpecial } from "./runSpecial.js";
import { chooseContractTimed, sacrificeItem } from "./events.js";

export class MapUI {
    constructor(gameDiv, { renderButtons, playerStats, enemies, enchantments, startNewGame }) {
        this.gameDiv = gameDiv;
        this.renderButtons = renderButtons;
        this.playerStats = playerStats;
        this.enemies = enemies;
        this.enchantments = enchantments;
        this.startNewGame = startNewGame;
    }

renderNode(node, handlers) {
    const flags = handlers.flags || {};
    const combatDone = flags[`combat_${node.id}`];    
//console.log("🧾 playerStats snapshot in mapUI:", this.playerStats);
    this.gameDiv.innerHTML = "";

    // ----------------------------
    // Top bar (sticky container)
    // ----------------------------
    const topBar = document.createElement("div");
    topBar.classList.add("top-bar");

    const ui = this.renderButtons();
    if (ui) topBar.appendChild(ui);

    this.gameDiv.appendChild(topBar);

    // ----------------------------
    // Scrollable content container
    // ----------------------------
    const content = document.createElement("div");
    content.classList.add("map-content");

    // ----------------------------
    // Node text
    // ----------------------------
    const textDiv = document.createElement("div");
    textDiv.style.whiteSpace = "pre-line";
    textDiv.style.margin = "30px";

    let parsedText = this.playerStats?.debugMode
        ? `id: ${node.id}\n\n${node.text}`
        : node.text;

    let extraContext = {};

//console.log("🧪 UI enemies:", this.enemies);
    if (node.combat?.length && !combatDone) {
        const enemyNames = getEnemyNames(node.combat, this.enemies);
        function formatEnemyList(names) {
            if (names.length <= 1) return names[0] || "";
            if (names.length === 2) return names.join(" and ");
            return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
        }
    }

    parsedText = parsedText.replace(/\{enemies\}\s*/g, "");
    parsedText = this.formatText(parsedText, extraContext);

    parsedText = parsedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    textDiv.innerHTML = parsedText;
    textDiv.style.fontFamily = "'Book Antiqua', Palatino, serif";
    textDiv.style.fontSize = "20px";
    textDiv.style.textAlign = "justify";

    content.appendChild(textDiv);

    // ----------------------------
    // Shared Action Button Row
    // ----------------------------
    const actionRow = document.createElement("div");

    actionRow.style.display = "flex";
    actionRow.style.flexWrap = "wrap";
    actionRow.style.justifyContent = "center";
    actionRow.style.alignItems = "center";
    actionRow.style.gap = "12px";
    actionRow.style.margin = "30px";


    // ----------------------------
    // SPECIAL ACTIONS
    // ----------------------------
    if (node.special?.function?.length) {
        const specialWrap = document.createElement("div");
        specialWrap.style.display = "flex";
        specialWrap.style.gap = "10px";
        specialWrap.style.margin = "0";

            node.special.function.forEach(fnName => {
                if (handlers.flags?.[`special_${fnName}_${node.id}`]) return;
                const btn = document.createElement("button");
                btn.style.backgroundColor = "#424141";
                btn.style.color = "#d7d4d4";
                btn.style.border = "1px solid #555";
                btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
                btn.style.transition = "0.2s ease";               
                const labelMap = {
                    shrine: "Pray at the Shrine",
                    curio: "Flip the Curio",
                    brewPotion: "Brew Potion",
                    blacksmithDice: "Play Dice Game",
                    curseRemoval: "Remove Curse",
                    shredder: "Spell Shredder",
                    enchantItem: "Enchant an Item",
                    diceGame: "Join the Game",
                    environment1Red: "Reach for the Treasure",
                    graffleCluck: "Play the Graffle Cluck Game"
                };

                btn.textContent = `${labelMap[fnName] || fnName}`;
                btn.style.padding = "10px 16px";
                btn.style.fontSize = "20px";
                btn.style.cursor = "pointer";
                btn.style.borderRadius = "6px";
                btn.style.border = "1px solid rgba(122, 122, 122, 0.95)";

                btn.addEventListener("click", () => {

                    btn.disabled = true;
                    btn.style.opacity = "0.6";

                    runSpecial(fnName, {
                        playerStats: this.playerStats,
                        node: node,
                        engine: handlers.engine,
                        ui: this,
                        refreshNode: handlers.refreshNode,
                        enchantments: this.enchantments
                    });

                });
            specialWrap.appendChild(btn);
        });

        actionRow.appendChild(specialWrap);
    }

    // ----------------------------
    // Node Images (Top + Bottom)
    // ----------------------------
    const topImages = [];
    const middleImages = [];
    const bottomImages = [];
  
    if (node.images?.length) {

        node.images.forEach(img => {

            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.justifyContent = "center";
            wrapper.style.margin = "20px";

            const image = document.createElement("img");

            image.src = `./mapImages/${img.name}`;
            image.style.backgroundImage = "url('./images/paper.jpg')";
            image.style.maxWidth = "80%";
            image.style.height = "auto";
            image.style.display = "block";
            image.style.borderRadius = "10px";
            image.style.mixBlendMode = "multiply";


            if (img.shadow) {
                image.style.boxShadow = "0 0 12px rgba(0,0,0,0.9)";
            }            

            wrapper.appendChild(image);

            const place = img.place || "middle";

            if (place === "top") {
                topImages.push(wrapper);
            } else if (place === "middle") {
                middleImages.push(wrapper);
            } else if (place === "bottom") {
                bottomImages.push(wrapper);
            }
        });
    }

    // insert TOP images (above text)
    topImages.forEach(w => content.insertBefore(w, textDiv));  
    middleImages.forEach(w => content.appendChild(w));
    
    // ----------------------------
    // Enemy Table
    // ----------------------------
    if (node.combat?.length) {
        const enemies = getEnemyDisplayLines(node.combat, this.enemies);

        const table = document.createElement("div");
        table.style.width = "90%";
        table.style.margin = "10px auto";
        table.style.display = "grid";
        table.style.gridTemplateColumns = "1fr 80px 100px 100px 100px";
        table.style.gap = "6px 10px";

        // Header
        const hName = document.createElement("div");
        hName.textContent = "";

        const hSkill = document.createElement("div");
        hSkill.textContent = "SKILL";
        hSkill.style.fontWeight = "bold";
        hSkill.style.textAlign = "center";

        const hStamina = document.createElement("div");
        hStamina.textContent = "STAMINA";
        hStamina.style.fontWeight = "bold";
        hStamina.style.textAlign = "center";

        const hAttack = document.createElement("div");
        hAttack.textContent = "ATTACK";
        hAttack.style.fontWeight = "bold";
        hAttack.style.textAlign = "center";

        const hMagic = document.createElement("div");
        hMagic.textContent = "MAGIC";
        hMagic.style.fontWeight = "bold";
        hMagic.style.textAlign = "center";

        table.appendChild(hName);
        table.appendChild(hSkill);
        table.appendChild(hStamina);
        table.appendChild(hAttack);
        table.appendChild(hMagic);

        // Rows
        enemies.forEach(e => {
            const name = document.createElement("div");
            name.textContent = e.name;

            const skill = document.createElement("div");
            skill.textContent = e.skill;
            skill.style.textAlign = "center";

            const stamina = document.createElement("div");
            stamina.textContent = e.stamina;
            stamina.style.textAlign = "center";

            const attack = document.createElement("div");
            attack.textContent = e.attack;
            attack.style.textAlign = "center";

            const magic = document.createElement("div");
            magic.textContent = e.magic;
            magic.style.textAlign = "center";
            
            table.appendChild(name);
            table.appendChild(skill);
            table.appendChild(stamina);
            table.appendChild(attack);
            table.appendChild(magic);
        });

        content.appendChild(table);
    }

    const choicesDiv = document.createElement("div");
    // ----------------------------
    // Stat Check Button
    // ----------------------------
    if (handlers.statCheck?.length) {

        const check = handlers.statCheck[0];

        const resolvedStat = resolveStatName(check.stat, this.playerStats);
        let statLabel = resolvedStat || check.stat || "stat";

        if (statLabel === "STAMINA") {
            statLabel = "INNER STRENGTH";
        }

        const properStatLabel = statLabel
            .toLowerCase()
            .replace(/\b\w/g, letter => letter.toUpperCase());        

        const btnWrap = document.createElement("div");
        btnWrap.style.margin = "0";

        const btn = document.createElement("button");
        btn.textContent = `🎲 Test your ${properStatLabel}`;
        btn.style.padding = "10px 16px";
        btn.style.fontSize = "20px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        btn.addEventListener("click", () => {
            handlers.onStatCheck(() => {
                choicesDiv.style.display = "flex";
                btnWrap.remove();
            });
        });
       
    btnWrap.appendChild(btn);
    actionRow.appendChild(btnWrap);
    }

    // ----------------------------
    // Combat Button
    // ----------------------------
    if (node.combat?.length && !combatDone) {

        const combatWrap = document.createElement("div");
        combatWrap.style.margin = "0";

        const btn = document.createElement("button");
        btn.textContent = "Start Combat";
        btn.style.padding = "10px 16px";
        btn.style.fontSize = "20px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        btn.addEventListener("click", () => {
            if (handlers.onCombat) {
                handlers.onCombat(node.combat);
            }
        });

        combatWrap.appendChild(btn);
        actionRow.appendChild(combatWrap);
    }    

    // ----------------------------
    // Pickup Select Button
    // ----------------------------
    if (handlers.pickupSelect?.length && !handlers.pickupSelectDone) {

        const pickupWrap = document.createElement("div");
        pickupWrap.style.margin = "0";

        const btn = document.createElement("button");
        btn.textContent = "Choose Item";
        btn.style.padding = "10px 16px";
        btn.style.fontSize = "20px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        btn.addEventListener("click", () => {

            if (handlers.onPickupSelect) {
                handlers.onPickupSelect();
            }
        });

        pickupWrap.appendChild(btn);
        actionRow.appendChild(pickupWrap);
    }

    // ----------------------------
    // Pickup Some Button
    // ----------------------------
    if (handlers.pickupSome?.length && !handlers.pickupSomeDone) {

        const pickupWrap = document.createElement("div");
        pickupWrap.style.margin = "0";

        const btn = document.createElement("button");
        btn.textContent = "Search Items";
        btn.style.padding = "10px 16px";
        btn.style.fontSize = "20px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        btn.addEventListener("click", () => {

            if (handlers.onPickupSome) {
                handlers.onPickupSome();
            }
        });

        pickupWrap.appendChild(btn);
        actionRow.appendChild(pickupWrap);
    }

// ----------------------------
// Swap Item Button
// ----------------------------
if (handlers.swapItem?.length && !handlers.swapItemDone) {

    const swapWrap = document.createElement("div");
    swapWrap.style.margin = "0";

    const btn = document.createElement("button");

    btn.textContent = "Trade Item";

    btn.style.padding = "10px 16px";
    btn.style.fontSize = "20px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";
    btn.style.backgroundColor = "#424141";
    btn.style.color = "#d7d4d4";
    btn.style.border = "1px solid #555";
    btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    btn.addEventListener("click", () => {

        if (handlers.onSwapItem) {
            handlers.onSwapItem();
        }
    });

    swapWrap.appendChild(btn);
    actionRow.appendChild(swapWrap);
}

    // ----------------------------
    // Forced Game Button
    // ----------------------------
    if (handlers.eventForced) {

        const gameWrap = document.createElement("div");
        gameWrap.style.margin = "0";

        const btn = document.createElement("button");

        const labelMap = {
            startDaggerGame: "Play Dagger Game",
            wrongChamberChoice: "Roll Dice",
            handOfDespair: "Press to Start Resisting",
            chooseContractRandom: "Roll to Select a Contract",
            chooseContractTimed: "Select a Contract",
            loseHorse: "Select Items to Discard",
            sacrificeItem: "Select Item to Sacrifice",
            wormNumber: "Roll one Dice"          
        };

        btn.textContent =
            labelMap[handlers.eventForced.function]
            || "Press to Start";

        btn.style.padding = "10px 16px";
        btn.style.fontSize = "20px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        btn.addEventListener("click", async () => {

            btn.disabled = true;
            btn.style.opacity = "0.6";

            if (handlers.oneventForced) {
                await handlers.oneventForced();
            }
        });

        gameWrap.appendChild(btn);
        actionRow.appendChild(gameWrap);
    }

    // ----------------------------
    // Shop Button
    // ----------------------------
    if (handlers.shop?.length) {

        const shopWrap = document.createElement("div");
        shopWrap.style.display = "flex";
        shopWrap.style.margin = "0";
        shopWrap.style.justifyContent = "center";
        shopWrap.style.alignItems = "center";

        const btn = document.createElement("button");
        btn.textContent = "View Seller's Wares";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.transition = "0.2s ease";
        btn.style.padding = "10px 16px";
        btn.style.fontSize = "20px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";

        btn.addEventListener("click", () => {
            if (handlers.onShop) {
                handlers.onShop();
            }
        });

        shopWrap.appendChild(btn);
        actionRow.appendChild(shopWrap);
    }

    // ----------------------------
    // End Quest Button
    // ----------------------------
    if (handlers.endQuest) {

        const endWrap = document.createElement("div");
        endWrap.style.margin = "30px";
        endWrap.style.display = "flex";
        endWrap.style.justifyContent = "center";

        const btn = document.createElement("button");
        btn.textContent = "Start New Game";
        btn.style.padding = "10px 16px";
        btn.style.fontSize = "20px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        // does nothing for now (as requested)
        btn.addEventListener("click", () => {
            if (this.startNewGame) {
                this.startNewGame();
            }
        });

        endWrap.appendChild(btn);
        content.appendChild(endWrap);
    }
    
    // ----------------------------
    // Choices
    // ----------------------------

    const hasStatCheck = handlers.statCheck?.length;
    const hasCombat = node.combat?.length && !combatDone;
    const hasPickupSelect =
        handlers.pickupSelect?.length && !handlers.pickupSelectDone;

    const hasPickupSome =
        handlers.pickupSome?.length && !handlers.pickupSomeDone;

const hasSwapItem =
    handlers.swapItem?.length && !handlers.swapItemDone;

const hasForcedGame =
    handlers.eventForced;    

const blockChoices =
    hasStatCheck ||
    hasCombat ||
    hasPickupSelect ||
    hasPickupSome ||
    hasSwapItem ||
    hasForcedGame ||
    handlers.endQuest;

    choicesDiv.style.display = blockChoices ? "none" : "flex";
    choicesDiv.style.flexDirection = "column";
    choicesDiv.style.gap = "8px";
    choicesDiv.style.margin = "10px 30px 30px 30px";

    node.choices.forEach(choice => {
        if (choice.hidden) return;
        const line = document.createElement("div");
        line.style.display = "inline-flex";
        line.style.alignItems = "center";
        line.style.userSelect = "none";
        line.style.gap = "6px";

        if (choice.disabled) {
            line.style.opacity = "0.4";
            line.style.cursor = "not-allowed";
        }
        else {
            line.style.cursor = "pointer";
        }

        // option text
        const text = document.createElement("span");
        text.textContent = this.formatText(
            handlers.resolveText(choice, this.playerStats)
        ) || "Continue";

        if (choice.disabled) {
            text.style.opacity = "0.6";
        }        

        // arrow button
        const btn = document.createElement("button");
        btn.style.background = "transparent";
        btn.style.border = "none";
        btn.style.padding = "0";
        btn.style.cursor = "pointer";
        btn.style.display = "flex";
        btn.style.alignItems = "center";

        const img = document.createElement("img");
        img.src = "./images/arrowBtn.svg";
        img.alt = "go";
        img.style.width = "25px";
        img.style.height = "25px";
        img.style.borderRadius = "50%";
        img.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";

        btn.appendChild(img);

        const select = () => {
            if (choice.disabled) return;
            handlers.onChoice(choice);
        };

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (choice.disabled) return;
            select();
        });

        line.addEventListener("click", select);

        // arrow first
        line.appendChild(btn);

        // debug label second
        if (this.playerStats?.debugMode) {
            const toLabel = document.createElement("span");
            toLabel.textContent = `→ ${choice.to}`;
            toLabel.style.color = "#615e5e";

            line.appendChild(toLabel);
        }

        // choice text last
        line.appendChild(text);

        choicesDiv.appendChild(line);

    });

    // Only add action row if it contains buttons
    if (actionRow.children.length > 0) {
        content.appendChild(actionRow);
    }

    // ----------------------------
    // PROMPT (NEW)
    // ----------------------------
    if (node.prompt) {
        const promptDiv = document.createElement("div");
        promptDiv.textContent = node.prompt;
//        promptDiv.style.margin = "10px 30px 0px 30px";
        promptDiv.style.opacity = "0.9";
        promptDiv.style.marginBottom = "25px";
        promptDiv.style.marginLeft = "30px";

        content.appendChild(promptDiv);
    }

    content.appendChild(choicesDiv);

    bottomImages.forEach(w => content.appendChild(w));
    this.gameDiv.appendChild(content);
}

formatText(str, extraContext = {}) {
    return str.replace(/\{([a-zA-Z0-9_.]+)\}/g, (_, path) => {
        const context = {
            playerStats: this.playerStats,
            ...extraContext
        };

        let value = path
            .split('.')
            .reduce((obj, key) => obj?.[key], context);

        if (value == null) {
            value = resolveVariable(path, this.playerStats);
        }

        return value != null ? value : `{${path}}`;
    });
}

renderDeathNode({ text, deathMessage, onRestart }) {
    this.gameDiv.innerHTML = "";

    // ----------------------------
    // Top bar
    // ----------------------------
    const topBar = document.createElement("div");
    topBar.classList.add("top-bar");

    const ui = this.renderButtons();
    if (ui) topBar.appendChild(ui);

    this.gameDiv.appendChild(topBar);

    // ----------------------------
    // Content container
    // ----------------------------
    const content = document.createElement("div");
    content.classList.add("map-content");

    // ----------------------------
    // Main text (node body)
    // ----------------------------
    const textDiv = document.createElement("div");
    textDiv.style.whiteSpace = "pre-line";
    textDiv.style.margin = "30px";
    textDiv.style.textAlign = "justify";

    textDiv.textContent = this.formatText(text);

    content.appendChild(textDiv);

    // ----------------------------
    // Death message
    // ----------------------------
    const deathDiv = document.createElement("div");
    deathDiv.textContent = this.formatText(deathMessage);
    deathDiv.style.whiteSpace = "pre-line"; 
    deathDiv.style.margin = "30px";
    deathDiv.style.textAlign = "justify";

    content.appendChild(deathDiv);

    // ----------------------------
    // Restart button
    // ----------------------------
    const buttonWrap = document.createElement("div");
    buttonWrap.style.display = "flex";
    buttonWrap.style.justifyContent = "center";
    buttonWrap.style.margin = "30px";

    const btn = document.createElement("button");
    btn.textContent = "Your Quest is Over";
    btn.style.padding = "10px 16px";
    btn.style.fontSize = "20px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";
    btn.style.border = "1px solid rgba(122, 122, 122, 0.95)";

    btn.addEventListener("click", onRestart);

    buttonWrap.appendChild(btn);
    content.appendChild(buttonWrap);

    this.gameDiv.appendChild(content);
}
}