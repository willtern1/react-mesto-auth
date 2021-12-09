import React from "react";
import {Link} from "react-router-dom";

function Register() {
  return (
    <div className={"register-container"}>
      <form className={"register-container__form"}>
        <h2 className={"register-container__title"}>Регистрация</h2>
        <label htmlFor="login-email"/><input className={"register-container__input"} placeholder={"Email"}
                                             name={"register-email"} id={"register-email"} type={"email"}
                                             defaultValue={""} required/>
        <span id={'register-email-error'} className="popup__error"/>
        <label htmlFor="register-password"/><input className={"register-container__input"} placeholder={"Пароль"}
                                                   name={"register-password"} id={"register-password"} type={"password"}
                                                   defaultValue={""} required/>
        <span id={'register-password-error'} className="popup__error"/>
        <button className={"register-container__button"} type={'submit'}>Зарегистрироваться</button>
        <p className={"register-container__subtitle"}>Уже заригистрирвоанны? <Link
          className={"register-container__link"} to="/sign-in">Войти</Link></p>
      </form>
    </div>
  )
}

export default Register;
