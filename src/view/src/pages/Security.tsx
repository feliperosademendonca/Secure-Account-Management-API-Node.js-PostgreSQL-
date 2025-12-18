// src/pages/Security.tsx

import React, { useState } from "react";
import type { UpdatePasswordBody } from "../../../types/bodies";
import { LoadingButton } from "../components/LoadingButton";
import Modal from "../components/Modal";

const UpdateSecurityPage: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsUpdating(true);

        const data: UpdatePasswordBody = {
            password,
            confirmPassword,
        };

        try {
            const response = await fetch("http://localhost:3000/user/password", {
                method: "put",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // 🔥 envia cookie
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar senha");
            }

            setModalMessage("Senha atualizada com sucesso!");
            setModalOpen(true);

            // limpa campos por segurança
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            setModalMessage("Erro ao atualizar senha. Verifique os dados.");
            setModalOpen(true);
        } finally {
            setIsUpdating(false);
        }
    };
    return (
        <div className="container">
            <h2>Atualizar Senhas</h2>

            <form onSubmit={handleSubmit}>
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

export default UpdateSecurityPage;
