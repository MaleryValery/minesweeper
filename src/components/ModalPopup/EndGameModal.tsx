import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GameStatus, WinnerType } from '../../utils/types';
import lose from '../../assets/boom.png';
import win from '../../assets/winner.png';
import './EndGameModal.scss';
import { setGameState } from '../../store/gameSlice';
import { ChangeEvent, useState } from 'react';
import CustomModal from './CustomModal';

function ModalPopup() {
  const { gameStatus, winner } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [winnerName, setWinnerName] = useState('');

  const handlerCloseModal = () => {
    dispatch(setGameState(GameStatus.live));
  };

  const handlerChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setWinnerName(e.target.value);
  };

  const handlerSaveName = () => {
    if (winner === null) return;
    const winerWithName = { ...winner, name: winnerName };
    const prevWinners = localStorage.getItem('allwinners');
    if (prevWinners) {
      const updateWinners: WinnerType[] = JSON.parse(prevWinners);
      const cutedWinnersArr = updateWinners.length > 9 ? updateWinners.slice(0, 9) : updateWinners;
      localStorage.setItem('allwinners', JSON.stringify([...cutedWinnersArr, winerWithName]));
    } else {
      localStorage.setItem('allwinners', JSON.stringify([winerWithName]));
    }
    dispatch(setGameState(GameStatus.live));
  };

  return (
    <CustomModal>
      {gameStatus === GameStatus.lose && (
        <button className="close-modal-btn" onClick={handlerCloseModal}>
          ➕
        </button>
      )}
      <img src={`${gameStatus === GameStatus.lose ? lose : win}`} alt="end game" />
      <p>{gameStatus === GameStatus.lose ? 'You lose, try one more time' : 'You win! Well done!'}</p>
      {gameStatus === GameStatus.win && (
        <div className="input-wrapper">
          <label className="label-win-name" htmlFor="">
            Enter your name
          </label>
          <input className="input-win-name" placeholder="winner name" value={winnerName} onChange={handlerChangeName} />
          <button disabled={winnerName.length < 1} className="save-win-btn" onClick={handlerSaveName}>
            save
          </button>
        </div>
      )}
    </CustomModal>
  );
}

export default ModalPopup;
