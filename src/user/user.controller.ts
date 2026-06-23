import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.service.registerUser(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.service.loginUser(loginUserDto);
    }
}
