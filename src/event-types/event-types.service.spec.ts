import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  eventTypesMockData,
  mockedCreateEventTypeDto,
} from './event-types.mocks';
import { EventTypesService } from './event-types.service';
import { EventType, EventTypeDocument } from './schemas/event-type.schema';

describe('EventTypesService', () => {
  let service: EventTypesService;
  let mockModel: Model<EventTypeDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventTypesService,
        {
          provide: getModelToken(EventType.name),
          useValue: {
            find: jest.fn().mockResolvedValue(eventTypesMockData),
            findById: jest.fn().mockResolvedValue(eventTypesMockData[0]),
            findOne: jest.fn().mockResolvedValue(eventTypesMockData[0]),
            findByIdAndDelete: jest
              .fn()
              .mockResolvedValue(eventTypesMockData[0]),
            findByIdAndUpdate: jest
              .fn()
              .mockResolvedValue(eventTypesMockData[0]),
            create: jest.fn().mockResolvedValue(eventTypesMockData[0]),
          },
        },
      ],
    }).compile();

    service = module.get<EventTypesService>(EventTypesService);
    mockModel = module.get<Model<EventTypeDocument>>(
      getModelToken(EventType.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of event types', async () => {
      const all = await service.findAll();

      expect(all).toEqual(eventTypesMockData);
      expect(all.length).toBe(3);
      expect(all[0].title).toBe('Test Event Type 1');
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
      jest.spyOn(mockModel, 'find').mockRejectedValue(new Error('Error'));
      await expect(service.findAll()).rejects.toThrowError('Error');
    });
  });

  describe('findOne', () => {
    it('should return an event type', async () => {
      const one = await service.findOne('5f9f1b9b9b9b9b9b9b9b9b9b');

      expect(one).toEqual(eventTypesMockData[0]);
      expect(one.title).toBe('Test Event Type 1');
      expect(mockModel.findById).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest.spyOn(mockModel, 'findById').mockRejectedValue(new Error('Error'));
      await expect(
        service.findOne('5f9f1b9b9b9b9b9b9b9b9b9b'),
      ).rejects.toThrowError('Error');
    });
  });

  describe('create', () => {
    it('should create an event type', async () => {
      const created = await service.create(mockedCreateEventTypeDto);

      expect(created).toEqual(eventTypesMockData[0]);
      expect(created.title).toBe('Test Event Type 1');
      expect(mockModel.create).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(mockModel, 'create')
        .mockRejectedValue(new Error('Unexpected Error') as never);
      await expect(
        service.create(mockedCreateEventTypeDto),
      ).rejects.toThrowError('Unexpected Error');
      expect(mockModel.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an event type', async () => {
      jest.spyOn(mockModel, 'findByIdAndUpdate').mockResolvedValue({
        ...eventTypesMockData[0],
        title: 'Updated Title',
      });
      const updated = await service.update(
        '5f9f1b9b9b9b9b9b9b9b9b9b',
        eventTypesMockData[0],
      );

      expect(updated).toEqual({
        ...eventTypesMockData[0],
        title: 'Updated Title',
      });
      expect(updated.title).toBe('Updated Title');
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(mockModel, 'findByIdAndUpdate')
        .mockRejectedValue(new Error('Error'));
      await expect(
        service.update('5f9f1b9b9b9b9b9b9b9b9b9b', eventTypesMockData[0]),
      ).rejects.toThrowError('Error');
    });
  });

  describe('remove', () => {
    it('should remove an event type', async () => {
      jest.spyOn(mockModel, 'findByIdAndDelete').mockResolvedValue({
        ...eventTypesMockData[0],
        title: 'Updated Title',
      });
      const removed = await service.remove('5f9f1b9b9b9b9b9b9b9b9b9b');

      expect(removed).toEqual({
        ...eventTypesMockData[0],
        title: 'Updated Title',
      });
      expect(removed.title).toBe('Updated Title');
      expect(mockModel.findByIdAndDelete).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(mockModel, 'findByIdAndDelete')
        .mockRejectedValue(new Error('Error'));
      await expect(
        service.remove('5f9f1b9b9b9b9b9b9b9b9b9b'),
      ).rejects.toThrowError('Error');
    });
  });
});
