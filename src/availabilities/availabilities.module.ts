import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { AvailabilitiesController } from './availabilities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailabilitySchema } from './schemas/availability.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Availability', schema: AvailabilitySchema },
    ]),
  ],
  controllers: [AvailabilitiesController],
  providers: [AvailabilitiesService],
})
export class AvailabilitiesModule {}
