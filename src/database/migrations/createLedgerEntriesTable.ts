//./src\database\migrations\createUsersTable.ts
import { query } from "../query";

export async function createLedgerEntriesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS ledger_entries (
      id UUID PRIMARY KEY,
      account_id UUID NOT NULL,
      type VARCHAR(20) NOT NULL
        CHECK (type IN ('CREDIT', 'DEBIT', 'DEPOSIT', 'WITHDRAW')),
      amount BIGINT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_ledger_account
        FOREIGN KEY (account_id)
        REFERENCES accounts(id)
    );
  `);

  console.log("Tabela 'ledger_entries' verificada/criada com sucesso");
}
