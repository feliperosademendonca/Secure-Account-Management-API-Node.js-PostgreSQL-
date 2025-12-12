
/*
// src/controllers/loginController.ts
import { loginSchema } from "../validations/inputsValidator";
import { response, type Request, type Response } from "express";
import { findUserByPhone } from "./dbController.js";

export const login = (req: Request, res: Response) => {
    // console.log('req.body', req.body);
    // Lógica de autenticação do usuário
    const { phone, password } = req.body;
    console.log('phone', phone);
     const userFinded = findUserByPhone(phone);
    console.log('userFinded', userFinded);
    // Aqui você implementaria a lógica para verificar as credenciais do usuário
    if (phone === userFinded.phone && password === userFinded.password) {
        console.log( userFinded?'usuário localizado':'Usuario não localizado')
        res.status(200).send({ message: "Login successful" });
    } else {
        res.status(401).send({ message: "Invalid credentials" });
    }
};
*/

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
