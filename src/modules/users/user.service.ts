// src/modules/users/user.service.ts

import type { CreateUserDTO } from "./user.types.ts";
import { UserRepository } from "./user.repository.ts";

const userRepo = new UserRepository();

export class UserService {
  async createUser(data: CreateUserDTO) {
    const exists = await userRepo.findByPhone(data.phone);
    if (exists) {
      throw new Error("Phone already registered");
    }

    const user = await userRepo.createUser(data);
    return user;
  }
}

