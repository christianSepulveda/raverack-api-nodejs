import { Error } from "../entities/Error";
import { Reservation } from "../entities/Reservation";

export interface ReservationRepository {
  findAll(companyid: string): Promise<Reservation[]>;
  findByID(id: string | undefined): Promise<Reservation | Error>;
  updateReservation(reservation: Reservation): Promise<Reservation | Error>;
  save(reservation: Reservation): Promise<Reservation | Error>;
}
