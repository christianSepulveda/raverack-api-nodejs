import { Request, Response } from "express";
import { BoxNumber } from "../../domain/entities/BoxNumber";

import { CreateBoxNumber } from "../../application/use-cases/BoxNumber/Create";
import { FindBoxNumber } from "../../application/use-cases/BoxNumber/FindBoxNumber";
import { UpdateBoxNumberStatus } from "../../application/use-cases/BoxNumber/UpdateStatus";

import { CreateCustomer } from "../../application/use-cases/Customer/Create";
import { FindCustomer } from "../../application/use-cases/Customer/FindCustomer";

import { SequelizeBoxNumberRepository } from "../../infraestructure/repositories/sequelize/BoxNumberRepository";
import { SequelizeCustomerRepository } from "../../infraestructure/repositories/sequelize/CustomerRepository";
import { FindCustomerByRut } from "../../application/use-cases/Customer/FindCustomerByRut";
import { Customer } from "../../domain/entities/Customer";
import { v4 as uuidv4 } from "uuid";
import { Error } from "../../domain/entities/Error";

const boxNumberRepository = new SequelizeBoxNumberRepository();
const customerRepository = new SequelizeCustomerRepository();

const createBoxNumber = new CreateBoxNumber(boxNumberRepository);
const updateBoxNumberStatus = new UpdateBoxNumberStatus(boxNumberRepository);
const findBoxNumber = new FindBoxNumber(boxNumberRepository);

const createCustomer = new CreateCustomer(customerRepository);
const findCustomer = new FindCustomer(customerRepository);
const findCustomerByRut = new FindCustomerByRut(customerRepository);

export class BoxNumberController {
  async CreateBoxesNumbers(req: Request, res: Response): Promise<void> {
    try {
      const numberOfBoxes = req.body.numberOfBoxes;
      const companyId = req.body.companyid;

      if (!numberOfBoxes || numberOfBoxes < 1) {
        res.status(400).json([{ error: "Invalid number of boxes" }]);
        return;
      }

      const currentBoxes = (await findBoxNumber.execute(
        undefined,
        companyId
      )) as BoxNumber[];
      const numberOfCurrentBoxes = currentBoxes.length;

      for (let i = 0; i < numberOfBoxes; i++) {
        const newBoxNumber = numberOfCurrentBoxes + i + 1;
        const boxNumber: BoxNumber = {
          id: uuidv4(),
          boxnumber: newBoxNumber,
          available: true,
          customerid: null,
          customer: null,
          companyid: req.body.companyid,
        };

        await createBoxNumber.execute(boxNumber, req.body.companyid);
      }

      res.status(200).json([{ created: true, added: numberOfBoxes }]);
    } catch (error: any) {
      console.log(error);
      res.status(500);
    }
  }

  async GetBoxNumber(req: Request, res: Response): Promise<void> {
    try {
      const boxNumberId = req.body.boxnumberid;
      const companyId = req.body.companyid;

      if (!boxNumberId) {
        const boxNumbers = await findBoxNumber.execute(undefined, companyId);
        res.status(200).json(boxNumbers);
        return;
      }

      if (boxNumberId) {
        const boxNumber = (await findBoxNumber.execute(
          boxNumberId,
          undefined
        )) as BoxNumber & Error;

        if (boxNumber.message) {
          res.status(404).json([{ error: boxNumber.message }]);
          return;
        }

        if (boxNumber.id) {
          const customer = (await findCustomer.execute(
            boxNumber.customerid as string, companyId
          )) as Customer & Error;

          res.status(200).json([
            {
              ...boxNumber,
              customer: customer.message ? null : customer,
            },
          ]);
          return;
        }
      }
    } catch (error: any) {
      console.log(error);
      res.status(500);
    }
  }

  async UpdateBoxNumberStatus(req: Request, res: Response): Promise<void> {
    try {
      const { fullname, rut, boxnumberid, companyid } = req.body;
      let newCustomer = {} as Customer;

      if (!boxnumberid) res.status(400).json([{ error: "Invalid data" }]);

      const customer = await findCustomerByRut.execute(rut, companyid);

      if (!customer) {
        newCustomer = (await createCustomer.execute({
          id: uuidv4(),
          fullname,
          rut,
          phoneNumber: "",
          companyid,
        })) as Customer;
      }

      const currentBoxNumber = (await findBoxNumber.execute(
        boxnumberid,
        undefined
      )) as BoxNumber & Error;

      if (currentBoxNumber.message) {
        res.status(404).json([{ error: currentBoxNumber.message }]);
        return;
      }

      const customerId = customer ? customer.id : newCustomer.id;

      await updateBoxNumberStatus.execute(
        boxnumberid,
        !currentBoxNumber.available ? undefined : customerId
      );

      res.status(200).json([
        {
          updatedBoxNumber: currentBoxNumber.boxnumber,
          released: !currentBoxNumber.available,
        },
      ]);
    } catch (error: any) {
      console.log(error);
      res.status(500);
    }
  }
}
