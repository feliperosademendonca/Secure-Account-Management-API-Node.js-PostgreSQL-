// ./src/services/resetPasswordService.ts

import bcrypt from "bcrypt";
import crypto from "crypto";

import { query } from "../database/query";
import {
  findValidRecoveryTokenByHash,
  markRecoveryTokenAsUsed,
} from "../repositories/recoveryRepository";
import { updateUserById } from "../repositories/userRepository";

interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

export async function resetPasswordService({
  token,
  newPassword,
}: ResetPasswordInput) {

  // 🔒 validação mínima
  if (newPassword.length < 6) {
    throw new Error("Senha muito curta");
  }

  // 🔐 gera hash do token recebido
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // 🔍 busca token válido
  const recoveryToken = await findValidRecoveryTokenByHash(tokenHash);

  if (!recoveryToken) {
    throw new Error("Token inválido ou expirado");
  }

  // 🔐 hash da nova senha
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // 🧨 transação
  await query("BEGIN");

  try {
    await updateUserById(recoveryToken.user_id.toString(), {
      password: passwordHash,
    });

    await markRecoveryTokenAsUsed(recoveryToken.id);

    await query("COMMIT");
  } catch (err) {
    await query("ROLLBACK");
    throw err;
  }

  return true;
}
