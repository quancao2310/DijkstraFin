import { ApiProperty } from "@nestjs/swagger";
import { MoneySource } from "../../money-sources/schemas/money-source.schema";

export class SumarizeMoneySourceDto {
  @ApiProperty({
    description: "The money source.",
  })
  moneySource: MoneySource;

  @ApiProperty({
    description: "The sum of all records in VND.",
    example: 10_000_000,
  })
  sum: number;
}
