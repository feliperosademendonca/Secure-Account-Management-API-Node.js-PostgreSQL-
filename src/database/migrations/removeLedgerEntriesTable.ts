 
// src/database/migrations/removeUserIdFromLedgerEntries.ts
import { query } from "../query";

export async function removeUserIdFromLedgerEntries() {
  await query(`
    ALTER TABLE ledger_entries
    DROP COLUMN IF EXISTS userid;
  `);

  console.log("Coluna 'userid' removida da tabela 'ledger_entries'");
}
