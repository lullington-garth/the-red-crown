// tension.js

export function applyTension(state, amount = 0) {

    // initialize if missing
    if (typeof state.tension !== "number") {
        state.tension = 0;
    }

    state.tension += amount;

    console.log("Current Tension:", state.tension);
}