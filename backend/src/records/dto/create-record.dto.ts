import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RecordType } from "../types/records.type";

export class CreateRecordDto {
  @ApiProperty({
    description: "The amount of the record in VND",
    example: 10000000,
  })
  amount: number;

  @ApiProperty({
    description:
      'The type of the record, which is either "income" or "expense"',
    enum: RecordType,
    example: RecordType.INCOME,
  })
  type: RecordType;

  @ApiProperty({
    description: "The category of the record",
    example: "salary",
  })
  category: string;

  @ApiProperty({
    description: "The description of the record",
    example: "Salary of January 2021",
  })
  description: string;

  @ApiPropertyOptional({
    description:
      "The date of the record, in the format of YYYY-MM-DD. If not specified, it will be the current date.",
    example: "2021-01-01",
    default: new Date().toISOString().split("T")[0],
  })
  date?: string;

  @ApiPropertyOptional({
    description:
      "The ID of the goal that this record is related to. If not specified, it will be null.",
    example: "1234567890",
    default: null,
  })
  goal?: string;
}
