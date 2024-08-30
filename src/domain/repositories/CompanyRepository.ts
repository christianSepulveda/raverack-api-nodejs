import { Error } from "../entities/Error";
import { Company } from "../entities/Company";

export interface CompanyRepository {
  saveCompany(company: Company): Promise<Company | Error>;
  updateCompany(company: Company): Promise<Company | Error>;
}
