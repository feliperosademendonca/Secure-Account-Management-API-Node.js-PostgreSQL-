// controllers/userController.ts
import type { Request, Response, NextFunction } from "express";
import type { SignUpBody, UpdateBody, recoveryBody } from "../types/bodies";
import { findUserByPhone, findUserByIndicationId, createUser, updateUserById } from "../repositories/userRepository";
import { updateUserSchema, recoveryUserSchema } from "../validations/inputsValidator";
import { recoveryAccount } from "../services/recoveryAccount"
import bcrypt from "bcryptjs";
import { loginSchema } from "../validations/inputsValidator.js";
import jwt from "jsonwebtoken";


export const createUserController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const data = req.validatedBody as SignUpBody;
    console.log("Dados validados em createUserController:", data);

    const { name, phone, password, indicationId, email } = data;

    // 🔍 Verifica se telefone ja esta cadastrado
    const userExists = await findUserByPhone(phone);

    if (userExists) {
      console.log('Telefone ja cadastrado')
      return res.status(400).json({ error: "Telefone já cadastrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.log('passwordHash:', passwordHash)

    // 🧨 Cria usuário no banco
    const newUser = await createUser({
      name,
      phone,
      email: email ?? null,
      password: passwordHash,
      indicationId
    });
    console.log('Novo Usuario em createUserController', newUser)
    return res.status(201).json({
      message: "Usuário criado com sucesso",
      id: newUser.id
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  console.log('loginController req.body:', req.body)
  try {
    const data = loginSchema.parse(req.body); // validação
    const { phone, password } = data;

    const user = await findUserByPhone(phone);

    console.log('return user:', user)
    const isValid = await bcrypt.compare(password, user.password);
    console.log('isValid:', isValid)

    if (!isValid) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    if (!user) {
      console.log('Usuario não localizado')

      return res.status(400).json({ error: "Credenciais inválidas" });
    }


    console.log("Login realizado com sucesso")


    // 🔐 AQUI o token nasce
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    // 🍪 AQUI ele é armazenado
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });


    return res.status(200).json({
      message: "Login realizado com sucesso",
      id: user.id,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {

  const userId = req.user?.id as string; // 🔥 vem do JWT


  const data = updateUserSchema.parse(req.body);

  const passwordHash = await bcrypt.hash(data.password, 10);

  console.log('passwordHash:', passwordHash)

  data.password = passwordHash

  console.log('data para atualizar cadastro:', data)

  return res.status(200).json({
    message: "Usuário atualizado com sucesso",
  });
};

export const recoveryUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone } = req.validatedBody as recoveryBody;

    await recoveryAccount(phone);

    return res.status(202).json({
      message: "Dados de recuperação enviados",
    });
  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
};


