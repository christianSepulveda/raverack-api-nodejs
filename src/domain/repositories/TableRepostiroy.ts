import { Error } from "../entities/Error";
import { Table, TableInitValues } from "../entities/Table";

export interface TableRepository {
  findAll(): Promise<Table[]>;
  updateStatus(
    tableId: string,
    customerId?: string,
    tableCapacityNumber?: number
  ): Promise<Table | Error>;
  save(
    initValues: TableInitValues,
    tableCapacityNumber: number
  ): Promise<Table | Error>;
}
