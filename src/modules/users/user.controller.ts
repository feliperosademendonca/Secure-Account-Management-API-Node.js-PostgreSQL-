// ./src/modules/users/user.controller.ts

import type { Request, Response } from "express";
import { UserService } from "./user.service";
import { createUserSchema } from "./user.validation";


const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.format() });
    }

    const user = await userService.createUser(parsed.data);

    return res.status(201).json(user);
  }
}
