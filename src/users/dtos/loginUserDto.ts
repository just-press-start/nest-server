import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class LoginUserDto {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  password: string;
}
