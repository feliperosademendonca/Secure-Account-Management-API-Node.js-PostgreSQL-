import { Pool, type QueryResult, type QueryResultRow } from "pg";
 console.log("ENV URI_POSTGRESQL:", process.env.URI_POSTGRESQL);

export const pool = new Pool({
    connectionString: process.env.URI_POSTGRESQL,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  return pool.query<T>(text, params);
}
