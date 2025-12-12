// ./infra/database.ts
import { Pool, type QueryResult, type QueryResultRow } from "pg";

export const pool = new Pool({
  connectionString: process.env.URI_POSTGRESQL,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: any[]
): Promise<QueryResult<T>> {
  return pool.query<T>(sql, params);
}
