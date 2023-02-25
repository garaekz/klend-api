import { EventType, EventTypeDocument } from './schemas/event-type.schema';
import { Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventTypesService {
  constructor(
    @InjectModel(EventType.name) private model: Model<EventTypeDocument>,
  ) {}

  async create(createEventTypeDto: CreateEventTypeDto): Promise<EventType> {
    return await this.model.create(createEventTypeDto);
  }

  async findAll(): Promise<EventType[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<EventType> {
    return this.model.findById(id);
  }

  async update(
    id: string,
    updateEventTypeDto: UpdateEventTypeDto,
  ): Promise<EventType> {
    return await this.model.findByIdAndUpdate(id, updateEventTypeDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<EventType> {
    return await this.model.findByIdAndDelete(id);
  }
}
