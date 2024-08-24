import { Error } from "../../../domain/entities/Error";
import { Table } from "../../../domain/entities/Table";

import { TableRepository } from "../../../domain/repositories/TableRepostiroy";
import TableModel from "../../database/models/Table";

export class SequelizeTableRepository implements TableRepository {
  async save(table: Table): Promise<Table | Error> {
    const tableExists = await TableModel.findOne({
      where: { number: table.number },
    });
    if (tableExists) return { message: "Table already exists" };

    const newTable = await TableModel.create({ ...table });
    if (!newTable) return { message: "Cannot create table" };

    return newTable;
  }

  async findAll(): Promise<Table[]> {
    const tables = await TableModel.findAll();
    return tables;
  }

  async updateStatus(
    tableId: string,
    custiomerId?: string
  ): Promise<Table | Error> {
    const table = await TableModel.findOne({ where: { id: tableId } });
    if (!table) return { message: "Table not found" };

    const updatedTable = await table.update({
      customerId: custiomerId ?? null,
    });

    return updatedTable;
  }
}
