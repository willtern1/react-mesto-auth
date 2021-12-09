import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [inputValid, setInputValid] = React.useState({name: true, link: true});
  const [errorMessage, setErrorMessage] = React.useState({name: '', link: ''});
  const [inputValues, setInputValues] = React.useState({name: '', link: ''});
  //хуки стейтов переменных названия и ссылки попаапа карточки
  //Функция изменения значений в setName по вводу с инпута
  function handleChangeInputs(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
    setInputValid({
      ...inputValid,
      [e.target.name]: e.target.validity.valid
    });
    setErrorMessage({
      ...errorMessage,
      [e.target.name]: e.target.validationMessage
    });
  }

// Сабмит новой карточки
  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onUpdateCard({
      name: inputValues.name,
      link: inputValues.link
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setInputValues({
        name: '',
        link: ''
      })
      setInputValid({name: false, link: false});
      setErrorMessage({name: '', link: ''});
    }
  }, [props.isOpen])

  return (
    <PopupWithForm
      onSubmit={handleAddPlaceSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'add-place'}
      buttonState={inputValid.name && inputValid.link}
      buttonText={'Создать'}
      title={'Новое место'}
    >
      <label htmlFor="card-name"/><input onChange={handleChangeInputs}
                                         className={` popup__input ${inputValid.name ? '' : `popup__input_type_error`} popup__input_element_title `}
                                         type="text"
                                         value={inputValues.name || ""} placeholder="Название" id="card-name" name="name"
                                         minLength="2" maxLength="30" required/>
      <span id="card-name-error" className={`popup__error${inputValid.name ? '' : `_visible`}`}>
        {inputValid.name ? '' : errorMessage.name}
      </span>
      <label htmlFor="link"/><input onChange={handleChangeInputs}
                                    className={` popup__input ${inputValid.link ? '' : `popup__input_type_error`} popup__input_element_link `}
                                    type="url"
                                    value={inputValues.link || ""} placeholder="Ссылка на картинку" id="link" name="link"
                                    required/>
      <span id="link-error" className={`popup__error${inputValid.link ? '' : `_visible`}`}>
        {inputValid.link ? '' : errorMessage.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
