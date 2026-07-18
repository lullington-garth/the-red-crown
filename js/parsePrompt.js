// parsePrompt.js

export function parsePrompt(lines) {
    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith("prompt:")) {
            return trimmed.split("prompt:")[1].trim();
        }
    }

    return null;
}