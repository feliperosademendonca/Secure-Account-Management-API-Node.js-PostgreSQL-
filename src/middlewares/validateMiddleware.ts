//./src\middlewares\validateMiddleware.ts
import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

 
export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
     const result = schema.safeParse(req.body);
      console.log("\nvalidate",req.body ," Schema:",result)

    if (!result.success) {
      console.log("Erro de validação")
      return res.status(400).json({
        message: "Erro de validação",
        errors: result.error.format(),
      });
    }

    // Anexa os dados validados ao request
    (req as any).validatedBody = result.data;
    next();
  };
