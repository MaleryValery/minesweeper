import { BOMBS_QTY } from './const';
import generateNumbers from './generateNumbers';
import { CellState, CellType, CellValue } from './types';

export const generateCells = (size: number, bombs = BOMBS_QTY.min): CellType[][] => {
  let cells: CellType[][] = new Array(size).fill(
    new Array(size).fill({ value: CellValue.none, state: CellState.hidden })
  );

  // spread bombs
  let spreadedBombs = 0;
  while (spreadedBombs < bombs) {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);
    if (cells[randomRow][randomCol].value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (rowIndex === randomRow && colIndex === randomCol) {
            return {
              ...col,
              value: CellValue.bomb,
            };
          } else return col;
        })
      );
      spreadedBombs += 1;
    }
  }

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const curCell = cells[row][col];
      const numberOfBombs = generateNumbers(row, col, cells, size);
      if (numberOfBombs > 0) {
        cells[row][col] = {
          ...curCell,
          value: numberOfBombs,
        };
      }
    }
  }

  // console.log('cells: ', cells);
  return cells;
};
