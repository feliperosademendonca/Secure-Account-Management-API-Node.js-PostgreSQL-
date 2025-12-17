// src/database/migrations/createUserRecoveryTokensTable.ts
import { query } from "../query";

export async function createUserRecoveryTokensTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS user_recovery_tokens (
      id SERIAL PRIMARY KEY,

      user_id INTEGER NOT NULL,
      token_hash TEXT NOT NULL,

      expires_at TIMESTAMP NOT NULL,
      used_at TIMESTAMP NULL,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_user_recovery_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    )
  `);

  console.log("Tabela 'user_recovery_tokens' verificada/criada com sucesso");
}
