import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: result.error.format(),
      });
    }

    // Anexa os dados validados ao request
    (req as any).validatedBody = result.data;
    next();
  };
