import { Company } from "../../../domain/entities/Company";
import { Error } from "../../../domain/entities/Error";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";

export class GetCompany {
  private companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(id: string | undefined): Promise<Company | Company[] | Error> {
    if (id) {
      const company = await this.companyRepository.findByID(id);
      if (!company) return { message: "Company not found" };
      return company;
    }

    const companies = await this.companyRepository.findAll();
    return companies;
  }
}
