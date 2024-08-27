import { TableCapacity } from "../../../domain/entities/TableCapacity";
import { Error } from "../../../domain/entities/Error";

export class UpdateTableCapacity {
  private tableCapacityRepository: any;

  constructor(tableCapacityRepository: any) {
    this.tableCapacityRepository = tableCapacityRepository;
  }

  async execute(id: string): Promise<TableCapacity | Error> {
    const tableCapacity = await this.tableCapacityRepository.update(id);
    return tableCapacity;
  }
}
