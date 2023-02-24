import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { AuthController } from './auth.controller';
import { UserSchema } from '@/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, GithubStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
