// ./repositories/userRepository.ts
import { query } from "../database/connectionNeonPostgreSQL";
import type { UpdateBody } from "../types/bodies";

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

  console.log('\nphone recebido em findUserByPhone:', phone)
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
    indicationId ?? '123456',
    name,
    phone,
    email ?? null,
    password,
    pixKey ?? null,
    cpf ?? null,
  ];

  const result = await query<{ id: number }>(sql, params);

  const row = result.rows[0];
  if (!row) {
    throw new Error("Erro interno: Nenhum ID retornado pelo banco ao criar usuário.");
  }

  return { id: row };
}

// Atualizar usuário pelo ID (JWT)
export async function updateUserById(  userId: string,  data: UpdateBody) {
  
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (data.name) {
    fields.push(`name = $${index++}`);
    values.push(data.name);
  }

  if (data.phone) {
    fields.push(`phone = $${index++}`);
    values.push(data.phone);
  }

  if (data.password) {
    fields.push(`password = $${index++}`);
    values.push(data.password);
  }

  if (fields.length === 0) {
    throw new Error("Nenhum campo para atualizar");
  }

  values.push(userId);

  const sql = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
  `;

  await query(sql, values);
}
