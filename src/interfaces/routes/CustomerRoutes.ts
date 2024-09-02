import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";
import verifySession from "../middlewares/verifySession";

const router = Router();
const customerController = new CustomerController();

router.post("/all", verifySession, customerController.GetAllCustomers);
router.put(
  "/create-update",
  verifySession,
  customerController.CreateOrUpdateCustomer
);

export default router;
