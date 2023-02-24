import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  socialLogin(data, provider: string) {
    if (!data) {
      return null;
    }
    const providerId = `${provider}Id`;
    return this.userService.findOrCreate(data, providerId);
  }
}
