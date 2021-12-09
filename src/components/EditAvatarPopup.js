import PopupWithForm from "./PopupWithForm";
import React from "react";


function EditAvatarPopup(props) {
  const avatarRef = React.useRef(''); //реф хук для прямого доступа к инпуту в дом
  const [inputValid, setInputValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')

  React.useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = '';
      setInputValid(false);
      setErrorMessage('');
    }
  }, [props.isOpen])

  function  checkInputValidity() {
    setInputValid(avatarRef.current.validity.valid)
    setErrorMessage(avatarRef.current.validationMessage);
  }

//сабмит  атватара
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'add-avatar'}
      buttonText={'Сохранить'}
      buttonState={inputValid}
      title={' Обновить аватар'}
    >
      <label htmlFor="avatar-link"/><input onChange={checkInputValidity}  ref={avatarRef} className={` popup__input ${inputValid ? '' : `popup__input_type_error`  } popup__input_avatar_link`} type="url"
                                           defaultValue="" placeholder="Ссылка на аватар" id="avatar-link"
                                           name="avatar" required/>
      <span id="avatar-link-error" className={`popup__error${inputValid ? '' : `_visible`}`}>
        {inputValid ? '' : errorMessage}{inputValid ? '' : errorMessage}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
