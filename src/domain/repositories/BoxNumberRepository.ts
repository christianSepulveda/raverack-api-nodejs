import { Error } from "../entities/Error";
import { BoxNumber } from "../entities/BoxNumber";

export interface BoxNumberRepository {
  saveBoxNumber(boxnumber: BoxNumber): Promise<BoxNumber | Error>;
  findAllBoxNumber(): Promise<BoxNumber[] | Error>;
  findByBoxNumber(boxnumber: number): Promise<BoxNumber | Error>;
  releaseBoxNumber(boxnumber: number): Promise<BoxNumber | Error>;
  ocuppyBoxNumber(
    boxnumber: number,
    customerID: string
  ): Promise<BoxNumber | Error>;
}
