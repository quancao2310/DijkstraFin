import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Name of the new user to be inserted",
        example: "Dijkstra"
    })
    userName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Email of the new user to be inserted",
        example: "dijkstra@gmail.com"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Password of the new user to be inserted",
        example: "!@#$%^&*()"
    })
    password: string;
}
