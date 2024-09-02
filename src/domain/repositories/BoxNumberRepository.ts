import { Error } from "../entities/Error";
import { BoxNumber } from "../entities/BoxNumber";

export interface BoxNumberRepository {
  saveBoxNumber(
    boxnumber: BoxNumber,
    companyid: string
  ): Promise<BoxNumber | Error>;
  findAllBoxNumber(companyid: string): Promise<BoxNumber[] | Error>;
  findByBoxNumber(boxnumberID: string): Promise<BoxNumber | Error>;
  releaseBoxNumber(boxnumberID: string): Promise<BoxNumber | Error>;
  ocuppyBoxNumber(
    boxnumberID: string,
    customerID: string
  ): Promise<BoxNumber | Error>;
}
