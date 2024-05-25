import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./schemas/users.schema";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiResponse({
    status: 200,
    description: "User with the given ID. Password will be omitted.",
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: "The provided id is invalid.",
  })
  @ApiResponse({
    status: 404,
    description: "User with the given ID is not found.",
  })
  @ApiParam({
    name: "id",
    description: "ID of a user",
    example: "60f4b7f9c3c3e4b5e4f5b7d9",
  })
  async findOne(@Param("id") id: string): Promise<Omit<User, "password">> {
    return this.usersService.findOne({ _id: id });
  }
}
