// coverScreen.js

export function showCoverScreen(container, onContinue) {
    container.innerHTML = "";

function applyPortraitMode() {

    const gameDiv = document.getElementById('game');
    if (!gameDiv) return;

        gameDiv.style.width = "min(650px, 100vw)";
        gameDiv.style.height = "calc(min(650px, 100vw) * 4 / 3)";
        gameDiv.style.margin = "0 auto";
        gameDiv.style.overflowY = "auto";
        gameDiv.style.overflowX = "hidden";
        gameDiv.style.border = "1px solid #444";
        gameDiv.style.padding = "0px";
        gameDiv.style.borderRadius = "30px";
        document.body.style.backgroundColor = "black";

}

// 👇 APPLY ON START
applyPortraitMode();

    const wrapper = document.createElement("div");
    wrapper.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = "images/theRedCrown.jpg";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";
    img.style.cursor = "pointer";
    img.style.mixBlendMode = "multiply";

    img.addEventListener("click", () => {
        onContinue();
    });

    wrapper.appendChild(img);

    container.appendChild(wrapper);
}