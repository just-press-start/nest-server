import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  password: string;
}
