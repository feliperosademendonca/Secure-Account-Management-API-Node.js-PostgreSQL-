//./user.repository.ts

import { pool } from "../../database/connection.ts";
import type { CreateUserDTO } from "./user.types.ts";

export class UserRepository {

  async findByPhone(phone: string) {
    const result = await pool.query(
      "SELECT * FROM users WHERE phone = $1 LIMIT 1",
      [phone]
    );

    return result.rows[0] ?? null;
  }

  async createUser(data: CreateUserDTO) {
    const result = await pool.query(
      `INSERT INTO users (indicationId, name, phone, email, password, pixKey, cpf)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING id, name, phone, email, indicationId, pixKey, cpf, created_at`,
      [
        data.indicationId,
        data.name,
        data.phone,
        data.email ?? null,
        data.password,
        data.pixKey ?? null,
        data.cpf ?? null,
      ]
    );

    return result.rows[0];
  }
}


