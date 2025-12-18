// src/pages/User/UserLayout.tsx
import { NavLink, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="container">
      <h2>Minha Conta</h2>

      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <NavLink
          to="profile"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Perfil
        </NavLink>

        <NavLink
          to="security"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Segurança
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default UserLayout;
