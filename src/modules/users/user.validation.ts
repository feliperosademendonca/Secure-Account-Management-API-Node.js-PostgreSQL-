// src/modules/users/user.validation.ts
import { z } from "zod";

export const createUserSchema = z.object({
  indicationId: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  pixKey: z.string(),
  cpf: z.string(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
