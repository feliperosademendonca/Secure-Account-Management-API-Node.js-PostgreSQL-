// ./src/domain/finance/rules/canWithdraw.ts
import { Money } from "../value-objects/Money";

export function canWithdraw(
  balance: Money,
  amount: Money
): boolean {
  return balance.amount >= amount.amount;
}
