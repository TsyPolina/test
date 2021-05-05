import { Controller, Post, Body, HttpCode, HttpException,HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from '../interfaces/interface';
import { UserService } from './user.service';
import {
    ApiTags,
    ApiBody,
  } from '@nestjs/swagger';
import { CreateUserDto } from './createUserDto';

@ApiTags('signin')
@Controller('signin')
export class SignInController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    @Post()
    @ApiBody({ type: CreateUserDto })
    @HttpCode(200)
    async signin(@Body() user: CreateUserDto): Promise<any> {
        const currentUser = await this.userService.signin(user);

        if (!currentUser) {
            throw new HttpException('Try again. Can\'t find user with this parametrs', HttpStatus.BAD_REQUEST);
          }

        const payload: ITokenPayload = {
            userId: currentUser._id, 
            email: currentUser.email
        };
        const token = this.jwtService.sign(payload);
        return {
            status: 200,
            payload: {
                jwt: token
            }
        }
    }
}
