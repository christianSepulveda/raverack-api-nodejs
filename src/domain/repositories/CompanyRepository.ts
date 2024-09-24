import { Error } from "../entities/Error";
import { Company } from "../entities/Company";

export interface CompanyRepository {
  saveCompany(company: Company): Promise<Company | Error>;
  findByID(id: string): Promise<Company | null>;
  findAll(): Promise<Company[]>;
  updateCompany(company: Company): Promise<Company | Error>;
}
