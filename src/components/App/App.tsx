import { useEffect, useState } from 'react';
import GameField from '../GameField/GameField';
import Header from '../Header/Header';
import { BOMBS_QTY, SIZE_FIELD } from '../../utils/const';
import GameSettings from '../GameSettings/GameSettings';
import './App.scss';
import { generateCells } from '../../utils/generateCells';
import { CellType, GameStatus, GameTheme } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setGameState } from '../../store/gameSlice';
import ModalPopup from '../ModalPopup/EndGameModal';

import restart from '../../assets/sounds/restart-soundCrop.mp3';

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
  const { gameStatus, audio, theme } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const handlerMouseDown = () => {
    setKeydown(true);
  };

  const handlerMouseUp = () => {
    setKeydown(false);
  };

  const baseReset = () => {
    setTimer(() => 0);
    setMoves(() => 0);
    setFlag(() => 0);
    setIsLive(() => false);
    setIsOver(() => false);
    setIsWin(() => false);
    dispatch(setGameState(GameStatus.live));
  };

  const handlerChangeSize = (newSize: number) => {
    setSize(newSize);
    baseReset();
    setCells(() => generateCells(newSize, bombs));
  };

  const handlerChangeBombs = (qty: number) => {
    setBombs(qty);
    baseReset();
    setCells(() => generateCells(size, qty));
  };

  const handleReset = () => {
    baseReset();
    setCells(generateCells(size, bombs));
    playAudio(restart)
  };

  const playAudio = (name: string) => {
    if (!audio) return;
    new Audio(name).play();
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
    <div className={`wrapper ${theme === GameTheme.dark? 'dark': ''}`}>
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
        timer={timer}
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
