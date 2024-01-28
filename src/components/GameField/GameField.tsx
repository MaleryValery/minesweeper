import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from 'react';
import Cell from '../Cell/Cell';
import { SIZE_FIELD } from '../../utils/const';
import './GameField.scss';
import { CellState, CellType, CellValue, GameStatus } from '../../utils/types';
import { checkClickedCell } from '../../utils/checkClickedCell';
import { showAllCells } from '../../utils/showAllCells';
import { generateCells } from '../../utils/generateCells';
import { checkIsWin } from '../../utils/checkIsWin';
import { setFlagsOnBombs } from '../../utils/setFlagsOnBombs';
import { useAppDispatch } from '../../store/hooks';
import { setGameState } from '../../store/gameSlice';

type GameFieldProps = {
  isLive: boolean;
  isWin: boolean;
  isOver: boolean;
  cells: CellType[][];
  size: number;
  className?: string;
  moves: number;
  flag: number;
  bombs: number;
  onLeftMouseDown: () => void;
  onLeftMouseUp: () => void;
  onChangeMoves: () => void;
  setIsWin: Dispatch<SetStateAction<boolean>>;
  setIsLive: Dispatch<SetStateAction<boolean>>;
  setIsOver: Dispatch<SetStateAction<boolean>>;
  onSetFlags: Dispatch<SetStateAction<number>>;
  setCells: Dispatch<SetStateAction<CellType[][]>>;
};

function GameField({
  // isLive,
  size,
  cells,
  moves,
  // flag,
  bombs,
  isOver,
  isWin,
  setIsOver,
  setIsWin,
  onLeftMouseDown,
  onLeftMouseUp,
  setIsLive,
  onChangeMoves,
  onSetFlags,
  setCells,
}: GameFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

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

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((col, cellIndex) => (
        <Cell
          bombed={col.bombed}
          moves={moves}
          onCellClick={handlerCellClick}
          onContextClick={handlerContextClick}
          onChangeMoves={onChangeMoves}
          key={`${rowIndex}-${cellIndex}`}
          state={col.state}
          value={col.value}
          row={rowIndex}
          col={cellIndex}
        />
      ))
    );
  };

  const handlerContextClick = (row: number, col: number) => (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (isOver || isWin) return;

    const curCells = [...cells];

    const curCell = cells[row][col];
    if (curCell.state === CellState.visible) {
      return;
    } else if (curCell.state === CellState.hidden) {
      curCells[row][col].state = CellState.flagged;
      setCells(curCells);
      onSetFlags((f) => f + 1);
    } else if (curCell.state === CellState.flagged) {
      curCells[row][col].state = CellState.hidden;
      setCells(curCells);
      onSetFlags((f) => f - 1);
    }
  };

  const handlerCellClick = (row: number, col: number) => () => {
    if (isOver || isWin) return;
    const curCell = cells[row][col];
    if (curCell.value === CellValue.bomb && moves < 1) {
      setCells(() => generateCells(size, bombs));
    } else {
      moves < 1 ? setIsLive(() => true) : null;
      onChangeMoves();
    }

    let newCells = [...cells];
    if (curCell.state === CellState.flagged || curCell.state === CellState.visible) return;

    if (curCell.value === CellValue.bomb) {
      newCells[row][col].state = CellState.visible;
      newCells[row][col].bombed = true;
      newCells = showAllCells(newCells);
      setCells(newCells);
      setIsLive(() => false);
      setIsOver(() => true);
      dispatch(setGameState(GameStatus.lose))
    } else if (curCell.value === CellValue.none) {
      newCells = checkClickedCell(row, col, size, newCells);
      setCells(newCells);
    } else {
      newCells[row][col].state = CellState.visible;
      setCells(newCells);
    }
    const isWiner = checkIsWin(bombs, size, newCells);
    if (isWiner) {
      const updatedCels = setFlagsOnBombs(newCells);
      setCells(updatedCels);
      dispatch(setGameState(GameStatus.win))
      setIsWin(() => isWiner);
      setIsLive(() => false);
    }
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
