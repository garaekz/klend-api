import { GithubOAuthGuard } from '@/github-oauth.guard';
import { Controller, Get, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  getHello(): string {
    return 'Nothing here!';
  }

  @Get('github')
  @UseGuards(GithubOAuthGuard)
  async socialAuth(@Request() _req) {
    return;
  }

  @Get('github/callback')
  @UseGuards(GithubOAuthGuard)
  providerAuthRedirect(@Request() req, @Param('provider') provider: string) {
    const data = {
      id: req.user.id,
      name: req.user.displayName,
      username: req.user.username,
      email: req.user.emails[0].value,
      avatar: req.user.photos[0].value,
    };

    return this.service.socialLogin(data, provider);
  }
}
