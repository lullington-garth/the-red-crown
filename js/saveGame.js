// saveGame.js

const SAVE_KEY = "redCrownSave";
const SAVE_VERSION = 1;

// ======================================================
// SAVE GAME
// ======================================================

export function saveGame(engine) {

    if (!engine) {
        console.warn("Save failed: no MapEngine supplied.");
        return false;
    }

    try {

        const saveData = {
            version: SAVE_VERSION,
            savedAt: Date.now(),

            playerStats: engine.playerStats,
            state: engine.state
        };

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(saveData)
        );

        console.log(
            `Game saved at node ${engine.state.currentNode}`
        );

        return true;

    }
    catch (error) {

        console.error(
            "Unable to save game:",
            error
        );

        return false;
    }
}


// ======================================================
// LOAD GAME
// ======================================================

export function loadGame() {

    try {

        const rawSave =
            localStorage.getItem(SAVE_KEY);

        if (!rawSave) {
            return null;
        }

        const saveData =
            JSON.parse(rawSave);

        // ----------------------------------------------
        // Basic save validation
        // ----------------------------------------------

        if (
            !saveData ||
            !saveData.playerStats ||
            !saveData.state
        ) {
            console.warn(
                "Saved game is incomplete or invalid."
            );

            return null;
        }

        // ----------------------------------------------
        // Version check
        // ----------------------------------------------

        if (saveData.version !== SAVE_VERSION) {

            console.warn(
                `Save version ${saveData.version} does not match current version ${SAVE_VERSION}.`
            );

            return null;
        }

        return saveData;

    }
    catch (error) {

        console.error(
            "Unable to load saved game:",
            error
        );

        return null;
    }
}


// ======================================================
// CHECK FOR SAVED GAME
// ======================================================

export function hasSavedGame() {

    return localStorage.getItem(SAVE_KEY) !== null;

}


// ======================================================
// DELETE SAVED GAME
// ======================================================

export function deleteSavedGame() {

    try {

        localStorage.removeItem(SAVE_KEY);

        console.log("Saved game deleted.");

        return true;

    }
    catch (error) {

        console.error(
            "Unable to delete saved game:",
            error
        );

        return false;
    }
}