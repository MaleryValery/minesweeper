import { overLookCell } from './overLookCell';
import { CellState, CellType, CellValue } from './types';

export function checkClickedCell(row: number, col: number, size: number, cells: CellType[][]): CellType[][] {
  const curCell = cells[row][col];

  if (curCell.state === CellState.visible || curCell.state === CellState.flagged) {
    return cells;
  }
  let curCells = [...cells];
  curCells[row][col].state = CellState.visible;

  const { leftCell, rightCell, topCell, topRightCell, topLeftCell, bottomCell, bottomRightCell, bottomLeftCell } =
    overLookCell(row, col, size, cells);

  if (topLeftCell?.state === CellState.hidden && topLeftCell.value !== CellValue.bomb) {
    if (topLeftCell.value === CellValue.none) {
      curCells = checkClickedCell(row - 1, col - 1, size, curCells);
    } else {
      curCells[row - 1][col - 1].state = CellState.visible;
    }
  }

  if (topCell?.state === CellState.hidden && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      curCells = checkClickedCell(row - 1, col, size, curCells);
    } else {
      curCells[row - 1][col].state = CellState.visible;
    }
  }

  if (topRightCell?.state === CellState.hidden && topRightCell.value !== CellValue.bomb) {
    if (topRightCell.value === CellValue.none) {
      curCells = checkClickedCell(row - 1, col + 1, size, curCells);
    } else {
      curCells[row - 1][col + 1].state = CellState.visible;
    }
  }

  if (leftCell?.state === CellState.hidden && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      curCells = checkClickedCell(row, col - 1, size, curCells);
    } else {
      curCells[row][col - 1].state = CellState.visible;
    }
  }

  if (rightCell?.state === CellState.hidden && rightCell.value !== CellValue.bomb) {
    if (rightCell.value === CellValue.none) {
      curCells = checkClickedCell(row, col + 1, size, curCells);
    } else {
      curCells[row][col + 1].state = CellState.visible;
    }
  }

  if (bottomLeftCell?.state === CellState.hidden && bottomLeftCell.value !== CellValue.bomb) {
    if (bottomLeftCell.value === CellValue.none) {
      curCells = checkClickedCell(row + 1, col - 1, size, curCells);
    } else {
      curCells[row + 1][col - 1].state = CellState.visible;
    }
  }

  if (bottomCell?.state === CellState.hidden && bottomCell.value !== CellValue.bomb) {
    if (bottomCell.value === CellValue.none) {
      curCells = checkClickedCell(row + 1, col, size, curCells);
    } else {
      curCells[row + 1][col].state = CellState.visible;
    }
  }

  if (bottomRightCell?.state === CellState.hidden && bottomRightCell.value !== CellValue.bomb) {
    if (bottomRightCell.value === CellValue.none) {
      curCells = checkClickedCell(row + 1, col + 1, size, curCells);
    } else {
      curCells[row + 1][col + 1].state = CellState.visible;
    }
  }

  return curCells;
}
