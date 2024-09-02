import { Customer } from "../../../domain/entities/Customer";
import { Error } from "../../../domain/entities/Error";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";

export class FindCustomer {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(id: string, companyid: string): Promise<Customer | Error> {
    if (!id) return { message: "ID is required" };

    const customer = await this.customerRepository.findByID(id, companyid);
    return customer;
  }
}
