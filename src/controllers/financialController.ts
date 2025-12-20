// src/controllers/financialController.ts
import type { Request, Response } from "express";
import { FinancialService } from "../domain/finance/services/FinancialService";
import { Money } from "../domain/finance/value-objects/Money";
import { PostgresFinancialRepository } from "../infra/repositories/PostgresFinancialRepository";

// 🔗 Composição correta
const repository = new PostgresFinancialRepository();
const financialService = new FinancialService(repository);

export async function depositController(
  req: Request,
  res: Response
) {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const amount = new Money(Number(req.body.amount));

  const entry = await financialService.deposit(
    req.user.id,
    amount
  );

  return res.status(201).json({
    message: "Depósito realizado com sucesso",
    entry,
  });
}

export async function withdrawController(
  req: Request,
  res: Response
) {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const amount = new Money(Number(req.body.amount));

  const entry = await financialService.withdraw(
    req.user.id,
    amount
  );

  return res.status(201).json({
    message: "Saque realizado com sucesso",
    entry,
  });
}

export async function balanceController(
  req: Request,
  res: Response
) {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const balance = await financialService.getBalance(
    req.user.id
  );

  return res.json({
    balance: balance.amount,
  });
}
