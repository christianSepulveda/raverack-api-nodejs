import { Router } from "express";
import { TableController } from "../controllers/TableController";
import verifySession from "../middlewares/verifySession";

const router = Router();
const tableController = new TableController();

router.get("/all", verifySession, tableController.GetAllTables);
router.post("/create", verifySession, tableController.createTable);
router.put("/update", verifySession, tableController.updateTable);

export default router;