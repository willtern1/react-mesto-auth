import React from "react";
import {Link} from "react-router-dom";
import useFormAndValidation from "../hooks/useFormAndValidation";


function Register(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  React.useEffect(() => {
    setValues({
      email: '',
      password: ''
    })
    resetForm()
  }, [])
  function handleSubmitRegister(e) {
    e.preventDefault()
    props.handleSubmitRegister(values.email, values.password)
  }

  return (
    <div className={"register-container"}>
      <form className={"register-container__form"} onSubmit={handleSubmitRegister}>
        <h2 className={"register-container__title"}>Регистрация</h2>
        <label htmlFor="login-email"/><input
        className={`register-container__input ${isValid.email ? '' : `popup__input_type_error`}`}
        placeholder={"Email"}
        name={"email"} id={"register-email"} type={"email"}
        value={values.email || ""} onChange={handleChange} minLength="6" maxLength="30" required/>
        <span id={'register-email-error'} className={`popup__error${isValid.email ? '' : `_visible_register-error`}`}>
          {isValid.email ? '' : errors.email}
        </span>
        <label htmlFor="register-password"/><input
        className={`${isValid.password ? '' : `popup__input_type_error`} register-container__input`}
        placeholder={"Пароль"}
        name={"password"} id={"register-password"} type={"password"}
        value={values.password || ""} onChange={handleChange} minLength="6" maxLength="15" required/>
        <span id={'register-password-error'} className={`popup__error${isValid.password ? '' : `_visible_register-error`}`}>
          {isValid.password ? '' : errors.password}
        </span>
        <button
          className={`register-container__button ${isValid ? '' : `register-container__button_invalid`}`}
          disabled={!isValid} type={'submit'}>Зарегистрироваться
        </button>
        <p className={"register-container__subtitle"}>Уже заригистрирвоанны? <Link
          className={"register-container__link"} to="/sign-in">Войти</Link></p>
      </form>
    </div>
  )
}

export default Register;
