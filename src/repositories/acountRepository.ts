// ./repositories/userRepository.ts
import { query } from "../database/query";
import type { UpdateProfileBody } from "../types/bodies";
import type { Account } from "../types/Account";
 
function camelizeUserRow(row: any): Account | null {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.publicid,          // ← mapeado
    currency: row.currency, 
    createdAt: row.createdat, 
  };
}
 
// Buscar usuário por telefone
export async function findAccountById(id: number) {

  const sql = `
    SELECT *
    FROM account
    WHERE id = $1
    LIMIT 1
  `;

  const result = await query<Account>(sql, [id]);
  camelizeUserRow(result)
  return  camelizeUserRow(result.rows[0])
}

// Buscar usuário por telefone
export async function findAccountByPhone(phone: string) {

   const sql = `
    SELECT *
    FROM accounts
    WHERE phone = $1
    LIMIT 1
  `;

  const result = await query<Account>(sql, [phone]);
    return result.rows[0] || null;
}

// Buscar usuário por indicationId
export async function findAccountByIndicationId(indicationId: string) {
  const sql = `
    SELECT *
    FROM accounts
    WHERE indicationId = $1
    LIMIT 1
  `;

  const result = await query(sql, [indicationId]);
  return result.rows[0] || null;
}

// Criar usuário
export async function createAccount(data: CreateAccountInput) {
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
    INSERT INTO accounts (indicationId, name, phone, email, password, pixKey, cpf)
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
export async function updateAccountById(userId: number, data: UpdateProfileBody) {

  console.log("\nAccount recebido em updateUserById:", userId);

 
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

  console.log("SQL fields em updateaccountById:", fields);
  console.log("SQL values em updateaccountById:", values);

  const sql = `
    UPDATE accounts
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING id
  `;

  const result = await query<{ id: number }>(sql, values);

  const row = result.rows[0];
  console.log("row retornado pelo banco em updateaccountById:", row);
  if (!row) {
    throw new Error("Conta não encontrado");
  }

  console.log("Resultado do update em updateaccountById:", row);

  return { id: row.id };
}

// Atualizar usuário pelo ID (JWT)
export async function findallAccount() {

  console.log("findallAccounts");

  const sql = `
    SELECT *
    FROM accounts
   `;

  const result = await query<{ id: number }>(sql);

  const rows = result.rows;
  console.log("row retornado pelo banco em findallAccounts:", rows);
  if (!rows) {
    throw new Error("Contas não encontrado");
  }

  console.log("Resultado findallAccounts:", rows);

  return { rows };
}


 