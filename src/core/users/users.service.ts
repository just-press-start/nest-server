import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import * as bcrpyt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/registerUserDto';
import { LoginUserDto } from './dtos/loginUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterUserDto) {
    const hashedPassword = await bcrpyt.hash(user.password, 12);
    user.password = hashedPassword;
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async login(user: LoginUserDto) {
    const userFromDb = await this.findUserByName(user.name);
    if (!userFromDb) {
      throw new BadRequestException('invalid credentials');
    }
    if (!(await bcrpyt.compare(user.password, userFromDb.password))) {
      throw new BadRequestException('invalid credentials');
    }
    const jwtToken = await this.jwtService.signAsync({ id: user._id });
    return jwtToken;
  }

  async findUserByName(name) {
    const user: User = await this.userModel.findOne({ name: name }).exec();
    return user;
  }

  async verifyUser(request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    return data;
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }
}
