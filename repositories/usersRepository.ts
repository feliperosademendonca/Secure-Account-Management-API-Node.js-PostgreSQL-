import { query } from "../infra/connectionNeonPostgreSQL";

export async function createUser(data: {
  indicationId: string;
  name: string;
  phone: string;
  email?: string;
  password: string;
  pixKey?: string;
  cpf?: string;
}) {

  const sql = `
    INSERT INTO users (indicationId, name, phone, email, password, pixKey, cpf)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const params = [
    data.indicationId,
    data.name,
    data.phone,
    data.email ?? null,
    data.password,
    data.pixKey ?? null,
    data.cpf ?? null,
  ];

  const result = await query(sql, params);
  return result.rows[0];
}

export async function findUserByPhone(phone: string) {
  const result = await query(
    "SELECT * FROM users WHERE phone = $1",
    [phone]
  );
  return result.rows[0] ?? null;
}
