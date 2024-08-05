import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";

export class UpdateBoxNumberStatus {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(
    boxNumber: number,
    customerID?: string
  ): Promise<BoxNumber | Error> {
    if (boxNumber && customerID) {
      const result = await this.boxNumberRepository.ocuppyBoxNumber(
        boxNumber,
        customerID
      );
      return result;
    }

    if (boxNumber && !customerID) {
      const result = await this.boxNumberRepository.releaseBoxNumber(boxNumber);
      return result;
    }

    return { message: "Box number is required" };
  }
}
