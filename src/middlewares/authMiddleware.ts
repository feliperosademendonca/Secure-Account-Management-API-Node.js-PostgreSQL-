// ./src/middlewares/authMiddleware.ts
import type { Request, Response, NextFunction } from "express";
import { authenticateJWT } from "./jwt";
import { AppError } from "../shared/errors/AppError";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
   console.log( 'authMiddleware ...')
  try {
    const user = req.user;
    //console.log( 'authMiddleware req.user:', user )
    if (!user) {
       console.log( "Não autorizado", 401)
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
