import { Customer } from "../../../domain/entities/Customer";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";

export class FindAllCustomers {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(companyid: string): Promise<Customer[] | null> {
    const customers = await this.customerRepository.findAll(companyid);
    return customers;
  }
}
