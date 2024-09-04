import { Error } from "../entities/Error";
import { Table, TableInitValues } from "../entities/Table";

export interface TableRepository {
  findAll(): Promise<Table[]>;
  save(initValues: TableInitValues): Promise<Table | Error>;
}
