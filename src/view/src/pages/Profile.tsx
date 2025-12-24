// src/pages/Profile.tsx

import React, { useState } from 'react';
import type { UpdateProfileBody, UpdatePasswordBody } from "../../../types/bodies"
import { LoadingButton } from "../components/LoadingButton";
import Modal from '../components/Modal';
import {Me} from '../components/Me'

const UpdatePage: React.FC = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [isUpdating, setIsUpdating] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    // Exemplo: id vindo do login / localStorage

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setIsUpdating(true);


  
  const data: UpdateProfileBody = {};

  if (name.trim()) data.name = name.trim();
  if (phone.trim()) data.phone = phone.trim();
  if (email.trim()) data.email = email.trim();

  if (Object.keys(data).length === 0) {
    setModalMessage("Altere ao menos um campo para atualizar.");
    setModalOpen(true);
    setIsUpdating(false);
    return;
  }

  const response = await fetch("http://localhost:3000/user/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

    const dataReceived = await response.json(); // ← parse do JSON
    console.log('dataReceived', dataReceived)
    
  if (response.ok) {
    setModalMessage( dataReceived.message);
  } else {
    setModalMessage("Erro ao atualizar perfil."+  dataReceived.message);
  }

  setModalOpen(true);
  setIsUpdating(false);
};


    return (
        <div className="container">
            <h2>Update Profile</h2>

            <Me/>
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
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
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
