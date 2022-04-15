const generateGrid = () => {
  const gridRows = 20;
  const gridColumns = 20;
  const gridContainer = document.querySelector("#grid-container");
  const grid = document.createElement("table");

  for (let i = 0; i < gridRows; i++) {
    const rows = document.createElement("tr");
    for (let j = 0; j < gridColumns; j++) {
      const columns = document.createElement("td");

      rows.appendChild(columns);
    }
    grid.appendChild(rows);
  }
  gridContainer.appendChild(grid);
};

generateGrid();
