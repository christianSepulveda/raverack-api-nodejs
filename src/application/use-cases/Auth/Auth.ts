import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserRepository } from "../../../domain/repositories/UserRepository";
import { Error } from "../../../domain/entities/Error";

export class AuthUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(username: string, password: string): Promise<string | Error> {
    if (!username) return { message: "Username is required" };
    if (!password) return { message: "Password is required" };

    const secret = process.env.JWT_SECRET ?? "secret";

    const user = await this.userRepository.findByUsername(username);
    if (!user) return { message: "Invalid username" };
    if (!user.active) return { message: "User is not active" };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { message: "Invalid password" };

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "8h" });

    return token;
  }
}
