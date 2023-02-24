import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventType, EventTypeSchema } from './schemas/event-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventType.name, schema: EventTypeSchema },
    ]),
  ],
  controllers: [EventTypesController],
  providers: [EventTypesService],
})
export class EventTypesModule {}
