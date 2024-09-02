import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";

export class UpdateBoxNumberStatus {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(
    boxnumberid: string,
    customerID?: string
  ): Promise<BoxNumber | Error> {
    if (boxnumberid && customerID) {
      const result = await this.boxNumberRepository.ocuppyBoxNumber(
        boxnumberid,
        customerID
      );
      return result;
    }

    if (boxnumberid && !customerID) {
      const result = await this.boxNumberRepository.releaseBoxNumber(boxnumberid);
      return result;
    }

    return { message: "Box number is required" };
  }
}
