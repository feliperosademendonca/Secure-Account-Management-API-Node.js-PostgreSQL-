//./router/routers.ts
import express, { Router } from "express";
import type { Request, Response } from 'express';
 import { authenticateJWT } from "../middlewares/jwt.ts";

export const router = Router();
import { signUpSchema, loginSchema, updatePasswordSchema, updateProfileSchema, recoveryUserSchema } from "../validations/inputsValidator.ts"
import { UserController } from "../controllers/userController.ts";
import { validate } from "../middlewares/validateMiddleware.ts";

const userController = new UserController();

router.get("/", (req: Request, res: Response) => {
  res.send(`Rota index`);
});

router.post("/signup", validate(signUpSchema), userController.create);

router.post("/login", validate(loginSchema), userController.login);

router.get("/profile/me", authenticateJWT, userController.listUser);

router.put("/profile", authenticateJWT, validate(updateProfileSchema), userController.updateProfile);

router.put("/password", authenticateJWT, validate(updatePasswordSchema), userController.updatePassword);

router.post("/recovery", validate(recoveryUserSchema), userController.recovery)

router.get("/allusers", authenticateJWT, userController.listAllUsers);

router.post("/logout", authenticateJWT, userController.logout);

router.get("/status", (req: Request, res: Response) => {
  res.send('Status API: OK')
});
  

export default router


