import { Controller, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from '../interfaces/interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import {
    ApiTags,
    ApiBearerAuth,
    ApiHeader,
    ApiHeaderOptions,
    ApiParam
} from '@nestjs/swagger';

@ApiTags('Get Me')
@Controller('me')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtServ: JwtService
    ) { }

    @Get()
    @ApiBearerAuth()
    async getUser(@Headers() headers): Promise<any> {
        const token = headers['authorization'];
        if (!token) throw new HttpException('Unauthorization', HttpStatus.UNAUTHORIZED);
        const cleanToken = token.replace('Bearer', '').trim();
        const decode: any = this.jwtServ.decode(cleanToken);

        if (!decode) throw new HttpException('Unauthorization', HttpStatus.UNAUTHORIZED);
        const user: IUser = await this.userService.getUser(decode.userId);
        if (!user) throw new HttpException('Unauthorization', HttpStatus.UNAUTHORIZED);
        return user;
    }
}
