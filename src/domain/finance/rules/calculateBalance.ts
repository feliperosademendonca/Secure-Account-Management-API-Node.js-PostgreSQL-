//./src/domain/finance/rules/calculateBalance.ts

import { LedgerEntry } from "../entities/LedgerEntry";
import { Money } from "../value-objects/Money";

export function calculateBalance(
  entries: LedgerEntry[]
): Money {
  return entries.reduce((balance, entry) => {
    if (entry.type === "CREDIT") {
      return balance.add(entry.amount);
    }

    return balance.subtract(entry.amount);
  }, new Money(0));
}
