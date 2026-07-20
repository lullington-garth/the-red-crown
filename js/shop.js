// shop.js
import { getGold, removeGold, addGold } from './gold.js';
import { openModal, setModalContent, setModalWidth, setModalHeight, showModalCloseButton } from "./modal.js";
import { hasMagicVision, showItemDescription, hasDoomVision } from './inventoryUI.js';
import { calculateUsedSlots, calculateMaxSlots } from './calculateCapacity.js';
import { removeStatMods, applyPickupStatMods } from './itemStatModifiers.js';
import { consumeItem } from './useItem.js';
import { handlePickupEffects } from "./pickupEffects.js";

export function openShop(playerStats, shopItems) {
    const goldDisplay = document.createElement("div");
    goldDisplay.style.display = "flex";
    goldDisplay.style.alignItems = "center";
    goldDisplay.style.gap = "6px";
    goldDisplay.style.fontSize = "20px"
    goldDisplay.style.fontWeight = "bold";
    goldDisplay.style.paddingRight = "25px";

    const goldText = document.createElement("span");
    goldDisplay.appendChild(goldText);

    const goldIcon = document.createElement("img");
    goldIcon.src = "images/gold.jpg";
    goldIcon.style.width = "40px";
    goldIcon.style.objectFit = "contain";
    goldIcon.style.mixBlendMode = "multiply";
    goldIcon.style.marginRight = "25px";

    goldDisplay.appendChild(goldIcon);

    function updateGoldDisplay() {
        const gold = getGold(playerStats);
        goldText.textContent = gold;
        goldText.style.fontSize = "30px";
    }
    
    function getSellableItems(playerStats) {
        const inv = playerStats.inventory;

        const worn = Object.values(inv.wornItems).filter(Boolean);

        return [...inv.carriedItems, ...worn].filter(item =>
            item &&
            item["can-discard"] === true &&
            (item.sell ?? 0) > 0
        );
    }

    updateGoldDisplay();

    const container = document.createElement("div");
    const header = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = "Shop";
    title.style.marginTop = "0";
    const body = document.createElement("div");

    // Layout
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.height = "60vh";

    // Scrollable content
    body.style.flex = "1";
    body.style.overflowY = "auto";
    body.style.paddingTop = "10px";
    body.classList.add("hide-scrollbar");

    // ----------------------------------------
    // HEADER
    // ----------------------------------------
//    header.textContent = "Shop";
    header.style.marginTop = "0";

    const topBar = document.createElement("div");
    topBar.style.display = "flex";
    topBar.style.justifyContent = "space-between";
    topBar.style.alignItems = "center";
    topBar.style.marginBottom = "5px";

    // ----------------------------------------
    // TAB BUTTONS
    // ----------------------------------------
    const tabBar = document.createElement("div");
    tabBar.style.display = "flex";
    tabBar.style.gap = "10px";
    tabBar.style.marginBottom = "0px";

    const buyTabBtn = document.createElement("button");
    buyTabBtn.textContent = "Buy Items";

    const sellTabBtn = document.createElement("button");
    sellTabBtn.textContent = "Sell Items";


    // basic styling
    [sellTabBtn, buyTabBtn].forEach(btn => {
        btn.style.padding = "8px 14px";
        btn.style.borderRadius = "6px";
        btn.style.cursor = "pointer";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.fontSize = "20px";
    });

    // ----------------------------------------
    // CONTENT AREA (changes per tab)
    // ----------------------------------------
    const content = body;

function renderSellTab() {
    setActiveTab("sell");

    content.innerHTML = `<h3>Sell Items</h3><hr>`;

    const itemsToSell = getSellableItems(playerStats);

    if (itemsToSell.length === 0) {
        content.innerHTML += `<p>No items available to sell.</p>`;
        return;
    }

    itemsToSell.forEach(item => {

        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.padding = "6px 0";
        row.style.borderBottom = "2px solid #2b2b2c";

        row.innerHTML = `
            <div class="item-info" style="display:flex; align-items:center; gap:10px;"></div>
            <button></button>
        `;
   
        const infoDiv = row.querySelector(".item-info");

        // Use your existing function
        const descriptionEl = showItemDescription(item, playerStats);

        // Optional: shrink it for shop UI
        descriptionEl.style.fontSize = "12px";
        descriptionEl.querySelector("img").style.width = "40px";
        descriptionEl.querySelector("img").style.height = "40px";

        infoDiv.appendChild(descriptionEl);

        // ✅ IMAGE (after innerHTML)
        const img = descriptionEl.querySelector("img");
        if (img) {
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.marginLeft = "6px";
        }

        // ✨ MAGIC GLOW
        if (item.magical && hasMagicVision(playerStats)) {
            img.style.boxShadow = "0 0 6px 2px )rgba(89, 89, 90, 0.48";
            img.style.borderRadius = "4px";
        }

        if (item.status === "cursed" && hasDoomVision(playerStats)) {
            img.style.boxShadow = "0 0 6px 2px rgba(0, 0, 0, 0.8)";
            img.style.borderRadius = "4px";
        }  

                // ✅ BUTTON
        const btn = row.querySelector("button");

        // Styling
        btn.style.display = "flex";
        btn.style.justifyContent = "center";
        btn.style.alignItems = "center";
        btn.style.alignSelf = "flex-start";

        btn.style.flex = "0 0 auto"; // ✅ fixed

        btn.style.padding = "4px";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.fontSize = "20px"

        btn.style.width = "70px";
        btn.style.minWidth = "70px";
        btn.style.maxWidth = "70px";

        btn.style.boxSizing = "border-box";
        btn.style.cursor = "pointer";
        btn.style.gap = "10px";

        const price = item.sell ?? 0;

        btn.innerHTML = `
            <span>${price}</span>
            <img src="images/gold.png" style="width:20px;" />
        `;

        btn.addEventListener("click", () => {
            const price = item.sell ?? 0;

        if (price > 0) {
            addGold(playerStats, price);
        }
           // Remove from carried items
            const carried = playerStats.inventory.carriedItems;
            const carriedIndex = carried.indexOf(item);
            if (carriedIndex !== -1) {
                carried.splice(carriedIndex, 1);
            } else {
                // Remove from worn items
                const worn = playerStats.inventory.wornItems;

                for (const key in worn) {
                    if (worn[key] && worn[key].id === item.id) {
                        worn[key] = null;
                        break;
                    }
                }
        }
            updateGoldDisplay();
            showShopMessage(`${item.item} sold for ${price}gp.`);
            removeStatMods(playerStats, item);
            renderSellTab();
        });

        content.appendChild(row);
    });
}

function purchaseItem(item, costOverride = null) {
    const price = costOverride ?? item.cost ?? 0;

    if (price > 0) {
        const success = removeGold(playerStats, price);
        if (!success) return false;
    }

    if (calculateUsedSlots(playerStats) >= calculateMaxSlots(playerStats)) {
        showShopMessage("Inventory is full.");
        return false;
    }

    const newItem = structuredClone(item);

    playerStats.inventory.carriedItems.push(newItem);

    // 🧠 trigger pickup effects AFTER item enters inventory
    handlePickupEffects(newItem, playerStats);

    const index = shopItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
        shopItems.splice(index, 1);
    }

    applyPickupStatMods(playerStats, item);
    updateGoldDisplay();
    showShopMessage(`${item.item} purchased for ${price}gp.`);
    renderBuyTab();

    return true;
}

function renderBuyTab() {
    setActiveTab("buy");

    const oneBuyItem = getOneBuyItem(playerStats);
    const usedSlots = calculateUsedSlots(playerStats);
    const maxSlots = calculateMaxSlots(playerStats);
    const isInventoryFull = usedSlots >= maxSlots;

    if (isInventoryFull) {
        content.innerHTML = `
            <h3 style="color: #000000;">Your inventory is full.</h3>
            <p style="color: #000000;">You must sell or discard items before buying more.</p>
        `;
    }
    else {
        content.innerHTML = `<h3>Items for sale:</h3><hr>`;
    }
 
    shopItems.forEach(item => {
    if (oneBuyItem) {
        const bonusRow = document.createElement("div");
        bonusRow.style.display = "flex";
        bonusRow.style.alignItems = "center";
        bonusRow.style.justifyContent = "flex-end";
        bonusRow.style.gap = "8px";
        bonusRow.style.padding = "6px 0";

        const label = document.createElement("span");
        label.textContent = "Buy using the Coin of Single Purchase";
        label.style.fontSize = "14px";
        label.style.opacity = "0.8";

        const btn = document.createElement("button");

        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.width = "70px";
        btn.style.padding = "4px";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.fontSize = "18px"
        btn.style.gap = "6px";
        btn.style.cursor = "pointer";

        btn.innerHTML = `
            <span>0</span>
            <img src="images/0023.png" style="width:20px;" />
        `;

    btn.addEventListener("click", () => {
        const success = purchaseItem(item, 0);

        if (!success) return;

        showShopMessage(`${oneBuyItem.item} used to purchase ${item.item} for free.`);

        const inv = playerStats.inventory;

        // 🔍 find REAL instance in inventory (important)
        let realItem =
            inv.carriedItems.find(i => i.id === oneBuyItem.id) ||
            Object.values(inv.wornItems).find(i => i?.id === oneBuyItem.id);

        if (realItem) {
            consumeItem(playerStats, realItem);
        }

        renderBuyTab();
    });

        bonusRow.appendChild(label);
        bonusRow.appendChild(btn);
        content.appendChild(bonusRow);
    }

        const row = document.createElement("div");
        row.style.alignItems = "flex-start";
        row.style.display = "flex";
        row.style.gap = "12px";       
        row.style.padding = "6px 0";
        row.style.borderBottom = "2px solid #2b2b2c";

        row.innerHTML = `
            <div class="item-info" style="display:flex; align-items:center; gap:10px;"></div>
            <button></button>
        `;

        // ✅ BUTTON
        const btn = row.querySelector("button");

        const infoDiv = row.querySelector(".item-info");
        infoDiv.style.flex = "1";

        // Use shared item renderer
        const descriptionEl = showItemDescription(item, playerStats);

        // Optional: match shop sizing like sell tab
        descriptionEl.style.fontSize = "12px";

        const img = descriptionEl.querySelector("img");
        if (img) {
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.marginLeft = "6px";
        }

        // ✨ MAGIC GLOW
        if (item.magical && hasMagicVision(playerStats)) {
            img.style.boxShadow = "0 0 6px 2px rgba(89, 89, 90, 0.48)";
            img.style.borderRadius = "4px";
        }
        
        if (item.status === "cursed" && hasDoomVision(playerStats)) {
            img.style.boxShadow = "0 0 6px 2px rgba(0, 0, 0, 0.8)";
            img.style.borderRadius = "4px";
        }  

        infoDiv.appendChild(descriptionEl);

        // Styling
        btn.style.display = "flex";
        btn.style.justifyContent = "center";
        btn.style.alignItems = "center";

        btn.style.flex = "0 0 auto"; // ✅ fixed

        btn.style.padding = "4px";
        btn.style.borderRadius = "6px";
        btn.style.backgroundColor = "#424141";
        btn.style.color = "#d7d4d4";
        btn.style.border = "1px solid #555";
        btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
        btn.style.fontSize = "18px"

        btn.style.width = "70px";
        btn.style.minWidth = "70px";
        btn.style.maxWidth = "70px";

        btn.style.boxSizing = "border-box";
        btn.style.cursor = "pointer";
        btn.style.gap = "10px";

        let price = item.cost ?? 0;

        if (hasHalfGoldCurse(playerStats)) {
            price *= 2;
        }

        const playerGold = getGold(playerStats);

        btn.innerHTML = `
            <span>${price}</span>
            <img src="images/gold.png" style="width:20px;" />
        `;

        if (price > playerGold) {
            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
        }

        if (isInventoryFull) {
            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
        }

        // Click
        btn.addEventListener("click", () => {
            purchaseItem(item);
        });

        content.appendChild(row);



    });
}

function showShopMessage(message) {
    const msg = document.createElement("div");

    msg.textContent = message;
    msg.style.position = "absolute";
    msg.style.top = "40px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";

    msg.style.background = "#424141";
    msg.style.color = "#d7d4d4";
    msg.style.padding = "8px 12px";
    msg.style.borderRadius = "6px";
    msg.style.fontSize = "16px";

    msg.style.zIndex = "9999";

    document.body.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 2000);
}

    // ----------------------------------------
    // TAB STATE HANDLING
    // ----------------------------------------
    function setActiveTab(tab) {
        if (tab === "buy") {
            buyTabBtn.style.boxShadow = `0 0 10px 2px #424141`;
            sellTabBtn.style.boxShadow = "none";
        } else {
            sellTabBtn.style.boxShadow = `0 0 10px 2px #424141`;
            buyTabBtn.style.boxShadow = "none";
        }
    }

    // ----------------------------------------
    // EVENTS
    // ----------------------------------------
    buyTabBtn.addEventListener("click", renderBuyTab);
    sellTabBtn.addEventListener("click", renderSellTab);

    // ----------------------------------------
    // ASSEMBLE
    // ----------------------------------------
    tabBar.appendChild(buyTabBtn);
    tabBar.appendChild(sellTabBtn);
    topBar.appendChild(title);
    topBar.appendChild(goldDisplay);

    // Header assembly (STATIC)
    header.appendChild(topBar);
    header.appendChild(tabBar);

    // Append layout
    container.appendChild(header);
    container.appendChild(body);

    // Default tab
    renderBuyTab();

    // Open modal
    setModalContent(container);
    setModalWidth("600px");
    setModalHeight("600px");
    showModalCloseButton();
    openModal();
}

function getOneBuyItem(playerStats) {
    const inv = playerStats.inventory;

    const allItems = [
        ...inv.carriedItems,
        ...Object.values(inv.wornItems).filter(Boolean)
    ];

    return allItems.find(item => item?.["special-ability"] === "ONE_BUY") || null;
}

function hasHalfGoldCurse(playerStats) {
    const inv = playerStats.inventory;

    const allItems = [
        ...inv.carriedItems,
        ...Object.values(inv.wornItems).filter(Boolean)
    ];

    return allItems.some(item => item?.["special-ability"] === "HALF_GOLD");
}