// statChecks.js
import { renderPlayerDice } from './diceUI.js';
import { showStats } from './statsUI.js';
import { diceFlow } from './diceFlow.js';

const STAT_CONFIG = {
    SKILL:   { dice: 2 },
    LUCK:    { dice: 2 },
    MAGIC:   { dice: 2 },
    STAMINA: { dice: 3 }
};

export function showStatCheckUI(container, playerStats) {

    // Clear old
    const old = document.getElementById('statCheckContainer');
    if (old) old.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'statCheckContainer';
    wrapper.style.marginTop = "20px";

    const title = document.createElement('h3');
    title.textContent = "Stat Checks (Test Mode)";
    wrapper.appendChild(title);

    const diceResultDiv = document.createElement('div');
    diceResultDiv.style.marginTop = "15px";
    wrapper.appendChild(diceResultDiv);

    Object.keys(STAT_CONFIG).forEach(stat => {

        // White button
        createButton(stat, false);

        // Black (Devil) button
        createButton(stat, true);
    });

    function createButton(stat, devilsDice) {

        const btn = document.createElement('button');
        btn.textContent = devilsDice ? `${stat} (Devil)` : stat;
        btn.style.marginRight = "5px";
        btn.style.marginBottom = "5px";

        if (devilsDice) {
            btn.style.backgroundColor = "black";
            btn.style.color = "white";
        }

        btn.addEventListener('click', () => {
            runStatCheck(stat, devilsDice);
        });

        wrapper.appendChild(btn);
    }

function runStatCheck(stat, devilsDice) {

    diceResultDiv.innerHTML = "";

    const rollResult = diceFlow({ stat, playerStats, devilsDice });

    renderPlayerDice(diceResultDiv, rollResult.roll, () => {

        const { success, finalTotal, statValue } = resolveStatCheck(stat, rollResult.rollTotal);

        const resultText = document.createElement('p');

        if (success) {
            resultText.textContent = `PASS (${finalTotal} ≤ ${statValue})`;
            resultText.style.color = "green";
        } else {
            resultText.textContent = `FAIL (${finalTotal} > ${statValue})`;
            resultText.style.color = "red";
        }

        diceResultDiv.appendChild(resultText);

        // Still handle UI updates here
        if (stat === "LUCK") {
            const statsContainer = document.getElementById('playerStatsContainer');
            if (statsContainer) {
                showStats(statsContainer, playerStats);
            }
        }
    });
}

    container.appendChild(wrapper);
}

export function resolveStatCheck(stat, rollTotal, session, playerStats) {

    const statValue = playerStats.stats[stat].current;

    let finalTotal = rollTotal;

    if (session.forceLucky && stat === "LUCK") {
        finalTotal = 0;
    }

    if (stat === "LUCK") {
        playerStats.stats.LUCK.current -= 1;

        // optional safety clamp (you had this in one path before)
        if (playerStats.stats.LUCK.current < playerStats.stats.LUCK.min) {
            playerStats.stats.LUCK.current = playerStats.stats.LUCK.min;
        }
    }

    return {
        success: finalTotal <= statValue,
        rollTotal: finalTotal,
        statValue
    };
}

export function resolveStatName(statKey, playerStats) {

    if (!statKey) return null;

    // Direct stat
    if (playerStats.stats?.[statKey]) {
        return statKey;
    }

    // Special mapping
    if (statKey === "ETHOSother") {
        return playerStats.absentBrotherEthos;
    }

    if (statKey === "ETHOS") {
        return playerStats.visitingBrotherEthos;
    }

    if (statKey === "ETHOSown") {
        return playerStats.replenishStat;
        console.log(playerStats.replenishStat)
    }

    return null;
}