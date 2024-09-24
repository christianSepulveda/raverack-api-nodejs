import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";

export class FindBoxNumber {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(
    boxnumberid: string | undefined,
    companyid: string | undefined
  ): Promise<BoxNumber | BoxNumber[] | Error> {
    if (!boxnumberid && companyid) {
      const boxNumber = await this.boxNumberRepository.findAllBoxNumber(companyid);
      return boxNumber;
    }

    if (boxnumberid && boxnumberid.length > 0) {
      const result = await this.boxNumberRepository.findByBoxNumber(boxnumberid);
      return result;
    }

    return { message: "Box number should be greater than 0" };
  }
}
