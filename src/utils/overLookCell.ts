import { CellType } from "./types";

export function overLookCell(row: number, col: number, size: number, cells: CellType[][]) {
  const leftCell = col > 0 ? cells[row][col - 1] : null;
  const rightCell = col < size - 1 ? cells[row][col + 1] : null;
  const topCell = row > 0 ? cells[row - 1][col] : null;
  const topRightCell = row > 0 && col < size - 1 ? cells[row - 1][col + 1] : null;
  const topLeftCell = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
  const bottomCell = row < size - 1 ? cells[row + 1][col] : null;
  const bottomRightCell = row < size - 1 && col < size - 1 ? cells[row + 1][col + 1] : null;
  const bottomLeftCell = row < size - 1 && col > 0 ? cells[row + 1][col - 1] : null;

  return {
    leftCell,
    rightCell,
    topCell,
    topRightCell,
    topLeftCell,
    bottomCell,
    bottomRightCell,
    bottomLeftCell,
  };
}
