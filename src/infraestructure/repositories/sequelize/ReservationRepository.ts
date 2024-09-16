import { Reservation } from "../../../domain/entities/Reservation";
import { Error } from "../../../domain/entities/Error";
import { ReservationRepository } from "../../../domain/repositories/ReservationRepository";
import ReservationModel from "../../database/models/Reservation";
import CustomerModel from "../../database/models/Customer";

export class SequelizeReservationRepository implements ReservationRepository {
  async findByID(id: string): Promise<Reservation | Error> {
    const reservation = await ReservationModel.findOne({ where: { id } });
    if (!reservation) return { message: "Reservation not found" };

    const customer = await CustomerModel.findOne({
      where: { id: reservation.customerId },
    });
    
    return { ...reservation.dataValues, customer };
  }

  async findAll(companyId: string): Promise<Reservation[]> {
    const reservations = await ReservationModel.findAll({
      where: { companyId },
    });
    const customers = await CustomerModel.findAll();

    if (reservations.length === 0) return [] as Reservation[];

    const response = reservations.map((reservation) => {
      const customer = customers.find(
        (customer) => customer.id === reservation.customerId
      );
      return { ...reservation.dataValues, customer };
    });

    return response;
  }

  async updateReservation(
    currentReservation: Reservation
  ): Promise<Reservation | Error> {
    const reservation = await ReservationModel.findOne({
      where: { id: currentReservation.id },
    });
    if (!reservation) return { message: "Reservation not found" };

    const updatedReservation = await reservation.update({
      ...currentReservation,
    });
    return updatedReservation.dataValues;
  }

  async save(reservation: Reservation): Promise<Reservation | Error> {
    const newReservation = await ReservationModel.create({ ...reservation });
    return newReservation.dataValues;
  }
}
