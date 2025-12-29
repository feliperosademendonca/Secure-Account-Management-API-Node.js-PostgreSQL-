
// src/domain/finance/services/FinancialService.ts
import crypto from "crypto";
import type { PoolClient } from "pg";
import type { FinancialRepository } from "../repositories/FinancialRepository";
import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";
import { CanWithdrawRule } from "../rules/CanWithdrawRule";
import { CanDepositRule } from "../rules/CanDepositRule";
import { CalculateBalanceFromLedger } from "../rules/CalculateBalanceFromLedger";
import { GenerateStatement } from "../rules/GenerateStatement";

export class FinancialService {
  constructor(private readonly repository: FinancialRepository) { }

  async deposit(client: PoolClient, accountId: string, amount: Money): Promise<LedgerEntry> {
    CanDepositRule.validate(amount);

    const entry = new LedgerEntry(
      crypto.randomUUID(),
      accountId,
      TransactionType.CREDIT,
      amount,
    );

    await this.repository.save(client, entry);
    return entry;
  }

  async withdraw(client: PoolClient, accountId: string, amount: Money): Promise<LedgerEntry> {
    const ledger = await this.repository.findByAccountIdForUpdate(client, accountId);
    const currentBalance = CalculateBalanceFromLedger.execute(ledger);
    CanWithdrawRule.validate({ amount, currentBalance });

    const entry = new LedgerEntry(
      crypto.randomUUID(),
      crypto.randomUUID(),
      accountId,
      TransactionType.DEBIT,
      amount
    );

    await this.repository.save(client, entry);
    return entry;
  }

  async getBalance(accountId: string) {

    const ledger = await this.repository.findByAccountId(accountId);

    return CalculateBalanceFromLedger.execute(ledger);
  }

  async getStatement(accountId: string) {
    const ledger = await this.repository.findByAccountId(accountId);
    return GenerateStatement.execute(ledger);
  }
}
 