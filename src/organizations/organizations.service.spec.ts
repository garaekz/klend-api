import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import { Model } from 'mongoose';
import { organizationsMockData } from './organizations.mocks';
import { OrganizationsService } from './organizations.service';
import {
  Organization,
  OrganizationDocument,
} from './schemas/organization.schema';

const mockId = '5f9f1b9b9b9b9b9b9b9b9b9b';
describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let mockModel: Model<OrganizationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: getModelToken(Organization.name),
          useValue: {
            find: jest.fn().mockResolvedValue(organizationsMockData),
            findById: jest.fn().mockResolvedValue(organizationsMockData[0]),
            findOne: jest.fn().mockResolvedValue(organizationsMockData[0]),
            findByIdAndDelete: jest
              .fn()
              .mockResolvedValue(organizationsMockData[0]),
            findByIdAndUpdate: jest
              .fn()
              .mockResolvedValue(organizationsMockData[0]),
            create: jest.fn().mockResolvedValue(organizationsMockData[0]),
          },
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    mockModel = module.get<Model<OrganizationDocument>>(
      getModelToken(Organization.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the model find method', async () => {
      await service.findAll();
      expect(mockModel.find).toHaveBeenCalled();
    });

    it('should return an array of organizations', async () => {
      const result = await service.findAll();
      expect(result).toEqual(organizationsMockData);
    });

    it('should return an empty array if no organizations are found', async () => {
      mockModel.find = jest.fn().mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });

    it('should throw an error if something goes wrong', async () => {
      mockModel.find = jest.fn().mockRejectedValue(new Error('Test Error'));
      await expect(service.findAll()).rejects.toThrowError('Test Error');
    });
  });

  describe('findOne', () => {
    it('should call the model findById method', async () => {
      await service.findOne(mockId);
      expect(mockModel.findById).toHaveBeenCalled();
    });

    it('should return an organization', async () => {
      const result = await service.findOne(mockId);
      expect(result).toEqual(organizationsMockData[0]);
    });

    it('should throw an error if something goes wrong', async () => {
      mockModel.findById = jest.fn().mockRejectedValue(new Error('Test Error'));
      await expect(service.findOne(mockId)).rejects.toThrowError('Test Error');
    });
  });

  describe('create', () => {
    it('should call the model create method', async () => {
      await service.create(organizationsMockData[0]);
      expect(mockModel.create).toHaveBeenCalled();
    });

    it('should return an organization', async () => {
      const result = await service.create(organizationsMockData[0]);
      expect(result).toEqual(organizationsMockData[0]);
    });

    it('should throw an error if something goes wrong', async () => {
      mockModel.create = jest.fn().mockRejectedValue(new Error('Test Error'));
      await expect(
        service.create(organizationsMockData[0]),
      ).rejects.toThrowError('Test Error');
    });
  });

  describe('update', () => {
    it('should call the model findByIdAndUpdate method', async () => {
      await service.update(mockId, organizationsMockData[0]);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it('should return an organization', async () => {
      const result = await service.update(mockId, organizationsMockData[0]);
      expect(result).toEqual(organizationsMockData[0]);
    });

    it('should throw an error if something goes wrong', async () => {
      mockModel.findByIdAndUpdate = jest
        .fn()
        .mockRejectedValue(new Error('Test Error'));
      await expect(
        service.update(mockId, organizationsMockData[0]),
      ).rejects.toThrowError('Test Error');
    });
  });

  describe('remove', () => {
    it('should call the model findByIdAndDelete method', async () => {
      await service.remove(mockId);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalled();
    });

    it('should return an organization', async () => {
      const result = await service.remove(mockId);
      expect(result).toEqual(organizationsMockData[0]);
    });

    it('should throw an error if something goes wrong', async () => {
      mockModel.findByIdAndDelete = jest
        .fn()
        .mockRejectedValue(new Error('Test Error'));
      await expect(service.remove(mockId)).rejects.toThrowError('Test Error');
    });
  });
});
