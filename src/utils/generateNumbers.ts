import { CellType, CellValue } from './types';

function generateNumbers(row: number, col: number, cells: CellType[][], size: number) {
  let countBoom = 0;
      const leftBomb = col > 0 ? cells[row][col - 1] : null;
      const rigthBomb = row < size-1 ? cells[row][col+1] : null;
      const topBomb = row > 0 ? cells[row - 1][col] : null;
      const topRigthBomb = row > 0 && col < size-1 ? cells[row - 1][col + 1] : null;
      const topLeftBomb = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
      const bottomBomb = row < size-1 ? cells[row + 1][col] : null;
      const bottomRightBomb = row < size-1 && col < size-1 ? cells[row + 1][col + 1] : null;
      const bottomLeftBomb = row < size-1 && col > 0 ? cells[row + 1][col - 1] : null;
      if (cells[row][col].value !== CellValue.bomb) {
        if (leftBomb?.value === CellValue.bomb) countBoom += 1;
        if (rigthBomb?.value === CellValue.bomb) countBoom += 1;
        if (topBomb?.value === CellValue.bomb) countBoom += 1;
        if (topRigthBomb?.value === CellValue.bomb) countBoom += 1;
        if (topLeftBomb?.value === CellValue.bomb) countBoom += 1;
        if (bottomBomb?.value === CellValue.bomb) countBoom += 1;
        if (bottomRightBomb?.value === CellValue.bomb) countBoom += 1;
        if (bottomLeftBomb?.value === CellValue.bomb) countBoom += 1;
    return countBoom;
  } else {
    return 0;
  }
}

export default generateNumbers;
