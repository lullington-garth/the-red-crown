// loseItem.js

export function loseItem(playerStats, rule) {
    const inv = playerStats.inventory;

    let pool = [];

    // ----------------------------
    // BUILD ITEM POOL
    // ----------------------------
    if (rule.type === "carried" || rule.type === "all") {
        pool.push(...(inv.carriedItems || []));
    }

    if (rule.type === "worn" || rule.type === "all") {
        pool.push(...Object.values(inv.wornItems || {}).filter(Boolean));
    }

    if (pool.length === 0) return;

    let target = null;

    // ----------------------------
    // SELECT ITEM
    // ----------------------------
    if (rule.item === "random") {
        target = pool[Math.floor(Math.random() * pool.length)];
    }

    // NEW: random magical item
    else if (rule.item === "randomMagical") {

        const magicalPool = pool.filter(i => i.magical === true);

        if (magicalPool.length > 0) {
            target =
                magicalPool[
                    Math.floor(Math.random() * magicalPool.length)
                ];
        }
    }

    // existing direct item ID lookup
    else {
        target = pool.find(i => i.id === rule.item);
    }

    // ----------------------------
    // REALM ITEM
    // ----------------------------
    if (rule.item === "realmItem") {

        const wizard =
            (playerStats.visitingBrother || "").toLowerCase();

        let realmId = null;

        if (wizard === "green") realmId = "0262";
        if (wizard === "yellow") realmId = "0275";
        if (wizard === "blue") realmId = "0269";

        target = pool.find(i =>
            i.id === realmId ||
            i.templateId === realmId
        );
    }

    // ----------------------------
    // STARTER ITEM
    // ----------------------------
    if (rule.item === "starterItem") {

        const wizard =
            (playerStats.wizardColor || "").toLowerCase();

        let starterId = null;

        if (wizard === "green") starterId = "0208";
        if (wizard === "yellow") starterId = "0130";
        if (wizard === "blue") starterId = "0259";
        if (wizard === "red") starterId = "0037";

        target = pool.find(i =>
            i.id === starterId ||
            i.templateId === starterId
        );
        
        // Fallback to a random item if the starter item is absent.
        if (!target) {
            target = pool[
                Math.floor(Math.random() * pool.length)
            ];
        }

    }

    if (!target) return;

    // ----------------------------
    // STORE CURIO SACRIFICE
    // ----------------------------
    if (rule.item === "randomMagical") {
        playerStats.curioSacrifice =
            target.item ||
            "something magical";
    }    

    // ----------------------------
    // THUG PAYMENT
    // ----------------------------
    if (rule.item === "random") {
        playerStats.thugPayment =
            target.description?.toLowerCase() ||
            "an item";
    }

    // ----------------------------
    // THUG ITEM
    // ----------------------------
    if (rule.item === "random") {
        playerStats.thugItem =
            target.item ||
            "Check your Inventory";
    }

    // ----------------------------
    // GORBASH ITEM
    // ----------------------------
    if (rule.item === "random") {
        playerStats.gorbashItem =
            target.item ||
            "lullaby lens";
    }

    // ----------------------------
    // STARTER ITEM
    // ----------------------------
    if (rule.item === "starterItem") {
        playerStats.starterItem =
            target.item ||
            "most valualbe item you own";
    }

    playerStats.lostItem = target;
    playerStats.lostItemName =
    target.item ||
    "lost item";

    // ----------------------------
    // REMOVE FROM CARRIED
    // ----------------------------
    const carriedIdx = inv.carriedItems.findIndex(i => i.id === target.id);
    if (carriedIdx !== -1) {
        inv.carriedItems.splice(carriedIdx, 1);
    }

    // ----------------------------
    // REMOVE FROM WORN
    // ----------------------------
    for (const key in inv.wornItems) {
        if (inv.wornItems[key]?.id === target.id) {
            inv.wornItems[key] = null;
        }
    }
}