// modal.js

export function scrollModalToTop() {
    modal.scrollTop = 0;
}

// ----------------------------------------
// CREATE MODAL ELEMENTS (once)
// ----------------------------------------

const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
overlay.style.display = "none";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.zIndex = "1000";

const modal = document.createElement("div");
modal.style.backgroundColor = "transparent";
modal.style.color = "#000";
modal.style.padding = "15px";
modal.style.borderRadius = "8px";
modal.style.width = "550px";
modal.style.maxHeight = "70vh";
modal.style.overflowY = "auto";
modal.classList.add("hide-scrollbar");
modal.style.boxShadow = "0 0 15px rgba(0,0,0,0.5)";
modal.style.position = "relative";
modal.style.backgroundImage = "url('images/paper.jpg')";
modal.style.backgroundSize = "cover";
modal.style.backgroundPosition = "center";

// Content container (IMPORTANT: replaces descriptionDiv)
const contentDiv = document.createElement("div");
contentDiv.innerHTML = "<em>Select something to view.</em>";

// Close button
const closeBtn = document.createElement("button");
//closeBtn.style.display = "none";
closeBtn.textContent = "X";
closeBtn.style.position = "absolute";
closeBtn.style.top = "8px";
closeBtn.style.right = "8px";
closeBtn.style.paddingBottom = "4px";
closeBtn.style.cursor = "pointer";
closeBtn.style.backgroundColor = "#424141";
closeBtn.style.color = "#d7d4d4";
closeBtn.style.border = "1px solid #555";
closeBtn.style.boxShadow = "0 1px 7px rgba(0,0,0,0.5)";
closeBtn.style.borderRadius = "50%";
closeBtn.style.width = "30px";
closeBtn.style.height = "30px";

closeBtn.addEventListener("click", closeModal);

// Assemble once
modal.appendChild(closeBtn);
modal.appendChild(contentDiv);
overlay.appendChild(modal);
document.body.appendChild(overlay);

// ----------------------------------------
// PUBLIC API
// ----------------------------------------

export function openModal() {
    overlay.style.display = "flex";
}

export function closeModal() {
    overlay.style.display = "none";
    modal.style.width = "550px";
    modal.style.height = "auto";
    hideModalCloseButton();
}

// Accepts HTML string OR DOM node
export function setModalContent(content) {
    contentDiv.innerHTML = "";

    if (typeof content === "string") {
        contentDiv.innerHTML = content;
    } else {
        contentDiv.appendChild(content);
    }
}

export function setModalWidth(width) {
    modal.style.width = width;
}

export function setModalHeight(height) {
    modal.style.height = height;
}

export function showModalCloseButton() {
    closeBtn.style.display = "block";
}

export function hideModalCloseButton() {
    closeBtn.style.display = "none";
}