import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email of the user",
    example: "dijkstra@gmail.com",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Password of the user",
    example: "!@#$%^&*()",
  })
  password: string;
}
