import { PartialType, ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The budget of the category.",
    example: "664da67d075cdd1e0f0a9851",
    required: false,
  })
  budgetId?: string;
}
