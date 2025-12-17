// src/utils/generateRecoveryToken.ts
import crypto from "crypto";

export function generateRecoveryToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return { token, hash };
}
