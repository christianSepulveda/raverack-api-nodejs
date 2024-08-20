import { Customer } from "../../../domain/entities/Customer";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";

export class FindAllCustomers {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<Customer[] | null> {
    const customers = await this.customerRepository.findAll();
    return customers;
  }
}
