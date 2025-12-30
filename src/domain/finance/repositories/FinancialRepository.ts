// src/domain/finance/repositories/FinancialRepository.ts
import { LedgerEntry } from "../entities/LedgerEntry";
import type { PoolClient } from "pg";
import type { DbExecutor , } from "../../../database/DbExecutor";

export interface FinancialRepository {
  findByAccountId(accountId: string ): Promise<LedgerEntry[]>;

  findByAccountIdForUpdate(
    executor: DbExecutor,
    accountId: string
  ): Promise<LedgerEntry[]>;

  save(
     executor : DbExecutor,  entry: LedgerEntry, 
  ): Promise<void>;
}