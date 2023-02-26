import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@/users/schemas/user.schema';
import { Types } from 'mongoose';

export interface MockUser extends User {
  _id?: Types.ObjectId;
}

export const usersMockData: MockUser[] = [
  {
    _id: new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9b'),
    name: 'User 1',
    email: 't1@t.io',
    username: 't1',
    password: null,
  },
  {
    _id: new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9c'),
    name: 'User 2',
    email: 't2@t.io',
    username: 't2',
    password: null,
  },
  {
    _id: new Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9d'),
    name: 'User 3',
    email: 't3@t.io',
    username: 't3',
    password: null,
  },
];

export const mockedCreateUserDto: CreateUserDto = usersMockData[0];
