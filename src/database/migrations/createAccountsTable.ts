
// src/database/migrations/createAccountsTable.ts
import { query } from "../query";

export async function createAccountsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id UUID PRIMARY KEY,               -- ID da conta é UUID
      user_id INTEGER NOT NULL,          -- FK para users(id)
      currency CHAR(3) NOT NULL DEFAULT 'BRL',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `);

  // Se a regra de negócio for 1 conta por usuário, crie índice único:
  await query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_indexes WHERE indexname = 'uniq_accounts_user_id'
      ) THEN
        CREATE UNIQUE INDEX uniq_accounts_user_id ON accounts(user_id);
      END IF;
    END $$;
  `);

  console.log("Tabela 'accounts' verificada/criada com sucesso");
}
