import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly service: EventTypesService) {}

  @Post()
  async create(@Body() createEventTypeDto: CreateEventTypeDto) {
    try {
      return {
        statusCode: 201,
        data: await this.service.create(createEventTypeDto),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return {
        statusCode: 200,
        data: await this.service.findAll(),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const eventType = await this.service.findOne(id);
      if (!eventType) {
        throw new NotFoundException('Event Type Not Found');
      }
      return {
        statusCode: 200,
        data: eventType,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    try {
      const eventType = await this.service.update(id, updateEventTypeDto);
      if (!eventType) {
        throw new NotFoundException('Event Type Not Found');
      }
      return {
        statusCode: 200,
        data: eventType,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const eventType = await this.service.remove(id);
      if (!eventType) {
        throw new NotFoundException('Event Type Not Found');
      }
      return {
        statusCode: 200,
        data: eventType,
      };
    } catch (error) {
      throw error;
    }
  }
}
