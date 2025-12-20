// application/contracts/LedgerRepository.ts
import { LedgerEntry } from "../../domain/finance/entities/LedgerEntry";
import type { DbExecutor } from "../../database/DbExecutor";

export interface LedgerRepository {
  findByAccountId(
    accountId: string,
    executor?: DbExecutor
  ): Promise<LedgerEntry[]>;

  save(
    entry: LedgerEntry,
    executor?: DbExecutor
  ): Promise<void>;
}
