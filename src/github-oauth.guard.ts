import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

interface MyUser {
  id: string;
  username: string;
  email: string;
}

@Injectable()
export class GithubOAuthGuard extends AuthGuard('github') {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }

  handleRequest(err, user, info) {
    console.log('GithubOAuthGuard');
    console.log(err);
    console.log(user);
    console.log(info);
    if (err || !user) {
      throw err || info;
    }
    return user;
  }
  async canActivate(context: any) {
    console.log('GithubOAuthGuard');
    console.log(context);
    return true;
  }
}
