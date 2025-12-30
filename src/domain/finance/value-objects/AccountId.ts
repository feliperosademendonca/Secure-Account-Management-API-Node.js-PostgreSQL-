// src/domain/finance/value-objects/AccountId.ts
import { DomainError } from "../../shared/DomainError";
import { randomUUID } from "crypto";

export class AccountId {
  private constructor(private readonly value: string) {}

  static create(value: string): AccountId {
    if (!value) {
      throw new DomainError("AccountId não pode ser vazio");
    }

    if (!this.isValidUUID(value)) {
      throw new DomainError("AccountId inválido");
    }

    return new AccountId(value);
  }

  toString(): string {
    return this.value;
  }

  private static isValidUUID(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }
}
