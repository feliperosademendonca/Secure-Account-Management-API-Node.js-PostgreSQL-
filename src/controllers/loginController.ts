 
// src/controllers/loginController.ts
import type { Request, Response } from "express";
import { findUserByPhone } from "../repositories/userRepository.js";
import { loginSchema } from "../validations/inputsValidator.js";

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body); // validação
    const { phone, password } = data;

    const user = await findUserByPhone(phone);
    if (!user) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    return res.status(200).json({
      message: "Login realizado com sucesso",
      id: user.id,
    });
  } catch (err) {
    return res.status(400).json({ error: "Erro ao processar login" });
  }
};
