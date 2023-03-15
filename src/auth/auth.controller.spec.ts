import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { usersMockData } from '@/users/users.mocks';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            socialLogin: jest.fn().mockResolvedValue(usersMockData[0]),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('socialAuth', () => {
    it('should be defined', () => {
      expect(controller.socialAuth).toBeDefined();
    });
  });

  describe('providerAuthRedirect', () => {
    it('should be defined', () => {
      expect(controller.providerAuthRedirect).toBeDefined();
    });

    it('should return an object with an access_token property', async () => {
      const result = await controller.providerAuthRedirect({
        user: {
          id: 'id',
          displayName: 'displayName',
          username: 'username',
          emails: [{ value: 'email' }],
          photos: [{ value: 'photo' }],
        },
      });

      expect(jwtService.sign).toBeCalled();
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('token');
    });
  });
});
