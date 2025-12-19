// src/application/contracts/LedgerRepository.ts
import { LedgerEntry } from "../../domain/finance/entities/LedgerEntry";

export interface LedgerRepository {
  findByAccountId(accountId: string): Promise<LedgerEntry[]>;
  save(entry: LedgerEntry): Promise<void>;
}
