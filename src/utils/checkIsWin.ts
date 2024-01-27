import { CellState, CellType, CellValue } from './types';

export function checkIsWin(bombs: number, size: number, cells: CellType[][]) {
  let countOfCellsWithoutBomb = 0;
  cells.forEach(row => {
    row.forEach(col => {
      if (col.value !== CellValue.bomb && col.state === CellState.visible){
        countOfCellsWithoutBomb += 1
      }
    })
  })
  return Math.pow(size, 2) - bombs === countOfCellsWithoutBomb;
}
