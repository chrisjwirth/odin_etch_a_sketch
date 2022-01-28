const container = document.querySelector('.container');
const clearButton = document.querySelector('.clear');
const bwButton = document.querySelector('.bw');
const colorButton = document.querySelector('.color');
let colorMode = false;

function randomColor() {
  const colors = [];
  for (let i = 0; i < 3; i++) {
    colors.push(Math.floor(Math.random() * 256));
  }
  return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
}

function setDivStyle(div) {
  const divStyle = getComputedStyle(div);
  const backgroundColor = divStyle.backgroundColor;
  const opacity = parseFloat(divStyle.opacity);
  if (backgroundColor === 'rgba(0, 0, 0, 0)') {
    if (colorMode) {
      div.style.backgroundColor = randomColor();
    } else {
      div.style.backgroundColor = 'black';
    }
  } else if (opacity < 1) {
    div.style.opacity = `${opacity + 0.1}`;
  }
}

function createGrid(squaresPerSide=16) {
  container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;
  const containerStyle = getComputedStyle(container);
  const containerWidth = parseFloat(containerStyle.width);
  const containerHeight = parseFloat(containerStyle.height);

  const totalSquares = squaresPerSide * squaresPerSide;
  for (let i = 0; i < totalSquares; i++) {
    const div = document.createElement('div');
    div.addEventListener('mouseover', () => setDivStyle(div));
    div.style.width = `${containerWidth / squaresPerSide}`;
    div.style.height = `${containerHeight / squaresPerSide}`;
    container.append(div);
  }
}

clearButton.addEventListener('click', () => {
  let squaresPerSide = document.querySelector('.squares').value;

  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  createGrid(parseInt(squaresPerSide));
})

colorButton.addEventListener('click', () => colorMode = true);
bwButton.addEventListener('click', () => colorMode = false);

createGrid();
