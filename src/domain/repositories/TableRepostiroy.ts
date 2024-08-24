import { Error } from "../entities/Error";
import { Table } from "../entities/Table";

export interface TableRepository {
  findAll(): Promise<Table[]>;
  updateStatus(tableId: string, customerId?: string): Promise<Table | Error>;
  save(table: Table): Promise<Table | Error>;
}
