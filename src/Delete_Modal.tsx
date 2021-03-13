import React, { MouseEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface DeleteProps {
  title_D: string;
  isOpen_D: boolean;
  onClose_D: () => void;
}



export const Delete_Modal: React.FC<DeleteProps> = ({title_D, isOpen_D, onClose_D, children}) => {
  
  const outsideRef_D = React.useRef(null);

  const handleCloseOnOverlay_D = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef_D.current) {
      onClose_D();
    }
  }

  return isOpen_D ? (
    <div className={'delete_modal'}>
      <div
        className={'delete_modal_overlay'}
        ref = {outsideRef_D}
        onClick = {onClose_D} />
      <div className= {'delete_modal_box'}>
        <button
          className={'delete_modal_close'}
          onClick={onClose_D}
        >
          <CloseIcon />
        </button>
        <div className={'delete_modal_title'}>
          {title_D}
        </div>
        <div className={'delete_modal_content'}>
          {children}
        </div>
      </div>
    </div>
  ) : null;
}