import { BOMBS_QTY } from './const';
import generateNumbers from './generateNumbers';
import { CellState, CellType, CellValue } from './types';

export const generateCells = (size: number, bombs = BOMBS_QTY.min): CellType[][] => {
  let cells: CellType[][] = [];
  for (let row = 0; row < size; row += 1) {
    cells.push([]);
    for (let col = 0; col < size; col += 1) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.hidden,
        bombed: false
      });
    }
  }

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

  for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
    for (let colIndex = 0; colIndex < size; colIndex += 1) {
      const curCell = cells[rowIndex][colIndex];
      if (curCell.value === CellValue.bomb) {
        continue;
      }
      let countBoom = 0;
      countBoom = generateNumbers(rowIndex, colIndex, cells, size);
      if (countBoom > 0) {
        cells[rowIndex][colIndex] = {
          ...curCell,
          value: countBoom,
        };
      }
    }
  }
  return cells;
};
