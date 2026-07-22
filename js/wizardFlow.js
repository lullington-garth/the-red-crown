// wizardFlow.js
import { showWizardSelection } from './wizardSelection.js';
import { createInitialStats } from './statRoller.js';
import { showPreGameStats } from './statsUI.js';
import { showHorseSelection } from './horseSelection.js';
import { initializeGold } from './gold.js';
import { showBookSelection } from './preGameBookSelection.js';
import { showScrollSelection } from './preGameScrolls.js';

export function runWizardFlow(gameDiv, wizards, horses, items, onComplete) {
    showWizardSelection(gameDiv, wizards, (selectedWizard) => {

        const playerStats = createInitialStats(selectedWizard);
        playerStats.wizardName = selectedWizard.wizardName;
        playerStats.wizardKey = selectedWizard.name;
        playerStats.items = items;
        playerStats.wizardColor = selectedWizard.name;
        playerStats.debugMode = selectedWizard.debugMode;

        // Inventory Initialization
        const wornSlotTemplate = {
            head: null, hands: null, torso: null, feet: null,
            ring1: null, ring2: null, neck: null, staff: null,
            weapon: null, glasses: null, book: null, shield: null,
            carried: null
        };

        playerStats.inventory = {
            carriedItems: [],
            wornItems: { ...wornSlotTemplate }
        };

        // Initialize gold
        initializeGold(playerStats, 40);

        // Starter Items
        const starterIds = ["0364", // Spell Book
//            "0003","0004","0005","0006","0007","0008",// Spell Book
  //          "0257","0258","0259", // Shields
    //        "0290","0291","0292","0293","0294","0295","0296","0297", // Weapons
      //      "0260","0261","0262","0263","0264","0265","0266","0267", // Staff
        //    "0268","0269","0270","0271","0272","0273","0274","0275", // Staff
          //  "0276","0277","0278","0279","0280","0281", // Staff         
//            "0160","0161","0162","0163","0164","0165","0166","0167", // Mix Potions
  //          "0168","0169","0170","0171","0172", // Mix Potions
//            "0173","0174","0175","0176","0177","0178","0179","0180", // Potions
  //          "0181","0182","0183","0184","0185","0186","0187","0188", // Potions
//            "0189","0190","0191","0192","0193","0194","0195","0196","0303", // Potions
          //  "0030","0031","0032", // Hats and Helmets
//            "0024","0025", // Boots
  //          "0028","0029", // Gloves
    //        "0282","0283","0284","0285","0286","0287","0288","0289", // Torso
//            "0209","0210","0212","0213","0214","0215","0216","0217", // Scrolls
  //          "0218","0219","0220","0221","0222","0223","0224","0225", // Scrolls
    //        "0226","0227","0228","0229","0230","0231","0232","0233", // Scrolls
      //      "0234","0235","0236","0237","0238","0239","0240","0241", // Scrolls
        //    "0242","0243","0244","0245","0246","0247","0248","0249", // Scrolls
          //  "0250","0251","0252","0253","0254","0255","0256","0211", // Scrolls
//          "0247","0305", // Scrolls
  //          "0134","0123","0091","0041","0203", // Cartwheel, Paddle, Loadstone, Counterweight
    //       "0013","0014","0015","0016","0017","0018","0019","0020", // Coins
      //      "0021","0022","0023","0360","0361","0362", // Coins
        //   "0045","0092","0115","0051","0052","0089","0095","0098", // Misc
          //  "0046", "0071", "0038","0043", // Misc
  //          "0050","0055","0076","0077","0099","0100","0101","0102", // Misc Combat
    //        "0103","0104","0105","0106","0107","0111","0112","0113", // Misc Combat
      //      "0129","0132", // Misc Combat
      //      "0138","0139","0140","0141","0142","0143", // Pendants
        //    "0198","0199","0200","0201","0202","0203","0204","0205","0206","0207","208", // Rings
  //         "0026","0027", // Glasses
    //        "0197", // Provisions
        //    "0198","0199", // Rings
        //    "0037", // Silver Acorn
  //          "0077","0115","0130","0282","0086","0138","0257","0258","0259","0046","0208",// Equip List

        ];

        // Add wizard-specific starter item
            if (playerStats.wizardColor === "Yellow") {
                starterIds.push("0130");
            }

            if (playerStats.wizardColor === "Blue") {
                starterIds.push("0259");
            }

            if (playerStats.wizardColor === "Green") {
                starterIds.push("0208");
            }

            if (playerStats.wizardColor === "Red") {
                starterIds.push("0363");
            }

        const starterItems = starterIds
            .map(id => items.find(i => i.id === id))
            .filter(Boolean);

        // Auto-Equip Starter Gear
        starterItems.forEach(item => {
            if (item.status !== "default") {
                playerStats.inventory.carriedItems.push(item);
                return;
            }

            const type = item.type;

            if (type === "ring") {
                if (!playerStats.inventory.wornItems.ring1) {
                    playerStats.inventory.wornItems.ring1 = item;
                } else if (!playerStats.inventory.wornItems.ring2) {
                    playerStats.inventory.wornItems.ring2 = item;
                } else {
                    playerStats.inventory.carriedItems.push(item);
                }
                return;
            }

            if (type === "shield") {
                if (!playerStats.inventory.wornItems.shield) {
                    playerStats.inventory.wornItems.shield = item;
                } else if (!playerStats.inventory.wornItems.carried) {
                    playerStats.inventory.wornItems.carried = item;
                } else {
                    playerStats.inventory.carriedItems.push(item);
                }
                return;
            }

            if (playerStats.inventory.wornItems.hasOwnProperty(type)) {
                playerStats.inventory.wornItems[type] = item;
                return;
            }

            if (!playerStats.inventory.wornItems.carried) {
                playerStats.inventory.wornItems.carried = item;
                return;
            }

            playerStats.inventory.carriedItems.push(item);
        });

//playerStats.companions = ["sam"];
playerStats.comeOnSam = false
playerStats.fairyShower = false
        // ---------------------------------------
        // Continue Character Flow
        // ---------------------------------------

if (selectedWizard.debugMode) {
    onComplete(playerStats);
} else {
            // Normal flow
            showPreGameStats(gameDiv, playerStats, (completedStats) => {
                showBookSelection(gameDiv, completedStats, items, (statsAfterBook) => {
                    showScrollSelection(gameDiv, statsAfterBook, items, (statsAfterScrolls) => {
                        showHorseSelection(gameDiv, statsAfterScrolls, horses, (updatedStats) => {
                            onComplete(updatedStats);
                        });
                    });
                });
            });
        }

    });
}