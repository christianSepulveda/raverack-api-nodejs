import { Request, Response } from "express";
import { Company } from "../../domain/entities/Company";

import { GetCompany } from "../../application/use-cases/Company/GetCompany";
import { CreateCompany } from "../../application/use-cases/Company/CreateCompany";
import { UpdateCompany } from "../../application/use-cases/Company/UpdateCompany";

import { SequelizeCompanyRepository } from "../../infraestructure/repositories/sequelize/CompanyRepository";
import { Error } from "../../domain/entities/Error";

const companyRepository = new SequelizeCompanyRepository();
const getCompany = new GetCompany(companyRepository);
const createCompany = new CreateCompany(companyRepository);
const updateCompany = new UpdateCompany(companyRepository);

export class CompanyController {
  async GetCompanyById(req: Request, res: Response): Promise<void> {
    try {
      console.log("GetCompanyById");

      const id = req.params.id;
      const company = (await getCompany.execute(id)) as Company & Error;
      if (company.message) {
        res.status(404).json({ message: company.message });
        return;
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async GetAllCompanies(req: Request, res: Response): Promise<void> {
    try {
      const companies = await getCompany.execute(undefined);
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async CreateCompany(req: Request, res: Response): Promise<void> {
    try {
      const company = req.body as Company;
      await createCompany.execute(company);
      res.status(200).json({ message: "Company created" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async UpdateCompany(req: Request, res: Response): Promise<void> {
    try {
      const company = req.body as Company;
      await updateCompany.execute(company);
      res.status(200).json({ message: "Company updated" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
