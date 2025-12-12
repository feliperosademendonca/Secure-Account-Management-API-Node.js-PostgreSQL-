import React from "react";
import SignupPage from "./pages/SignupPage.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import UpdatePage from "./pages/UpdatePage.tsx";
import RecoveryPage from "./pages/RecoveryPage.tsx";

function App() {
  return (
    <>
      <IndexPage />
      <SignupPage />
      <LoginPage />
      <UpdatePage />
      <RecoveryPage />
    </>
  );
}

export default App;
