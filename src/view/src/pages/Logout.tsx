// src/pages/SignupPage.tsx
import React, { useState } from 'react';
 import { LoadingButton } from "../components/LoadingButton";
import Modal from '../components/Modal';

function LogoutPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();




    const response = await fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Resposta do servidor:", response);

    if (response.ok) {

      console.log("\nLogout realizado com sucesso!");
      setModalMessage("Logout realizado com sucesso!");
      setModalOpen(true);

    } else {

      console.error("Erro ao realizar logout");
      setModalMessage("Erro ao realizar logout.");
      setModalOpen(true);
    }

  };

  return (
    <div className="container">

      <h2>Logout</h2>
      <form onSubmit={handleSubmit}>
        
        <LoadingButton
          type="submit"
          className=""
          loadingText="Saindo..."
          onClick={handleSubmit}
        >
          Logout
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



export default LogoutPage;


