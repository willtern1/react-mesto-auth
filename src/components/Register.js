import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../utils/auf";


function Register(props) {
  const [inputValues, setInputValues] = React.useState({email: '', password: ''});
  const [inputValid, setInputValid] = React.useState({email: true, password: true});
  const [errorMessage, setErrorMessage] = React.useState({email: '', password: ''});

  const navigate = useNavigate();

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

  function zzTop() {
    navigate('/sing-in')
  }

  function handleSubmitRegister(e) {
    e.preventDefault()
    register(inputValues.email, inputValues.password).then((res) => {
      if (res.ok) {
        props.setRegisterPopupSubtitle('Вы успешно зарегистрировались!')
        props.setInfoToolTipTitle('ACCESS GRANTED')
        props.openRegisterPopup()
        setTimeout(props.onClose, 2000)
        setTimeout(zzTop, 2200)
      } else if (res) {
        props.setInfoToolTipClass(true)
        props.setRegisterPopupSubtitle('Что-то пошло не так! Попробуйте ещё раз.')
        props.setInfoToolTipTitle('ACCESS DENIED')
        props.openRegisterPopup()
      }
    }).catch((err) => {
      alert(err)
    })
  }

  React.useEffect(() => {
    setInputValues({
      email: '',
      password: ''
    })
    setInputValid({email: false, password: false});
    setErrorMessage({email: '', password: ''});
  }, [])
  return (
    <div className={"register-container"}>
      <form className={"register-container__form"} onSubmit={handleSubmitRegister}>
        <h2 className={"register-container__title"}>Регистрация</h2>
        <label htmlFor="login-email"/><input
        className={`register-container__input ${inputValid.email ? '' : `popup__input_type_error`}`}
        placeholder={"Email"}
        name={"email"} id={"register-email"} type={"email"}
        value={inputValues.email || ""} onChange={handleChangeInputs} minLength="6" maxLength="30" required/>
        <span id={'register-email-error'} className={`popup__error${inputValid.email ? '' : `_visible_register-error`}`}>
          {inputValid.email ? '' : errorMessage.email}
        </span>
        <label htmlFor="register-password"/><input
        className={`${inputValid.password ? '' : `popup__input_type_error`} register-container__input`}
        placeholder={"Пароль"}
        name={"password"} id={"register-password"} type={"password"}
        value={inputValues.password || ""} onChange={handleChangeInputs} minLength="6" maxLength="15" required/>
        <span id={'register-password-error'} className={`popup__error${inputValid.password ? '' : `_visible_register-error`}`}>
          {inputValid.password ? '' : errorMessage.password}
        </span>
        <button
          className={`register-container__button ${inputValid.email && inputValid.password ? '' : `register-container__button_invalid`}`}
          disabled={!inputValid.email && inputValid.password} type={'submit'}>Зарегистрироваться
        </button>
        <p className={"register-container__subtitle"}>Уже заригистрирвоанны? <Link
          className={"register-container__link"} to="/sign-in">Войти</Link></p>
      </form>
    </div>
  )
}

export default Register;
