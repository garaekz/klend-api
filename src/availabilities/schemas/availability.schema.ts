import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema({ timestamps: true, versionKey: false })
export class Availability {
  @Prop()
  title: string;

  @Prop({
    type: [
      {
        day: String,
        enabled: Boolean,
        times: [
          {
            start: String,
            end: String,
          },
        ],
      },
    ],
  })
  days: {
    day: string;
    enabled: boolean;
    times: {
      start: string;
      end: string;
    }[];
  }[];
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
