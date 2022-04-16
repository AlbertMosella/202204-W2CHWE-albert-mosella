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
const generateMatrix = () => {
  for (let i = 0; i < 20; i++) {
    gridArray[i] = [];
    for (let j = 0; j < 20; j++) {
      gridArray[i][j] = document.querySelector(`#${i}-${j}`);
    }
  }
};
generateMatrix();
