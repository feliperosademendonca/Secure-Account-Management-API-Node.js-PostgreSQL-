// src/services/recoveryAccount.ts
import { findUserByPhone } from "../repositories/userRepository";

export async function recoveryAccount(phone: string) {
  const user = await findUserByPhone(phone);

  if (!user) {
    throw new Error("Telefone não cadastrado");
  }

  // 🔐 Aqui entra:
  // - gerar token de recuperação
  // - salvar token + expiração
  // - enviar SMS / WhatsApp / Email

  return true;
}
