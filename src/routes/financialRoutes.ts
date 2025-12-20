// ./src/routes/financialRoutes.ts
import { Router } from "express";
import { depositController, withdrawController, balanceController } from "../controllers/financialController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/deposit", depositController);
router.post("/withdraw", withdrawController);
router.get("/balance", balanceController);

export { router as financialRoutes };
