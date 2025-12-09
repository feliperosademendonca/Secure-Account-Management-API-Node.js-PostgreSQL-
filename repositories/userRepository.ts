// ./repositories/userRepository.ts
import { query } from "../infra/connectionNeonPostgreSQL.js";

export interface CreateUserInput {
  indicationId: string;
  name: string;
  phone: string;
  email?: string | null;
  password: string;
  pixKey?: string | null;
  cpf?: string | null;
}

// Buscar usuário por telefone
export async function findUserByPhone(phone: string) {
  const sql = `
    SELECT *
    FROM users
    WHERE phone = $1
    LIMIT 1
  `;

  const result = await query(sql, [phone]);
  return result.rows[0] || null;
}

// Buscar usuário por indicationId
export async function findUserByIndicationId(indicationId: string) {
  const sql = `
    SELECT *
    FROM users
    WHERE indicationId = $1
    LIMIT 1
  `;

  const result = await query(sql, [indicationId]);
  return result.rows[0] || null;
}

// Criar usuário
export async function createUser(data: CreateUserInput) {
  const {
    indicationId,
    name,
    phone,
    email,
    password,
    pixKey,
    cpf,
  } = data;

  const sql = `
    INSERT INTO users (indicationId, name, phone, email, password, pixKey, cpf)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

  const params = [
    indicationId,
    name,
    phone,
    email || null,
    password,
    pixKey || null,
    cpf || null,
  ];

  const result = await query<{ id: number }>(sql, params);

  return { id: result.rows[0].id };
}
