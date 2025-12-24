// ./repositories/userRepository.ts
import { query } from "../database/query";
import type { UpdateProfileBody } from "../types/bodies";
import type { User, CreateUserInput } from "../types/user";
 
function camelizeUserRow(row: any): User | null {
  if (!row) return null;
  return {
    id: row.id,
    publicId: row.publicid,          // ← mapeado
    indicationId: row.indicationid,
    name: row.name,
    phone: row.phone,
    email: row.email,
    password: row.password,
    pixKey: row.pixkey,
    cpf: row.cpf,
    createdAt: row.createdat,
    recoveryTokenHash: row.recovery_token_hash,
    recoveryTokenExpiresAt: row.recovery_token_expires_at,
    roles: row.roles ?? [],
  };
}


// Buscar usuário por telefone
export async function findUserById(id: number) {

  const sql = `
    SELECT *
    FROM users
    WHERE id = $1
    LIMIT 1
  `;

  const result = await query<User>(sql, [id]);
  camelizeUserRow(result)
  return  camelizeUserRow(result.rows[0])
}

// Buscar usuário por telefone
export async function findUserByPhone(phone: string) {

   const sql = `
    SELECT *
    FROM users
    WHERE phone = $1
    LIMIT 1
  `;

  const result = await query<User>(sql, [phone]);
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

  return { id: row.id };
}

// Atualizar usuário pelo ID (JWT)
export async function updateUserById(userId: number, data: UpdateProfileBody) {

  console.log("\nuserId recebido em updateUserById:", userId);

 
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

  // WHERE sempre por último
  values.push(userId);

  console.log("SQL fields em updateUserById:", fields);
  console.log("SQL values em updateUserById:", values);

  const sql = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING id
  `;

  const result = await query<{ id: number }>(sql, values);

  const row = result.rows[0];
  console.log("row retornado pelo banco em updateUserById:", row);
  if (!row) {
    throw new Error("Usuário não encontrado");
  }

  console.log("Resultado do update em updateUserById:", row);

  return { id: row.id };
}

// Atualizar usuário pelo ID (JWT)
export async function findallUser() {

  console.log("findallUser");

  const sql = `
    SELECT *
    FROM users
   `;

  const result = await query<{ id: number }>(sql);

  const rows = result.rows;
  console.log("row retornado pelo banco em findallUser:", rows);
  if (!rows) {
    throw new Error("Usuários não encontrado");
  }

  console.log("Resultado do findallUser em findallUser:", rows);

  return { rows };
}


 