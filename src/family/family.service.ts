import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFamilyDto } from './dto/create-family.dto';

@Injectable()
export class FamilyService {
    constructor(private readonly prisma: PrismaService) {}

    async registerFamily(dto: CreateFamilyDto) {
        const existingFamily = await this.prisma.families.findFirst({
            where: {name: dto.name}
        });

        if (existingFamily) {
            throw new BadRequestException("This family already exists");
        }

        const newFamily = await this.prisma.families.create({
            data: {
                name: dto.name
            }
        });

        return {
            status: 201,
            message: "Family successfully registered!",
            data: newFamily,
            timestamp: new Date().toISOString()
        }
    }

}
