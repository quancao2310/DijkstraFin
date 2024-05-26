import { ApiProperty } from "@nestjs/swagger";

export class AuthInfoDto {
  @ApiProperty({
    description: "Access token of the user",
    example: "jtxjtudrutjdrjte4679247",
  })
  accessToken: string;

  @ApiProperty({
    description: "ID of the user",
    example: "664f6a1b0eece94eab97ada0"
  })
  userId: string;
}
