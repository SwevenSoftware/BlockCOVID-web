import React, { MouseEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface AddProps {
  title_A: string;
  isOpen_A: boolean;
  onClose_A: () => void;
}



export const Add_Modal: React.FC<AddProps> = ({title_A, isOpen_A, onClose_A, children}) => {
  
  const outsideRef_A = React.useRef(null);

  const handleCloseOnOverlay_A = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef_A.current) {
      onClose_A();
    }
  }

  return isOpen_A ? (
    <div className={'add_modal'}>
      <div
        className={'add_modal_overlay'}
        ref = {outsideRef_A}
        onClick = {onClose_A} />
      <div className= {'add_modal_box'}>
        <button
          className={'add_modal_close'}
          onClick={onClose_A}
        >
          <CloseIcon />
        </button>
        <div className={'pencil_modal_title'}>
          {title_A}
        </div>
        <div className={'add_modal_content'}>
          {children}
        </div>
      </div>
    </div>
  ) : null;
}