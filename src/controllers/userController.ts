// controllers/userController.ts
import type { Request, Response, NextFunction } from "express";
import type { SignUpBody, UpdateBody, recoveryBody } from "../types/bodies";
import { findUserByPhone, findUserByIndicationId, createUser, updateUserById , findallUser } from "../repositories/userRepository";
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

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("loginController req.body:", req.body);

  try {
    // ✅ Validação do input
    const data = loginSchema.parse(req.body);
    const { phone, password } = data;

    // 🔍 Busca usuário
    const user = await findUserByPhone(phone);

    // ❌ Usuário não existe
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // 🔐 Valida senha
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // 🔐 Gera token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // 🍪 Armazena token de forma segura
    res.cookie("token", token, {
      httpOnly: true,           // ✅ proteção XSS
      secure: process.env.NODE_ENV === "production",
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
  try {
    // 🔐 ID vem exclusivamente do JWT
    const userId = req.user?.id as string;
    console.log("updateUserController userId do JWT:", userId);

    // ✅ Validação do body
    const data = updateUserSchema.parse(req.body);
    console.log("updateUserController data:", data);

    // 🔒 Só gera hash se o usuário enviou senha
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    console.log("data para atualizar cadastro:", data);

    // 🧨 Atualiza no banco
    const updatedUser = await updateUserById(userId, data);

    console.log("Usuário atualizado:", updatedUser);

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

export const recoveryUserController = async (req: Request, res: Response, next: NextFunction) => {

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

export const listAllUserController = async (  req: Request,  res: Response,  next: NextFunction) => {
  
  console.log("listAllUserController");

  try {
  
    const users = await findallUser();

    // ❌ Usuário não existe
    if (!users) {
      return res.status(401).json({ error: "Nenhum usuário encontrado" });
    }
  

    return res.status(200).json({
      message: "Lista de Usuarios",
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

