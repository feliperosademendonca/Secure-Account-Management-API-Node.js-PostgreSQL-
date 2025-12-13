// controllers/userController.ts
import type { Request, Response, NextFunction } from "express";
import type { SignUpBody } from "../types/express";
import {
  findUserByPhone,
  findUserByIndicationId,
  createUser
} from "../repositories/userRepository";

export const createUserController = async (  req: Request,  res: Response,  next: NextFunction  ) => {
  try {
    const data = req.validatedBody as SignUpBody;
    console.log("Dados validados:", data);

    const { name, phone, password, indicationId, email } = data;

    // 🔍 Verifica telefone
    const userExists = await findUserByPhone(phone);
    if (userExists) {
      console.log('Telefone ja cadastrado')
      return res.status(400).json({ error: "Telefone já cadastrado" });
    }
 
  /*  
  // 🔍 Verifica indicação
    if (indicationId) {
      const indicationOwner = await findUserByIndicationId(indicationId);
      if (!indicationOwner) {
              console.log( "Código de indicação inválido")

        return res.status(400).json({ error: "Código de indicação inválido" });
      }
    }
 */
    // 🧨 Cria usuário no banco
    const newUser = await createUser({
      name,
      phone,
      email: email ?? null,
      password,
      indicationId
    });
    console.log('newUser',newUser)
    return res.status(201).json({
      message: "Usuário criado com sucesso",
      id: newUser.id
    });
  } catch (err) {
    next(err);
  }
};
