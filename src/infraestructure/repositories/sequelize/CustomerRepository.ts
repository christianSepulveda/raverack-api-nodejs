import { Customer } from "../../../domain/entities/Customer";
import { Error } from "../../../domain/entities/Error";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";
import CustomerModel from "../../database/models/Customer";

export class SequelizeCustomerRepository implements CustomerRepository {
  async findByID(id: string): Promise<Customer | Error> {
    const customer = await CustomerModel.findOne({ where: { id } });
    if (!customer) return { message: "Customer not found" };

    return customer.dataValues;
  }

  async findByRut(rut: string): Promise<Customer | null> {
    const customer = await CustomerModel.findOne({ where: { rut } });
    if (!customer) return null;

    return customer.dataValues;
  }

  async save(customer: Customer): Promise<Customer | Error> {
    const customerExists = await this.findByRut(customer.rut);
    if (customerExists) return customerExists;

    const newCustomer = await CustomerModel.create({ ...customer });
    return newCustomer.dataValues;
  }
}
