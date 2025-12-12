// middlewares/errorHandler.js
export default (err, req, res, next) => {
  console.log("Entrou no errorHandler middleware");
  console.error("Erro capturado pelo middleware:", err);

  // =============================================================
  // TRATAMENTO DE ERROS DO SQLITE
  // =============================================================
  if (err.code && err.code.startsWith("SQLITE_CONSTRAINT")) {

    // UNIQUE constraint
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      if (err.message.includes("users.phone")) {
        return res.status(409).json({ error: "O telefone informado já está cadastrado." });
      }
      if (err.message.includes("users.email")) {
        return res.status(409).json({ error: "O e-mail informado já está cadastrado." });
      }
      if (err.message.includes("users.pixKey")) {
        return res.status(409).json({ error: "A chave PIX informada já está cadastrada." });
      }
      if (err.message.includes("users.cpf")) {
        return res.status(409).json({ error: "O CPF informado já está cadastrado." });
      }

      return res.status(409).json({
        error: "Um dos campos que exige valor exclusivo já foi utilizado."
      });
    }

    // NOT NULL constraint
    if (err.code === "SQLITE_CONSTRAINT_NOTNULL") {
      return res.status(400).json({
        error: "Campos obrigatórios não foram enviados."
      });
    }

    // FOREIGN KEY constraint
    if (err.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
      return res.status(400).json({
        error: "Referência inválida. O recurso relacionado não existe."
      });
    }

    // CHECK constraint
    if (err.code === "SQLITE_CONSTRAINT_CHECK") {
      return res.status(400).json({
        error: "Os dados informados violam regras definidas no banco de dados."
      });
    }
  }

  // =============================================================
  // ERROS DE VALIDAÇÃO (JOI)
  // =============================================================
  if (err.isJoi) {
    return res.status(400).json({
      error: "Erro de validação dos dados enviados.",
      details: err.details.map(d => d.message)
    });
  }

  // =============================================================
  // JWT
  // =============================================================
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token inválido." });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expirado." });
  }

  // =============================================================
  // JSON inválido
  // =============================================================
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "JSON enviado é inválido." });
  }

  // =============================================================
  // ERRO GENÉRICO
  // =============================================================
  return res.status(500).json({
    error: "Erro interno no servidor."
  });
};
