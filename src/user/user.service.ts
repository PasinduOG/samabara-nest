import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import e from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async registerUser(dto: CreateUserDto) {
        const existingUser = await this.prisma.users.findFirst({
            where: {
                OR: [{ email: dto.email }, { username: dto.username }]
            }
        });

        if (existingUser) {
            throw new BadRequestException('This email or username already exists');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

        const newUser = await this.prisma.users.create({
            data: {
                family_id: dto.familyId,
                name: dto.name,
                username: dto.username,
                email: dto.email,
                password: hashedPassword,
                role: 'user'
            }
        });
        const { password, ...userWithoutPassword } = newUser;

        return {
            status: 201,
            message: 'User successfully registered!',
            data: userWithoutPassword,
            timestamp: new Date().toISOString()
        };
    }

    async loginUser(dto: LoginUserDto) {
        const user = await this.prisma.users.findUnique({
            where: {username: dto.username}
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password!');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password!');
        }

        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            familyId: user.family_id
        };

        const token = await this.jwtService.signAsync(payload);

        const {password, ...userWithoutPassword} = user;

        return {
            status: 200,
            message: 'User successfully logged in!',
            data: {
                user: userWithoutPassword,
                token: token
            },
            timestamp: new Date().toISOString()
        }
    }
}
