import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
  const [name, setName] = React.useState(''); //Хуки стейтов
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const [inputValid, setInputValid] = React.useState({name: true, about: true});
  const [errorMessage, setErrorMessage] = React.useState({name: '', about: ''});

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about)
      setInputValid(false);
      setErrorMessage('');
    }
  }, [props.isOpen, currentUser])


  // Функция  перезаписи значений переменой setName от инпутов
  function handleChangeName(e) {
    setName(e.target.value);
    setInputValid({
      ...inputValid,
      [e.target.name]: e.target.validity.valid
    })
    setErrorMessage({
      ...errorMessage,
      [e.target.name]: e.target.validationMessage
    })
  }

  // Функция  перезаписи значений переменой setDescription от инпутов
  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setInputValid({
      ...inputValid,
      [e.target.name]: e.target.validity.valid
    });
    setErrorMessage({
      ...errorMessage,
      [e.target.name]: e.target.validationMessage
    });
  }

//Сабмит новых значений профиля
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'edit-profile'}
      buttonText={'Сохранить'}
      buttonState={inputValid}
      title={'Редактировать профиль'}
    >
      <label htmlFor="name"/><input className={` popup__input ${inputValid.name ? '' : `popup__input_type_error`  }popup__input_element_name `} type="text"
                                    value={name || ""} placeholder="Введите имя" id="name" name="name"
                                    minLength="2" maxLength="40" required onChange={handleChangeName}/>
      <span id="name-error" className={`popup__error${inputValid.name ? '' : `_visible`}`}>
        {inputValid.name ? '' : errorMessage.name}
      </span>
      <label htmlFor="about"/><input className={` popup__input ${inputValid.about ? '' : `popup__input_type_error`  }popup__input_element_job `} type="text"
                                     value={description || ""} placeholder="Введите профессию" id="about" name="about"
                                     minLength="2" maxLength="200" required
                                     onChange={handleChangeDescription}/>
      <span id="about-error" className={`popup__error${inputValid.about ? '' : `_visible`}`}>
        {inputValid.about ? '' : errorMessage.about}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
