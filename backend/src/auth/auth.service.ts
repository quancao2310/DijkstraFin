import * as bcrypt from "bcrypt";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthInfoDto } from "./dto/auth-info.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<AuthInfoDto> {
    const user = await this.usersService.findOne({ email: email });
    const isMatched = await this.comparePasswords(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException("Invalid Password");
    }
    const payload = { sub: user.id, username: user.name };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      userId: user.id,
    };
  }

  async signUp(user: CreateUserDto): Promise<AuthInfoDto> {
    try {
      const lookup = await this.usersService.findOne({ email: user.email });
      if (lookup) {
        throw new BadRequestException("Email is already registered");
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) throw error;
    }
    const hashedPassword = await this.getHashedPassword(user.password);
    const newUser = { ...user, password: hashedPassword };
    const userCreated = await this.usersService.create(newUser);
    const payload = { sub: userCreated.id, username: userCreated.name };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      userId: userCreated.id,
    };
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getHashedPassword(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, 10, (err: Error, hash: string) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }
}
