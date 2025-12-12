// ./src/routes/users.routes.ts

import { Router } from "express";
import { UserController } from "../modules/users/user.controller";

const router = Router();
const controller = new UserController();

router.post("/users", controller.create);

export default router;
