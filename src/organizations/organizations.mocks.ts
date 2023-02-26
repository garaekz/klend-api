import { Types } from 'mongoose';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './schemas/organization.schema';

export interface MockOrganization extends Omit<Organization, '_id'> {
  _id?: string;
}

export const organizationsMockData: MockOrganization[] = [
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
    name: 'Organization 1',
    slug: 'organization-1',
    users: [],
    owner: new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9b'),
    mainCompany: true,
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9c',
    name: 'Organization 2',
    slug: 'organization-2',
    users: [],
    owner: new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9b'),
    mainCompany: false,
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9d',
    name: 'Organization 3',
    slug: 'organization-3',
    users: [
      new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9b'),
      new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9c'),
    ],
    owner: new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9b'),
    mainCompany: false,
  },
];

export const mockedCreateOrganizationDto: CreateOrganizationDto =
  organizationsMockData[0];
