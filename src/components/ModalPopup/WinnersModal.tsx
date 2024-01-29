import './WinnersModal.scss';
import CustomModal from './CustomModal';
import { WinnerType } from '../../utils/types';
import { Dispatch, SetStateAction } from 'react';

type WinnersModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

function WinnersModal({ onClose }: WinnersModalProps) {
 
  const renderWinners = () => {
    const winnersFromLS = localStorage.getItem('allwinners');
  
    if (!winnersFromLS) {return <p>No winners yet</p>}
  
    const winners: WinnerType[] = JSON.parse(winnersFromLS)
    const titles = Object.keys(winners[0]);
    winners.sort((a, b) => a.timer - b.timer);
    return (
      <table>
        <tr className="table-row">
          {titles.map((el, i) => (
            <td className="table-cell" key={i}>
              {el}
            </td>
          ))}
        </tr>
        {winners.map((el, i) => (
          <tr className="table-row">
            <td className="table-cell" key={i}>
              {el.name}
            </td>
            <td className="table-cell" key={el.timer + i}>
              {el.timer}
            </td>
            <td className="table-cell" key={el.size + i}>
              {el.size}
            </td>
            <td className="table-cell" key={el.bombs + i}>
              {el.bombs}
            </td>
            <td className="table-cell" key={el.moves + i}>
              {el.moves}
            </td>
          </tr>
        ))}
      </table>
    );
  };

  return (
    <CustomModal>
      <button className="close-modal-btn" onClick={() => onClose(false)}>
        ➕
      </button>
      {renderWinners()}
    </CustomModal>
  );
}

export default WinnersModal;
