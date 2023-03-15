import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return system info', () => {
      expect(appController.getInfo()).toStrictEqual({
        name: '📆 Klend API',
        version: '1.0.0-prerelease.1',
        description: 'Schedule your life',
        status: '🚀 Dev Version',
        author: '🐱‍💻 @garaekz',
      });
    });
  });
});
