const GRID_SIZE = 640;
const GRID_COLUMNS = 16;
let paintColor = "rgb(0, 0, 0)";

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
});

function calculateCellSize(gridSize: number, columns: number) {
  return `${gridSize / columns}px`;
}

function paintCell(e: Event) {
  const cell = e.target as HTMLElement;
  cell.style.backgroundColor = paintColor;

  // ensure sufficient contrast between the border color and background color
  const { saturation, lightness } = rgbToHsl(cell.style.backgroundColor);
  if (saturation <= 10 && lightness <= 90) {
    cell.style.borderColor = "white";
  } else {
    cell.style.borderColor = "gray";
  }
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

function rgbToHsl(rgbString: string) {
  const matches = rgbString.match(/[0-9]+/g)?.map((match) => parseInt(match));
  let [red, green, blue] = matches ?? [0, 0, 0];

  red /= 255.0;
  green /= 255.0;
  blue /= 255.0;

  const cMax = Math.max(red, green, blue);
  const cMin = Math.min(red, green, blue);

  // let hue = 0;
  let sat = 0;
  const light = (cMax + cMin) / 2;

  const delta = cMax - cMin;
  if (delta !== 0) {
    // not achromatic
    // switch (cMax) {
    //   case red: {
    //     hue = (green - blue) / delta + (green < blue ? 6 : 0);
    //     break;
    //   }
    //   case green: {
    //     hue = (blue - red) / delta + 2;
    //     break;
    //   }
    //   case blue: {
    //     hue = (red - green) / delta + 4;
    //     break;
    //   }
    // }

    // hue /= 6;
    sat = light > 0.5 ? delta / (2 - cMax - cMin) : delta / (cMax + cMin);
  }

  return {
    // hue: hue * 360,
    saturation: sat * 100,
    lightness: light * 100,
  };
}
