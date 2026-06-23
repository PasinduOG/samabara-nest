import { IsNotEmpty, IsNumber, IsString, MinLength } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    familyId!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'The password must have atleast 6 characters'})
    password!: string;

    @IsString()
    @IsNotEmpty()
    role!: string;
}