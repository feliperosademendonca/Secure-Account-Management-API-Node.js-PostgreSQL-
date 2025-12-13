
// src/controllers/loginController.ts
import type { Request, Response } from "express";
import { findUserByPhone } from "../repositories/userRepository.js";
import { loginSchema } from "../validations/inputsValidator.js";

export const loginController = async (req: Request, res: Response) => {
  console.log('loginController req.body:', req.body)
  try {
    const data = loginSchema.parse(req.body); // validação
    const { phone, password } = data;

    const user = await findUserByPhone(phone);
    console.log('return user:', user)

    if (!user) {
      console.log('Usuario não localizado')

      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    if (user.password !== password) {
      console.log('Credenciais inválidas')

      return res.status(400).json({ error: "Credenciais inválidas" });
    }
    console.log("Login realizado com sucesso")

    return res.status(200).json({

      message: "Login realizado com sucesso",
      id: user.id,
    });
  } catch (err) {
    console.log('Erro ao processar login')


    return res.status(400).json({ error: "Erro ao processar login" });
  }
};
