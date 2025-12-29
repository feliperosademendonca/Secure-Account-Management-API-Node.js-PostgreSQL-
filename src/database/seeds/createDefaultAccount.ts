
import { pool } from "../query";

export async function createDefaultAccountForUser(userId: number) {
  await pool.query(
    `INSERT INTO accounts (id, user_id)
     VALUES (gen_random_uuid(), $1)
     ON CONFLICT DO NOTHING`,
    [userId]
  );
}
