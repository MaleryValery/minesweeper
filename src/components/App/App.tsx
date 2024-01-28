import { useEffect, useState } from 'react';
import GameField from '../GameField/GameField';
import Header from '../Header/Header';
import { BOMBS_QTY, SIZE_FIELD } from '../../utils/const';
import GameSettings from '../GameSettings/GameSettings';
import './App.scss';
import { generateCells } from '../../utils/generateCells';
import { CellType, GameStatus } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setGameState } from '../../store/gameSlice';
import ModalPopup from '../ModalPopup/ModalPopup';
// import { GameState } from '../../utils/types';

function App() {
  const [size, setSize] = useState(SIZE_FIELD.small);
  const [bombs, setBombs] = useState(BOMBS_QTY.min);
  const [keydown, setKeydown] = useState(false);
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);
  const [cells, setCells] = useState<CellType[][]>(generateCells(size, bombs));
  const [flag, setFlag] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const { gameStatus } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const handlerMouseDown = () => {
    setKeydown(true);
  };

  const handlerMouseUp = () => {
    setKeydown(false);
  };

  const handlerChangeSize = (newSize: number) => {
    setSize(newSize);
    setTimer(() => 0);
    setMoves(() => 0);
    setFlag(() => 0);
    setIsLive(() => false);
    setIsOver(() => false);
    setCells(() => generateCells(newSize, bombs));
    dispatch(setGameState(GameStatus.live));
  };

  const handlerChangeBombs = (qty: number) => {
    setBombs(qty);
    setTimer(() => 0);
    setMoves(() => 0);
    setFlag(() => 0);
    setIsLive(() => false);
    setIsOver(() => false);
    setCells(() => generateCells(size, qty));
    dispatch(setGameState(GameStatus.live));
  };

  const handleReset = () => {
    setTimer(() => 0);
    setMoves(() => 0);
    setFlag(() => 0);
    setIsLive(() => false);
    setIsOver(() => false);
    setIsWin(() => false);
    setCells(generateCells(size, bombs));
    dispatch(setGameState(GameStatus.live));
  };

  useEffect(() => {
    if (isLive && timer < 999) {
      const time = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
      return () => {
        clearInterval(time);
      };
    }
  }, [isLive, timer]);

  return (
    <div className="wrapper">
      {gameStatus !== GameStatus.live && <ModalPopup />}
      <Header />
      <GameSettings
        isOver={isOver}
        isWin={isWin}
        onReset={handleReset}
        timer={timer}
        isLeftClick={keydown}
        onChangeFieldSize={handlerChangeSize}
        onChangeBombs={handlerChangeBombs}
        moves={moves}
        flag={flag}
      />
      <GameField
        isLive={isLive}
        isWin={isWin}
        size={size}
        cells={cells}
        moves={moves}
        isOver={isOver}
        setIsOver={setIsOver}
        setIsWin={setIsWin}
        flag={flag}
        bombs={bombs}
        setCells={setCells}
        onChangeMoves={() => setMoves((move) => move + 1)}
        setIsLive={setIsLive}
        onLeftMouseUp={handlerMouseUp}
        onLeftMouseDown={handlerMouseDown}
        onSetFlags={setFlag}
      />
    </div>
  );
}

export default App;
