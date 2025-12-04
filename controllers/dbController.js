import db from "../repositories/database.js";

const createUser = (req, res) => {
  const { indicationId, name, phone, password } = req.body;

  const stmt = db.prepare(
    "INSERT INTO users (indicationId, name, phone, password) VALUES (?, ?, ?, ?)"
  );

  const result = stmt.run(indicationId, name, phone, password);

 return ({ id: result.lastInsertRowid });
};

export default createUser;
