// coverScreen.js

export function showCoverScreen(container, onContinue) {
    container.innerHTML = "";

function applyPortraitMode() {

    const gameDiv = document.getElementById('game');
    if (!gameDiv) return;

        gameDiv.style.width = "100vw";
        gameDiv.style.maxWidth = "820px";

        gameDiv.style.aspectRatio = "3 / 4";
        gameDiv.style.height = "auto";
        gameDiv.style.margin = "0";
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