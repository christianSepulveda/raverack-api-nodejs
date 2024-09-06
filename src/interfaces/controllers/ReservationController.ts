import { v4 } from "uuid";
import { Error } from "../../domain/entities/Error";
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
const customerRepository = new SequelizeCustomerRepository();
const createCustomer = new CreateCustomer(customerRepository);
const findCustomerByRut = new FindCustomerByRut(customerRepository);
const updateCustomer = new UpdateCustomer(customerRepository);

const reservationRepository = new SequelizeReservationRepository();
const findReservation = new FindReservation(reservationRepository);
const createReservation = new CreateReservation(reservationRepository);
const updateReservation = new UpdateReservation(reservationRepository);

export class ReservationController {
  async CreateReservation(req: Request, res: Response): Promise<void> {
    try {
      const { fullname, rut, phone, email, date, time, capacity, companyid } =
        req.body;

      const customer = await findCustomerByRut.execute(rut, companyid);

      if (customer && customer.id) {
        await updateCustomer.execute({
          email,
          phoneNumber: phone,
          companyid: customer.companyid,
          fullname: customer.fullname,
          rut: customer.rut,
        });

        const reservation: Reservation = {
          id: "",
          date,
          time,
          capacity,
          customerId: customer.id,
          companyId: companyid,
          active: true,
        };

        const newReservation = (await createReservation.execute(
          reservation
        )) as Reservation & Error;

        if (newReservation.message) {
          res.status(500).send(newReservation);
          return;
        }

        res.status(200).send(newReservation);
        return;
      }

      const newCustomer = (await createCustomer.execute({
        fullname,
        rut,
        phoneNumber: phone,
        email,
        companyid,
      })) as Customer & Error;

      if (newCustomer.message) {
        res.status(500).send(newCustomer);
        return;
      }

      if (newCustomer && newCustomer.id) {
        const reservation: Reservation = {
          id: v4(),
          date,
          time,
          capacity,
          customerId: newCustomer.id,
          companyId: companyid,
          active: true,
        };

        const newReservation = (await createReservation.execute(
          reservation
        )) as Reservation & Error;

        if (newReservation.message) {
          res.status(500).send(newReservation);
          return;
        }

        res.status(200).send(newReservation);
        return;
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }

  async GetReservations(req: Request, res: Response): Promise<void> {
    try {
      const { id, companyid } = req.params;
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
}
