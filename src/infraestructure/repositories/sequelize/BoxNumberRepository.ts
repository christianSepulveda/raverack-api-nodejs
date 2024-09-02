import { FindAllCustomers } from "../../../application/use-cases/Customer/FindAllCustomers";
import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";
import BoxNumberModel from "../../database/models/BoxNumber";
import { SequelizeCustomerRepository } from "./CustomerRepository";

const customerRepository = new SequelizeCustomerRepository();
const getAllCustomers = new FindAllCustomers(customerRepository);

export class SequelizeBoxNumberRepository implements BoxNumberRepository {
  async saveBoxNumber(
    boxnumber: BoxNumber,
    companyid: string
  ): Promise<BoxNumber | Error> {
    const boxNumberExists = await BoxNumberModel.findOne({
      where: { boxnumber: boxnumber.boxnumber, companyid },
    });
    if (boxNumberExists) return { message: "Box number already exists" };

    const boxNumber = await BoxNumberModel.create({ ...boxnumber });
    if (!boxNumber) return { message: "Cannot create box number" };

    return { ...boxNumber, customer: null, companyid };
  }

  async findAllBoxNumber(companyid: string): Promise<BoxNumber[] | Error> {
    const response = [] as BoxNumber[];
    const allBoxNumbers = await BoxNumberModel.findAll();

    const boxNumbers = allBoxNumbers.filter(
      (box) => box.companyid === companyid
    );
    const customers = await getAllCustomers.execute(companyid);

    if (!boxNumbers) return { message: "Cannot get all box numbers" };

    boxNumbers.forEach((box) => {
      response.push({
        ...box.dataValues,
        customer: customers
          ? customers.find(
              (customer) => customer.id === box.dataValues.customerid
            )
          : null,
      });
    });

    return response;
  }
  async findByBoxNumber(boxnumberID: string): Promise<BoxNumber | Error> {
    const boxNumber = await BoxNumberModel.findOne({
      where: { id: boxnumberID },
    });
    if (!boxNumber) return { message: "Box number not found" };

    return boxNumber.dataValues;
  }

  async ocuppyBoxNumber(
    boxnumberID: string,
    customerID: string
  ): Promise<BoxNumber | Error> {
    console.log("BOX NUMBER ID",boxnumberID, customerID);

    const boxNumber = await BoxNumberModel.findOne({
      where: { id: boxnumberID },
    });

    if (!boxNumber) return { message: "Box number not found" };

    if (!boxNumber.available)
      return { message: "Box number is already ocuppy" };

    const updatedBoxNumber = await boxNumber.update({
      available: false,
      customerid: customerID,
    });
    if (!updatedBoxNumber) return { message: "Cannot update box number" };

    return {
      ...updatedBoxNumber,
      customer: null,
      companyid: boxNumber.dataValues.companyid,
    };
  }

  async releaseBoxNumber(boxnumberID: string): Promise<BoxNumber | Error> {
    const boxNumber = await BoxNumberModel.findOne({
      where: { id: boxnumberID },
    });

    if (!boxNumber) return { message: "Box number not found" };

    if (boxNumber.available)
      return { message: "Box number is already available" };

    const updatedBoxNumber = await boxNumber.update({
      available: true,
      customerid: null,
    });
    if (!updatedBoxNumber) return { message: "Cannot update box number" };

    return {
      ...updatedBoxNumber,
      customer: null,
      companyid: boxNumber.dataValues.companyid,
    };
  }
}
