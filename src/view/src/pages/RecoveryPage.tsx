// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import type { recoveryBody } from "../../../types/bodies"

function RecoveryPage() {
  const [phone, setPhone] = useState('');


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica de cadastro (exemplo de console log)
    console.log('whatsapp:', phone);

    const recoveryData: recoveryBody = { phone };
    // Exemplo de validação usando o validador importado

    const response = await fetch("http://localhost:3000/recovery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recoveryData)
    });

    console.log("Resposta do servidor:", response);

    if (response.ok) {
      console.log("\nAcesso enviado para telefone cadastrado!");
    } else {
      console.error("Erro ao recuperar acesso");
    }

  };

  return (
    <div className="container">
      <h2>Recuperar Acesso</h2>
      <form onSubmit={handleSubmit}>
        <label>Whatsapp
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <button type="submit">Recuperar Acesso</button>
      </form>

    </div>
  );
};



export default RecoveryPage;


