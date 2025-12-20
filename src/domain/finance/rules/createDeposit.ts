//./src/domain/finance/rules/createDeposit.ts

import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";

export function createDeposit(params: {
  id: string;
  accountId: string;
  amount: Money;
}): LedgerEntry {
  if (params.amount.amount <= 0) {
    throw new Error("Depósito deve ser maior que zero");
  }

  return new LedgerEntry(
    params.id,
    params.accountId,
    TransactionType.CREDIT,
    params.amount,
    new Date()
  );
}
