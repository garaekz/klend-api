import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  availabilitiesMockData,
  mockedCreateAvailabilityDto,
  updatedAvailabilityMock,
} from './availabilities.mocks';
import { AvailabilitiesService } from './availabilities.service';
import {
  Availability,
  AvailabilityDocument,
} from './schemas/availability.schema';

describe('AvailabilitiesService', () => {
  let service: AvailabilitiesService;
  let mockModel: Model<AvailabilityDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilitiesService,
        {
          provide: getModelToken(Availability.name),
          useValue: {
            create: jest.fn().mockResolvedValue(availabilitiesMockData[0]),
            find: jest.fn().mockResolvedValue(availabilitiesMockData),
            findById: jest.fn().mockResolvedValue(availabilitiesMockData[0]),
            findByIdAndUpdate: jest
              .fn()
              .mockResolvedValue(updatedAvailabilityMock),
            findByIdAndDelete: jest
              .fn()
              .mockResolvedValue(availabilitiesMockData[0]),
          },
        },
      ],
    }).compile();

    service = module.get<AvailabilitiesService>(AvailabilitiesService);
    mockModel = module.get<Model<AvailabilityDocument>>(
      getModelToken(Availability.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new availability', async () => {
      const created = await service.create(mockedCreateAvailabilityDto);
      expect(mockModel.create).toBeCalledTimes(1);
      expect(created).toEqual(availabilitiesMockData[0]);
      expect(created.title).toBe('Test Availability 1');
    });

    it('should throw an error', async () => {
      const spy: jest.RejectedValue<any> = jest.spyOn(mockModel, 'create');
      spy.mockRejectedValue(new Error('Test Error'));
      await expect(service.create(mockedCreateAvailabilityDto)).rejects.toThrow(
        'Test Error',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of availabilities', async () => {
      const all = await service.findAll();

      expect(all).toEqual(availabilitiesMockData);
      expect(all.length).toBe(3);
      expect(all[0].title).toBe('Test Availability 1');
      expect(mockModel.find).toBeCalledTimes(1);
    });

    it('should return an empty array', async () => {
      jest.spyOn(mockModel, 'find').mockResolvedValue([]);
      const all = await service.findAll();

      expect(all).toEqual([]);
      expect(all.length).toBe(0);
      expect(mockModel.find).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest.spyOn(mockModel, 'find').mockRejectedValue(new Error('Test Error'));
      await expect(service.findAll()).rejects.toThrowError('Test Error');
      expect(mockModel.find).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single availability', async () => {
      const found = await service.findOne('1');

      expect(found).toEqual(availabilitiesMockData[0]);
      expect(found.title).toBe('Test Availability 1');
      expect(mockModel.findById).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      jest.spyOn(mockModel, 'findById').mockResolvedValue(null);
      const found = await service.findOne('1');

      expect(found).toBeNull();
      expect(mockModel.findById).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(mockModel, 'findById')
        .mockRejectedValue(new Error('Test Error'));
      await expect(service.findOne('1')).rejects.toThrowError('Test Error');
      expect(mockModel.findById).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update and return a single availability', async () => {
      const updated = await service.update('1', {
        title: updatedAvailabilityMock.title,
      });

      expect(updated).toEqual(updatedAvailabilityMock);
      expect(updated.title).toBe(updatedAvailabilityMock.title);
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(mockModel, 'findByIdAndUpdate')
        .mockRejectedValue(new Error('Test Error'));
      await expect(
        service.update('1', { title: updatedAvailabilityMock.title }),
      ).rejects.toThrowError('Test Error');
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete and return a single availability', async () => {
      const deleted = await service.remove('1');

      expect(deleted).toEqual(availabilitiesMockData[0]);
      expect(deleted.title).toBe('Test Availability 1');
      expect(mockModel.findByIdAndDelete).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(mockModel, 'findByIdAndDelete')
        .mockRejectedValue(new Error('Test Error'));
      await expect(service.remove('1')).rejects.toThrowError('Test Error');
      expect(mockModel.findByIdAndDelete).toBeCalledTimes(1);
    });
  });
});
