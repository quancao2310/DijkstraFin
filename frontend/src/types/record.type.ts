export enum RecordType {
  INCOME = "income",
  EXPENSE = "expense",
}

export type Record = {
  _id: string; // Will fix to id later
  amount: number;
  type: RecordType;
  category: string;
  description: string;
  date: string;
  goal?: string;
};
