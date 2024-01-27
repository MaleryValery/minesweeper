import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from 'react';
import Cell from '../Cell/Cell';
import { SIZE_FIELD } from '../../utils/const';
import './GameField.scss';
import { CellState, CellType, CellValue } from '../../utils/types';

type GameFieldProps = {
  cells: CellType[][];
  size: number;
  className?: string;
  moves: number;
  flag: number;
  bombs: number;
  onLeftMouseDown: () => void;
  onLeftMouseUp: () => void;
  onChangeMoves: () => void;
  onGameLive: () => void;
  onSetFlags: Dispatch<SetStateAction<number>>;
  setCells: Dispatch<SetStateAction<CellType[][]>>;
};

function GameField({
  size,
  cells,
  moves,
  flag,
  bombs,
  onLeftMouseDown,
  onLeftMouseUp,
  onGameLive,
  onChangeMoves,
  onSetFlags,
  setCells,
}: GameFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;

    if (field) {
      field.addEventListener('mousedown', onLeftMouseDown);
      field.addEventListener('mouseup', onLeftMouseUp);
      field.addEventListener('mouseleave', onLeftMouseUp);

      return () => {
        field.removeEventListener('mousedown', onLeftMouseDown);
        field.removeEventListener('mouseup', onLeftMouseUp);
        field.removeEventListener('mouseleave', onLeftMouseUp);
      };
    }
  }, []);

  const handlerCellClick = (row: number, col: number) => {
    console.log(row, col);
  };

  const handlerContextClick = (e: MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => {
    e.preventDefault();
    const curCells = [...cells];
    const curCell = curCells[row][col];
    curCells[row][col].state = CellState.flagged;
    setCells(() => curCells);
    onSetFlags((f) => f + 1);
    if (curCell.state === CellState.visible || (flag === bombs && curCell.state !== CellState.flagged)) {
      return;
    } else if (curCell.state === CellState.hidden) {
      curCells[row][col].state = CellState.flagged;
      setCells(() => curCells);
      onSetFlags((f) => f + 1);
    } else {
      curCells[row][col].state = CellState.hidden;
      setCells(() => curCells);
      onSetFlags((f) => f - 1);
    }

    console.log(row, col, cells[row][col].state);
  };

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((col, cellIndex) => (
        <Cell
          moves={moves}
          onCellClick={() => handlerCellClick(rowIndex, cellIndex)}
          onContextClick={(e: MouseEvent<HTMLDivElement, MouseEvent>) => handlerContextClick(e, rowIndex, cellIndex)}
          onChangeMoves={onChangeMoves}
          key={`${rowIndex}${cellIndex}`}
          state={col.state}
          value={col.value}
          row={rowIndex}
          col={cellIndex}
          onGameLive={onGameLive}
        />
      ))
    );
  };

  return (
    <div
      ref={fieldRef}
      className={`minefield 
      ${size > SIZE_FIELD.small ? (size > SIZE_FIELD.medium ? 'large-field' : 'middle-field') : 'small-field'}`}
    >
      {renderCells()}
    </div>
  );
}

export default GameField;
