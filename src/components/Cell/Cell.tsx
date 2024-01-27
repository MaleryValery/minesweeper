// import { MouseEventHandler, useState } from "react";
import { CellState, CellValue } from '../../utils/types';
import bomb from '../../assets/bomb.png';
import flag from '../../assets/red-flag.png';
import './Cell.scss';
import { MouseEvent } from 'react';

type CellProps = {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  moves: number;
  onChangeMoves: () => void;
  onCellClick: () => void;
  onGameLive: () => void;
  onContextClick: (e: MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void;
};

function Cell({ moves, onGameLive, onChangeMoves, onCellClick, row, col, state, value, onContextClick }: CellProps) {
  const renderCellContent = () => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <img src={bomb} alt="bomb" className="field-img" />;
      } else if (value === CellValue.none) {
        return null;
      }
      return value;
    } else if (state === CellState.flagged) {
      return <img src={flag} alt="flag" className="field-img" />;
    }
  };

  const handlerCellClick = () => {
    moves < 1 ? onGameLive() : null;
    onChangeMoves();
    onCellClick();
  };

  return (
    <div
      onClick={handlerCellClick}
      onContextMenu={(e) => onContextClick(e, row, col)}
      // row={row}
      // col={col}
      // state={state}
      // value={value}
      className={`cell ${state === CellState.visible ? `open value-${value}` : ``}`}
      // onContextMenu={handlerSetFlag}
    >
      {renderCellContent()}
    </div>
  );
}

export default Cell;
