//./src\database\migrations\createUsersTable.ts
import { query } from "../query";

export async function createUsersTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      indicationId TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      email TEXT UNIQUE,
      password TEXT NOT NULL,
      pixKey TEXT UNIQUE,
      cpf TEXT UNIQUE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

    
  `);
  

  console.log("Tabela 'users' verificada/criada com sucesso");
}
