import { Company } from "../../../domain/entities/Company";
import { Error } from "../../../domain/entities/Error";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";

export class UpdateCompany {
  private companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  isValidCompany(company: Company): boolean {
    if (company.name === undefined) return false;
    if (company.rut === undefined) return false;
    if (company.email === undefined) return false;
    if (company.phoneNumber === undefined) return false;
    if (company.activeReservation === undefined) return false;
    if (company.activeCustody === undefined) return false;
    if (company.active === undefined) return false;
    return true;
  }

  async execute(company: Company): Promise<Company | Error> {
    if (!this.isValidCompany(company))
      return { message: "Company name and address are required" };

    const updatedCompany = await this.companyRepository.updateCompany(company);
    return updatedCompany;
  }
}