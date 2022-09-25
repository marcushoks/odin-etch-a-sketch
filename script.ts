const calculateCellSize = (gridSize: number, columns: number) => {
  return `${gridSize / columns}px`;
};

const paintCell = (target: HTMLElement, color: string) => {
  target.style.backgroundColor = color;
};

const createCells = (grid: HTMLElement, columns: number, cellSize: string) => {
  grid.style.gridTemplateColumns = `repeat(${columns}, ${cellSize})`;
  const cells = [];
  for (let i = 0; i < columns ** 2; i++) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";
    cell.style.height = cellSize;
    cell.style.width = cellSize;
    cell.addEventListener("mouseover", (e) => {
      paintCell(e.target as HTMLElement, "red");
    });
    cells.push(cell);
  }
  grid?.replaceChildren(...cells);
};

const GRID_SIZE = 640;
const GRID_COLUMNS = 16;

const gridContainer = document.querySelector(
  ".grid-container"
) as HTMLDivElement;

createCells(
  gridContainer,
  GRID_COLUMNS,
  calculateCellSize(GRID_SIZE, GRID_COLUMNS)
);

const gridResoBtns = document.querySelectorAll(".grid-reso-btn");
gridResoBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btn = e.target as HTMLButtonElement;
    const columns = parseInt(
      btn.getAttribute("data-resolution") ?? String(GRID_COLUMNS)
    );
    createCells(gridContainer, columns, calculateCellSize(GRID_SIZE, columns));
  });
});
