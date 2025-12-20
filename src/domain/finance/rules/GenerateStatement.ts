// src/domain/finance/rules/GenerateStatement.ts
import { LedgerEntry } from "../entities/LedgerEntry";
import type { StatementItem } from "../dtos/StatementItem";

export class GenerateStatement {
  static execute(ledger: LedgerEntry[]): StatementItem[] {
    let balance = 0;

    return ledger.map((entry) => {
      balance += entry.amount.amount;

      return {
        date: entry.createdAt,
        type: entry.type,
        amount: entry.amount.amount,
        balanceAfter: balance,
      };
    });
  }
}
