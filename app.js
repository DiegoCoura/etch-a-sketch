const grid = document.querySelector(".container-grid");

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
  console.log(drawColor);
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);



function drawCell(event) {
  if (event.type === "mouseover" && !mouseDown) return;
    console.log(event.type)
    let currentDiv = event.target;
    currentDiv.style.backgroundColor = `${drawColor}`;
  
}

Window.onload(setUpGrid(16));
