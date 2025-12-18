//./tests\helpers\setupTestDB.ts
import db from "../../src/repositories/database"; // Pool do pg

export const clearUsersTable = async () => {
  await db.query("DELETE FROM users");
  await db.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

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

interface InsertUserParams {
  name: string;
  phone: string;
  password: string;
  indicationId: string;
}

export const insertUser = async ({
  name,
  phone,
  password,
  indicationId,
}: InsertUserParams) => {
  const sql = `
    INSERT INTO users (name, phone, password, indicationId)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  const values = [name, phone, password, indicationId];
  const result = await db.query(sql, values);

  return result.rows[0];
};

 