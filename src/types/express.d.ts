//./src\types\express.d.ts
 
import "express";
import type { SignUpBody, loginBody } from "./express-types"; // ajuste se necessário

declare global {
  namespace Express {
    interface Request {
      validatedBody?: SignUpBody | loginBody;
    }
  }
}


export { SignUpBody , loginBody }