const calculateCellSize = (gridSize: number, columns: number) => {
  return gridSize / columns;
};

const paintCell = (target: HTMLElement, color: string) => {
  target.style.backgroundColor = color;
};

const GRID_SIZE = 640;
let gridColumns = 16;
let cellSize = `${calculateCellSize(GRID_SIZE, gridColumns)}px`;

const body = document.querySelector("body");
body?.style.setProperty("--grid-columns", String(gridColumns));
body?.style.setProperty("--cell-size", cellSize);

const gridContainer = document.querySelector(
  ".grid-container"
) as HTMLDivElement;

for (let i = 0; i < gridColumns ** 2; i++) {
  const gridCell = document.createElement("div");
  gridCell.className = "grid-cell";
  gridCell.addEventListener("mouseover", (e) => {
    paintCell(e.target as HTMLElement, "red");
  });
  gridContainer?.appendChild(gridCell);
}
