import { OrganizationsService } from '@/organizations/organizations.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly orgService: OrganizationsService,
    private readonly userService: UsersService,
  ) {}

  async socialLogin(data: any, provider: string) {
    if (!data) {
      return null;
    }
    const providerId = `${provider}Id`;
    const existingUser = await this.userService.findOneByProviderId(
      providerId,
      data.id,
    );

    if (existingUser) {
      return existingUser;
    }

    const user = await this.userService.create({
      ...data,
      [providerId]: data.id,
    });

    let slug = data.username.toLowerCase();
    const org = await this.orgService.findBySlug(slug);

    if (org) {
      slug = `${slug}-${user._id}`;
    }

    await this.orgService.create({
      name: `${data.username}'s Organization`,
      mainCompany: true,
      owner: user._id,
      slug,
    });

    return user;
  }
}
