
// src/controllers/financialControllerFactory.ts
import type { Request, Response } from "express";
import type { FinancialService } from "../domain/finance/services/FinancialService";

export function balanceControllerFactory(financialService: FinancialService) {
  return async function balanceController(req: Request, res: Response) {
    console.log("Dentro de balanceController", req.user?.publicId);

    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    // Alinhe com o identificador persistido: publicId (UUID) ou id (numérico)
    const accountId = req.user.publicId; // ou String(req.user.id)
    const balance = await financialService.getBalance(accountId);

    return res.json({ balance: balance.amount });
  };
}
