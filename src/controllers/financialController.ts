
// src/controllers/financialController.ts
import type { Request, Response } from "express";
import { FinancialService } from "../domain/finance/services/FinancialService";
import { Money } from "../domain/finance/value-objects/Money";
import { PostgresFinancialRepository } from "../infrastructure/postgres/PostgresFinancialRepository";
import { withTransaction } from "../database/transaction";

// 🔗 Composição
const repository = new PostgresFinancialRepository();
const financialService = new FinancialService(repository);

export async function depositController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const amount = new Money(Number(req.body.amount));

  const entry = await withTransaction(async (client) => {
    console.log('withTransaction req.user:', req.user)
    return financialService.deposit(client, req.user?.publicId, amount);
  });

  return res.status(201).json({
    message: "Depósito realizado com sucesso",
    entry,
  });
}

export async function withdrawController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const amount = new Money(Number(req.body.amount));

  const entry = await withTransaction(async (client) => {
    return financialService.withdraw(client, req.user.publicId, amount);
  });

  return res.status(201).json({
    message: "Saque realizado com sucesso",
    entry,
  });
}

export async function balanceController(req: Request, res: Response) {
  console.log('Dentro de balanceController', req.user?.publicId)
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  const balance = await financialService.getBalance(req.user.publicId);
  console.log('retorno do balnce:', balance)
  return res.json({
    balance: balance.amount,
  });
}
