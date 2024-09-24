import { Error } from "../entities/Error";
import { Customer } from "../entities/Customer";

export interface CustomerRepository {
  findAll(companyid: string): Promise<Customer[]>;
  findByRut(rut: string, companyid: string): Promise<Customer | null>;
  findByID(id: string, companyid: string): Promise<Customer | Error>;
  updateCustomer(currentCustomer: Customer): Promise<Customer | Error>;
  save(customer: Customer): Promise<Customer | Error>;
}
