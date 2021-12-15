import React from "react";

function Header(props) {
  return (
    <header className="header">
      <h2 className="header__title">Mesto</h2>
      <p className="header__subtitle">Russia</p>
      <p className={"header__user-auth"}>{props.loggedIn ? props.headerEmail : ''}</p>
      <nav className={"header__nav"}>
        <ul className={"header__list"}>
          <li style={{height: '20px'}}>{props.textChange()}</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
