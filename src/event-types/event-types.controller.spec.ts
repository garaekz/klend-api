import { Test, TestingModule } from '@nestjs/testing';
import { EventTypesController } from './event-types.controller';
import { eventTypesMockData } from './event-types.mocks';
import { EventTypesService } from './event-types.service';

const responseData = {
  status: 200,
  data: eventTypesMockData[0],
};

describe('EventTypesController', () => {
  let controller: EventTypesController;
  let service: EventTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTypesController],
      providers: [
        {
          provide: EventTypesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(eventTypesMockData),
            findOne: jest.fn().mockResolvedValue(eventTypesMockData[0]),
            create: jest.fn().mockResolvedValue(eventTypesMockData[0]),
            update: jest.fn().mockResolvedValue(eventTypesMockData[0]),
            remove: jest.fn().mockResolvedValue(eventTypesMockData[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<EventTypesController>(EventTypesController);
    service = module.get<EventTypesService>(EventTypesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of event types', async () => {
      const all = await controller.findAll();

      expect(all).toEqual({
        status: 200,
        data: eventTypesMockData,
      });

      expect(all.data.length).toBe(3);
      expect(all.data[0].title).toBe('Test Event Type 1');
      expect(service.findAll).toBeCalledTimes(1);
    });

    it('should return an empty array', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const all = await controller.findAll();

      expect(all).toEqual({
        status: 200,
        data: [],
      });
      expect(all.data.length).toBe(0);
      expect(service.findAll).toBeCalledTimes(1);
    });

    it('should return an error message', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new Error('Unexpected Error Ocurred'));
      await expect(controller.findAll()).rejects.toThrow(
        'Unexpected Error Ocurred',
      );
      expect(service.findAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return an event type', async () => {
      const one = await controller.findOne('1');

      expect(one).toEqual(responseData);
    });

    it('should return a 404 error', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(controller.findOne('1')).rejects.toThrow(
        'Event Type Not Found',
      );
      expect(service.findOne).toBeCalledTimes(1);
    });

    it('should return an error message', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new Error('Unexpected Error Ocurred'));
      await expect(controller.findOne('1')).rejects.toThrow(
        'Unexpected Error Ocurred',
      );
      expect(service.findOne).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a new event type', async () => {
      const one = await controller.create(eventTypesMockData[0]);

      expect(one).toEqual({
        status: 201,
        data: eventTypesMockData[0],
      });
      expect(service.create).toBeCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error('Unexpected Error Ocurred'));
      await expect(controller.create(eventTypesMockData[0])).rejects.toThrow(
        'Unexpected Error Ocurred',
      );
      expect(service.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return an event type', async () => {
      const one = await controller.update('1', eventTypesMockData[0]);

      expect(one).toEqual(responseData);
      expect(service.update).toBeCalledTimes(1);
    });

    it('should return a 404 error', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(null);
      const one = controller.update('1', eventTypesMockData[0]);

      await expect(one).rejects.toThrow('Event Type Not Found');
      expect(service.update).toBeCalledTimes(1);
    });

    it('should return an error message', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error('Unexpected Error Ocurred'));
      await expect(
        controller.update('1', eventTypesMockData[0]),
      ).rejects.toThrow('Unexpected Error Ocurred');
      expect(service.update).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return an event type', async () => {
      const one = await controller.remove('1');

      expect(one).toEqual(responseData);
    });

    it('should return a 404 error', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(null);
      const one = controller.remove('1');

      await expect(one).rejects.toThrow('Event Type Not Found');
      expect(service.remove).toBeCalledTimes(1);
    });

    it('should throw an error if remove method fails', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new Error('Unexpected Error Ocurred'));
      const one = controller.remove('1');

      await expect(one).rejects.toThrow('Unexpected Error Ocurred');
      expect(service.remove).toBeCalledTimes(1);
    });
  });
});
