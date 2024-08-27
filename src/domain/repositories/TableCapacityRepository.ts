import { Error } from "../entities/Error";
import { TableCapacity } from "../entities/TableCapacity";

export interface TableCapacityRepository {
  findAll(): Promise<TableCapacity[]>;
  save(tableCapacity: TableCapacity): Promise<TableCapacity | Error>;
  update(id: string): Promise<TableCapacity | Error>;
}
