// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import type { LoginBody } from "../../../types/bodies"
import { LoadingButton } from "../components/LoadingButton";
import Modal from '../components/Modal';

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoging, setIsLoging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();

    setIsLoging(true);

    // Aqui você pode adicionar lógica de cadastro (exemplo de console log)
    console.log('whatsapp:', phone);
    console.log('Senha :', password);
    const loginData: LoginBody = {
      phone,
      password
    };
    // Exemplo de validação usando o validador importado


    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 obrigatório
      body: JSON.stringify(loginData),
    });
    
    
    const data = await response.json(); // ← parse do JSON
    console.log("Resposta do servidor:", data);
    
    if (response.ok) {

      console.log("\nLogin realizado!");
      setIsLoging(false);
      setModalMessage(data.message);
      setModalOpen(true);

    } else {
      console.error("Erro ao realizar login.", data.error);
      setModalMessage("Erro ao realizar login: "+  data.error);
      setModalOpen(true);
    }

  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>


        <label>Whatsapp
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>

        <label>Senha
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <LoadingButton
          type="submit"
          className=""
          loadingText="Logando..."
          onClick={handleSubmit}
        >
          Login
        </LoadingButton>
      </form>
      
      <Modal
        open={modalOpen}
        title="Aviso"
        onClose={() => setModalOpen(false)}
        footer={
          <button onClick={() => setModalOpen(false)}>
            Ok
          </button>
        }
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};


export default LoginPage;