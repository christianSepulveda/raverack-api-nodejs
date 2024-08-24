import { Table } from "../../../domain/entities/Table";
import { Error } from "../../../domain/entities/Error";
import { TableRepository } from "../../../domain/repositories/TableRepostiroy";

export class UpdateStatus {
  private tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(tableId: string, custiomerId?: string): Promise<Table | Error> {
    if (!tableId) return { message: "Table ID is required." };

    const table = await this.tableRepository.updateStatus(tableId, custiomerId);
    if (!table) return { message: "Table not found." };

    return table;
  }
}
