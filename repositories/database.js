import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Corrige path para funcionar no ESM + TS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria o database.db na raiz do projeto
const dbPath = path.join( __dirname,"database.db");

const db = new Database(dbPath);

// Criação da tabela
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    indicationId TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    password TEXT NOT NULL,
    pixKey TEXT,
    cpf TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`).run();

export default db;
