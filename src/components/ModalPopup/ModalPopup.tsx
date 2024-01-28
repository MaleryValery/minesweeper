import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GameStatus } from '../../utils/types';
import lose from '../../assets/boom.png';
import win from '../../assets/winner.png';
import './ModalPopup.scss';
import { setGameState } from '../../store/gameSlice';
import { ChangeEvent, MouseEventHandler, useState } from 'react';

function ModalPopup() {
  const { gameStatus } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [winnerName, setWinnerName] = useState('');

  const handlerCloseModul = () => {
    dispatch(setGameState(GameStatus.live));
  };

  const handlerChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setWinnerName(e.target.value);
  };

  const handlerSaveName = (e: MouseEventHandler) => {
    // setWinnerName(e.target.value);
  };

  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <button className="close-modal-btn" onClick={handlerCloseModul}>
          ➕
        </button>
        <img src={`${gameStatus === GameStatus.lose ? lose : win}`} alt="end game" />
        <p>{gameStatus === GameStatus.lose ? 'You lose, try one more time' : 'You win! Well done!'}</p>
        {gameStatus === GameStatus.win && (
          <div className="input-wrapper">
            <label className="label-win-name" htmlFor="">
              Enter your name
            </label>
            <input
              className="input-win-name"
              placeholder="winner name"
              value={winnerName}
              onChange={handlerChangeName}
            />
            <button disabled={winnerName.length < 1} className="save-win-btn" onClick={handlerSaveName}>
              save
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ModalPopup;
