import { Table } from "../../../domain/entities/Table";
import { Error } from "../../../domain/entities/Error";
import { TableRepository } from "../../../domain/repositories/TableRepostiroy";

export class FindTable {
  private tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(): Promise<Table | Table[] | Error> {
    const tables = await this.tableRepository.findAll();
    return tables;
  }
}
