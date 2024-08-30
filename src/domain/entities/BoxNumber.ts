import { Customer } from "./Customer";

export interface BoxNumber {
  id?: string;
  boxnumber: number;
  customerid: string | null;
  customer: Customer | null;
  available: boolean;
  companyid: string;
}
