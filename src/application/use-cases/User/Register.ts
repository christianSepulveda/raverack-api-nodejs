// Este es el caso de uso RegisterUser.
// Recibe un username y un password, hashea el password y crea un nuevo usuario con esos datos.

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { Error } from "../../../domain/entities/Error";

export class RegisterUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  checkUsername(username: string): Error | undefined {
    if (username.length === 0) return { message: "Username is required" };
    if (username.length < 4)
      return { message: "Username should be at least 4 characters" };
  }

  checkPassword(password: string): Error | undefined {
    if (password.length === 0) return { message: "Password is required" };
    if (password.length < 8)
      return { message: "Password should be at least 8 characters" };
  }

  async execute(
    username: string,
    password: string,
    companyid: string
  ): Promise<User | Error> {
    const usernameError = this.checkUsername(username);
    const passwordError = this.checkPassword(password);

    if (usernameError) return usernameError;
    if (passwordError) return passwordError;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      active: true,
      companyid,
    };

    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}
