
// src/domain/finance/repositories/PostgresFinancialRepository.ts
import type { FinancialRepository } from "./FinancialRepository";
import type { Pool, PoolClient } from "pg";
import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";

export class PostgresFinancialRepository implements FinancialRepository {
  constructor(private readonly pool: Pool) {}

  async findByAccountId(accountId: string): Promise<LedgerEntry[]> {
    const sql = `
      SELECT id, account_id, type, amount, created_at
      FROM ledger_entries
      WHERE account_id = $1
      ORDER BY created_at ASC
    `;
    const { rows } = await this.pool.query(sql, [accountId]);

    return rows.map((row) => new LedgerEntry(
      row.id,
      row.account_id,
      this.mapTypeFromDb(row.type),
      new Money(Number(row.amount))
    ));
  }

  async findByAccountIdForUpdate(client: PoolClient, accountId: string): Promise<LedgerEntry[]> {
    const sql = `
      SELECT id, account_id, type, amount, created_at
      FROM ledger_entries
      WHERE account_id = $1
      ORDER BY created_at ASC
      FOR UPDATE
    `;
    const { rows } = await client.query(sql, [accountId]);

    return rows.map((row) => new LedgerEntry(
      row.id,
      row.account_id,
      this.mapTypeFromDb(row.type),
      new Money(Number(row.amount))
    ));
  }

  async save(client: PoolClient, entry: LedgerEntry): Promise<void> {
    const sql = `
      INSERT INTO ledger_entries (id, account_id, type, amount, created_at)
      VALUES ($1, $2, $3, $4, NOW())
    `;
    await client.query(sql, [
      entry.id,
      entry.accountId,
      this.mapTypeToDb(entry.type),
      entry.amount.amount,
    ]);
  }

 

  
// exemplo (na implementação concreta)
private mapTypeFromDb(dbType: string): TransactionType {
  switch (dbType) {
    case "CREDIT": return TransactionType.CREDIT;
    case "DEBIT":  return TransactionType.DEBIT;
    default:
      throw new Error(`Tipo inválido vindo do banco: ${dbType}`);
  }
}

private mapTypeToDb(type: TransactionType): string {
  switch (type) {
    case TransactionType.CREDIT: return "CREDIT";
    case TransactionType.DEBIT:  return "DEBIT";
    default:
      throw new Error(`Tipo inválido para persistência: ${type}`);
  }
}

}
