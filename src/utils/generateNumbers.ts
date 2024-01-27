import { overLookCell } from './overLookCell';
import { CellType, CellValue } from './types';

function generateNumbers(row: number, col: number, cells: CellType[][], size: number) {
  let countBoom = 0;
  const { leftCell, rightCell, topCell, topRightCell, topLeftCell, bottomCell, bottomRightCell, bottomLeftCell } =
    overLookCell(row, col, size, cells);
  if (cells[row][col].value !== CellValue.bomb) {
    if (leftCell?.value === CellValue.bomb) countBoom += 1;
    if (rightCell?.value === CellValue.bomb) countBoom += 1;
    if (topCell?.value === CellValue.bomb) countBoom += 1;
    if (topRightCell?.value === CellValue.bomb) countBoom += 1;
    if (topLeftCell?.value === CellValue.bomb) countBoom += 1;
    if (bottomCell?.value === CellValue.bomb) countBoom += 1;
    if (bottomRightCell?.value === CellValue.bomb) countBoom += 1;
    if (bottomLeftCell?.value === CellValue.bomb) countBoom += 1;
    return countBoom;
  } else {
    return 0;
  }
}

export default generateNumbers;
