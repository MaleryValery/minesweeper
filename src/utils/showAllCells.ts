import { CellState, CellType, CellValue } from './types';

export function showAllCells(cells: CellType[][]) {
  return cells.map((row) =>
    row.map((col) => {
      if (col.value === CellValue.bomb) {
        return (col = { ...col, state: CellState.visible });
      } else return col;
    })
  );
}
