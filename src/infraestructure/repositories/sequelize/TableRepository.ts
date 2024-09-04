import { Error } from "../../../domain/entities/Error";
import { Table, TableInitValues } from "../../../domain/entities/Table";
import { v4 as uuidv4 } from "uuid";

import { TableRepository } from "../../../domain/repositories/TableRepostiroy";
import TableModel from "../../database/models/Table";

export class SequelizeTableRepository implements TableRepository {
  async save(table: TableInitValues): Promise<Table | Error> {
    const tableExists = await TableModel.findOne({
      where: { number: table.number },
    });
    if (tableExists) return { message: "Table already exists" };

    const newTable = await TableModel.create({
      id: uuidv4(),
      state: table.state,
      number: table.number,
      customerId: null,
    });

    if (!newTable) return { message: "Cannot create table" };
    return newTable;
  }

  async findAll(): Promise<Table[]> {
    const tables = await TableModel.findAll();
    return tables;
  }
}
