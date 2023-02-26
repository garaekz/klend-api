import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        {
          provide: OrganizationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create', () => {
      const createOrganizationDto = {
        name: 'test',
        users: [],
        owner: {},
        mainCompany: true,
      };
      controller.create(createOrganizationDto);
      expect(service.create).toHaveBeenCalledWith(createOrganizationDto);
    });

    it('should return the result of service.create', () => {
      const createOrganizationDto = {
        name: 'test',
        users: [],
        owner: {},
        mainCompany: true,
      };
      const result = { id: '1', ...createOrganizationDto };
      jest.spyOn(service, 'create').mockImplementation(() => result);
      expect(controller.create(createOrganizationDto)).toBe(result);
    });
  });
});
