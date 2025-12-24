
// ./src/database/migrations/2025-12-24_add_publicId_and_indexes.ts
import { query } from "../query";

export async function up() {
  await query(`
    BEGIN;

    -- Extensão para gerar UUIDs
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

     ALTER TABLE users
    ALTER COLUMN publicId SET DEFAULT gen_random_uuid();

    -- Adicionar a coluna publicId se não existir
    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS publicId UUID;

    -- Preencher linhas existentes com UUID
    UPDATE users
      SET publicId = gen_random_uuid()
      WHERE publicId IS NULL;

    -- Tornar NOT NULL
    ALTER TABLE users
      ALTER COLUMN publicId SET NOT NULL;

    -- Criar índice único (agora a coluna existe)
    CREATE UNIQUE INDEX IF NOT EXISTS users_publicId_uidx ON users(publicId);

    COMMIT;
  `);

  console.log("Migration: publicId + índice único criada com sucesso.");
}
