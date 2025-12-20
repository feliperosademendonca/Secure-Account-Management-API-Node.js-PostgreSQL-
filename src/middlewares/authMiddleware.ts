// ./src/middlewares/authMiddleware.ts
import type { Request, Response, NextFunction } from "express";
import { authenticateJWT } from "./jwt";
import { AppError } from "../shared/errors/AppError";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authenticateJWT(req);
    if (!user) {
      throw new AppError("Não autorizado", 401);
    }
    req.user = user; // adiciona info do usuário na request
    next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: "Erro interno" });
  }
}
