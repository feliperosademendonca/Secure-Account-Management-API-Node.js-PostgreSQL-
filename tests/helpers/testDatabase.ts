// ./tests/helpers/testDatabase.ts
import { query } from "../../src/database/connectionNeonPostgreSQL";

// Limpa a tabela de usuários antes de cada teste
export const clearUsersTable = async () => {
  await query("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
};

// Função para popular tabela se necessário
export const insertIndicationUser = async (indicationId: string) => {
  const sql = `
    INSERT INTO users (indicationId, name, phone, password)
    VALUES ($1, $2, $3, $4)
  `;
  await query(sql, [indicationId, "Indication Owner", "11900000000", "senha123"]);
};
