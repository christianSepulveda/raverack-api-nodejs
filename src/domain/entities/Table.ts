export interface Table {
  id: string;
  state: string;
  number: number;
  capacityId: string;
  customerId?: string | null;
}

export interface TableInitValues {
  number: number;
  state: string;
}
