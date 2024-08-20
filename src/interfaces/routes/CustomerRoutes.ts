import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";
import verifySession from "../middlewares/verifySession";

const router = Router();
const customerController = new CustomerController();

router.get("/all", verifySession, customerController.GetAllCustomers);

export default router;
