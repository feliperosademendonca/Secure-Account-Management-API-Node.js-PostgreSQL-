import { z } from "zod";
const signUpSchema = z.object({

    name: z.string().min(4).max(20),
    phone: z.string().min(10).max(15),
    indicationId: z.string().min(6).max(10),
    password: z.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(20, "Senha muito longa"),

  confirmPassword: z.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(20, "Senha muito longa"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],



});

const loginSchema  = z.object({

    phone: z.string().min(10).max(15),
    password: z.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(20, "Senha muito longa"),
});

export { signUpSchema , loginSchema };