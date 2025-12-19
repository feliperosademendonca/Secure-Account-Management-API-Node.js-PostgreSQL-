import { Link, NavLink } from "react-router-dom";

export default function MainMenu() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <strong>PPF</strong>
          </li>
        </ul>

        <ul>
          <li>
            <NavLink to="/">Index</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/perfil">Perfil</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
