import { Error } from "../../../domain/entities/Error";
import { TableCapacity } from "../../../domain/entities/TableCapacity";

import { TableCapacityRepository } from "../../../domain/repositories/TableCapacityRepository";
import TableCapacityModel from "../../database/models/TableCapacity";

export class SequelizeTableCapacityRepository
  implements TableCapacityRepository
{
  async findAll(): Promise<TableCapacity[]> {
    const tableCapacities = await TableCapacityModel.findAll();
    return tableCapacities;
  }

  async save(tableCapacity: TableCapacity): Promise<TableCapacity | Error> {
    const newTableCapacity = await TableCapacityModel.create({
      ...tableCapacity,
    });

    if (!newTableCapacity) return { message: "Table capacity not created" };

    return newTableCapacity.dataValues;
  }

  async update(id: string): Promise<TableCapacity | Error> {
    const tableCapacity = await TableCapacityModel.findByPk(id);
    if (!tableCapacity) return { message: "Table capacity not found" };

    await tableCapacity.update({ active: !tableCapacity.active });
    return tableCapacity;
  }
}
