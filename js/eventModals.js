// eventModals.js
import { setModalContent, openModal, closeModal } from "./modal.js";
import { showItemDescription } from "./inventoryUI.js";

export function showWrongChamberChoiceModal({
    variant,
    onRoll
}) {

    const config = {

        ice: {
            image: "ice.jpg",
            title: "Ice Wall",
            text: `
                You raise a shield in one hand and your sword in the other as you approach the barrier.
                <br><br>

                Roll two dice. This is the number of shards you shatter as you blunder your way through the barrier.
                <br>
                Each shard you shatter costs you 1 STAMINA point.
            `,
            button: "Enter the Wall"
        },

        lava: {
            image: "lava.jpg",
            title: "Lava Blast",
            text: `
                Lava bursts from the fissure setting your robes alight.
                <br><br>

                Roll two dice. This is the amount of STAMINA you lose to burning.
            `,
            button: "Lava Damage"
        },

        fall: {
            image: "fall.jpg",
            title: "Fall Damage",
            text: `
                Falling....
                <br><br>
                Falling....
                <br><br>
                Falling....
                <br><br>

                Roll two dice. This is the amount of STAMINA you lose to falling.
            `,
            button: "Fall Damage"
        }
    };

    const data = config[variant] ?? config.ice;

    const container = document.createElement("div");

    container.innerHTML = `
        <div style="text-align:center;">

            <img
                src="images/${data.image}"
                style="
                    width:100px;
                    margin-bottom:15px;
                    mix-blend-mode: multiply;
                "
            />

            <h2>${data.title}</h2>

            <p style="
                line-height:1.6;
                margin-bottom:25px;
            ">
                ${data.text}
            </p>

            <button id="wrongChamberBtn"
                style="
                    background:#424141;
                    color:#d7d4d4;
                    border:1px solid #555;
                    box-shadow:0 1px 7px rgba(0,0,0,0.5);
                    padding:10px 18px;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                ${data.button}
            </button>

        </div>
    `;

    const button =
        container.querySelector("#wrongChamberBtn");

    button.addEventListener("click", () => {

        closeModal();

        if (onRoll) {
            onRoll();
        }
    });

    setModalContent(container);
    openModal();
}


export function showHandOfDespairResultModal({
    variant,
    success,
    currentRound,
    roundCount,
    isLastRound,
    remainingStamina,
    onContinue

}) {

    const container = document.createElement("div");
    const itemImage =
        variant === "helm"
            ? "0031.jpg"
            : "0131.jpg";

    const image =
        success
            ? itemImage
            : "handOfDespair.jpg";

    const protectionItem =
    variant === "helm"
        ? "The Helm of True Focus"
        : "The Stoneheart Glyph";


    const message =
        success
            ? `
                <h3>
                    Round ${currentRound} of ${roundCount}
                </h3>
                <strong>SUCCESS!</strong>
                <br><br>
                ${protectionItem} helps you keep the darkness at bay.
            `
            : `
                <strong>FAILURE!</strong>
                <br><br>
                Despair seeps into your mind.
                <br><br>
                LOSE 2 STAMINA
                <br>
                REMAINING STAMINA:
                ${remainingStamina}
            `;

    const buttonText =
        isLastRound
            ? "Continue"
            : "Next Round";

    container.innerHTML = `
        <div style="text-align:center;">

            <img
                src="images/${image}"
                style="
                    width:100px;
                    margin-bottom:20px;
                    mix-blend-mode: multiply;
                "
            />

            <p style="
                line-height:1.6;
                margin-bottom:25px;
            ">
                ${message}
            </p>

            <button id="despairResultBtn"
                style="
                    background:#424141;
                    color:#d7d4d4;
                    border:1px solid #555;
                    box-shadow:0 1px 7px rgba(0,0,0,0.5);
                    padding:10px 18px;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                ${buttonText}
            </button>

        </div>
    `;

    const btn =
        container.querySelector("#despairResultBtn");

    btn.addEventListener("click", () => {

        closeModal();

        if (onContinue) {
            onContinue();
        }
    });

    setModalContent(container);
    openModal();
}

export function showHandOfDespairVictoryModal({
    variant,
    remainingStamina,
    onContinue
}) {

    const image =
    variant === "helm"
        ? "0031.jpg"
        : "0131.jpg";

    const protectionItem =
    variant === "helm"
        ? "The Helm of True Focus loosens on your head"
        : "The Stoneheart Glyph grows cool once more";

    const container = document.createElement("div");

    container.innerHTML = `
        <div style="text-align:center;">

            <img
                src="images/${image}"
                style="
                    width:100px;
                    margin-bottom:20px;
                    mix-blend-mode: multiply;
                "
            />

            <h2>Victory</h2>

            <p style="
                line-height:1.6;
                margin-bottom:25px;
            ">
                You survived the Hand of Despair.
                <br><br>

                Remaining STAMINA:
                <strong>${remainingStamina}</strong>
                <br><br>

                The darkness recedes from your thoughts. 
                ${protectionItem} as
                Ommadon's influence fades.
                <br><br>

                You leave the darkness behind and continue
                your journey.
            </p>

            <button id="despairVictoryBtn"
                style="
                    background:#424141;
                    color:#d7d4d4;
                    border:1px solid #555;
                    box-shadow:0 1px 7px rgba(0,0,0,0.5);
                    padding:10px 18px;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                Continue
            </button>

        </div>
    `;

    const btn =
        container.querySelector("#despairVictoryBtn");

    btn.addEventListener("click", () => {

        closeModal();

        if (onContinue) {
            onContinue();
        }
    });

    setModalContent(container);
    openModal();
}

export function showChooseContractTimedModal({
    playerStats,
    onChoose,
    onTimeout,
    attachTimer
}) {

    const wizardName = playerStats?.wizardName ?? "traveller";
    const container = document.createElement("div");

    const warningDiv = document.createElement("div");
    warningDiv.style.margin = "10px";
    warningDiv.style.marginTop = "20px";
    warningDiv.style.minHeight = "30px";
    warningDiv.style.color = "#424141";
    warningDiv.style.fontWeight = "bold";
    warningDiv.style.fontSize = "20px";
    warningDiv.style.textAlign = "center";   

    const timerDiv = document.createElement("div");
    timerDiv.style.fontSize = "100px";
    timerDiv.style.textAlign = "center";
    timerDiv.style.fontWeight = "bold";
    timerDiv.style.marginBottom = "20px";
    timerDiv.style.color = "#424141";
    
    const buttonRow = document.createElement("div");
    buttonRow.style.display = "flex";
    buttonRow.style.justifyContent = "center";
    buttonRow.style.gap = "10px";
    buttonRow.style.marginBottom = "10px";

    const makeBtn = (label, contractId) => {
        const btn = document.createElement("button");
        btn.textContent = label;
            btn.style.backgroundColor = "#424141";
            btn.style.color = "#d7d4d4";
            btn.style.border = "1px solid #555";
            btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            btn.style.padding = "6px 10px";
            btn.style.border = "none";
            btn.style.borderRadius = "6px";
            btn.style.cursor = "pointer";
            btn.style.height = "40px";
            btn.style.fontSize = "18px";

        btn.addEventListener("click", () => {
            stopTimer();
            closeModal();
            onChoose(contractId, () => {});
        });

        return btn;
    };

    buttonRow.appendChild(makeBtn("Contract 1", "contract1"));
    buttonRow.appendChild(makeBtn("Contract 2", "contract2"));
    buttonRow.appendChild(makeBtn("Contract 3", "contract3"));
    
    const scroll = document.createElement("div");
    scroll.style.maxHeight = "200px";
    scroll.style.overflowY = "auto";
    scroll.style.border = "1px solid #333";
    scroll.style.padding = "10px";
    scroll.style.marginTop = "10px";
    scroll.classList.add("hide-scrollbar");

    scroll.innerHTML = `
            <img
                src="images/scrollOpen.jpg"
                style="
                    width:100px;
                    margin-bottom:0px;
                    mix-blend-mode: multiply;
                "
            />
        <h3>Contract 1</h3>
        <p><strong>Instrument of Mortal Contingency, Restoration, and Consideration</strong><br><br>

Be it known that this Agreement is entered into, witnessed, and made binding between the Infernal Party hereinafter referred to as <strong>the Supplier</strong>, and ${wizardName}, hereinafter referred to as <strong>the Recipient</strong>.<br><br>

Whereas the Recipient has freely elected to acquire the item designated by the Supplier as The Ring of Resurrection; and<br><br>

Whereas the Supplier is willing to extend certain extraordinary protections against the otherwise final consequences of mortal peril;<br><br>

Now therefore, the Supplier hereby grants to the Recipient possession and beneficial use of one (1) ring possessing restorative properties of a singular and exceptional nature. The protections afforded herein shall remain dormant until such time as they become necessary and shall require no invocation, declaration, petition, prayer, or other deliberate act on the part of the Recipient.<br><br>

In the event that the Recipient suffers cessation of life arising directly from a combat engagement, martial encounter, duel, battle, skirmish, ambush, or comparable hostile exchange, the ring shall immediately and automatically discharge the entirety of its reserved provision. Upon such discharge, the Recipient shall be restored to life, returned to a living state, and re-established in possession of physical vitality equivalent to one-half of the maximum endurance, stamina, or life force to which the Recipient would otherwise be entitled at the time of restoration.<br><br>

The Recipient acknowledges that such protections are not provided without consideration. Accordingly, the Supplier reserves and exercises the right to amend, diminish, recalibrate, and permanently adjust the quantity and measure of the Recipient's inherent vitality. Following said adjustment, the Recipient's recognised Stamina shall be deemed, recorded, and maintained as Six (6).<br><br>

Upon execution of this Agreement and transfer of the aforementioned ring, all obligations shall be considered fulfilled, all balances settled, and all dealings concluded.<br><br>

Signed and entered into the Infernal Ledger under seal and eternal authority,<br><br>

<strong>The Supplier</strong></p><hr>

            <img
                src="images/scrollOpen.jpg"
                style="
                    width:100px;
                    margin-bottom:0px;
                    mix-blend-mode: multiply;
                "
            />

        <h3>Contract 2</h3>
        <p><strong>Instrument of Transfer and Consideration</strong><br><br>

Let it be known that this Agreement is entered into freely and without coercion between the undersigned Infernal Benefactor, hereinafter referred to as <strong>the Supplier</strong>, and ${wizardName}, hereinafter referred to as <strong>the Recipient</strong>.<br><br>

Whereas the Recipient has elected to participate in the opportunity designated and described by the Supplier as The Devil's Hoard; and<br><br>

Whereas the Supplier possesses certain goods, artefacts, curiosities, treasures, relics, and other items of material or mystical value currently maintained within said Hoard;<br><br>

Now therefore, in consideration of the mutual undertakings herein described, the Supplier grants unto the Recipient the irrevocable right to select and claim ownership of one (1) item of the Recipient's choosing from among the contents of the aforementioned Hoard. Such transfer shall be deemed final upon selection and shall remain binding in perpetuity upon all parties, successors, heirs, manifestations, incarnations, and associated entities.<br><br>

The Recipient acknowledges that all benefits conveyed under this Agreement are subject to customary balancing adjustments as determined solely by the Supplier. Accordingly, the Recipient consents to a revision, amendment, moderation, reduction, limitation, recalibration, or other alteration of those favourable circumstances commonly recognised as chance, providence, fortune, destiny, serendipity, luck, or analogous concepts. For the avoidance of doubt, such fortune shall henceforth be recognised, recorded, and maintained at a value of Four (4).<br><br>

No further obligations shall be imposed by either party following execution of this Agreement. Upon completion of the transfer described herein, all accounts shall be considered settled, all considerations exchanged, and all dealings concluded.<br><br>

Signed and witnessed beneath the gaze of powers ancient and eternal,<br><br>

<strong>The Supplier</strong></p><hr>

            <img
                src="images/scrollOpen.jpg"
                style="
                    width:100px;
                    margin-bottom:0px;
                    mix-blend-mode: multiply;
                "
            />
            
        <h3>Contract 3</h3>
        <p><strong>Instrument of Conditional Endowment and Reciprocal Consideration</strong><br><br>

Let it be recorded that this Agreement is entered into and executed between the Infernal Authority hereinafter designated <strong>the Supplier</strong>, and ${wizardName}, hereinafter designated <strong>the Recipient</strong>.<br><br>

Whereas the Recipient has voluntarily elected to receive the consideration known and described by the Supplier as The Ring of Fate; and<br><br>

Whereas the Supplier is both willing and able to convey certain privileges associated with said item, subject to the terms and limitations herein contained;<br><br>

Now therefore, the Supplier hereby grants possession, custody, and beneficial use of one (1) ring of unusual and otherwise indeterminate properties. The Recipient shall retain all rights of ownership thereto, provided the item remains upon their person and is worn in a manner reasonably consistent with its intended purpose.<br><br>

The Recipient further acknowledges that, while so worn, the ring shall confer a limited corrective entitlement in circumstances involving uncertainty, hazard, judgement, fortune, or comparable tests of capability. Specifically, on one occasion where an attempted undertaking has failed to achieve its required outcome through no fault of the governing rules or instruments involved, the Recipient may elect to set aside that outcome and submit the matter to a second determination. Such entitlement shall not extend to martial engagements, acts of combat, or any contest in which blades, claws, spells, projectiles, or equivalent hostilities are presently exchanged.<br><br>

In consideration for the foregoing, the Recipient grants the Supplier full authority to review, amend, recalibrate, and permanently adjust those qualities relating to aptitude, proficiency, competence, expertise, or martial capability. Following such adjustment, the Recipient's recognised Skill shall be deemed, entered, and maintained as Seven (7).<br><br>

Upon execution of these terms, all obligations shall be considered satisfied, all accounts balanced, and all dealings concluded.<br><br>

Signed and sealed under infernal authority,<br><br>

<strong>The Supplier</strong>
</p>
    `;

    container.appendChild(timerDiv);
    container.appendChild(buttonRow);
    container.appendChild(warningDiv);
    container.appendChild(scroll);

    let stopped = false;

    const stopTimer = () => {
        stopped = true;
    };

    const formatTime = (seconds) => {

        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    let lastPulseSecond = null;

    const applyTimerEffects = (time) => {

        // 20 seconds → turn red
        if (time <= 20) {
            timerDiv.style.color = "#000000";
        } else {
            timerDiv.style.color = "#424141";
        }

        // 15 seconds → glowing effect
        if (time <= 15) {
            timerDiv.style.textShadow =
                "0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)";
        } else {
            timerDiv.style.textShadow = "none";
        }

        // 10 seconds → pulse every second
        if (time <= 10) {

            // ensure once per second (prevents multiple triggers in same second)
            if (lastPulseSecond !== time) {
                lastPulseSecond = time;

                timerDiv.animate(
                    [
                        { transform: "scale(1)" },
                        { transform: "scale(1.12)" },
                        { transform: "scale(1)" }
                    ],
                    {
                        duration: 250,
                        easing: "ease-out"
                    }
                );
            }
        }
    };

    const updateUI = (time) => {
        timerDiv.textContent = formatTime(time);
        applyTimerEffects(time);
    };

    const triggerWarning = (text) => {
        warningDiv.textContent = text;
    };

    updateUI(60);
    attachTimer(updateUI, triggerWarning);

    setModalContent(container);
    openModal();

}

export function showLoseHorseModal({
    playerStats,
    onComplete
}) {

    const inv = playerStats.inventory;
    const getCapacityLimit = () => {

        let limit = 8;

        const wornItems =
            Object.values(
                inv.wornItems || {}
            ).filter(Boolean);

        const hasBackPack =
            wornItems.some(item =>
                item.id === "0046"
            );

        if (hasBackPack) {
            limit += 3;
        }

        return limit;
    };

    const getUsedSlots = () => {

        return inv.carriedItems.reduce((total, item) => {

            return total + (item["inventory-slots"] ?? 1);

        }, 0);
    };

    const getExcess = () =>
    getUsedSlots() - getCapacityLimit();

    const getDiscardableItems = () => {

        return inv.carriedItems.filter(item =>

            (item["inventory-slots"] ?? 1) > 0 &&
            item["can-discard"] !== false
        );
    };

    const container = document.createElement("div");

    const titleRow = document.createElement("div");

    titleRow.style.display = "flex";
    titleRow.style.alignItems = "center";
    titleRow.style.gap = "10px";
    titleRow.style.marginBottom = "10px";

    const horseImage = document.createElement("img");
    const horseName = playerStats.horseName

    horseImage.src = `images/${horseName}.jpg`;
    horseImage.style.width = "100px";
    horseImage.style.height = "100px";
    horseImage.style.objectFit = "contain";
    horseImage.style.mixBlendMode = "multiply";

    const title = document.createElement("h2");
    title.textContent = "Your Horse is Lost";
    title.style.margin = "0";

    titleRow.appendChild(horseImage);
    titleRow.appendChild(title);

    const info = document.createElement("p");

    const updateInfo = () => {
        const excess = getExcess();

        if (excess > 0) {
            info.innerHTML = `
                You now only have available
<strong>${getCapacityLimit()} inventory slots</strong>.<br>(Worn equipment is unaffected).<br><br>
                You must clear <strong>${excess}</strong> slot${excess === 1 ? "" : "s"}.
            `;
        } else {
            info.innerHTML = `
                <h3>You are within your carrying limit.</h3>
                You do not need to discard any items.
            `;
        }
    };

    const list = document.createElement("div");
    list.style.marginTop = "15px";
    list.style.height = "400px";
    list.style.overflowY = "auto";
    list.style.border = "1px solid #333";
    list.style.borderRadius = "6px";
    list.style.padding = "10px";
    list.classList.add("hide-scrollbar");

    const updateUI = () => {

        list.innerHTML = "";
        updateInfo();

    getDiscardableItems().forEach(item => {

            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.justifyContent = "space-between";
            row.style.alignItems = "flex-start";
            row.style.gap = "10px";

            row.style.borderBottom = "1px solid #3b3a3a";
            row.style.paddingBottom = "10px";
            row.style.marginBottom = "10px";

            const itemDisplay =
                showItemDescription(
                    item,
                    playerStats,
                    { compact: true }
                );

            const slots = item["inventory-slots"] ?? 1;

            itemDisplay.style.flex = "1";
            itemDisplay.style.marginRight = "10px";

            const btn = document.createElement("button");
            btn.textContent = `Discard (${slots} slot${slots === 1 ? "" : "s"})`;
            btn.style.backgroundColor = "#424141";
            btn.style.color = "#d7d4d4";
            btn.style.border = "1px solid #555";
            btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
            btn.style.borderRadius = "4px";
            btn.style.padding = "4px 8px";
            btn.style.cursor = "pointer";
            btn.style.flexShrink = "0";
            btn.style.marginTop = "4px";
            btn.style.width = "70px";

            btn.addEventListener("click", () => {

                const actualIndex =
                    inv.carriedItems.indexOf(item);

                if (actualIndex !== -1) {
                    inv.carriedItems.splice(actualIndex, 1);
                }

                updateUI();
                checkDone();
            });

            row.appendChild(itemDisplay);

            const checkExcess = getExcess();
            if (checkExcess > 0){row.appendChild(btn);}

            list.appendChild(row);
        });
    };

    const checkDone = () => {
        const excess = getExcess();

        const isLocked = excess > 0;

        continueBtn.disabled = isLocked;

        continueBtn.style.opacity = isLocked ? "0.4" : "1";
        continueBtn.style.cursor = isLocked ? "not-allowed" : "pointer";
        continueBtn.style.transform = isLocked ? "none" : "scale(1.02)";

        updateInfo();
    };

    const continueBtn = document.createElement("button");
    continueBtn.textContent = "Continue Journey";
    continueBtn.disabled = true;

    continueBtn.style.marginTop = "15px";
    continueBtn.style.backgroundColor = "#424141";
    continueBtn.style.color = "#d7d4d4";
    continueBtn.style.border = "1px solid #555";
    continueBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    continueBtn.style.padding = "10px 18px";
    continueBtn.style.borderRadius = "8px";
    continueBtn.style.cursor = "not-allowed";
    continueBtn.style.opacity = "0.4";
    continueBtn.style.transition = "opacity 0.2s ease, transform 0.1s ease";

    continueBtn.addEventListener("click", () => {

        closeModal();

        if (onComplete) {
            onComplete();
        }
    });

    container.appendChild(titleRow);
    container.appendChild(info);
    container.appendChild(list);
    container.appendChild(continueBtn);

    const refresh = () => {
        updateUI();
        checkDone();
    };

    setModalContent(container);
    openModal();

    refresh();
}

export function showSacrificeItemModal({
    variant
}) {

    const config = {

        magical: {
            image: "magicAttack.jpg",
            title: "Magical Sacrifice",
            text:
                "Choose a magical item to sacrifice."
        },

        nonMagical: {
            image: "0046.jpg",
            title: "Sacrifice Item",
            text:
                "Choose a non-magical item to sacrifice."
        },

        cursed: {
            image: "skull.jpg",
            title: "Dark Sacrifice",
            text:
                "Choose a cursed item to sacrifice."
        }
    };

    const data =
        config[variant] ??
        config.magical;

    const container =
        document.createElement("div");

    container.innerHTML = `
        <div style="text-align:center;">

            <img
                src="images/${data.image}"
                style="
                    width:90px;
                    height:90px;
                    margin-bottom:15px;
                "
            />

            <h2>${data.title}</h2>

            <p>
                ${data.text}
            </p>

        </div>
    `;

    setModalContent(container);
    openModal();
}