import React from 'react';
import './style.css';

export const INITIAL_POPUP_CONFIG = {
  isOpen: false,
  message: '',
  btnType: '',
  size: '',
  cancel: {
    action: () => {},
    label: '',
  },
  confirm: {
    action: () => {},
    label: '',
  },
};
function Popup({
  content, popupConfig, children,
}) {
  return (
    <div className="popup-box">
      <div className={`box ${popupConfig.size}`}>
        {content}
        {children}
        <div className="btn-group">
          <button type="button" className={`${popupConfig.btnType} btn-outline btn-shared`} onClick={popupConfig.cancel.action}>{popupConfig.cancel.label}</button>
          <button type="button" className={`${popupConfig.btnType} btn-fill btn-shared`} onClick={popupConfig.confirm.action}>{popupConfig.confirm.label}</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;