// src/services/recoveryAccount.ts
import { findUserByPhone } from "../repositories/userRepository";
import { generateRecoveryToken } from "../utils/generateRecoveryToken";
import { saveRecoveryToken } from "../repositories/recoveryRepository";

export async function recoveryAccount(phone: string) {

  const user = await findUserByPhone(phone);

  if (!user) {
    throw new Error("Telefone não cadastrado");
  }

  const { token, hash } = generateRecoveryToken();

  const expiresAt = new Date(
    Date.now() + 15 * 60 * 1000 // 15 minutos
  );
 
  await saveRecoveryToken({
    userId: user.id,
    tokenHash: hash,
    expiresAt,
  });

  // 🔔 Aqui entra o provider real
  console.log("TOKEN DE RECUPERAÇÃO (DEV):", token);

  return true;
}
