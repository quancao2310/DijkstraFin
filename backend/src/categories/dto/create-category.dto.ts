import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CategoryType } from "../../types";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The name of the category.",
    example: "Salary",
  })
  name: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  @ApiProperty({
    description:
      'The type of the category, which is either "income" or "expense".',
    enum: CategoryType,
    example: CategoryType.INCOME,
  })
  type: CategoryType;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: `The budget of the category in VND. This only applies to expense categories, 
      although it is not compulsory. For an income category, this field should always be null.
      The validation for this has not been setup yet. Please make sure to follow this.`,
    example: 1_000_000,
  })
  budget?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the user this category belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  userId: string;
}
