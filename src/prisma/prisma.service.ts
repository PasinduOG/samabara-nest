import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            adapter: new PrismaMariaDb({
                host: "localhost",
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'samabara_db',
                connectionLimit: 5,
            }),
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

}
