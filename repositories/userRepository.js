// ./repositories/userRepository.js
import db from "./database.js";

// Busca usuário por telefone
export function findUserByPhone(phone) {
  console.log("Procurando usuário com o telefone:", phone);
  const stmt = db.prepare("SELECT * FROM users WHERE phone = ?");
  console.log(" stmt.get(phone):", stmt);
  return stmt.get(phone);
}

// Busca usuário pela indicationId
export function findUserByIndicationId(indicationId) {
  console.log("Procurando usuário com o indicationId:", indicationId);
  const stmt = db.prepare("SELECT * FROM users WHERE indicationId = ?");
  return stmt.get(indicationId);
}

// Cria usuário
export function createUser({ indicationId, name, phone, email, password, pixKey, cpf }) {
  console.log("Criando usuário com os dados:", { indicationId, name, phone, email, password, pixKey, cpf });
  try {
    const stmt = db.prepare(`
      INSERT INTO users (indicationId, name, phone, email, password, pixKey, cpf)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      indicationId,
      name,
      phone,
      email,
      password,
      pixKey,
      cpf
    );

    return { id: result.lastInsertRowid };

  } catch (err) {
    // Quem captura isso é o SERVICE → error handling centralizado
    throw err;
  }
}
