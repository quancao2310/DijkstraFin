import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The name of the goal.",
    example: "Go to the City of Love, Paris",
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The total amount of the goal in VND.",
    example: 10_000_000_000,
  })
  total: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      "The current balance of the goal in VND. If not specified, it will be 0.",
    example: 10_000_000,
    default: 0,
  })
  balance?: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The start date of the goal. Format is YYYY-MM-DD.",
    example: "2023-12-31",
  })
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The end date of the goal. Format is YYYY-MM-DD.",
    example: "2024-12-31",
  })
  endDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the user this goal belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  userId: string;
}
