// src/middlewares/jwt.ts
import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { findUserById } from "../repositories/userRepository";
import type { User } from "../types/user";
import type { AuthTokenPayload } from "../types/auth";
import type { AuthUser } from "../types/express";



const SECRET_KEY = process.env.JWT_SECRET!;

export async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  //console.log('token?', token ? "SIM" : "NÃO")

  if (!token) return res.status(401).json({ message: "Não autenticado por falta de token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // ✅ Busca o usuário no banco
    const dbUser: User | null = await findUserById(decoded.id);
    //console.log("dbUser:", dbUser);


    if (!dbUser) {
          console.log("dbUser:", dbUser);

      return res.status(401).json({ message: "Sessão inválida. Faça login novamente." });
    }

    // ✅ Mapeia para o shape seguro que será injetado no req.user
    const authUser: AuthUser = {
      id: dbUser.id,
      publicId: dbUser.publicId, // garanta camelCase no repo
      name: dbUser.name,
      phone: dbUser.phone,
    };

    // ✅ Injeta o usuário do banco (não o decoded) no req.user
    req.user = authUser;
    //console.log('req.user dentro de jwt:', req.user)
    return next();









  } catch {
    return res.status(403).json({ message: "Token inválido" });
  }
}


