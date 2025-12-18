// src/middlewares/jwt.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  console.log("Autenticando JWT...");
  const token = req.cookies?.token;
  console.log("cookies:", req.cookies.token);
  console.log("user:", req.user);

  console.log("Token:", token ? "SIM" : "NÃO")
  if (!token) {
    console.log("Não autenticado,Token não fornecido");
    return res.status(401).json({ message: "Não autenticado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido" });
  }
}
