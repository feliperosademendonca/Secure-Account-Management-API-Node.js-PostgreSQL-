// src/domain/finance/dtos/StatementItem.ts
import { TransactionType } from "../types";

export interface StatementItem {
  date: Date;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
}
