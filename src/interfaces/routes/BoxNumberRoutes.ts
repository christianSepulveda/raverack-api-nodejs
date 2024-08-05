import { Router } from "express";
import { BoxNumberController } from "../controllers/BoxNumberController";
import verifySession from "../middlewares/verifySession";

const router = Router();
const boxNumberController = new BoxNumberController();

router.post("/create", verifySession, boxNumberController.CreateBoxesNumbers);
router.post("/get", verifySession, boxNumberController.GetBoxNumber);
router.put("/update", verifySession, boxNumberController.UpdateBoxNumberStatus);

export default router;
