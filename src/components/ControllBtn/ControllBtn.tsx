import { MouseEvent } from 'react';

type ControllBtn = {
  className: string;
  img: string;
  size?: number;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

function ControllBtn({ className, img, size, onClick }: ControllBtn) {
  return (
    <div className={className} onClick={onClick} data-size={size}>
      <img src={img} alt={size ? String(size) : className} />
    </div>
  );
}

export default ControllBtn;
