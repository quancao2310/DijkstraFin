export type Goal = {
  _id: string;
  name: string;
  total: number;
  balance: number;
  isCompleted: boolean;
  startDate: string;
  endDate: string;
  icon: string;
  userId: string;
  moneySourceId: string;
};
