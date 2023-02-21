import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import mongoose from 'mongoose';
export type EventTypeDocument = HydratedDocument<EventType>;

@Schema({ timestamps: true, versionKey: false })
export class EventType {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  color: string;

  @Prop()
  icon: string;

  @Prop()
  slug: string;

  @Prop()
  duration: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);
