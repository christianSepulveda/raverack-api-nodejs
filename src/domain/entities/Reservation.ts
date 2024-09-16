import { Customer } from "./Customer";

export interface Reservation {
  id: string;
  date: Date;
  time: string;
  capacity: number;
  customerId: string;
  customer?: Customer;
  companyId: string;
  active: boolean;
}
