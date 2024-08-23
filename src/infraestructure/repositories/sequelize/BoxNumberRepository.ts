import { FindAllCustomers } from "../../../application/use-cases/Customer/FindAllCustomers";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";
import BoxNumberModel from "../../database/models/BoxNumber";
import { SequelizeCustomerRepository } from "./CustomerRepository";

const customerRepository = new SequelizeCustomerRepository();
const getAllCustomers = new FindAllCustomers(customerRepository);

export class SequelizeBoxNumberRepository implements BoxNumberRepository {
  async saveBoxNumber(boxnumber: BoxNumber): Promise<BoxNumber | Error> {
    const boxNumberExists = await BoxNumberModel.findOne({
      where: { boxnumber: boxnumber.boxnumber },
    });
    if (boxNumberExists) return { message: "Box number already exists" };

    const boxNumber = await BoxNumberModel.create({ ...boxnumber });
    if (!boxNumber) return { message: "Cannot create box number" };

    return { ...boxNumber, customer: null };
  }

  async findAllBoxNumber(): Promise<BoxNumber[] | Error> {
    const response = [] as BoxNumber[];
    const boxNumbers = await BoxNumberModel.findAll();
    const customers = await getAllCustomers.execute();

    if (!boxNumbers) return { message: "Cannot get all box numbers" };

    boxNumbers.forEach((box) => {
      response.push({
        ...box.dataValues,
        customer: customers
          ? customers.find((customer) => customer.id === box.customerid)
          : null,
      });
    });

    return response;
  }
  async findByBoxNumber(boxnumber: number): Promise<BoxNumber | Error> {
    const boxNumber = await BoxNumberModel.findOne({ where: { boxnumber } });
    if (!boxNumber) return { message: "Box number not found" };

    return boxNumber.dataValues;
  }

  async ocuppyBoxNumber(
    boxnumber: number,
    customerID: string
  ): Promise<BoxNumber | Error> {
    const boxNumber = await BoxNumberModel.findOne({ where: { boxnumber } });
    if (!boxNumber) return { message: "Box number not found" };
    if (!boxNumber.available)
      return { message: "Box number is already ocuppy" };

    const updatedBoxNumber = await boxNumber.update({
      available: false,
      customerid: customerID,
    });
    if (!updatedBoxNumber) return { message: "Cannot update box number" };

    return { ...updatedBoxNumber, customer: null };
  }

  async releaseBoxNumber(boxnumber: number): Promise<BoxNumber | Error> {
    const boxNumber = await BoxNumberModel.findOne({ where: { boxnumber } });
    if (!boxNumber) return { message: "Box number not found" };
    if (boxNumber.available)
      return { message: "Box number is already available" };

    const updatedBoxNumber = await boxNumber.update({
      available: true,
      customerid: null,
    });
    if (!updatedBoxNumber) return { message: "Cannot update box number" };

    return { ...updatedBoxNumber, customer: null };
  }
}
