import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import UserModel from "../../database/models/User";
import { Error } from "../../../domain/entities/Error";

export class SequelizeUserRepository implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      password: user.password,
      active: user.active,
    };
  }

  async updateStatus(id: string): Promise<boolean | null> {
    if (!id) return null;
    console.log(id);

    const user = await UserModel.findOne({ where: { id } });
    console.log(user?.dataValues);
    if (!user) return null;

    console.log('update');
    await user.update({ active: !user.dataValues.active });
    return !user.dataValues.active;
  }

  async save(newUser: User): Promise<User | Error> {
    const user = await this.findByUsername(newUser.username);
    if (user) return { message: "User already exists" };

    await UserModel.create({ ...newUser });
    return newUser;
  }
}
