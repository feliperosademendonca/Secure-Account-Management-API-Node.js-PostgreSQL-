
// src/application/getAccountIdForUser.ts
import { pool } from "../database/query";

export async function getAccountIdForUser(userId: number): Promise<string | null> {
 const { rows } = await pool.query<{ id: string }>(
  `SELECT id FROM accounts WHERE user_id = $1`,
  [userId]
);
  
return rows[0]?.id ?? null;
;
}


