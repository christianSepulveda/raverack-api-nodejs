import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./interfaces/routes/AuthRoutes";
import boxNumberRoutes from "./interfaces/routes/BoxNumberRoutes";
import initSequelizeServer from "./interfaces/config/init-sequelize-server";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", authRoutes);
app.use("/boxnumber", boxNumberRoutes)

initSequelizeServer(app, port);
