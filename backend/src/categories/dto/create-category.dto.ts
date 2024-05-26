import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TransactionType } from "../../types";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The name of the category.",
    example: "Salary",
  })
  name: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  @ApiProperty({
    description: "The type of the category.",
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  type: TransactionType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the user this category belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  userId: string;
}
