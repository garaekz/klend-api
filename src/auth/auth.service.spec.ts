import { organizationsMockData } from './../organizations/organizations.mocks';
import { HydratedDocument } from 'mongoose';
import { OrganizationsService } from '@/organizations/organizations.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@/users/users.service';
import { AuthService } from './auth.service';
import { usersMockData } from '@/users/users.mocks';
import { User } from '@/users/schemas/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let orgService: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: OrganizationsService,
          useValue: {
            create: jest.fn(),
            findBySlug: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOrCreate: jest.fn(),
            findOneByProviderId: jest.fn(),
            create: jest
              .fn()
              .mockResolvedValue(usersMockData[0] as HydratedDocument<User>),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    orgService = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('socialLogin', () => {
    it('should return null if data is null', async () => {
      const result = await service.socialLogin(null, 'google');

      expect(result).toBeNull();
    });

    it('should return existing user if user exists', async () => {
      jest
        .spyOn(userService, 'findOneByProviderId')
        .mockResolvedValue(usersMockData[0] as HydratedDocument<User>);

      const result = await service.socialLogin({ id: 'provider-id' }, 'google');

      expect(userService.findOneByProviderId).toBeCalledWith(
        'googleId',
        'provider-id',
      );
      expect(result).toEqual(usersMockData[0]);
    });

    it('should create user if user does not exist', async () => {
      jest.spyOn(userService, 'findOneByProviderId').mockResolvedValue(null);
      jest
        .spyOn(userService, 'create')
        .mockResolvedValue(usersMockData[0] as HydratedDocument<User>);

      const result = await service.socialLogin(
        { id: 'provider-id', username: 't1' },
        'google',
      );

      expect(userService.findOneByProviderId).toBeCalledWith(
        'googleId',
        'provider-id',
      );
      expect(userService.create).toBeCalledWith({
        id: 'provider-id',
        googleId: 'provider-id',
        username: 't1',
      });
      expect(result).toEqual(usersMockData[0]);
    });

    it('should create organization if user does not exist', async () => {
      jest.spyOn(userService, 'findOneByProviderId').mockResolvedValue(null);
      jest.spyOn(orgService, 'findBySlug').mockResolvedValue(null);

      const result = await service.socialLogin(
        { id: 'provider-id', username: 't1' },
        'google',
      );

      expect(orgService.create).toBeCalledWith({
        name: `${usersMockData[0].username}'s Organization`,
        mainCompany: true,
        owner: usersMockData[0]._id,
        slug: usersMockData[0].username.toLowerCase(),
      });
      expect(result).toEqual(usersMockData[0]);
    });

    it('should create a unique slug if slug already exists', async () => {
      jest.spyOn(userService, 'findOneByProviderId').mockResolvedValue(null);
      jest
        .spyOn(orgService, 'findBySlug')
        .mockResolvedValueOnce(organizationsMockData[0]);

      const result = await service.socialLogin(
        { id: 'provider-id', username: 't1' },
        'google',
      );

      expect(orgService.create).toBeCalledWith({
        name: `${usersMockData[0].username}'s Organization`,
        mainCompany: true,
        owner: usersMockData[0]._id,
        slug: `${usersMockData[0].username.toLowerCase()}-${
          usersMockData[0]._id
        }`,
      });
      expect(result).toEqual(usersMockData[0]);
    });
  });
});
