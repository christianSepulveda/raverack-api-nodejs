import { TableCapacity } from "../../../domain/entities/TableCapacity";
import { Error } from "../../../domain/entities/Error";

export class CreateTableCapacity {
  private tableCapacityRepository: any;

  constructor(tableCapacityRepository: any) {
    this.tableCapacityRepository = tableCapacityRepository;
  }

  async execute(tableCapacity: TableCapacity): Promise<TableCapacity | Error> {
    const newTableCapacity = await this.tableCapacityRepository.save(
      tableCapacity
    );
    return newTableCapacity;
  }
}
