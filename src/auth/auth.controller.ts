import { GithubOAuthGuard } from '@/github-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '@/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('github')
  @UseGuards(GithubOAuthGuard)
  async socialAuth() {
    return;
  }

  @Get('github/callback')
  @UseGuards(GithubOAuthGuard)
  async providerAuthRedirect(@Request() req: any) {
    const data = {
      id: req.user.id,
      name: req.user.displayName,
      username: req.user.username,
      email: req.user.emails[0].value,
      avatar: req.user.photos[0].value,
    };

    const user = await this.service.socialLogin(data, 'github');

    const payload = {
      sub: user._id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: '1d',
      }),
    };
  }
}
