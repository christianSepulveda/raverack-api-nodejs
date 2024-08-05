import { Customer } from "../../../domain/entities/Customer";
import { Error } from "../../../domain/entities/Error";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";

export class CreateCustomer {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  isValidCustomer(customer: Customer): boolean {
    if (customer.rut === undefined) return false;
    if (customer.fullname === undefined) return false;
    return true;
  }

  async execute(customer: Customer): Promise<Customer | Error> {
    if (!this.isValidCustomer(customer))
      return { message: "Customer rut and name are required" };

    const newCustomer = await this.customerRepository.save(customer);
    return newCustomer;
  }
}
