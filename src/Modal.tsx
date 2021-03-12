import React, { MouseEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}



export const Modal: React.FC<ModalProps> = ({title, isOpen, onClose, children}) => {
  
  const outsideRef = React.useRef(null);

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }

  return isOpen ? (
    <div className={'modal'}>
      <div
        className={'modal_overlay'}
        ref = {outsideRef}
        onClick = {onClose} />
      <div className= {'modal_box'}>
        <button
          className={'modal_close'}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <div className={'modal_title'}>
          {title}
        </div>
        <div className={'modal_content'}>
          {children}
        </div>
      </div>
    </div>
  ) : null;
}