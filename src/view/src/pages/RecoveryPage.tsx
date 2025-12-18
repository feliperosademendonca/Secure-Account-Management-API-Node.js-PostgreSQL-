// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import type { RecoveryBody } from "../../../types/bodies"
import { LoadingButton } from "../components/LoadingButton";
import Modal from '../components/Modal';

function RecoveryPage() {
  const [phone, setPhone] = useState('');
  const [isRecovery, setIsRecovery] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsRecovery(true);

    // Aqui você pode adicionar lógica de cadastro (exemplo de console log)
    console.log('whatsapp:', phone);

    const recoveryData: RecoveryBody = { phone };
    // Exemplo de validação usando o validador importado

    const response = await fetch("http://localhost:3000/recovery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recoveryData)
    });

    console.log("Resposta do servidor:", response);

    if (response.ok) {

      console.log("\nAcesso enviado para telefone cadastrado!");
      setModalMessage("Acesso enviado para telefone cadastrado!");
      setModalOpen(true);

    } else {

      console.error("Erro ao recuperar acesso");
      setModalMessage("Erro ao recuperar acesso - verifique o número informado.");
      setModalOpen(true);
    }

  };

  return (
    <div className="container">
      <h2>Recuperar Acesso</h2>
      <form onSubmit={handleSubmit}>
        <label>Whatsapp
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <LoadingButton
          type="submit"
          className=""
          loadingText="Recuperando Acesso..."
          onClick={handleSubmit}
        >
          Recuperar Acesso
        </LoadingButton>      </form>

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



export default RecoveryPage;


