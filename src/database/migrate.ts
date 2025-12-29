
// src/database/migrate.ts
import { createUsersTable } from "./migrations/createUsersTable";
import { up as addPublicIdAndIndexes } from "./migrations/2025-12-24_add_publicId_and_indexes";
import { createAccountsTable } from "./migrations/createAccountsTable";
import { createLedgerEntriesTable } from "./migrations/createLedgerEntriesTable";
import { createUserRecoveryTokensTable } from "./migrations/createUserRecoveryTokensTable";

export async function migrate() {
  await createUsersTable();
  await addPublicIdAndIndexes();     // adiciona publicId no users
  await createAccountsTable();       // precisa existir antes de ledger_entries
  await createLedgerEntriesTable();  // FK aponta para accounts(id)
  await createUserRecoveryTokensTable();

  console.log("Migrations executadas com sucesso");
}
