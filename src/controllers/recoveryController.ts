// src/controllers/recoveryController.ts
import type { Request, Response, NextFunction } from "express";
import { recoveryAccount } from "../services/recoveryAccount";

export async function recoveryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { phone } = req.body;

    await recoveryAccount(phone);

    return res.status(200).json({
      message: "Se o telefone existir, enviaremos instruções de recuperação",
    });
  } catch (err) {
    next(err);
  }
}
