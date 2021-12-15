import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/useFormAndValidation";


function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    resetForm()
    if (props.isOpen) {
      setValues({
        name: currentUser.name,
        about: currentUser.about
      })
    }
  }, [props.isOpen, currentUser, setValues, resetForm])

//Сабмит новых значений профиля
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'edit-profile'}
      buttonText={'Сохранить'}
      buttonState={isValid}
      title={'Редактировать профиль'}
    >
      <label htmlFor="name"/><input className={` popup__input ${isValid.name ? '' : `popup__input_type_error`  }popup__input_element_name `} type="text"
                                    value={values.name || ""} placeholder="Введите имя" id="name" name="name"
                                    minLength="2" maxLength="40" required onChange={handleChange}/>
      <span id="name-error" className={`popup__error${isValid.name ? '' : `_visible`}`}>
        {isValid.name ? '' : errors.name}
      </span>
      <label htmlFor="about"/><input className={` popup__input ${isValid.about ? '' : `popup__input_type_error`  }popup__input_element_job `} type="text"
                                     value={values.about || ""} placeholder="Введите профессию" id="about" name="about"
                                     minLength="2" maxLength="200" required
                                     onChange={handleChange}/>
      <span id="about-error" className={`popup__error${isValid.about ? '' : `_visible`}`}>
        {isValid.about ? '' : errors.about}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
