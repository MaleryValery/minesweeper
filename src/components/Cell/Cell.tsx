import { CellState, CellValue, GameTheme } from '../../utils/types';
import bomb from '../../assets/bomb.png';
import flag from '../../assets/red-flag.png';
import './Cell.scss';
import { useAppSelector } from '../../store/hooks';

type CellProps = {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  moves: number;
  bombed: boolean;
  onChangeMoves: () => void;
  onCellClick(row: number, col: number): () => void;
  onContextClick(row: number, col: number): (event: React.MouseEvent) => void;
};

function Cell({ bombed, onCellClick, row, col, state, value, onContextClick }: CellProps) {
  const { theme } = useAppSelector((state) => state.game);

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

  return (
    <div
      onClick={onCellClick(row, col)}
      onContextMenu={onContextClick(row, col)}
      className={`cell 
      ${state === CellState.visible ? `open value-${value}` : ``}
      ${bombed === true ? `open boom` : ``}
     ${theme === GameTheme.dark ? 'dark' : ''}`}
    >
      {renderCellContent()}
    </div>
  );
}

export default Cell;
