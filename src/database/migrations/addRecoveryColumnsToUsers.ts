
// ./src/database/migrations/2025-12-24_add_publicId_and_indexes.ts
import { query } from "../query";

export async function up() {
  await query(`
    BEGIN;

    -- 1) Extensão para gerar UUIDs (gen_random_uuid)
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    -- 2) Adicionar a coluna se não existir, já com DEFAULT
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'publicid'
      ) THEN
        ALTER TABLE users
          ADD COLUMN publicId UUID DEFAULT gen_random_uuid();
      END IF;
    END $$;

    -- 3) Preencher linhas antigas que ficaram NULL
    UPDATE users
      SET publicId = gen_random_uuid()
      WHERE publicId IS NULL;

    -- 4) Tornar NOT NULL (só depois de garantir que não há NULL)
    ALTER TABLE users
      ALTER COLUMN publicId SET NOT NULL;

    -- 5) Índice único
    CREATE UNIQUE INDEX IF NOT EXISTS users_publicId_uidx ON users(publicId);

    COMMIT;
  `);

  console.log("Migration: publicId + índice único criada com sucesso.");
}
