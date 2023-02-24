import { Injectable } from '@nestjs/common';
import { AppInfo } from './app.types';

@Injectable()
export class AppService {
  getServerInfo(): AppInfo {
    return {
      name: '📆 Klend API',
      version: '1.0.0-prerelease.1',
      description: 'Schedule your life',
      status: '🚀 Dev Version',
      author: '🐱‍💻 @garaekz',
    };
  }
}
