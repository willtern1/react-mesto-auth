import React from "react";
import '../index.css'
import useFormAndValidation from "../hooks/useFormAndValidation";


function Login(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    setValues({
      email: '',
      password: ''
    })
    resetForm()
  }, [])

  function handleSubmitAuthorization(e) {
    e.preventDefault()
    props.handleSubmitAuthorize(values.email, values.password)
  }

  return (
    <div className={'login-container'}>
      <form className={'login-container__form'} onSubmit={handleSubmitAuthorization}>
        <h2 className={'login-container__title'}>Вход</h2>
        <label htmlFor="login-email"/><input
        className={`login-container__input ${isValid.email ? '' : `popup__input_type_error`}`} placeholder={"Email"}
        type={"email"}
        value={values.email || ''} id={'login-email'} name={'email'}
        onChange={handleChange} minLength="6" maxLength="30" required/>
        <span id={'login-email-error'} className={`popup__error${isValid.email ? '' : `_visible_register-error`}`}>
          {isValid.email ? '' : errors.email}
        </span>
        <label htmlFor="login-password"/><input
        className={`${isValid.password ? '' : `popup__input_type_error`} login-container__input`}
        placeholder={"Пароль"}
        type={"password"} value={values.password || ''}
        id={'login-password'}
        name={'password'} onChange={handleChange} minLength="6" maxLength="15" required/>
        <span id={'login-password-error'}
              className={`popup__error${isValid.password ? '' : `_visible_register-error`}`}>
          {isValid.password ? '' : errors.password}
        </span>
        <button
          className={`login-container__button ${isValid ? '' : `register-container__button_invalid`}`}
          disabled={!isValid} type={'submit'}>Войти
        </button>
      </form>
    </div>
  )
}

export default Login;
