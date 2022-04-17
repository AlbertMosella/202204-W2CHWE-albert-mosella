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

const changeCellColor = (cellId, alive) => {
  if (alive) {
    document.getElementById(cellId).className = "alive";
  }
  if (!alive) {
    document.getElementById(cellId).className = "dead";
  }
};

const generateGrid = () => {
  const gridRows = 20;
  const gridcells = 20;
  const gridContainer = document.querySelector("#grid-container");
  const grid = document.createElement("table");

  for (let i = 0; i < gridRows; i++) {
    const rows = document.createElement("tr");
    for (let j = 0; j < gridcells; j++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${i}-${j}`);
      cell.setAttribute("class", "dead");

      rows.appendChild(cell);
    }
    grid.appendChild(rows);
  }
  gridContainer.appendChild(grid);
};

const initialCellClick = () => {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      document.getElementById(`${i}-${j}`).addEventListener("click", () => {
        if (document.getElementById(`${i}-${j}`).className === "alive") {
          document.getElementById(`${i}-${j}`).className = "dead";
          gridArray[i][j] = false;
        } else if (document.getElementById(`${i}-${j}`).className === "dead") {
          document.getElementById(`${i}-${j}`).className = "alive";
          gridArray[i][j] = true;
        }
      });
    }
  }
};

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

const findCellNewCondition = (x, y, aliveCells) => {
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
      gridArrayNextFrame[x][y] = findCellNewCondition(
        x,
        y,
        checkCellsAround(x, y)
      );
    }
  }
};

const copyGrid = () => {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      gridArray[x][y] = gridArrayNextFrame[x][y];
      changeCellColor(`${x}-${y}`, gridArray[x][y]);
    }
  }
};

const resetGrid = () => {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      gridArray[x][y] = false;
      changeCellColor(`${x}-${y}`, false);
    }
  }
  document.querySelector("#start-game").disabled = false;
};

let timer;

const intervalTimer = () => {
  timer = window.setInterval(() => {
    prepareNextGridFrame();
    copyGrid();
  }, 1000);
};

const intervalTimerStop = () => {
  clearInterval(timer);
};

const mainGame = () => {
  document.querySelector("#start-game").disabled = true;
  intervalTimer();
};

const activateButtons = () => {
  const startButton = document.getElementById("start-game");
  startButton.addEventListener("click", mainGame);
  const stopButton = document.getElementById("end-game");
  stopButton.addEventListener("click", intervalTimerStop);
  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", resetGrid);
};

generateGrid();
activateButtons();
initialCellClick();
