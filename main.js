const startNewGame = document.querySelector(".start-new");
const display = document.querySelector(".display");
const reset = document.querySelector(".reset");

//false means draw on hover
let drawOnHoverAndPress = false;
const drawMode1 = document.querySelector("input[value='-1']");
const drawMode2 = document.querySelector("input[value='1']");

let colorful = false;
const colorMode1 = document.querySelector("input[value='-2']");
const colorMode2 = document.querySelector("input[value='2']");

const erase = document.querySelector("#erase");
const eraseBtn = document.querySelector(".erase-label");
const eraseAllBtn = document.querySelector(".erase-all-btn");
let eraseOnHoverAndPress = false;
let isErasing = false;
const eraseMode1 = document.querySelector("input[value='-3']");
const eraseMode2 = document.querySelector("input[value='3']");

let isMouseDown = false;
let mouseHover = true;
let colorGray = true;
let mouseHoverErase = true;

let size = null;


//Number greater than 0 returns true and vice versa
function Bool(int) {
    return (int > 0) ? true : false;
}

function startNew() {
    size = null;
    display.textContent = "";
    while (!(1 <= size && size <= 100)) {
        size = prompt("What is the size you want? Enter a number from 1 to 100. Enter stop to break");
        if (size == "stop") break;
    }
    if (1 <= size && size <= 100) {
        size = +size;
        for (let i = 1; i <= size*size; i++) {
            const pixel = document.createElement("li");
            pixel.classList.add("pixel");
            pixel.style.width = `calc((100% - ${(size - 1)*2}px)/${size})`;
            display.appendChild(pixel);
        }
    }
}

function checkEraseMode() {
    if (erase.checked) {
        isErasing = true;
    } else {
        isErasing = false;
    }
}

function clear() {
    display.textContent = "";
}

startNewGame.addEventListener("click", startNew);

drawMode1.addEventListener("click", () => drawOnHoverAndPress = false);
drawMode2.addEventListener("click", () => drawOnHoverAndPress = true);

eraseMode1.addEventListener("click", () => eraseOnHoverAndPress = false);
eraseMode2.addEventListener("click", () => eraseOnHoverAndPress = true);

erase.addEventListener("change", checkEraseMode)

eraseAllBtn.addEventListener("click", () => {
    display.childNodes.forEach(item => item.style.backgroundColor = "#fbf2c4");
});

reset.addEventListener("click", clear);

display.addEventListener("mousedown", (e) => {
    if (!(isMouseDown) && e.target.classList.contains("pixel")) {
        isMouseDown = true;
        e.preventDefault();
        if (!isErasing) {
            e.target.style.backgroundColor = "#c7522a";
        } else {
            e.target.style.backgroundColor = "#fbf2c4";
        }
    }
});

document.addEventListener("mouseup", (e) => {
    if (isMouseDown) {
        isMouseDown = false;
    }
});

display.addEventListener("mouseover", (e) => {
    if (!drawOnHoverAndPress && !isErasing) {
        if (e.target.classList.contains("pixel")) {
            e.target.style.backgroundColor = "#c7522a";
        }
    } else if (drawOnHoverAndPress && !isErasing && isMouseDown) {
        if (e.target.classList.contains("pixel")) {
            e.target.style.backgroundColor = "#c7522a";
        }
    } else if (isErasing && !eraseOnHoverAndPress) {
        if (e.target.classList.contains("pixel")) {
            e.target.style.backgroundColor = "#fbf2c4";
        }
    } else if (isErasing && eraseOnHoverAndPress && isMouseDown) {
        if (e.target.classList.contains("pixel")) {
            e.target.style.backgroundColor = "#fbf2c4";
        }
    }
});