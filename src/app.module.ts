import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FamilyModule } from './family/family.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [UserModule, FamilyModule, TransactionModule]
})
export class AppModule {}
