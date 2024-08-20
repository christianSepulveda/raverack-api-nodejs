import { Request, Response } from "express";
import { SequelizeCustomerRepository } from "../../infraestructure/repositories/sequelize/CustomerRepository";
import { FindAllCustomers } from "../../application/use-cases/Customer/FindAllCustomers";

const customerRepository = new SequelizeCustomerRepository();
const getAllCustomers = new FindAllCustomers(customerRepository);

export class CustomerController {
  async GetAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customers = await getAllCustomers.execute();
      if (!customers) res.status(404).send({ message: "Customers not found" });
      if (customers) res.status(200).send(customers);

      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
