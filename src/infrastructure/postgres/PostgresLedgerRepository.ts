//./src/infrastructure/postgres/PostgresLedgerRepository.ts

import type { LedgerRepository } from "../../application/contracts/LedgerRepository";
import { LedgerEntry } from "../../domain/finance/entities/LedgerEntry";
import { Money } from "../../domain/finance/value-objects/Money";
import { query } from "../../database/query";
import type { TransactionType } from "../../domain/finance/types";

type LedgerRow = {
  id: string;
  account_id: string;
  type: TransactionType;
  amount: number;
  created_at: Date;
};

export class PostgresLedgerRepository
  implements LedgerRepository
{
  async findByAccountId(
    accountId: string
  ): Promise<LedgerEntry[]> {
    const result = await query<LedgerRow>(
      `
      SELECT 
        id,
        account_id,
        type,
        amount,
        created_at
      FROM ledger_entries
      WHERE account_id = $1
      ORDER BY created_at ASC
      `,
      [accountId]
    );

    return result.rows.map(
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

  async save(entry: LedgerEntry): Promise<void> {
    await query(
      `
      INSERT INTO ledger_entries (
        id,
        account_id,
        type,
        amount,
        created_at
      ) VALUES ($1, $2, $3, $4, $5)
      `,
      [
        entry.id,
        entry.accountId,
        entry.type,
        entry.amount.amount,
        entry.createdAt,
      ]
    );
  }
}
