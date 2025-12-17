// ./src/services/recoveryValidationService.ts

import crypto from "crypto";
import { findValidRecoveryTokenByHash } from "../repositories/recoveryRepository";
import bcrypt from "bcryptjs";

// Função para validar o token de recuperação
export async function validateRecoveryToken(token: string) {
  // Gera o hash do token recebido
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Busca token válido no banco
  const recovery = await findValidRecoveryTokenByHash(tokenHash);

  // Se não encontrar o token válido, lança erro
  if (!recovery) {
    throw new Error("Token inválido ou expirado");
  }

  // Compara o hash do token recebido com o armazenado
  const isValid = await bcrypt.compare(token, recovery.token_hash);

  if (!isValid) {
    throw new Error("Token inválido ou expirado");
  }

  return recovery;
}
