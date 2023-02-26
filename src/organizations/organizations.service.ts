import {
  Organization,
  OrganizationDocument,
} from './schemas/organization.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name) private model: Model<OrganizationDocument>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.model.create(createOrganizationDto);
  }

  async findAll(): Promise<Organization[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<Organization> {
    return this.model.findById(id);
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return this.model.findByIdAndUpdate(id, updateOrganizationDto);
  }

  async remove(id: string): Promise<Organization> {
    return this.model.findByIdAndDelete(id);
  }
}
