import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController";
import verifySession from "../middlewares/verifySession";

const router = Router();
const reservationController = new ReservationController();

router.post("/get", verifySession, reservationController.GetReservations);
router.post("/create", verifySession, reservationController.CreateReservation);
router.put("/update", verifySession, reservationController.UpdateReservation);

export default router;
