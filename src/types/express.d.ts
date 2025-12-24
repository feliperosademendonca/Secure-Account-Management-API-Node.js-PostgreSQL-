
// src/types/express.d.ts
 
import "express";
import type { SignUpBody, LoginBody, UpdateBody, UpdatePasswordBody, RecoveryBody } from "./bodies"; 
// ↑ Ajuste o nome do tipo de recuperação conforme o que você realmente exporta de ./bodies
//    (usei 'RecoveryBody' como exemplo de um nome mais padrão)


 
export type AuthUser = {
 id: number;
 publicId: string
 name: string;
 phone: string;
 email?: string | null; 
};

// Módulo de augmentation: adiciona campos ao Request do Express
declare global {
  namespace Express {
    interface Request {
      
      validatedBody?: SignUpBody | LoginBody | UpdateBody | UpdatePasswordBody | RecoveryBody;
 
      user?: AuthUser;
    }
  }
}

export {};



 

