import { Error } from "../../../domain/entities/Error";
import { Table, TableInitValues } from "../../../domain/entities/Table";
import { TableCapacity } from "../../../domain/entities/TableCapacity";
import { v4 as uuidv4 } from "uuid";

import { TableRepository } from "../../../domain/repositories/TableRepostiroy";
import TableModel from "../../database/models/Table";
import { SequelizeTableCapacityRepository } from "./TableCapacityRepository";

const tableCapacityRepository = new SequelizeTableCapacityRepository();

export class SequelizeTableRepository implements TableRepository {
  async save(
    table: TableInitValues,
    tableCapacityNumber: number
  ): Promise<Table | Error> {
    const tableExists = await TableModel.findOne({
      where: { number: table.number },
    });
    if (tableExists) return { message: "Table already exists" };

    const tableCapacity = await tableCapacityRepository.findAll();
    const tableCapacityNumberExists = tableCapacity.find(
      (tc) => tc.capacity === tableCapacityNumber
    );

    if (!tableCapacityNumberExists) {
      const id = uuidv4();

      tableCapacityRepository.save({
        id,
        capacity: tableCapacityNumber,
        active: true,
        companyid: table.companyid,
      });

      const newTable = await TableModel.create({
        id: uuidv4(),
        state: table.state,
        number: table.number,
        companyid: table.companyid,
        capacityId: id,
        customerId: null,
      });

      return newTable;
    }

    const newTable = await TableModel.create({
      id: uuidv4(),
      state: table.state,
      number: table.number,
      capacityId: tableCapacityNumberExists.id,
      customerId: null,
    });

    if (!newTable) return { message: "Cannot create table" };
    return newTable;
  }

  async findAll(): Promise<Table[]> {
    const tables = await TableModel.findAll();
    return tables;
  }

  async updateStatus(
    tableId: string,
    custiomerId?: string,
    tableCapacityNumber?: number
  ): Promise<Table | Error> {
    const table = await TableModel.findOne({ where: { id: tableId } });
    if (!table) return { message: "Table not found" };

    const updatedTable = await table.update({
      customerId: custiomerId ?? null,
    });

    return updatedTable;
  }
}
