import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";
import BoxNumberModel from "../../database/models/BoxNumber";

export class SequelizeBoxNumberRepository implements BoxNumberRepository {
  async saveBoxNumber(boxnumber: BoxNumber): Promise<BoxNumber | Error> {
    const boxNumberExists = await BoxNumberModel.findOne({
      where: { boxnumber: boxnumber.boxnumber },
    });
    if (boxNumberExists) return { message: "Box number already exists" };

    const boxNumber = await BoxNumberModel.create({ ...boxnumber });
    if (!boxNumber) return { message: "Cannot create box number" };

    return boxNumber;
  }

  async findAllBoxNumber(): Promise<BoxNumber[] | Error> {
    const response = [] as BoxNumber[];
    const boxNumbers = await BoxNumberModel.findAll();
    if (!boxNumbers) return { message: "Cannot get all box numbers" };

    boxNumbers.forEach((box) => {
      response.push(box.dataValues);
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

    return updatedBoxNumber;
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

    return updatedBoxNumber;
  }
}
