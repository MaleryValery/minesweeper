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

    if (!winnersFromLS) {
      return <p>No winners yet</p>;
    }

    const winners: WinnerType[] = JSON.parse(winnersFromLS);
    const titles = Object.keys(winners[0]).reverse();
    winners.sort((a, b) => a.timer - b.timer);
    return (
      <table>
        <thead>
          <tr className="table-row">
            {titles.map((el, i) => (
              <td className="table-cell" key={i}>
                {el}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {winners.map((el, i) => (
            <tr className="table-row" key={Math.random() + i}>
              <td className="table-cell" key={Math.random() + i}>
                {el.name.length > 10 ? el.name.slice(0,7)+'..':el.name}
              </td>
              <td className="table-cell num" key={Math.random() + i}>
                {el.timer}
              </td>
              <td className="table-cell num" key={Math.random() + i}>
                {el.size}
              </td>
              <td className="table-cell num" key={Math.random() + i}>
                {el.bombs}
              </td>
              <td className="table-cell num" key={Math.random() + i}>
                {el.moves}
              </td>
            </tr>
          ))}
        </tbody>
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
