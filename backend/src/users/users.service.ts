import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOne(query: any): Promise<User> {
        return await this.userModel.findOne(query).select('+password').exec();
    }

    async create(user: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }
}
