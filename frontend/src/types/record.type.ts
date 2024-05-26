import { Category, MoneySource, Goal } from "./";

export enum RecordType {
  INCOME = "income",
  EXPENSE = "expense",
  SAVING = "saving",
}

export type Record = {
  _id: string;
  amount: number;
  type: RecordType;
  description: string;
  date: string;
  categoryId: string | Category;
  moneySourceId: string | MoneySource;
  goalId: string | Goal | null;
};
