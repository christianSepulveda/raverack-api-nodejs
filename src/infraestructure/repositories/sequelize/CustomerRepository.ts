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

  async findByRut(rut: string, companyid: string): Promise<Customer | null> {
    const customer = await CustomerModel.findOne({ where: { rut, companyid } });
    if (!customer) return null;

    return customer.dataValues;
  }

  async findAll(companyid: string): Promise<Customer[]> {
    const customers = await CustomerModel.findAll({ where: { companyid } });
    if (customers.length === 0) return [] as Customer[];

    return customers.map((customer) => customer.dataValues);
  }

  async updateCustomer(currentCustomer: Customer): Promise<Customer | Error> {
    const customer = await CustomerModel.findOne({
      where: { rut: currentCustomer.rut },
    });
    if (!customer) return { message: "Customer not found" };

    const updatedCustomer = await customer.update({ ...currentCustomer });
    return updatedCustomer.dataValues;
  }

  async save(customer: Customer): Promise<Customer | Error> {
    const customerExists = await this.findByRut(customer.rut, customer.companyid);
    if (customerExists) return customerExists;

    const newCustomer = await CustomerModel.create({ ...customer });
    return newCustomer.dataValues;
  }
}
