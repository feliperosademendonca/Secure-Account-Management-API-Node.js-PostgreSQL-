// ./controllers/dbController.ts
import db from "../repositories/database.js";
import type { Response, Request } from "express";
import type { User } from "../types/user.js";

export const createUser = (req: Request, res: Response) => {
  const { indicationId, name, phone, password } = req.body;

  const stmt = db.prepare(
    "INSERT INTO users (indicationId, name, phone, password) VALUES (?, ?, ?, ?)"
  );

  const result = stmt.run(indicationId, name, phone, password);

  return { id: Number(result.lastInsertRowid) };
};

// Tipagem explícita: phone é string
export const findUserByPhone = (phone: string): User | null => {
  const stmt = db.prepare("SELECT * FROM users WHERE phone = ?");
  const row = stmt.get(phone);

  return row ? (row as User) : null;
};

export const findUserById = (id: number): User | null => {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const row = stmt.get(id);

  return row ? (row as User) : null;
};

