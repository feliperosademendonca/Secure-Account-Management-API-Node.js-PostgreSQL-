// src/domain/finance/rules/CanDepositRule.ts
import { Money } from "../value-objects/Money";
import { DomainError } from "../../shared/DomainError";

export class CanDepositRule {
  static validate(amount: Money): void {
    if (!(amount instanceof Money)) {
      throw new DomainError("Depósito exige um valor monetário válido");
    }

    if (amount.amount <= 0) {
      throw new DomainError("Depósito deve ser maior que zero");
    }
  }
}
