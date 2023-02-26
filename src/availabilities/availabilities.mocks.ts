import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Availability } from './schemas/availability.schema';

export interface MockAvailability extends Availability {
  _id: string;
}

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const mockDay = {
  day: 'monday',
  enabled: true,
  times: [
    {
      start: '09:00',
      end: '17:00',
    },
  ],
};

export const availabilitiesMockData: MockAvailability[] = [
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
    title: 'Test Availability 1',
    timezone: 'America/Los_Angeles',
    days: daysOfWeek.map((day) => {
      return {
        ...mockDay,
        day,
      };
    }),
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9c',
    title: 'Test Availability 2',
    timezone: 'America/Los_Angeles',
    days: daysOfWeek.map((day) => {
      return {
        ...mockDay,
        day,
      };
    }),
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9d',
    title: 'Test Availability 3',
    timezone: 'America/Los_Angeles',
    days: daysOfWeek.map((day) => {
      return {
        ...mockDay,
        day,
      };
    }),
  },
];

export const updatedAvailabilityMock = {
  ...availabilitiesMockData[0],
  title: 'Updated Availability',
};

export const mockedCreateAvailabilityDto: CreateAvailabilityDto =
  availabilitiesMockData[0];
