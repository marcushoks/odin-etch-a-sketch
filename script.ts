const GRID_SIZE = 640;
const GRID_COLUMNS = 16;
let paintColor = "black";

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

const colorPicker = document.querySelector("#color-picker");
colorPicker?.addEventListener("change", (e) => {
  const input = e.target as HTMLInputElement;
  paintColor = input.value;

  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.removeEventListener("mouseover", paintCell);
    cell.addEventListener("mouseover", paintCell);
  });
});

function calculateCellSize(gridSize: number, columns: number) {
  return `${gridSize / columns}px`;
}

function paintCell(e: Event) {
  const cell = e.target as HTMLElement;
  cell.style.backgroundColor = paintColor;
}

function createCells(grid: HTMLElement, columns: number, cellSize: string) {
  grid.style.gridTemplateColumns = `repeat(${columns}, ${cellSize})`;
  const cells = [];
  for (let i = 0; i < columns ** 2; i++) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";
    cell.style.height = cellSize;
    cell.style.width = cellSize;
    cell.addEventListener("mouseover", paintCell);
    cells.push(cell);
  }
  grid?.replaceChildren(...cells);
}
