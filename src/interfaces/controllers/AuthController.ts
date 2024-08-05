import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/User/Register";
import { AuthUser } from "../../application/use-cases/Auth/Auth";
import { SequelizeUserRepository } from "../../infraestructure/repositories/sequelize/UserRepository";
import { UpdateStatus } from "../../application/use-cases/User/UpdateStatus";

const userRepository = new SequelizeUserRepository();
const registUser = new RegisterUser(userRepository);
const authUser = new AuthUser(userRepository);
const updateStatus = new UpdateStatus(userRepository);

export class AuthController {
  async Register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await registUser.execute(username, password);

      if (!user) res.status(401).send({ error: "Invalid credentials" });
      if (user) res.status(200).send([user]);

      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const response = await authUser.execute(username, password);

      console.log(req.body);

      if (typeof response === "object") res.status(401).send(response);
      if (typeof response === "string")
        res.status(200).json([{ token: response }]);

      return;
    } catch (error: any) {
      res.status(500).send("Server error");
      return;
    }
  }

  async UpdateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const update = await updateStatus.execute(id);
      const result =
        update == null ? "not found" : update ? "active" : "inactive";

      res.status(200).send([{ user: result }]);
      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
      return;
    }
  }
}
