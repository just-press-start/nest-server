import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  date: string;
}
