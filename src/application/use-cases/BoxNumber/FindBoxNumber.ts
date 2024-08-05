import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";

export class FindBoxNumber {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(
    boxNumber: number | undefined
  ): Promise<BoxNumber | BoxNumber[] | Error> {
    if (!boxNumber) {
      const boxNumber = await this.boxNumberRepository.findAllBoxNumber();
      return boxNumber;
    }

    if (boxNumber && boxNumber > 0) {
      const result = await this.boxNumberRepository.findByBoxNumber(boxNumber);
      return result;
    }

    return { message: "Box number should be greater than 0" };
  }
}
