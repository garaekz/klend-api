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
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Controller('availabilities')
export class AvailabilitiesController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @Post()
  async create(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    try {
      return {
        statusCode: 200,
        data: await this.availabilitiesService.create(createAvailabilityDto),
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
        data: await this.availabilitiesService.findAll(),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const availability = await this.availabilitiesService.findOne(id);
      if (!availability) {
        throw new NotFoundException('Availability not found');
      }
      return {
        statusCode: 200,
        data: availability,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ) {
    try {
      const availability = await this.availabilitiesService.update(
        id,
        updateAvailabilityDto,
      );
      if (!availability) {
        throw new NotFoundException('Availability not found');
      }
      return {
        statusCode: 200,
        data: availability,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const availability = await this.availabilitiesService.remove(id);
      if (!availability) {
        throw new NotFoundException('Availability not found');
      }
      return {
        statusCode: 200,
        data: availability,
      };
    } catch (error) {
      throw error;
    }
  }
}
