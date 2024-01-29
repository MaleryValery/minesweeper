import ControllBtn from '../ControllBtn/ControllBtn';
import easy from '../../assets/easy.png';
import themeDark from '../../assets/dark2.png';
import themeLigth from '../../assets/light.png';
import inter from '../../assets/inter.png';
import hard from '../../assets/hard.png';
import bomb from '../../assets/hard2.png';
import { BOMBS_QTY, SIZE_FIELD } from '../../utils/const';
import { ChangeEvent, useState } from 'react';
import './GameSettings.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAudio, setTheme } from '../../store/gameSlice';
import { GameTheme } from '../../utils/types';

type GameSettings = {
  onChangeFieldSize: (num: number) => void;
  onChangeBombs: (num: number) => void;
  onReset: () => void;
  isLeftClick: boolean;
  isOver: boolean;
  isWin: boolean;
  timer: number;
  flag: number;
  moves: number;
};

function GameSettings({
  moves,
  timer,
  flag,
  isLeftClick,
  isOver,
  isWin,
  onReset,
  onChangeFieldSize,
  onChangeBombs,
}: GameSettings) {
  const [value, setInputValue] = useState(BOMBS_QTY.min);
  const dispatch = useAppDispatch();
  const { audio, theme } = useAppSelector((state) => state.game);

  const handlerChangeBombs = (num: number) => {
    const bombValue = num < BOMBS_QTY.min ? BOMBS_QTY.min : num;
    setInputValue(bombValue);
    onChangeBombs(num);
  };

  const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) > BOMBS_QTY.max ? BOMBS_QTY.max : Number(e.target.value);
    setInputValue(value);
  };

  const handlerChangeAudio = () => {
    dispatch(setAudio(!audio));
  };

  const handlerChangeTheme = () => {
    const newTheme = theme === GameTheme.dark ? GameTheme.light : GameTheme.dark;
    dispatch(setTheme(newTheme));
  };

  return (
    <>
      <div className="level-wrapper">
        <ControllBtn
          className="theme"
          img={theme === GameTheme.dark ? themeLigth : themeDark}
          onClick={handlerChangeTheme}
        />
        <ControllBtn
          className="level-beginner btn"
          img={easy}
          size={SIZE_FIELD.small}
          onClick={() => onChangeFieldSize(SIZE_FIELD.small)}
        />
        <ControllBtn
          className="level-int btn"
          img={inter}
          size={SIZE_FIELD.medium}
          onClick={() => onChangeFieldSize(SIZE_FIELD.medium)}
        />
        <ControllBtn
          className="level-expert btn"
          img={hard}
          size={SIZE_FIELD.large}
          onClick={() => onChangeFieldSize(SIZE_FIELD.large)}
        />
        <label className="lable-bomb-qty" htmlFor="bomb-input">
          <img src={bomb} alt="bombs lable" />
        </label>
        <input
          className="level-bomb"
          id="bomb-input"
          type="number"
          value={value}
          onKeyDown={() => handlerChangeBombs(value)}
          onChange={handlerChangeInput}
        />
      </div>
      <div className="wrapper-current-game">
        <div className="sound setiing" onClick={handlerChangeAudio}>
          {audio ? 'ON' : 'OFF'}
        </div>
        <div className="timer setiing">{timer}</div>
        <div
          className={`game-icon ${isLeftClick ? 'mousedown' : ''} ${isOver ? 'lose' : ''}${isWin ? 'win' : ''}`}
          onClick={onReset}
        />
        <div className="flags setiing">{flag}</div>
        <div className="moves setiing">{moves}</div>
      </div>
    </>
  );
}

export default GameSettings;
