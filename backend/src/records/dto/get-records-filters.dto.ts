import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsDateString, IsEnum } from "class-validator";
import { TransactionType } from "../../types";

export class GetRecordsFiltersDto {
  @IsOptional()
  @IsEnum(TransactionType)
  @ApiPropertyOptional({
    description: "The type of record.",
    example: "income",
    enum: TransactionType,
  })
  type?: TransactionType;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: `The start date of the records, in the format of YYYY-MM-DD.
      If not specified, it will contain records from the first.`,
    example: "2021-01-01",
  })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: `The end date of the records, in the format of YYYY-MM-DD.
      If not specified, it will contain records upto the present (include today).`,
    example: "2021-01-31",
  })
  endDate?: string;
}
