//./src/database/clientExecutor.ts

import type { PoolClient } from "pg";
import type { DbExecutor } from "./DbExecutor";

export function clientExecutor(
  client: PoolClient
): DbExecutor {
  return {
    query: (sql, params) => client.query(sql, params),
  };
}
