import './CustomModal.scss';
import { ReactNode } from 'react';

type CustomModalProps = {
  children: ReactNode;
};

function CustomModal({ children }: CustomModalProps) {
  return (
    <>
      <div className="overlay" />
      <div className="modal">{children}</div>
    </>
  );
}

export default CustomModal;
