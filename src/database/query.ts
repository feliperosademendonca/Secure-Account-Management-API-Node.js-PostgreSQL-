// src/database/query.ts
import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { env } from "../config/env";
import type { DbExecutor } from "./DbExecutor";

export const pool = new Pool({
  connectionString: env.URI_POSTGRESQL,
});

export async function query<
  T extends QueryResultRow = QueryResultRow
>(sql: string, params?: any[]): Promise<QueryResult<T>> {
  try {
    return await pool.query<T>(sql, params);
  } catch (error) {
    console.error("❌ Erro na query:", { sql, params, error });
    throw error;
  }
}

// ✅ adapter estável
export const dbExecutor: DbExecutor = {
  query,
};
