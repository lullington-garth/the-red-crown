export function parseImages(lines, header) {
    const images = [];
    let current = null;

    for (const rawLine of lines) {
        const line = rawLine.replace(/\r/g, "");

        if (line.trim() === header) continue;

        if (line.trim().startsWith("-")) {

            if (current && current.name) {
                current.name = current.name.replace(/\r/g, "").trim();

                if (current.place) {
                    current.place = current.place.trim();
                }

                images.push(current);
            }

            current = {};

            const inline = line.trim().slice(1).trim();

            if (inline.startsWith("name:")) {
                current.name = inline.split("name:")[1].trim().replace(/\r/g, "");
            }

            if (inline.startsWith("place:")) {
                current.place = inline.split("place:")[1].trim().replace(/\r/g, "");
            }

            if (inline.startsWith("shadow:")) {
                current.shadow = inline
                    .split("shadow:")[1]
                    .trim()
                    .toLowerCase() === "true";
            }

            continue;
        }

        if (!current) continue;

        if (line.trim().startsWith("name:")) {
            current.name = line
                .split("name:")[1]
                .trim()
                .replace(/\r/g, "");
        }

        if (line.trim().startsWith("place:")) {
            current.place = line.split("place:")[1].trim();
        }

        if (line.trim().startsWith("shadow:")) {
            current.shadow = line
                .split("shadow:")[1]
                .trim()
                .toLowerCase() === "true";
        }        
    }

    if (current && current.name) {
        current.name = current.name.replace(/\r/g, "").trim();
        images.push(current);
    }

    return images;
}