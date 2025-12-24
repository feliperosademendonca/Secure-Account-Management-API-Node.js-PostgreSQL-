 
// ./src/routes/financialRoutes.ts
import { Router } from "express";
import { depositController, withdrawController, balanceController } from "../controllers/financialController";
import { authenticateJWT } from "../middlewares/jwt";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

//router.use(authenticateJWT); // popula req.user
//router.use(authMiddleware);  // valida req.user

router.get("/balance", balanceController);
router.post("/deposit", depositController);
router.post("/withdraw", withdrawController);

/*
router.get("/balance", (_req, res) => {
  console.log("[financial] /balance test OK");
  res.json({ balance: 123.45 });
});
*/

export default router;
