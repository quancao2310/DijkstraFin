import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({summary: "Log in with email and password, return Object with access_token"})
  @ApiResponse({
    status: 201,
    description: "User logged in successfully",
    type: Object
  })
  @ApiResponse({
    status: 404,
    description: "There is no user with the given email.",
  })
  @ApiResponse({
    status: 401,
    description: "The given password is not correct."
  })
  @ApiResponse({
    status: 500,
    description: "Something wrong with the system so that it is currently unable to process your password."
  })
  async signIn(@Body() signInDto: Record<string, string>): Promise<{ access_token: string; }> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  @ApiOperation({summary: "Sign Up a new user, return Object with access_token"})
  @ApiResponse({
    status: 201,
    description: "User signed up successfully",
    type: Object
  })
  @ApiResponse({
    status: 400,
    description: "The given email is already registered",
  })
  @ApiResponse({
    status: 500,
    description: "Something wrong with the system so that it is currently unable to process your password."
  })
  async signUp(@Body() signUpDto: CreateAuthDto): Promise<{ access_token: string; }> {
    return this.authService.signUp(signUpDto);
  }
}
