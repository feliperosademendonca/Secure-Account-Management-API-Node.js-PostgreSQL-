// src/domain/finance/repositories/FinancialRepository.ts
import { LedgerEntry } from "../entities/LedgerEntry";
import type { PoolClient } from "pg";

export interface FinancialRepository {
  findByAccountId(accountId: string ): Promise<LedgerEntry[]>;

  findByAccountIdForUpdate(
    client: PoolClient,
    accountId: string
  ): Promise<LedgerEntry[]>;

  save(
    client: PoolClient,
    entry: LedgerEntry
  ): Promise<void>;
}