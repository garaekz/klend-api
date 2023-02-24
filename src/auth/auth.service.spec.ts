import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOrCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create a user', async () => {
    const data = {
      id: '123',
      name: 'John Doe',
      username: 'johndoe',
      email: 't@t.io',
      avatar: 'https://avatars.githubusercontent.com/u/123?v=4',
    };
    const provider = 'github';
    jest.spyOn(userService, 'findOrCreate').mockResolvedValue(data as any);
    const result = await service.socialLogin(data, provider);

    expect(userService.findOrCreate).toHaveBeenCalledWith(
      data,
      `${provider}Id`,
    );
    expect(result).toEqual(data);
  });
});
