const generateGrid = () => {
  const gridRows = 20;
  const gridcells = 20;
  const gridContainer = document.querySelector("#grid-container");
  const grid = document.createElement("table");

  for (let i = 0; i < gridRows; i++) {
    const rows = document.createElement("tr");
    for (let j = 0; j < gridcells; j++) {
      const cells = document.createElement("td");
      cells.setAttribute("id", `${i}-${j}`);
      cells.setAttribute("class", "dead");
      rows.appendChild(cells);
    }
    grid.appendChild(rows);
  }
  gridContainer.appendChild(grid);
};

generateGrid();

const gridArray = [];
const gridArrayNextFrame = [];
const generateMatrixes = () => {
  for (let i = 0; i < 20; i++) {
    gridArray[i] = [];
    gridArrayNextFrame[i] = [];
    for (let j = 0; j < 20; j++) {
      gridArray[i][j] = false;
      gridArrayNextFrame[i][j] = false;
    }
  }
};
generateMatrixes();

const checkCellsAround = (x, y) => {
  let cellsAroundCondition = 0;
  if (x !== 0 && y !== 0) {
    if (gridArray[x - 1][y - 1]) {
      cellsAroundCondition++;
    }
  }
  if (x !== 0) {
    if (gridArray[x - 1][y]) {
      cellsAroundCondition++;
    }
    if (y !== 19) {
      if (gridArray[x - 1][y + 1]) {
        cellsAroundCondition++;
      }
    }
  }
  if (y !== 0) {
    if (gridArray[x][y - 1]) {
      cellsAroundCondition++;
    }
    if (x !== 19) {
      if (gridArray[x + 1][y - 1]) {
        cellsAroundCondition++;
      }
    }
  }
  if (x !== 19) {
    if (gridArray[x + 1][y]) {
      cellsAroundCondition++;
    }
  }
  if (y !== 19) {
    if (gridArray[x][y + 1]) {
      cellsAroundCondition++;
    }
  }
  if (x !== 19 && y !== 19) {
    if (gridArray[x + 1][y + 1]) {
      cellsAroundCondition++;
    }
  }

  return cellsAroundCondition;
};

const updateCell = (x, y, aliveCells) => {
  if (gridArray[x][y] && (aliveCells === 2 || aliveCells === 3)) {
    return true;
  }
  if (!gridArray[x][y] && aliveCells === 3) {
    return true;
  }
  return false;
};

const prepareNextGridFrame = () => {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      gridArrayNextFrame[x][y] = updateCell(x, y, checkCellsAround(x, y));
    }
  }
};

const copyGrid = () => {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      gridArray[x][y] = gridArrayNextFrame[x][y];
    }
  }
};

const mainGame = () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      prepareNextGridFrame();
      copyGrid();
    }, 1000);
  }
};

mainGame();
