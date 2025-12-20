// src/domain/finance/rules/CalculateBalanceFromLedger.ts
import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";
import { DomainError } from "../../shared/DomainError";

export class CalculateBalanceFromLedger {
  static execute(entries: LedgerEntry[]): Money {
    let balance = 0;

    for (const entry of entries) {
      switch (entry.type) {
        case TransactionType.CREDIT:
          balance += entry.amount.amount;
          break;

        case TransactionType.DEBIT:
          balance -= entry.amount.amount;
          break;

        default:
          throw new DomainError(
            `Tipo de transação não suportado no cálculo de saldo: ${entry.type}`
          );
      }
    }

    return new Money(balance);
  }
}
