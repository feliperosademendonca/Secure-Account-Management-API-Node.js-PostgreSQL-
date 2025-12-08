//.controllers\dbController.js
import db from "../repositories/database.js";

export const createUser = (req, res) => {
  const { indicationId, name, phone, password } = req.body;

  const stmt = db.prepare(
    "INSERT INTO users (indicationId, name, phone, password) VALUES (?, ?, ?, ?)"
  );

const result = stmt.run(indicationId, name, phone, password);

 return ({ id: result.lastInsertRowid });
};

export const findUserByPhone = (phone) => {

  const stmt = db.prepare("SELECT * FROM users WHERE phone = ?");
  return stmt.get(phone);
}

export const findUserById = (id) => {

  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id);
}

