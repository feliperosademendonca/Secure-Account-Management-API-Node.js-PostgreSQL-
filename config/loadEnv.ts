import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para o .env dentro de /config
const envPath = path.resolve(__dirname, "../config/.env");

dotenv.config({ path: envPath });

console.log("Carregado .env de:", envPath);
console.log("TESTE URI_POSTGRESQL:", process.env.URI_POSTGRESQL);
