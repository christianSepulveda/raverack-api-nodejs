import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const instance = new Sequelize(
  process.env.DB_NAME ?? "",
  process.env.DB_USER ?? "",
  process.env.DB_PASSWORD ?? "",
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
  }
);

export default instance;
