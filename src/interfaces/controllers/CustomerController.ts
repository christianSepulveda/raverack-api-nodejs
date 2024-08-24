import { Request, Response } from "express";
import { SequelizeCustomerRepository } from "../../infraestructure/repositories/sequelize/CustomerRepository";
import { FindAllCustomers } from "../../application/use-cases/Customer/FindAllCustomers";
import { CreateCustomer } from "../../application/use-cases/Customer/Create";
import { FindCustomer } from "../../application/use-cases/Customer/FindCustomer";
import { FindCustomerByRut } from "../../application/use-cases/Customer/FindCustomerByRut";
import { UpdateCustomer } from "../../application/use-cases/Customer/UpdateCustomer";
import { Customer } from "../../domain/entities/Customer";

const customerRepository = new SequelizeCustomerRepository();
const getAllCustomers = new FindAllCustomers(customerRepository);

const createCustomer = new CreateCustomer(customerRepository);
const findCustomer = new FindCustomer(customerRepository);
const findCustomerByRut = new FindCustomerByRut(customerRepository);
const updateCustomer = new UpdateCustomer(customerRepository);

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

  async CreateOrUpdateCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customer = await findCustomerByRut.execute(req.body.rut);

      if (customer) {
        const updatedCustomer = await updateCustomer.execute(req.body);
        if (updatedCustomer) res.status(200).send(updatedCustomer);
        return;
      }

      const newCustomer = await createCustomer.execute(req.body);
      if (newCustomer) res.status(200).send(newCustomer);

      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
