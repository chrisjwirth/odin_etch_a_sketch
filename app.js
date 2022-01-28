const container = document.querySelector('.container');
const bwButton = document.querySelector('.bw');
const colorButton = document.querySelector('.color');
const squaresInput = document.querySelector('.squares');
const resetButton = document.querySelector('.reset');
let colorMode = false;

function randomColor() {
  const colors = [];
  for (let i = 0; i < 3; i++) {
    colors.push(Math.floor(Math.random() * 256));
  }
  return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
}

function setDivColor() {
  const divStyle = getComputedStyle(this);
  const backgroundColor = divStyle.backgroundColor;
  const opacity = parseFloat(divStyle.opacity);
  if (backgroundColor === 'rgba(0, 0, 0, 0)') {
    if (colorMode) {
      this.style.backgroundColor = randomColor();
    } else {
      this.style.backgroundColor = 'black';
    }
  } else if (opacity < 1) {
    this.style.opacity = `${opacity + 0.1}`;
  }
}

function createGrid(squaresPerSide=16) {
  container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;
  const containerStyle = getComputedStyle(container);
  const divWidth = parseFloat(containerStyle.width) / squaresPerSide;
  const divHeight = parseFloat(containerStyle.height) / squaresPerSide;

  const totalSquares = squaresPerSide * squaresPerSide;
  for (let i = 0; i < totalSquares; i++) {
    const div = document.createElement('div');
    div.style.width = `${divWidth}`;
    div.style.height = `${divHeight}`;
    div.addEventListener('mouseover', setDivColor);
    container.append(div);
  }
}

function resetGrid() {
  let squaresPerSide = document.querySelector('.squares').value;
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  createGrid(parseInt(squaresPerSide));
}

// Event Listeners
bwButton.addEventListener('click', () => colorMode = false);
colorButton.addEventListener('click', () => colorMode = true);
squaresInput.addEventListener("keyup", event => {
  if (event.key === 'Enter') {
    resetGrid();
  }});
resetButton.addEventListener('click', resetGrid);

createGrid();
