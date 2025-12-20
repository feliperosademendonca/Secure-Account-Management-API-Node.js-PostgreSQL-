// src/domain/finance/entities/LedgerEntry.ts
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";
import { DomainError } from "../../shared/DomainError";

export class LedgerEntry {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly type: TransactionType,
    public readonly amount: Money,
    public readonly createdAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.accountId) {
      throw new DomainError("LedgerEntry precisa de accountId");
    }

    if (!(this.amount instanceof Money)) {
      throw new DomainError("LedgerEntry exige um Money válido");
    }
  }
}
