//./src/domain/finance/rules/createWithdraw.ts

import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";
import { calculateBalance } from "./calculateBalance";

export function createWithdraw(params: {
  id: string;
  accountId: string;
  amount: Money;
  ledger: LedgerEntry[];
}): LedgerEntry {
  const currentBalance = calculateBalance(params.ledger);

  if (params.amount.amount <= 0) {
    throw new Error("Saque inválido");
  }

  if (currentBalance.amount < params.amount.amount) {
    throw new Error("Saldo insuficiente");
  }

  return new LedgerEntry(
    params.id,
    params.accountId,
    "DEBIT",
    params.amount,
    new Date()
  );
}
    
