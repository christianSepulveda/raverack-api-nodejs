import { Table, TableInitValues } from "../../../domain/entities/Table";
import { Error } from "../../../domain/entities/Error";
import { TableRepository } from "../../../domain/repositories/TableRepostiroy";

export class CreateTable {
  private tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(table: TableInitValues): Promise<Table | Error> {
    if (table.number < 1)
      return { message: "Table number must be greater than 0" };
    if (table.state === "") return { message: "Table state must not be empty" };

    const newTable = await this.tableRepository.save(table);
    return newTable;
  }
}
