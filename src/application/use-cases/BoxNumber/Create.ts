import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepository";

export class CreateBoxNumber {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(box: BoxNumber, companyid: string): Promise<BoxNumber | Error> {
    if (box.boxnumber <= 0)
      return { message: "Box number should be greater than 0" };
    if (box.available === undefined)
      return { message: "Box availability is required" };

    const boxNumber = await this.boxNumberRepository.saveBoxNumber(box, companyid);
    return boxNumber;
  }
}
