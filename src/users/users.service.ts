import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await this.model.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<UserDocument> {
    return await this.model.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async findOrCreate(data: any, providerId: string) {
    const user = await this.model.findOne({ [providerId]: data.id });
    if (!user) {
      return await this.model.create({
        [providerId]: data.id,
        ...data,
      });
    }
    return user;
  }

  async findOneByProviderId(providerId: string, id: string) {
    return await this.model.findOne({ [providerId]: id });
  }
}
