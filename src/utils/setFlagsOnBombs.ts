import { CellState, CellType, CellValue } from "./types";

export function setFlagsOnBombs(cells: CellType[][]): CellType[][] {
  return cells.map(row => row.map(col => {
    if (col.value === CellValue.bomb)
     {return col = {
        ...col,
        state : CellState.flagged
      } }else return col
  } ))
}