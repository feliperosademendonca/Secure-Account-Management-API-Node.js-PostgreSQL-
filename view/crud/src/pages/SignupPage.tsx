// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import type { SignUpBody } from "../../../../types/express"
 const SignupPage: React.FC = () => {
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

    const signUpData: SignUpBody = {
      name,
      phone,
      password,
      confirmPassword,
      indicationId
    };
    // Exemplo de validação usando o validador importado
 
    const response =  await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData)
    });

    console.log("Resposta do servidor:", response);
    
    if (response.ok) {
      console.log("\nCadastro realizado!");
    } else {
      console.error("Erro ao cadastrar");
    }

  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuário
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>Whatsapp
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>

        <label>Senha
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <label>Confirme a senha
          <input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} required />
        </label>

        <label>ID
          <input type="text" value={indicationId} onChange={(e) => setIndicationId(e.target.value)} />
        </label>

        <button type="submit">Cadastrar</button>
      </form>

    </div>
  );
};

// Exportando como exportação padrão
export default SignupPage;
