import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_info-tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_info-tooltip">
        <button className="popup_type_info-tooltip-close-icon" type="button" onClick={props.onClose}/>
        <form className="popup__form popup__form_type_info-tooltip" name="tooltip-popup">
          <div className="popup_type_info-tooltip-title-container">
            <h2
              className={`popup_type_info-tooltip-title ${props.infoToolTipClass ? 'popup_type_info-tooltip-title_denied' : ''}`}>{props.infoToolTipTitle}</h2>
          </div>
          <div className="popup_type_info-tooltip-image"/>
          <p className={'popup_type_info-tooltip-subtitle'}>{props.registerPopupSubtitle}</p>
        </form>
      </div>
    </div>
  )
}

export default InfoTooltip;
