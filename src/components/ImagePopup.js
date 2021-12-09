import React from "react";

//jsx попапа с картинкой
function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.link !== '' ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close-icon" type="button" onClick={props.onClose}/>
        <form className="popup__form popup__form_type_image" name="edit-profile-popup">
          <img className="popup__picture-image" src={props.card ? props.card.link : ""}
               alt={props.card ? props.card.name : ""}/>
          <h2 className="popup__title-image">{props.card ? props.card.name : ""}</h2>
        </form>
      </div>
    </div>
  )
}

export default ImagePopup;
