// itemOverlay.js

let activeItemOverlay = null;

export function showItemOverlay(item, message, onClose) {
    if (activeItemOverlay) return;
    const overlay = document.createElement("div");
    activeItemOverlay = overlay;

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.6)";
    overlay.style.zIndex = "100000";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    const imageSize = item["display-size"] === "large" ? 420 : 120;

    const container = document.createElement("div");
//    container.style.background = "#1e1e1e";
    container.style.color = "#000";
    container.style.padding = "20px";
    container.style.borderRadius = "10px";
    container.style.textAlign = "left";
    container.style.maxWidth = "420px";
    container.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
    container.style.backgroundImage = "url('images/paper.jpg')";

    container.innerHTML = `
        <img src="images/${item.image}" 
            style="
                display:block;
                width:${imageSize}px;
                margin:0 auto 10px auto;
                mix-blend-mode:multiply;
            " />

        <h3 style="text-align: center;">${item.item}</h3>

        <p style="font-size:16px; line-height:1.4; text-align:center;">
            ${message}
        </p>

        <button id="closeOverlayBtn" style="
            display:block;
            margin:15px auto 0 auto;
            background:#424141;
            color:#d7d4d4;
            padding:10px 16px;
            border:1px solid #555;
            box-shadow:0 1px 7px rgba(0,0,0,0.5);
            border-radius:8px;
            cursor:pointer;
        ">
            Close
        </button>
    `;

    overlay.appendChild(container);
    document.body.appendChild(overlay);
    container.querySelectorAll("img").forEach(img => {
        img.style.mixBlendMode = "multiply";
    });

    container.querySelector("#closeOverlayBtn").addEventListener("click", () => {
        overlay.remove();
        activeItemOverlay = null;

        if (typeof onClose === "function") {
            onClose();
        }
    });
}