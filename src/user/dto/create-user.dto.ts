import { IsNotEmpty, IsNumber, IsString, MinLength } from "@nestjs/class-validator";
import { CreateFamilyDto } from "../../family/dto/create-family.dto";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    familyId!: number;

    family!: CreateFamilyDto;

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