import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBudgetDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The amount of money in VND.",
    example: 1_000_000,
  })
  amount: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: `The amount of money spent in VND,
      will be reset to 0 at the beginning of each month.`,
    example: 500_000,
    default: 0,
  })
  currentSpent?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the category for this budget.",
    example: "664da67d075cdd1e0f0a9851",
  })
  categoryId: string;
}
