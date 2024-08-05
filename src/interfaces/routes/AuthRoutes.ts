import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import verifySession from "../middlewares/verifySession";

const router = Router();
const authController = new AuthController();

router.post("/register", verifySession, authController.Register);
router.post("/login", authController.login);
router.post("/update", verifySession, authController.UpdateStatus);

export default router;
