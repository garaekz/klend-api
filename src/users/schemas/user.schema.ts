import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ select: false, default: null })
  password: string;

  @Prop()
  username: string;

  @Prop()
  avatar?: string;

  @Prop()
  googleId?: string;

  @Prop()
  facebookId?: string;

  @Prop()
  githubId?: string;

  @Prop()
  twitterId?: string;

  @Prop()
  linkedinId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
