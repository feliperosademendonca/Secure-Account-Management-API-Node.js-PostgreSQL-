// src/infra/repositories/PostgresFinancialRepository.ts
import type { FinancialRepository } from "../../domain/finance/repositories/FinancialRepository";
import { LedgerEntry } from "../../domain/finance/entities/LedgerEntry";
import { Money } from "../../domain/finance/value-objects/Money";
import { TransactionType } from "../../domain/finance/types";
import { pool } from "../../database/query";
import { withTransaction } from "../../database/transaction";

export class PostgresFinancialRepository
  implements FinancialRepository {
    
  async save(entry: LedgerEntry): Promise<void> {
    await withTransaction(async (executor) => {
      await executor.query(
        `
      INSERT INTO ledger_entries
      (id, account_id, type, amount, created_at)
      VALUES ($1, $2, $3, $4, $5)
      `,
        [
          entry.id,
          entry.accountId,
          entry.type,
          entry.amount.amount,
          entry.createdAt,
        ]
      );
    });
  }

  async findByAccountId(accountId: string): Promise<LedgerEntry[]> {
    const { rows } = await pool.query(
      `
      SELECT * FROM ledger_entries
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
          row.type as TransactionType,
          new Money(Number(row.amount)),
          row.created_at
        )
    );
  }
}

