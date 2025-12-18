// src/interfaces/IUserController.ts
import type { Request, Response, NextFunction } from "express";

 
 
export interface IUserController {
  
  create(req: Request, res: Response, next: NextFunction): Promise<Response>;
  login(req: Request, res: Response, next: NextFunction): Promise<Response>;
  updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
  updatePassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  recovery(req: Request, res: Response, next: NextFunction): Promise<Response>;
  listAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response>;
  logout(req: Request, res: Response): Promise<Response>;
}