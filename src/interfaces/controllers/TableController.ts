import { Request, Response } from "express";
import { SequelizeTableRepository } from "../../infraestructure/repositories/sequelize/TableRepository";
import { FindTable } from "../../application/use-cases/Table/FindTable";
import { CreateTable } from "../../application/use-cases/Table/Create";
import { UpdateStatus } from "../../application/use-cases/Table/UpdateStatus";

const tableRepository = new SequelizeTableRepository();
const getAllTables = new FindTable(tableRepository);
const createTable = new CreateTable(tableRepository);
const updateTable = new UpdateStatus(tableRepository);

export class TableController {
  async GetAllTables(req: Request, res: Response): Promise<void> {
    try {
      const tables = await getAllTables.execute();
      if (!tables) res.status(404).send({ message: "Tables not found" });
      if (tables) res.status(200).send(tables);

      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }

  async createTable(req: Request, res: Response): Promise<void> {
    try {
      const table = await createTable.execute(req.body);
      if (!table) res.status(400).send({ message: "Cannot create table" });
      if (table) res.status(200).send(table);

      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }

  async updateTable(req: Request, res: Response): Promise<void> {
    try {
      const table = await updateTable.execute(req.body.id, req.body.customerId);
      if (!table) res.status(400).send({ message: "Cannot update table" });
      if (table) res.status(200).send(table);

      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
