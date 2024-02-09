import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="transition02__header">
      <div className="transition02__logo">
        <NavLink to="/transition02">Logo</NavLink>
      </div>
      <div className="transition02__nav">
        <ul>
          <li>
            <NavLink to="/transition02">Home</NavLink>
          </li>
          <li>
            <NavLink to="/transition02/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/transition02/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
