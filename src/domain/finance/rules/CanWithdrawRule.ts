// src/domain/finance/rules/CanWithdrawRule.ts
import { Money } from "../value-objects/Money";
import { DomainError } from "../../shared/DomainError";

export class CanWithdrawRule {
  static validate(params: {
    amount: Money;
    currentBalance: Money;
  }): void {
    const { amount, currentBalance } = params;

    if (amount.amount <= 0) {
      throw new DomainError("Saque deve ser maior que zero");
    }

    if (amount.amount > currentBalance.amount) {
      throw new DomainError("Saldo insuficiente para saque");
    }
  }
}
