// src/config/env.ts
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config(); // carrega automaticamente da raiz

const envSchema = z.object({
  URI_POSTGRESQL: z.string().url(),
  JWT_SECRET: z.string(),
  MSG: z.string().optional(),
});

export const env = envSchema.parse(process.env);
