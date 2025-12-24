//./router/index.ts

 
import { Router } from "express";
import financialRoutes from "./financial.routes";   // default export
import usersRoutes from "./users.routes";           // default export
import { authenticateJWT } from "../middlewares/jwt";

const router = Router();
router.use("/financial",authenticateJWT, financialRoutes);
router.use("/user",  usersRoutes);

export default router;

