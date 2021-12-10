import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <h2 className="header__title">Mesto</h2>
      <p className="header__subtitle">Russia</p>
      <p className={"header__user-auth"}>willtern@mail.ru</p>
      <nav className={"header__nav"}>
        <ul className={"header__list"}>
          <li style={{height: '20px'}}><Link className={"header__list-link"} to="/sign-up">{props.loggedIn ? 'Регистрация' : 'Войти'}</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
