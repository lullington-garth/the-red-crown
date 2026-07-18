// mapEngine.js
import { tryAddItems } from "./calculateCapacity.js";
import { parseChoices } from "./parseChoices.js";
import { parseEffects } from "./parseEffects.js";
import { parsePickups } from "./parsePickups.js";
import { parseDeathMessage } from "./parseDeathMessage.js";
import { applyForcedPickups, applySelectPickups, applySomePickups, applyPayPickups } from "./mapApplyPickups.js";
import { applyEffects } from "./mapApplyEffects.js";
import { parseStatCheck } from "./parseStatCheck.js";
import { handleStatCheck } from "./mapStatChecks.js";
import { parseCombat } from "./parseCombat.js";
import { startNodeCombat } from "./mapReadyCombat.js";
import { resolveVariable } from "./variableResolver.js";
import { addGold, removeGold } from "./gold.js";
import { handleShop } from "./handleShop.js";
import { parseImages } from "./parseImages.js";
import { parseGold } from "./parseGold.js";
import { parseBreakItem } from "./parseBreakItem.js";
import { breakCarriedItem, breakWornItem } from "./breakItem.js";
import { parseShop } from "./parseShop.js";
import { parseSpecial } from "./parseSpecials.js";
import { parseLoseItem } from "./parserLoseItem.js";
import { parseUseItem } from "./parseUseItem.js";
import { loseItem } from "./loseItem.js";
import { applyUseItems } from "./mapApplyUseItem.js";
import { resolveCombatVariable } from "./combatVariableResolver.js";
import { applyTension } from "./tension.js";
import { parsePrompt } from "./parsePrompt.js";
import { parseSetFlags } from "./parseSetFlags.js";
import { resolveFlag } from "./resolveFlag.js";
import { parseSwap } from "./parseSwap.js";
import { openTradeItemsModal } from "./tradeItemsModal.js";
import { parseRunFunction } from "./parseRunFunction.js";
import { handlePickupEffects } from "./pickupEffects.js";
import { filterChoices } from "./filterChoices.js";
import { handleSwapItem } from "./handleSwapItem.js";
import { parseEventForced } from "./parseEventForced.js";
import { startDaggerGame } from "./games.js";
import { wrongChamberChoice, handOfDespair, chooseContractRandom, chooseContractTimed, loseHorse, wormNumber, sacrificeItem } from "./events.js";

export class MapEngine {
    constructor({ nodeIndex, nodesBasePath = "./nodes", ui, playerStats, startNewGame, startGroupCombat, enemies, items }) {
        this.nodeIndex = nodeIndex;
        this.nodesBasePath = nodesBasePath;
        this.ui = ui;
        this.playerStats = playerStats;
        this.startNewGame = startNewGame;
        this.startGroupCombat = startGroupCombat;
        this.enemies = enemies;
        this.items = items;
//console.log("🧾 playerStats snapshot in mapEngine constuctor:", this.playerStats);
        this.state = {
            currentNode: null,
            history: [],
            flags: {},
            inventory: [],
            visitedNodes: {},
            shopState: {}
        };

        this.cache = {};
    }

    // ----------------------------
    // LOAD NODE
    // ----------------------------
    async loadNode(nodeId) {
        if (this.cache[nodeId]) {
            return this.cache[nodeId];
        }

        const relativePath = this.nodeIndex[nodeId];

        if (!relativePath) {
            throw new Error(`Node not found: ${nodeId}`);
        }

        const url = `${this.nodesBasePath}/${relativePath}`;
        const res = await fetch(url);
        const md = await res.text();

        const node = this.parseNode(md);

        this.cache[nodeId] = node;

        return node;

    }

    // ----------------------------
    // FRONTMATTER EXTRACTION
    // ----------------------------
    extractFrontmatter(md) {
        const match = md.match(/---([\s\S]*?)---/);

        if (!match) {
            return { yaml: null, body: md.trim() };
        }

        return {
            yaml: match[1].trim(),
            body: md.replace(match[0], "").trim()
        };
    }

    // ----------------------------
    // PARSE ID
    // ----------------------------
    parseId(yaml) {
        if (!yaml) return null;

        const match = yaml.match(/id:\s*(\d+)/);
        return match ? match[1] : null;
    }

    // ----------------------------
    // EXTRACT BLOCK (generic)
    // ----------------------------
    extractBlock(lines, header) {
        const start = lines.findIndex(l => l.trim() === header);

        if (start === -1) return [];

        const block = [];

        for (let i = start + 1; i < lines.length; i++) {
            const line = lines[i];

            // stop when next top-level section starts
            const currentIndent = line.search(/\S/);
            const headerIndent = lines[start].search(/\S/);

            // stop only if we hit a NEW top-level section
            if (
                line.trim().endsWith(":") &&
                !line.trim().startsWith("-") &&
                currentIndent <= headerIndent
            ) {
                break;
            }

            block.push(line);
        }

        return block;
    }

     // ----------------------------
    // Choice Text Resolver
    // ----------------------------
    resolveChoiceText(choice,playerStats) {
        const color = this.playerStats?.wizardColor;

        if (typeof choice.text === "object") {
            const key = (color || "").toLowerCase();
            return choice.text[key] || choice.text.default || "Continue";
        }

        return choice.text || "Continue";
    }

resolveChoiceDestination(choice) {

    // normal static destination
    if (choice.to && !choice.toIf) {
        return choice.to;
    }

    // conditional destination
    if (choice.toIf) {

        const condition = choice.toIf.condition;

        // ---------------------------------
        // Supports:
        // playerStats.horse.id === "fae_courser"
        // ---------------------------------

        const equalityMatch = condition.match(
            /^playerStats\.([a-zA-Z0-9_.]+)\s*===\s*"([^"]+)"$/
        );

        if (equalityMatch) {

            const path = equalityMatch[1].split(".");
            const expected = equalityMatch[2];

            let value = this.playerStats;

            for (const key of path) {
                value = value?.[key];
            }

            return value === expected
                ? choice.toIf.true
                : choice.toIf.false;
        }

        // ---------------------------------
        // Simple truthy check
        // playerStats.someFlag
        // ---------------------------------

        if (condition.startsWith("playerStats.")) {

            const key = condition.replace("playerStats.", "");

            const result = this.playerStats?.[key];

            return result
                ? choice.toIf.true
                : choice.toIf.false;
        }
    }

    return null;
}

    interpolateText(text, node = {}) {
        if (!text || typeof text !== "string") return text;

        return text.replace(/\{([^}]+)\}/g, (_, key) => {

            // Case 1: playerStats.xxx
            if (key.startsWith("playerStats.")) {
                const k = key.replace("playerStats.", "");
                return this.playerStats?.[k] ?? "";
            }

            // Case 2: resolveVariable system (audienceKeepLobby etc)
            const resolved = resolveVariable(key, this.playerStats);

            if (resolved !== null && resolved !== undefined) {
                return resolved;
            }

        // Skip enemies placeholder
        // mapUI handles this separately
        if (key === "enemies") {
            return "{enemies}";
        }

        // Case 3: node-level values
        if (node && key in node) {
            const value = node[key];

            // stringify arrays nicely
            if (Array.isArray(value)) {
                return value.map(v => v.enemy || v).join(", ");
            }

            return value;
        }

            console.warn(`Unresolved template key: ${key}`);
            return "";
        });
    }

    resolveImages(images = [], node = {}) {

        return images.map(img => ({

            ...img,

            name: this.interpolateText(img.name, node)

        }));
    }

    resolveCombatEnemies(enemies = []) {

        const resolved = [];

        for (const entry of enemies) {

            // ----------------------------
            // STATIC ENEMY
            // ----------------------------

            if (entry.enemy) {
                resolved.push(entry);
            }

            // ----------------------------
            // RESOLVER PACK
            // ----------------------------

            if (entry.resolver) {

                const result =
                    resolveCombatVariable(
                        entry.resolver,
                        this.playerStats,
                        this.state.visitedNodes
                    );

                if (Array.isArray(result)) {

                    for (const enemyId of result) {

                        resolved.push({
                            enemy: enemyId
                        });
                    }
                }
            }
        }

        return resolved;
    }

    // ----------------------------
    // PARSE NODE (clean pipeline)
    // ----------------------------
    parseNode(md) {
        const { yaml, body } = this.extractFrontmatter(md);

        if (!yaml) {
            return {
                id: null,
                text: body,
                choices: [],
                effects: []
            };
        }

        const lines = yaml.split("\n");
        const prompt = parsePrompt(lines);

        // Extract raw blocks first
        const choiceLines = this.extractBlock(lines, "choices:");
        const effectLines = this.extractBlock(lines, "effects:");
        const pickupForcedLines = this.extractBlock(lines, "pickupForced:");
        const pickupSelectLines = this.extractBlock(lines, "pickupSelect:");
        const pickupSomeLines = this.extractBlock(lines, "pickupSome:");
        const pickupPayLines = this.extractBlock(lines, "pickupPay:");
        const shopLines = this.extractBlock(lines, "shop:");
        const pickupForced = parsePickups(pickupForcedLines, "pickupForced:");
        const pickupSelect = parsePickups(pickupSelectLines, "pickupSelect:");
        const pickupSome = parsePickups(pickupSomeLines, "pickupSome:");
        const pickupPay = parsePickups(pickupPayLines,"pickupPay:");
        const shop = parseShop(shopLines, "shop:");
        const statCheckLines = this.extractBlock(lines, "statCheck:");
        const combatLines = this.extractBlock(lines, "combat:");
        const endQuest = /endQuest\s*:/i.test(yaml);
        const imageLines = this.extractBlock(lines, "image:");
        const images = parseImages(imageLines, "image:");
        const goldLines = lines.filter(l => {
            const lower = l?.toLowerCase() || "";
            return lower.includes("pickupgold:") || lower.includes("losegold:");
        });
        const gold = parseGold(goldLines);
        const breakItemLines = this.extractBlock(lines, "breakItem:");
        const breakItem = parseBreakItem(breakItemLines, "breakItem:");
        const loseItemLines = this.extractBlock(lines, "loseItemForced:");
        const loseItemForced = parseLoseItem(loseItemLines, "loseItemForced:");
        const specialLines = this.extractBlock(lines, "special:");
        const special = parseSpecial(specialLines);
        const setFlagLines = this.extractBlock(lines, "setFlag:");
        const setFlag = parseSetFlags(setFlagLines);
        const useItemLines = this.extractBlock(lines, "useItem:");
        const useItem = parseUseItem(useItemLines, "useItem:");
        const swapItemLines = this.extractBlock(lines, "swapItem:");
        const runFunctionLines = this.extractBlock(lines, "runFunction:");
        const eventForcedLines = this.extractBlock(lines, "eventForced:");
        const swapItem = parseSwap(swapItemLines, "swapItem:");
        const runFunction = parseRunFunction( runFunctionLines, "runFunction:");
        const eventForced = parseEventForced( eventForcedLines, "eventForced:");

        // Parse independently
        const id = this.parseId(yaml);
        const choices = parseChoices(choiceLines);
        const effects = parseEffects(effectLines);
        const deathMessage = parseDeathMessage(lines);
        const statCheck = parseStatCheck(statCheckLines);
        const combatData = parseCombat(combatLines, "combat:");

        return {
            id,
            text: body,
            setFlag,
            prompt,
            choices,
            effects,
            deathMessage,
            pickupForced,
            pickupPay,
            pickupSelect,
            pickupSome,
            shop,
            statCheck,
            combat: this.resolveCombatEnemies(combatData?.enemies || []),
            enemies: this.resolveCombatEnemies(combatData?.enemies || []),
            horseAllowed: combatData?.horseAllowed ?? true,
            canEscape: combatData?.canEscape ?? true,
            onCombatWin: combatData?.onWin || null,
            onCombatEscape: combatData?.onEscape || null,
            images,
            gold,
            breakItem,
            loseItemForced,
            endQuest,
            special,
            eventForced,
            useItem,
            swapItem,
            runFunction
        };
    }

    // ----------------------------
    // START GAME
    // ----------------------------
    async start(startNodeId = "680") {
        await this.goToNode(startNodeId);
    }

    // ----------------------------
    // MOVE BETWEEN NODES
    // ----------------------------
    async goToNode(nodeId) {
        if (!nodeId) return;

        const node = await this.loadNode(nodeId);
        const firstVisit = !this.state.visitedNodes[nodeId];
        this.state.visitedNodes[nodeId] = true;

        let died = false;

        if (firstVisit) {
            died = applyEffects(
                this.playerStats,
                node.effects,
                this.isPlayerDead.bind(this)
            );

            this.state.visitedNodes[nodeId] = true;

        applyForcedPickups(this.playerStats, node.pickupForced);

        // 🧨 LOSE ITEM FORCED
        if (node.loseItemForced && node.loseItemForced.length > 0) {
            for (const rule of node.loseItemForced) {
                loseItem(this.playerStats, rule);
            }
        }


        // 🔧 BREAK ITEM
        if (node.breakItem && node.breakItem.length > 0) {
            for (const rule of node.breakItem) {
                if (rule.type === "worn") {
                    breakWornItem(this.playerStats);
                }

                if (rule.type === "carried") {
                    breakCarriedItem(this.playerStats);
                }
            }
        }        

// 🪄 RUN FUNCTIONS
if (node.runFunction && node.runFunction.length > 0) {

    for (const fn of node.runFunction) {

        // ---------------------------------
        // PICKUP EFFECT
        // ---------------------------------

        if (fn.type === "pickupEffect") {

            const item =
                this.items.find(
                    i => i.id === fn.item
                );

            if (item) {

                handlePickupEffects(
                    item,
                    this.playerStats
                );
            }
        }
    }
}        

        const payResult =
            applyPayPickups(
                this.playerStats,
                node.pickupPay
            );

        if (
            payResult &&
            payResult.success === false &&
            payResult.onFail
        ) {
            await this.goToNode(payResult.onFail);
            return;
        }

            // 🪄 USE ITEM
            if (node.useItem && node.useItem.length > 0) {

                applyUseItems(
                    this.playerStats,
                    node.useItem,
                    this.items
                );
            }

            // 💰 APPLY GOLD (gain or loss)

            let goldAmount = node.gold;

            // ---------------------------------
            // Variable gold support
            // loseGold: oweThugs
            // pickupGold: rewardAmount
            // ---------------------------------

            if (typeof goldAmount === "string") {

                let isNegative = false;
                let variableName = goldAmount;

                if (goldAmount.startsWith("-")) {
                    isNegative = true;
                    variableName = goldAmount.slice(1);
                }

                goldAmount =
                    this.playerStats?.[variableName];

                if (goldAmount === undefined) {
                    goldAmount = 0;
                }

                if (isNegative) {
                    goldAmount = -Number(goldAmount || 0);
                }
            }

            goldAmount = Number(goldAmount) || 0;

            if (goldAmount !== 0) {

                if (goldAmount > 0) {
                    addGold(this.playerStats, goldAmount);
                }
                else {
                    removeGold(
                        this.playerStats,
                        Math.abs(goldAmount)
                    );
                }
            }
            // 🏴 SET FLAGS
            if (node.setFlag) {

                for (const [key, value] of Object.entries(node.setFlag)) {

                    this.playerStats[key] =
                        resolveFlag(
                            value,
                            this.playerStats
                        );
                }
            }
        }

        if (this.state.currentNode) {
            this.state.history.push(this.state.currentNode);
        }

        this.state.currentNode = nodeId;

        if (died) {
            this.handlePlayerDeath(node);
            return;
        }

        let filteredChoices = filterChoices(this, node.choices);

        // ---------------------------------
        // HIDE CHOICES DURING SWAP
        // ---------------------------------
        if (
            node.swapItem &&
            node.swapItem.length > 0 &&
            !this.state.flags[`swapItem_${node.id}`]
        ) {
            filteredChoices = [];
        }

        const processedNode = {
            ...node,
            special: node.special,
            text: this.interpolateText(node.text, node),
            prompt: this.interpolateText(node.prompt, node),
            choices: filteredChoices,
            images: this.resolveImages(node.images, node)
        };

        this.ui.renderNode(processedNode, {
            flags: this.state.flags,
            firstVisit: firstVisit,
            endQuest: node.endQuest,

            refreshNode: this.refreshNode.bind(this),
            engine: this,

            onChoice: async (choice) => {

                // APPLY TENSION
                if (choice.tension !== undefined) {
                    applyTension(this.state, choice.tension);
                }

                const destination =
                    this.resolveChoiceDestination(choice);

                await this.goToNode(destination);
            },

            resolveText: (choice, playerStats) => this.resolveChoiceText(choice, this.playerStats),

            statCheck: node.statCheck,
            eventForced: node.eventForced,
            onStatCheck: (onDone) => {
                handleStatCheck(
                    node.statCheck,
                    this.playerStats,
                    this.goToNode.bind(this),
                    onDone
                );
            },

            onCombat: (combatList) => {
                startNodeCombat({
                    combatList,
                    horseAllowed: node.horseAllowed,
                    canEscape: node.canEscape,
                    enemiesDb: this.enemies,
                    startGroupCombat: this.startGroupCombat,
                    playerStats: this.playerStats,
                    gameElement: document.getElementById("game"),
            onReturn: async (result) => {

                // ✅ combat happened
                this.state.flags[`combat_${node.id}`] = true;

                // ✅ combat won
                if (result === "win") {

                    this.state.flags[`combatWon_${node.id}`] = true;
                    this.state.flags[`combatEscaped_${node.id}`] = false;

                    // AUTO NODE JUMP
                    if (node.onCombatWin) {
                        await this.goToNode(node.onCombatWin);
                        return;
                    }
                }

                // ✅ combat escaped
                if (result === "escape") {

                    this.state.flags[`combatEscaped_${node.id}`] = true;
                    this.state.flags[`combatWon_${node.id}`] = false;

                    // AUTO NODE JUMP
                    if (node.onCombatEscape) {
                        await this.goToNode(node.onCombatEscape);
                        return;
                    }
                }

                this.refreshNode();
            }
                });
            },
            pickupSelect: node.pickupSelect,
            pickupSelectDone: this.state.flags[`pickupSelect_${node.id}`],
            onPickupSelect: () => {
                applySelectPickups(
                    this.playerStats,
                    node.pickupSelect,
                    () => {
                        this.state.flags[`pickupSelect_${node.id}`] = true;

                        this.refreshNode();
                    }
                );
            },

            pickupSome: node.pickupSome,
            pickupSomeDone: this.state.flags[`pickupSome_${node.id}`],
            onPickupSome: () => {
                applySomePickups(
                    this.playerStats,
                    node.pickupSome,
                    () => {
                        this.state.flags[`pickupSome_${node.id}`] = true;

                        this.refreshNode();
                    }
                );
            },

swapItem: node.swapItem,
swapItemDone: this.state.flags[`swapItem_${node.id}`],

onSwapItem: () => {

    handleSwapItem({
        node,
        state: this.state,
        playerStats: this.playerStats,
        items: this.items,
        refreshNode: this.refreshNode.bind(this)
    });
},

            shop: node.shop,
            onShop: () => {

                handleShop({
                    node,
                    state: this.state,
                    playerStats: this.playerStats,
                    items: this.items
                });
            },

            oneventForced: async () => {

                const gameMap = {
                    startDaggerGame,
                    wrongChamberChoice,
                    handOfDespair,
                    chooseContractRandom,
                    chooseContractTimed,
                    loseHorse,
                    wormNumber,
                    sacrificeItem
                };

                const eventFunction =
                    gameMap[node.eventForced.function];

                if (!eventFunction) {
                    return;
                }

            eventFunction({

                playerStats: this.playerStats,

                variant: node.eventForced?.variant,

                onComplete: async (result) => {

                        if (
                            result === "win" &&
                            node.eventForced.onWin
                        ) {

                            await this.goToNode(
                                node.eventForced.onWin
                            );

                            return;
                        }

                        if (
                            result === "lose" &&
                            node.eventForced.onLose
                        ) {

                            await this.goToNode(
                                node.eventForced.onLose
                            );

                            return;
                        }
                    }
                });
            },

        });
    }

    async refreshNode() {
        if (!this.state.currentNode) return;

        const node = await this.loadNode(this.state.currentNode);

        // ✅ APPLY SAME FILTERING AS goToNode
        let filteredChoices = filterChoices(this, node.choices);

        // ---------------------------------
        // HIDE CHOICES DURING SWAP
        // ---------------------------------
        if (
            node.swapItem &&
            node.swapItem.length > 0 &&
            !this.state.flags[`swapItem_${node.id}`]
        ) {
            filteredChoices = [];
        }

        // ---------------------------------
        // AUTO OPEN SWAP MODAL
        // ---------------------------------

        if (
            node.swapItem &&
            node.swapItem.length > 0 &&
            !this.state.flags[`swapItem_${node.id}`]
        ) {

            setTimeout(() => {

                handleSwapItem({
                    node,
                    state: this.state,
                    playerStats: this.playerStats,
                    items: this.items,
                    refreshNode: this.refreshNode.bind(this)
                });

            }, 0);
        }

        const processedNode = {
            ...node,
            text: this.interpolateText(node.text, node),
            prompt: this.interpolateText(node.prompt, node),
            choices: filteredChoices,
            images: this.resolveImages(node.images, node),
            special: node.special
        };

        this.ui.renderNode(processedNode, {
            flags: this.state.flags,
            endQuest: node.endQuest,

            refreshNode: this.refreshNode.bind(this),
            engine: this,

            onChoice: async (choice) => {

                // APPLY TENSION
                if (choice.tension !== undefined) {
                    applyTension(this.state, choice.tension);
                }

                const destination =
                    this.resolveChoiceDestination(choice);

                await this.goToNode(destination);
            },

            resolveText: (choice, playerStats) => this.resolveChoiceText(choice, this.playerStats),

            statCheck: node.statCheck,
            eventForced: node.eventForced,
            onStatCheck: (onDone) => {
                handleStatCheck(
                    node.statCheck,
                    this.playerStats,
                    this.goToNode.bind(this),
                    onDone
                );
            },

            pickupSelect: node.pickupSelect,
            pickupSelectDone: this.state.flags[`pickupSelect_${node.id}`],
            onPickupSelect: () => {
                applySelectPickups(
                    this.playerStats,
                    node.pickupSelect,
                    () => {
                        this.state.flags[`pickupSelect_${node.id}`] = true;
                        this.refreshNode();
                    }
                );
            },

            pickupSome: node.pickupSome,
            pickupSomeDone: this.state.flags[`pickupSome_${node.id}`],
            onPickupSome: () => {
                applySomePickups(
                    this.playerStats,
                    node.pickupSome,
                    () => {
                        this.state.flags[`pickupSome_${node.id}`] = true;
                        this.refreshNode();
                    }
                );
            },

            shop: node.shop,
            onShop: () => {

                handleShop({
                    node,
                    state: this.state,
                    playerStats: this.playerStats,
                    items: this.items
                });
            },

            oneventForced: async () => {

                const gameMap = {
                    startDaggerGame,
                    wrongChamberChoice,
                    handOfDespair,
                    chooseContractRandom,
                    chooseContractTimed,
                    loseHorse,
                    wormNumber,
                    sacrificeItem
                };

                const eventFunction =
                    gameMap[node.eventForced.function];

                if (!eventFunction) {
                    return;
                }

                eventFunction({

                    playerStats: this.playerStats,

                    variant: node.eventForced?.variant,

                    onComplete: async (result) => {

                        if (
                            result === "win" &&
                            node.eventForced.onWin
                        ) {

                            await this.goToNode(
                                node.eventForced.onWin
                            );

                            return;
                        }

                        if (
                            result === "lose" &&
                            node.eventForced.onLose
                        ) {

                            await this.goToNode(
                                node.eventForced.onLose
                            );

                            return;
                        }
                    }
                });
            },            
            
        });
    }

   
    isPlayerDead() {
        return this.playerStats.stats?.STAMINA?.current <= 0;
    }

    handlePlayerDeath(node) {
        this.ui.renderDeathNode({
            text: node.text,
            deathMessage: node.deathMessage || "You have died.",
            onRestart: () => {
                this.startNewGame(); // restart game
            }
        });
    }
}