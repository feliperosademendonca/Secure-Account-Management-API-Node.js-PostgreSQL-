import "./src/config/loadEnv.js";

import { app } from "./src/app.js";
import { createUsersTable } from "./src/database/migrations/createUsersTable.ts";

(async () => {
  try {
    console.log("▶ Iniciando migrações...");
    await createUsersTable();
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
