
// src/domain/finance/services/FinancialService.ts
import type { FinancialRepository } from "../repositories/FinancialRepository";
import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";
import { CanWithdrawRule } from "../rules/CanWithdrawRule";
import { CanDepositRule } from "../rules/CanDepositRule";
import { CalculateBalanceFromLedger } from "../rules/CalculateBalanceFromLedger";
import { GenerateStatement } from "../rules/GenerateStatement";
import crypto from "crypto";
import type { PoolClient } from "pg";

export class FinancialService {
  constructor(private readonly repository: FinancialRepository) {}

  async withdraw(
    client: PoolClient,
    accountId: string,
    amount: Money
  ): Promise<LedgerEntry> {
    const ledger = await this.repository.findByAccountIdForUpdate(client, accountId);
    const currentBalance = CalculateBalanceFromLedger.execute(ledger);

    CanWithdrawRule.validate({ amount, currentBalance });

    const entry = new LedgerEntry(
      crypto.randomUUID(),
      accountId,
      TransactionType.DEBIT,     // ← saque é débito
      amount
    );

    await this.repository.save(client, entry);
    return entry;
  }

  async getBalance(accountId: string): Promise<Money> {
    const ledger = await this.repository.findByAccountId(accountId);
    return CalculateBalanceFromLedger.execute(ledger);
    
  }

  async deposit(
    client: PoolClient,
    accountId: string,
    amount: Money
  ): Promise<LedgerEntry> {
    CanDepositRule.validate(amount);
    
console.log('money:', amount.amount)
    const entry = new LedgerEntry(
      crypto.randomUUID(),
      accountId,
      TransactionType.CREDIT,    // ← depósito é crédito
      amount.amount
    );

    await this.repository.save(client, entry);
    return entry;
  }

  async getStatement(accountId: string) {
    const ledger = await this.repository.findByAccountId(accountId);
    return GenerateStatement.execute(ledger);
  }
}
