import { OrganizationsService } from '@/organizations/organizations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@/users/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { AuthController } from './auth.controller';
import { UserSchema } from '@/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtModule } from '@nestjs/jwt';
import { jwtExpiration, jwtSecret } from '@/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OrganizationSchema } from '@/organizations/schemas/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Organization', schema: OrganizationSchema },
    ]),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiration },
    }),
  ],
  providers: [
    AuthService,
    GithubStrategy,
    JwtService,
    JwtStrategy,
    OrganizationsService,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
