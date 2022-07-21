import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class EditPlotDto {
  @Prop()
  @ApiProperty()
  color: string;

  @Prop()
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  img: string;
}
