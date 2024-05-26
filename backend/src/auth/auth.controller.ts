import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "./public.decorator";
import { AuthInfoDto } from "./dto/auth-info.dto";

@Controller("auth")
@Public()
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Log in with email and password, return Object with access_token",
  })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully",
    type: AuthInfoDto,
  })
  @ApiResponse({
    status: 404,
    description: "There is no user with the given email.",
  })
  @ApiResponse({
    status: 401,
    description: "The given password is not correct.",
  })
  @ApiResponse({
    status: 500,
    description:
      "Something wrong with the system so that it is currently unable to process your password.",
  })
  async signIn(
    @Body() signInDto: SignInDto
  ): Promise<AuthInfoDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post("signup")
  @ApiOperation({
    summary: "Sign up a new user, return Object with access_token",
  })
  @ApiResponse({
    status: 201,
    description: "User signed up successfully",
    type: AuthInfoDto,
  })
  @ApiResponse({
    status: 400,
    description: "The given email is already registered",
  })
  @ApiResponse({
    status: 500,
    description:
      "Something wrong with the system so that it is currently unable to process your password.",
  })
  async signUp(
    @Body() signUpDto: CreateUserDto
  ): Promise<AuthInfoDto> {
    return this.authService.signUp(signUpDto);
  }
}
