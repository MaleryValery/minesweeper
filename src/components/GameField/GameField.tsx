import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Cell from '../Cell/Cell';
import { SIZE_FIELD } from '../../utils/const';
import './GameField.scss';
import { CellState, CellType, CellValue, GameStatus } from '../../utils/types';
import { checkClickedCell } from '../../utils/checkClickedCell';
import { showAllCells } from '../../utils/showAllCells';
import { generateCells } from '../../utils/generateCells';
import { checkIsWin } from '../../utils/checkIsWin';
import { setFlagsOnBombs } from '../../utils/setFlagsOnBombs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setGameState, setWinner } from '../../store/gameSlice';

import click from '../../assets/sounds/click-soundCrop.mp3';
import flag from '../../assets/sounds/flag-soundCrop.mp3';
import loseGame from '../../assets/sounds/lose-sound.mp3';
import winGame from '../../assets/sounds/win-sound2.mp3';

type GameFieldProps = {
  isLive: boolean;
  isWin: boolean;
  isOver: boolean;
  cells: CellType[][];
  size: number;
  timer: number;
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
  size,
  cells,
  moves,
  timer,
  bombs,
  isOver,
  isWin,
  isLive,
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
  const { audio } = useAppSelector((state) => state.game);

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

  const playAudio = (name: string) => {
    if (!audio) return;
    new Audio(name).play();
  };

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

  const handlerContextClick = (row: number, col: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOver || isWin) return;
    playAudio(flag);
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

    let newCells = [...cells];
    playAudio(click);
    if (!isLive) {
      let isFirstBomb = newCells[row][col].value === CellValue.bomb;
      while (isFirstBomb) {
        newCells = generateCells(size, bombs);
        if (newCells[row][col].value !== CellValue.bomb) {
          isFirstBomb = false;
          break;
        }
      }
      setIsLive(() => true);
      onChangeMoves();
    }
    onChangeMoves();
    const curCell = newCells[row][col];

    if (curCell.state === CellState.flagged || curCell.state === CellState.visible) return;

    if (curCell.value === CellValue.bomb) {
      playAudio(loseGame);
      dispatch(setGameState(GameStatus.lose));
      newCells[row][col].state = CellState.visible;
      newCells[row][col].bombed = true;
      newCells = showAllCells(newCells);
      setCells(newCells);
      setIsLive(() => false);
      setIsOver(() => true);
    } else if (curCell.value === CellValue.none) {
      newCells = checkClickedCell(row, col, size, newCells);
      setCells(newCells);
    } else {
      newCells[row][col].state = CellState.visible;
      setCells(newCells);
    }
    const isWiner = checkIsWin(bombs, size, newCells);
    if (isWiner) {
      playAudio(winGame);
      const updatedCels = setFlagsOnBombs(newCells);
      dispatch(setGameState(GameStatus.win));
      dispatch(setWinner({ timer, size, bombs, moves, name: '' }));
      setCells(updatedCels);
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
