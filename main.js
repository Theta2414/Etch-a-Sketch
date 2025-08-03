const startNewGame = document.querySelector(".start-new");
const display = document.querySelector(".display");
const reset = document.querySelector(".reset");

//false means draw on hover
let drawOnPressAndHold = false;
const drawMode1 = document.querySelector("input[value='-1']");
const drawMode2 = document.querySelector("input[value='1']");

let color = "#000000ff";
let isColorful = false;
const colorMode1 = document.querySelector("input[value='-2']");
const colorMode2 = document.querySelector("input[value='2']");
const customColor = document.querySelector("input[type='color']");

const erase = document.querySelector("#erase");
const eraseBtn = document.querySelector(".erase-label");
const eraseAllBtn = document.querySelector(".erase-all-btn");
let eraseOnPressAndHold = false;
let isErasing = false;
const eraseMode1 = document.querySelector("input[value='-3']");
const eraseMode2 = document.querySelector("input[value='3']");

let isMouseDown = false;

let size = null;


//Number greater than 0 returns true and vice versa
function Bool(int) {
    return (int > 0) ? true : false;
}

function startNew() {
    size = null;
    display.textContent = "";
    while (!(1 <= size && size <= 100)) {
        size = prompt("What is the size you want? Enter a number from 1 to 100. Enter stop to break. 10-40 to get best experience");
        if (size === "stop") break;
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

drawMode1.addEventListener("click", () => drawOnPressAndHold = false);
drawMode2.addEventListener("click", () => drawOnPressAndHold = true);

customColor.addEventListener("change", () => color = customColor.value);
colorMode1.addEventListener("click", () => isColorful = false);
colorMode2.addEventListener("click", () => isColorful = true);

eraseMode1.addEventListener("click", () => eraseOnPressAndHold = false);
eraseMode2.addEventListener("click", () => eraseOnPressAndHold = true);

erase.addEventListener("change", checkEraseMode);

eraseAllBtn.addEventListener("click", () => {
    display.childNodes.forEach(item => item.style.backgroundColor = "#f0eddeff");
});

reset.addEventListener("click", clear);

display.addEventListener("mousedown", (e) => {
    if (!(isMouseDown) && e.target.classList.contains("pixel")) {
        isMouseDown = true;
        e.preventDefault();
        if (!isErasing && drawOnPressAndHold) {
            if (!isColorful) {
                e.target.style.backgroundColor = color;
            } else {
                e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
            }
        } else if (isErasing && eraseOnPressAndHold) {
            e.target.style.backgroundColor = "#f0eddeff";
        }
    }
});

document.addEventListener("mouseup", (e) => {
    if (isMouseDown) {
        isMouseDown = false;
    }
});

display.addEventListener("mouseover", (e) => {
    if (!drawOnPressAndHold && !isErasing) {
        if (e.target.classList.contains("pixel")) {
            if (!isColorful) {
                e.target.style.backgroundColor = color;
            } else {
                e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
            }
        }
    } else if (drawOnPressAndHold && !isErasing && isMouseDown) {
        if (e.target.classList.contains("pixel")) {
            if (!isColorful) {
                e.target.style.backgroundColor = color;
            } else {
                e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
            }
        }
    } else if (isErasing && !eraseOnPressAndHold) {
        if (e.target.classList.contains("pixel")) {
            e.target.style.backgroundColor = "#f0eddeff";
        }
    } else if (isErasing && eraseOnPressAndHold && isMouseDown) {
        if (e.target.classList.contains("pixel")) {
            e.target.style.backgroundColor = "#f0eddeff";
        }
    }
});