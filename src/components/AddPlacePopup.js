import PopupWithForm from "./PopupWithForm";
import React from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddPlacePopup(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  // Сабмит новой карточки
  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onUpdateCard({
      name: values.name,
      link: values.link
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setValues({
        name: '',
        link: ''
      })
      resetForm()
    }
  }, [props.isOpen,setValues, resetForm])

  return (
    <PopupWithForm
      onSubmit={handleAddPlaceSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'add-place'}
      buttonState={isValid}
      buttonText={'Создать'}
      title={'Новое место'}
    >
      <label htmlFor="card-name"/><input onChange={handleChange}
                                         className={` popup__input ${isValid.name ? '' : `popup__input_type_error`} popup__input_element_title `}
                                         type="text"
                                         value={values.name || ""} placeholder="Название" id="card-name" name="name"
                                         minLength="2" maxLength="30" required/>
      <span id="card-name-error" className={`popup__error${isValid.name ? '' : `_visible`}`}>
        {isValid.name ? '' : errors.name}
      </span>
      <label htmlFor="link"/><input onChange={handleChange}
                                    className={` popup__input ${isValid.link ? '' : `popup__input_type_error`} popup__input_element_link `}
                                    type="url"
                                    value={values.link || ""} placeholder="Ссылка на картинку" id="link" name="link"
                                    required/>
      <span id="link-error" className={`popup__error${isValid.link ? '' : `_visible`}`}>
        {isValid.link ? '' : errors.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
