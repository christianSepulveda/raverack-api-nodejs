export default interface Reservation {
  id: string;
  date: Date;
  time: string;
  capacity: number;
  customerId: string;
  tableId: string;
}
