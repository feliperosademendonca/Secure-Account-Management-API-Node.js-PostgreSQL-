// controllers/userController.js
import type { Request , Response, NextFunction }  from 'express';
import type { SignUpBody } from "../types/express"

import {  findUserByPhone,  findUserByIndicationId,  createUser } from "../repositories/userRepository.js";

 export const createUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.validatedBody as SignUpBody; // <-- vem do middleware
    console.log("Dados validados:", data);

    const { name, phone, password, indicationId, email } = data;

    const userExistByPhone = findUserByPhone(phone);
    if (userExistByPhone) {
      return res.status(400).json({ error: "Telefone já cadastrado" });
    }

    if (indicationId) {
      const indicationOwner = findUserByIndicationId(indicationId);
      if (!indicationOwner) {
        return res.status(400).json({ error: "Código de indicação inválido" });
      }
    }

    const result = createUser({
      name,
      phone,
      email: email || null,
      password,
      indicationId,
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      id: result.id,
    });
  } catch (err) {
    next(err);
  }
};

