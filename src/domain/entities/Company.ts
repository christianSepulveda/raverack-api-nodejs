export interface Company {
  id?: string;
  name: string;
  rut: string;
  phoneNumber: string;
  email: string;
  expirationDate: string;
  monthlyPayment: number;
  activeReservation: boolean;
  activeCustody: boolean;
  active: boolean;
}
