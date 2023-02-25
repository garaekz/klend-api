import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import {
  Availability,
  AvailabilityDocument,
} from './schemas/availability.schema';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectModel(Availability.name) private model: Model<AvailabilityDocument>,
  ) {}

  async create(
    createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<Availability> {
    return await this.model.create(createAvailabilityDto);
  }

  async findAll(): Promise<Availability[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<Availability> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    updateAvailabilityDto: UpdateAvailabilityDto,
  ): Promise<Availability> {
    return await this.model.findByIdAndUpdate(id, updateAvailabilityDto);
  }

  async remove(id: string): Promise<Availability> {
    return await this.model.findByIdAndDelete(id);
  }
}
