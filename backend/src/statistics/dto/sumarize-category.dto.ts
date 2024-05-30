import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../categories/schemas/category.schema";

export class SumarizeCategoryDto {
  @ApiProperty({
    description: "The category.",
  })
  category: Category;

  @ApiProperty({
    description: "The sum of all records in VND.",
    example: 10_000_000,
  })
  sum: number;
}
