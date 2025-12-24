// controllers/userController.ts
import type { Request, Response, NextFunction } from "express";
import type { SignUpBody, UpdateProfileBody, UpdatePasswordBody, RecoveryBody } from "../types/bodies";
import type { IUserController } from "../interfaces/IUserController";
import { findUserByPhone, findUserByIndicationId, createUser, updateUserById, findallUser, findUserById } from "../repositories/userRepository";
import { signUpSchema, loginSchema, updateProfileSchema, updatePasswordSchema, recoveryUserSchema } from "../validations/inputsValidator";
import { recoveryAccount } from "../services/recoveryAccount"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController implements IUserController {

  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
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
    return res.status(201).json({ message: "Usuário criado" });
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {
      const data = loginSchema.parse(req.body);
      const { phone, password } = data;

      const user = await findUserByPhone(phone);
      if (!user) return res.status(401).json({ success: false, error: "Credenciais inválidas" });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ success: false, error: "Credenciais inválidas" });

      // ✅ payload com publicId (UUID) + id numérico (opcional)
      const payload = {
        publicId: user.publicId,  // UUID de users.publicId
        id: user.id,              // opcional (interno)
        name: user.name           // opcional
      };

      // ✅ assinar com o payload completo
      const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json({
        success:true,
        message: "Login realizado com sucesso",
        id: user.id,
        publicId: user.publicId,
      });

    } catch (err) {
      console.log('loginController err catch ', err)
      return res.status(401).json({
        message: 'Usuário não autorizado',
      });
    }
  }

  async listUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log("listUserController:", req.user?.id);

    try {
      const userId = req.user!.id;



      const user = await findUserById(userId);
      console.log('user encontrado em listUserController:', user);
      // ❌ Usuário não existe
      if (!user) {
        return res.status(401).json({ error: "Nenhum usuário encontrado" });
      }


      return res.status(200).json({
        user: user,
      });
    } catch (err) {
      next(err);
    }
    return res.json([]);
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log("updateProfileController req.validatedBody:", req.validatedBody);
    try {
      const userId = req.user!.id;

      const data = req.validatedBody as UpdateProfileBody;

      await updateUserById(userId, data);

      res.status(200).json({
        message: "Perfil atualizado com sucesso",
      });
    } catch (err) {
      next(err);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;

      const { password } = req.validatedBody as UpdatePasswordBody;

      const passwordHash: string = await bcrypt.hash(password, 10);
      console.log('passwordHash em updatePasswordController:', typeof (passwordHash));

      await updateUserById(userId, { password: passwordHash });

      res.status(200).json({
        message: "Senha atualizada com sucesso",
      });
    } catch (err) {
      next(err);
    }
  }

  async recovery(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { phone } = req.validatedBody as RecoveryBody;

      await recoveryAccount(phone);

      return res.status(202).json({
        message: "Dados de recuperação enviados",
      });
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
    return res.json({ message: "Recuperação iniciada" });
  }

  async listAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
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
    return res.json([]);
  }

  async logout(req: Request, res: Response): Promise<Response> {
    console.log('acessou o logout...')
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(204).send('logout realizado');
  }
}

