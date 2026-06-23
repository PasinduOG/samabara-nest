import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}