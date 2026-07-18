// variableResolver.js

import { resolveAudienceVariable } from "./variableMapChoicesAudience.js";
import { resolveBathhouseVariable } from "./variableMapChoicesBathhouse.js";
import { resolveClockShopVariable } from "./variableMapChoicesClockShop.js";
import { resolveCreaturesVariable } from "./variableMapChoicesCreatures.js";
import { resolveExchangeVariable } from "./variableMapChoicesExchange.js";
import { resolveShepherdsHutVariable } from "./variableMapChoicesShepherdsHut.js";
import { resolveMarketHallVariable } from "./variableMapChoicesMarketHall.js";
import { resolveMoneyChangerVariable } from "./variableMapChoicesMoneyChanger.js";
import { resolveVillageHallVariable } from "./variableMapChoicesVillageHall.js";
import { resolvePotterVariable } from "./variableMapChoicesPotter.js";
import { resolveFortressEntranceVariable } from "./variableMapChoicesFortressEntrance.js";
import { resolveDevilsPathVariable } from "./variableMapChoicesDevilsPath.js";
import { resolveEnvironment1Variable } from "./variableMapChoicesEnvironment1.js";
import { resolveEnvironment2Variable } from "./variableMapChoicesEnvironment2.js";
import { resolveSandmurkVariable } from "./variableMapChoicesSandmurks.js";
import { resolveStonesVariable } from "./variableMapChoicesStones.js";
import { resolveDragonsVariable } from "./variableMapChoicesDragons.js";
import { resolveSettlementVariable } from "./variableMapChoicesSettlement.js";
import { resolvePoacherVariable} from "./variableMapChoicesPoachers.js";
import { resolvePeckVariable } from "./variableMapChoicesPeck.js";
import { resolveFuneralVariable } from "./variableMapChoicesFuneral.js";
import { resolveRiftVariable } from "./variableMapChoicesRift.js";
import { resolveSoldiersVariable } from "./variableMapChoicesSoldiers.js";
import { resolveSettlemetShopVariable } from "./variableMapChoicesShop.js";
import { resolveTreesVariable } from "./variableMapChoicesTrees.js";
import { resolveOpeningsVariable } from "./variableMapChoicesOpening.js";

export function resolveVariable(path, playerStats) {

    let result = resolveAudienceVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }

    result = resolveBathhouseVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }

    result = resolveClockShopVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }

    result = resolveCreaturesVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }
    
    result = resolveExchangeVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }

    result = resolveShepherdsHutVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }    

    result = resolveMarketHallVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }   

    result = resolveMoneyChangerVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }   

    result = resolveVillageHallVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolvePotterVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }

    result = resolveFortressEntranceVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }    

    result = resolveDevilsPathVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }  

    result = resolveEnvironment1Variable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveSandmurkVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveStonesVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveDragonsVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveSettlementVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolvePoacherVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolvePeckVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveFuneralVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveRiftVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 
    
    result = resolveSoldiersVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }

    result = resolveSettlemetShopVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveEnvironment2Variable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveTreesVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    } 

    result = resolveOpeningsVariable(path, playerStats);

    if (result !== null && result !== undefined) {
        return result;
    }

    // ----------------------------
    // GLOBAL VARIABLES
    // ----------------------------
    if (path === "curioSacrifice") {
        return playerStats.curioSacrifice || "something magical";
    }

    if (path === "thugPayment") {
        return playerStats.thugPayment || "an item";
    }

    if (path === "thugItem") {
        return playerStats.thugItem || "Check your Inventory";
    }

    if (path === "gorbashItem") {
        return playerStats.gorbashItem || "lullaby lens";
    }

    if (path === "starterItem") {
        return playerStats.starterItem || "most valuable thing you owned";
    }

    if (path === "lostItem") {
        return playerStats.lostItemName ||
            "your lost item";
    }
return null;
}