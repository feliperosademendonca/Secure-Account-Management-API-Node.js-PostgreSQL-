
// src/pages/UpdatePage.tsx
import React, { useState } from 'react';
import type { UpdateBody } from "../../../types/bodies"
import { LoadingButton } from "../components/LoadingButton";
import Modal from '../components/Modal';

const UpdatePage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // Exemplo: id vindo do login / localStorage

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUpdating(true);


    const updateData: UpdateBody = {
      name,
      phone,
      password,
      confirmPassword,
    };

    const response = await fetch("http://localhost:3000/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 envia cookie
      body: JSON.stringify(updateData),
    });


    if (response.ok) {

      console.log("Usuário atualizado com sucesso");
      setModalMessage("Usuário atualizado com sucesso!");
      setModalOpen(true);

    } else {

      console.error("Erro ao atualizar usuário");
      setModalMessage("Erro ao atualizar usuário - verifique os dados informados.");
      setModalOpen(true);
    }
  };

  return (
    <div className="container">
      <h2>Update</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Usuário
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Whatsapp
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>

        <label>
          Nova senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Confirme a senha
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <LoadingButton
          type="submit"
          className=""
          loadingText="Atualizando..."
          onClick={handleSubmit}
        >
          Atualizar
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

export default UpdatePage;
