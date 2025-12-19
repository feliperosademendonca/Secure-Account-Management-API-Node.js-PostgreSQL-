//./src/domain/finance/types.ts


export type TransactionType = "CREDIT" | "DEBIT";

export interface LedgerEntry {
    id: string;
    accountId:
    string;
    type: TransactionType;
    amount: number;
    createdAt: Date;
}