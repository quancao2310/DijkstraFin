export enum GoalType {
  SAVING = "saving",
  BUDGET = "budget",
}

export type Goal = {
  _id: string; // Will fix to id later
  name: string;
  type: GoalType;
  total: number;
  initialBalance: number;
  balance: number;
  createdAt?: string;
  updatedAt?: string;
};
