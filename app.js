const grid = document.querySelector(".container-grid");
const DEFAULT_COLOR = "#f7f7f7";
let colorMode = "default";

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function removeAllChildsNodes(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
}

function setUpGrid(size) {
  removeAllChildsNodes(grid);
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let numberOfDivs = size ** 2;
  for (i = 1; i <= numberOfDivs; i++) {
    let gridCell = document.createElement("div");
    gridCell.setAttribute("id", `${i}`);
    gridCell.classList.add("grid-cell");
    gridCell.addEventListener("mouseover", drawCell);
    gridCell.addEventListener("mousedown", drawCell);
    gridCell.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
    grid.appendChild(gridCell);
  }
}

const pixelsSelect = document.getElementById("pixels-value");
const pixelsSelectInput = document.getElementById("pixels-input");

let pixelsValue = pixelsSelectInput.value;

pixelsSelect.textContent = pixelsValue;

pixelsSelectInput.addEventListener("input", (event) => {
  pixelsSelect.textContent = event.target.value;
  pixelsValue = event.target.value;
  setUpGrid(pixelsValue);
});

let drawColor = "#000000";

const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", setColor);

function setColor(event) {
  const colorChosen = event.target.value;
  drawColor = colorChosen;
  colorMode = "default";
}

function generateRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}

const btnRainbow = document.querySelector(".rainbow");
btnRainbow.addEventListener("click", () => {
  colorMode = "rainbow";
});

function drawCell(event) {
  if (event.type === "mouseover" && !mouseDown) return;

  let currentDiv = event.target;

  if (colorMode === "eraser") {
    drawColor = DEFAULT_COLOR;
    currentDiv.style.backgroundColor = `${drawColor}`;
  } else if (colorMode === "rainbow") {
    let randomColor = generateRandomColor();
    currentDiv.style.backgroundColor = `${randomColor}`;
  } else {
    currentDiv.style.backgroundColor = `${drawColor}`;
  }
}

const btnEraser = document.querySelector(".eraser");
btnEraser.addEventListener("click", () => {
  colorMode = "eraser";
});

const btnClear = document.querySelector(".clear");
btnClear.addEventListener("click", clearBoard);

function clearBoard() {
  const board = document.querySelectorAll(".grid-cell");
  board.forEach((div) => {
    div.style.backgroundColor = DEFAULT_COLOR;
  });
}

Window.onload(setUpGrid(16));
