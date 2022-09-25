import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimPlotDto {
  @Prop()
  @ApiProperty()
  user: string;
}
