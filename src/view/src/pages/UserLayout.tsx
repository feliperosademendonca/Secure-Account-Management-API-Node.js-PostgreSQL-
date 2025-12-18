//./src/pages/User/UserLayout.tsx

import { Outlet, NavLink } from "react-router-dom";

export default function UserLayout() {
  return (
    <main className="container user-layout">
      <nav className="user-nav">
        <ul>
          <li>
            <strong>Minha Conta</strong>
          </li>
        </ul>

        <ul>
          <li>
            <NavLink to="/user/profile">Perfil</NavLink>
          </li>
          <li>
            <NavLink to="/user/security">Segurança</NavLink>
          </li>
          <li>
            <a href="/logout">Sair</a>
          </li>
        </ul>
      </nav>

      <section>
        <Outlet />
      </section>
    </main>
  );
}
