//./src\database\withTransaction.ts

import type { DbExecutor } from "./DbExecutor";
import { pool } from "./query";

export async function withTransaction<T>(
  fn: (executor: DbExecutor) => Promise<T>
): Promise<T> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const executor: DbExecutor = {
      query: (text, params) =>
        client.query(text, params),
    };

    const result = await fn(executor);

    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
