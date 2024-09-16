import { v4 } from "uuid";
import { Request, Response } from "express";

import { SequelizeReservationRepository } from "../../infraestructure/repositories/sequelize/ReservationRepository";
import { FindReservation } from "../../application/use-cases/Reservation/FindReservation";
import { CreateReservation } from "../../application/use-cases/Reservation/CreateReservation";
import { UpdateReservation } from "../../application/use-cases/Reservation/UpdateReservation";

import { SequelizeCustomerRepository } from "../../infraestructure/repositories/sequelize/CustomerRepository";
import { CreateCustomer } from "../../application/use-cases/Customer/Create";
import { FindCustomerByRut } from "../../application/use-cases/Customer/FindCustomerByRut";
import { UpdateCustomer } from "../../application/use-cases/Customer/UpdateCustomer";
import { Reservation } from "../../domain/entities/Reservation";

import { Customer } from "../../domain/entities/Customer";
import SendEmail from "../config/send-email";
const customerRepository = new SequelizeCustomerRepository();
const createCustomer = new CreateCustomer(customerRepository);
const findCustomerByRut = new FindCustomerByRut(customerRepository);
const updateCustomer = new UpdateCustomer(customerRepository);

const reservationRepository = new SequelizeReservationRepository();
const findReservation = new FindReservation(reservationRepository);
const createReservation = new CreateReservation(reservationRepository);
const updateReservation = new UpdateReservation(reservationRepository);

export class ReservationController {
  constructor() {
    this.CreateReservation = this.CreateReservation.bind(this);
    this.GetReservations = this.GetReservations.bind(this);
    this.UpdateReservation = this.UpdateReservation.bind(this);
    this.updateExistingCustomer = this.updateExistingCustomer.bind(this);
    this.createNewCustomer = this.createNewCustomer.bind(this);
    this.createReservationForCustomer =
      this.createReservationForCustomer.bind(this);
    this.sendReservationConfirmationEmail =
      this.sendReservationConfirmationEmail.bind(this);
  }

  async CreateReservation(req: Request, res: Response): Promise<void> {
    try {
      const { fullname, rut, phone, email, date, time, capacity, companyid } =
        req.body;

      const customer = await findCustomerByRut.execute(rut, companyid);
      let customerData =
        customer && customer.id
          ? await this.updateExistingCustomer(customer, phone, email)
          : await this.createNewCustomer(
              fullname,
              rut,
              phone,
              email,
              companyid
            );

      if ("message" in customerData) {
        res.status(500).send(customerData);
        return;
      }

      if (customerData && customerData.id) {
        const reservation = await this.createReservationForCustomer(
          customerData.id,
          date,
          time,
          capacity,
          companyid
        );

        if ("message" in reservation) {
          res.status(500).send(reservation);
          return;
        }

        await this.sendReservationConfirmationEmail({...customerData, email}, reservation);
        res.status(200).send(reservation);
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }

  async GetReservations(req: Request, res: Response): Promise<void> {
    try {
      const { id, companyid } = req.body;
      console.log(req.body);
      const reservation = await findReservation.execute(id, companyid);

      if (!reservation)
        res.status(404).send({ message: "Reservation not found" });

      if (reservation) res.status(200).send(reservation);
      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }

  async UpdateReservation(req: Request, res: Response): Promise<void> {
    try {
      const { reservation } = req.body;
      const updatedReservation = await updateReservation.execute(reservation);

      if (!updatedReservation)
        res.status(404).send({ message: "Reservation not found" });

      res.status(200).send(updatedReservation);
      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }

  async updateExistingCustomer(
    customer: Customer,
    phone: string,
    email: string
  ) {
    await updateCustomer.execute({
      email,
      phoneNumber: phone,
      companyid: customer.companyid,
      fullname: customer.fullname,
      rut: customer.rut,
    });
    return customer;
  }

  async createNewCustomer(
    fullname: string,
    rut: string,
    phone: string,
    email: string,
    companyid: string
  ) {
    return await createCustomer.execute({
      id: v4(),
      fullname,
      rut,
      phoneNumber: phone,
      email,
      companyid,
    });
  }

  async createReservationForCustomer(
    customerId: string,
    date: Date,
    time: string,
    capacity: number,
    companyid: string
  ) {
    const reservation: Reservation = {
      id: v4(),
      date,
      time,
      capacity,
      customerId,
      companyId: companyid,
      active: true,
    };
    return await createReservation.execute(reservation);
  }

  async sendReservationConfirmationEmail(
    customer: Customer,
    reservation: Reservation
  ) {
    const formattedDate = new Date(reservation.date).toLocaleDateString(
      "es-ES",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    await SendEmail({
      to: [{ email: customer.email ?? "", name: customer.fullname ?? "" }],
      sender: {
        email: "christiandev30@gmail.com",
        name: "Christian desde RaveRack",
      },
      htmlContent: `
        <html>
          <body>
            <h1>Hola ${customer.fullname ?? ""},</h1>
            <p>Nos complace informar que tu reserva ha sido agendada correctamente.</p>
            <p>Detalles de la reserva:</p>
            <ul>
              <li><strong>Fecha:</strong> ${formattedDate}</li>
              <li><strong>Hora:</strong> ${reservation.time}</li>
              <li><strong>Número de Personas:</strong> ${
                reservation.capacity
              }</li>
            </ul>
            <p>Gracias por confiar en nosotros.</p>
            <p>¡Saludos!</p>
          </body>
        </html>
      `,
      subject: "¡Tu reserva está lista!",
    });
  }
}
