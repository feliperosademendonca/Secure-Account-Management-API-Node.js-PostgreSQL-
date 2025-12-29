
import type { FinancialRepository } from "../../domain/finance/repositories/FinancialRepository";
import { LedgerEntry } from "../../domain/finance/entities/LedgerEntry";
import { Money } from "../../domain/finance/value-objects/Money";
import type { TransactionType } from "../../domain/finance/types";
import type { PoolClient } from "pg";
import { pool } from "../../database/query";

type LedgerRow = {
  id: string;
  account_id: string;
  type: TransactionType;
  amount: number;
  created_at: Date;
};

export class PostgresFinancialRepository implements FinancialRepository {
  async findByAccountId(accountId: string): Promise<LedgerEntry[]> {
    const { rows } = await pool.query<LedgerRow>(
      `
      SELECT id, account_id, type, amount, created_at
      FROM ledger_entries
      WHERE account_id = $1
      ORDER BY created_at ASC
      `,
      [accountId]
    );

    return rows.map(
      (row) =>
        new LedgerEntry(
          row.id,
          row.account_id,
          row.type,
          new Money(row.amount),
          row.created_at
        )
    );
  }

  async findByAccountIdForUpdate(client: PoolClient, accountId: string): Promise<LedgerEntry[]> {
    const { rows } = await client.query<LedgerRow>(
      `
      SELECT id, account_id, type, amount, created_at
      FROM ledger_entries
      WHERE account_id = $1
      ORDER BY created_at ASC
      FOR UPDATE
      `,
      [accountId]
    );

    return rows.map(
      (row) =>
        new LedgerEntry(
          row.id,
          row.account_id,
          row.type,
          new Money(row.amount),
          row.created_at
        )
    );
  }

  async save(client: PoolClient, entry: LedgerEntry): Promise<void> {
    await client.query(
      `
      INSERT INTO ledger_entries (id, account_id, type, amount, created_at)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        entry.id,
        entry.account_Id,
        entry.type,
        entry.amount.amount,
        entry.createdAt,
      ]
    );
  }
}
