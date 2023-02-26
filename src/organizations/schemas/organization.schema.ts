import { User, UserSchema } from '@/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ timestamps: true, versionKey: false })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [UserSchema] })
  users: User[];

  @Prop({ type: User, ref: 'User' })
  owner: User;

  @Prop({ default: true })
  mainCompany: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
