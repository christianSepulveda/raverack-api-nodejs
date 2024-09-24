import { Customer } from "../../../domain/entities/Customer";
import { Error } from "../../../domain/entities/Error";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";

export class UpdateCustomer {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(currentCustomer: Customer): Promise<Customer | Error> {
    const customer = await this.customerRepository.updateCustomer(
      currentCustomer
    );
    return customer;
  }
}
