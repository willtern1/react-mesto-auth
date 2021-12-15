import React from "react";
import '../index.css'


function Login(props) {
  const [inputValues, setInputValues] = React.useState({email: '', password: ''});
  const [inputValid, setInputValid] = React.useState({email: true, password: true});
  const [errorMessage, setErrorMessage] = React.useState({email: '', password: ''});

  function handleChangeInputs(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
    setInputValid({
      ...inputValid,
      [e.target.name]: e.target.validity.valid
    });
    setErrorMessage({
      ...errorMessage,
      [e.target.name]: e.target.validationMessage
    });
  }

  React.useEffect(() => {
    setInputValues({
      email: '',
      password: ''
    })
    setInputValid({email: false, password: false});
    setErrorMessage({email: '', password: ''});
  }, [])

  function handleSubmitAuthorization(e) {
    e.preventDefault()

    props.handleSubmitAuthorize(inputValues.email, inputValues.password)
  }

  return (
    <div className={'login-container'}>
      <form className={'login-container__form'} onSubmit={handleSubmitAuthorization}>
        <h2 className={'login-container__title'}>Вход</h2>
        <label htmlFor="login-email"/><input
        className={`login-container__input ${inputValid.email ? '' : `popup__input_type_error`}`} placeholder={"Email"}
        type={"email"}
        value={inputValues.email || ''} id={'login-email'} name={'email'}
        onChange={handleChangeInputs} minLength="6" maxLength="30" required/>
        <span id={'login-email-error'} className={`popup__error${inputValid.email ? '' : `_visible_register-error`}`}>
          {inputValid.email ? '' : errorMessage.email}
        </span>
        <label htmlFor="login-password"/><input
        className={`${inputValid.password ? '' : `popup__input_type_error`} login-container__input`}
        placeholder={"Пароль"}
        type={"password"} value={inputValues.password || ''}
        id={'login-password'}
        name={'password'} onChange={handleChangeInputs} minLength="6" maxLength="15" required/>
        <span id={'login-password-error'}
              className={`popup__error${inputValid.password ? '' : `_visible_register-error`}`}>
          {inputValid.password ? '' : errorMessage.password}
        </span>
        <button
          className={`login-container__button ${inputValid.email && inputValid.password ? '' : `register-container__button_invalid`}`}
          disabled={!inputValid.email && inputValid.password} type={'submit'}>Войти
        </button>
      </form>
    </div>
  )
}

export default Login;
