//./router/routers.ts
import express, { Router } from "express";
import type { Request, Response } from 'express';
import type { SignUpBody , UpdateBody}  from "../types/bodies";
import { authenticateJWT } from "../middlewares/jwt";

export const router = Router();
import { signUpSchema , loginSchema , updateUserSchema , recoveryUserSchema} from "../validations/inputsValidator.ts"
import { createUserController , updateUserController  , loginController , recoveryUserController } from "../controllers/userController.ts";
import { validate } from "../middlewares/validateMiddleware.ts";
   
router.get("/", (req: Request, res: Response) => {
  res.send(`Rota index`);
});

router.post("/signup", validate(signUpSchema), createUserController);

router.post("/login", validate(loginSchema) ,loginController);

router.patch("/update", authenticateJWT, validate(updateUserSchema ),   authenticateJWT,  updateUserController)

router.post("/recovery", validate(recoveryUserSchema ), recoveryUserController)

router.get("/status", (req: Request, res: Response) => {
  res.send('Status API: OK')
});


