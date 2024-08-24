import { Table } from "../../../domain/entities/Table";
import { Error } from "../../../domain/entities/Error";
import { TableRepository } from "../../../domain/repositories/TableRepostiroy";

export class CreateTable {
  private tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(table: Table): Promise<Table | Error> {
    if (table.number <= 0)
      return { message: "Table number should be greater than 0" };
    if (table.capacity <= 0)
      return { message: "Table capacity should be greater than 0" };

    const newTable = await this.tableRepository.save(table);
    return newTable;
  }
}
