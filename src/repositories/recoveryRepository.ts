// src/repositories/recoveryRepository.ts
import { query } from "../database/query";
import type { RecoveryTokenRow, SaveRecoveryTokenParams } from "./types";


export async function saveRecoveryToken({
  userId,
  tokenHash,
  expiresAt,
}: SaveRecoveryTokenParams) {
  await query(
    `
    INSERT INTO user_recovery_tokens (
      user_id,
      token_hash,
      expires_at
    )
    VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt]
  );
}

export async function findValidRecoveryToken(
  userId: number,
  tokenHash: string
): Promise<RecoveryTokenRow | null> {
  const result = await query<RecoveryTokenRow>(
    `
    SELECT *
    FROM user_recovery_tokens
    WHERE
      user_id = $1
      AND token_hash = $2
      AND used_at IS NULL
      AND expires_at > NOW()
    LIMIT 1
    `,
    [userId, tokenHash]
  );

  return result.rows[0] ?? null;
}

export async function findRecoveryTokenByUser(userId: number) {
  const result = await query(
    `
    SELECT *
    FROM user_recovery_tokens
    WHERE
      user_id = $1
      AND used_at IS NULL
      AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
    `,
    [userId]
  );

  return result.rows[0] || null;
}

export async function markRecoveryTokenAsUsed(tokenId: number) {
  await query(
    `
    UPDATE user_recovery_tokens
    SET used_at = NOW()
    WHERE id = $1
    `,
    [tokenId]
  );
}

export async function findValidRecoveryTokenByHash(
  tokenHash: string
): Promise<RecoveryTokenRow | null> {

  const result = await query<RecoveryTokenRow>(
    `
    SELECT *
    FROM user_recovery_tokens
    WHERE
      token_hash = $1
      AND used_at IS NULL
      AND expires_at > NOW()
    LIMIT 1
    `,
    [tokenHash]
  );

  return result.rows[0] || null;
}
