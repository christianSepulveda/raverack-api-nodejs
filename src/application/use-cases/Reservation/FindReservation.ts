import { Reservation } from "../../../domain/entities/Reservation";
import { Error } from "../../../domain/entities/Error";
import { ReservationRepository } from "../../../domain/repositories/ReservationRepository";

export class FindReservation {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute(
    id: string | undefined,
    companyid: string
  ): Promise<Reservation | Reservation[] | Error> {
    if (id) {
      const reservation = await this.reservationRepository.findByID(id);
      if (!reservation) return { message: "Reservation not found" };
      return reservation;
    }

    if (!id && companyid) {
      const reservations = await this.reservationRepository.findAll(companyid);
      return reservations;
    }

    return { message: "Reservation not found" };
  }
}
