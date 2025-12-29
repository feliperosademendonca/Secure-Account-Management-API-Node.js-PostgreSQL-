// src/domain/finance/entities/LedgerEntry.ts
import { Money } from "../value-objects/Money";
import { TransactionType } from "../types";
import { DomainError } from "../../shared/DomainError";

export class LedgerEntry {

  constructor(
    public readonly transactionId: string,   // UUID
    public readonly accountId: string,     
    public readonly type: TransactionType,   // string enum
    public readonly amount: Money,
    public readonly createdAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    console.log('this.transactionId', this.transactionId)
    console.log('this.accountId', this.accountId)
    console.log('this.type', this.type)
    console.log('this.amount', this.amount)
    console.log('this.createdAt', this.createdAt)
    if (!this.accountId) {
      throw new DomainError("LedgerEntry precisa de accountId");
    }

    if (!(this.amount instanceof Money)) {
      throw new DomainError("LedgerEntry exige um Money válido");
    }
  }
}
