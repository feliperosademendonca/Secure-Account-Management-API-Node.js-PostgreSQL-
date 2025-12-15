//./tests\helpers\setupTestDB.ts
import db from "../../src/repositories/database"; // Pool do pg

export const clearUsersTable = async () => {
  await db.query("DELETE FROM users");
};

export const insertIndicationUser = async (indicationId: string) => {
  const sql = `
    INSERT INTO users (indicationId, name, phone, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  const values = [indicationId, "Indication Owner", "11900000000", "senha123"];
  const result = await db.query(sql, values);
  return result.rows[0];
};
