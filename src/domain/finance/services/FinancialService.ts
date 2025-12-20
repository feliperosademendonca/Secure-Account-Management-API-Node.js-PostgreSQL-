// src/domain/finance/services/FinancialService.ts
import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";
import { CanWithdrawRule } from "../rules/CanWithdrawRule";
import { CanDepositRule } from "../rules/CanDepositRule";
import { number } from "joi";

export class FinancialService {
  private ledger: LedgerEntry[] = [];

  constructor(initialLedger: LedgerEntry[] = []) {
    this.ledger = initialLedger;
  }

  getBalance(): Money {
    return this.ledger.reduce((acc, entry) => {
      if (entry.type === TransactionType.DEPOSIT) {
        return acc.add(entry.amount);
      }
      if (entry.type === TransactionType.WITHDRAW) {
        return acc.subtract(entry.amount);
      }
      return acc;
    }, new Money(0));
  }


  deposit(accountId: string, amount: Money): LedgerEntry {
    // regra de depósito
    CanDepositRule.validate(amount);

    const entry = new LedgerEntry(
      crypto.randomUUID(), // id
      accountId,
      TransactionType.DEPOSIT,
      amount
    );

    this.ledger.push(entry);

    return entry;
  }

  withdraw(accountId: string, amount: Money): LedgerEntry {
    const currentBalance = this.getBalance();

    // regra de saque
    CanWithdrawRule.validate({ amount, currentBalance });

    const entry = new LedgerEntry(
      crypto.randomUUID(),
      accountId,
      TransactionType.WITHDRAW,
      amount
    );

    this.ledger.push(entry);

    return entry;
  }

  getLedger(): LedgerEntry[] {
    return this.ledger;
  }
}
