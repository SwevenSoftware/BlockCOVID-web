import React, { MouseEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface PencilProps {
  title_P: string;
  isOpen_P: boolean;
  onClose_P: () => void;
}



export const Pencil_Modal: React.FC<PencilProps> = ({title_P, isOpen_P, onClose_P, children}) => {
  
  const outsideRef_P = React.useRef(null);

  const handleCloseOnOverlay_P = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef_P.current) {
      onClose_P();
    }
  }

  return isOpen_P ? (
    <div className={'pencil_modal'}>
      <div
        className={'pencil_modal_overlay'}
        ref = {outsideRef_P}
        onClick = {onClose_P} />
      <div className= {'pencil_modal_box'}>
        <button
          className={'pencil_modal_close'}
          onClick={onClose_P}
        >
          <CloseIcon />
        </button>
        <div className={'pencil_modal_title'}>
          {title_P}
        </div>
        <div className={'pencil_modal_content'}>
          {children}
        </div>
      </div>
    </div>
  ) : null;
}