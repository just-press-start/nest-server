import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(userDto: User): Promise<User> {
    const newProduct = new this.userModel(userDto);
    return newProduct.save();
  }

  async readById(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id, Product: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, Product, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
