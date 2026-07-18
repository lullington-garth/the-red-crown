// overlayConfirm.js

export function showConfirmOverlay(message, {
    onConfirm,
    onCancel
}) {
    const overlay = document.createElement("div");

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

    const container = document.createElement("div");
    container.style.background = "#1e1e1e";
    container.style.color = "#fff";
    container.style.padding = "20px";
    container.style.borderRadius = "10px";
    container.style.textAlign = "center";
    container.style.maxWidth = "420px";
    container.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";

    container.innerHTML = `
        <h3>Confirm</h3>

        <p style="font-size:14px; line-height:1.4;">
            ${message}
        </p>

        <div style="display:flex; gap:10px; justify-content:center; margin-top:15px;">
            <button id="cancelBtn" style="
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
                Go Back
            </button>

            <button id="confirmBtn" style="
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
                Continue
            </button>
        </div>
    `;

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Cancel
    container.querySelector("#cancelBtn").addEventListener("click", () => {
        overlay.remove();
        if (onCancel) onCancel();
    });

    // Confirm
    container.querySelector("#confirmBtn").addEventListener("click", () => {
        overlay.remove();
        if (onConfirm) onConfirm();
    });
}