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

      if (!numberOfBoxes || numberOfBoxes < 1) {
        res.status(400).json([{ error: "Invalid number of boxes" }]);
        return;
      }

      const currentBoxes = (await findBoxNumber.execute(
        undefined
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
        };

        await createBoxNumber.execute(boxNumber);
      }

      res.status(200).json([{ created: true, added: numberOfBoxes }]);
    } catch (error: any) {
      console.log(error);
      res.status(500);
    }
  }

  async GetBoxNumber(req: Request, res: Response): Promise<void> {
    try {
      const boxNumber = req.body.boxNumber;

      if (!boxNumber) {
        const boxNumbers = await findBoxNumber.execute(undefined);
        res.status(200).json(boxNumbers);
        return;
      }

      if (boxNumber) {
        const boxNumbers = (await findBoxNumber.execute(
          Number(boxNumber)
        )) as BoxNumber & Error;

        if (boxNumbers.message) {
          res.status(404).json([{ error: boxNumber.message }]);
          return;
        }

        if (boxNumbers.id) {
          const customer = (await findCustomer.execute(
            boxNumbers.customerid as string
          )) as Customer & Error;

          res.status(200).json([
            {
              ...boxNumbers,
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
      const { fullname, rut, boxNumber } = req.body;
      let newCustomer = {} as Customer;

      console.log(fullname, rut, boxNumber);

      if (!boxNumber) res.status(400).json([{ error: "Invalid data" }]);

      const customer = await findCustomerByRut.execute(rut);
      if (!customer) {
        newCustomer = (await createCustomer.execute({
          id: uuidv4(),
          fullname,
          rut,
          phoneNumber: "",
        })) as Customer;
      }

      const currentBoxNumber = (await findBoxNumber.execute(
        Number(boxNumber)
      )) as BoxNumber & Error;

      if (currentBoxNumber.message) {
        res.status(404).json([{ error: currentBoxNumber.message }]);
        return;
      }

      const customerId = customer ? customer.id : newCustomer.id;

      await updateBoxNumberStatus.execute(
        boxNumber,
        !currentBoxNumber.available ? undefined : customerId
      );

      res
        .status(200)
        .json([
          {
            updatedBoxNumber: boxNumber,
            released: !currentBoxNumber.available,
          },
        ]);
    } catch (error: any) {
      console.log(error);
      res.status(500);
    }
  }
}
