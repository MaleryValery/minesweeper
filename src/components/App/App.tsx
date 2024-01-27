import { useEffect, useState } from 'react';
import GameField from '../GameField/GameField';
import Header from '../Header/Header';
import { BOMBS_QTY, SIZE_FIELD } from '../../utils/const';
import GameSettings from '../GameSettings/GameSettings';
import './App.scss';
import { generateCells } from '../../utils/generateCells';
import { CellType } from '../../utils/types';
// import { GameState } from '../../utils/types';

function App() {
  const [size, setSize] = useState(SIZE_FIELD.small);
  const [bombs, setBombs] = useState(BOMBS_QTY.min);
  const [keydown, setKeydown] = useState(false);
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);
  const [cells, setCells] = useState<CellType[][]>(generateCells(size, bombs));
  // const [gameState, setGameState] = useState(GameState.live);
  const [flag, setFlag] = useState(0);
  const [isLive, setIsisLive] = useState(false);

  const handlerMouseDown = () => {
    setKeydown(true);
  };

  const handlerMouseUp = () => {
    setKeydown(false);
  };

  const handlerChangeSize = (newSize: number) => {
    setSize(newSize);
    setCells(generateCells(newSize, bombs));
    setCells(() => generateCells(newSize, bombs));
  };

  const handlerChangeBombs = (qty: number) => {
    setBombs(qty);
    setCells(() => generateCells(size, qty));
  };

  const handleReset = () => {
    setTimer(() => 0);
    setMoves(() => 0);
    setFlag(() => 0);
    setIsisLive(() => false);
    setCells(generateCells(size, bombs));
  };

  const handleGameState = () => {
    setIsisLive((game) => !game);
  };

  // const handleCellFlag = () => {
  //   setFlag(f => f + 1)
  // };

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
      <Header />
      <GameSettings
        onReset={handleReset}
        timer={timer}
        isLeftClick={keydown}
        onChangeFieldSize={handlerChangeSize}
        onChangeBombs={handlerChangeBombs}
        moves={moves}
        flag={flag}
      />
      <GameField
        size={size}
        cells={cells}
        moves={moves}
        flag={flag}
        bombs={bombs}
        setCells={setCells}
        onChangeMoves={() => setMoves((move) => move + 1)}
        onGameLive={handleGameState}
        onLeftMouseUp={handlerMouseUp}
        onLeftMouseDown={handlerMouseDown}
        onSetFlags={setFlag}
      />
    </div>
  );
}

export default App;
