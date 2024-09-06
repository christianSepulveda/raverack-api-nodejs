import { Reservation } from "../../../domain/entities/Reservation";
import { Error } from "../../../domain/entities/Error";
import { ReservationRepository } from "../../../domain/repositories/ReservationRepository";

export class CreateReservation {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  isValidReservation(reservation: Reservation): boolean {
    if (reservation.date === undefined) return false;
    if (reservation.time === undefined) return false;
    if (reservation.capacity === undefined) return false;
    if (reservation.customerId === undefined) return false;
    if (reservation.tableId === undefined) return false;
    if (reservation.active === undefined) return false;
    return true;
  }

  async execute(reservation: Reservation): Promise<Reservation | Error> {
    if (!this.isValidReservation(reservation))
      return {
        message:
          "Reservation date, time, capacity, customerId, tableId and active are required",
      };

    const newReservation = await this.reservationRepository.save(reservation);
    return newReservation;
  }
}
