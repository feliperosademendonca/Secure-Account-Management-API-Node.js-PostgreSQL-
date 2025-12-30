// src/controllers/financialController.ts
import type { Request, Response } from "express";
import { FinancialService } from "../domain/finance/services/FinancialService";
import { Money } from "../domain/finance/value-objects/Money";
import { PostgresFinancialRepository } from "../infrastructure/postgres/PostgresLedgerRepository.ts";
import { withTransaction } from "../database/withTransaction.ts";

// 🔗 Composição
const repository = new PostgresFinancialRepository();
const financialService = new FinancialService(repository);

export async function depositController(req: Request,  res: Response) {

  console.log('req.body:', req.body)
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  console.log('user', req.user)

  const amount = Money.fromCents(Number(req.body.amount));
  console.log('depositController amount', amount)

  const entry = await withTransaction(async (executor) => {
    return financialService.deposit(
      executor,
      req.user!.publicId,
      amount
    );
  });

  console.log('return entry:',entry)
  
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

  const amount = Money.fromCents(Number(req.body.amount));

  const entry = await withTransaction(async (executor) => {
    return financialService.withdraw(
      executor,
      req.user!.publicId,
      amount
    );
  });

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
    console.log("Usuário não autenticado")
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const balance = await financialService.getBalance(req.user.publicId);

  return res.json({
    balance: balance.toReais,
  });
}
