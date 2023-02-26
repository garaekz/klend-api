import { Types } from 'mongoose';

export class CreateOrganizationDto {
  name: string;
  slug: string;
  owner: Types.ObjectId;
  mainCompany?: boolean;
}
