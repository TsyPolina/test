import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './createUserDto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { };


    async getUser(id: string): Promise<IUser> {
        return this.userModel.findById(id)
    };

    async signin(user: CreateUserDto): Promise<IUser> {
        return await this.userModel.findOne(user);
    }

    async createUser(user: CreateUserDto): Promise<{ email: string }> {
        const createdUser = new this.userModel(user);
        const savedUser = await createdUser.save();
        return {
            email: savedUser.email
        }
    };

}
