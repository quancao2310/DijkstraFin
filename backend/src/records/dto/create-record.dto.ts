export class CreateRecordDto {
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  date?: string;
  goal?: string;
}
