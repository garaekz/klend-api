import { GithubOAuthGuard } from '@/github-oauth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '@/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signin/github')
  @UseGuards(GithubOAuthGuard)
  async socialAuth() {
    //
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

  @Post('github')
  async githubToken(@Request() req: any) {
    const allowedProviders = ['github'];
    const { user: socialUser, provider } = req.body;
    console.log('user:', socialUser);
    if (!socialUser || !provider || !allowedProviders.includes(provider)) {
      return null;
    }
    const data = {
      id: socialUser.id,
      name: socialUser.name,
      username: socialUser.username,
      email: socialUser.email,
      avatar: socialUser.image,
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
