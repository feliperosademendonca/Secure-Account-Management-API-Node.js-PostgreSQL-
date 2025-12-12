//./router/routers.ts
import express, { Router } from "express";
import type { Request, Response } from 'express';
import type { SignUpBody } from "../types/express"
export const router = Router();
import { signUpSchema , loginSchema } from "../validations/inputsValidator.ts"
import { createUserController } from "../controllers/userController.ts";
import { validate } from "../middlewares/validateMiddleware.ts";
import { login } from "../controllers/loginController.ts";
 
router.get("/", (req: Request, res: Response) => {
  res.send(`Rota index`);
});


router.post("/signup", validate(signUpSchema), createUserController);

router.post("/login", login,(req: Request , res : Response ) =>{
  console.log('req.body', req.body)
  res.status(200).json({"msg":"ok", "message": "Login realizado com Sucesso"})
});

router.post("/update", (req: Request, res: Response)=>{})

router.post("/recovery", (req: Request, res: Response)=>{})

router.get("/status", (req: Request, res: Response) => {
  res.send('Status API: OK')
});