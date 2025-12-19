//./src/repositories/database.ts
import pkg from "pg";
const { Pool } = pkg;
const db = new Pool({ connectionString: process.env.URI_POSTGRESQL });
export default db;
