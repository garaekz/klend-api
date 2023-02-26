import { User } from '@/users/schemas/user.schema';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { EventType } from './schemas/event-type.schema';

export interface MockEventType extends Omit<EventType, '_id'> {
  _id?: string;
}

export const eventTypesMockData: MockEventType[] = [
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
    title: 'Test Event Type 1',
    description: 'Description of type 1',
    color: '#000000',
    icon: 'test-icon-1',
    slug: 'test-event-type-1',
    duration: 60,
    isPublic: true,
    user: new User(),
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9c',
    title: 'Test Event Type 2',
    description: 'Description of type 2',
    color: '#000000',
    icon: 'test-icon-2',
    slug: 'test-event-type-2',
    duration: 60,
    isPublic: true,
    user: new User(),
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9d',
    title: 'Test Event Type 3',
    description: 'Description of type 3',
    color: '#000000',
    icon: 'test-icon-3',
    slug: 'test-event-type-3',
    duration: 60,
    isPublic: true,
    user: new User(),
  },
];

export const mockedCreateEventTypeDto: CreateEventTypeDto =
  eventTypesMockData[0];
