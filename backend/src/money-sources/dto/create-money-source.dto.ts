import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMoneySourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The name of the money source.",
    example: "ABC Bank",
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The balance of the money source in VND.",
    example: 1_000_000,
  })
  balance: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the user this money source belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  userId: string;
}
