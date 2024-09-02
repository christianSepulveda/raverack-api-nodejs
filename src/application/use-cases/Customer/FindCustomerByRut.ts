import { Customer } from "../../../domain/entities/Customer";
import { Error } from "../../../domain/entities/Error";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";

export class FindCustomerByRut {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(rut: string, companyid: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findByRut(rut, companyid);
    return customer;
  }
}
