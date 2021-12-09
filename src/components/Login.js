import React from "react";
import '../index.css'

function Login() {
  return (
    <div className={'login-container'}>
      <form className={'login-container__form'}>
        <h2 className={'login-container__title'}>Вход</h2>
        <label htmlFor="login-email"/><input className={'login-container__input'} placeholder={"Email"} type={"email"}
                                             defaultValue={""} id={'login-email'} name={'login-email'} required/>
        <span id={'login-email-error'} className="popup__error"/>
        <label htmlFor="login-password"/><input className={'login-container__input'} placeholder={"Пароль"}
                                                type={"password"} defaultValue={""} id={'login-password'}
                                                name={'login-password'} required/>
        <span id={'login-password-error'} className="popup__error"/>
        <button className={'login-container__button'} type={'submit'}>Войти</button>
      </form>
    </div>
  )
}

export default Login;
