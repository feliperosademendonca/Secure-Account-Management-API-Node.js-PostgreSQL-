 
import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { env } from "../config/env";

 
export const pool = new Pool({
  connectionString:env.URI_POSTGRESQL,
 
});
