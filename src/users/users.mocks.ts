import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@/users/schemas/user.schema';

export interface MockUser extends Omit<User, '_id'> {
  _id?: string;
}

export const usersMockData: MockUser[] = [
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9b',
    name: 'User 1',
    email: 't1@t.io',
    username: 't1',
    password: null,
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9c',
    name: 'User 2',
    email: 't2@t.io',
    username: 't2',
    password: null,
  },
  {
    _id: '5f9f1b9b9b9b9b9b9b9b9b9d',
    name: 'User 3',
    email: 't3@t.io',
    username: 't3',
    password: null,
  },
];

export const mockedCreateUserDto: CreateUserDto = usersMockData[0];
