import { query } from "../query";

export async function addRecoveryColumnsToUsers() {
  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS recovery_token_hash TEXT,
    ADD COLUMN IF NOT EXISTS recovery_token_expires_at TIMESTAMP
  `);

  console.log("Colunas de recuperação adicionadas à tabela users");
}
