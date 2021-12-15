import PopupWithForm from "./PopupWithForm";
import React from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";


function EditAvatarPopup(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    if (props.isOpen) {
      setValues({
        avatar: ''
      })
      resetForm()
    }
  }, [props.isOpen, setValues, resetForm])

//сабмит  атватара
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: values.avatar
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'add-avatar'}
      buttonText={'Сохранить'}
      buttonState={isValid}
      title={' Обновить аватар'}
    >
      <label htmlFor="avatar-link"/><input onChange={handleChange}
                                           className={` popup__input ${isValid.avatar ? '' : `popup__input_type_error`} popup__input_avatar_link`}
                                           type="url"
                                           value={values.avatar || ""} placeholder="Ссылка на аватар" id="avatar-link"
                                           name="avatar" required/>
      <span id="avatar-link-error" className={`popup__error${isValid.avatar ? '' : `_visible`}`}>
        {isValid.avatar ? '' : errors.avatar}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
