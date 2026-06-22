import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FamilyModule } from './family/family.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, FamilyModule, TransactionModule, PrismaModule]
})
export class AppModule {}
