import { Company } from "../../../domain/entities/Company";
import { Error } from "../../../domain/entities/Error";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import CompanyModel from "../../database/models/Company";

export class SequelizeCompanyRepository implements CompanyRepository {
  async saveCompany(company: Company): Promise<Company | Error> {
    const companyExists = await CompanyModel.findOne({
      where: { rut: company.rut },
    });
    if (companyExists) return { message: "Company already exists" };

    const newCompany = await CompanyModel.create({ ...company });
    if (!newCompany) return { message: "Cannot create company" };

    return newCompany;
  }

  async updateCompany(company: Company): Promise<Company | Error> {
    const companyExists = await CompanyModel.findOne({
      where: { id: company.id },
    });
    if (!companyExists) return { message: "Company not found" };

    const updatedCompany = await CompanyModel.update(company, {
      where: { id: company.id },
    });
    if (!updatedCompany) return { message: "Cannot update company" };

    return company;
  }

  findAll(): Promise<Company[]> {
    return CompanyModel.findAll();
  }

  findByID(id: string): Promise<Company | null> {
    return CompanyModel.findByPk(id);
  }
}
