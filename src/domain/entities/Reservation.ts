export interface Reservation {
  id: string;
  date: Date;
  time: string;
  capacity: number;
  customerId: string;
  companyId: string;
  active: boolean;
}
