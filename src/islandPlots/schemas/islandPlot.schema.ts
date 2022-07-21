import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Plot {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  color: string;

  @Prop()
  @ApiProperty()
  user_name: string;

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

export const IslandPlotSchema = SchemaFactory.createForClass(Plot);
