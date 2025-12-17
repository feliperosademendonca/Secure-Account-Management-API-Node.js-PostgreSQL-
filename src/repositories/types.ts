//./src/repositories/types.ts

 
export interface SaveRecoveryTokenParams {
  userId: number;
  tokenHash: string;
  expiresAt: Date;
}

export interface RecoveryTokenRow {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  used_at: Date | null;
  created_at: Date;
}