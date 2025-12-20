// src/database/DbExecutor.ts
import type { QueryResult, QueryResultRow } from "pg";

export interface DbExecutor {
  query<T extends QueryResultRow>(
    sql: string,
    params?: any[]
  ): Promise<QueryResult<T>>;
}
