import { Error } from "../entities/Error";
import { Customer } from "../entities/Customer";

export interface CustomerRepository {
  findByRut(rut: string): Promise<Customer | null>;
  findByID(id: string): Promise<Customer | Error>;
  save(customer: Customer): Promise<Customer | Error>;
}
