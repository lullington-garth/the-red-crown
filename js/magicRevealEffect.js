// magicRevealEffect.js

export function runMagicRevealEffect({
    textElement,
    imageElement,
    oldText = "",
    finalText = "",
    finalImage = "",
    baseColor = "transparent",
    onComplete
}) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*";

    function hexToHsl(hex) {

        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        }
        else {

            const d = max - min;

            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {

                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                case g:
                    h = (b - r) / d + 2;
                    break;

                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [h, s, l];
    }

    function hslToHex(h, s, l) {

        function hue2rgb(p, q, t) {

            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

            return p;
        }

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        }
        else {

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        const toHex =
            (x) => Math.round(x * 255).toString(16).padStart(2, "0");

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    const [h, s, l] = hexToHsl(baseColor);

    const magicColours = Array.from({ length: 6 }, (_, i) => {

        const variation =
            (i - 3) * 0.06; // small drift around base

        return hslToHex(
            h,
            Math.min(1, Math.max(0, s + variation)),
            Math.min(1, Math.max(0, l + variation))
        );
    });

    function getRandomImage() {

        const number =
            Math.floor(Math.random() * 143) + 1;

        const padded =
            String(number).padStart(4, "0");

        return `images/${padded}.jpg`;
    }

    const finalColour =
        magicColours[
            Math.floor(Math.random() * magicColours.length)
        ];

    const longestLength =
        Math.max(oldText.length, finalText.length);

    let resolvedCount = 0;

    const interval = setInterval(() => {

        let output = "";

        for (let i = 0; i < longestLength; i++) {

            if (i < resolvedCount) {

                output += finalText[i] || "";

            }
            else {

                output += chars[
                    Math.floor(Math.random() * chars.length)
                ];
            }
        }

        textElement.textContent = output;

        textElement.style.color =
            magicColours[
                Math.floor(Math.random() * magicColours.length)
            ];

        if (imageElement) {

            imageElement.src = getRandomImage();

        }

        resolvedCount++;

        if (resolvedCount > longestLength) {

            clearInterval(interval);

            textElement.textContent = finalText;

            textElement.style.color = finalColour;

            if (imageElement) {

                imageElement.src = finalImage;

            }

            if (onComplete) {
                onComplete();
            }
        }

    }, 90);
}