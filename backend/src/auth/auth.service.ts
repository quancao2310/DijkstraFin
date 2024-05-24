import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('Email Does not exist');
    }
    const isMatched = await this.comparePasswords(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid Password')
    };
    const payload = { sub: user.userId, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async signUp(user: CreateAuthDto): Promise<{ access_token: string }> {
    const lookup = await this.usersService.findOne({ email: user.email });
    if (lookup) {
      throw new BadRequestException('Email is already registered');
    }
    const newUser = { ...user }
    const hashedPassword = await this.getHashedPassword(
      newUser.password
    );
    newUser.password = hashedPassword;
    const userCreated = await this.usersService.create(newUser)
    const payload = { sub: userCreated.userId, username: userCreated.userName };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt
      .compare(password, hashedPassword)
      .then((isMatch: any) => {
        if (isMatch) return true;
        return false;
      })
      .catch((err: any) => { throw new InternalServerErrorException(err) });
  }

  async getHashedPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, process.env.BYCRPT_KEY, (err: Error, hash: string) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }
}
