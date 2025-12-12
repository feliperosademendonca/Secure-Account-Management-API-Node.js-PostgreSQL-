// .\src\config\loadEnv.ts
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
 
// Caminho absoluto para o .env dentro de /config
const envPath = path.resolve( "./.env");

dotenv.config({ path: envPath });

console.log("\nCarregado .env de:", envPath);
console.log("\nLoad .env:", process.env.MSG);
