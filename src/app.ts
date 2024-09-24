import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import initSequelizeServer from "./interfaces/config/init-sequelize-server";
import CreateDefaultUser from "./interfaces/config/create-default-user";

import authRoutes from "./interfaces/routes/AuthRoutes";
import boxNumberRoutes from "./interfaces/routes/BoxNumberRoutes";
import customerRoutes from "./interfaces/routes/CustomerRoutes";
import reservationRoutes from "./interfaces/routes/ReservationRoutes";
import companyRoutes from "./interfaces/routes/CompanyRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: "*", // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
}));

app.use("/user", authRoutes);
app.use("/boxnumber", boxNumberRoutes);
app.use("/customer", customerRoutes);
app.use("/reservation", reservationRoutes);
app.use("/company", companyRoutes);

initSequelizeServer(app, port);

(async () => await CreateDefaultUser())();
