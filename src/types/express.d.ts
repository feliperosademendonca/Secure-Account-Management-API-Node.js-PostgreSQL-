import "express";
import { SignUpBody, LoginBody, UpdateBody } from "./bodies";  // Importando os tipos

declare global {
  namespace Express {
    interface Request {
      validatedBody?: SignUpBody | LoginBody | UpdateBody | recoveryData; // Usando os tipos importados
      user?: { id: string };  // Para garantir que o ID do usuário seja extraído do JWT
    }
  }
}

export {};
