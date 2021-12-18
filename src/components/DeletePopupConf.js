import React from 'react';
import PopupWithForm from "./PopupWithForm";



const DeletePopupConf = (props) => {
function delCard(e) {
  e.preventDefault()
  props.handleCardDelete(props.selectedDelCard.card)
  props.onClose()
}
    return (
    <PopupWithForm
      onSubmit={delCard}
      name={'delete-card'}
      buttonText={'ДА'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={'Вы уверены?'}
      buttonState={true}
    />
  );
};

export default DeletePopupConf;
