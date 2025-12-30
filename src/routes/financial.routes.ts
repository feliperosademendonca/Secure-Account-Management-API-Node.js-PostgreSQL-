// ./src/routes/financialRoutes.ts
import { Router } from "express";
import { depositController, withdrawController, balanceController } from "../controllers/financialController";
  
const router = Router();
 
router.get("/balance", balanceController);
router.post("/deposit", depositController);
router.post("/withdraw", withdrawController);
 

export default router;
