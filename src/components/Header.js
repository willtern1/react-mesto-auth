import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <h2 className="header__title">Mesto</h2>
      <p className="header__subtitle">Russia</p>
      <nav className={"header__nav"}>
        <ul className={"header__list"}>
          <li><Link className={"header__list-link"} to="/sign-up">{props.linkText}</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
