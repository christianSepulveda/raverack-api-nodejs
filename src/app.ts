import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

import initSequelizeServer from "./interfaces/config/init-sequelize-server";
import CreateDefaultUser from "./interfaces/config/create-default-user";

import authRoutes from "./interfaces/routes/AuthRoutes";
import boxNumberRoutes from "./interfaces/routes/BoxNumberRoutes";
import customerRoutes from "./interfaces/routes/CustomerRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", authRoutes);
app.use("/boxnumber", boxNumberRoutes);
app.use("/customer", customerRoutes);

initSequelizeServer(app, port);

(async () => await CreateDefaultUser())();
