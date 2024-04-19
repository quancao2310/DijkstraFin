import { ApiProperty } from "@nestjs/swagger";

export class CreateCatDto {
  @ApiProperty({
    description: "The name of a cat",
    example: "Kitty",
  })
  name: string;

  @ApiProperty({
    description: "The age of a cat",
    example: 4,
  })
  age: number;

  @ApiProperty({
    description: "The breed of a cat",
    example: "Persian",
  })
  breed: string;
}
