//./src/domain/finance/entities/LedgerEntry.ts

import { Money } from "../value-objects/Money";
import type { TransactionType } from "../types";

export class LedgerEntry {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly type: TransactionType,
    public readonly amount: Money,
    public readonly createdAt: Date
  ) {
    this.validate();
  }

  private validate() {
    if (!this.accountId) {
      throw new Error("LedgerEntry precisa de accountId");
    }

    if (!(this.amount instanceof Money)) {
      throw new Error("Valor inválido para LedgerEntry");
    }
  }
}
