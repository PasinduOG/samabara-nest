import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '6H'}
    }),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
