import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Name of the new user",
    example: "Dijkstra"
  })
  userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email of the new user",
    example: "dijkstra@gmail.com"
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Password of the new user",
    example: "!@#$%^&*()"
  })
  password: string;
}