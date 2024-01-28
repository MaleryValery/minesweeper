import './Header.scss';
import chemp from '../../assets/chemps.png';
import WinnersModal from '../ModalPopup/WinnersModal';
import { useState } from 'react';

function Header() {
  const [isWinnerOpen, setIsWinnersOpen] = useState(false);

  const handlerClick = () => {
    setIsWinnersOpen(true);
  };

  return (
    <header className="header">
      <h1>Minesweeper</h1>
      <img src={chemp} alt="chemp-modal" onClick={handlerClick} />
      {isWinnerOpen && <WinnersModal onClose={setIsWinnersOpen} />}
    </header>
  );
}

export default Header;
