import { usersMockData } from '@/users/users.mocks';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './schemas/organization.schema';

export interface MockOrganization extends Omit<Organization, '_id'> {
  _id?: string;
}

export const organizationsMockData: MockOrganization[] = [
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
    name: 'Organization 1',
    users: [],
    owner: usersMockData[0],
    mainCompany: true,
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9c',
    name: 'Organization 2',
    users: [],
    owner: usersMockData[0],
    mainCompany: false,
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9d',
    name: 'Organization 3',
    users: usersMockData,
    owner: usersMockData[0],
    mainCompany: false,
  },
];

export const mockedCreateOrganizationDto: CreateOrganizationDto =
  organizationsMockData[0];
