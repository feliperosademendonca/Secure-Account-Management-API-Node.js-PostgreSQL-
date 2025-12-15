// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import type { LoginBody } from "../../../types/bodies"
const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [indicationId, setIndicationId] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica de cadastro (exemplo de console log)
    console.log('Usuário:', name);
    console.log('whatsapp:', phone);
    console.log('Senha :', password);
    console.log('Confime a senha:', confirmPassword);
    console.log('id:', indicationId);

    const loginData: LoginBody = {
      phone,
      password
    };
    // Exemplo de validação usando o validador importado


    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 obrigatório
      body: JSON.stringify(loginData),
    });

    console.log("Resposta do servidor:", response);

    if (response.ok) {
      console.log("\nLogin realizado!");
    } else {
      console.error("Erro ao realizar login.");
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

        <button type="submit">Login</button>
      </form>

    </div>
  );
};


export default LoginPage;