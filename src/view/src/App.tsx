import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./styles/custom.css";

import IndexPage from "./pages/IndexPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import RecoveryPage from "./pages/RecoveryPage";

import UserLayout from "./pages/User/UserLayout";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>

      <Link to="/">Index</Link>
      <Link to="/signup">signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/Logout">Logout</Link>


      <Routes>

        {/* Públicas */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/Logout" element={<Logout />} />


        {/* Área do usuário */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
        </Route>

      </Routes>


    </BrowserRouter>
  );
}

export default App;
