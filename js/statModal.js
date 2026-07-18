// statModal.js

import { rollModal } from "./diceModals.js";

export function rollStatModal({
    item,
    statValue,
    dice = 1,
    rollMessage,
    onComplete
}) {
    rollModal({
        item,
        dice,
        rollMessage,
        onRollComplete: (rollTotal) => {

            const success = rollTotal <= statValue;

            onComplete({
                success,
                rollTotal,
                statValue
            });
        }
    });
}