import { CreateCompany } from "../../application/use-cases/Company/CreateCompany";
import { RegisterUser } from "../../application/use-cases/User/Register";
import { Company } from "../../domain/entities/Company";
import { Error } from "../../domain/entities/Error";
import { SequelizeCompanyRepository } from "../../infraestructure/repositories/sequelize/CompanyRepository";
import { SequelizeUserRepository } from "../../infraestructure/repositories/sequelize/UserRepository";

export default async function CreateDefaultUser() {
  const userRepository = new SequelizeUserRepository();
  const registUser = new RegisterUser(userRepository);

  const companyRepository = new SequelizeCompanyRepository();
  const createCompany = new CreateCompany(companyRepository);

  const defaultCompany: Company = {
    id: "205200185",
    name: "RaveRack Company",
    email: "christiandev30@gmail.com",
    phoneNumber: "+56987409583",
    rut: "20520018-5",
    active: true,
    activeCustody: true,
    activeReservation: true,
    expirationDate: "2100-01-01",
    monthlyPayment: 0,
  };

  const company = await createCompany.execute(defaultCompany);
  const user = await registUser.execute("root", "205200185", "205200185");

  if (company && user) {
    console.log("Default company and user created");
    return;
  }

  console.log("Default user and company already exists");
  return;
}
