import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilitiesController } from './availabilities.controller';
import {
  availabilitiesMockData,
  mockedCreateAvailabilityDto,
} from './availabilities.mocks';
import { AvailabilitiesService } from './availabilities.service';

const mockId = 'random-id';

describe('AvailabilitiesController', () => {
  let controller: AvailabilitiesController;
  let service: AvailabilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilitiesController],
      providers: [
        {
          provide: AvailabilitiesService,
          useValue: {
            create: jest.fn().mockResolvedValue(availabilitiesMockData[0]),
            findAll: jest.fn().mockResolvedValue(availabilitiesMockData),
            findOne: jest.fn().mockResolvedValue(availabilitiesMockData[0]),
            update: jest.fn().mockResolvedValue(availabilitiesMockData[0]),
            remove: jest.fn().mockResolvedValue(availabilitiesMockData[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<AvailabilitiesController>(AvailabilitiesController);
    service = module.get<AvailabilitiesService>(AvailabilitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create', async () => {
      await controller.create(mockedCreateAvailabilityDto);
      expect(service.create).toHaveBeenCalledWith(mockedCreateAvailabilityDto);
    });

    it('should return the result of service.create', async () => {
      expect(
        await controller.create(mockedCreateAvailabilityDto),
      ).toStrictEqual({
        statusCode: 200,
        data: availabilitiesMockData[0],
      });
    });

    it('should throw an error if service.create throws an error', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Test Error'));
      await expect(
        controller.create(mockedCreateAvailabilityDto),
      ).rejects.toThrowError('Test Error');
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return the result of service.findAll', async () => {
      expect(await controller.findAll()).toStrictEqual({
        statusCode: 200,
        data: availabilitiesMockData,
      });
    });

    it('should throw an error if service.findAll throws an error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Test Error'));
      await expect(() => controller.findAll()).rejects.toThrowError(
        'Test Error',
      );
    });
  });

  describe('findOne', () => {
    it('should call service.findOne', async () => {
      await controller.findOne(mockId);
      expect(service.findOne).toHaveBeenCalledWith(mockId);
    });

    it('should return the result of service.findOne', async () => {
      expect(await controller.findOne(mockId)).toStrictEqual({
        statusCode: 200,
        data: availabilitiesMockData[0],
      });
    });

    it('should throw an error if service.findOne throws an error', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Test Error'));
      await expect(() => controller.findOne(mockId)).rejects.toThrowError(
        'Test Error',
      );
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      controller.update(mockId, mockedCreateAvailabilityDto);
      expect(service.update).toHaveBeenCalledWith(
        mockId,
        mockedCreateAvailabilityDto,
      );
    });

    it('should return the result of service.update', async () => {
      expect(
        await controller.update(mockId, mockedCreateAvailabilityDto),
      ).toStrictEqual({
        statusCode: 200,
        data: availabilitiesMockData[0],
      });
    });

    it('should throw an error if service.update throws an error', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Test Error'));
      await expect(() =>
        controller.update(mockId, mockedCreateAvailabilityDto),
      ).rejects.toThrowError('Test Error');
    });
  });

  describe('remove', () => {
    it('should call service.remove', async () => {
      await controller.remove(mockId);
      expect(service.remove).toHaveBeenCalledWith(mockId);
    });

    it('should return the result of service.remove', async () => {
      expect(await controller.remove(mockId)).toStrictEqual({
        statusCode: 200,
        data: availabilitiesMockData[0],
      });
    });

    it('should throw an error if service.remove throws an error', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new Error('Test Error'));
      await expect(() => controller.remove(mockId)).rejects.toThrowError(
        'Test Error',
      );
    });
  });
});
