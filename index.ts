import "./src/config/loadEnv.js";
import cookieParser from "cookie-parser";

import { app } from "./src/app.js";
import { createUsersTable } from "./src/database/migrations/createUsersTable.ts";
import { createLedgerEntriesTable } from "./src/database/migrations/createLedgerEntriesTable.ts";
import { up } from "./src/database/migrations/addRecoveryColumnsToUsers.ts";

app.use(cookieParser());

(async () => {
  try {
    console.log("▶ Iniciando migrações...");
    await createUsersTable();
    await up();
    await createLedgerEntriesTable();
    console.log("✔ Migrações concluídas.");
  } catch (error) {
    console.error("❌ Erro ao executar migrações:", error);
    process.exit(1);
  }
 

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
})();
