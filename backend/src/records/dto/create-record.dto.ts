import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { TransactionType } from "../../types";

export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The amount of the record in VND.",
    example: 10_000_000,
  })
  amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  @ApiProperty({
    description:
      'The type of the record, which is "income", "expense", or "saving".',
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  type: TransactionType;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: "The description of the record.",
    example: "Salary of January 2021",
    default: "",
  })
  description?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    description: `The date of the record, in the format of YYYY-MM-DD.
      If not specified, it will be the current date.`,
    example: "2021-01-01",
    default: new Date().toISOString().split("T")[0],
  })
  date?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the category for this record.",
    example: "664f6a1b0eece94eab97ada0",
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the money source this record belongs to.",
    example: "664ebbacbb15d5d4a664d3a9",
  })
  moneySourceId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: `The ID of the goal that this record is related to.
      If not specified, it will be null. Only records of type "saving" can have a goal.`,
    example: "66201ff2b7049857abc2b2eb",
    default: null,
  })
  goalId?: string;
}
