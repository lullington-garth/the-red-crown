// easyMode.js

export function showEasyMode(container, startNewGame) {

    container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.style.padding = "20px";
    wrapper.style.maxWidth = "675px";
    wrapper.style.margin = "0 auto";
    wrapper.style.textAlign = "center";
            wrapper.style.backgroundImage = "url('./images/paper1.jpg')";
            wrapper.style.boxShadow = "0 1px 20px rgba(0,0,0,0.5)";
            wrapper.style.border = "1px solid #555";
            wrapper.style.borderRadius = "10px";
            wrapper.style.padding = "20px";

    // Text
    const text = document.createElement("p");
    text.textContent = `Congratulations. You Win.`;
    text.style.fontSize = "32px";
    text.style.margin = "30px";

    wrapper.appendChild(text);

    // Image
    const img = document.createElement("img");
    img.src = "./mapImages/easyWin.jpg";
    img.style.width = "100%";
    img.style.maxWidth = "500px";
    img.style.height = "auto";
    img.style.display = "block";
    img.style.margin = "30px auto";
    img.style.mixBlendMode = "multiply";

    wrapper.appendChild(img);

        // Text
    const text1 = document.createElement("p");
    text1.textContent = `Ommadon hands you his crown.`;
    text1.style.fontSize = "22px";
    text1.style.margin = "30px";

    wrapper.appendChild(text1);

        // Text
    const text2 = document.createElement("p");
    text2.textContent = `You have completed Easy Mode.`;
    text2.style.fontSize = "22px";
    text2.style.margin = "30px";

    wrapper.appendChild(text2);

    // Start New Game button
    const btn = document.createElement("button");
    btn.textContent = "Start New Game";

    btn.style.display = "block";
    btn.style.margin = "30px auto";
    btn.style.width = "180px";
    btn.style.height = "40px";
    btn.style.backgroundColor = "#424141";
    btn.style.color = "#d7d4d4";
    btn.style.border = "1px solid #555";
    btn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "20px";

    btn.addEventListener("click", startNewGame);

    wrapper.appendChild(btn);

    container.appendChild(wrapper);
}
