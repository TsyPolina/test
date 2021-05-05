import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './createUserDto';
import { UserService } from './user.service';
import {
    ApiTags,
    ApiBody,
    ApiBearerAuth
} from '@nestjs/swagger';

@ApiTags('signup')

@Controller('signup')
export class SignUpController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiBody({ type: CreateUserDto })
    @HttpCode(201)
    async createUser(@Body() user: CreateUserDto): Promise<any> {
        const createdUser = await this.userService.createUser(user);
        return {
            status: 201,
            payload: {
                createdUser
            }
        }
    }
}
