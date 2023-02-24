import { AppInfo } from './app.types';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): AppInfo {
    return this.appService.getServerInfo();
  }
}
