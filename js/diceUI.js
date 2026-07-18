// diceUI.js
import { rollCombatDice, rollMultipleEnemyDice, discardPlayerDie } from './dice.js';

// ----------------------------------------------------
// Creates a dice image
// ----------------------------------------------------
export function createDiceImage(colour, value) {

    const img = document.createElement("img");

    img.src = `dice/${colour}/${value}.png`;

    img.width = 42;
    img.height = 42;

    img.style.marginRight = "6px";
    img.style.transition = "transform 0.08s linear";

    return img;
}

// ----------------------------------------------------
// Rolling animation
// ----------------------------------------------------
export async function animateDice(images, colours, finalValues) {
    if (typeof colours === "string") {
        colours = images.map(() => colours);
    }
    const previous = [];

    for (let i = 0; i < images.length; i++) {
        previous[i] = -1;
    }

    // ---------------------------------------
    // PHASE 1: ALL DICE ROLL TOGETHER
    // ---------------------------------------

    for (let frame = 0; frame < 10; frame++) {

        for (let i = 0; i < images.length; i++) {

            let face;

            do {
                face = Math.floor(Math.random() * 6) + 1;
            } while (face === previous[i]);

            previous[i] = face;

            images[i].src = `dice/${colours[i]}/${face}.png`;

            const angle = Math.random() * 50 - 25;

            images[i].style.transform = `rotate(${angle}deg)`;

        }

        await new Promise(r => setTimeout(r, 80));
    }

    // ---------------------------------------
    // PHASE 2: STAGGERED SETTLE
    // ---------------------------------------

    for (let i = 0; i < images.length; i++) {

        // small pause BEFORE each die settles
        await new Promise(r => setTimeout(r, 100 + i * 25));

        images[i].src = `dice/${colours[i]}/${finalValues[i]}.png`;

        images[i].style.transform = "rotate(0deg) scale(1.05)";

        // tiny "impact" bounce
        await new Promise(r => setTimeout(r, 100));

        images[i].style.transform = "rotate(0deg) scale(1)";
    }
}

export function showDiceUI(container) {
    // Remove old dice UI if exists
    const oldDiv = document.getElementById('diceTest');
    if (oldDiv) oldDiv.remove();

    const diceDiv = document.createElement('div');
    diceDiv.id = 'diceTest';
    diceDiv.style.marginTop = "20px";

    const title = document.createElement('h3');
    title.textContent = "Dice Roll Test";
    diceDiv.appendChild(title);

    const resultDiv = document.createElement('div');
    resultDiv.id = 'diceResult';
    diceDiv.appendChild(resultDiv);

    // Player dice buttons
    ['1d6', '1d6+DD', '2d6', '2d6+DD', '3d6', '3d6+DD'].forEach(type => {
        const btn = document.createElement('button');
        btn.textContent = type;
        btn.style.marginRight = "5px";

        btn.addEventListener('click', () => {
            const baseDice = parseInt(type[0]);
            const devilsDice = type.includes('+DD');
            const roll = rollCombatDice({ role: 'player', baseDice, devilsDice });
            renderPlayerDice(resultDiv, roll);
        });

        diceDiv.appendChild(btn);
    });

    // Enemy dice buttons
    ['1d6', '1d6+DD', '2d6', '2d6+DD', '3d6', '3d6+DD'].forEach(type => {
        const btn = document.createElement('button');
        btn.textContent = "Enemy " + type;
        btn.style.marginRight = "5px";

        btn.addEventListener('click', () => {
            const baseDice = parseInt(type[0]);
            const devilsDice = type.includes('+DD');
            const rolls = rollMultipleEnemyDice(1, { baseDice, devilsDice });
            renderEnemyDice(resultDiv, rolls);
        });

        diceDiv.appendChild(btn);
    });

    // Example: Multiple enemies (3 enemies)
    const multiBtn = document.createElement('button');
    multiBtn.textContent = "3 Enemies 2d6+DD";
    multiBtn.style.marginTop = "10px";
    multiBtn.addEventListener('click', () => {
        const rolls = rollMultipleEnemyDice(3, { baseDice: 2, devilsDice: true });
        renderEnemyDice(resultDiv, rolls);
    });
    diceDiv.appendChild(document.createElement('br'));
    diceDiv.appendChild(multiBtn);

    container.appendChild(diceDiv);
}

// ---------------- Player dice rendering ----------------
export function renderPlayerDice(container, rollObj, onComplete = null, animate = false) {
    container.innerHTML = ""; // clear previous

    const diceContainer = document.createElement('div');

    const images = [];

    rollObj.rolls.forEach((val, i) => {

    const isDevilsExtraDie =
        rollObj.devilsDice &&
        rollObj.role === "player" &&
        i === rollObj.rolls.length - 1;

    const colour = isDevilsExtraDie ? "black" : "white";

        const img = createDiceImage(colour, animate ? 1 : val);

        if (rollObj.discardedIndex === i) {
            img.style.opacity = "0.4";
            img.style.filter = "grayscale(100%)";
        }

        // store index so we can reference it on click
        img.dataset.index = i;

        images.push(img);
        diceContainer.appendChild(img);

        // ----------------------------------------------------
        // DEVIL DICE PLAYER INTERACTION
        // ----------------------------------------------------
if (rollObj.devilsDice && rollObj.role === "player") {

    img.style.cursor = "pointer";

    img.addEventListener("click", () => {

        if (img.dataset.discarded === "true") return;

        img.dataset.discarded = "true";
        img.style.opacity = "0.4";
        img.style.filter = "grayscale(100%)";

        // ✅ IMPORTANT: delegate to external handler if provided
        if (typeof onComplete === "function") {
            onComplete(i);
        } else {
            discardPlayerDie(rollObj, i);
        }

        images.forEach(d => d.style.cursor = "default");
    });
}
    });

    container.appendChild(diceContainer);

if (animate) {

    const colours = rollObj.rolls.map((_, i) => {

        const isDevilsExtraDie =
            rollObj.devilsDice &&
            rollObj.role === "player" &&
            i === rollObj.rolls.length - 1;

        return isDevilsExtraDie ? "black" : "white";
    });

    animateDice(images, colours, rollObj.rolls).then(() => {

        // enable interaction only AFTER animation finishes
        if (rollObj.devilsDice && rollObj.role === "player") {

            images.forEach((img, i) => {

                img.style.cursor = "pointer";

                img.addEventListener("click", () => {

                    if (img.dataset.discarded === "true") return;

                    img.style.opacity = "0.4";
                    img.style.filter = "grayscale(100%)";
                    img.dataset.discarded = "true";

                    if (typeof onComplete === "function") {
                        onComplete(i);
                    } else {
                        discardPlayerDie(rollObj, i);
                    }

                    images.forEach(d => d.style.cursor = "default");
                });
            });
        }
    });
}
    
    updateTotal(container, rollObj.total, rollObj.discarded);
    if (!rollObj.devilsDice && onComplete) {
    onComplete(rollObj);
}
}

// ---------------- Enemy dice rendering ----------------
export function renderEnemyDice(container, rollObjs, animate = true) {
    container.innerHTML = ""; // clear previous

    rollObjs.forEach((rollObj) => {

        const diceContainer = document.createElement('div');
        diceContainer.style.marginBottom = "5px";

        const images = [];

        // ----------------------------------------------------
        // Determine colours FIRST (respects Devil Dice rules)
        // ----------------------------------------------------
        const colours = rollObj.allRolls.map((_, i) => {
            return (rollObj.devilsDice &&
                i === rollObj.allRolls.length - 1)
                ? "black"
                : "red";
        });

        // ----------------------------------------------------
        // Create dice images (start at face 1 for animation)
        // ----------------------------------------------------
        rollObj.allRolls.forEach((val, i) => {

            const img = createDiceImage(colours[i], animate ? 1 : val);

            images.push(img);
            diceContainer.appendChild(img);
        });

        container.appendChild(diceContainer);

        // ----------------------------------------------------
        // Animate enemy dice (if enabled)
        // ----------------------------------------------------
        if (animate) {

            (async () => {

                const previous = new Array(images.length).fill(-1);

                // PHASE 1: rolling chaos
                for (let frame = 0; frame < 10; frame++) {

                    for (let i = 0; i < images.length; i++) {

                        let face;
                        do {
                            face = Math.floor(Math.random() * 6) + 1;
                        } while (face === previous[i]);

                        previous[i] = face;

                        images[i].src = `dice/${colours[i]}/${face}.png`;

                        const angle = Math.random() * 50 - 25;
                        images[i].style.transform = `rotate(${angle}deg)`;
                    }

                    await new Promise(r => setTimeout(r, 80));
                }

                // PHASE 2: settle to final values
                for (let i = 0; i < images.length; i++) {

                    await new Promise(r =>
                        setTimeout(r, 100 + i * 25)
                    );

                    images[i].src =
                        `dice/${colours[i]}/${rollObj.allRolls[i]}.png`;

                    images[i].style.transform =
                        "rotate(0deg) scale(1.05)";

                    await new Promise(r => setTimeout(r, 100));

                    images[i].style.transform =
                        "rotate(0deg) scale(1)";
                }

                // ----------------------------------------------------
                // APPLY DISCARD STYLING (AFTER ANIMATION FINISHES)
                // ----------------------------------------------------
                for (let i = 0; i < images.length; i++) {

                    if (rollObj.discardedIndex === i) {
                        images[i].style.opacity = "0.4";
                        images[i].style.filter = "grayscale(100%)";
                    }
                }

            })();
        }

        // ----------------------------------------------------
        // APPLY DISCARD STYLING IMMEDIATELY (NO ANIMATION)
        // ----------------------------------------------------
        if (!animate) {

            for (let i = 0; i < images.length; i++) {

                if (rollObj.discardedIndex === i) {

                    images[i].style.opacity = "0.4";
                    images[i].style.filter = "grayscale(100%)";
                }
            }
        }

        const totalP = document.createElement('p');
        totalP.style.margin = "2px 0";
        diceContainer.appendChild(totalP);
    });
}

export function renderGameDice(
    container,
    rollObj,
    diceColour = "green",
    animate = false
) {

    container.innerHTML = "";

    const diceContainer = document.createElement("div");

    const images = [];

    rollObj.allRolls.forEach((val, index) => {

        const img = createDiceImage(
            diceColour,
            animate ? 1 : val
        );

        if (rollObj.discardedIndex === index) {
            img.style.opacity = "0.4";
            img.style.filter = "grayscale(100%)";
        }

        images.push(img);
        diceContainer.appendChild(img);
    });

    container.appendChild(diceContainer);

    if (animate) {
        animateDice(
            images,
            diceColour,
            rollObj.allRolls
        );
    }
}

// ---------------- Total display ----------------
function updateTotal(container, total, discarded) {
    let totalDiv = document.getElementById('diceTotal');
    if (!totalDiv) {
        totalDiv = document.createElement('p');
        totalDiv.id = 'diceTotal';
        container.appendChild(totalDiv);
    }
//    totalDiv.textContent = `You rolled... ${total}${discarded ? ` (Discarded: ${discarded})` : ""}`;
}