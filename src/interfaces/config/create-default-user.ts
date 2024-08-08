import { RegisterUser } from "../../application/use-cases/User/Register";
import { SequelizeUserRepository } from "../../infraestructure/repositories/sequelize/UserRepository";

export default async function CreateDefaultUser() {
  const userRepository = new SequelizeUserRepository();
  const registUser = new RegisterUser(userRepository);

  const user = await registUser.execute("root", "205200185");

  if (user) {
    console.log("Default user created");
    return;
  }

  console.log("Default user already exists");
  return;
}
